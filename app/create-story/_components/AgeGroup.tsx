'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export interface Optionfield {
  label: string;
  imgURL: string;
  isFree: boolean;
}
function AgeGroup({ userSelection }: any) {
  const OptionList = [
    {
      label: '0-2 Years',
      imgURL: '/02.jpg',
      isFree: true,
    },
    {
      label: '3-5 Years',
      imgURL: '/35.jpg',
      isFree: true,
    },
    {
      label: '5-8 Years',
      imgURL: '/58.jpg',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: Optionfield) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item.label,
      fieldName: 'ageGroup',
    });
  };

  return (
    <label className="font-bold text-2xl text-primary mb-2">
      3. Age-Group
      <div className="grid grid-cols-3 gap-5 mt-3">
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 p-1 ${
              selectedOption === item.label
                ? 'grayscale-0 border-2 rounded-3xl border-primary'
                : 'grayscale'
            } hover:grayscale-0`}
            role="button"
            tabIndex={0}
            onClick={() => onUserSelect(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onUserSelect(item);
              }
            }}
          >
            <Image
              alt={item.label}
              className="w-full h-40 object-cover rounded-lg"
              height={200}
              src={item.imgURL}
              width={300}
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </label>
  );
}

export default AgeGroup;
