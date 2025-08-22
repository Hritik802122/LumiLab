import { useState } from 'react';
import { motion } from 'framer-motion';
import quizzesData from '@/content/quizzes.json';
import QuizItem, { type Question } from '@/components/QuizItem';
import ResultPanel from '@/components/ResultPanel';
import styles from '@/components/Quiz.module.css';

const quizzes: Question[] = quizzesData as Question[];

const Practice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | number | null)[]>(Array(quizzes.length).fill(null));

  const handleAnswer = (answer: string | number) => {
    const isCorrect = answer === quizzes[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(Array(quizzes.length).fill(null));
    setShowResults(false);
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className="sectionTitle" style={{color: 'var(--amber-400)'}}>Practice Zone</h2>
      <p className="sectionSubtitle">Test your knowledge with these questions.</p>
      
      {showResults ? (
        <ResultPanel score={score} total={quizzes.length} onRestart={restartQuiz} />
      ) : (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className={styles.quizHeader}>Question {currentQuestionIndex + 1} of {quizzes.length}</div>
          <QuizItem
            questionData={quizzes[currentQuestionIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
          {userAnswers[currentQuestionIndex] !== null && (
             <div className={styles.buttonContainer}>
              <button
                  onClick={nextQuestion}
                  className="gradientButton"
              >
                  {currentQuestionIndex < quizzes.length - 1 ? 'Next Question' : 'Show Results'}
              </button>
             </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Practice;