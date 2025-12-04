import styles from "./ComplexMessageFormSection.module.scss";

import ChildForm from "@components/molecules/ChildForm";

import { useDynamicBackground } from "@hooks/useDynamicBackground";
import { useChildFormSection } from "@hooks/useChildFormSection";

interface ComplexMessageFormSectionProps {
  datas?: {
    description?: {
      paragraph1?: string;
      paragraph2?: string;
    };
    backgroundImage?: string;
  };
}

export default function ComplexMessageFormSection({
  datas,
}: ComplexMessageFormSectionProps) {
  const { sectionRef } = useDynamicBackground<HTMLDivElement>(
    datas?.backgroundImage
  );
  const { formData, handleInputChange, isFormValid, setFormData } =
    useChildFormSection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await fetch("/wp-json/theme/v1/add-review", {
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
        alert("Merci pour votre avis !");
        window.location.reload();
        // reset formulaire
        setFormData({ name: "", email: "", message: "" });
        // éventuellement rafraîchir la liste d'avis
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <div ref={sectionRef} className={styles.complexMessageFormSection}>
      <div className={styles.textContainer}>
        <p>{datas?.description?.paragraph1 || "Paragraphe 1"}</p>
        <p>{datas?.description?.paragraph2 || "Paragraphe 2"}</p>
      </div>
      <ChildForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        isFormValid={isFormValid}
      />
    </div>
  );
}
