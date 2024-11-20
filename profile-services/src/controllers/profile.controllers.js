const ProfileService = require("../services/profile.services");
const InvariantError = require("../utils/InvariantError");
const responseHandler = require("../../../users-services/src/utils/Response");

const profileService = new ProfileService();

const insertProfile = async (req, res, next) => {
  const { name, address, postal_code, id_user } = req.body;
  try {
    const data = await profileService.insert({
      name,
      address,
      postal_code,
      id_user,
    });

    return responseHandler(res, 201, "Success", data);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await profileService.get(id);

    return responseHandler(res, 200, "Profile", data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertProfile,
  getProfile,
};
