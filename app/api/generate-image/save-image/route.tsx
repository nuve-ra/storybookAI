// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextRequest } from 'next/server';
// import axios from 'axios';
// import { ref, uploadString } from 'firebase/storage';

// import { storage } from '@/config/firebase';

// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   const { url } = data;
//   const base64Image = 'data:image/png:base64,' + (await convertImage(url));
//   const fileName = '/ai-story' + Date.now() + '.png';
//   const imageRef = ref(storage, fileName);

//   await uploadString(imageRef, base64Image);
// }
// export const convertImage = async (imageUrl: string) => {
//   try {
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const base64Image = Buffer.from(response.data).toString('base64');

//     return base64Image;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log('error converting base 64 image. ');
//   }
// };
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ref, uploadString } from 'firebase/storage';

import { storage } from '@/config/firebase';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url } = data;

    const base64 = await convertImage(url);

    if (!base64) {
      return NextResponse.json(
        { error: 'Failed to convert image.' },
        { status: 500 },
      );
    }

    const base64Image = 'data:image/png;base64,' + base64;
    const fileName = '/ai-story' + Date.now() + '.png';
    const imageRef = ref(storage, fileName);

    await uploadString(imageRef, base64Image, 'data_url');

    return NextResponse.json({ success: true, fileName });
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export const convertImage = async (
  imageUrl: string,
): Promise<string | null> => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    return Buffer.from(response.data).toString('base64');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error converting image to base64:', error);
    // eslint-disable-next-line padding-line-between-statements
    return null;
  }
};
