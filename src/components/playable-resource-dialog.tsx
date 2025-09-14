
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { Headphones, FileText, Video } from 'lucide-react';
import { useEffect, useState } from "react";

interface PlayableResourceDialogProps {
  resource: ImagePlaceholder | null;
  onOpenChange: (open: boolean) => void;
}

export function PlayableResourceDialog({ resource, onOpenChange }: PlayableResourceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!resource);
  }, [resource]);

  if (!resource) {
    return null;
  }

  const resourceType = resource.id.split("_")[0];

  const renderContent = () => {
    switch (resourceType) {
      case "audio":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <Headphones className="h-16 w-16 text-primary mb-4" />
            <p className="text-lg font-medium mb-4">Now playing: {resource.description}</p>
            <audio controls autoPlay className="w-full">
              {/* Using a placeholder audio file. In a real app, this would be a dynamic src */}
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case "video":
        return (
          <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
             <Video className="h-16 w-16 text-primary mb-4" />
            <p className="text-lg font-medium mb-4">Now playing: {resource.description}</p>
            <video controls autoPlay className="w-full rounded-lg">
                {/* Using a placeholder video file. In a real app, this would be a dynamic src */}
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>
        );
      case "guide":
        return (
            <div className="bg-muted rounded-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <FileText className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-2xl font-bold font-headline">{resource.description}</DialogTitle>
                </div>
                <div className="prose prose-sm max-w-none text-foreground">
                    <p className="lead">
                        This is a placeholder for the '{resource.description}' guide. In a real application, this space would be filled with rich, helpful content, including text, images, and interactive elements designed to support your wellness journey.
                    </p>
                    <p>
                        For now, take a moment to breathe deeply. Inhale for four counts, hold for four, and exhale for six. Repeat this a few times.
                    </p>
                    <p>
                        Remember, taking small steps and being kind to yourself are key components of mental well-being.
                    </p>
                </div>
            </div>
        );
      default:
        return <p>Unsupported resource type.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
