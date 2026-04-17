type SetSearchParamsPayloadType = {
    [key: string]: string
}
export const setSearchParams = (payload: SetSearchParamsPayloadType, req_url: string) => {
    const url = new URL(req_url)
    Object.entries(payload).map(([key, value]) => {
        url.searchParams.set(key, value)
    })
    return url
}