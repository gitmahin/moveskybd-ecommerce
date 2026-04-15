import { type URLSearchParams } from "url"

export const getObjectFromSearchParams = (values: string[], searchParams: URLSearchParams) => {
    const payloadArray: string[][] = []
    values.map((item) => {
        payloadArray.push([item, searchParams.get(item) ?? ""])
    })
    return Object.fromEntries(payloadArray)
}