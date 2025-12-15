import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, getCart } from "../Features/CartSlice";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(getCart(userId));
    }
  }, [dispatch, userId]);

  // OPTIONAL: location info
  const getGeoLocationData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCATION_API_KEY}`
      );
      setCountry(response.data.location.country);
      setRegion(response.data.location.region);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchase = async () => {
    await getGeoLocationData();

    const locationInfo =
      country && region
        ? `Country: ${country}, Region: ${region}`
        : "Location information not available";

    alert(`Purchased successfully!\n${locationInfo}`);
    dispatch(clearCart(userId));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div>
        <h2 className="kicker">Cart</h2>
        <div className="cart-panel center">
          <p>Your cart is empty</p>
          <br />
          <Link to="/shop" className="btn">
            Go to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="kicker">Cart</h2>

      <div className="cart-panel">
        {cart.map((item) => (
          <div key={item._id} className="cart-row">
            <img
              src={item.imageUrl}
              alt={item.title}
            />

            <div style={{ flex: 1 }}>
              <div className="title">{item.title}</div>
              <div className="price">
                {Number(item.price).toFixed(3)} OMR
              </div>
              <div>Quantity: {item.quantity}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <strong>Total: {total.toFixed(3)} OMR</strong>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            className="btn secondary"
            onClick={() => dispatch(clearCart(userId))}
          >
            Clear
          </button>

          <button className="btn" onClick={handlePurchase}>
            Purchase now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
