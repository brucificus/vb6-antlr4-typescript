# vb6-antlr4

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=brucificus/vb6-antlr4-typescript)](https://dependabot.com)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/vb6-antlr4)
![npm latest release](https://img.shields.io/npm/v/vb6-antlr4/latest)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](./LICENSE.txt)
![Release](https://github.com/brucificus/vb6-antlr4-typescript/workflows/Release/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://github.com/Naereen/badges)

A Visual Basic 6 lexer & parser that provides both visitor and listener patterns to traverse the parse tree. The parser is based on grammar that has been test-driven and **successfully applied to large Visual Basic 6.0 projects.**

## Overview

This is a continuous-delivery focused synthesis of the [ProLeap Visual Basic 6.0 parser](https://github.com/uwol/proleap-vb6-parser)'s ANTLR4 grammar and the Optimized ANLTR TypeScript target provided by [antlr4ts](https://github.com/tunnelvisionlabs/antlr4ts).

- **Releases:** See the [GitHub Releases](https://github.com/brucificus/vb6-antlr4-typescript/releases) page for release notes and
  links to the distribution.
- **Feedback:**
  Got a feature request to make, or a bug to complain about? Depending on the nature of your feedback, it probably needs to go to one of three places:
  - 📐 For the _grammar_ (which includes the API "shape" of the generated lexer/parser), provide feedback at [ProLeap Visual Basic 6.0 parser's GitHub Issues](https://github.com/uwol/proleap-vb6-parser/issues).
  - 🔢 For the _code generated_ based on the grammar (or the runtime it depends on), provide feedback at [antlr4ts's GitHub Issues](https://github.com/tunnelvisionlabs/antlr4ts/issues).
  - 🚀 For the _deployment process_ (versioning, update cadence, documentation), provide feedback at our own [GitHub Issues](https://github.com/brucificus/vb6-antlr4-typescript).

  If in doubt, talk to us first so we can try to point you in the right direction.


## Features

- The grammar is line-based and takes into account whitespace, so that member calls (e.g. `A.B`) are distinguished from contextual object calls in WITH statements (e.g. `A .B`).
- Keywords can be used as identifiers depending on the context, enabling e.g. `A.Type`, but not `Type.B`.
- The ANTLR4 grammar is derived from the [Visual Basic 6.0 language reference](http://msdn.microsoft.com/en-us/library/aa338033%28v=vs.60%29.aspx) and tested against MSDN VB6 statement examples as well as several Visual Basic 6.0 code repositories.
- Rigorous test-driven development.

## Getting started

1. Install `vb6-antlr4` and `antlr4ts` as dependencies using your preferred package manager.

```bash
npm install vb6-antlr4 antlr4ts --save
```

```bash
yarn add vb6-antlr4 antlr4ts
```

2. Use your grammar in TypeScript (or JavaScript)

```typescript
import { VisualBasic6Lexer, VisualBasic6Parser } from "vb6-antlr4";
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";

// Create the lexer and parser
let inputStream = new ANTLRInputStream(`
Private Sub Command1_Click ()
   Text1.Text = "Hello, world!"
End Sub
`);
let lexer = new VisualBasic6Lexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new VisualBasic6Parser(tokenStream);

let tree = parser.startRule();
```

The two main ways to inspect the tree are by using a listener or a visitor, you can read about the differences between the two [here](https://github.com/antlr/antlr4/blob/master/doc/listeners.md).

###### Listener Approach

```typescript
// ...
import { VisualBasic6Listener, SubStmtContext } from "vb6-antlr4";
import { ParseTreeWalker } from "antlr4ts/tree";

class EnterSubListener implements VisualBasic6Listener {
  enterSubStmt(context: SubStmtContext) {
    console.log(`Sub start line number ${context._start.line}`);
    // ...
  }

  // other enterX functions...
}

// Create the listener
const listener: VisualBasic6Listener = new EnterSubListener();
// Use the entry point for listeners
ParseTreeWalker.DEFAULT.walk(listener, tree);
```

###### Visitor Approach

```typescript
// ...
import { VisualBasic6Visitor, SubStmtContext } from "vb6-antlr4";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

// Extend the AbstractParseTreeVisitor to get default visitor behaviour
class CountSubsVisitor
  extends AbstractParseTreeVisitor<number>
  implements VisualBasic6Visitor<number> {

  defaultResult() {
    return 0;
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitSubStmt(context: SubStmtContext): number {
    return 1 + super.visitChildren(context);
  }
}

// Create the visitor
const countSubsVisitor = new CountSubsVisitor();
// Use the visitor entry point
const count = countSubsVisitor.visit(tree);
console.log(`There are ${count} Subs`);
```
