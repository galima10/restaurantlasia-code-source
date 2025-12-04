import { useState, useEffect } from "react";

export function useQuestionElement(question: { title?: string; answer?: string }) {
  const [answerSegments, setAnswerSegments] = useState<string[]>([]);

  useEffect(() => {
    if (!question.answer) return;

    const segments = question.answer.split(/([.:;]) /).reduce<string[]>(
      (acc, part, index) => {
        if (index % 2 === 0) {
          // Partie de la phrase (texte)
          acc.push(part);
        } else {
          // Ponctuation : ajoutée à la fin du dernier segment
          acc[acc.length - 1] += part;
        }
        return acc;
      },
      []
    );

    setAnswerSegments(segments);
  }, [question]);

  return { answerSegments };
}