var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
    hosts: [
        '192.168.1.86:9200'
    ]
});

module.exports = client;