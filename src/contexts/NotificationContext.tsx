import React, { createContext, useContext, ReactNode } from 'react';
import { notifications } from '@mantine/notifications';

interface NotificationContextType {
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const showSuccess = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'green',
    });
  };

  const showError = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'red',
    });
  };

  const showInfo = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'blue',
    });
  };

  const value: NotificationContextType = {
    showSuccess,
    showError,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};