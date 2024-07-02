import { Request, Response } from "express";
import ClientRecordModel from "../models/client.model";
export const clientDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clientRecords = await ClientRecordModel.find();
    res.status(200).json({
      success: true,
      message: "Client records retrieved successfully",
      data: clientRecords,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({
      success: false,
      message: "Error in retrieving client records",
      error: e.message,
    });
  }
};

export const createClientRecordsController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      address,
      contact,
      nameOfPet,
      species,
      petsBreed,
      petsSex,
      petsBirthdate,
    } = req.body;

    const clientRecordData = {
      fullName,
      address,
      contact,
      nameOfPet,
      species,
      petsBreed,
      petsSex,
      petsBirthdate,
    };

    const clientRecord = new ClientRecordModel(clientRecordData);

    await clientRecord.save();

    res.status(201).send({
      success: true,
      message: "Client records added successfully",
      data: clientRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in adding client records",
      error,
    });
  }
};

export const deleteClientRecordsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Find and delete the client record by ID
    const deletedRecord = await ClientRecordModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).send({
        success: false,
        message: "Client record not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Client record deleted successfully",
      data: deletedRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the client record",
      error,
    });
  }
};

export const editClientRecordsController = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedClientData = req.body;
    const id = updatedClientData.id;
    // Fetch the client records by its ID
    const clientRecord = await ClientRecordModel.findById(id);

    if (!clientRecord) {
      return res.status(404).send({
        success: false,
        message: "Client Records not found",
      });
    }

    // Update the client records data
    clientRecord.fullName = updatedClientData.fullName;
    clientRecord.address = updatedClientData.address;
    clientRecord.contact = updatedClientData.contact;
    clientRecord.nameOfPet = updatedClientData.nameOfPet;
    clientRecord.species = updatedClientData.species;
    clientRecord.petsBreed = updatedClientData.petsBreed;
    clientRecord.petsSex = updatedClientData.petsSex;
    clientRecord.petsBirthdate = updatedClientData.petsBirthdate;

    // Add more fields based on your client records model

    // Save the updated client records data
    await clientRecord.save();

    res.status(200).send({
      success: true,
      message: "Client Records updated successfully",
      data: clientRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating client records",
      error,
    });
  }
};

export const addPetHistoryController = async (req: Request, res: Response) => {
  const { historyDate, petsHistory, id } = req.body;

  try {
    const record = await ClientRecordModel.findById(id);

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    // Add the new entry without limiting the number of entries
    record.historyDate!.push(historyDate);
    record.petsHistory!.push(petsHistory);

    await record.save();

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error adding history entry:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const addMedicationController = async (req: Request, res: Response) => {
  const { medicationDate, petsMedication, id } = req.body;

  try {
    const record = await ClientRecordModel.findById(id);

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    // Add the new entry without limiting the number of entries
    record.medicationDate!.push(medicationDate);
    record.petsMedication!.push(petsMedication);

    await record.save();

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error adding medication entry:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
