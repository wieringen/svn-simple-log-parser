var LogParser = require('./lib/svn-simple-log-parser');

var alfrescoParser = new LogParser({
    repoUrl: 'http://svn.essent.nl/repos/frontEndDev/'
});

alfrescoParser
    .parse({
        path: 'widgets/meterReadingCollection',
        limit: 5
    })
    .then( function (data) {
        console.log(data);
    })
    .catch( function (err) {
        console.log(err);
    })
;
