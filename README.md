# AMXX Pawn Compiler

A Visual Studio Code extension that adds a compile button for AMXX Pawn (.sma) files. This extension makes it easy to compile your AMXX Pawn scripts directly from VS Code.

## Features

- Adds a compile button to the editor title bar when editing .sma files
- Automatically detects amxxpc.exe in your workspace
- Configurable compiler path
- Shows compilation output in the integrated terminal
- Displays success/error messages

## Requirements

- Visual Studio Code 1.55.0 or newer
- AMXX Compiler (amxxpc.exe)

## Extension Settings

This extension contributes the following settings:

* `amxxPawnCompiler.compilerPath`: Path to the AMXX compiler (amxxpc.exe). If not set, the extension will look for amxxpc.exe in your workspace root directory.

## Usage

1. Open a .sma file in VS Code
2. Click the compile button in the editor title bar (or use the command palette and search for "AMXX: Compile Pawn File")
3. If the compiler is not found in the workspace, set its path in the extension settings

## Known Issues

- None at this time

## Release Notes

### 0.1.0

Initial release of AMXX Pawn Compiler extension:
- Basic compilation support
- Compiler path configuration
- Compilation status messages
- Output channel for compiler messages
