const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	require('./shiftIME').activate(context);
}

function deactivate() { }

module.exports = {
	activate,	
	deactivate
}