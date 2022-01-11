import { useState } from "react";
import "./style/index.css";
import BookStore from "./components/BookStore";
import Navigation from "./components/Navigation";

function App() {
  const [cart, setCart] = useState([]);
  const [openList, setOpenList] = useState(false);

  const addToCart = (book) => {
    if (cart.find((item) => item.title === book.title)) {
      setCart(
        cart.map((x) => {
          if (x.title === book.title) {
            return {
              ...x,
              quantity: x.quantity + 1,
            };
          } else return x;
        })
      );
    } else {
      setCart((prevCart) => [...prevCart, book]);
    }
  };

  const toggleCart = () => {
    setOpenList(!openList);
  };

  const removeFromCart = (id) => {
    const foundBook = cart.find((item) => item.id === id);
    if (foundBook && foundBook.quantity > 1) {
      setCart(
        cart.map((x) => {
          if (x.id === id) {
            return {
              ...x,
              quantity: x.quantity - 1,
            };
          } else return x;
        })
      );
    } else {
      setCart(cart.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="App">
      <Navigation openList={openList} toggleCart={toggleCart} />
      {openList ? (
        <>
          <div>
            {cart.map((book) => (
              <div className="cartbook" key={book.id}>
                <p>{book.title}</p>
                <p>{book.quantity}</p>
                <button onClick={() => removeFromCart(book.id)}>Remove</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <BookStore cart={cart} addToCart={addToCart} />
      )}
    </div>
  );
}

export default App;
