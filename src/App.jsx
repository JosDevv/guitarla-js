import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
import { useEffect, useState } from "react";
import  useCart  from "./hooks/useCart";

function App() {
  const {
    data,
    cart,
    setCart,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        total={total}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar, index) => (
            <Guitar
             key={index}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
              />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
