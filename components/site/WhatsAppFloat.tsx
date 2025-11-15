'use client'

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const phoneNumber = "+254745319042"; 
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contact via WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 group"
    >
      <div className="relative">
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>

        {/* Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 cursor-pointer">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-white border border-gray-200 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          <span className="text-sm text-gray-700">Chat on WhatsApp</span>
        </div>
      </div>
    </button>
  );
}

