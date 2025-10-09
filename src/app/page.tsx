"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommitmentForm } from "@/components/CommitmentForm";
import { Heart } from "lucide-react";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCommitClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  const buttonTexts = [
    "Are you sure to get committed?",
    "Are you sure? There is no go back from it.",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 text-center text-foreground overflow-hidden">
        <div className="animate-in fade-in-50 duration-1000 w-full max-w-md">
            {isSubmitted ? (
                <div className="space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <Heart className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-headline">Thank You</h1>
                    <p className="text-base sm:text-lg text-muted-foreground">
                    The user will text you later and you can plan the future plans there.
                    </p>
                </div>
            ) : clickCount >= 2 ? (
                <CommitmentForm onSubmitSuccess={handleSubmitSuccess} />
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline tracking-tight whitespace-nowrap">
                        Need a Update?
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground">
                        A single click to start a new chapter.
                    </p>
                    <Button
                        onClick={handleCommitClick}
                        size="lg"
                        variant="destructive"
                        className="mt-8 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 transform"
                    >
                        {buttonTexts[clickCount]}
                    </Button>
                </div>
            )}
        </div>
    </main>
  );
}
