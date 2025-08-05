// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from 'fs/promises';
// import { join } from 'path';

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     console.log("Generating image with prompt:", prompt);
//     console.log("Using API Key:", process.env.STABILITY_API_KEY ? "API Key found" : "API Key missing");

//     const formData = new FormData();
//     formData.append("prompt", prompt);
//     formData.append("output_format", "webp");
//     formData.append("aspect_ratio", "1:1");
//     formData.append("output_quality", "60"); // Reduce quality to decrease file size

//     const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
//         "Accept": "image/*"
//       },
//       body: formData
//     });

//     console.log("Response status:", response.status);
//     console.log("Response headers:", Object.fromEntries(response.headers.entries()));

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Stability AI Error:", errorText);
//       return NextResponse.json({ 
//         error: `Stability AI API Error: ${response.status} - ${errorText}` 
//       }, { status: response.status });
//     }

//     // Save image as file instead of base64
//     const imageBlob = await response.blob();
//     const arrayBuffer = await imageBlob.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
    
//     // Generate unique filename
//     const filename = `story-cover-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
//     const filepath = join(process.cwd(), 'public', 'generated-images', filename);
    
//     // Ensure directory exists
//     const { mkdir } = await import('fs/promises');
//     const { dirname } = await import('path');
//     await mkdir(dirname(filepath), { recursive: true });
    
//     // Write file
//     await writeFile(filepath, buffer);
    
//     // Return file URL instead of base64
//     const imageUrl = `/generated-images/${filename}`;
    
//     console.log("Image saved successfully:", imageUrl);
//     console.log("Image size:", imageBlob.size, "bytes");
    
//     return NextResponse.json({ 
//       imageUrl: imageUrl,
//       success: true,
//       size: imageBlob.size,
//       filename: filename
//     });
//   } catch (err) {
//     console.error("Server Error:", err);
//     return NextResponse.json({ 
//       error: `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}` 
//     }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp");
    formData.append("aspect_ratio", "1:1");
    formData.append("output_quality", "60");

    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
        "Accept": "image/*"
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        error: `Stability AI API Error: ${response.status} - ${errorText}` 
      }, { status: response.status });
    }

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const filename = `story-cover-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filepath = join(process.cwd(), 'public', 'generated-images', filename);

    await mkdir(dirname(filepath), { recursive: true });
    await writeFile(filepath, buffer);

    const imageUrl = `/generated-images/${filename}`;
    
    return NextResponse.json({ 
      imageUrl, 
      success: true, 
      size: imageBlob.size, 
      filename 
    });
  } catch (err) {
    return NextResponse.json({ 
      error: `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
