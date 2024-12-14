import { useEffect, useState } from "react";
import Header from "./components/Header";
import SelectLang from "./components/SelectLang";
import TextArea from "./components/TextArea";
import { API_KEY } from "./components/ApiKey";
function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("ar");

  const options = {
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
  useEffect(function () {
    translateHandler();
  }, []);

  const translateHandler = async function () {
    if (!inputText) return;
    try {
      const response = await fetch(
        "https://api.edenai.run/v2/translation/automatic_translation",
        options
      );

      const result = await response.json();
      setOutputText(result.google.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header />

      <SelectLang
        inputLanguage={inputLanguage}
        setInputLanguage={setInputLanguage}
        outputLanguage={outputLanguage}
        setOutputLanguage={setOutputLanguage}
        setInputText={setInputText}
        setOutputText={setOutputText}
      />

      <TextArea
        inputValue={inputText}
        setInputText={setInputText}
        outputText={outputText}
        setOutputText={setOutputText}
      />
      <button className="translate-btn" onClick={translateHandler}>
        Translate
      </button>
    </div>
  );
}

export default App;
