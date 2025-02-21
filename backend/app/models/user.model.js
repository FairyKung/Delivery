module.exports = (sequelize, dataType) => {
    const User = sequelize.define("users", {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataType.STRING,
            allowNull: false
        },
        lastname: {
            type: dataType.STRING,
            allowNull: false
        },
        salary: {
            type: dataType.INTEGER,
            allowNull: false
        },
        cost: {
            type: dataType.INTEGER,
            allowNull: true,  // Allow null if it's optional or if you plan to update later
            defaultValue: 0   // Default to 0 if not provided
        },
        shipment: {
            type: dataType.INTEGER,
            allowNull: true,  // Allow null if it's optional
            defaultValue: 0   // Default to 0 if not provided
        },
        Vehicles: {
            type: dataType.INTEGER,
            allowNull: true,  // Allow null if it's optional
            defaultValue: 0   // Default to 0 if not provided
        }
    });

    return User;
};
