"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  instagramId: z.string().min(1, {
    message: "Please provide your Instagram ID.",
  }),
});

type CommitmentFormProps = {
  onSubmitSuccess: () => void;
};

export function CommitmentForm({ onSubmitSuccess }: CommitmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      instagramId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
        const response = await fetch('/api/commit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: values.name,
              instagramId: `@${values.instagramId}`
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send commitment.');
        }

        onSubmitSuccess();
    } catch (error) {
        console.error("Error submitting form:", error);
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Could not save your commitment. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center p-4 sm:p-6">
        <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-muted">
            <PenSquare className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <CardTitle className="font-headline text-2xl sm:text-3xl">Your Details</CardTitle>
        <CardDescription className="pt-1 sm:pt-2 text-sm sm:text-base">
          This is the beginning of something beautiful. Please share your details to connect.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <CardContent className="space-y-4 px-4 sm:px-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramId"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Instagram ID</FormLabel>
                  <div className="flex h-10 w-full items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <span className="pl-3 pr-1 text-muted-foreground">@</span>
                    <FormControl>
                      <Input
                        placeholder="username"
                        className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
            <Button
              type="submit"
              className={cn(
                "w-full h-11 sm:h-12 text-base sm:text-lg font-semibold",
                isSubmitting && "animate-pulse"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sealing..." : "Seal the Commitment ❤️"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
