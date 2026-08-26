
import React, { useState } from "react";
import "./Interview.css";

const questions = [
  {
    question: "What is React?",
    options: ["Library", "Database", "Language", "OS"],
    answer: "Library",
  },
  {
    question: "What is Node.js?",
    options: ["Runtime", "Framework", "Database", "Editor"],
    answer: "Runtime",
  },
  {
    question: "Which database is used with the MERN stack?",
    options: ["MySQL", "MongoDB", "Oracle", "Firebase"],
    answer: "MongoDB",
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Management Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "CSS is mainly used for?",
    options: ["Styling", "Database", "Server", "API"],
    answer: "Styling",
  },
  {
    question: "JavaScript is a?",
    options: [
      "Programming Language",
      "Database",
      "Operating System",
      "Browser",
    ],
    answer: "Programming Language",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useState", "useFetch", "useRouter", "useStyle"],
    answer: "useState",
  },
  {
    question: "Which hook is used for side effects in React?",
    options: ["useEffect", "useContext", "useMemo", "useRef"],
    answer: "useEffect",
  },
  {
    question: "Express.js is a?",
    options: [
      "Node.js Framework",
      "Database",
      "Programming Language",
      "Browser",
    ],
    answer: "Node.js Framework",
  },
  {
    question: "Which command installs packages in Node.js?",
    options: ["npm install", "node install", "git install", "npm start"],
    answer: "npm install",
  },
  {
    question: "Git is used for?",
    options: [
      "Version Control",
      "Database",
      "Design",
      "Hosting",
    ],
    answer: "Version Control",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//",
  },
  {
    question: "Which company developed React?",
    options: ["Facebook", "Google", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "Which method converts JSON to an object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    question: "Which HTTP method is used to create data?",
    options: ["POST", "GET", "DELETE", "PUT"],
    answer: "POST",
  },
  {
    question: "Which HTTP method is used to fetch data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "GET",
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["const", "let", "var", "static"],
    answer: "const",
  },
  {
    question: "Which operator checks both value and type?",
    options: ["===", "==", "=", "!="],
    answer: "===",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Google", "Microsoft", "IBM"],
    answer: "Netscape",
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<title>"],
    answer: "<h1>",
  },
];

function Interview() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const selectAnswer = (option) => {
    let newScore = score;

    if (option === questions[index].answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setScore(newScore);
      setFinished(true);
    }
  };

  if (finished) {
    let message = "";

    if (score === 20) {
      message = "🎉 Excellent! You scored 20/20. Keep it up!";
    } else if (score >= 15) {
      message =
        "👍 Good! You scored " +
        score +
        "/20. Practice more to become perfect.";
    } else {
      message =
        "📚 Practice More! Better luck next time. All the best!";
    }

    return (
      <div className="interview-page">
        <div className="interview-card">
          <h1>🎯 Interview Result</h1>

          <h2>
            Your Score: {score}/{questions.length}
          </h2>

          <h3>
            Percentage:{" "}
            {((score / questions.length) * 100).toFixed(0)}%
          </h3>

          <p
            style={{
              fontSize: "22px",
              marginTop: "20px",
              fontWeight: "bold",
              color: "#0d6efd",
            }}
          >
            {message}
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "25px",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              background: "#007bff",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page">
      <div className="interview-card">
        <h1>🤖 AI Interview Practice</h1>

        <div className="progress">
          Question {index + 1} / {questions.length}
        </div>

        <h2>{questions[index].question}</h2>

        <div className="options">
          {questions[index].options.map((option) => (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interview;

