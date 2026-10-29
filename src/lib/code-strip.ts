// Each letter maps to one of five code blocks. The legend (the text) decodes it.
export const CODE_CLASSES = ["hazard", "cobalt", "signal", "ink", "line"] as const;
export type CodeClass = (typeof CODE_CLASSES)[number];

export function encode(text: string): { char: string; code: CodeClass | null }[] {
  return [...text.toUpperCase()].map((char) => {
    const i = char.charCodeAt(0) - 65;
    return { char, code: i >= 0 && i < 26 ? CODE_CLASSES[i % CODE_CLASSES.length]! : null };
  });
}
