"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import AppointmentForm from "../forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

export default function AppointmentModal({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment: Appointment;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={clsx("capitalize", {
            "text-green-500": type === "schedule",
            "text-red-500": type === "cancel",
          })}
        >
          {type === "schedule" ? "Schedule" : "Cancel"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize text-xl">
            {type} Appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} the appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
