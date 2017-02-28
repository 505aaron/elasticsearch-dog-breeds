const HOST = "http://elastic:changeme@localhost:9200";
const program = require('commander');
const elasticsearch = require('elasticsearch');

program
  .version('1.0.0')
  .usage("<query string>")
  .parse(process.argv);

console.log("Querying for '%s'", program.args[0]);

let elasticClient = new elasticsearch.Client({host: HOST});
elasticClient.search({
  index: "dogs",
  body: {
    query: {
      multi_match: {
        query: program.args[0],
        fields: ["name", "section"]
      }
    }
  }
}).then(function(response) {
  console.log(JSON.stringify(response, null, 2));
}).catch(e => {
  console.error("Failed to parse query", e)
});
