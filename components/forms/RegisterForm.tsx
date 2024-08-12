"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../shared/CustomFormField";
import SubmitButton from "../shared/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GENDER_OPTIONS } from "@/constants";
import { Label } from "../ui/label";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export default function RegisterForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userData = values;
      const user = await createUser(userData);
      setIsLoading(false);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome ...</h1>
        <p className="text-dark-700 text-base">
          Let us know more about your health by filling the form below
        </p>
        <p className="text-2xl md:text-3xl font-bold mt-10 mb-12">
          Personal information
        </p>
      </section>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="Arab Bilal"
          icon="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col w-full flex-1 gap-8 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="kb_arab@esi.dz"
              icon="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone number"
              placeholder="+213555555555"
            />
          </div>
        </div>

        <div className="flex flex-col w-full flex-1 gap-8 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="birthDate"
              label="Date of birth"
              placeholder="Select your birth date"
              // icon="/assets/icons/.svg"
              // iconAlt="email"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-fit xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <div key={option}>
                        <RadioGroupItem value={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </div>
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
}
