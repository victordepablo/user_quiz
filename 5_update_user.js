
const user = require("./model.js").models.user;

if (process.argv.length != 4){  // Wrong parameters?
  console.log('   syntax: "node 5_update_user <name> <n_name>"');
  process.exit(2);            // Finalizes node process
}

const name = process.argv[2], n_name = process.argv[3];

user.findOne({where: {name}})
.then( user => {
  if (!user) { throw new Error(`${name} not in DB`)};
  user.name = n_name;
  return user;
})
.then( user =>  user.save({ fields: ["name"]}))
.then( () => console.log(`  ${name} updated to ${n_name}`))
.catch( err => console.log(`  ${err}`));

