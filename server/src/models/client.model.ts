import mongoose, { Document, Schema } from "mongoose";

interface ClientRecord extends Document {
  fullName: string;
  address: string;
  contact: string;
  nameOfPet: string;
  species: string;
  petsBreed: string;
  petsSex: string;
  petsBirthdate: Date;
  petsHistory?: string[];
  historyDate?: Date[];
  petsMedication?: string[];
  medicationDate?: Date[];
  nextVisit?: Date;
}

const clientRecordsSchema = new Schema<ClientRecord>({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  nameOfPet: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  petsBreed: {
    type: String,
    required: true,
  },
  petsSex: {
    type: String,
    required: true,
  },
  petsBirthdate: {
    type: Date,
    required: true,
  },
  petsHistory: {
    type: [String],
    required: false,
  },
  historyDate: {
    type: [Date],
    required: false,
  },
  petsMedication: {
    type: [String],
    required: false,
  },
  medicationDate: {
    type: [Date],
    required: false,
  },
  nextVisit: {
    type: Date,
  },
});

const ClientRecordModel = mongoose.model<ClientRecord>(
  "ClientRecord",
  clientRecordsSchema
);

export default ClientRecordModel;
