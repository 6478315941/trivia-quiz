import React, { useState } from "react";
import Quiz from "./Quiz";
import Results from "./Results";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const restartQuiz = () => {
    setShowResults(false);
    setScore(0);
    setUserAnswers([]);
    setQuestions([]);
  };

  return (
    <div className="App">
      <h1>History Quiz</h1>
      {!showResults ? (
        <Quiz
          setShowResults={setShowResults}
          setScore={setScore}
          setUserAnswers={setUserAnswers}
          questions={questions}
          setQuestions={setQuestions}
        />
      ) : (
        <Results
          score={score}
          userAnswers={userAnswers}
          questions={questions}
          restartQuiz={restartQuiz}
        />
      )}
    </div>
  );
}
