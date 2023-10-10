import React from 'react';

// components

import Navbar from 'src/components/Navbars/AuthNavbar.js';
import FooterSmall from 'src/components/Footers/FooterSmall.js';

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/bg-auth-01.jpg')",
            }}
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
