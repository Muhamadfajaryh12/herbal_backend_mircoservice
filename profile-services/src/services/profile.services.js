const pool = require("../config/db");
const InvariantError = require("../utils/InvariantError");
const NotFoundError = require("../utils/NotFoundError");

class ProfileService {
  async insert({ name, address, postal_code, id_user }) {
    const query =
      "INSERT INTO profile (name,address,postal_code,id_user) VALUES (?,?,?,?)";
    const [result] = await pool.query(query, [
      name,
      address,
      postal_code,
      id_user,
    ]);

    if (result.affectedRows == 0) {
      throw new InvariantError("Not found");
    }

    return result[0];
  }

  async get(id) {
    const query = `
      SELECT profile.*,users.id , users.email 
      FROM profile 
      INNER JOIN users ON profile.id_user = users.id 
      WHERE id_user = ? `;

    const [result] = await pool.query(query, [id]);
    if (result.length === 0) {
      throw new NotFoundError("Not Found");
    }
    return result[0];
  }
}

module.exports = ProfileService;
