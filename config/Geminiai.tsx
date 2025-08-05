import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey =
  process.env.GEMINI_API_KEY || 'AIzaSyD1Ib8QUUGLtT8EN2Og8xqurNsb-1FifEc';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: `Create kids story on description for 5-8 Years kids, Educational story and all images in paper cut style, The boy and the Elephant. Give me 5 chapters with detailed text, image prompt of each chapter, and also give me the image of story cover book with title, all in min JSON field format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `{
  "story_cover": {
    "image_prompt": "Paper-cut style illustration of a boy and an elephant standing under a tree with bright, playful colors"
  }
}`,
        },
      ],
    },
  ],
});
