import StatsCard from "@/components/cards/StatsCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getRecentAppointmentsList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const appointments = await getRecentAppointmentsList();

  return (
    <div className="flex flex-col flex-1 px-4 py-4 custom-scrollbar overflow-auto">
      <header className="flex justify-between items-center bg-input drop-shadow-2xl py-2 px-4 rounded-xl">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo-full.svg"}
            width={162}
            height={32}
            alt="Logo"
          />
        </Link>
        <p className="text-base font-semibold">Admin dashboard</p>
      </header>
      <main className="flex flex-col gap-12 flex-1 px-12 py-10">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">
            Welcome to the admin dashboard.
          </h1>
          <p className="text-foreground/70">
            Start day by checking the latest updates on the platform.
          </p>
        </section>
        <section className="flex justify-between gap-5">
          <StatsCard
            type="appointments"
            count={appointments?.scheduledCount!}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatsCard
            type="pending"
            count={appointments?.pendingCount!}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatsCard
            type="cancelled"
            count={appointments?.cancelledCount!}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments?.documents!} />
      </main>
    </div>
  );
}
