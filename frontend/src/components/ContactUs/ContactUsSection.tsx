"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  icon: typeof MapPin;
  title: string;
  details: string[];
}

export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Address:",
    details: [
      "Addis Ababa, Bole Wollo Sefer",
      "Gorgoriwos adebaby 242 building 402",
    ],
  },
  {
    icon: Phone,
    title: "Phone:",
    details: ["+2519 5105 0364", "+2519 4063 7672"],
  },
  {
    icon: Mail,
    title: "Email:",
    details: ["abyssiniasoftware1@gmail.com", "info@abyssiniasoftware.com"],
  },
];

export default function ContactUsForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Please fill out this field";
    if (!data.email) newErrors.email = "Please fill out this field";
    if (!data.subject) newErrors.subject = "Please fill out this field";
    if (!data.message) newErrors.message = "Please fill out this field";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically send the data to your API
      const res = await fetch(
        `https://abyssiniasoftware.backend.senaryore.com/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        // throw new Error("Failed to send message");
        toast({
          title: "Error",
          description: "Check Your Network. And Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      // event.currentTarget.reset();
      // event.currentTarget.reset();
      setErrors({});
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 px-4 bg-white text-light_primary">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-600">
            Abyssinia Software Solutions offers high-quality software
            development services to help your business grow, with tailored
            solutions for web applications, optimization, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-12">
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="bg-purple-600/10 p-3 rounded-lg h-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject"
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Write Your Message*</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                className={`min-h-[100px] ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-light_primary hover:bg-light_primary/70 text-white"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
