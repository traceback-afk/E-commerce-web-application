"use client";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import { Users, Target, ShieldCheck, Star } from "lucide-react";

export default function About() {
  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center px-4 py-10 space-y-10 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="text-lg text-center max-w-2xl">
          At <strong>Shop</strong>, we are passionate about providing top-quality products and exceptional customer service.
          Our journey began with a simple idea — to bring quality and affordability together in one place.
        </p>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <AboutCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Who We Are"
            description="We're a team of dedicated professionals committed to creating the best shopping experience for our customers."
          />
          <AboutCard
            icon={<Target className="w-6 h-6 text-red-500" />}
            title="Our Mission"
            description="To make shopping convenient, enjoyable, and accessible to everyone with high standards of quality and service."
          />
          <AboutCard
            icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
            title="Our Values"
            description="Integrity, customer focus, and innovation drive everything we do."
          />
          <AboutCard
            icon={<Star className="w-6 h-6 text-yellow-500" />}
            title="Why Choose Us?"
            description="We offer competitive pricing, reliable customer support, and a wide variety of handpicked items."
          />
        </div>

        <section className="mt-12 max-w-3xl text-center space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p>
            Founded in Nicosia, Northern Cyprus, we’ve grown into a trusted local brand known for our attention to
            detail, personal touch, and community-first approach. We believe every customer interaction is an opportunity
            to build trust and satisfaction.
          </p>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

type AboutCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function AboutCard({ icon, title, description }: AboutCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
