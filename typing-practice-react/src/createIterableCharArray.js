import {getTextFromApi} from "./getTextFromApi.js";

export async function createIterableCharArray() {
  let charArray = [];
  let resultText = await getTextFromApi();

  for (const element of resultText) {
    charArray.push(element);
  }

  return charArray;
}
