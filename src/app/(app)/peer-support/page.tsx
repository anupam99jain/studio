import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, PlusCircle, Eye } from "lucide-react";

const forumPosts = [
  {
    id: 1,
    title: "Feeling overwhelmed with exam stress",
    excerpt: "I have three finals next week and I feel like I can't keep up. Any advice on how to manage the pressure without burning out? I'm really struggling to focus...",
    replies: 12,
    views: 89,
    tags: ["Exams", "Stress"],
  },
  {
    id: 2,
    title: "How do you make friends in a new city?",
    excerpt: "I just moved here for college and I'm finding it hard to meet people outside of class. It's starting to feel pretty lonely. What are some good ways to connect with others?",
    replies: 25,
    views: 154,
    tags: ["Social", "Loneliness"],
  },
  {
    id: 3,
    title: "Dealing with imposter syndrome in my program",
    excerpt: "Everyone in my graduate program seems so much smarter and more accomplished than me. I feel like I don't belong here. Does anyone else feel this way?",
    replies: 18,
    views: 112,
    tags: ["Imposter Syndrome", "Academics"],
  },
];

export default function PeerSupportPage() {
  return (
    <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">Anonymous Peer Support Forum</h1>
                <p className="text-muted-foreground">Connect with fellow students, share experiences, and find support. All posts are anonymous.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
            </Button>
        </div>

        <div className="space-y-6">
            {forumPosts.map(post => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <div className="flex gap-2 pt-2">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.replies} Replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views} Views</span>
                            </div>
                        </div>
                        <Button variant="link">Read More</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
