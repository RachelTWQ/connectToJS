const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

let inputName = process.argv[2];

console.log("Searching ...");

function findPeople(callback) {
    client.connect((err) => {
        if (err) {
            return console.error("Connection Error", err);
        }
        client.query(`SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text`, [inputName], (err, result) => {
            if (err) {
                return console.error("error running query", err);
            }
            callback(result.rows); 
            client.end();
        });
    });
}

findPeople(function(output) {
    console.log(`Found ${output.length} person(s) by the name '${inputName}':`);

    output.forEach ((element, index) => {
        console.log(`- ${index + 1}: ${element['first_name']} ${element['last_name']}, born '${element['birthdate'].getFullYear()}-${element['birthdate'].getMonth() + 1}-${element['birthdate'].getDate()}'`);
    })
});

