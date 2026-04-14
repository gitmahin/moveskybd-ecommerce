import { ServiceResponseType } from "./type";
type ServiceResponseTypeKey = ServiceResponseType["type"]

export function returnServiceResponse<T>(type: "SUCCESS", data: T): ServiceResponseType<T>;
export function returnServiceResponse(type: "ERROR", error: string): ServiceResponseType;
export function returnServiceResponse(type: "PAYLOADERROR", zod_errors: unknown): ServiceResponseType;
export function returnServiceResponse<T>(
    type: ServiceResponseTypeKey,
    dataOrErrorOrZodErrors: T | string | unknown 
): ServiceResponseType<T> {
    if (type === "SUCCESS") {
        return {
            type: "SUCCESS",
            data: dataOrErrorOrZodErrors as T,
        };
    }

    if (type === "PAYLOADERROR") {
        return {
            type: "PAYLOADERROR",
            zod_errors: dataOrErrorOrZodErrors,
        };
    }

    return {
        type: "ERROR",
        error: dataOrErrorOrZodErrors as string,
    };
}