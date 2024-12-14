import Link from "next/link";
import { FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          
          <div>
            <h2 className="text-xl font-bold text-white mb-4">About Connect किसान</h2>
            <p className="text-white text-sm">
              Connect Kisaan bridges the gap between farmers, retailers, and
              consumers by promoting local produce and fostering a sustainable
              community-driven economy.
            </p>
          </div>

          
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-green-800 transition-colors duration-300 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-800 transition-colors duration-300 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-800 transition-colors duration-300 font-medium">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-800 transition-colors duration-300 font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white text-sm">
              Have questions? Reach out to us:
            </p>
            <p className="mt-2">
              <strong className="text-white">Email:</strong>{" "}
              <Link
                href="mailto:support@connectkisan.com"
                className="hover:text-green-800"
              >
                support@connectkisan.com
              </Link>
            </p>
            <p>
              <strong className="text-white">Phone:</strong> (+977) 9840000000
            </p>
          </div>
        </div>

        
        <div className="mt-8 flex  md:flex-row items-center justify-between text-sm">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Connect किसान. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-white hover:text-green-800 text-xl"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-white hover:text-green-800 text-xl"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-white hover:text-green-800 text-xl"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
