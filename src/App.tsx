import React from 'react';
import { MantineProvider, AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';

function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'green',
        colors: {
          green: [
            '#f0f9f4',
            '#e6f5ea',
            '#c7e9d1',
            '#a8ddb7',
            '#8bd19e',
            '#6fc584',
            '#54b46a',
            '#4a9960',
            '#407e56',
            '#35634c'
          ]
        }
      }}
    >
      <Notifications />
      <NotificationProvider>
        <CartProvider>
          <ProductProvider>
            <AppShell>
              <Header />
              
              <AppShell.Main>
                <ProductList />
              </AppShell.Main>
            </AppShell>
          </ProductProvider>
        </CartProvider>
      </NotificationProvider>
    </MantineProvider>
  );
}

export default App;