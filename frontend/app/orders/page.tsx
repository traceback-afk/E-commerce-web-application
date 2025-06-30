"use client";
import { useState, useEffect } from "react";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import { redirect } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { PackageCheck, Truck, CheckCircle, AlertCircle } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/");
    }
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/shop/purchases/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700 transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <PackageCheck className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order #{order.id}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Placed on:{" "}
                  <span className="font-medium">
                    {format(new Date(order.created_at), "PPpp")}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total: <span className="font-medium">${order.total}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Shipping to:{" "}
                  <span className="font-medium">{order.shipping_address}</span>
                </p>

                <div className="mt-6 space-y-2">
                  <ProgressStep
                    active={order.is_completed}
                    label="Completed"
                    icon={<CheckCircle className="w-5 h-5" />}
                  />
                  <ProgressStep
                    active={order.is_shipped}
                    label="Shipped"
                    icon={<Truck className="w-5 h-5" />}
                  />
                  <ProgressStep
                    active={order.is_received}
                    label="Received"
                    icon={<PackageCheck className="w-5 h-5" />}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-lg">You don't currently have any orders.</span>
            </div>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}

type ProgressStepProps = {
  active: boolean;
  label: string;
  icon: React.ReactNode;
};

function ProgressStep({ active, label, icon }: ProgressStepProps) {
  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg ${
        active
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
      }`}
    >
      <div>{icon}</div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
