import React, { createContext, useContext, ReactNode, useState } from 'react';
import AddNotification from './AddNotification';

interface NotificationContextProps {
  children: ReactNode;
}

interface NotificationContextValue {
  showNotification: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationContextProps> = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);

  const contextValue: NotificationContextValue = {
    showNotification: () => setShowNotification(true),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {showNotification && <AddNotification message={`Product added to the cart`} onClose={() => setShowNotification(false)} />}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};