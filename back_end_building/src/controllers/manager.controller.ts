import { NextFunction, Request, Response } from 'express';
import { PERMISSION_ERROR, RESPONSE_SUCCESS } from '../constants/constants';
import * as managerServices from '../services/manager.service';
import { DataResponse } from '../interfaces/response.interface';

// household
export const addHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { houseNumber, address, totalArea, phoneNumber } = req.body;
		const household = await managerServices.addHousehold(
			houseNumber,
			address,
			totalArea,
			phoneNumber,
		);

		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getHouseholds = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const limit = Number(req.query.limit) || 10;
		const page = Number(req.query.page) || 1;
		const houseNumber = req.query.name ? String(req.query.name) : null;
		const households = await managerServices.getHouseholds(
			limit,
			page,
			houseNumber,
		);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					households: households.rows,
					count: households.count,
					limit,
					page,
				},
				'OK',
			),
		);
	} catch (error) {
		next(error);
	}
};

export const updateHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { houseNumber, address, totalArea, phoneNumber } = req.body;
		const household = await managerServices.updateHousehold(
			id,
			houseNumber,
			address,
			totalArea,
			phoneNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const household = await managerServices.deleteHousehold(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

// fee details
export const addFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { householdId, feeId, quantity, dueDate, status } = req.body;
		const fee = await managerServices.addFeeDetail(
			householdId,
			feeId,
			quantity,
			dueDate,
			status,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { householdId, feeId, quantity, dueDate, status } = req.body;
		const fee = await managerServices.updateFeeDetail(
			id,
			householdId,
			feeId,
			quantity,
			dueDate,
			status,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const fee = await managerServices.deleteFeeDetail(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};
// vehicle details

export const addVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { householdId, vehicleTypeId, registrationNumber } = req.body;
		const vehicle = await managerServices.addVehicleDetail(
			householdId,
			vehicleTypeId,
			registrationNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { householdId, vehicleTypeId, registrationNumber } = req.body;
		const vehicle = await managerServices.updateVehicleDetail(
			id,
			householdId,
			vehicleTypeId,
			registrationNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const vehicle = await managerServices.deleteVehicleDetail(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

//residents

export const addResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		} = req.body;
		const resident = await managerServices.addResident(
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const {
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		} = req.body;
		const resident = await managerServices.updateResident(
			id,
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const resident = await managerServices.deleteResident(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

//voluntary contributions

export const addVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { residentId, description, amout, date } = req.body;
		const contribution = await managerServices.addVoluntaryContribution(
			residentId,
			description,
			amout,
			date,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { residentId, description, amout, date } = req.body;
		const contribution = await managerServices.updateVoluntaryContribution(
			id,
			residentId,
			description,
			amout,
			date,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const contribution = await managerServices.deleteVoluntaryContribution(
			id,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};
