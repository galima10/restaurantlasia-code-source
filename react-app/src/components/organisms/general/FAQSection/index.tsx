import styles from "./FAQSection.module.scss";
import { useFAQSection } from "@hooks/useFAQSection";

import QuestionElement from "@components/molecules/QuestionElement";

interface FAQSectionProps {
  datas?: {
    title?: string;
    questions?: {
      id?: number;
      title?: string;
      answer?: string;
    }[];
  };
}

export default function FAQSection({ datas }: FAQSectionProps) {
  const { openQuestionId, handleToggle } = useFAQSection();

  return (
    <section className={styles.faqSection}>
      <h2 className="pink">{datas?.title || "Titre de la section"}</h2>
      <ul className={styles.faqList}>
        {datas?.questions?.map((question) => (
          <li key={question.id}>
            <QuestionElement
              question={question}
              isAnswerOpen={openQuestionId === question.id}
              setIsAnswerOpen={() => handleToggle(question.id)}
            />
          </li>
        )) || <p className={styles.noQuestions}>Aucune question disponible.</p>}
      </ul>
    </section>
  );
}
