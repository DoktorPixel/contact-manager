import ContactList from "@/components/common/ContactList";
import ContactForm from "@/components/common/ContactForm";

export const Homepage: React.FC = () => {
  return (
    <div className="main">
      <ContactForm />
      <ContactList />
    </div>
  );
};
