// CardGallery.js

import React from 'react';
import CardProject from './CardProject';

function CardGallery({ cardsData }) {
  return (
    <div className="flex flex-wrap">
      {cardsData.map((card, index) => (
        <div key={index} className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4 mb-4">
          <CardProject {...card} />

        </div>
      ))}
    </div>
  );
}

export default CardGallery;
