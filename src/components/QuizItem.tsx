import clsx from 'clsx';
import styles from './Quiz.module.css';

export interface Question {
  id: number;
  type: 'mcq' | 'numerical' | 'challenge';
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
}

interface QuizItemProps {
  questionData: Question;
  onAnswer: (answer: string | number) => void;
  userAnswer: string | number | null;
}

const QuizItem = ({ questionData, onAnswer, userAnswer }: QuizItemProps) => {
  const isAnswered = userAnswer !== null;
  const isCorrect = userAnswer === questionData.answer;

  return (
    <div className={`glassmorphismCard ${styles.quizItem}`}>
      <p className={styles.question}>{questionData.question}</p>
      
      {questionData.type === 'mcq' && questionData.options && (
        <div className={styles.optionsContainer}>
          {questionData.options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              disabled={isAnswered}
              className={clsx(
                styles.optionButton,
                isAnswered && option === questionData.answer && styles.correct,
                isAnswered && userAnswer === option && !isCorrect && styles.incorrect,
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isAnswered && (
        <div className={clsx(styles.feedbackPanel, isCorrect ? styles.feedbackPanelCorrect : styles.feedbackPanelIncorrect)}>
          <h4 className={clsx(styles.feedbackTitle, isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect)}>
            {isCorrect ? "Correct!" : "Not Quite."}
          </h4>
          <p className={styles.feedbackExplanation}>{questionData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizItem;