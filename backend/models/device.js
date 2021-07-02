module.exports = (sequelize, Sequelize) => {

    const Device = sequelize.define("device", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(16),
        validate: {min: 1, max: 16},
        allowNull: false
      },
      partNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      }
    }, 
    {
      freezeTableName: true,
      timestamps: false
    });

    Device.associate = models => {
      Device.belongsTo(models.category,{
        foreignKey: {
          name:'categoryId',
          allowNull: false
        }
      })
    }
    
  
    return Device;
  };