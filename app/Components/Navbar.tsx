import React, { useState } from "react";
import "./Navrbar.css";
import { useOutletContext } from "react-router";

function Navbar() {
  const { isSignedIn, userName, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuth = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.log(`puter sign out failed : ${e}`);
      }
      return;
    }

    try {
      await signIn();
    } catch (e) {
      console.log(`puter sign in failed: ${e}`);
    }
  };

  return (
    <nav>
      <div className="opt-left">
        <span className="logo">
          <img
            className="logo-img"
            src="https://i.pinimg.com/736x/52/02/c1/5202c1e4e061271f90c8630acd1d24a1.jpg"
            alt="My image"
          />
          <a href="/" className="logo-txt">
            Roomify
          </a>
        </span>

        <a href="/#product">Product</a>
        <a href="#Pricing">Pricing</a>
        <a href="#Community">Community</a>
        <a href="#Enterprise">Enterprise</a>
      </div>
      <div className="opt-right">
        {isSignedIn ? (
          <>
            <a>HI {userName}</a>
            <div className="auth-btn" onClick={handleAuth}>
              <p>LOG OUT</p>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleAuth}>Sign In</button>
            <div className="auth-btn">
              <a href="/#getstarted">GET STARTED</a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
