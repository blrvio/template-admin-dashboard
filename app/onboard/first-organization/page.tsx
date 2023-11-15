"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FirstOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createOrganization = async () => {
    setIsLoading(true);
    // Aqui você pode inserir a lógica para criar a organização, por exemplo:
    // const result = await api.createOrganization({ name: organizationName });
    // if (result.success) {
    //   router.push('/next-page');
    // }

    console.log("Creating organization:", organizationName);
    // Simulação de criação da organização
    setTimeout(() => {
      // Substitua '/next-page' pelo caminho da próxima página que você deseja navegar
      router.push("/onboard/personal-information");
    }, 1000);
  };

  return (
    <>
      <div className="w-full max-w-md px-4 text-left">
        <h1 className="text-4xl font-bold">Setup Organization</h1>
        <h2 className="text-gray-400">
          Welcome! First, let&apos;s setup your first organization.
        </h2>
      </div>
      <div className="w-full max-w-md px-4">
        <Input
          isRequired
          type="text"
          color="primary"
          label="Organization name"
          className="w-full"
          placeholder="Ex: Black Ravine"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>
      <div className="w-full max-w-md px-4">
        <Button color="primary" onClick={createOrganization} isLoading={isLoading}>
          Continue &gt;
        </Button>
      </div>
    </>
  );
}
