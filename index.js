const HOST = "http://elastic:changeme@localhost:9200";

const elasticsearch = require('elasticsearch');
const etl = require('etl');
const fs = require('fs');

let elasticClient = new elasticsearch.Client({host: HOST});

let createIndex = elasticClient
  .indices
  .exists({index: "dogs"})
  .then(exists => {
    let result = Promise.resolve();
    if (exists) {
      console.info("Deleting existing index");
      result = elasticClient
        .indices
        .delete({index: "dogs"});
    }

    return result.then(() => {
      elasticClient
        .indices
        .create({
          index: "dogs",
          body: {
            size: 3,
            mappings: {
              "dog": {
                "properties": {
                  name: {
                    type: "text"
                  },
                  section: {
                    type: "text"
                  },
                  country: {
                    type: "keyword"
                  },
                  url: {
                    type: "keyword"
                  }
                }
              }
            }
          }
        });
    })
  });

createIndex.then(() => {
  return fs
    .createReadStream("breeds.csv")
    .pipe(etl.csv())
    .pipe(etl.map(breed => {
      return {
        "_id": breed.id,
        "_type": "dog",
        name: breed.name,
        section: breed.section,
        country: breed.country,
        url: breed.url
      };
    }))
    .pipe(etl.collect(1000))
    .pipe(etl.elastic.index(elasticClient, 'dogs'))
    .promise()
}).then(() => {
  console.log("Data Indexed");
}).catch(e => {
  console.error("Failed to index data %o", e);
})