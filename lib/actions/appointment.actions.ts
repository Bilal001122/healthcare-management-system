"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { Appointment } from "@/types/appwrite.types";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { revalidatePath } from "next/cache";
import { formatDateTime } from "../utils";

export async function createAppointment(
  appointmentData: CreateAppointmentParams
) {
  try {
    const appointment = databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );
    return appointment;
  } catch (error) {
    console.error(error);
  }
}

export async function getAppointment(appointmentId: string) {
  try {
    const appointment = databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return appointment;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentAppointmentsList() {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const count = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointments.total,
      ...count,
      documents: appointments.documents as Appointment[],
    };
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAppointment({
  appointmentId,
  userId,
  appointment: appointmentData,
  type,
}: {
  appointmentId: string;
  userId: string;
  appointment: {
    primaryPhysician: string;
    schedule: Date;
    status: string;
    cancellationReason?: string;
  };
  type: string;
}) {
  try {
    const appointment = databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointmentData
    );

    if (!appointment) throw new Error("Appointment not found");

    const messageContent =
      type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointmentData.schedule).dateTime
          } with Dr. ${appointmentData.primaryPhysician}`
        : `Your appointment has been cancelled. Reason: ${appointmentData.cancellationReason}`;

    await sendSMSNotification(userId, messageContent);

    revalidatePath("/admin");
    return appointment;
  } catch (error) {
    console.error(error);
  }
}

export async function sendSMSNotification(
  userId: string,
  messageContent: string
) {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      messageContent,
      [],
      [userId]
    );
    return message;
  } catch (error) {
    console.error(error);
  }
}
