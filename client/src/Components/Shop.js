import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Features/ProductSlice";
import { addToCart, getCart } from "../Features/CartSlice";

function Shop() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState({ price: 10 });
  const { list } = useSelector(state => state.products);
  const filtered = list.filter(p => p.price <= filter.price);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

const addToCartHandler = async (product, qty = 1) => {
  if (!userId) {
    alert("Please login first");
    return;
  }

  await dispatch(addToCart({
    productId: product._id,
    title: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    color: "Default",
    quantity: qty,
    userId,
  }));

  dispatch(getCart(userId));

  alert("Added to cart");
};


  if(!selectedProduct){
    return (
      <div>
        <h2 className="kicker">Shop</h2>
        <div className="shop-wrapper">
          <aside className="filters form-panel">
            <h4>Filters</h4>
            <div className="field">
              <label>Price (max): {filter.price.toFixed(2)} OMR</label>
              <input className="range" type="range" min="0" max="10" step="0.5" 
                value={filter.price} 
                onChange={(e)=>setFilter({ ...filter, price: parseFloat(e.target.value)})} />
            </div>
          </aside>
          <section style={{flex:1}}>
            <div className="products">
              {
                filtered.map((p) => (
                  <div key={p._id} className="product">
                    <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "180px", objectFit: "cover", }} />
                    <div className="title">{p.name}</div>
                    <div className="price">{p.price.toFixed(3)} OMR</div>
                    <div style={{marginTop:8}}>
                      <button className="btn" 
                        onClick={()=>setSelectedProduct(p)}>View</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
      <div className="product-detail-page">
        <button className="btn secondary" style={{ marginBottom: 20}}
          onClick={() => setSelectedProduct(null)}>Back</button>
        <div className="product-detail">
          <div className="image">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
          </div>
          <div className="meta">
            <div className="name">{selectedProduct.name}</div>
            <div className="price">{selectedProduct.price.toFixed(3)} OMR</div>
            <div style={{marginTop: 12}}>
              <div className="field">
                <label style={{fontWeight: "bold"}}>Colors</label>
                  <div>
                    <label style={{marginRight:12}}><input type="radio" name="col" defaultChecked /> Blue</label>
                    <label style={{marginRight:12}}><input type="radio" name="col" /> Khaki</label>
                    <label style={{marginRight:12}}><input type="radio" name="col" /> Grey</label>
                    <label style={{marginRight:12}}><input type="radio" name="col" /> White</label>
                    <label style={{marginRight:12}}><input type="radio" name="col" /> Black</label>
                  </div>
              </div>
              <div style={{marginTop:18}}>
                <button className="btn" onClick={()=>{ addToCartHandler(selectedProduct, 1); }}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Shop;
