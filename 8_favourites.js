
const {user, quiz} = require("./model.js").models;

if (process.argv.length != 3){  // Wrong parameters?
  console.log('   syntax: "node 8_favourites <name>"');
  process.exit(2);            // Finalizes node process
}

const name = process.argv[2];

user.findOne({ 
  where: {name}, 
  include: [{
    model: quiz, 
    as: 'favouriteQuizzes',
    include: [{
      model: user,
      as: 'author'
    }]
  }]
})
.then( user => {
  if (!user) {throw new Error(`  '${name}' is not in DB`)};
  console.log(`  ${name}'s favourites`);
  user.favouriteQuizzes.forEach( q =>
    console.log(`    ${q.question} -> ${q.answer} (${q.author.name})`)
  );
})
.catch( err => console.log(`  ${err}`));

