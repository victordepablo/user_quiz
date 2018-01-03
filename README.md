# user_quiz

Simple program (configured as npm package) illustrating how to define 
relations among two tables of a DB: **users & quizzes**. 
Table **users** has only column **name**, where the name of the user 
must be unique. 
Table quizzes has two columns (**question, answer**) and the question 
must be unique. 
A 1-N relation (Author of quiz) and an N-N relation (Favourite 
quizzes of each user) are defined among both tables.
The DB is syncronized first with the **sync()** method. sync() is
substituted by migrations and seeders at the end.


## Download, instalation and usage

This proyect can be downloaded, installed and used as follows:

```
$ git clone https://github.com/CORE-UPM/user_quiz
$ cd user_quiz
$
$ npm install
$
$ npm run-script migrate  ## to perform migrations and synchronize the DB
$ npm run-script seed     ## to initialize de DB with seed values
$
$
$        ## The following commands are ready to be executed
$        ## after the DB has been synchronized and seeded: 
$
$ node 1_all                   ## shows all users with their quizzes
$ node 2_all_quiz              ## shows all quizzes including author
$ node 3_create <name> <question> <answer> 
$                              ## creates new user & quiz
$                              ## or adds quiz to existing user
$ node 4_read <name>                  ## shows user with quizzes
$ node 5_update_user <name> <n_name>  ## updates user name to n_name
$ node 6_update_quiz <question> <n_question> <n_answer>
$                              ## updates an existing quiz 
$ node 7_delete <name>         ## deletes user and associated quizzes
$ node 8_favourites <name>     ## shows favourite quizzes of user
$ node 9_mark_fav <name> <question>   ## marks quiz as favourite
$
```


## Project commits

The project has been created in five steps which have
been saved in five commits:

```
5) sequelize-cli: migrations and seeds
4) Favourites: N-N user-quiz relation
3) Author: 1-N user-quiz relation
2) Add package.json & more
1) Initial commit
```

### Step 1

Creation in GitHub of the project repository 
(https://github.com/CORE-UPM/user_quiz) with a
first commit with tree files:

- README.md (this file)
- LICENSE with the MIT License
- .gitignore with the typical configuration for node
 
### Step 2

In step 2, the project (only with the "Initial 
commit") is cloned from GitHub to a local repository. 
The **.gitignore** file is updated (to ignore the 
DB file db.sqlite and the MAC files .DS_Store) 
and the **README.md** file is completed with this text. 

```
$ git clone https://github.com/CORE-UPM/user_quiz
$ cd person
$
$  ## Edit .gitignore and README.md files
$
```

This step bundles the project as an npm package. The 
package.json file of the package is created first 
with the "npm init" comand:

```
$ npm init          ## creates the package.json file
This utility ...    ## by asking for all the params
................
................
name: (user_quiz) 
version: (1.0.0) 
................
Is this ok? (yes) 
$
```

Dependencies with sequelize (http://docs.sequelizejs.com/) 
and sqlite3 (https://www.npmjs.com/package/sqlite3) npm 
packages are added then to package.json. The following 
commands have been used:

```
$
$ npm install --save sequelize@3.30.2
$ npm install --save sqlite3@3.1.8
$
```


### Step 3

In step 3 the models of tables **users** and **quizzes** (file model.js) 
are added. In addition, an 1-N relation which links the author 
to his quizzes is defined. 

Seven comands are defined: Initializing the DB (0_init.js),
Creating entries (3_create.js), Reading entries 
(1_all.js, 2_all_quiz.js, 4_read_js), Updating 
entries (5_update_user.js, 6_update_quiz.js)
and deleting (7_delete.js) authors. The nine 
files added are:

```
model.js       ## defines models user & quiz, & 1-N relation
0_init.js      ## simple DB creation & init command
1_all.js       ## shows all users (<name>) with their quizzes
               ## (<question>, <answer>) they have authored
2_all_quiz.js  ## shows all quizzes with author (<name>)
3_create.js    ## creates user & quiz or adds quiz to existing user
4_read.js      ## shows user with his quizzes
5_update_user.js  ## updates the <name> of a user
6_update_quiz.js  ## updates the <answer> and <question> of a quiz
7_delete.js       ## deletes user <name> and associated quizzes
```

### Step 4

In step 4 an N-N Favourites relation between tables **users** 
and **quizzes** is added to the model (file model.js). The init
command (0_init.js) is modified to initialize the new 
relation too. Two new commands are added to mark (9_mark_fav.js) 
and show (8_favourites.js) favourites. 

```
model.js         ## an N-N favourites relation is added
0_init.js        ## initialization of N-N relation is added
8_favourites.js  ## shows the favourite quizzes of a user
9_mark_fav.js    ## marks a given quiz as favourite of a user
```

### Step 5

Step 5 introduces migrations and seeds for DB configuration 
and initialization. 

The initialization file (0_init.js) is removed and the 
sequelize-cli npm package is installed
(https://www.npmjs.com/package/sequelize-cli), saving 
the dependency in package.json.

```
$
$ npm install --save sequelize-cli@3.2.0
$     
```

The sequelize-cli package installs a command line interface 
for sequelize which automates partly some of the DB related 
operations. We will use it here to generate a program
skeleton for the migration and seed files as follows:

```
$
$ node_modules/.bin/sequelize migration:create --name CreateUsersTable
$ node_modules/.bin/sequelize migration:create --name CreateQuizzesTable
$ node_modules/.bin/sequelize migration:create --name CreateFavouritesTable
$     
$
$ node_modules/.bin/sequelize seed:create --name FillUsersTable
$ node_modules/.bin/sequelize seed:create --name FillQuizzesTable
$ node_modules/.bin/sequelize seed:create --name FillFavouritesTable
$     
```

Those comands create the migration and seed directories and 
file skeletons. The **file skeletons** are **completed manually 
by editing** them.

Finally, those two scripts are added to **package.json** for
running migration and seeds:

```
  "scripts": {
    "migrate": "./node_modules/.bin/sequelize db:migrate --url sqlite://$(pwd)/db.sqlite",
    "seed": "./node_modules/.bin/sequelize db:seed:all --url sqlite://$(pwd)/db.sqlite"
  }
```

The DB has to be set-up and seeded now running those scripts, and
not "node 0_init" as till now, as follows:

```
$
$ npm run-script migrate  ## to perform migrations and synchronize the DB
$ npm run-script seed     ## to initialize de DB with seed values
$     
```

