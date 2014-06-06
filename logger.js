/**
 * Temporary wrapper for LOG
 *
 * To be replaced with logger module
 */

function info (msg) {
    console.log(msg);
}

function line() {
    console.log('----------------------------------------------------------');
}

exports.info = info;
exports.line = line;