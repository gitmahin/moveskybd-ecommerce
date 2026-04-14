/**
 * Converts a hyphenated string to sentence case by capitalizing the first
 * character and replacing all hyphens with spaces.
 *
 * @param value - The hyphenated string to transform.
 *
 * @returns The transformed string in sentence case.
 *
 * @example
 * rmvHypenNSentenceCase("hello-world");  // "Hello world"
 * rmvHypenNSentenceCase("foo-bar-baz");  // "Foo bar baz"
 */
export const rmvHypenNSentenceCase = (value: string) => {
  return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/-/g, " ");
};
