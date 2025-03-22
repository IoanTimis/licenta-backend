const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 
const Topic = require("./topic");
const User = require("./user");

const FavoriteTopics = sequelize.define('favorite_topics', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', 
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Topic', 
            key: 'id',
        },
        onDelete: 'CASCADE',
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

FavoriteTopics.belongsTo(User, { foreignKey: 'user_id', as: 'user' }, { onDelete: 'CASCADE' });
FavoriteTopics.belongsTo(Topic, { foreignKey: 'topic_id', as: 'topic' }, { onDelete: 'CASCADE' });


module.exports = FavoriteTopics;
