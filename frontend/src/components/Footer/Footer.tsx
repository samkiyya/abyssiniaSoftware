"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { contactInfo } from "../ContactUs/ContactUsSection";

const services = [
  { name: "Web Design", href: "/services" },
  { name: "App Development", href: "/services" },
  { name: "Seo Optimization", href: "/services" },
  { name: "Software As Service", href: "/services" },
  { name: "General Technology Consulting", href: "/services" },
  { name: "Software Development Training", href: "/services" },
  { name: "Software Security Testing", href: "/services" },
];

const information = [
  { name: "About", href: "/#" },
  { name: "Service", href: "/services" },
  { name: "FAQs", href: "/#faq" },
  { name: "Blogs", href: "/blogs" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a1af3] text-gray-300 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">ASS</h2>
            </div>
            <p className="text-sm text-justify">
              Abyssinia Software Solutions is dedicated to providing innovative
              and reliable software solutions that empower businesses to thrive.
              Explore cutting-edge technology tailored to your needs.
            </p>

            <div className="space-y-2">
              <h3 className="text-light_primary font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-gray-400 hover:text-light_primary transition-colors"
                      aria-label={link.name}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-light_primary font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm hover:text-light_primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-light_primary font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {information.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-light_primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-light_primary font-semibold mb-6">
                Contacts
              </h3>
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <Icon className="w-4 h-4 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-sm mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600 text-xs">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            Abyssinia Software solution © 2024 - Designed by{" "}
            <Link
              href="/"
              className="text-light_primary hover:text-light_primary/80"
            >
              Abyssinia Software solution
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
