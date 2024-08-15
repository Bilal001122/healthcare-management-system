import Image from "next/image";
import React from "react";
import newAppointmentImg from "@/public/assets/images/appointment-img.png";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

export default async function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const patient = await getPatient(userId);

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 justify-start gap-16 h-screen overflow-auto px-10 md:px-12 xl:px-32 py-6 overflow-y-auto custom-scrollbar">
        <Image
          src={"/assets/icons/logo-full.svg"}
          width={200}
          height={100}
          style={{ width: "200px", height: "100px" }}
          priority
          alt="CarePulse logo"
          className="object-contain mt-5"
        />

        <AppointmentForm
          type="create"
          userId={userId}
          patientId={patient?.$id}
        />
      </div>
      <div className="relative w-[30%] hidden md:block">
        <Image
          src={newAppointmentImg}
          fill
          quality={75}
          sizes="100%"
          placeholder="blur"
          alt="Doctor image"
          className="object-cover rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
    </div>
  );
}
