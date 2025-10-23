import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Header } from '../Header';
import { CartProvider } from '../../../contexts/CartContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

const renderWithMantine = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      <CartProvider>
        {component}
      </CartProvider>
    </MantineProvider>
  );
};

describe('Header', () => {
  it('renders header with site name', () => {
    renderWithMantine(
      <Header />
    );

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
  });

  it('shows cart icon', () => {
    renderWithMantine(
      <Header />
    );

    const cartIcon = screen.getByRole('button');
    expect(cartIcon).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', async () => {
    renderWithMantine(
      <Header />
    );

    const cartButton = screen.getByRole('button');
    fireEvent.click(cartButton);

    expect(await screen.findByText('Your cart is empty')).toBeInTheDocument();
  });
});