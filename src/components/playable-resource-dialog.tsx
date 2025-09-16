
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { Headphones, FileText, Video } from 'lucide-react';
import { useEffect, useState } from "react";

interface PlayableResourceDialogProps {
  resource: ImagePlaceholder | null;
  onOpenChange: (open: boolean) => void;
}

const guideContent: {[key: string]: React.ReactNode} = {
    "guide_1": (
        <div className="prose prose-sm max-w-none text-foreground">
            <p className="lead">
                Mindfulness is a gentle, deeply healing practice that offers comfort and hope—even for those feeling weighed down by depression. At its heart, mindfulness means simply paying attention to the present moment, just as it is, without judgment or criticism. For beginners, this could be as simple as noticing the sensation of the breath entering and leaving the body, the feeling of clothes on the skin, or the colors and sounds in the environment. There is no need for incense, perfect silence, or crossed legs; mindfulness can be practiced while sitting, lying down, or even during simple daily activities like taking a walk or sipping tea.
            </p>
            <p>
                Scientific studies show that practicing mindfulness for just 10 minutes a day can actually change the structure of the brain, strengthening the ability to handle difficult emotions and preventing repeated episodes of depression. People who meditate regularly learn to experience feelings like sadness without being overwhelmed or tangled up in negative thoughts—unlike those who do not meditate, who often get caught up in dwelling and worrying. Through regular practice, mindfulness helps individuals become more aware of their automatic thought patterns, offering the empowering realization that it’s possible to gently guide attention toward the present, rather than staying stuck in cycles of negativity.
            </p>
            <p>
                A beautiful part of mindfulness is that distractions and wandering thoughts aren’t failures—they’re opportunities to practice bringing focus back, like exercising a muscle in the mind. If negative or restless thoughts arise, they are simply acknowledged, named, and allowed to drift away, making space for more peaceful moments without harsh self-judgment. Many people find that, over time, mindfulness helps them notice early signs of depression before they become overwhelming, helping them respond with kindness and self-care.
            </p>
            <p>
                For anyone new to mindfulness, it’s recommended to start small: just five to ten minutes a day, without striving for any particular result except gentle attention to the present moment. There’s no need to pressure oneself for instant peace or happiness—the process itself is healing, even when the mind feels restless or emotions seem heavy. Little by little, beginners often discover a lighter mind, a softening of sadness, and the return of simple joys, all building a sense of hope that brighter days are possible—one mindful breath, one gentle moment at a time.
            </p>
        </div>
    ),
    "guide_2": (
        <div className="prose prose-sm max-w-none text-foreground">
            <p className="lead">
                Managing stress and anxiety—and building healthy habits in the process—can feel like a daunting journey, especially when life feels overwhelming. Yet, mindfulness offers a simple, step-by-step refuge for anyone seeking peace.
            </p>
            <p>
                Even just ten minutes of mindful meditation a day can help quiet racing thoughts, calm the body, and allow moments of deep relaxation; these brief pauses gently send signals of safety to the brain, lowering stress hormones and inviting a soothing sense of control back into life.
            </p>
            <p>
                With repeated practice, mindfulness changes the brain, making it easier to respond to stress with clarity instead of spiraling into negative thinking.
            </p>
        </div>
    ),
    "guide_3": (
        <div className="prose prose-sm max-w-none text-foreground">
            <p className="lead">
                Building healthy habits goes hand-in-hand with stress management, because small daily routines form the foundation for lasting well-being.
            </p>
            <p>
                Start by choosing just one gentle habit—like maintaining a regular sleep schedule, or making time for a walk or quiet reflection each day. Setting realistic and kind goals for oneself, celebrating even the tiniest progress, and practicing patience on setbacks all reinforce positive behavioral change over time.
            </p>
            <p>
                Sharing intentions with friends or family can offer encouragement and accountability as these healthier habits become a comforting routine.
            </p>
        </div>
    ),
    "default": (
        <div className="prose prose-sm max-w-none text-foreground">
            <p className="lead">
                This is a placeholder for a guide. In a real application, this space would be filled with rich, helpful content, including text, images, and interactive elements designed to support your wellness journey.
            </p>
            <p>
                For now, take a moment to breathe deeply. Inhale for four counts, hold for four, and exhale for six. Repeat this a few times.
            </p>
            <p>
                Remember, taking small steps and being kind to yourself are key components of mental well-being.
            </p>
        </div>
    )
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
          <>
            <DialogHeader className="sr-only">
                <DialogTitle>{resource.description}</DialogTitle>
                <DialogDescription>Audio player for {resource.description}</DialogDescription>
            </DialogHeader>
            <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <Headphones className="h-16 w-16 text-primary mb-4" />
              <p className="text-lg font-medium mb-4">Now playing: {resource.description}</p>
              <audio controls autoPlay className="w-full" src={resource.audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          </>
        );
      case "video":
        return (
            <>
                <DialogHeader className="sr-only">
                    <DialogTitle>{resource.description}</DialogTitle>
                    <DialogDescription>Video player for {resource.description}</DialogDescription>
                </DialogHeader>
                <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <Video className="h-16 w-16 text-primary mb-4" />
                    <p className="text-lg font-medium mb-4">Now playing: {resource.description}</p>
                </div>
            </>
        );
      case "guide":
        return (
            <>
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold font-headline">{resource.description}</DialogTitle>
                            <DialogDescription>Wellness Guide</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                {guideContent[resource.id as keyof typeof guideContent] || guideContent.default}
            </>
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
