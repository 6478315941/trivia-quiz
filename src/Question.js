import React from "react";

export default function Question({ question, index, selected, onSelect }) {
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="question-block">
      <p>{index + 1}. {decodeHTML(question)}</p>
      <label>
        <input
          type="radio"
          name={`q${index}`}
          value="True"
          checked={selected === "True"}
          onChange={() => onSelect(index, "True")}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name={`q${index}`}
          value="False"
          checked={selected === "False"}
          onChange={() => onSelect(index, "False")}
        />
        False
      </label>
    </div>
  );
}
