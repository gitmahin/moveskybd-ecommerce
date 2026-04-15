import { ServiceResponseType } from "./type";
type ServiceResponseTypeKey = ServiceResponseType["type"];

export function serviceResponse<T>(
  type: "SUCCESS",
  data: T,
  status: number
): ServiceResponseType<T>;
export function serviceResponse(
  type: "ERROR",
  error: string,
  status: number
): ServiceResponseType;

export function serviceResponse<T>(
  type: ServiceResponseTypeKey,
  dataOrError: T | string | unknown,
  status: number
): ServiceResponseType<T> {
  if (type === "SUCCESS") {
    return {
      type: "SUCCESS",
      data: dataOrError as T,
      status,
    };
  }

  return {
    type: "ERROR",
    error: dataOrError as string,
    status,
  };
}
