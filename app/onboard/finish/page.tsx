"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Finish() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const updateUserPreferences = async () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/console/about"); // Corrija o caminho se necessário
    }, 1000);
  };

  return (
    <>
      <div className="w-full max-w-md px-4 text-left">
        <div className="flex flex-col space-y-8 items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-16 bg-green-500 p-1 text-white rounded-full ring-8 ring-green-500/30 dark:ring-green-500/50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
          <h3 className="font-heading scroll-m-20 text-2xl font-medium tracking-tight">
            <span className="font-semibold mr-4">
              You&lsquo;re all set! You can now start using the app.
            </span>
            🎉
          </h3>
          <div className="w-full max-w-md px-4">
            <Button
              color="primary"
              onClick={updateUserPreferences}
              isLoading={isLoading}
            >
              <span>Continue to your Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
