'use server';

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { desc, eq } from 'drizzle-orm';

export const getAllStories = async () => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id));

    return result;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};

export const getStoryById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, id)) // assuming storyId is a string
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Error fetching story by ID:', error);
    return null;
  }
};

export const deleteStory = async (storyId: number) => {
  try {
    const result = await db
      .delete(StoryData)
      .where(eq(StoryData.id, storyId))
      .returning({ id: StoryData.id });

    return result[0] || null;
  } catch (error) {
    console.error('Error deleting story:', error);
    throw new Error('Failed to delete story');
  }
};

export const getUserStories = async (userEmail: string, limit: number = 3) => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.userEmail, userEmail))
      .orderBy(desc(StoryData.id))
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching user stories:', error);
    return [];
  }
};
