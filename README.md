# Elasticsearch Dog Breeds

Builds an elastic index of dog breeds.

Data was sourced from [fci-breeds](https://github.com/paiv/fci-breeds).

## Requirements
You will need Docker version 1.13.1.

## Usage

### Install Dependencies
Install node dependencies.

`npm install`

### Start Elastic
Start the elastic search service.

`npm run elastic-up`

### Index Data
`npm run index`

### Perform Queries
`npm run query "I love golden retrievers"`

### Stop Elasticsearch server
`npm run elastic-down`

The following blog post gives a detailed write-up.
[ http://www.lessrework.com/2017/02/automating-elasticsearch-indexing/]( http://www.lessrework.com/2017/02/automating-elasticsearch-indexing/).
