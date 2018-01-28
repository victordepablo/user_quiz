
const {user, quiz} = require("./model.js").models;

quiz.findAll({
  include: [{
    model: user,
    as: 'author'
  }]
})
.then( quizzes => 
  quizzes.forEach( q =>
    console.log(`  ${q.question} -> ${q.answer} (${q.author.name})`)
  )
)
.catch( err => console.log(`   ${err}`));

