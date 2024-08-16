import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params: { userId },
  searchParams,
}: {
  params: {
    userId: string;
  };
  searchParams: { [key: string]: string };
}) {
  const appointmentId = searchParams.appointmentId;
  const appointment = await getAppointment(appointmentId);
  const doctor = DOCTORS.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );
  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center px-10 py-10 gap-8 custom-scrollbar">
      <Image
        src="/assets/icons/logo-full.svg"
        width={200}
        height={100}
        style={{ width: "200px", height: "100px" }}
        priority
        alt="CarePulse logo"
        className="object-contain mt-5"
      />
      <div className="flex flex-col items-center justify-center gap-8">
        <Image
          src="/assets/gifs/success.gif"
          alt="Success"
          width={200}
          height={200}
        />

        <p className="text-3xl font-semibold text-center">
          Your <span className="text-primary">appointment request</span> has
          <br />
          been successfully submitted!
        </p>
        <p className="">We&rsquo;ll be in touch shortly to confirm.</p>
      </div>
      <div className="flex items-center gap-10 border-y-2 border-inputBorder py-2 px-8 text-sm">
        <p className="text-base font-semibold">
          Requested appointment details:
        </p>
        <div className="flex flex-col justify-center items-center gap-2 bg-input px-2 py-2 rounded-md drop-shadow-2xl sm:flex-row">
          <Image
            src={doctor?.image ?? ""}
            alt="Doctor image"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <p className="text-center">Dr. {doctor?.name}</p>
        </div>
        <p>{formatDateTime(appointment!.schedule).dateTime}</p>
      </div>
      <Button variant={"default"} asChild>
        <Link href={`/patients/${userId}/new-appointment`}>
          New Appointment
        </Link>
      </Button>
    </div>
  );
}
