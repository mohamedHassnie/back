const User = require("../models/Administration");
const Vacation = require("../models/Vacation");

const getUser = async (userId) =>
  User.findOne({ _id: userId }).select("-password ");

const getVacations = async (userId) => Vacation.find({ userId });

const createVacation = async (payload) => Vacation.create(payload);

module.exports = {
  getUser,
  getVacations,
  createVacation,
};
