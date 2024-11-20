const pool = require("../config/db");
const bcrypt = require("bcrypt");
const InvariantError = require("../utils/InvariantError");
const NotFoundError = require("../utils/NotFoundError");

class UsersService {
  async register({ email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (email, password) VALUES (?,?)";
    const result = await pool.query(query, [email, passwordHash]);

    if (result.affectedRows == 0) {
      throw new InvariantError("Register Failed");
    }
    return { email, password };
  }

  async login({ email, password }) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await pool.query(query, [email]);
    if (result.affectedRows == 0) {
      throw new InvariantError("Email or password not match");
    }
    const validationPassword = await bcrypt.compare(
      password,
      result[0].password
    );

    if (!validationPassword) {
      throw new InvariantError("Email or password not match");
    }
    return result[0];
  }

  async profile(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    if (result.length == 0) {
      throw new NotFoundError("Not Found");
    }
    return result[0];
  }
}

module.exports = UsersService;
