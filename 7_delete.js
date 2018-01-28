
const {user, quiz} = require("./model.js").models;

if (process.argv.length != 3){  // Wrong parameters?
  console.log('   syntax: "node 7_delete <user_name>"');
  process.exit(2);            // Finalizes node process
}

const name = process.argv[2];

user.findOne( {where: {name}})
.then( user => {
  if (!user) { throw new Error(`${name} not in DB`)};   
  return user;
})
.then( user => 
  quiz.destroy({
    where: {authorId: user.id}
  })
  .then(() => 
    user.destroy()
  )
)
.then( () => 
  console.log(`  ${name} deleted from DB`)
)
.catch( err => console.log(`  ${err}`));

