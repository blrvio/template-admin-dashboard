import React from 'react';

import AdminNavbar from 'src/components/Navbars/AdminNavbar.js';
import Sidebar from 'src/components/Sidebar/Sidebar.js';
import HeaderStats from 'src/components/Headers/HeaderStats.js';
import FooterAdmin from 'src/components/Footers/FooterAdmin.js';

export default function Organization({ children }) {
  return (
    <>
      {/* <MainProvider> */}
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            {children}
            <FooterAdmin />
          </div>
        </div>
      {/* </MainProvider> */}
    </>
  );
}
