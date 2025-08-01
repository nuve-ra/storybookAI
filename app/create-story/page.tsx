"use client";
import React, { useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@heroui/button';
import { chatSession } from '@/config/Geminiai';
import { StoryData } from '@/config/schema';
import { saveStoryToDB } from '@/app/actions/saveStory';
import CustomLoader from './_components/CustomLoader';
import  axios  from 'axios';

//import { db } from '@/config/db';
// @ts-ignore
import uuid4 from "uuid4";
import replicate from 'replicate';

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT ?? 
  'Create kids story on description for {ageGroup} kids, {storyType} story and all images in {imageStyle} style, {storySubject}. Give me 5 chapters with detailed text, image prompt of each chapter, and also give me the image of story cover book with title, all in min JSON field format.';

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formData {
  storySubject: string;
  storyType: string;
  ageGroup: string;
  imageStyle: string;
}

function CreateStory() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<formData>({
    storySubject: '',
    storyType: '',
    ageGroup: '',
    imageStyle: '',
  });

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const generateStory=async()=>{
    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT
       .replace('{ageGroup}', formData?.ageGroup ?? '')
       .replace('{storyType}', formData?.storyType ?? '')
       .replace('{storySubject}', formData?.storySubject ?? '')
       .replace('{imageStyle}', formData?.imageStyle ?? '');

    try{
      console.log('Final Prompt:', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT)
      const story=JSON.parse(result?.response.text());
      
      console.log('Generated story:', story);
      
      // Check story structure and extract title safely
      const storyTitle = story?.story_cover?.title || story?.title || story?.story_title || 'Untitled Story';
      const storyImagePrompt = story?.story_cover?.image_prompt || story?.cover_image_prompt || 'A beautiful children\'s book cover';
      
      console.log('Story title:', storyTitle);
      console.log('Story image prompt:', storyImagePrompt);
      
      // Generate cover image
      const imagePrompt = `Add text with title "${storyTitle}" in bold text for book cover. ${storyImagePrompt}`;
      console.log('Image prompt:', imagePrompt);

      const imageResp = await axios.post("/api/generate-image", {
        prompt: imagePrompt
      });

      console.log("Image response:", imageResp?.data);
      
      if (imageResp?.data?.imageUrl) {
        console.log('Image generated successfully!');
        // Store the image URL in the story object
        if (!story.story_cover) story.story_cover = {};
        story.story_cover.image_url = imageResp.data.imageUrl;
        
        // Show the image URL to the user
        const imageUrl = imageResp.data.imageUrl;
        alert(`Story and image generated successfully!\n\nImage URL: ${imageUrl}\n\nYou can copy this URL to view the generated image.`);
        
        // Also log it for easy copying
        console.log('Generated Image URL:', imageUrl);
        
        // Try to open the image in a new tab
        window.open(imageUrl, '_blank');
      } else {
        alert('Story generated successfully, but image generation failed. Check console for details.');
      }

      console.log('Story with image:', story);
      const resp=await SaveInDB(JSON.stringify(story));
      console.log('Saved to DB:', resp);
    }catch(error){
      console.error('Error generating story:', error);
      alert('Error generating story: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }
 
  
 const SaveInDB=async(output:string)=>{
    try{
      const result = await saveStoryToDB(formData, output);
      return result;
    }catch(error){
      console.error('Error saving story to DB:', error);
     }
   }
  
  return (
    <div className='p-10 md:px-20 lg:px-40 bg-[#cad3ff] min-h-screen'>
      <h2 className='text-extrabold text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center'>
        Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        <StorySubjectInput userSelection={onHandleUserSelection} />
        <StoryType userSelection={onHandleUserSelection} />
        <AgeGroup userSelection={onHandleUserSelection} />
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className='flex justify-end my-10'>
        <Button color='primary' className='p-10 text-2xl' disabled={loading} onClick={generateStory}>
          Generate Story
        </Button>
      </div>
      <CustomLoader isLoading={loading}/>
    </div>
  );
}

export default CreateStory;