import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent font-semibold">
          CONTACT <span>US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Office</p>
          <p className="text-gray-500">
            111 Pahonyothin <br /> Ladprao Bangkok, Thailand
          </p>
          <p className="text-gray-500">
            Tel : 033-444-555 <br /> healthup@mail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            {" "}
            Careers at Health Up
          </p>
          <p className="text-gray-500">
            {" "}
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black rounded-sm px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-400 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
