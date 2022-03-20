"use strict";

const vscode = require('vscode')
const hscopes = require('./hscopes')
const ffi = require('ffi-napi');

let currentInMath = false
let previousInMath = false

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    vscode.window.onDidChangeTextEditorSelection((e) =>
        toggleImeCondition(e.textEditor.document, e.selections[0].active)
    )
}

// win32api ////////////////////////////////////////////////

// Import user32
const user32 = new ffi.Library("user32", {
    "SendMessageW":       ['bool', ['long', 'int32', 'int32', 'int32']],
    "GetForegroundWindow":["int32",[]]
  });
  
const imm = new ffi.Library("imm32" ,{
    "ImmGetDefaultIMEWnd": ["int32" , ["int32"]]
});

function setIMEConversionMode(mode){
    var hwnd = user32.GetForegroundWindow()
    var defaultIMEWnd = imm.ImmGetDefaultIMEWnd(hwnd)
    user32.SendMessageW(defaultIMEWnd,0x283,0x002,mode);
}

// main /////////////////////////////////////////////////////

function toggleImeCondition(document, position) {
    // Get scope
    const scope = hscopes.getScope(document, position);
    if (!scope)  
        return;
    const scopeText = hscopes.getScope(document, position).toString();

    // If ( scope not change ) return;
    currentInMath = (scopeText.indexOf("math") !== -1);
    if (currentInMath === previousInMath)  
        return;
    // Else: 
    // in math environment => to EN ; Else => to CN
    setIMEConversionMode(currentInMath ? 0 : 1025)
    previousInMath = currentInMath;
}

module.exports = {
    activate
}