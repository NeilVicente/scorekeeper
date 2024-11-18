// models.js
const { Sequelize, DataTypes } = require('sequelize');
const storage = process.env.NODE_ENV === 'development' ?
    ':memory:' : process.env.DB_PATH;
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage
});

sequelize.sync();

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


const HighScore = sequelize.define('HighScore', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
        }
    },
    player_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

if (process.env.NODE_ENV === 'development') {
    HighScore.sync();
    Game.sync();
    sequelize.sync().then(async () => {
        await Game.create({ id: 1, name: 'Snakey' });
    });
    sequelize.sync().then(async () => {
        await Game.create({ id: 2, name: 'Tetris' });
    });
    // add some high scores
    sequelize.sync().then(async () => {
        await HighScore.create({ gameId: 1, player_name: 'Alice', score: 1 });
    });
    sequelize.sync().then(async () => {
        await HighScore.create({ gameId: 1, player_name: 'Bob', score: 2 });
    });

}

sequelize.sync();


module.exports = { HighScore, Game, sequelize };