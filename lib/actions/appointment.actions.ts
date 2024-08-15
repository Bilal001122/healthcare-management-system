"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";

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
