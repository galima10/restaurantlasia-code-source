import { useState } from "react";

export function useFAQSection() {
    // Gérer l'état d'ouverture des réponses
      const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
      const handleToggle = (id: number) => {
        // Si la question cliquée est déjà ouverte, fermez-la. Sinon, ouvrez-la.
        setOpenQuestionId(openQuestionId === id ? null : id);
      };
    return { openQuestionId, handleToggle };
};