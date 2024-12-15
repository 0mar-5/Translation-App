import { useEffect, useState } from "react";
import Header from "./components/Header";
import SelectLang from "./components/SelectLang";
import TextArea from "./components/TextArea";
import { fetchData } from "./components/utils/Utils";
import { API_URL } from "./components/utils/Constants";
import { options } from "./components/utils/Utils";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("ar");
  const [isLoading, setIsLoading] = useState(false);

  const option = options(inputText, inputLanguage, outputLanguage);

  // Translation on change

  useEffect(() => {
    const id = setTimeout(() => {
      translateHandler();
    }, 500);

    return () => clearTimeout(id);
  }, [inputText]);

  const translateHandler = async function () {
    if (inputText.length < 2) return;
    try {
      setIsLoading(true);
      const result = await fetchData(API_URL, option);
      setOutputText(result.google.text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
        isLoading={isLoading}
      />

      <TextArea
        inputValue={inputText}
        setInputText={setInputText}
        outputText={outputText}
        setOutputText={setOutputText}
        onTranslation={translateHandler}
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
