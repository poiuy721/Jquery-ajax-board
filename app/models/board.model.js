const dbConfig = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
	const Board = sequelize.define("board", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		  },
  		title: Sequelize.STRING,
        content: Sequelize.STRING,
		image:Sequelize.STRING
	},
	{
		timestamps:true}
	);
	return Board
};
