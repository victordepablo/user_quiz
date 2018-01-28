
const sequelize = require("./model.js");
const {user, quiz} = require("./model.js").models;

sequelize.sync()
.then(() => user.count())
.then((count) => {
  if (count===0) {
    return (
      user.bulkCreate([
        { name: 'Peter'},
        { name: 'Anna'},
        { name: 'John'}
      ])
      .then( () => {
        return quiz.bulkCreate([
          { question: 'Capital of Spain', answer: 'Madrid', authorId: 1},
          { question: 'Capital of France', answer: 'Paris', authorId: 1},
          { question: 'Capital of Italy', answer: 'Rome', authorId: 2},
          { question: 'Capital of Russia', answer: 'Moscow', authorId: 3}
        ])
      })
      .then(() => console.log(`  DB created: 3 users, 4 quizzes`))
    )
  } else {
    console.log(`  DB exists: ${count} elements`);
  }
})
.catch( err => console.log(`   ${err}`));

