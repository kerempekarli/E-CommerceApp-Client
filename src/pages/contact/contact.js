import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">İletişim</h2>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
          <span className="text-lg">info@example.com</span>
        </div>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
          <span className="text-lg">+1234567890</span>
        </div>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faTwitter} className="text-gray-500 mr-2" />
          <a
            href="https://twitter.com/example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @example
          </a>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faInstagram} className="text-gray-500 mr-2" />
          <a
            href="https://www.instagram.com/example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            @example
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
