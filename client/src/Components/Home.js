import React from "react";
import { Link } from "react-router-dom";
import Colorful from "../Images/Colorful.jpg";
import wallet2 from "../Images/wallet2.jpg";
import HandBag1 from "../Images/HandBag1.jpg";

function Home() {
  return (
    <div>
      <section >
        <div>
          <div className="brand">Balena</div>
          <div className="tagline">Women's Bag and More</div>
        </div>
        <div style={{marginLeft: "auto"}}>
          
         
        </div>
      </section>

      <section className="featured">
        <h3>Featured Collections</h3>
        <div className="collections">
          <div className="collection-card" style={{ width: 240 }}>
            <img src={Colorful} alt="bags" />
            <p>Tote Bags</p>
          </div>
          <div className="collection-card" style={{ width: 240 }}>
            <img src={wallet2} alt="wallets" />
            <p>Wallets</p>
          </div>
          <div className="collection-card" style={{ width: 240 }}>
            <img src={HandBag1} alt="hand bag" />
            <p>Hand Bags</p>
          </div>
        </div>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Link to="/shop" className="btn">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
