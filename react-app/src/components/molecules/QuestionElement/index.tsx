import styles from "./QuestionElement.module.scss";
import { useQuestionElement } from "@hooks/useQuestionElement";

export default function QuestionElement({
  question,
  isAnswerOpen,
  setIsAnswerOpen,
}: {
  question?: { title?: string; answer?: string };
  isAnswerOpen: boolean;
  setIsAnswerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { answerSegments } = useQuestionElement(question);

  return (
    <div className={styles.questionElement}>
      <div className={styles.questionHeader}>
        <p>
          <strong>{question.title}</strong>
        </p>
        <button
          onClick={() => setIsAnswerOpen(!isAnswerOpen)}
          style={isAnswerOpen ? { transform: "rotate(180deg)" } : {}}
        >
          <span>&#10095;</span>
        </button>
      </div>
      <div
        className={
          styles.answerContainer + (isAnswerOpen ? ` ${styles.open}` : "")
        }
      >
        <p className={styles.answer}>
          {answerSegments.map((segment, index) => (
            <span key={index}>{segment}</span>
          ))}
        </p>
      </div>
    </div>
  );
}