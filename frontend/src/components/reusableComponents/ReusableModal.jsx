import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { screenSize } from "../hooks/screenSize";

export default function ReusableModal({ onClose, modalContent }) {
  const { isMobile } = screenSize();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div
      className={`fixed inset-0 z-50 flex bg-green-darker/35 backdrop-blur-sm ${
        isMobile ? "items-end px-0 py-0" : "items-center justify-center px-4 py-8"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-capture-title"
    >
      <div
        className={`relative w-full bg-white shadow-2xl ${
          isMobile
            ? "max-h-[calc(100dvh-120px)] max-w-none rounded-t-[24px] px-4 pb-7 pt-6"
            : "max-w-[520px] rounded-[24px] px-7 py-10 sm:px-11 sm:py-11"
        }`}
      >
        {isMobile && (
          <span className="absolute left-1/2 top-2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-green-lightest" />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          disabled={isLoading}
          className={`absolute right-5 top-4 text-2xl leading-none text-green-dark transition hover:text-green-darker ${
            isMobile ? "sr-only" : ""
          }`}
        >
          &times;
        </button>

        
          <div>
            {modalContent}
          </div>



      </div>
    </div>
  );
}
