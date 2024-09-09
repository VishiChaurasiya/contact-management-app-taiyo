import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Contact,
  Status,
  addContact,
  updateContact,
} from "@/store/contactSlice";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Nullable } from "@/types/utilityTypes";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .transform((value) => value.trim()),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .transform((value) => value.trim()),
  status: z.nativeEnum(Status, {
    errorMap: () => ({ message: "Invalid status" }),
  }),
});
type FormData = z.infer<typeof schema>;

interface CreateAndEditFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContact?: Nullable<Contact>;
  setSelectedContact: React.Dispatch<React.SetStateAction<Nullable<Contact>>>;
}

const DEFAULT_VALUE = {
  firstName: "",
  lastName: "",
  status: Status.Active,
};

const CreateAndEditForm: React.FC<CreateAndEditFormProps> = ({
  isOpen,
  setIsOpen,
  selectedContact,
  setSelectedContact,
}) => {
  const dispatch = useDispatch();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUE,
  });
  const { control, handleSubmit, reset } = form;
  const isNewContact = !selectedContact;

  useEffect(() => {
    if (selectedContact) reset(selectedContact);
  }, [selectedContact, reset]);

  const handleOnClose = () => {
    setSelectedContact(null);
    reset(DEFAULT_VALUE);
    setIsOpen(false);
  };

  const onSubmit = async ({ firstName, lastName, status }: FormData) => {
    if (isNewContact)
      dispatch(addContact({ id: Date.now(), firstName, lastName, status }));
    else
      dispatch(
        updateContact({ id: selectedContact.id, firstName, lastName, status })
      );

    handleOnClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);

        if (!isOpen) handleOnClose();
      }}
    >
      <DialogTrigger asChild className="self-end">
        <Button onClick={() => setIsOpen(true)}>Add Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isNewContact ? "Create New Contact" : "Edit Contact"}
          </DialogTitle>
          <DialogDescription>
            {isNewContact
              ? "Fill in the details to add a new contact to your list."
              : "Update the contact information as needed."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your first name e.g. John
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your last name e.g. Doe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <RadioGroup value={value} onValueChange={onChange}>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={Status.Active} id="active" />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={Status.Inactive} id="inactive" />
                    <Label htmlFor="inactive">Inactive</Label>
                  </div>
                </RadioGroup>
              )}
            />

            <Button type="submit">{isNewContact ? "Add" : "Save"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAndEditForm;
