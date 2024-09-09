import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Contact, removeContact } from "@/store/contactSlice";
import { Nullable } from "@/types/utilityTypes";
import { useDispatch } from "react-redux";

interface ContactCardProps {
  contact: Contact;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedContact: React.Dispatch<React.SetStateAction<Nullable<Contact>>>;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  setIsOpen,
  setSelectedContact,
}) => {
  const dispatch = useDispatch();
  const { id, firstName, lastName, status } = contact;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>You can Edit or Delete this contact</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          First Name: <span className="font-semibold text-lg">{firstName}</span>
        </p>
        <p>
          Last Name: <span className="font-semibold text-lg">{lastName}</span>
        </p>
        <p>
          Status: <span className="font-semibold text-lg">{status}</span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen(true);
            setSelectedContact(contact);
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => dispatch(removeContact(id))}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
