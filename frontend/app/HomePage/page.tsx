import { FooterSection } from "../components/Footer";
import Header from "../components/header";
import HomeCategories from "../components/homeCategories";
import Bestsellers from "../components/bestsellers";
import Slider from "../components/slider";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-500 overflow-x-hidden">
      <Header />
      <Slider />
      <Bestsellers />
      <HomeCategories />
      <FooterSection />
    </div>
  );
}
