import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotificationDropdown from 'src/components/Dropdowns/NotificationDropdown.js';
import UserDropdown from 'src/components/Dropdowns/UserDropdown.js';
import { main_config } from 'src/common/app_config';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const [currentProject, setCurrentProject] = React.useState('betaEnvironment');
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href={`?project=${currentProject}`}
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              {main_config.app_name}
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href={`?project=${currentProject}`}
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      {main_config.app_name}
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Frente de caixa
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href={`/services/sales/pdv?project=${currentProject}`}>
                  <a
                    href=""
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/services/sales/pdv') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/services/sales/pdv') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    PDV
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href={`/services/sales/stock?project=${currentProject}`}>
                  <a
                    href=""
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf(
                        `/services/sales/stock?project=${currentProject}`,
                      ) !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf(
                          `/services/sales/stock?project=${currentProject}`,
                        ) !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Estoque
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href={`/services/sales/custommer?project=${currentProject}`}
                >
                  <a
                    href=""
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/services/sales/custommer') !==
                      -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf(
                          '/services/sales/custommer',
                        ) !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Clientes
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href={`/services/sales/products?project=${currentProject}`}
                >
                  <a
                    href=""
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/services/sales/products') !==
                      -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/services/sales/products') !==
                        -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Produtos e serviços
                  </a>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <a
                    href={`?project=${currentProject}`}
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/admin/dashboard') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/dashboard') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Dashboard
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/settings">
                  <a
                    href={`?project=${currentProject}`}
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/admin/settings') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-tools mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/settings') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Settings
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/tables">
                  <a
                    href={`?project=${currentProject}`}
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/admin/tables') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-table mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/tables') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Tables
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/maps">
                  <a
                    href={`?project=${currentProject}`}
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/admin/maps') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/maps') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Maps
                  </a>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Documentation
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <a
                  href="https://docs.blackravine.com/business-cloud/getting-started"
                  target="_blank"
                  className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
                >
                  <i className="fas fa-graduation-cap mr-2 text-blueGray-300 text-base"></i>
                  Learning Center
                </a>
              </li>

              <li className="inline-flex">
                <a
                  href="https://docs.blackravine.com/business-cloud/getting-started"
                  target="_blank"
                  className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
                >
                  <i className="fas fa-plus-square mr-2 text-blueGray-300 text-base"></i>
                  Submeta uma feature
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
