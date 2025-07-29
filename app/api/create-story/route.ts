// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json({ error: 'Prompt is missing' }, { status: 400 });
//     }

//     const apiKey = process.env.GEMINI_API_KEY;

// const response = await fetch(
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//           parts: [{ text: prompt }]
//         }
//       ]
//     })
//   }
// );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error('Gemini API error:', data);
//       return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
//     }

//     const story = data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!story) {
//       return NextResponse.json({ error: 'No story generated' }, { status: 500 });
//     }

//     console.log('Generated story:', story);

//     return NextResponse.json({ text: story }, { status: 200 });

//   } catch (error) {
//     console.error('Error in API:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
