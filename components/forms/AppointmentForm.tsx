"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../shared/CustomFormField";
import SubmitButton from "../shared/SubmitButton";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { DOCTORS } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";
import { Status } from "@/types";
import clsx from "clsx";

const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export default function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId?: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment?.schedule || new Date(Date.now()),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    let status: Status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status,
        };
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status,
            reason: values.reason,
            cancellationReason: values.cancellationReason,
            note: values.note,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;

  if (type === "create") {
    buttonLabel = "Request appointment";
  } else if (type === "cancel") {
    buttonLabel = "Cancel appointment";
  } else if (type === "schedule") {
    buttonLabel = "schedule appointment";
  }

  return (
    <Form {...form}>
      {type === "create" && (
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Hi there ...</h1>
          <p className="text-dark-700 text-base">
            Request a new appointment in 10 seconds.
          </p>
        </section>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {DOCTORS.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-8 xl:flex-row">
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="What's the reason for your appointment?"
                />
              </div>
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="note"
                  label="Additional notes"
                  placeholder="Any additional notes?"
                />
              </div>
            </div>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              placeholder="Select your appointment date"
            />
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="What's the reason for your cancellation?"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={clsx("capitalize", {
            " bg-red-700 bg-opacity-70 hover:bg-red-700 hover:bg-opacity-80":
              type === "cancel",
          })}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}
