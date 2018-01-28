
const Sequelize = require('sequelize');
const options = { logging: false, operatorsAliases: false};
const sequelize = new Sequelize("sqlite:db.sqlite", options);

const user = sequelize.define(
  'user', 
  { name: { 
      type: Sequelize.STRING,
      unique: { msg: "Name already exists"},
      validate: { 
        is: { args: /^[a-z]+$/i, msg: "name: invalid characters"}
      }
    }
  }
);

const quiz = sequelize.define(
  'quiz', 
  { question: { 
      type: Sequelize.STRING,
      unique: { msg: "Quiz already exists"}
    },
    answer: Sequelize.STRING
  }
);

quiz.belongsTo(user, {as: 'author', foreignKey: 'authorId'});
user.hasMany(quiz, {as: 'posts', foreignKey: 'authorId'});

module.exports = sequelize;

