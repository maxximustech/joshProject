const { DataTypes } = require ('sequelize');

const Cart = {
    modelName: 'Cart',
    attributes: {
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }
}
module.exports = Cart
