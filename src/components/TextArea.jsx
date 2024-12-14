function TextArea({ inputValue, setInputText, outputText, setOutputText }) {
  const inputHandler = function (e) {
    setInputText(e.target.value);
  };
  const outputHandler = function (e) {
    setOutputText(e.target.value);
  };
  return (
    <div className="text-area">
      <textarea
        name="lang"
        rows="5"
        cols="33"
        value={inputValue}
        onChange={inputHandler}
      />
      <textarea
        name="lang2"
        rows="5"
        cols="33"
        value={outputText}
        onChange={outputHandler}
        disabled={true}
      />
    </div>
  );
}

export default TextArea;
