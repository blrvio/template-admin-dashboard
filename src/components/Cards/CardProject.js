import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CardProject({
  name,
  icon,
  resourceCount,
  create,
  onClick,
}) {

  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    onClick();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };
  if (create) {
    return (
<div
      className={`relative flex flex-col justify-center items-center min-w-0 break-words bg-neutral-400 hover:bg-neutral-600 rounded mb-6 xl:mb-0 shadow-lg h-48 transition-transform transform ${isPressed ? 'scale-95' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // Resetar o estado se o mouse sair enquanto estiver pressionado
      onClick={onClick}
    >
      <div className="flex-auto flex flex-wrap justify-center items-center h-full">
        <span className="font-semibold text-xl text-slate-700 mr-2">
          Criar projeto
        </span>
        <i className="fas fa-plus text-slate-700"></i>
      </div>
    </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-48 transition-transform transform ${isPressed ? 'scale-95' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // Resetar o estado se o mouse sair enquanto estiver pressionado
      onClick={onClick}
    >
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-slate-400 uppercase font-bold text-xs">
              Project
            </h5>
            <span className="font-semibold text-xl text-slate-700">
              {name}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div className="text-blue p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-white-500">
              <i className={icon}></i>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-4">
          Resources: {resourceCount}
        </p>
      </div>
    </div>
  );
}

CardProject.defaultProps = {
  name: '', // Corrigi o nome da prop, antes era 'title'
  icon: 'fas fa-folder-open',
  resourceCount: '0',
  create: false,
  onClick: () => {}, // Função vazia por padrão
};

CardProject.propTypes = {
  name: PropTypes.string, // Corrigi o nome da prop, antes era 'title'
  icon: PropTypes.string,
  resourceCount: PropTypes.string,
  create: PropTypes.bool,
  onClick: PropTypes.func, // Adicionado ao PropTypes
};
