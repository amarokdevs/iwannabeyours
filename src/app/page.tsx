
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommitmentForm } from "@/components/CommitmentForm";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShimmeringText } from "@/components/ShimmeringText";
import { cn } from "@/lib/utils";

type HomePageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};


export default function Home({ searchParams }: HomePageProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showShimmer, setShowShimmer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCommitClick = () => {
    if (clickCount === 1) {
      setShowShimmer(true);
    } else {
      setClickCount((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    setShowShimmer(false);
    setShowForm(true);
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    setShowForm(false);
  };

  const buttonTexts = [
    "Are you sure to get committed?",
    "Are you sure? There is no go back from it.",
  ];

  if (showShimmer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 text-center text-foreground overflow-hidden">
        <div className="animate-in fade-in-50 duration-1000 w-full max-w-md flex flex-col items-center gap-6">
          <Card className="w-full max-w-sm sm:max-w-md border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
                <p className="text-lg sm:text-xl text-muted-foreground mb-4">You Are Getting Committing With</p>
                <ShimmeringText text="@i.deepak.dev" />
            </CardContent>
          </Card>
          <Button
            onClick={handleContinue}
            size="lg"
            variant="outline"
            className="px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 transform bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 text-center text-foreground overflow-hidden">
        <div className="animate-in fade-in-50 duration-1000 w-full max-w-md">
            {isSubmitted ? (
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8">
                    <div className="space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                            <Heart className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-headline">Thank You</h1>
                        <p className="text-base sm:text-lg text-muted-foreground">
                        The user will text you later and you can plan the future plans there.
                        </p>
                    </div>
                </Card>
            ) : showForm ? (
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
                        variant={clickCount === 1 ? "red-velvet" : "destructive"}
                        className={cn(
                          "mt-8 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 transform",
                          "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                        )}
                    >
                        {buttonTexts[clickCount]}
                    </Button>
                </div>
            )}
        </div>
    </div>
  );
}
