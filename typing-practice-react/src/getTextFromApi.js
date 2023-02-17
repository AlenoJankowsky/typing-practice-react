export async function getTextFromApi() {
  const amountOfWords = document.getElementById('amount-of-words').value;
  const fetchUrl = 'https://random-word-api.herokuapp.com/word?number=' + amountOfWords
  const response = await fetch(fetchUrl);
  const text = await response.text();
  const resultText = text.replaceAll(",", " ")
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "");
  return resultText;
}
