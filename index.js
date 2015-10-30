var LogParser = require('./svn-simple-log-parser');

new LogParser({
    repoUrl: 'http://svn.essent.nl/repos/frontEndDev',
    onParsed: function(data) {
        console.log(data);
    }
});
