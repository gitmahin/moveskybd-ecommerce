import { cookies, headers } from "next/headers";
import Link from "next/link";
import { NextResponse } from "next/server";
import React from "react";

type AuthLayoutWrapperPropsType = {
  children: React.ReactNode;
};

export default async function AuthLayoutWrapper({
  children,
}: AuthLayoutWrapperPropsType) {
  const cookieStore = await cookies();
  console.log("Hello mahin", cookieStore.get("accessToken"));

  return (
    <>
      {children}
      <Link href={"/page-1"}>go to page 1</Link>
      <Link href={"/page-2"}>go to page 2</Link>
    </>
  );
}
