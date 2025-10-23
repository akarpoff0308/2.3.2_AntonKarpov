import { renderHook, act } from '@testing-library/react';
import { useCart, CartProvider } from '../../contexts/CartContext';
import { Product } from '../../types';
import { describe, expect, it } from 'vitest';
import React from 'react';

const mockProduct: Product = {
  id: 1,
  sku: 'test-sku',
  title: 'Test Vegetable',
  description: 'Test description',
  availabilityStatus: 'In Stock',
  category: 'vegetables',
  price: 50,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  tags: ['fresh'],
  brand: 'test',
  weight: 1,
  dimensions: { width: 10, height: 10, depth: 10 },
  warrantyInformation: '',
  shippingInformation: '',
  returnPolicy: '',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '',
    updatedAt: '',
    barcode: '',
    qrCode: ''
  },
  images: [],
  thumbnail: 'test-image.jpg'
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useCart', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.totalItems).toBe(0);
    expect(result.current.cart.totalPrice).toBe(0);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items[0].product.id).toBe(1);
    expect(result.current.cart.items[0].quantity).toBe(2);
    expect(result.current.cart.totalItems).toBe(2);
    expect(result.current.cart.totalPrice).toBe(100);
  });

  it('should update quantity for existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items[0].quantity).toBe(3);
    expect(result.current.cart.totalItems).toBe(3);
    expect(result.current.cart.totalPrice).toBe(150);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.totalItems).toBe(0);
    expect(result.current.cart.totalPrice).toBe(0);
  });

  it('should clear entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.totalItems).toBe(0);
    expect(result.current.cart.totalPrice).toBe(0);
  });
});