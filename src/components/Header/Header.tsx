import { useState } from 'react';
import { Container, Group, Text, Badge, ActionIcon, Popover, Stack, Button } from '@mantine/core';
import { IconShoppingCart, IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useCart } from '../../contexts/CartContext';
import styles from './Header.module.css';

export const Header = () => {
  const [opened, setOpened] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <header className={styles.header}>
      <Container size="xl">
        <Group justify="space-between" h={60}>
          <Group gap="sm">
            <Text size="xl" fw={700} c="#54b46a">
              Vegetable
            </Text>
            <Badge size="lg" color="#54b46a" variant="filled">
              SHOP
            </Badge>
          </Group>

          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            width={400}
            position="bottom-end"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <ActionIcon
                variant="filled"
                color="#54b46a"
                size="xl"
                radius="md"
                onClick={() => setOpened(!opened)}
              >
                <Group gap={4}>
                  <IconShoppingCart size={18} />
                  {cart.totalItems > 0 && (
                    <Badge size="xs" color="red" variant="filled" circle>
                      {cart.totalItems}
                    </Badge>
                  )}
                </Group>
              </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown p="md">
              <Text fw={600} mb="md">Cart</Text>
              
              {cart.items.length === 0 ? (
                <Text c="dimmed" ta="center" py="xl">
                  Your cart is empty
                </Text>
              ) : (
                <>
                  <Stack gap="md" mb="md">
                    {cart.items.map(item => (
                      <Group key={item.product.id} justify="space-between" wrap="nowrap">
                        <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: 4, 
                            overflow: 'hidden',
                            flexShrink: 0
                          }}>
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400';
                              }}
                            />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <Text fw={500} size="sm" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.product.title}
                            </Text>
                            <Text size="xs" c="dimmed">1 kg</Text>
                            <Text fw={600} c="#54b46a">$ {item.product.price}</Text>
                          </div>
                        </Group>
                        
                        <Group gap="xs" style={{ flexShrink: 0 }}>
                          <ActionIcon
                            size="sm"
                            variant="light"
                            color="gray"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <IconMinus size={12} />
                          </ActionIcon>
                          
                          <Text fw={500} w={20} ta="center">{item.quantity}</Text>
                          
                          <ActionIcon
                            size="sm"
                            variant="light"
                            color="gray"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <IconPlus size={12} />
                          </ActionIcon>
                          
                          <ActionIcon
                            size="sm"
                            variant="light"
                            color="red"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <IconTrash size={12} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                  
                  <Group justify="space-between" pt="md" style={{ borderTop: '1px solid #e9ecef' }}>
                    <Text fw={600}>Total</Text>
                    <Text fw={700} c="#54b46a">$ {cart.totalPrice.toFixed(2)}</Text>
                  </Group>
                  
                  <Button
                    fullWidth
                    mt="md"
                    color="red"
                    variant="light"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </>
              )}
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Container>
    </header>
  );
};