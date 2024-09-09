import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import { Contact } from "@/store/contactSlice";
import { useState } from "react";
import CreateAndEditForm from "./CreateAndEditForm";
import { Nullable } from "@/types/utilityTypes";

const Contacts = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] =
    useState<Nullable<Contact>>(null);

  return (
    <div className="flex-grow flex flex-col gap-5 mt-2">
      <CreateAndEditForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />

      {contacts.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {contacts.map((contact) => (
            <ContactCard
              contact={contact}
              setIsOpen={setIsOpen}
              setSelectedContact={setSelectedContact}
            />
          ))}
        </div>
      ) : (
        <div className="flex-grow grid place-content-center text-lg text-center md:text-3xl font-bold">
          No contacts found, please add a contact
        </div>
      )}
    </div>
  );
};

export default Contacts;
