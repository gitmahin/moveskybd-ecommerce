"use client";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  ScrollArea,
} from "@/components";
import { AvatarGroups, Stars } from "@/components/core";
import { AVATAR_GROUP_DATA } from "@/constants";
import { ChevronLeft, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthCompPropsType = {
  title: string;
  desc: string;
  showNameInput?: boolean;
  showConfirmPassInput?: boolean;
  authType: "login" | "signup";
  onSubmit: () => void;
  reversedAuthPath: string;
};

export const AuthComp = ({
  desc,
  onSubmit,
  showConfirmPassInput,
  showNameInput,
  title,
  authType,
  reversedAuthPath,
}: AuthCompPropsType) => {
  const handleSubmit = () => {
    onSubmit();
  };
  const router = useRouter();
  return (
    <>
      <Button variant={"outline"} size={"sm"} onClick={() => router.push("/")}>
        <ChevronLeft /> Back to Home
      </Button>
      <div className="flex justify-start  items-center gap-2">
        <Image
          src={"/auth/login_vector.png"}
          width={300}
          height={300}
          className="w-[25px] h-[25px] object-contain object-left "
          alt="Logo"
        />
        <h1 className="text-xl font-semibold text-black">MoveSky</h1>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-black ">
          {title ?? "Untitled"}
        </h2>
        <p className="text-lg text-gray-500">{desc ?? "No description"}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button
          className="w-full shrink-0 gap-2"
          variant={"outline"}
          size={"lg"}
        >
          <Image src={"/auth/google.svg"} width={20} height={20} alt="Google" />{" "}
          Continue With Google
        </Button>
      </div>
      <p className="uppercase text-sm text-gray-500 text-center w-full">
        Or {title} with email
      </p>

      <div>
        <FieldGroup>
          {showNameInput && (
            <Field>
              <FieldLabel htmlFor="full_name">
                Your Full Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="full_name"
                placeholder="Jhon Doe"
                className="w-full h-9"
              />
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="email">
              Your Email Address <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              placeholder="jhonedoe@gmail.com"
              className="w-full h-9"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">
              Password <span className="text-destructive">*</span>
            </FieldLabel>

            <InputGroup className="w-full h-9">
              <InputGroupInput id="password" type="password" />

              <InputGroupAddon align="inline-end">
                <Button variant={"outline"} size={"icon-sm"}>
                  <EyeClosed />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {showConfirmPassInput && (
            <Field>
              <FieldLabel htmlFor="confirm_password">
                Confirm Password <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup className="w-full h-9">
                <InputGroupInput id="confirm_password" type="password" />

                <InputGroupAddon align="inline-end">
                  <Button variant={"outline"} size={"icon-sm"}>
                    <EyeClosed />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}

          {authType == "login" && (
            <Button onClick={handleSubmit} variant={"brand"} size={"lg"}>
              Login
            </Button>
          )}

          {authType == "signup" && (
            <Button onClick={handleSubmit} variant={"brand"} size={"lg"}>
              Login
            </Button>
          )}
        </FieldGroup>

        <p className="text-sm text-gray-500 text-center w-full mt-8">
          {authType == "login" && "New here"}
          {authType == "signup" && "Already have an account?"}{" "}
          <Link
            href={`/auth/${reversedAuthPath}`}
            className="hover:underline text-blue-500"
          >
            {authType == "login" && "Sign up"}

            {authType == "signup" && "Sign in"}
          </Link>
        </p>
      </div>
    </>
  );
};
