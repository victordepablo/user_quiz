
const {user, quiz} = require("./model.js").models;

user.findAll({ 
  include: [{
    model: quiz,
    as: 'posts'
  }]
})
.then( users => 
  users.forEach( user => {
    console.log(`  ${user.name}'s quizzes`);
    user.posts.forEach( q => 
      console.log(`    ${q.question} -> ${q.answer}`)
    )               
  })
)
.catch( err => console.log(`   ${err}`));

