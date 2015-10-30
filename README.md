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

var alfrescoSVN = new LogParser({
    repoUrl: 'https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD'
    user: 'ausername',
    password: 'apassword'
});

alfrescoSVN
    .parse({
        limit: 5,
        path: 'some/path',
        revision: '99999',
        from: '9999',
        to: '9999',
        verbose: true
    })
    .then( function (data) {
        console.log(data);
    })
    .catch( function (err) {
        console.log(err);
    })
;
```

[npm-image]: https://badge.fury.io/js/svn-simple-log-parser.png
[npm-url]: http://badge.fury.io/js/svn-simple-log-parser
