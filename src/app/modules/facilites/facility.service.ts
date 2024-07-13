import httpStatus from "http-status";
import FacilityModel from "./facility.model";
import { TFacility } from "./ficility.interface";
import AppError from "../../errors/AppError";


const createFacilityIntoDb = async (payload: TFacility) => {
  return await FacilityModel.create(payload);
};

const updateFacilityUsingIdIntoDb = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const isDeleted = await FacilityModel.findById(id);

  if (isDeleted?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This Facility is deleted");
  }
  if (!isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid Facility ID");
  }
  const updatedFacility = await FacilityModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedFacility;
};

const deleteFacilityByIDFromDb = async (id: string) => {
  return await FacilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};


const getAllFacilityFromDb = async () => {
  return await FacilityModel.find({ isDeleted: false });
}

export const facilityService = {
  createFacilityIntoDb,
  updateFacilityUsingIdIntoDb,
  deleteFacilityByIDFromDb,
  getAllFacilityFromDb
};