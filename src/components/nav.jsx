import React, { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
            <h3><strong>SLADE</strong></h3>
        </a>

        <a
            role="button"
            className={`navbar-burger ${isHamburgerOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isHamburgerOpen}
            onClick={toggleHamburger}
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
      </div>

      <div
            id="navbarBasicExample"
            className={`navbar-menu ${isHamburgerOpen ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
            <Link href="/" className="navbar-item"> 
                Home
            </Link>
            <Link href="/c9" className="navbar-item">
                Colleges
            </Link>
            <Link href="/review" className="navbar-item">
                Reviews
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
                <Link href="/about" className="navbar-item">
                    About
                </Link>
            </div>
        </div>
        </div>

        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                <a className="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
