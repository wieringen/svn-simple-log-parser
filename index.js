var LogParser = require('./lib/svn-simple-log-parser');

new LogParser({
    repoUrl: 'https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD',
    onParsed: function(data) {
        console.log(JSON.stringify(data, null, 4));
    }
});
