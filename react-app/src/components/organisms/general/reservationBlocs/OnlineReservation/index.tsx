import { useOnlineReservation } from "@hooks/useOnlineReservation";
import { useTransformGeneralInfos } from "@hooks/useTransformGeneralInfos";

import styles from "./OnlineReservation.module.scss";

export default function OnlineReservation({
  className,
  globalInfo,
  confirmationLink,
}: {
  className?: string;
  globalInfo?: {
    openingHours?: {
      noon?: {
        start: string;
        end: string;
      };
      evening?: {
        start: string;
        end: string;
      };
    };
    closedDays?: string[];
    phoneNumber?: string;
    address?: string;
  };
  confirmationLink?: string;
}) {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    errorMessage,
    selectedTime,
    showSuggestions,
    handleSuggestionClick,
    toggleSuggestions,
    isFormValid,
    setFormData,
    selectedDate,
  } = useOnlineReservation(globalInfo?.closedDays);

  const { timeSlots } = useTransformGeneralInfos(
    globalInfo?.openingHours,
    globalInfo?.closedDays
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await fetch("/wp-json/theme/v1/add-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: formData.guests,
          reservationDate: selectedDate,
          reservationTime: selectedTime,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (!confirmationLink) alert("Merci pour votre réservation !");
        // Réinitialise le formulaire
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "1",
          reservationDate: "",
          reservationTime: "",
        });
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <section className={className}>
      <h2>Réservez en ligne</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reservationName">
            Nom<span>*</span>
          </label>
          <input
            type="text"
            id="reservationName"
            name="name"
            placeholder="Ex: Jean Dupont"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservationEmail">
            Email<span>*</span>
          </label>
          <input
            type="email"
            id="reservationEmail"
            name="email"
            placeholder="Ex: votreemail@exemple.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservationPhone">
            Numéro de téléphone<span>*</span>
          </label>
          <input
            type="tel"
            id="reservationPhone"
            name="phone"
            placeholder="Ex: 01 23 45 67 89"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservationGuests">
            Couverts<span>*</span>
          </label>
          <input
            type="number"
            id="reservationGuests"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservationDate">
            Date<span>*</span>
          </label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            onChange={handleDateChange}
            className={errorMessage ? styles.inputError : ""}
            disabled={!globalInfo?.closedDays}
            required
          />
          {globalInfo?.closedDays.length === 7 ? (
            <p className={styles.error}>
              <small>Pas de jours de fermeture définis</small>
            </p>
          ) : (
            errorMessage && (
              <p className={styles.error}>
                <small>{errorMessage}</small>
              </p>
            )
          )}
        </div>
        <div>
          <label htmlFor="reservationTime">
            Heure<span>*</span>
          </label>
          <input
            type="button"
            className={styles.timeButton}
            onClick={toggleSuggestions}
            value={`${selectedTime || "Sélectionnez une heure"} ⇅`}
            disabled={!timeSlots.length}
          />
          {showSuggestions && timeSlots.length > 0 && (
            <ul className={styles.timeSuggestions}>
              {timeSlots.map((time) => (
                <li
                  key={time}
                  onMouseDown={() => handleSuggestionClick(time)} // Remplit l'input avec l'heure sélectionnée
                >
                  {time}
                </li>
              ))}
            </ul>
          )}
          {!timeSlots.length && (
            <p className={styles.error}>
              <small>Pas d'horaires définis/mal définis</small>
            </p>
          )}
        </div>
        <p className={styles.disclaimer}>
          <small>
            *Un mail de confirmation vous sera envoyé dans votre boîte mail,
            récapitulant votre réservation.
          </small>
        </p>
        <input
          className="primary-button"
          type="submit"
          value="Valider"
          disabled={!isFormValid()} // Désactive le bouton si le formulaire n'est pas valide
          onClick={() => {
            if (confirmationLink) {
              window.location.href = confirmationLink;
            }
          }}
        />
      </form>
    </section>
  );
}
