"use client";
import { Textarea } from '@heroui/input'
import { input } from '@heroui/theme'
import React from 'react'

function StorySubjectInput({userSelection}:any) {
  return (
    <div>
        <label className='font-bold text-2xl text-primary mb-2'>
            1. Subject of the Story:
        </label>
        <Textarea
        placeholder='Enter the subject of the story.you want to create...'
        size='lg'
        classNames={{
            input:"resize-y min-h-[200px] text-2xl p-5 "
        }}
        className='mt-3 max-w-lg '   
        onChange={(e)=>userSelection({
            fieldValue:e.target.value,
            fieldName:"storySubject"
        })}     
        />
    </div>
  )
}

export default StorySubjectInput