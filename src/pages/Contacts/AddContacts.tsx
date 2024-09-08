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
import { Status, addContact } from "@/store/contactSlice";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useState } from "react";

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

const AddContacts = () => {
  const dispatch = useDispatch();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      status: Status.Active,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, reset } = form;

  const onSubmit = async ({ firstName, lastName, status }: FormData) => {
    dispatch(addContact({ id: Date.now(), firstName, lastName, status }));
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="self-end">
        <Button onClick={() => setIsOpen(true)}>Add Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new contact</DialogTitle>
          <DialogDescription>
            Add a new contact to the contact list
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

            <Button type="submit">Add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContacts;
