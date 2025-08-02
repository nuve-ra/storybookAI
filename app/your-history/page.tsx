"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { ArrowLeft, BookOpen, Calendar, User, Palette, Type, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAllStories, deleteStory } from '@/app/actions/getStories';

interface StoryRecord {
  id: number;
  storyId: string | null;
  storySubject: string | null;
  storyType: string | null;
  ageGroup: string | null;
  imageStyle: string | null;
  output: any;
  coverImage: string | null;
}

function YourHistory() {
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const allStories = await getAllStories();
      setStories(allStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStory = (story: StoryRecord) => {
    // Use storyId for better user experience and unique story access
    router.push(`/view-story/${story.storyId}`);
  };

  const handleDeleteStory = async (storyId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this story? This action cannot be undone.');
    
    if (!confirmDelete) return;

    setDeletingId(storyId);
    try {
      await deleteStory(storyId);
      // Remove the deleted story from the local state
      setStories(prevStories => prevStories.filter(story => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleBackToCreate = () => {
    router.push('/create-story');
  };

  const getStoryTitle = (output: any) => {
    return output?.story_cover?.title || output?.title || output?.story_title || 'Untitled Story';
  };

  const getCoverImage = (output: any) => {
    return output?.story_cover?.image_url || null;
  };

  const formatDate = (id: number) => {
    // Since we don't have a timestamp, we'll use the ID as a simple indicator
    return `Story #${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#cad3ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-primary text-lg">Loading your stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#cad3ff] p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToCreate}
            className="text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Create
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Your History</h1>
          <div></div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-primary">{stories.length}</h3>
              <p className="text-gray-600">Stories Created</p>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-primary mb-4">No Stories Yet</h2>
            <p className="text-primary mb-6">You haven't created any stories yet. Start your creative journey!</p>
            <Button color="primary" size="lg" onClick={handleBackToCreate}>
              Create Your First Story
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  {getCoverImage(story.output) ? (
                    <img 
                      src={getCoverImage(story.output)} 
                      alt={getStoryTitle(story.output)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-16 h-16 text-primary opacity-50" />
                  )}
                </div>

                {/* Story Details */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                    {getStoryTitle(story.output)}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{story.storySubject || 'No subject'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>{story.ageGroup || 'No age group'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Type className="w-4 h-4 mr-2" />
                      <span>{story.storyType || 'No story type'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Palette className="w-4 h-4 mr-2" />
                      <span>{story.imageStyle || 'No image style'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(story.id)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <strong>Subject:</strong> {story.storySubject || 'No subject'}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      color="primary" 
                      className="w-full"
                      onClick={() => handleViewStory(story)}
                    >
                      Read Story
                    </Button>
                    <Button 
                      color="danger" 
                      className="w-full mt-2"
                      onClick={() => handleDeleteStory(story.id)}
                      disabled={deletingId === story.id}
                    >
                      {deletingId === story.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-danger mx-auto mb-4"></div>
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      {deletingId === story.id ? 'Deleting...' : 'Delete Story'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <Button 
            color="primary" 
            size="lg"
            onClick={handleBackToCreate}
            className="px-8 py-3"
          >
            Create New Story
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YourHistory;
