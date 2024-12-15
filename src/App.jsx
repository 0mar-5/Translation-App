import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import SelectLang from "./components/SelectLang";
import TextArea from "./components/TextArea";
import { fetchData, options } from "./utils";
import { API_URL } from "./constants";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("ar");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(inputText, 500);

  // Translation on change

  const translateHandler = useCallback(async function (inputValue) {
    if (inputValue?.length < 2) return;

    try {
      const option = options(inputValue, inputLanguage, outputLanguage);
      setIsLoading(true);
      const result = await fetchData(API_URL, option);
      setOutputText(result.google.text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    translateHandler(debouncedQuery);
  }, [debouncedQuery, translateHandler]);

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
        isLoading={isLoading}
      />

      <TextArea
        inputValue={inputText}
        setInputText={setInputText}
        outputText={outputText}
        setOutputText={setOutputText}
      />
      <button
        className="translate-btn"
        onClick={translateHandler}
        disabled={isLoading}
      >
        Translate
      </button>
    </div>
  );
}

export default App;
