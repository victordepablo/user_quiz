
const {user, quiz} = require("./model.js").models;

if (process.argv.length != 3){  // Wrong parameters?
  console.log('   syntax: "node 4_read <name>"');
  process.exit(2);            // Finalizes node process
}

const name = process.argv[2];

user.findOne({
  where: {name}, 
  include: [{
    model: quiz,
    as: 'posts'
  }]
})
.then( user => {
  if (!user) {throw new Error(`  '${name}' is not in DB`)};
  console.log(`  ${name}'s quizzes`);
  user.posts.forEach( q => 
    console.log(`    ${q.question} -> ${q.answer}`)
  );
})
.catch( err => console.log(`  '${err}`));

