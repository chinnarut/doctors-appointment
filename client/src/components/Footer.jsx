import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left-section */}
        <div>
          <Link
            to={"/"}
            onClick={() => scrollTo(0, 0)}
            className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer inline-block mb-5"
          >
            HEALTH UP
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 leading-6 text-justify">
            Health Up transforms how you access healthcare. Connect with
            licensed medical professionals from anywhere through secure online
            consultations. Schedule appointments, receive prescriptions, and get
            the care you need—conveniently, privately, and professionally.
          </p>
        </div>
        {/* center-section */}
        <div>
          <p className="text-xl font-extrabold mb-5 bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent">
            COMPANY
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* right-section */}
        <div>
          <p className="text-xl font-extrabold mb-5 bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent">
            GET IN TOUCH
          </p>
          <ul>
            <li>033-444-5555</li>
            <li>health-up@mail.com</li>
          </ul>
        </div>
      </div>
      {/* copy-right */}
      <div>
        <hr className="border-gray-400" />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright 2025&copy; Health Up - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
