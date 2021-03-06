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

let inputName = process.argv[2];

console.log("Searching ...");

function findPeople (callback) {
   knex.select('first_name','last_name', 'birthdate').from('famous_people')
.where('first_name', '=', inputName)
.asCallback((err, result) => {
    if (err) {
        return console.error("error running query", err);
    } else {
        callback(result);
    }
     
    knex.destroy();
}); 
}

findPeople(function(output) {
    console.log(`Found ${output.length} person(s) by the name '${inputName}':`);

    output.forEach ((element, index) => {
        console.log(`- ${index + 1}: ${element['first_name']} ${element['last_name']}, born '${element['birthdate'].getFullYear()}-${element['birthdate'].getMonth() + 1}-${element['birthdate'].getDate()}'`);
    });
});

