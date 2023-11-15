"use client";
import React from "react";
import { EyeFilledIcon } from "@/components/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Icons/EyeSlashFilledIcon";
import { FacebookIcon, GoogleIcon } from "@/components/Table/SocialIcons";
import { Button, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import {
  signIn,
  signInWithFacebook,
  signInWithGoogle,
} from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import { authHandler } from "../authHandler";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value);

  const handleLogin = async () => {
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
    signIn(email, password).then((user) => {
      setIsLoading(false);
      router.push("/onboard/first-organization");
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
          <div className="text-right mt-2">
            <Link
              href="/auth/forgot"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?{" "}
            <a className="underline" href="/auth/register">
              Sign up
            </a>
          </p>

          <Button
            radius="sm"
            color="primary"
            isLoading={isLoading}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-center space-x-2">
          <Button
            color="secondary"
            radius="sm"
            onClick={() => authHandler(signInWithGoogle, setIsLoading, router)}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
          <Button
            color="primary"
            radius="sm"
            onClick={() => authHandler(signInWithFacebook, setIsLoading, router)}
          >
            <FacebookIcon />
            Sign in with Facebook
          </Button>
        </div>
      </div>
    </section>
  );
}
