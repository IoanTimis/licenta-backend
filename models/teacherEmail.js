const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Configurarea conexiunii la baza de date

const TeacherEmail = sequelize.define("teacher_emails", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Verifică dacă este un email valid
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = TeacherEmail;
