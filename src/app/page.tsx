"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/homeComponents/header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();

  const navigateRoute = (route: any) => {
    router.replace(route);
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen px-20 flex flex-col justify-start mt-20">
        <div className="w-full flex justify-between items-center">
          <div className="max-w-lg">
            <h1 className="text-7xl capitalize font-bold tracking-tight leading-snug">
              Supporting
              <span className="inline-block">
                local <span className="text-primary">farmers</span>
              </span>
            </h1>
            <p className="mt-6 text-sm text-gray-700 leading-6">
              At <span className="font-bold text-primary">Connect किसान</span>,
              our mission is to bridge the gap between farmers, retailers, and
              customers, fostering a sustainable and thriving ecosystem for
              local businesses. We believe that farmers are the backbone of our
              economy, and empowering them with the tools and platforms to reach
              their customers directly is key to fostering growth and
              self-reliance.
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                className="px-6 py-3 bg-primary border-2 border-transparent text-white rounded-lg hover:border-primary hover:border-2 duration-300 transition-all hover:bg-transparent hover:text-primary"
                onClick={() => navigateRoute("/sign-up")}
              >
                Register Business
              </button>
              <button
                className="px-6 py-3 border-2 border-primary bg-transparent text-primary rounded-lg hover:bg-primary hover:text-white duration-300 transition-all"
                onClick={() => navigateRoute("/shop")}
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="ml-10">
            <Image
              alt="home-image"
              height={700}
              width={700}
              src="/homeImage.jpg"
              className="object-cover rounded-2xl shadow-lg hover:shadow-[0px_0px_30px_10px_rgba(34,197,94,0.6)] transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
