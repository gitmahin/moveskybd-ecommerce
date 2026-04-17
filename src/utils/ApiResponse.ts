import { CustomApiResponse } from "@/types";

/**
 * Utility function to create a standardized API response object.
 * * This helper ensures that all successful or structured error responses 
 * follow the {@link CustomApiResponse} interface, making it easier to 
 * maintain consistency across different API routes.
 * * @template T - The type of the data payload. Defaults to `null`.
 * * @param message - A human-readable message describing the result.
 * @param status - The HTTP status code (e.g., 200, 201).
 * @param data - The primary response payload. Defaults to `null`.
 * @param errors - An optional array or object containing error details. Defaults to `null`.
 * * @returns An object adhering to the `CustomApiResponse<T>` structure.
 * * @example
 * // Success response with data
 * const response = ApiResponse("User fetched successfully", 200, { id: 1, name: "John" });
 * * // Response with no data (e.g., a deletion)
 * return NextResponse.json(ApiResponse("Deleted successfully", 200));
 */
export const ApiResponse = <T = null>(
  message: CustomApiResponse<T>["message"],
  status: CustomApiResponse<T>["status"],
  data: CustomApiResponse<T>["data"] = null,
  errors: CustomApiResponse<T>["errors"] = null
): CustomApiResponse<T> => {
  return { message, status, data, errors };
};
