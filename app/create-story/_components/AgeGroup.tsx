"use client";
import React ,{useState} from 'react';
import Image from 'next/image';

export interface Optionfield {
  label: string;
  imgURL: string;
  isFree: boolean;
}
function AgeGroup({userSelection}:any) {
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
      const onUserSelect=(item:Optionfield)=>{
                    setSelectedOption(item.label);
                    userSelection({
                      fieldValue: item.label,
                      fieldName:'ageGroup',
                
                    })
                  }
              
      return (
        <label className='font-bold text-2xl text-primary mb-2'>
          3. Age-Group
          <div className='grid grid-cols-3 gap-5 mt-3'>
            {OptionList.map((item, index) => (
              <div
                key={index}
                onClick={() => onUserSelect(item)}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 p-1 ${
                  selectedOption === item.label ? 'grayscale-0 border-2 rounded-3xl border-primary' : 'grayscale'
                } hover:grayscale-0`}
              >
                <h2 className='absolute bottom-5 text-white text-center w-full font-semibold drop-shadow-lg'>
                  {item.label}
                </h2>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={300}
                  height={500}
                  className='object-cover h-[260px] rounded-xl'
                />
              </div>
            ))}
          </div>
        </label>
  )
}

export default AgeGroup