import { GoArrowSwitch } from "react-icons/go";

function SelectLang({
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
  setInputText,
  setOutputText,
  isLoading,
}) {
  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "Arabic" },
    { code: "fr", name: "Francais" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
  ];

  const selectLanguage = Object.keys(languages).map((key, index) => {
    const language = languages[key];
    return (
      <option key={index} value={language.code}>
        {language.name}
      </option>
    );
  });
  const switchLangHandler = function () {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setInputText("");
    setOutputText("");
  };

  const selectionHandler = function (e) {
    setInputLanguage(e.target.value);
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="lang-switch-container">
      <select
        name="lang"
        id="selc-lang"
        value={inputLanguage}
        onChange={selectionHandler}
        disabled={isLoading}
      >
        {selectLanguage}
      </select>
      <button onClick={switchLangHandler}>
        <GoArrowSwitch />
      </button>
      <select
        name="lang-2"
        id="selc-lang2"
        value={outputLanguage}
        disabled={isLoading}
        onChange={(e) => {
          setOutputLanguage(e.target.value);
          setInputText("");
          setOutputText("");
        }}
      >
        {selectLanguage}
      </select>
    </div>
  );
}

export default SelectLang;
