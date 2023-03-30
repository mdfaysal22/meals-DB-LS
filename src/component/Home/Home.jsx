import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [letter, setLetter] = useState("a");
  const [cartData, setCartData] = useState([]);
  const [restData, setRestData] = useState([]);

  const searchHandler = (e) => {
    let form = e?.target;
    setLetter(form?.value);
  };

  //   Add Local Storage Function ---
  const addToDb = (id) => {
    let shoppingCart = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem("shopping-cart");
    // console.log(storedCart);
    if (storedCart) {
      shoppingCart = JSON.parse(storedCart);
    }
    console.log(shoppingCart);
    const alreadyStored = shoppingCart.includes(id);

    console.log(alreadyStored);

    if (!alreadyStored) {
      shoppingCart.push(id);
    }

    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  };

  // Display Cart ----

  useEffect(() => {
   
    let storedCart = localStorage.getItem("shopping-cart");
    if (storedCart) {
        setCartData(JSON.parse(storedCart));
    }

  }, []);

//   Rest Data Push


//   console.log(cartData);
  //   console.log(data.meals);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [letter]);
  return (
    <div>
      <div className="flex justify-center gap-2 items-center py-5">
        <input
          onChange={searchHandler}
          type="text"
          placeholder="Type First Letter."
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={() => {
            setLetter("a");
          }}
          className="btn btn-primary"
        >
          Set Default
        </button>
      </div>
      <div className="grid grid-cols-4">
        <div className=" col-span-3">
          <div className="p-5 gap-2 grid grid-cols-3">
            {data?.meals?.map((singleData) => (
              <div
                key={singleData.idMeal}
                className="card bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={singleData?.strMealThumb} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{singleData?.strMeal}</h2>
                  <div className="card-actions">
                    <button
                      onClick={() => addToDb(singleData.idMeal)}
                      className="btn btn-primary"
                    >
                      Add To Card
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="  col-span-1">
          <h1 className="text-center text-2xl pt-5 uppercase font-semibold">
            My Add to Cart
          </h1>
          <div className="card mr-5 bg-sky-300 shadow-xl">
            <div className="card-body">
                <h1>{cartData.length}</h1>
                {
                    // data?.meals?.map(singleData => {
                    //     const result = cartData.find(singleData => singleData == singleData.idMeal);
                    //     <h1>{result?.strMeal}</h1>
                    // })

                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
