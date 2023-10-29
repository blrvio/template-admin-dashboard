import React from 'react';

// layout for page

import Admin from 'src/layouts/Admin.js';
import ProtectRoute from 'src/components/ProtectRoute';
import CardGallery from 'src/components/Cards/CardGallery';
import Organization from 'src/layouts/Organization';
import { useMain } from 'src/context/main.context';

export default function Projects() {
  const {availableProjects} = useMain();
  // const cardsData = [
  //   {
  //     title: "WebApp Project",
  //     icon: "fas fa-code",
  //     resourceCount: "10"
  //   },
  //   {
  //     title: "E-commerce System",
  //     icon: "fas fa-shopping-cart",
  //     resourceCount: "15"
  //   },
  //   {
  //     title: "Mobile Game",
  //     icon: "fas fa-gamepad",
  //     resourceCount: "8"
  //   },
  //   {
  //     title: "API Development",
  //     icon: "fas fa-code",
  //     resourceCount: "6"
  //   },
  //   {
  //     title: "Data Visualization",
  //     icon: "fas fa-chart-bar",
  //     resourceCount: "9"
  //   },
  //   {
  //     title: "Machine Learning",
  //     icon: "fas fa-brain",
  //     resourceCount: "12"
  //   },
  //   {
  //     title: "Social Media App",
  //     icon: "fas fa-users",
  //     resourceCount: "20"
  //   },
  //   {
  //     title: "VR Experience",
  //     icon: "fas fa-vr-cardboard",
  //     resourceCount: "5"
  //   },
  //   {
  //     title: "IoT Solution",
  //     icon: "fas fa-network-wired",
  //     resourceCount: "7"
  //   },
  //   {
  //     title: "Blockchain App",
  //     icon: "fas fa-cubes",
  //     resourceCount: "11"
  //   },
  //   {
  //     title: "Chatbot System",
  //     icon: "fas fa-comments",
  //     resourceCount: "4"
  //   },
  //   {
  //     title: "Database Migration",
  //     icon: "fas fa-database",
  //     resourceCount: "13"
  //   }
  // ];
  return (
    <ProtectRoute>
    <div className="relative  md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <CardGallery cardsData={availableProjects} />
      </div>
    </div>
    </ProtectRoute>
  );
}

Projects.layout = Organization;
// Dashboard.js