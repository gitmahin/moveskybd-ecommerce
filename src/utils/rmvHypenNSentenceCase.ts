
export const rmvHypenNSentenceCase = (value: string) => {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/-/g, " ");
}


