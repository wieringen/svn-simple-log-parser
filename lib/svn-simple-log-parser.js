var _ = require('underscore');
var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);

/**
 * @class LogParser
 * @constructor
 * @param {Object} [params]
     @param {String} [params.repoUrl=''] repo url
     @param {String} [params.user=false] username for repo
     @param {String} [params.password=false] password for repo
 */
function LogParser (params) {
    var defaults = {
        repoUrl: '',
        user: false,
        password: false
    };

    this.options = _.extend(defaults, params);
}

/**
 * Get the SVN log based on the given query and transforn it to JSON.
 *
 * @method parse
 * @param {Object} [query]
     @param {Boolean} [query.verbose=false]
     @param {Number}  [query.limit]
     @param {Number}  [query.from]
     @param {Number}  [query.to]
     @param {Number}  [query.revision]
     @param {String}  [query.path]
 * @param {function} [callback]
 */
LogParser.prototype.parse = function (query, callback) {
    var that = this;
    var command = _buildCommand(this.options, query);

    return exec(command)
        .then(function (stream) {
            var revisions = that.getRevisions(stream);

            if (callback) {
                callback(revisions);
            }

            return revisions;
        } )
    ;
};

/**
 * Change log stream in a array of revisions.
 *
 * @method getRevisions
 * @param {String} [stream]
 */
LogParser.prototype.getRevisions = function (stream) {
    var revisions = stream
        .replace(/-+[\r\n]/g,'~!!')
        .replace(/Changed paths:\n/g, '')
        .split(/~!!/)
    ;

    // Remove empty values.
    revisions = _.compact(revisions);

    // Get clean object for every revision.
    revisions = _.map(revisions, this.getRevision.bind(this));

    return revisions;
};

/**
 * Change revision stream in a revision object.
 *
 * @method getRevision
 * @param {String} [stream]
 */
LogParser.prototype.getRevision = function (stream) {
    var lines = stream.split(/\n/);

    lines = _.map(lines, function (line) {
        return line.trim();
    });

    // Extract header information.
    var header = lines
        .shift()
        .replace(/\s+[0-9]+\s+line[s]*\s*\n/,'')
        .replace(/[\n]/,'')
        .split('|')
    ;

    // Split files and message.
    var files = lines.splice(0, _.indexOf(lines, ''));

    // Concat message lines aray into a string.
    var message = lines.join('\n');

    var revision = {
        message: message,
        revisionId: header[0].trim(),
        user: header[1].trim(),
        date: header[2].trim()
    };

    if (this.options.verbose) {
        revision.files = files;
    }

    return revision;
};

/**
 * @method _buildCommand
 * @private
 */
function _buildCommand (options, query) {
    var commandString = 'svn log ';

    if (query.verbose) {
        commandString += '-v ';
    }

    if (options.repoUrl) {
        commandString += options.repoUrl + (query.path || '') + ' ';
    }

    if (query.revision) {
        commandString += '-r' + query.revision;

    } else if (query.from || query.to) {
        commandString += '-r' + (query.from || 'HEAD');

        commandString += ':' + (query.to || 1);
    }

    if (query.limit) {
        commandString += '-l ' + query.limit;
    }

    return commandString;
}

module.exports = LogParser;
