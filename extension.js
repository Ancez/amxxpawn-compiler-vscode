const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('amxx-pawn-compiler.compile', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const document = editor.document;
        if (path.extname(document.fileName) !== '.sma') {
            vscode.window.showErrorMessage('Not an AMXX Pawn source file (.sma)');
            return;
        }

        // Save the file before compiling
        await document.save();

        // Get compiler path from settings or look in workspace
        let compilerPath = vscode.workspace.getConfiguration('amxxPawnCompiler').get('compilerPath');
        
        if (!compilerPath) {
            // Look for amxxpc.exe in the workspace
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const possiblePath = path.join(workspaceFolders[0].uri.fsPath, 'amxxpc.exe');
                if (fs.existsSync(possiblePath)) {
                    compilerPath = possiblePath;
                }
            }
        }

        if (!compilerPath || !fs.existsSync(compilerPath)) {
            vscode.window.showErrorMessage('AMXX compiler (amxxpc.exe) not found. Please set the path in settings or place it in your workspace root.');
            return;
        }

        // Create output channel if it doesn't exist
        let outputChannel = vscode.window.createOutputChannel('AMXX Compiler');
        outputChannel.show();

        // Get the directory of the current file
        const fileDir = path.dirname(document.fileName);
        
        // Run the compiler
        const cmd = `"${compilerPath}" "${document.fileName}"`;
        
        exec(cmd, { cwd: fileDir }, (error, stdout, stderr) => {
            if (error) {
                outputChannel.appendLine('Compilation failed:');
                outputChannel.appendLine(error.message);
                if (stderr) outputChannel.appendLine(stderr);
                vscode.window.showErrorMessage('AMXX compilation failed. Check output for details.');
                return;
            }

            outputChannel.appendLine('Compilation output:');
            if (stdout) outputChannel.appendLine(stdout);
            if (stderr) outputChannel.appendLine(stderr);
            
            // Check if compilation was successful by looking for the .amxx file
            const amxxFile = document.fileName.replace('.sma', '.amxx');
            if (fs.existsSync(amxxFile)) {
                vscode.window.showInformationMessage('AMXX compilation successful!');
            } else {
                vscode.window.showErrorMessage('AMXX compilation failed. Check output for details.');
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
