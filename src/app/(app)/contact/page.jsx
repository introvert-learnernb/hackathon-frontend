"use client";

import Link from "next/link";
import { useState } from "react";

const Contact = () => {

  const [contactData , setContactData] = useState({
    name : "",
    email : "",
    message : ""
  })

  const handleChange = (e)=>{
    setContactData(prevData => {
      let updatedData = {
        ...prevData , [e.target.name] : e.target.value
      }
      return updatedData
    })
  }

  const handleClick = (e)=>{
    e.preventDefault();
    console.log("Contact Form Data ",contactData);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We would love to hear from you! Whether you have questions about our
            platform, need assistance, or want to share your feedback, feel free
            to reach out using the form below.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <form className="bg-white shadow-lg rounded-lg p-8 space-y-6">
           
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

        
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

          
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={contactData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

         
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-primary border-2 border-transparent text-white font-semibold rounded-lg hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary transition-all duration-300"
                onClick={handleClick}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Or you can reach us directly at
            <Link
              href="mailto:support@connectkisan.com"
              className="text-primary underline ml-2"
            >
              support@connectkisan.com
            </Link>
          </p>
          <p className="mt-4">
            <strong>Phone:</strong> (+977) 9840000000
          </p>
          <p>
            <strong>Address:</strong> Thapathali , Kathmandu
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
