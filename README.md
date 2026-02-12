:

📖 AI Story Book

An interactive AI-powered storybook that generates personalized stories with illustrations. Built using Next.js, Hero UI, NeonDB, Stability AI, and Gemini API.

🚀 Features

✨ AI-Generated Stories – Uses Gemini API to create engaging and personalized stories.

🎨 AI-Generated Illustrations – Uses Stability AI for generating story-related images.

📦 Database Integration – Stores user preferences, stories, and saved sessions using NeonDB (Postgres).

🎭 Beautiful UI – Designed with Hero UI for a clean and modern interface.

🌐 Next.js (App Router) – Fast, scalable, and SEO-friendly frontend.

💾 Save & Continue – Users can save stories and resume later.

🛠️ Tech Stack

Frontend: Next.js 14
 + Hero UI

Backend: Next.js API Routes

Database: NeonDB
 (PostgreSQL)

AI Models:

Gemini API
 – Story generation

Stability AI
 – Image generation

⚙️ Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/ai-story-book.git
cd ai-story-book

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Setup Environment Variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
STABILITY_API_KEY=your_stability_ai_key
DATABASE_URL=your_neon_db_connection_string

4️⃣ Run the development server
npm run dev


Your app should now be running at http://localhost:3000
.

📚 Usage

Enter a story idea or theme (e.g., “A dragon who learns kindness”).

Gemini API will generate a story narrative.

Stability AI will generate illustrations based on the story.

Stories are stored in NeonDB for later access.

Enjoy your interactive AI-powered storybook.

🖼️ Screenshots

(You can add screenshots or gifs here)

🔮 Future Improvements

📖 Add chapter-based storytelling

🎤 Add text-to-speech narration

📱 Make it a progressive web app (PWA) for offline reading

👶 Kid-safe content filters

🤝 Contributing

<img width="3994" height="7493" alt="image" src="https://github.com/user-attachments/assets/165cedbb-a20f-4c51-af11-17760b8f93ff" />

