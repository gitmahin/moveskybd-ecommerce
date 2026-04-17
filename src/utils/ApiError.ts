type ApiErrorType = {
  status: number;
  message: string;
  errors?: any[];
  stack?: string;
};

/**
 * Custom error class for structured API error handling.
 *
 * Extends the native `Error` class with additional properties
 * for HTTP status codes, error details, and success flags,
 * ensuring consistent error responses across the application.
 *
 * @extends Error
 *
 * @example
 * // Throw a 404 error
 * throw new ApiError(404, "User not found!")
 *
 * // Throw a 400 error with field errors
 * throw new ApiError(400, "Validation failed", [{ field: "email", message: "Invalid email" }])
 *
 * // Catch and check
 * if (err instanceof ApiError) {
 *   console.log(err.status)  // 404
 *   console.log(err.message) // "User not found!"
 * }
 */
export class ApiError extends Error implements ApiErrorType {
  public status: number;
  public errors: any[] = [];
  public stack?: string | undefined;
  public message: string = "";
  public success?: boolean = false;

  /**
 * @param status - HTTP status code.
 * @param message - Human-readable error message. Defaults to `"Something went wrong"`.
 * @param errors - Optional array of additional error details.
 * @param stack - Optional stack trace. If not provided, one is captured automatically.
 */
  constructor(
    status: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
