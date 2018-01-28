
const {user, quiz} = require("./model.js").models;

if (process.argv.length != 5){  // Wrong parameters?
  console.log('   syntax: "node 3_create <name> <question> <answer>"');
  process.exit(2);            // Finalizes node process
}
const name = process.argv[2];
const question = process.argv[3], answer = process.argv[4];

user.findOrCreate(
  {where: {name}}
)
.then(user => 
  quiz.create(
    { question: question,
      answer: answer,
      authorId: user[0].id
    }
  )
)
.then( quiz =>
  console.log(`   User ${name} created`
              + ` quiz: ${question} -> ${answer}`
  )
)
.catch( err => console.log(`   ${err}`));

