import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Search from "./Components/Search";
import SignUp from "./Components/SignUp"
import "./App.css";
import AdminRoute from "./Components/AdminRoute";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
 
    const addToCart = (product) => {
    console.log("Added:", product);}
  return (
    <div className="app-root">

     <Header/>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search addToCart={addToCart} />} />
          <Route path="/signup" element={<SignUp  />} />
          <Route path="/admin" element={
               <AdminRoute>
              <AdminDashboard />
              </AdminRoute>
          } />
          <Route path="/dash" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
