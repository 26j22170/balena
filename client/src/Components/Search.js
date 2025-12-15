import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Features/ProductSlice";
import { addToCart, getCart } from "../Features/CartSlice";

function Search() {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.products);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const results = list.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  const handleAdd = async (product) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    await dispatch(
      addToCart({
        productId: product._id,
        title: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        color: "Default",
        quantity: 1,
        userId,
      })
    );

    dispatch(getCart(userId));
    alert("Added to cart");
  };

  return (
    <div>
      <h2 className="kicker">Search</h2>

      <div style={{ marginBottom: 18 }}>
        <input
          placeholder="What are you looking for?"
          style={{ width: "100%", padding: 12, borderRadius: 8 }}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <h4>Search result</h4>

      <div className="products">
        {results.map((p) => (
          <div key={p._id} className="product">
            <img
              src={p.imageUrl}
              alt={p.name}
              style={{ width: "100%", height: "140px", objectFit: "cover" }}
            />
            <div className="title">{p.name}</div>
            <div className="price">{p.price.toFixed(3)} OMR</div>
            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={() => handleAdd(p)}>
                Add
              </button>
            </div>
          </div>
        ))}

        {q && results.length === 0 && <div>No results found</div>}
      </div>
    </div>
  );
}

export default Search;
