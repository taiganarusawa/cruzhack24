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
               <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Colleges</a>
                  <div className="navbar-dropdown">
                     <Link href="/colleges/collegenine" className="navbar-item">
                        College Nine
                     </Link>
                     <Link href="/colleges/johnrlewis" className="navbar-item">
                        John R. Lewis
                     </Link>
                     <Link href="/colleges/cowell" className="navbar-item">
                        Cowell
                     </Link>
                     <Link href="/colleges/stevenson" className="navbar-item">
                        Stevenson
                     </Link>
                     <Link href="/colleges/merrill" className="navbar-item">
                        Merrill
                     </Link>
                     <Link href="/colleges/crown" className="navbar-item">
                        Crown
                     </Link>
                     <Link href="/colleges/kresge" className="navbar-item">
                        Kresge
                     </Link>
                     <Link href="/colleges/porter" className="navbar-item">
                        Porter
                     </Link>
                     <Link href="/colleges/rachelcarson" className="navbar-item">
                        Rachel Carson
                     </Link>
                     <Link href="/colleges/oakes" className="navbar-item">
                        Oakes
                     </Link>
                  </div>
               </div>
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
                     <style>

                     </style>
                     <a className="button" style={{ "backgroundColor": "var(--bblue)", color: "white" }}>
                        <strong>Sign up</strong>
                     </a>
                     <a className="button is-light" style={{ "color": "var(--byellow)" }}>Log in</a>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Nav;
