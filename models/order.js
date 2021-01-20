module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define("Order", {
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "OPEN"
        },
        items: {
            type: DataTypes.JSON,
            defaultValue: []
        }
    });

    Order.associate = function (models) {
        Order.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT', as: "creator"});
        Order.hasMany(models.Payment);
    };

    return Order;
};