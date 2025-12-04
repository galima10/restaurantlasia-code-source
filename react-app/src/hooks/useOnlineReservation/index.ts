import { useState } from "react";

export function useOnlineReservation(closedDays: string[]) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // État pour la valeur sélectionnée
  const [showSuggestions, setShowSuggestions] = useState(false); // État pour afficher/masquer les suggestions
  const [selectedDate, setSelectedDate] = useState<string>(""); // État pour la date sélectionnée
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // État pour le message d'erreur
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    reservationDate: "",
    reservationTime: "",
  }); // État pour les autres champs du formulaire

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);

    // Vérifie si le jour sélectionné est un jour de fermeture
    const dayOfWeek = new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
    });
    if (closedDays.includes(dayOfWeek.toLowerCase())) {
      setErrorMessage(`Nous sommes fermés le ${dayOfWeek}.`);
    } else {
      setErrorMessage(null); // Réinitialise le message d'erreur
    }
  };

  const handleSuggestionClick = (time: string) => {
    setSelectedTime(time); // Met à jour la valeur sélectionnée
    setShowSuggestions(false); // Masque les suggestions après sélection
  };

  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev); // Affiche ou masque les suggestions
  };

  const isFormValid = () => {
    // Vérifie si tous les champs sont remplis et qu'il n'y a pas de message d'erreur
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.guests &&
      selectedDate &&
      selectedTime &&
      !errorMessage
    );
  };
  return {
    selectedTime,
    selectedDate,
    showSuggestions,
    errorMessage,
    formData,
    handleInputChange,
    handleDateChange,
    handleSuggestionClick,
    toggleSuggestions,
    isFormValid,
    setFormData,
  };
}
