var LogParser = require('./lib/svn-simple-log-parser');

var alfrescoSVN = new LogParser({
    repoUrl: 'https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD'
});

alfrescoSVN
    .parse({
        limit: 5,
        verbose: true
    })
    .then( function (data) {
        console.log(data);
    })
    .catch( function (err) {
        console.log(err);
    })
;
