import { AiChat } from "@/components/ai-chat";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiChatbotPage() {
  return (
    <div className="h-full">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">AI Mental Health Chatbot</h1>
            <p className="text-muted-foreground">A safe space to talk. Your conversations are private and secure.</p>
        </div>
        <AiChat />
    </div>
  );
}
