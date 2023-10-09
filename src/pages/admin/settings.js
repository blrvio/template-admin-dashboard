import React from "react";

// components

import CardSettings from "src/components/Cards/CardSettings.js";
import CardProfile from "src/components/Cards/CardProfile.js";

// layout for page

import Admin from "src/layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
