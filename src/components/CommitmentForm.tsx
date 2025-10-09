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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      instagramId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onSubmitSuccess();
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md border-border/50 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <PenSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="font-headline text-3xl">Your Details</CardTitle>
        <CardDescription className="pt-2">
          This is the beginning of something beautiful. Please share your details to connect.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Instagram ID</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Sealing..." : "Seal the Commitment"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
