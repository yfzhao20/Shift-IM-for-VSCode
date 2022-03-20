"use strict";

const vscode = require('vscode');
const hscopes = vscode.extensions.getExtension('draivin.hscopes');

function getScope(document, position) {
    if (!hscopes || !document || !position) {
        console.log(`function "getScope" causes error.`)
        return undefined
    }
    else {
        return hscopes.exports.getScopeAt(document, position).scopes;
    }
}

module.exports = {
    getScope,
}