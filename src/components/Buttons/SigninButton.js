import { useState } from 'react';

const SigninButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-transparent hover:bg-white hover:bg-opacity-20 text-black font-bold py-2 px-4 border border-white rounded-full"
    >
      Entrar{' '}
      <span
        className={`inline-block transform transition-transform ${
          hovered ? 'translate-x-2' : ''
        }`}
      >
        &gt;
      </span>
    </button>
  );
};

export default SigninButton;
