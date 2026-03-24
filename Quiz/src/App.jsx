import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import { UserProvider } from "./components/UserContext";
import Results from "./components/Results";
import dogGif from "./assets/dog.gif";

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [element, setElement] = React.useState("");
  const [dogImage, setDogImage] = React.useState(null);

  const questions = [
  {
    question: "How do you usually like to spend your free time after a long day?",
    options: ["Running", "Friends", "Relaxing", "Exploring"],
  },
  {
    question: "How would your friends most likely describe your personality?",
    options: ["Energetic", "Friendly", "Calm", "Smart"],
  },
  {
    question: "What kind of activities do you enjoy the most on weekends?",
    options: ["Adventure", "Socializing", "Rest", "Learning"],
  },
  {
    question: "When you meet new people, how do you usually behave?",
    options: ["Talkative", "Kind", "Shy", "Observing"],
  },
  {
    question: "What does your perfect day look like from morning to evening?",
    options: ["Active", "Together", "Quiet", "Interesting"],
  },
  {
    question: "Which word best describes your overall vibe and lifestyle?",
    options: ["Energy", "Loyalty", "Comfort", "Independence"],
  },
];

  const elements = {
  "Running": "🐕‍🦺 Border Collie",
  "Energetic": "🐕‍🦺 Border Collie",
  "Adventure": "🐕‍🦺 Border Collie",
  "Talkative": "🐕‍🦺 Border Collie",
  "Active": "🐕‍🦺 Border Collie",
  "Energy": "🐕‍🦺 Border Collie",

  "Friends": "🐶 Labrador",
  "Friendly": "🐶 Labrador",
  "Socializing": "🐶 Labrador",
  "Kind": "🐶 Labrador",
  "Together": "🐶 Labrador",
  "Loyalty": "🐶 Labrador",

  "Relaxing": "🐕 Bulldog",
  "Calm": "🐕 Bulldog",
  "Rest": "🐕 Bulldog",
  "Shy": "🐕 Bulldog",
  "Quiet": "🐕 Bulldog",
  "Comfort": "🐕 Bulldog",

  "Exploring": "🐩 Poodle",
  "Smart": "🐩 Poodle",
  "Learning": "🐩 Poodle",
  "Observing": "🐩 Poodle",
  "Interesting": "🐩 Poodle",
  "Independence": "🐩 Poodle",
};

function determineElement(answers) {
  const counts = {};

  answers.forEach((answer) => {
    const mappedElement = elements[answer];
    counts[mappedElement] = (counts[mappedElement] || 0) + 1;
  });
  return Object.keys(counts).reduce((a, b) => {
    return counts[a] > counts[b] ? a : b;
  });
}

async function fetchDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setDogImage(data.message);
  } catch (error) {
    console.error("Error fetching dog image:", error);
    setDogImage("");
  }
}

  function handleAnswer(answer) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    if (nextQuestionIndex === questions.length) {
      const result = determineElement(newAnswers);
      setElement(result);
      fetchDogImage();
    }
  }

    return (
        <UserProvider>
          <div className="app-container">
            <img src={dogGif} alt="dog gif" className="corner-gif" />
            <Header />
            <Routes>
                <Route path="/" element={<UserForm />} />
                <Route path="/quiz" element={
                    currentQuestionIndex < questions.length ? (
                      <Question
                        question={questions[currentQuestionIndex].question}
                        options={questions[currentQuestionIndex].options}
                        onAnswer={handleAnswer}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                      />
                    ) : (
                      <Results element={element} dogImage={dogImage} />
                    )
                  }
                />
            </Routes>
          </div>
        </UserProvider>
    );
}