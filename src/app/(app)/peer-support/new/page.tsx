
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <div>
         <Button variant="ghost" asChild className="-ml-4 mb-4">
            <Link href="/peer-support">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Forum
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Create a New Anonymous Post</h1>
        <p className="text-muted-foreground">Share what's on your mind. Your post is completely anonymous.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
              <Input id="title" placeholder="Give your post a clear and concise title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-lg font-semibold">Your Message</Label>
              <Textarea
                id="content"
                placeholder="Describe your situation, ask a question, or share your feelings. Be respectful and mindful of others."
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-lg font-semibold">Tags</Label>
              <Input id="tags" placeholder="Add tags to help others find your post (e.g., Stress, Anxiety, Social)" />
              <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
            </div>
            <div className="flex justify-end">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Post Anonymously
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
