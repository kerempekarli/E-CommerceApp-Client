import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
          nulla id nisi mollis, vel malesuada metus efficitur. Quisque
          pellentesque nunc et tellus volutpat, in rhoncus sem dictum. Duis
          tincidunt semper ante sed tempor.
        </p>
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
          <span className="text-gray-700">info@example.com</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
          <span className="text-gray-700">+123 456 7890</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
          <span className="text-gray-700">123 Main Street, City, Country</span>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-700 hover:text-blue-500">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-500">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-500">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
