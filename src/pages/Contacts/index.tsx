import { RootState } from "@/store";
import { useSelector } from "react-redux";
import AddContacts from "./AddContacts";

const Contacts = () => {
  const contacts = useSelector((state: RootState) => state.contacts);

  return (
    <div className="flex-grow flex flex-col">
      <AddContacts />
      {contacts.length ? (
        <></>
      ) : (
        <div className="flex-grow grid place-content-center text-lg text-center md:text-3xl font-bold">
          No contacts found, please add a contact
        </div>
      )}
    </div>
  );
};

export default Contacts;
