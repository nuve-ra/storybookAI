"use client"
import React,{useState} from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@heroui/button';

export interface fieldData{
  fieldName:string,
  fieldValue:string
}
export interface formData{
  storySubject:string,
  storyType:string,
  ageGroup:string,
  imageStyle:string
}
function CreateStory() {
  const [formData,setFormData]=useState();
  const onHandleUserSelection=(data:fieldData)=>{
    console.log(data);
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue
    }))
    console.log(formData);
  }
  
  return (
    <div className='p-10 md:px-20 lg:px-40 bg-[#cad3ff] min-h-screen'>
      <h2 className='text-extrabold text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center'>Unlock your creativity with AI: Craft stories like never before ! Let our AI bring your imagination to life,one story at a time.</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection}/>
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection}/>
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection}/>
        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection}/>
      </div>
      <div className='flex justify-end my-10'>
        <Button color='primary' className='p-10 text-2xl'>Generate Story</Button>
      </div>
    </div>
  )
}

export default CreateStory;