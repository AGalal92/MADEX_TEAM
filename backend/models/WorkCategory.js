// models/WorkCategory.js
module.exports = (sequelize, DataTypes) => {
    const WorkCategory = sequelize.define('WorkCategory', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    WorkCategory.associate = (models) => {
      WorkCategory.hasMany(models.Work, {
        foreignKey: 'work_category_id',
        as: 'works',
      });
    };
  
    return WorkCategory;
  };