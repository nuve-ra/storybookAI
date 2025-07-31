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

//import { db } from '@/config/db';
// @ts-ignore
import uuid4 from "uuid4";

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
    const FINAL_PROMPT = CREATE_STORY_PROMPT
       .replace('{ageGroup}', formData?.ageGroup ?? '')
       .replace('{storyType}', formData?.storyType ?? '')
       .replace('{storySubject}', formData?.storySubject ?? '')
       .replace('{imageStyle}', formData?.imageStyle ?? '');

    try{
      console.log('Final Prompt:', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT)
      console.log(result?.response.text());
      const resp=await SaveInDB(result?.response.text());
      console.log(resp);
    }catch(error){
      console.error('Error generating story:', error);
    }
    //Save database
  }
  // const SaveInDB=async(output:string)=>{
  //   const recordId=uuid4();
  //   try{ 
  //     const result=await db.insert(StoryData).values({
  //     storyId:recordId,
  //     ageGroup:formData?.ageGroup ?? '',
  //     storyType:formData?.storyType ?? '',
  //     storySubject:formData?.storySubject ?? '',
  //     imageStyle:formData?.imageStyle ?? '',
  //     output: JSON.parse(output),
  //   }).returning({storyId:StoryData?.storyId})
  //   return result;
  //   }
  //   catch(e){

  //   }
  // }
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
      <CustomLoader/>
    </div>
  );
}

export default CreateStory;
