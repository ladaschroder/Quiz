import React from "react";

export default function Question({ question, options, onAnswer, currentQuestionIndex, totalQuestions }) {
    return (
        <div>
            <p>Question {currentQuestionIndex + 1} of {totalQuestions}</p>

            <h2>{question}</h2>

            <div className="question-buttons">
            {options.map((option) => {
                return (<button key={option} onClick={() => onAnswer(option)}>
                    {option}
                </button>
                );
            })}
        </div>
    </div>
    );
}