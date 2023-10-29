import React from 'react';
import Link from 'next/link';
// components

import PagesDropdown from 'src/components/Dropdowns/PagesDropdown.js';
import { main_config } from 'src/common/app_config';

export default function Navbar(props) {
  return <>
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            href="/"
            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">

            {main_config.app_name}

          </Link>
        </div>
      </div>
    </nav>
  </>;
}
