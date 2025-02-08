import {
  FileText,
  Lightbulb,
  Monitor,
  DollarSign,
  Cog,
  Headphones,
} from "lucide-react";
import Image from "next/image";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function Feature({ icon, title, description, className = "" }: FeatureProps) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="shrink-0 w-8 h-8 flex items-center justify-center text-light_primary">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-light_seconday text-lg">{title}</h3>
        <p className="text-sm text-light_third leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-light_primary mb-2">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-sm">
            At Abyssinia Software Solutions, we combine innovation, expertise,
            and a customer-centric approach to deliver technology solutions that
            drive success. Discover the difference we bring to your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-12">
            <Feature
              icon={<FileText className="w-7 h-7" />}
              title="Experience"
              description="We bring extensive expertise to every project, ensuring the highest quality and professionalism."
              className="lg:text-right lg:flex-row-reverse"
            />
            <Feature
              icon={<Lightbulb className="w-7 h-7" />}
              title="Products"
              description="Innovative and tailored products designed to meet your unique needs and requirements."
              className="lg:text-right lg:flex-row-reverse"
            />
            <Feature
              icon={<Monitor className="w-7 h-7" />}
              title="Approach"
              description="A systematic and creative approach to solving complex challenges effectively."
              className="lg:text-right lg:flex-row-reverse"
            />
          </div>

          {/* Center Image */}
          <div className="relative aspect-square">
            <Image
              src="/whychooseus.jpg"
              alt="Digital Workspace Illustration"
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <Feature
              icon={<DollarSign className="w-7 h-7" />}
              title="Pricing"
              description="Transparent and competitive pricing that offers great value for your investment."
            />
            <Feature
              icon={<Cog className="w-7 h-7" />}
              title="Delivery"
              description="Efficient and timely delivery to ensure your goals are achieved seamlessly."
            />
            <Feature
              icon={<Headphones className="w-7 h-7" />}
              title="Support"
              description="Dedicated support to assist you at every step of your journey with us."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
