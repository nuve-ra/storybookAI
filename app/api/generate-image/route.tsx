// import { NextResponse,NextRequest } from "next/server";
// import Replicate from "replicate";

// export async function POST(req:NextRequest){

//   const data=await req.json();
//   const {prompt}=data;
//   const replicate=new Replicate({
//     auth:process.env.REPLICATE_API_KEY
//   });
//   const input={
//     prompt: prompt,
//     output_format: 'png',
//     aspect_ratio: '1:1',
//     "output_quality": 80,
//   }

//   const output:any = await replicate.run("black-forest-labs/flux-schnell", { input });
//   console.log(output);
//   return NextResponse.json({ "imageUrl": output[0] });
// }
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    console.log("Generating image with prompt:", prompt);
    console.log("Using API Key:", process.env.STABILITY_API_KEY ? "API Key found" : "API Key missing");

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp");

    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
        "Accept": "image/*"
      },
      body: formData
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Stability AI Error:", errorText);
      return NextResponse.json({ 
        error: `Stability AI API Error: ${response.status} - ${errorText}` 
      }, { status: response.status });
    }

    // Convert image blob to base64
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageBlob.type || 'image/webp';
    const base64DataUrl = `data:${mimeType};base64,${base64Image}`;

    console.log("Image generated successfully");
    return NextResponse.json({ 
      imageUrl: base64DataUrl, 
      base64Image: base64Image,
      mimeType: mimeType,
      success: true 
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ 
      error: `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
