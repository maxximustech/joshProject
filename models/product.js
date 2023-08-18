const { DataTypes } = require('sequelize');
const Product = {
    modelName: 'Product',
    attributes: {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
}

module.exports = Product;