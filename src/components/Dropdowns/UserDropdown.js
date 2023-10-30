import React from 'react';
import { createPopper } from '@popperjs/core';
import { useAuth } from 'src/context/auth.context';
import { signOut } from 'src/services/auth.service';
import '../../services/api.service';
import { useMain } from 'src/context/main.context';
import OrgDropdown from './OrganizationsDropdown';
import ProjectDropdown from './ProjectsDropdown';

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const { user } = useAuth();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'left-end',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleOrgSelect = (id) => {
    const selected = availableOrgs.find((item) => item.id === id);
    setSelectedOrg(selected);
  };

  const { setSelectedOrg, availableOrgs } = useMain();

  return (
    <>
      <a
        className="text-slate-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              //TODO: definir uma imagem padrão para quando o usuário não tiver uma imagem definida.
              src={user?.photoURL || '/img/team-1-800x800.jpg'}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          {user ? (
            <p>Logged in as {user.email}</p>
          ) : (
            <button onClick={console.log('try to do login')}>Login</button>
          )}
        </a>
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action2
        </a>
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => e.preventDefault()}
        >
          Gerencie sua conta
        </a>

        <div className="h-0 my-2 border border-solid border-slate-100" />

        <OrgDropdown />
        <ProjectDropdown />

        <div className="h-0 my-2 border border-solid border-slate-100" />
        <button
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
          }
          onClick={(e) => {
            e.preventDefault();
            signOut();
            window.location.href = '/auth/login';
          }}
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
