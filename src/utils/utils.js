import { API_KEY } from "../constants";

export const options = function (inputText, inputLanguage, outputLanguage) {
  return {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify({
      fallback_providers: ["microsoft"],
      response_as_dict: true,
      attributes_as_list: false,
      show_base_64: true,
      show_original_response: false,
      providers: ["google"],
      text: inputText,
      source_language: inputLanguage,
      target_language: outputLanguage,
    }),
  };
};

export const fetchData = async function (url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
