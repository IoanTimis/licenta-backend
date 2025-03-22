const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 
const User = require("./user");
const topicRequest = require("./topicRequest");

const MyStudents = sequelize.define('my_students', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'topic_requests', 
            key: 'id',
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

MyStudents.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher', onDelete: 'CASCADE' });
MyStudents.belongsTo(User, { foreignKey: 'student_id', as: 'student', onDelete: 'CASCADE' });
MyStudents.belongsTo(topicRequest, { foreignKey: 'request_id', as: 'request', onDelete: 'CASCADE' });

module.exports = MyStudents;
