type ApiErrorType = {
  status: number;
  message: string;
  errors?: any[];
  stack?: string;
};

export class ApiError extends Error implements ApiErrorType {
  public status: number;
  public errors: any[] = [];
  public stack?: string | undefined;
  public message: string = "";
  public success?: boolean = false;

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
