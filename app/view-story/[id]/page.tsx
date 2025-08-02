"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { getStoryById } from '../../actions/getStories';
import { IoPlayCircleSharp } from "react-icons/io5";

interface Chapter {
  chapter_number: number;
  title: string;
  text: string;
  image_prompt: string;
}

interface StoryCover {
  image_prompt: string;
  image_url?: string;
  title?: string;
}

interface StoryRecord {
  id: number;
  storyId: string | null;
  storySubject: string | null;
  storyType: string | null;
  ageGroup: string | null;
  imageStyle: string | null;
  output: unknown;
  coverImage: string | null;
}

interface ParsedStory {
  story_cover?: StoryCover;
  chapters?: Chapter[];
}

function ViewStoryPage() {
  const [storyData, setStoryData] = useState<StoryRecord | null>(null);
  const [parsedStory, setParsedStory] = useState<ParsedStory>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams();
  const router = useRouter();
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (!params.id) return;

      try {
        console.log('Fetching story with ID:', params.id);
        const story = await getStoryById(params.id as string);
        

        if (story) {
          console.log('Story found:', story);
          setStoryData(story);

          // Parse the output field to get the actual story structure
          let parsed: ParsedStory = {};
          try {
            parsed = typeof story.output === 'string' 
              ? JSON.parse(story.output) 
              : (story.output as ParsedStory) || {};
          } catch (parseError) {
            console.error('Error parsing story output:', parseError);
            parsed = {};
          }

          setParsedStory(parsed);

          // Set number of pages based on chapters + cover
          
          const chaptersCount = parsed.chapters?.length || 0;
          setTotalPages(1 + chaptersCount);
          
          //setTotalPages(1 + (story.chapters?.length || 0));
        } else {
          console.error('Story not found for ID:', params.id);
          // Redirect after short delay
          setTimeout(() => {
            router.push('/your-history');
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching story:', error);
        // Redirect after short delay
        setTimeout(() => {
          router.push('/your-history');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [params.id, router]);

  const handleBackToHistory = () => {
    router.push('/your-history');
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };
  const playSpeech=(text:string)=>{
    const synth=window.speechSynthesis;
    const textToSpeech=new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);

  }

  if (loading) {
    return (
      <div className="mh-full-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 text-lg">Loading your story...</p>
        </div>
      </div>
    );
  }

  if (!storyData || !parsedStory.chapters?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Story Not Found</h2>
          <p className="text-amber-700 mb-6">The story you're looking for doesn't exist or couldn't be loaded.</p>
          <Button color="primary" onClick={handleBackToHistory}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Your Stories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={handleBackToHistory}
          className="text-amber-800 hover:bg-amber-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-amber-800 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-amber-800 hover:bg-amber-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="text-amber-800 hover:bg-amber-200 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Flipbook */}
      <div className="flex justify-center items-center">
        <div className="relative">
          <HTMLFlipBook
            ref={flipBookRef}
            width={400}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={onFlip}
           
            className="shadow-2xl"
            style={{
              background: '#8B4513',
              border: '3px solid #654321',
              borderRadius: '10px',
            }}
          >
            {/* Cover Page */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-8 h-full flex flex-col justify-center items-center text-center border-r border-amber-300">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-amber-900 mb-4 leading-tight">
                  {parsedStory.story_cover?.title || storyData.storySubject || 'Untitled Story'}
                </h1>
                {parsedStory.story_cover?.image_url && (
                  <div className="mb-4">
                    <img
                      src={parsedStory.story_cover.image_url}
                      alt={parsedStory.story_cover.title || 'Story cover'}
                      className="max-w-full h-48 object-contain mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
                {parsedStory.story_cover?.image_prompt && (
                  <p className="text-amber-700 italic text-sm">
                    {parsedStory.story_cover.image_prompt}
                  </p>
                )}
              </div>
              <div className="mt-auto">
                <p className="text-amber-600 text-sm">Click to start reading →</p>
              </div>
            </div>

            {/* Chapter Pages */}
            {parsedStory.chapters?.map((chapter: Chapter, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 h-full flex flex-col border-r border-amber-300"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-amber-900 mb-3 text-center">
                    Chapter {index + 1}
                  </h2>
                  <h3 className="text-lg font-semibold text-amber-800 mb-4 text-center">
                    {chapter.title}
                  </h3>
                  {/* Audio */}
                  <span className="absolute bottom-0 right-0 text-primary m-4">
                              <IoPlayCircleSharp className='text-3xl cursor-pointer' onClick={()=>playSpeech(chapter.text)} />
                          </span>

                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-amber-900 leading-relaxed text-sm">
                    {chapter.text}
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-amber-600 text-xs">Page {index + 2}</span>
                </div>
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 max-w-2xl mx-auto">
        <p className="text-amber-700 text-sm">
          Click on the pages to flip through the story, or use the navigation buttons above.
        </p>
      </div>
    </div>
  );
}

export default ViewStoryPage;

