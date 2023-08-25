const { DataTypes } = require ('sequelize');

const Cart = {
    modelName: 'Cart',
    attributes: {
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }
}
module.exports = Cart
