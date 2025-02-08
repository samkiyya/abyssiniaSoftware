import Image from "next/image";
import { Twitter, Facebook, Linkedin, Instagram } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Jhone Bi",
    role: "Application Manager",
    image: "/placeholder.jpg",
    socialLinks: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Sani Awesome",
    role: "Social Media",
    image: "/placeholder.jpg",
    socialLinks: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Andrio Willi",
    role: "Content Writer",
    image: "/placeholder.jpg",
    socialLinks: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 4,
    name: "Afa Jonson",
    role: "Business Manager",
    image: "/placeholder.jpg",
    socialLinks: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-light_primary">Team</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-light_primary mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={member.socialLinks.twitter}
                    className="text-gray-400 hover:text-light_primary transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.socialLinks.facebook}
                    className="text-gray-400 hover:text-light_primary transition-colors"
                    aria-label={`${member.name}'s Facebook`}
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={member.socialLinks.linkedin}
                    className="text-gray-400 hover:text-light_primary transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.socialLinks.instagram}
                    className="text-gray-400 hover:text-light_primary transition-colors"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
