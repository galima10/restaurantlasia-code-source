import styles from "./SimpleMessageFormSection.module.scss";

import ChildForm from "@components/molecules/ChildForm";
import { useChildFormSection } from "@hooks/useChildFormSection";

interface SimpleMessageFormSectionProps {
  datas?: {
    title?: string;
  };
}

export default function SimpleMessageFormSection({
  datas,
}: SimpleMessageFormSectionProps) {
  const { formData, handleInputChange, isFormValid, setFormData } =
    useChildFormSection();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await fetch("/wp-json/theme/v1/add-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          text: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Merci pour votre message !");
        // reset formulaire
        setFormData({ name: "", email: "", message: "" });
        // éventuellement rafraîchir la liste des messages
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };
  return (
    <section className={styles.simpleMessageFormSection}>
      <h2>{datas?.title || "Titre de la section"}</h2>
      <ChildForm
        formData={formData}
        handleInputChange={handleInputChange}
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
