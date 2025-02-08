import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: {
    default:
      "Abyssinia Software Solutions | Leading Software Provider in Ethiopia",
    template: "%s | Abyssinia Software Solutions",
  },
  description:
    "Abyssinia Software Solutions offers innovative software solutions, including ERP systems, mobile app development, website design, and IT support, empowering businesses across Ethiopia and beyond.",
  keywords: [
    "abyssinia",
    "abysinia",
    "abyssinia Software Solutions",
    "abyssinia computer",
    "top software development companies",
    "top 10 software development companies",
    "best software development companies",
    "top 50 custom software development companies",
    "top software development in Addis Ababa, Ethiopia",
    "best software engineering services in Addis Ababa",
    "top software development firms",
    "best software development services",
    "best software development companies in Ethiopia",
    "top 10 nearshore software development companies in Ethiopia",
    "top custom software development companies",
    "top enterprise software development in Addis Ababa",
    "top 50 software development companies",
    "software development",
    "software engineer",
    "software development company",
    "agile software",
    // General Software Development
    "Software development company in Ethiopia",
    "Custom software solutions",
    "Experienced software developers in Addis Ababa",

    // Specific Solutions Offered
    "ERP system development",
    "E-learning software solutions",
    "Mall building management software",
    "Mobile app development (iOS and Android)",
    "Website design and development",

    // IT Services
    "IT consulting services in Ethiopia",
    "IT support for businesses",
    "Technology consulting for companies",
    "Managed IT services",

    // Local SEO Keywords
    "Best software company in Addis Ababa",
    "Top ERP providers in Ethiopia",
    "Custom mobile app developers in Ethiopia",
    "Affordable software solutions in Addis Ababa",

    // Long-Tail Keywords
    "Comprehensive ERP solutions for Ethiopian businesses",
    "E-learning platforms tailored for local education needs",
    "Reliable IT support services for small businesses in Ethiopia",
    "Expert mobile app development for startups in Addis Ababa",

    // Emerging Technologies
    "Innovative e-learning systems for educational institutions",
    "Cloud-based ERP solutions for efficient business management",
    "Affordable ERP systems for small businesses in Ethiopia",
    "Comprehensive e-learning solutions for educational institutions",
    "Reliable IT support for startups in Addis Ababa",

    "IT Company in Addis Ababa Ethiopia",
    "Best IT Company in Ethiopia",
    "Graphics Design Company in Ethiopia",
    "Best Hotels, Schools, NGO’s, Malls and Ecommerce Website Designer Company in Ethiopia",
    "Best Hospitals Software Development Company in Ethiopia",
    "Best Website Designer Company in Ethiopia",
    "IT Training and IT Support Company in Addis Ababa Ethiopia",

    "Artificial intelligence in business",
    "Cloud computing services in Ethiopia",
    "Mobile technology trends in Africa",
    "building managmnet system ",
    "tower managmnet system ",
    "mall managmnet system",
    "nearshore software development",
    "software outsourcing companies",
    "custom software development companies",
    "full stack web development",
    "custom software development",
    "sdlc",
    "software development companies near me",
    "offshore developers",
    "agile development",
    "embedded software engineer",
    "scrum software",
    "software development engineer",
    "offshore software development services",
    "custom software",
    "software development firms",
    "software development agency",
    "computer software engineer",
    "full stack software engineer",
    "android software development",
    "nearshore development",
    "software engineer companies",
    "product development software",
    "offshore software development company",
    "agile manifesto",
    "software engineer near me",
    "nearshore software development company",
    "python memory profiler",
    "custom software company",
    "software outsourcing",
    "software development consulting",
    "software designer",
    "cross platform software",
    "fintech software development",
    "python software engineer",
    "agile sdlc",
    "embedded software development",
    "enterprise software development",
    "software engineering services",
    "saas development company",
    "programming company",
    "custom software development services",
    "software development business",
    "software development in Addis Ababa, Ethiopia",
    "custom software companies in Ethiopia",
    "offshore software development Ethiopia",
    "full stack development in Addis Ababa",
    "Agile software development Ethiopia",
    "python software engineers in Ethiopia",
    "custom software development in Ethiopia",
    "Top Node.js development services Addis Ababa",
    "Best Express.js framework development Ethiopia",
    "NestJS backend developers Addis Ababa",
    "React.js development company Ethiopia",
    "Next.js server-side rendering experts Addis Ababa",
    "Angular development services Ethiopia",
    "Vue.js development specialists Addis Ababa",
    "Svelte framework development Ethiopia",
    "TypeScript development agency Addis Ababa",
    "Webpack bundling solutions Ethiopia",
    "Docker containerization experts Addis Ababa",
    "Kubernetes orchestration services Ethiopia",
    "Microservices architecture development Addis Ababa",
    "RESTful API development services Ethiopia",
    "GraphQL development experts Addis Ababa",
    "Serverless computing solutions in Ethiopia",
    "Firebase app development Addis Ababa",
    "MongoDB database development services Ethiopia",
    "PostgreSQL database solutions Addis Ababa",
    "MySQL database developers Ethiopia",
    "Redis caching services Addis Ababa",
    "AWS cloud solutions Ethiopia",
    "Azure cloud development experts Addis Ababa",
    "Google Cloud Platform integration Ethiopia",
    "CI/CD pipeline services Addis Ababa",
    "Jenkins automation solutions Ethiopia",
    "Terraform infrastructure experts Addis Ababa",
    "Ansible configuration management Ethiopia",
    "Apache Kafka streaming solutions Addis Ababa",
    "WebSockets real-time app development Ethiopia",
    "JAMstack architecture developers Addis Ababa",
    "Tailwind CSS design services Ethiopia",
    "Bootstrap frontend solutions Addis Ababa",
    "Material UI component developers Ethiopia",
    "Cypress testing framework Addis Ababa",
    "Jest JavaScript testing experts Ethiopia",
    "Mocha testing services Addis Ababa",
    "GraphQL subscriptions development Ethiopia",
    "Next.js static site generation Addis Ababa",
    "Progressive Web App development Ethiopia",
    "Redux state management experts Addis Ababa",
    "Vuex state management services Ethiopia",
    "Ionic mobile app development Addis Ababa",
    "Electron.js desktop apps Ethiopia",
    "Kubernetes Helm charts developers Addis Ababa",
    "AWS Lambda serverless architecture Ethiopia",
    "Docker Compose configuration Addis Ababa",
    "Cloud-native application development Ethiopia",
    "JAMstack technologies developers Addis Ababa",
    "Full-stack JavaScript development Ethiopia",
    "Frontend React development Addis Ababa",
    "Backend Node.js development services Ethiopia",
    "Vue.js state management experts Addis Ababa",
    "Enterprise software development Ethiopia",
    "Custom software development solutions Addis Ababa",
  ],
  openGraph: {
    title:
      "Abyssinia Software Solutions | Leading Software Provider in Ethiopia",
    description:
      "Empowering businesses with innovative and reliable technology solutions, Abyssinia Software Solutions specializes in custom software, ERP systems, and IT services tailored to meet diverse needs.",
    url: "https://abyssiniasoftware.com",
    type: "website",
    siteName: "Abyssinia Software Solutions",
    images: [
      {
        url: "https://abyssiniasoftware.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Abyssinia Software Solutions Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Abyssinia Software Solutions | Leading Software Provider in Ethiopia",
    description:
      "Providing custom software development, ERP systems, mobile apps, and IT support, Abyssinia Software Solutions empowers businesses in Ethiopia with cutting-edge technology.",
    site: "@abyssiniasoft",
    images: ["https://abyssiniasoftware.com/opengraph-image.png"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  authors: [{ name: "Abyssinia Software Solutions" }],
  alternates: {
    canonical: "https://abyssiniasoftware.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* JSON-LD for map location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              name: "Abyssinia Software Solutions",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bole Road, Addis Ababa",
                addressLocality: "Addis Ababa",
                addressRegion: "Addis Ababa",
                postalCode: "1000",
                addressCountry: "ET",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.2303413,
                longitude: 38.243804,
              },
              url: "https://abyssiniasoftware.com",
              hasMap: "https://maps.app.goo.gl/ZrM3jTuzDUMjgK7X6",
            }),
          }}
        />
        <meta name="geo.region" content="ET-AD" />
        <meta name="geo.placename" content="Addis Ababa" />
        <meta name="geo.position" content="9.2303413;38.243804" />
        <meta name="ICBM" content="9.2303413, 38.243804" />
        <meta name="og:url" content="https://abyssiniasoftware.com" />
        <meta
          name="og:hasMap"
          content="https://maps.app.goo.gl/ZrM3jTuzDUMjgK7X6"
        />
        <meta name="geo.coordinates" content="9.2303413, 38.243804" />

        {/* Optional Open Graph metadata for location */}
        <meta property="og:latitude" content="9.2303413" />
        <meta property="og:longitude" content="38.243804" />
        <meta
          property="og:location"
          content="Bole Road, Addis Ababa, Ethiopia"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col max-w-screen overflow-x-hidden antialiased bg-gray-500 bg-[url('/hero-bg.png')] bg-cover bg-fixed`}
        style={{
          backgroundPosition: "calc(30% - 20px)",
        }}
      >
        <Navbar />
        <div className="pt-16"></div>
        <div className="grow">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
