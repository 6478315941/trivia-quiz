import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function Quiz({ setShowResults, setScore, setUserAnswers, questions, setQuestions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Fetch questions if they aren't already loaded
  useEffect(() => {
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean")
        .then(res => res.json())
        .then(data => {
          setQuestions(data.results); // Save questions to state
        })
        .catch(err => console.error("Error fetching quiz questions:", err));
    }
  }, [questions, setQuestions]);

  // If questions aren't loaded yet, display loading message
  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const handleSelect = (index, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    let score = 0;
    const userAnswers = questions.map((q, index) => {
      const correct = q.correct_answer;
      const selected = selectedAnswers[index];
      if (selected === correct) score++;
      return { selected, correct };
    });

    setScore(score);
    setUserAnswers(userAnswers);
    setShowResults(true);
  };

  return (
    <div>
      {questions.map((q, index) => (
        <Question
          key={index}
          index={index}
          question={q.question}
          selected={selectedAnswers[index]}
          onSelect={handleSelect}
        />
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}
