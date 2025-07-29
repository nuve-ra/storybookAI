import {defineConfig} from 'drizzle-kit';
export default defineConfig({
    schema: "./config/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_05dPwXsCFmjM@ep-square-cherry-afy8yzai-pooler.c-2.us-west-2.aws.neon.tech/ai-kids-story-builder?sslmode=require&channel_binding=require',
    },
    verbose: true,
    strict:true,
})