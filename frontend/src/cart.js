const CART_KEY = "bravo_cart";

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const getCart = () => readCart();

export const isInCart = (eventId) => readCart().some((item) => item.id === eventId);

export const addToCart = (event) => {
  const cart = readCart();

  if (cart.some((item) => item.id === event.id)) {
    return { success: false, alreadyInCart: true, cart };
  }

  const nextCart = [...cart, { ...event, addedAt: new Date().toISOString() }];
  writeCart(nextCart);
  return { success: true, cart: nextCart };
};

export const removeFromCart = (eventId) => {
  const nextCart = readCart().filter((item) => item.id !== eventId);
  writeCart(nextCart);
  return nextCart;
};
