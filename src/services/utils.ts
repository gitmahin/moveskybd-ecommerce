import { ServiceResponseType } from "./type";
type ServiceResponseTypeKey = ServiceResponseType["type"];

export function serviceResponse<T>(
  type: "SUCCESS",
  data: T
): ServiceResponseType<T>;
export function serviceResponse(
  type: "ERROR",
  error: string
): ServiceResponseType;

export function serviceResponse<T>(
  type: ServiceResponseTypeKey,
  dataOrError: T | string | unknown
): ServiceResponseType<T> {
  if (type === "SUCCESS") {
    return {
      type: "SUCCESS",
      data: dataOrError as T,
    };
  }

  return {
    type: "ERROR",
    error: dataOrError as string,
  };
}
