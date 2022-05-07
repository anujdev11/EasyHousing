module.exports = (sequelize, DataTypes) => {
    const roommateListings = sequelize.define("roommateListings", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        postedBy: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        postedUserId:{
            type: DataTypes.INTEGER,
        },
        moveInDate:{
            type: DataTypes.STRING,
        }
        
    });

    return roommateListings;

};