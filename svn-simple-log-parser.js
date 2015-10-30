var exec = require('child_process').exec;
var _ = require('underscore');

var defaults = {
    verbose: true,
    repoUrl: '',
    numberOfRevisions: 30,
    onParsed: function() {}
};

function LogParser(params) {
    var that = this;

    this.options = _.extend(defaults, params);

    exec(
        _buildCommand(this.options),
        function (error, stdout, stderr) {
            var revisions = that.getRevisions(stdout);

            that.options.onParsed(revisions);
        }
    );
}

LogParser.prototype.getRevisions = function (stream) {
    var revisions = stream
        .replace(/-+[\r\n]/g,'~!!')
        .replace(/Changed paths:\n/g, '')
        .split(/~!!/)
    ;

    // Remove empty values.
    revisions = _.compact(revisions);

    // Get clean object for every revision.
    revisions = _.map(revisions, this.getRevision);

    return revisions;
};

LogParser.prototype.getRevision = function (revision) {
    var lines = _.compact(revision.split(/\n+/));

    // Commit message.
    var message = lines.pop();

    // Extract footer information.
    var footer = lines
        .shift()
        .replace(/\s+[0-9]+\s+line[s]*\s*\n/,'')
        .replace(/[\n]/,'')
        .split('|')
    ;

    // Get changes for files and trim whitespace.
    var files = _.map(lines, function (file) {
        return file.trim();
    });

    return {
        message: message,
        files: files,
        revisionId: footer[0].trim(),
        user: footer[1].trim(),
        date: footer[2].trim()
    };
};


function _buildCommand(options) {
    var commandString = 'svn log ';

    if (options.verbose) {
        commandString += '-v ';
    }

    if (options.repoUrl) {
        commandString += options.repoUrl + ' ';
    }

    if (options.numberOfRevisions) {
        commandString += '-l ' + options.numberOfRevisions;
    }

    return commandString;
}

module.exports = LogParser;
