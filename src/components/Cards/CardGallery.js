// CardGallery.js

import React, { useState } from 'react';
import CardProject from './CardProject';
import SelectProjectModal from '../Modal/CreateProjectModal';
import CreateProjectModal from '../Modal/CreateProjectModal';
import { Alert } from 'flowbite-react';

function CardGallery({ cardsData }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-wrap">
    <Alert color="info">
      <span>
        <p>
          <span className="font-medium">
            Info alert!
          </span>
          Change a few things up and try submitting again.
        </p>
      </span>
    </Alert>
      {cardsData.map((card, index) => (
        <div key={index} className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4 mb-4">
          <CardProject {...card} />

        </div>
      ))}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4 mb-4">
          <CardProject create onClick={handleOpenModal}/>

        </div>
    </div>
  );
}

export default CardGallery;
