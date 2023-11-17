"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import commonBusinessOptions from "@/src/config/commonBusinessOptions";
import { createOrganization } from "@/src/controllers/org.controller";

export default function FirstOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createOrg = async () => {
    setIsLoading(true);

    if (!organizationName.trim()) {
      setIsNameError(true);
      setIsLoading(false);
      return;
    } else {
      setIsNameError(false);
    }

    if (!selectedOptions.trim()) {
      setIsTypeError(true);
      setIsLoading(false);
      return;
    } else {
      setIsTypeError(false);
    }

    console.log("Creating organization:", organizationName);
    const body = {
      name: organizationName.trim(),
      business_category: selectedOptions.trim(),
      description: description.trim(),
    };

    createOrganization(body).finally(() => {
      router.push("/onboard/personal-information");
      setIsLoading(false);
    });
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
          color="default"
          label="Organization name"
          className="w-full"
          placeholder="Ex: Black Ravine"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          // status={isNameError ? "error" : "default"}
        />
        {isNameError && <p className="text-red-500">Organization name is required.</p>}

        <Textarea
          type="text"
          color="default"
          label="Organization description"
          className="w-full mt-2"
          placeholder="Ex: Black Ravine"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select
          label="Select business type"
          required
          className="w-full mt-2"
          onChange={(e) => setSelectedOptions(e.target.value)}
          // status={isTypeError ? "error" : "default"}
        >
          {commonBusinessOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
        {isTypeError && <p className="text-red-500">Business type is required.</p>}
      </div>
      <div className="w-full max-w-md px-4">
        <Button color="primary" onClick={createOrg} isLoading={isLoading}>
          Continue &gt;
        </Button>
      </div>
    </>
  );
}
