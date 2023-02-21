import {charArrayIntoString} from  "./createText.js";
import {createIterableCharArray} from  "./createIterableCharArray.js"

export async function generateFinalText(paragraphWithText) {
  const charArray = await createIterableCharArray(paragraphWithText);
  paragraphWithText.innerHTML = charArrayIntoString(charArray);

  return charArray;
}
