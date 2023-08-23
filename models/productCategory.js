const { DataTypes } = require('sequelize');
module.exports = {
    modelName: 'productCategory',
    attributes: {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
}