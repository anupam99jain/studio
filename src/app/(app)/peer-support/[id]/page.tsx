
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, User } from "lucide-react";
import Link from "next/link";

const forumPost = {
  id: 1,
  title: "Feeling overwhelmed with exam stress",
  content: "I have three finals next week and I feel like I can't keep up. Any advice on how to manage the pressure without burning out? I'm really struggling to focus and my usual study habits aren't working. It feels like everyone else has it together and I'm just falling further behind. What do you do when you feel this way?",
  tags: ["Exams", "Stress", "Academics"],
  author: "AnonymousStudent123",
  createdAt: "2 days ago",
  replies: [
    {
      id: 1,
      author: "HelpfulPeer",
      createdAt: "2 days ago",
      content: "I totally get that. Pomodoro technique (25 min focus, 5 min break) really helps me. Also, make sure you're getting enough sleep. It makes a huge difference!",
    },
    {
      id: 2,
      author: "AnotherStudent",
      createdAt: "1 day ago",
      content: "Don't forget to take real breaks! Go for a walk, listen to music, or do something you enjoy for a bit. It's not about studying more, but studying smarter.",
    },
    {
      id: 3,
      author: "WiseOwl",
      createdAt: "1 day ago",
      content: "Have you tried talking to a counselor? They have great strategies for managing exam stress. Your university likely has free resources for this.",
    },
  ],
};

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the post by params.id
  const post = forumPost;

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/peer-support">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Forum
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <span>Posted by {post.author}</span>
            <span>&middot;</span>
            <span>{post.createdAt}</span>
        </div>
        <div className="flex gap-2 pt-4">
            {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare />
            <span>{post.replies.length} Replies</span>
        </h2>

        {post.replies.map(reply => (
            <Card key={reply.id}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{reply.author}</span>
                        <span>&middot;</span>
                        <span>{reply.createdAt}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{reply.content}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Leave a Reply</CardTitle>
            <CardDescription>Your reply will be posted anonymously.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder="Share your thoughts and support..." rows={4} />
        </CardContent>
        <CardFooter>
            <Button className="ml-auto">Submit Reply</Button>
        </CardFooter>
      </Card>

    </div>
  );
}
