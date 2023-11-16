"use client";

import { Spinner } from "@nextui-org/react";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <p>Loading...</p>
        <Spinner />
      </div>
    </div>
  );
};
