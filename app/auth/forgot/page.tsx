"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { forgot } from "@/src/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value);

  const handleForgot = async () => {
    setIsLoading(true);
    // Verifica se o email é válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log("Email inválido.");
      setIsEmailInvalid(true);
      setIsLoading(false);
      return;
    } else {
      setIsEmailInvalid(false);
    }

    await forgot(email);
    setIsLoading(false);

    // router.push("/auth/login");
  };
// const router = useRouter();
  return (
    <section>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Reset password</h1>
      </div>

      <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div className="relative">
          <Input
            fullWidth
            type="email"
            label="Email"
            placeholder="Enter email"
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : "default"}
            errorMessage={isEmailInvalid && "Please enter a valid email"}
            radius="sm"
            onChange={handleEmailChange}
            endContent={
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            radius="sm"
            color="primary"
            isLoading={isLoading}
            onClick={handleForgot}
          >
            Send recovery link
          </Button>
        </div>
      </div>
    </section>
  );
}
