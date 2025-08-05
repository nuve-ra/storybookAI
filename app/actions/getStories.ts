/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { desc, eq } from 'drizzle-orm';

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';

export const getAllStories = async () => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id));

    return result;
  } catch (error) {
    return [];
  }
};

export const getStoryById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, id)); // assuming storyId is a string

    return result[0] || null;
  } catch (error) {
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
    throw new Error('Failed to delete story');
  }
};

export const getUserStories = async (userEmail: string) => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.userEmail, userEmail))
      .orderBy(desc(StoryData.id));

    return result;
  } catch (error) {
    return [];
  }
};

export const getUserStoriesForDashboard = async (userEmail: string) => {
  try {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.userEmail, userEmail))
      .orderBy(desc(StoryData.id))
      .limit(3);

    return result;
  } catch (error) {
    return [];
  }
};
