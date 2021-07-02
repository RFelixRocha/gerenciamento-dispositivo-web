module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(128),
        validate: {min: 1, max: 128},
        allowNull: false
      }
    }, 
    {
      freezeTableName: true,
      timestamps: false
    });

    Category.associate = models => {
      Category.hasMany(models.device,{
        onDelete: "cascade"
      })
    }
  
    return Category;
};