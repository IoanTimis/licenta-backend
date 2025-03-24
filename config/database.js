const { Sequelize } = require('sequelize');

const url = new URL(process.env.DATABASE_URL);
const useSSL = url.searchParams.get("ssl") === "true";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: useSSL ? {
    ssl: {
      rejectUnauthorized: true
    }
  } : {},
});

module.exports = sequelize;