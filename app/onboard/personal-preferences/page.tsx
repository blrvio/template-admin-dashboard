"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Chip } from "@nextui-org/react";
import preferences from "@/src/config/userSubjects";

export default function PersonalPreferences() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSelectPreference = (preference: string) => {
    setSelectedPreferences((prev: string[]) => {
      if (prev.includes(preference)) {
        return prev.filter((p: string) => p !== preference); // Deseleciona a preferência
      } else {
        return [...prev, preference]; // Seleciona a preferência
      }
    });
  };

  const updateUserPreferences = async () => {
    setIsLoading(true);
    const userPreferredSubjects = {
      selectedPreferences,
    };
    console.log(userPreferredSubjects);

    setTimeout(() => {
      router.push('/onboard/finish'); // Corrija o caminho se necessário
    }, 1000);
  };
  const searchParams = useSearchParams()
  const username = searchParams.get('uname')?.split(' ')[0] ?? '';
  


  return (
    <>
      <div className="w-full max-w-md px-4 text-left">
        <h1 className="text-4xl font-bold">{username}, adjust your personal preferences</h1>
        <h2 className="text-gray-400">
          Agora, vamos saber um pouco mais sobre você, para personalizar sua
          experiência.
        </h2>
      </div>
      <div className="w-full max-w-md px-4 text-center flex flex-wrap justify-center gap-2">
        {preferences.map((preference: string, index: number) => (
          <Chip
            key={index}
            className="capitalize m-1"
            color={selectedPreferences.includes(preference) ? 'success' : 'default'}
            size="sm"
            variant="flat"
            onClick={() => handleSelectPreference(preference)}
          >
            {preference}
          </Chip>
        ))}
      </div>

      <div className="w-full max-w-md px-4">
        <Button
          color="primary"
          onClick={updateUserPreferences}
          isLoading={isLoading}
        >
          Finalizar ✅
        </Button>
      </div>
    </>
  );
}
