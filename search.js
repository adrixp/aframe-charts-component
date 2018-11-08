var client = require('./connection.js');

client.search({
    index: 'datapoints',
    type: '_doc'
},function (error, response,status) {
    if (error){
        console.log("search error: "+error)
    }
    else {
        console.log("--- Response ---");
        console.log(response);
        console.log("--- Hits ---");
        response.hits.hits.forEach(function(hit){
            console.log(hit);
        })
    }
});