import React, { useState, useEffect } from "react";

const BookStore = ({ addToCart, cart }) => {
  const initialState = {
    data: null,
    loader: true,
    error: false,
  };

  const [book, setBooks] = useState(initialState);

  useEffect(() => {
    if (!book.loader) return;

    fetch("https://api.itbook.store/1.0/new")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks({
          ...book,
          data,
          loader: false,
        });
      })
      .catch(function (e) {
        /*  console.log(e,"theres is an error") */
        setBooks({
          ...book,
          error: e.message,
        });
      });
  }, []);

  return (
    <div>
      <div className="cards-list">
        {book.data !== null ? (
          book.data.books.map((book, index) => (
            <div key={book.id} class="card_container">
              <div className="card">
                <div
                  className="card_image"
                  style={{
                    backgroundImage: `url('${book.image}')`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  {/* <img src={book.image} alt="errorimg" /> */}
                </div>
                <div className="card_title title-black">
                  <p className="title_heading">{book.title}</p>
                  <p className="title_price">{book.price}</p>
                  <button
                    className="title_btn"
                    onClick={() =>
                      addToCart({
                        id: Date.now(),
                        title: book.title,
                        quantity: 1,
                      })
                    }
                  >
                    Add to cart
                    <svg
                      class="add_to_car_icon"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#FFFF"
                        d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default BookStore;
