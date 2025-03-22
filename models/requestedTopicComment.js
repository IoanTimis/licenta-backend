const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const topicRequest = require('./topicRequest');

const RequestedTopicComment = sequelize.define('requested_topic_comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: topicRequest,
      key: 'id',
    },
  },
});

RequestedTopicComment.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
RequestedTopicComment.belongsTo(topicRequest, { foreignKey: 'request_id', as: 'request', onDelete: 'CASCADE' });
User.hasMany(RequestedTopicComment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
topicRequest.hasMany(RequestedTopicComment, { foreignKey: 'request_id', as: 'comments', onDelete: 'CASCADE' });

module.exports = RequestedTopicComment;

