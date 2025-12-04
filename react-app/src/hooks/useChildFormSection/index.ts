import { useState } from "react";

export function useChildFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  }); // État pour les autres champs du formulaire
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    // Vérifie si tous les champs sont remplis et qu'il n'y a pas de message d'erreur
    return formData.name && formData.email && formData.message;
  };

  
  return { formData, handleInputChange, isFormValid, setFormData };
}
