svn-simple-log-parser [![NPM version][npm-image]][npm-url]
==================================================

Get a clean json object from a (verbose) svn log stream.

Install as dependency
---------------------

Install the module:
```bash
npm install svn-simple-log-parser --save
```

Parsing SVN Logs to JSON
---------------------
```javascript
var LogParser = require('svn-simple-log-parser');

var alfrescoParser = new LogParser({
    repoUrl: 'https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD'
    verbose: true,
    numberOfRevisions: 30
});

alfrescoParser.parse(function(data){
    console.log(data);
});
```

[npm-image]: https://badge.fury.io/js/tinyscrollbar.png
[npm-url]: http://badge.fury.io/js/svn-simple-log-parser
