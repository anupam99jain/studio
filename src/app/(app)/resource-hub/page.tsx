
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";
import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { PlayableResourceDialog } from "@/components/playable-resource-dialog";

export default function ResourceHubPage() {
  const [selectedResource, setSelectedResource] = useState<ImagePlaceholder | null>(null);

  const audioResources = PlaceHolderImages.filter(img => img.id.startsWith("audio_"));
  const guideResources = PlaceHolderImages.filter(img => img.id.startsWith("guide_"));
  const videoResources = PlaceHolderImages.filter(img => img.id.startsWith("video_"));

  const ResourceGrid = ({ resources }: { resources: typeof PlaceHolderImages }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <Card key={resource.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setSelectedResource(resource)}>
          <CardHeader className="p-0">
            <div className="relative aspect-video">
              <Image
                src={resource.imageUrl}
                alt={resource.description}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                data-ai-hint={resource.imageHint}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-12 w-12 text-white/80" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold">{resource.description}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Psychological Resource Hub</h1>
        <p className="text-muted-foreground">A curated collection of content to support your mental wellness journey.</p>
      </div>

      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audio">Relaxing Audio</TabsTrigger>
          <TabsTrigger value="guides">Wellness Guides</TabsTrigger>
          <TabsTrigger value="videos">Calming Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="audio" className="mt-6">
          <ResourceGrid resources={audioResources} />
        </TabsContent>
        <TabsContent value="guides" className="mt-6">
          <ResourceGrid resources={guideResources} />
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <ResourceGrid resources={videoResources} />
        </TabsContent>
      </Tabs>

      <PlayableResourceDialog
        resource={selectedResource}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedResource(null);
          }
        }}
      />
    </div>
  );
}
