"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import { Mail, Phone, MapPin, User } from "lucide-react";

export default function Account() {
  const [account, setAccount] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/");
    }
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/user/me/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (response.status === 200) {
          setAccount(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred.", error);
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center px-4 py-12 space-y-10 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-extrabold text-center">Account Overview</h1>

        {!loading && account && (
          <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center text-center md:col-span-1">
              {account.profile_image ? (
                <img
                  src={account.profile_image}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                />
              ) : (
                <div className="w-36 h-36 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-5xl font-bold rounded-full shadow-lg">
                  {account.first_name[0]}
                </div>
              )}
              <h2 className="mt-4 text-xl font-semibold">
                {account.first_name} {account.last_name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">Account Holder</p>
            </div>

            {/* Info Cards Section */}
            <div className="md:col-span-2 grid gap-6">
              <InfoRow
                icon={<User className="w-5 h-5 text-blue-600" />}
                label="Full Name"
                value={`${account.first_name} ${account.last_name}`}
              />
              <InfoRow
                icon={<Mail className="w-5 h-5 text-red-500" />}
                label="Email"
                value={account.email}
              />
              <InfoRow
                icon={<Phone className="w-5 h-5 text-green-500" />}
                label="Phone"
                value={account.phone_number || "Not provided"}
              />
              <InfoRow
                icon={<MapPin className="w-5 h-5 text-yellow-500" />}
                label="Shipping Address"
                value={account.shipping_address || "No address on file"}
              />
            </div>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
        <p className="text-base font-semibold text-gray-900 dark:text-white break-words">{value}</p>
      </div>
    </div>
  );
}
