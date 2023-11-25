const vscode = require('vscode');

module.exports.macroCommands = {
   MarkdownDoubleSpaceNewLineMacro: {
      no: 1,
      func: funcMarkdownDoubleSpaceNewLineMacro
   },
};

/// Markdown peculiarity is that one Newline is ignored and replaced with space.
/// For new paragraph there must be double newline.
/// But I like ti use soft-newline or <br>. For that is a strange dobulespace plus newline.
/// The problem is that it is easy to forget and impossible to see, because space is invisible.
/// This macro will open replace in all .md files and with regex find and replace when I forget it.
function funcMarkdownDoubleSpaceNewLineMacro() {
   // https://code.visualstudio.com/api/references/commands
   vscode.commands.executeCommand('workbench.action.findInFiles',{
      query: "([\\.?!])(\\n[^\\n])",
      replace: "$1  $2",
      filesToInclude:"*.md",
      isRegex: true,
      triggerSearch: true,
      matchWholeWord: false,
      isCaseSensitive: false,
  });
}

