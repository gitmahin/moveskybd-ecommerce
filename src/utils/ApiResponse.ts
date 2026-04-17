import { CustomApiResponse } from "@/types";
import { NextResponse } from "next/server";

export const ApiResponse = <T = null>(
  message: CustomApiResponse<T>["message"],
  status: CustomApiResponse<T>["status"],
  data: CustomApiResponse<T>["data"] = null,
  errors: CustomApiResponse<T>["errors"] = null
): CustomApiResponse<T> => {
  return { message, status, data, errors };
};
