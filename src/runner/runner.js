
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const newman = require('newman');
const path = require('path');

const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('API_KEY not found in environment variables. Please set it in the .env file');
}

const collectionUrl = `https://api.postman.com/collections/12332945-766ea1fd-9a4c-4e18-a285-c947e6229e04?apikey=${apiKey}`;

newman.run({
    collection: collectionUrl,
    reporters: ['cli', 'htmlextra'],
    envVar: [
        { "key": "firstName", "value": "Dolly updated" }
    ],
    reporter: {
        htmlextra: {
            export: 'D:/AGT BootCamp/Petstore Newman/Petstore_Swagger_Newman/reports/postman/report.html',
        }
    }
}, function (err) {
    if (err) { throw err; }
    console.log('Newman run complete! Report saved to: D:/AGT BootCamp/Petstore Newman/Petstore_Swagger_Newman/reports/postman/');
});