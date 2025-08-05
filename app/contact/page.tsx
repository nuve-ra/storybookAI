'use client';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Tooltip } from '@heroui/react';
import React, { useState } from 'react';

function Page() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  //const [formData, setFormData] = useState<any>();
  const [subject, setSubject] = useState<string>('');

  const handleSubmit = () => {
    // handle submission
    setName('');
    setEmail('');
    setSubject('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4  filter brightness-75"
      style={{ backgroundImage: "url('/KidsBlogHJune.png')" }}
    >
      <h2 className="font-bold text-primary-100 text-2xl text-center p-10 mt-10">
        Say Hello to us!
      </h2>
      <h2 className="font-medium text-xl text-primary-200 text-center">
        Get in touch with your ideas! Send your idea of a story
      </h2>
      {/* <h3 className="text-center text-blue-850">kidzz@story.com</h3> */}

      <form
        className="max-w-md mx-auto mt-10 space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          className="border-b-2 w-full"
          placeholder="Enter your nice name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="border-b-2 w-full"
          placeholder="Where shall I mail you?"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="border-b-2 w-full"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Textarea className="w-full" placeholder="Your Message" />
        {/* <Tooltip content="I am a tooltip" showArrow={true}></Tooltip>
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
          radius="full" onClick={()=>alert("Submitted")}
        >
          Send Message
        </Button> */}
        <Tooltip
          content="You can also reach us at kidzz@story.ac.in"
          showArrow={true}
        >
          <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full">
            Submit
          </Button>
        </Tooltip>
      </form>
    </div>
  );
}

export default Page;
