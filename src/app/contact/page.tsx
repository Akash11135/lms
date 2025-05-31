"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const zodErrors = result.error.format();
      const errors: typeof fieldErrors = {};
      for (const key of Object.keys(zodErrors) as (keyof ContactFormData)[]) {
        const issue = zodErrors[key]?._errors;
        if (issue && issue.length) errors[key] = issue[0];
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || "Server error");
      }

      setSubmitSuccess(body.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Submit error:", err);
      setSubmitError(err.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md h-100 mt-10 shadow-xl w-120 border border-black">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <Input
            id="name"
            placeholder="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              fieldErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <Input
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <Textarea
            id="message"
            placeholder="Type your message here..."
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              fieldErrors.message ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.message && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {submitSuccess && (
          <p className="text-green-600 text-center mt-4">{submitSuccess}</p>
        )}
        {submitError && (
          <p className="text-red-600 text-center mt-4">{submitError}</p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
