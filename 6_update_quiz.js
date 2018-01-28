
const {user, quiz} = require("./model.js").models;

if (process.argv.length != 5){  // Wrong parameters?
  console.log('   syntax: "node 6_update_quiz <question>'
              + ' <n_question> <n_answer>"');
  process.exit(2);            // Finalizes node process
}

const question = process.argv[2];
const n_question = process.argv[3], n_answer = process.argv[4];

quiz.update(
  { question: n_question,
    answer: n_answer
  },
  {where: {question}}
)
.then( quizzes => {
  if (quizzes[0]===0) { 
    throw new Error(`${question} not in DB`)
  };
  console.log(`  n_quiz: ${n_question} -> ${n_answer}`);
})
.catch( err => console.log(`  ${err}`));

