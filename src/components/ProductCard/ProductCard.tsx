import React, { useState } from 'react';
import { Card, Text, Group, ActionIcon, Button } from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useNotifications } from '../../contexts/NotificationContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showSuccess } = useNotifications();

  const handleQuantityChange = (newQuantity: number) => {
    const maxStock = product.stock && product.stock > 0 ? product.stock : 999;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(
      'Added to cart',
      `${product.title} (${quantity}) added to your cart`
    );
    setQuantity(1);
  };

  const weightMatch = product.title.match(/(\d+\/\d+|\d+(\.\d+)?)\s*(kg|g|l|ml)/i);
  const extractedWeight = weightMatch
    ? weightMatch[0]
    : product.weight
    ? `${product.weight} kg`
    : '';
  const cleanTitle = product.title.replace(
    /-?\s*(\d+\/\d+|\d+(\.\d+)?)\s*(kg|g|l|ml)/i,
    ''
  ).trim();

  const resolveImageSrc = () => {
    if (product.thumbnail) {
      return product.thumbnail;
    }
    
    return 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.productCard}>
      <Card.Section>
        <div className={styles.imageContainer}>
          <img
            src={resolveImageSrc()}
            alt={cleanTitle}
            className={styles.productImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('pexels.com')) {
                target.src = 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400';
              }
            }}
          />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="sm" align="center">
        <Group gap="xs" align="center">
          <Text fw={600} size="lg">{cleanTitle}</Text>
          {extractedWeight && <Text size="sm" c="dimmed">{extractedWeight}</Text>}
        </Group>

        <Group gap="xs" align="center">
          <ActionIcon
            variant="light"
            color="gray"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            data-testid="decrease-quantity-button"
          >
            <IconMinus size={14} />
          </ActionIcon>

          <Text fw={500} size="sm" style={{ minWidth: 20, textAlign: 'center' }}>
            {quantity}
          </Text>

          <ActionIcon
            variant="light"
            color="gray"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={product.stock > 0 && quantity >= product.stock}
            data-testid="increase-quantity-button"
          >
            <IconPlus size={14} />
          </ActionIcon>
        </Group>
      </Group>

      <Group justify="space-between" mt="md" align="center">
        <Text fw={700} size="xl" c="#212529">
          $ {product.price}
        </Text>

        <Button
          leftSection={<IconShoppingCart size={16} color="#3B944E" />}
          onClick={handleAddToCart}
          color="#E7FAEB"
          variant="filled"
          className={styles.addToCartBtn}
          styles={{ label: { color: '#3B944E', fontWeight: 600 } }}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
