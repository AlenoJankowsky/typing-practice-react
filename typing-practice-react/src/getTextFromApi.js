export async function getTextFromApi() {
  const MAX_VALUE = 100;
  let amountOfWords = 0;
  if (document.getElementById('amount-of-words').value < MAX_VALUE) {
    amountOfWords = document.getElementById('amount-of-words').value;
  }
  else {
    amountOfWords = 100;
  }
  
  const fetchUrl = 'https://random-word-api.herokuapp.com/word?number=' + amountOfWords
  const response = await fetch(fetchUrl);
  const text = await response.text();
  const resultText = text.replaceAll(",", " ")
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "");
  return resultText;
}
