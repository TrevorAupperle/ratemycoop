import { profanityData } from "./profanity-dataset";

export default function checkProfanity(text: string): boolean {
  if (
    profanityData.some((phrase) => {
      if (typeof phrase.text === "number") {
        return text.toLowerCase().includes(phrase.text.toString());
      } else {
        return text.toLowerCase().includes(phrase.text);
      }
    })
  ) {
    return true;
  }
  return false;
}
