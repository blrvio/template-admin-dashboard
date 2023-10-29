import React from 'react';
import PropTypes from 'prop-types';

export default function CardProject({ name, icon, resourceCount, create }) {
  if (create) {
    return (



<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a>




    );
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-48">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
              Project
            </h5>
            <span className="font-semibold text-xl text-blueGray-700">
              {name}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div className="text-blue p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
              <i className={icon}></i>
            </div>
          </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
          Resources: {resourceCount}
        </p>
      </div>
    </div>
  );
}

CardProject.defaultProps = {
  title: '',
  icon: 'fas fa-folder-open', // Default project icon
  resourceCount: '0',
  create: false,
};

CardProject.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  resourceCount: PropTypes.string,
  create: PropTypes.bool,
};
