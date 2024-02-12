import React, { createContext, useContext, ReactNode, useState } from "react";
import AddNotification from "./AddNotification";

// Define the type for the notification state
interface NotificationState {
  show: boolean;
  message: string;
}

interface NotificationContextProps {
  children: ReactNode;
}

interface NotificationContextValue {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider: React.FC<NotificationContextProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: "",
  });

  const contextValue: NotificationContextValue = {
    showNotification: (message: string) =>
      setNotification({ show: true, message }), // Update here
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification.show && (
        <AddNotification
          message={notification.message}
          onClose={() => setNotification({ show: false, message: "" })}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
