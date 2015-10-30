var LogParser = require('./lib/svn-simple-log-parser');

var alfrescoParser = new LogParser({
    repoUrl: 'https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD'
});

alfrescoParser
    .parse({
        limit: 5
    })
    .then( function (data) {
        console.log(data);
    })
    .catch( function (err) {
        console.log(err);
    })
;
