// AddNotification.tsx (Notification Component)

import React, { useState, useEffect } from "react";

const AddNotification: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-[70px] sm:top-[80px] left-0 right-0 z-[99999999] p-4 bg-green-500 text-white text-center font-bold ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {message}
    </div>
  );
};

export default AddNotification;
