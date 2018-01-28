
const {user, quiz, favourites} = require("./model.js").models;

if (process.argv.length != 4){  // Wrong parameters?
  console.log('   syntax: "node 9_mark_fav <name> <question>"');
  process.exit(2);            // Finalizes node process
}

const name = process.argv[2], question = process.argv[3];
let mark;

user.findOne({where: {name}})
.then( user => {
  if (!user) { throw new Error(`  ${name} not in DB`)};
  return mark = favourites.build({userId: user.id});
})
.then(() => quiz.findOne({ where: {question}}))
.then( quiz => {
  if (!quiz) { throw new Error(`  ${question} not in DB`)};
  return mark.quizId = quiz.id;
})
.then(() => mark.save({ fields: ["userId", "quizId"]}))
.then(() => console.log(`  '${question}' marked by ${name}`))
.catch(err => console.log(`  ${err}`));

