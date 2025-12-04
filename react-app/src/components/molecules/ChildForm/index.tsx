import styles from "./ChildForm.module.scss";

export default function ChildForm({
  className,
  handleSubmit,
  formData,
  handleInputChange,
  isFormValid,
}: {
  className?: string;
  handleSubmit: (e: React.FormEvent) => void;
  formData: { name: string; email: string; message: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isFormValid: () => string;
}) {
  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className={`${className} ${styles.childForm}`}
    >
      <div>
        <label htmlFor="name">
          Nom<span>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Ex : Jean Dupont"
        />
      </div>
      <div>
        <label htmlFor="email">
          Email<span>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Ex : votremail@example.com"
        />
      </div>
      <div>
        <label htmlFor="message">
          Message<span>*</span>
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Entre votre message ici"
        ></textarea>
      </div>
      <input
        className="primary-button"
        type="submit"
        value="Envoyer"
        disabled={!isFormValid()} // Désactive le bouton si le formulaire n'est pas valide
      />
    </form>
  );
}
