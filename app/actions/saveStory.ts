'use server';

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { v4 as uuidv4 } from 'uuid';

export const saveStoryToDB = async (formData: any, output: string, userEmail: string) => {
  const recordId = uuidv4();

  const result = await db
    .insert(StoryData)
    .values({
      storyId: recordId,
      ageGroup: formData?.ageGroup ?? '',
      storyType: formData?.storyType ?? '',
      storySubject: formData?.storySubject ?? '',
      imageStyle: formData?.imageStyle ?? '',
      output: JSON.parse(output),
      userEmail: userEmail, // <-- Important
    })
    .returning({
      storyId: StoryData.storyId,
    });

  return result;
};
