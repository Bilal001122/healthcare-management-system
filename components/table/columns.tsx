"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "../shared/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { DOCTORS } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../shared/AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <p>{row.original.patient.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = DOCTORS.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );
      return (
        <div className="flex flex-col justify-start items-center gap-2 px-2 py-2  drop-shadow-2xl sm:flex-row">
          <Image
            src={doctor?.image ?? ""}
            alt="Doctor image"
            width={32}
            height={32}
            className="rounded-full object-cover hidden sm:block"
          />
          <p className="text-center">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patient.$id}
            userId={row.original.patient.userId}
            appointment={row.original}
          />
          <AppointmentModal
            type="cancel"
            patientId={row.original.patient.$id}
            userId={row.original.patient.userId}
            appointment={row.original}
          />
        </div>
      );
    },
  },
];
