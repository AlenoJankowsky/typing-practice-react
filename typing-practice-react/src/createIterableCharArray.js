import {getTextFromApi} from "./getTextFromApi.js";

export async function createIterableCharArray() {
  const charArray = [];
  const resultText = await getTextFromApi();

  for (const element of resultText) {
    charArray.push(element);
  }

  return charArray;
}
