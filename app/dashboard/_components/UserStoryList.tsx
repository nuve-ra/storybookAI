'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { BookOpen, Plus, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserStoriesForDashboard } from '@/app/actions/getStories';
import { useUser } from '@clerk/nextjs';

interface StoryRecord {
  id: number;
  storyId: string | null;
  storySubject: string | null;
  storyType: string | null;
  ageGroup: string | null;
  imageStyle: string | null;
  output: any;
  coverImage: string | null;
  userEmail: string | null;
}

function UserStoryList() {
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      fetchStories();
    }
  }, [isSignedIn, user]);

  const fetchStories = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    try {
      const userStories = await getUserStoriesForDashboard(user.primaryEmailAddress.emailAddress);
      setStories(userStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStoryTitle = (output: any) => {
    return output?.story_cover?.title || output?.title || output?.story_title || 'Untitled Story';
  };

  const getCoverImage = (output: any) => {
    return output?.story_cover?.image_url || null;
  };

  const handleViewStory = (story: StoryRecord) => {
    router.push(`/view-story/${story.storyId}`);
  };

  const handleCreateNew = () => {
    router.push('/create-story');
  };

  const handleViewAll = () => {
    router.push('/your-history');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-primary">Recent Stories</h3>
        <div className="flex gap-3">
          <Button 
            color="primary" 
            variant="ghost"
            onClick={handleViewAll}
            className="text-primary hover:bg-primary/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
          <Button 
            color="primary"
            onClick={handleCreateNew}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-600 mb-2">No Stories Yet</h4>
          <p className="text-gray-500 mb-6">Create your first magical story!</p>
          <Button 
            color="primary" 
            size="lg"
            onClick={handleCreateNew}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Story
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Cover Image */}
              <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                {getCoverImage(story.output) ? (
                  <img 
                    src={getCoverImage(story.output)} 
                    alt={getStoryTitle(story.output)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="w-12 h-12 text-primary opacity-40" />
                )}
              </div>

              {/* Story Info */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {getStoryTitle(story.output)}
                </h4>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                  {story.storySubject || 'No subject'}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>{story.ageGroup || 'All ages'}</span>
                  <span>{story.storyType || 'Story'}</span>
                </div>

                <Button 
                  color="primary" 
                  variant="flat"
                  className="w-full"
                  onClick={() => handleViewStory(story)}
                >
                  Read Story
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserStoryList;
