"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Modifiquei de 'next/navigation' para 'next/router'
import { buscarDadosPorCep } from "../../../src/services/maps.service";
import { countryList } from "@/config/countryList";

interface AddressObject {
  country?: string;
  state?: string;
  city?: string;
  houseNumber?: string;
  streetName?: string;
  postalCode?: string;
  countryCode?: string;
}
export default function PersonalPreferences() {
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [selectedDDI, setSelectedDDI] = useState<string>();
  const [addressObject, setAddressObject] = useState<AddressObject>({});
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddressChange = (value: string, field: keyof AddressObject) => {
    setAddressObject((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  // Função para validar o CEP (ajuste conforme necessário)
  const validatePostalCode = (value: string) => {
    // const cepRegex = /^[A-Za-z0-9]{1,4}-?[A-Za-z0-9]{1,4}$/;
    // return cepRegex.test(value);
    return true;
  };

  // Lógica de debounce para o CEP
  useEffect(() => {
    const handler = setTimeout(() => {
      if (postalCode) {
        setIsValid(validatePostalCode(postalCode));
        if (validatePostalCode(postalCode)) {
          buscarDadosPorCep(postalCode).then((dados) => {
            if (dados) {
              console.log("Dados do CEP:", dados);
              setAddressObject(dados);
              setPostalCode(dados.postalCode!);
            }
          });
        }
      }
    }, 800); // Tempo de debounce

    return () => {
      clearTimeout(handler);
    };
  }, [postalCode]);

  // Função para encontrar e sugerir o DDI com base no código do país
  const suggestDDI = (countryCode: string) => {
    const country = countryList.find((c) => c.code === countryCode);
    if (country) {
      setSelectedDDI(country.phone.toString()); // Atualiza o estado com o DDI sugerido
    }
  };

  // Efeito para sugerir o DDI quando o objeto de endereço for atualizado
  useEffect(() => {
    if (addressObject.countryCode) {
      suggestDDI(addressObject.countryCode);
    }
  }, [addressObject]);

  const createOrganization = async () => {
    setIsLoading(true);
    console.log("Creating organization:", userDisplayName);
    // Aqui você pode inserir a lógica para criar a organização
    const userData = {
      userDisplayName,
      postalCode,
      selectedDDI,
      userPhone,
      addressObject,
    };

    console.log("Dados do usuário:", userData);
    
    setTimeout(() => {
      router.push(`/onboar/personal-preferences?uname=${userDisplayName}`);
    }, 1000);
  };

  return (
    <>
      <div className="w-full max-w-md px-4 text-left">
        <h1 className="text-4xl font-bold">Adjust personal preferences</h1>
        <h2 className="text-gray-400">
          Agora, vamos saber um pouco mais sobre você, para personalizar sua
          experiência.
        </h2>
      </div>
      <div className="w-full max-w-md px-4 text-center">
        <Input
          isRequired
          type="text"
          label="Your name"
          className="w-full mb-2"
          placeholder="Ex: Jonatas Winston"
          value={userDisplayName}
          onChange={(e) => setUserDisplayName(e.target.value)}
        />
        <Input
          isRequired
          type="text"
          label="Zip code / Postal code"
          className="w-full mb-2"
          placeholder="Ex: 08533-140"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        {!isValid && <div className="text-red-500">Valor inválido</div>}
        <Input
          label="Número de Telefone"
          placeholder="Digite seu número"
          onChange={(e) => setUserPhone(e.target.value)}
          startContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="ddi">
                DDI
              </label>
              <select
                className="w-40 outline-none border-0 bg-transparent text-default-400 text-small"
                id="ddi"
                name="ddi"
                value={selectedDDI}
                onChange={(e) => setSelectedDDI(e.target.value)}
              >
                {countryList.map((country, key) => (
                  <option key={key} value={country.phone}>
                    +{country.phone} ({country.name})
                  </option>
                ))}
              </select>
            </div>
          }
          type="tel" // Tipo alterado para 'tel'
        />
        {addressObject.postalCode && (
          <>
            <h2 className="text-gray-400 mt-2">Confirme seu endereço</h2>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="Country"
                value={addressObject.country || ""}
                placeholder={addressObject.country ? "" : "Ex: Brazil"}
                isRequired={!addressObject.country}
                onChange={(e) => handleAddressChange(e.target.value, "country")}
              />
              <Input
                type="text"
                label="State"
                value={addressObject.state || ""}
                placeholder={addressObject.state ? "" : "Ex: São Paulo"}
                isRequired={!addressObject.state}
                onChange={(e) => handleAddressChange(e.target.value, "state")}
              />
            </div>
            <div className="flex w-full mt-2 flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="City"
                value={addressObject.city || ""}
                placeholder={addressObject.city ? "" : "Ex: São Paulo"}
                isRequired={!addressObject.city}
                onChange={(e) => handleAddressChange(e.target.value, "city")}
              />
              <Input
                type="text"
                label="House number"
                value={addressObject.houseNumber || ""}
                placeholder={addressObject.houseNumber ? "" : "Ex: 345"}
                isRequired={!addressObject.houseNumber}
                onChange={(e) =>
                  handleAddressChange(e.target.value, "houseNumber")
                }
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Input
                type="text"
                label="Street Name"
                value={addressObject.streetName || ""}
                placeholder={
                  addressObject.streetName ? "" : "Ex: Avenida Paulista"
                }
                isRequired={!addressObject.streetName}
                onChange={(e) =>
                  handleAddressChange(e.target.value, "streetName")
                }
              />
            </div>
          </>
        )}
      </div>
      <div className="w-full max-w-md px-4">
        <Button
          color="primary"
          onClick={createOrganization}
          isLoading={isLoading}
        >
          Continue &gt;
        </Button>
      </div>
    </>
  );
}
