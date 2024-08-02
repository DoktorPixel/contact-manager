import ContactList from "@/components/ContactList";
import ContactForm from "@/components/ContactForm";

export const Homepage: React.FC = () => {
  return (
    <div className="main">
      <ContactForm />
      <ContactList />
    </div>
  );
};
