"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function VerifyIdForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleVerify = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload your college ID card to proceed.",
      });
      return;
    }

    setIsVerifying(true);
    // Simulate AI verification
    setTimeout(() => {
      toast({
        title: "Verification Successful",
        description: "Your student status has been confirmed.",
      });
      router.push("/student-onboarding/questionnaires");
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {!previewUrl ? (
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center transition hover:border-primary"
        >
          <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm text-muted-foreground">PNG, JPG, or JPEG (max. 4MB)</p>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image src={previewUrl} alt="College ID Preview" layout="fill" objectFit="contain" />
        </div>
      )}

      <div className="flex justify-between items-center">
        {previewUrl && (
          <Button variant="outline" onClick={() => {
              setFile(null);
              setPreviewUrl(null);
          }}>
            Choose a different file
          </Button>
        )}
        <Button onClick={handleVerify} disabled={isVerifying || !file} className={`ml-auto ${!previewUrl ? 'w-full' : ''}`}>
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
