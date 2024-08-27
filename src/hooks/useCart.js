import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { db } from '../data/db';


function useCart() {
    const initialCart = () => JSON.parse(localStorage.getItem("cart")) || [];

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    
    useEffect(() => {
      saveLocalStorage();
    }, [cart]);
  
    function addToCart(item) {
      const itemExist = cart.findIndex((element) => element.id === item.id);
      if (itemExist >= 0) {
        const newCart = cart.map((element) =>
          element.id === item.id
            ? { ...element, quantity: element.quantity + 1 }
            : element
        );
        setCart(newCart);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    }
    function deleteFromCart(id) {
      const newCart = cart.filter((element) => element.id !== id);
      setCart(newCart);
    }
  
    function increaseQuantity(id) {
      const newCart = cart.map((element) =>
        element.id === id ? { ...element, quantity: element.quantity + 1 } : element
      );
      setCart(newCart);
    }
  
    function decreaseQuantity(id) {
      const newCart = cart.map((element) =>
        element.id === id ? { ...element, quantity: element.quantity - 1 } : element
      );
      setCart(newCart);
    }
    
    function clearCart() {
      setCart([]);
    }
  
    function saveLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }


    const total = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  };
}

export default useCart;