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

function foundPeople(callback) {
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

foundPeople(function(output) {
    console.log(output);
});