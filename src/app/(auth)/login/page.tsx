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
import { EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex justify-center items-center ">
      <section
        className="w-full border-r h-full flex justify-end items-center p-5 pr-16"
        style={{
          backgroundImage: `
    linear-gradient(to bottom, #26436C99, #0E1A27E5, #0E1A2700, #0E1A2700), 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url("/auth/login_page_bg_image.png")
  `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[460px] w-full">
          <h2 className="text-5xl font-semibold text-white">
            Global Connect Your Gateway to Borderless Shopping
          </h2>
          <p className="text-lg leading-5.5 mt-8 text-gray-100">
            Welcome to MoveSky Global, where shopping knows no borders! Shop
            from your favorite international brands and have your purchases
            delivered straight to your doorstep.
          </p>
          <div className="mt-8">
            <AvatarGroups data={AVATAR_GROUP_DATA} />
            <div className="flex justify-start items-center gap-2 mt-3">
              <Stars />
              <span className="font-medium text-lg text-white">5.0</span>
              <span className="font-medium text-sm text-gray-200">
                from 2000+ reviews
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen flex justify-start items-center p-5 pl-16">
        <div className="max-w-[460px] w-full  h-full">
          <ScrollArea className="w-full h-full  ">
            <div className="min-h-full flex items-center justify-center ">
              <div className="space-y-5 w-full">
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
                    Sign Up
                  </h2>
                  <p className="text-lg text-gray-500">
                    Create your MoveSky account
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    className="w-full shrink-0 gap-2"
                    variant={"outline"}
                    size={"lg"}
                  >
                    <Image
                      src={"/auth/google.svg"}
                      width={20}
                      height={20}
                      alt="Google"
                    />{" "}
                    Continue With Google
                  </Button>
                </div>
                <p className="uppercase text-sm text-gray-500 text-center w-full">
                  Or sign up with email
                </p>

                <div>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="full_name">
                        Your Full Name{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id="full_name"
                        placeholder="Jhon Doe"
                        className="w-full h-9"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">
                        Your Email Address{" "}
                        <span className="text-destructive">*</span>
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
                    <Field>
                      <FieldLabel htmlFor="confirm_password">
                        Confirm Password{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <InputGroup className="w-full h-9">
                        <InputGroupInput
                          id="confirm_password"
                          type="password"
                        />

                        <InputGroupAddon align="inline-end">
                          <Button variant={"outline"} size={"icon-sm"}>
                            <EyeClosed />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                    <Button variant={"brand"} size={"lg"}>
                      Create Account
                    </Button>
                  </FieldGroup>
                  <p className=" text-sm text-gray-500 text-center w-full mt-8">
                    Already have an account?{" "}
                    <Link href={"#"} className="hover:underline text-blue-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
