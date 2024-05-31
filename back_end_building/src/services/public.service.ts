import { Op } from 'sequelize';
import { db } from '../loaders/database.loader';
import { Fee_details } from '../models/fee_details.model';
import { Fees } from '../models/fees.model';
import { Residents } from '../models/residents.model';
import { Vehicle_details } from '../models/vehicle_details.model';
import { Vehicle_types } from '../models/vehicle_types.model';

export const getFees = async (
	limit: number,
	page: number,
	type: string | null,
) => {
	const query: any = {};
	if (type) {
		query.type = {
			[Op.like]: `%${type}%`,
		};
	}
	const fees = await db.fees.findAndCountAll({
		limit,
		offset: (page - 1) * limit,
		where: query,
	});
	return fees;
};

export const getVehicleTypes = async (limit: number, page: number) => {
	const vehicleTypes = await db.vehicleTypes.findAndCountAll({
		limit,
		offset: (page - 1) * limit,
	});
	return vehicleTypes;
};

export const getHouseholds = async (
	limit: number,
	page: number,
	houseNumber: string | null,
) => {
	let query: any = {};
	if (houseNumber) {
		query.houseNumber = {
			[Op.like]: `%${houseNumber}%`,
		};
	}
	const households = await db.households.findAll({
		where: query,
		attributes: {
			exclude: ['phoneNumber'],
		},
		limit,
		offset: (page - 1) * limit,
	});
	return households;
};

export const getHouseholdCount = async (houseNumber: string | null) => {
	let query: any = {};
	if (houseNumber) {
		query.houseNumber = {
			[Op.like]: `%${houseNumber}%`,
		};
	}
	const householdCount = await db.households.count({
		where: query,
	});
	return householdCount;
};

export const checkHousehold = async (id: number, phoneNumber: string) => {
	const household = await db.households.findOne({
		where: { id, phoneNumber },
	});
	if (household) {
		return true;
	}
	return false;
};

export const getHousehold = async (id: number, phoneNumber: string) => {
	const household = await db.households.findOne({
		where: { id, phoneNumber },

		include: [
			{
				model: Fee_details,

				include: [
					{
						model: Fees,
					},
				],
			},
			{
				model: Residents,
				attributes: ['fullName', 'dateOfBirth'],
			},
			{
				model: Vehicle_details,
				include: [
					{
						model: Vehicle_types,
					},
				],
			},
		],
	});
	return household;
};

export const getVoluntaryContributions = async () => {
	const voluntaryContributions = await db.voluntaryContributions.findAll({
		include: [
			{
				model: db.residents,
				attributes: ['fullName', 'dateOfBirth'],
			},
		],
		group: ['voluntaryContributions.residentId', 'resident.id'],
		attributes: [
			'residentId',
			[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'totalAmount'],
		],
	});
	return voluntaryContributions;
};
