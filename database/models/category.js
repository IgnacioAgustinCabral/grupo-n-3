'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Transaction, { foreignKey: 'categoryId' });
		}
	}
	Category.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			description: {
				allowNull: true,
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			sequelize,
			modelName: 'Category',
		}
	);
	return Category;
};
