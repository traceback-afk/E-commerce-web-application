"use client";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import { Mail, MapPin, Phone, Instagram, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center px-4 py-10 space-y-10 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold text-center">Get in Touch</h1>
        <p className="text-lg text-center max-w-xl">
          We'd love to hear from you! Whether you have a question about features, pricing, or anything else,
          our team is ready to answer all your questions.
        </p>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContactCard
              icon={<MapPin className="w-6 h-6 text-blue-600" />}
              title="Address"
              description="123 K.Kaymakli, Nicosia, Northern Cyprus"
            />
            <ContactCard
              icon={<Mail className="w-6 h-6 text-red-500" />}
              title="Email"
              description="info@Shop.com"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6 text-green-500" />}
              title="Phone"
              description="+90 533 123 4567"
            />
            <ContactCard
              icon={<MessageSquare className="w-6 h-6 text-green-500" />}
              title="WhatsApp"
              description={
                <a href="https://wa.me/905331234567" className="text-blue-400 hover:underline">
                  Chat on WhatsApp
                </a>
              }
            />
            <ContactCard
              icon={<Instagram className="w-6 h-6 text-pink-500" />}
              title="Instagram"
              description={
                <a href="https://instagram.com/Shop" target="_blank" className="text-blue-400 hover:underline">
                  @Shop
                </a>
              }
            />
          </div>

          <div className="w-full h-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.6791840936635!2d33.37364231534736!3d35.18556648031106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfcb7a7ff9ffb5%3A0x86a4cba21b36d8d4!2sNicosia!5e0!3m2!1sen!2str!4v1624567890123"
              width="100%"
              height="100%"
              style={{ minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
};

function ContactCard({ icon, title, description }: ContactCardProps) {
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
