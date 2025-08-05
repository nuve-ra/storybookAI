'use client';
import { Textarea } from '@heroui/input';
import React from 'react';

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="font-bold text-2xl text-primary mb-2">
        1.Subject of the Story
        <input className="input" type="text" />
      </label>{' '}
      <Textarea
        className="mt-3 max-w-lg "
        classNames={{
          input: 'resize-y min-h-[200px] text-2xl p-5 ',
        }}
        placeholder="Enter the subject of the story.you want to create..."
        size="lg"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: 'storySubject',
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput;
