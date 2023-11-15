"use client";
import React from "react";
import { EyeFilledIcon } from "@/components/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Icons/EyeSlashFilledIcon";
import { FacebookIcon, GoogleIcon } from "@/components/Table/SocialIcons";
import { Button, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  signInWithFacebook,
  signInWithGoogle,
  signUp,
} from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import { authHandler } from "../authHandler";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value);
  const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setUserName(e.target.value);

  const router = useRouter();



  const handleRegister = async () => {
    // Verifica se o email é válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setIsEmailInvalid(true);
      setIsLoading(false);
      return;
    } else {
      setIsEmailInvalid(false);
    }

    // Verifica se a senha atende aos requisitos
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    if (!passwordRegex.test(password)) {
      setIsLoading(false);
      setIsPasswordInvalid(true);
      return;
    } else {
      setIsPasswordInvalid(false);
    }

    setIsLoading(true);
    await signUp(email, password).then((user) => {
      setIsLoading(false);
      router.push("/console/about");
    });

  };

  return (
    <section>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div className="relative">
          <Input
            fullWidth
            type="text"
            label="Username"
            placeholder="Enter username"
            isInvalid={isUsernameInvalid}
            color={isUsernameInvalid ? "danger" : "default"}
            errorMessage={isUsernameInvalid && "Please enter a valid username"}
            radius="sm"
            onChange={handleUsernameChange}
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

        <div>
          <Input
            fullWidth
            label="Password"
            placeholder="Enter your password"
            radius="sm"
            type={isVisible ? "text" : "password"}
            onChange={handlePasswordChange}
            isInvalid={isPasswordInvalid}
            color={isPasswordInvalid ? "danger" : "default"}
            errorMessage={
              isPasswordInvalid &&
              "Please enter a valid password. Use lowercase, uppercase, numbers and special characters."
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Have an account?{" "}
            <a className="underline" href="/auth/login">
              Sign in
            </a>
          </p>

          <Button
            radius="sm"
            color="primary"
            isLoading={isLoading}
            onClick={handleRegister}
          >
            Sign up
          </Button>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-center space-x-2">
          <Button
            color="secondary"
            radius="sm"
            isLoading={isLoading}
            onClick={() => authHandler(signInWithGoogle, setIsLoading, router)}
          >
            <GoogleIcon />
            Sign up with Google
          </Button>
          <Button
            color="primary"
            radius="sm"
            isLoading={isLoading}
            onClick={() => authHandler(signInWithFacebook, setIsLoading, router)}
          >
            <FacebookIcon />
            Sign up with Facebook
          </Button>
        </div>
      </div>
    </section>
  );
}
