const newman = require('newman');
const path = require('path');

newman.run({
    collection: 'https://api.postman.com/collections/12332945-766ea1fd-9a4c-4e18-a285-c947e6229e04?apikey=PMAK-69940197901c78000174f36b-2263f254f39fd47faabbc7b82807a6e1c9',
    reporters: ['cli', 'htmlextra'],
    envVar: [
        { "key": "firstName", "value": "Dolly updated" }
    ],
    reporter: {
        htmlextra: {
            // This defines the specific path you requested
            export: 'D:/AGT BootCamp/Petstore Newman/Petstore_Swagger_Newman/reports/postman/report.html',
            // Optional: adds the collection name and date to the filename
            // browserTitle: "Petstore Test Report",
            // title: "Petstore API Execution Report"
        }
    }
}, function (err) {
    if (err) { throw err; }
    console.log('Newman run complete! Report saved to: D:\\AGT BootCamp\\Petstore Newman\\Petstore_Swagger_Newman\\reports\\postman\\');
});