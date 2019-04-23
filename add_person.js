const settings = require("./settings");

const knex = require('knex')({
    client: 'pg',
    version: '9.5',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

  let inputFirstName = process.argv[2];
  let inputLastName = process.argv[3];
  let inputBDay = process.argv[4];
  let inputArray = [{first_name: inputFirstName, last_name: inputLastName, birthdate: inputBDay}];
  knex('famous_people').insert(inputArray)
  .then(() =>{console.log('done');})
  .catch((err) => {
      console.log('err ', err);
  })
  .finally(() => {knex.destroy()});