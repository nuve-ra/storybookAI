"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

function UserStoryList() {
  const { user } = useUser();
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const getUserStory = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const res = await fetch("/action/getStories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      const data = await res.json();
      setStories(data);
    };

    getUserStory();
  }, [user]);

  return (
    <div>
      <h2>User Stories</h2>
      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>{story.storySubject}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserStoryList;
