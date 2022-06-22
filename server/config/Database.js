import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default db;
