import React, { useState, useEffect } from 'react';

// A simple Question component to display each question and options
const Question = ({ question, options, selectedAnswer, onSelect }) => {
  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name={question}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onSelect(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch 5 random multiple-choice questions from the API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=7&category=23&difficulty=easy&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => {
          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          // Shuffle the answers to randomize the order
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
          return {
            question: q.question,
            correct_answer: q.correct_answer,
            options: shuffledAnswers,
          };
        });
        setQuestions(formattedQuestions);
      })
      .catch((error) => console.error("Error fetching quiz questions:", error));
  }, []);

  // Handle answer selection
  const handleSelect = (question, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let userScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.question] === q.correct_answer) {
        userScore++;
      }
    });
    setScore(userScore);
    setShowResults(true);
  };

  // Restart the quiz
  const handleRetry = () => {
    setQuestions([]);
    setSelectedAnswers({});
    setScore(null);
    setShowResults(false);
  };

  // Display loading message while questions are being fetched
  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      {showResults ? (
        <div>
          <h2>Your score: {score} / {questions.length}</h2>
          {questions.map((q, index) => (
            <div key={index}>
              <p>{q.question}</p>
              <p>Your answer: {selectedAnswers[q.question]}</p>
              <p>Correct answer: {q.correct_answer}</p>
            </div>
          ))}
          <button onClick={handleRetry}>Take another quiz</button>
        </div>
      ) : (
        <div>
          {questions.map((q, index) => (
            <Question
              key={index}
              question={q.question}
              options={q.options}
              selectedAnswer={selectedAnswers[q.question]}
              onSelect={(answer) => handleSelect(q.question, answer)}
            />
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
