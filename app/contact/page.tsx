"use client";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import React, { useState } from "react";

function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState<any>();
  const [subject, setSubject] = useState<string>("");

  const handleSubmit = () => {
    // handle submission
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4  filter brightness-75"
      style={{ backgroundImage: "url('/reader.jpg')" }}
    >
      <h2 className="font-bold text-primary-100 text-2xl text-center p-10 mt-10">
        Say Hello to us!
      </h2>
      <h2 className="font-medium text-xl text-primary-200 text-center">
        Get in touch with your ideas! Send your idea of a story
      </h2>
      <h3 className="text-center text-blue-850">kidzz@story.com</h3>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your nice name"
          className="border-b-2 w-full"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Where shall I mail you?"
          className="border-b-2 w-full"
        />
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border-b-2 w-full"
        />
        <Textarea placeholder="Your Message" className="w-full" />

        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
          radius="full"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}

export default Page;
