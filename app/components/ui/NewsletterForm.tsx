"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Button from "./Button";
import Input from "./Input";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterFormProps {
  variant?: "inline" | "stacked";
  showName?: boolean;
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
}

export default function NewsletterForm({
  variant = "inline",
  showName = false,
  className,
  title,
  description,
  buttonText = "Subscribe",
  successMessage = "Thank you for subscribing! Check your email to confirm.",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("text-center p-6", className)}>
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <p className="text-lg font-medium text-primary">{successMessage}</p>
      </div>
    );
  }

  const isInline = variant === "inline";

  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-heading font-bold text-primary mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          isInline
            ? "flex flex-col sm:flex-row gap-3"
            : "space-y-4"
        )}
      >
        {showName && (
          <div className={isInline ? "flex-1" : ""}>
            <Input
              {...register("firstName")}
              placeholder="First name (optional)"
              disabled={status === "loading"}
            />
          </div>
        )}

        <div className={isInline ? "flex-1" : ""}>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            disabled={status === "loading"}
          />
        </div>

        <Button
          type="submit"
          isLoading={status === "loading"}
          rightIcon={<Send className="w-4 h-4" />}
          className={isInline ? "w-full sm:w-auto" : "w-full"}
        >
          {buttonText}
        </Button>
      </form>

      {status === "error" && (
        <div className="flex items-center gap-2 mt-3 text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export function NewsletterSection() {
  return (
    <section id="newsletter" className="section-padding bg-gradient-to-r from-primary to-success">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Join Our Muslim Family
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get exclusive updates about the book launch, free Ramadan activities,
            and parenting tips for raising curious Muslim kids.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <NewsletterForm
              variant="inline"
              showName
              buttonText="Join Waitlist"
              successMessage="You are on the list! Check your email for a welcome message."
            />
            <p className="text-sm text-white/70 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
