import React from "react";

export default function Results({ score, userAnswers, questions, restartQuiz }) {
  return (
    <div>
      <h2>Your Score: {score}/{questions.length}</h2>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            <strong>Q:</strong> {q.question}<br />
            <strong>Your answer:</strong> {userAnswers[i].selected} <br />
            <strong>Correct answer:</strong> {userAnswers[i].correct} <br />
          </li>
        ))}
      </ul>
      <button onClick={restartQuiz}>Take another quiz</button>
    </div>
  );
}
