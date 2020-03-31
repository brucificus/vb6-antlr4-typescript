# TEMPLATE-antlr4

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=foxguardsolutions/Foundation)](https://dependabot.com)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/TEMPLATE-antlr4)
![npm latest release](https://img.shields.io/npm/v/TEMPLATE-antlr4/latest)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](./LICENSE.txt)
![Release](https://github.com/brucificus/TEMPLATE-antlr4-typescript/workflows/Release/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://github.com/Naereen/badges)

A TEMPLATE lexer & parser that provides both visitor and listener patterns to traverse the parse tree.

## Overview

This is a continuous-delivery focused synthesis of the [ANTLR4 TEMPLATE grammar](https://github.com/antlr/grammars-v4/tree/master/TEMPLATE) and the Optimized ANLTR TypeScript target provided by [antlr4ts](https://github.com/tunnelvisionlabs/antlr4ts).

- **Releases:** See the [GitHub Releases](https://github.com/brucificus/TEMPLATE-antlr4-typescript/releases) page for release notes and
  links to the distribution.
- **Feedback:**
  Got a feature request to make, or a bug to complain about? Depending on the nature of your feedback, it probably needs to go to one of three places:
  - 📐 For the _grammar_ (which includes the API "shape" of the generated lexer/parser), provide feedback at [the ANTLR4 grammar's GitHub Issues](https://github.com/antlr/grammars-v4/issues).
  - 🔢 For the _code generated_ based on the grammar (or the runtime it depends on), provide feedback at [antlr4ts's GitHub Issues](https://github.com/tunnelvisionlabs/antlr4ts/issues).
  - 🚀 For the _deployment process_ (versioning, update cadence, documentation), provide feedback at our own [GitHub Issues](https://github.com/brucificus/TEMPLATE-antlr4-typescript).

  If in doubt, talk to us first so we can try to point you in the right direction.

## Getting started

1. Install `TEMPLATE-antlr4` and `antlr4ts` as dependencies using your preferred package manager.

```bash
npm install TEMPLATE-antlr4 antlr4ts --save
```

```bash
yarn add TEMPLATE-antlr4 antlr4ts
```

2. Use your grammar in TypeScript (or JavaScript)

```typescript
import { TEMPLATELexer, TEMPLATEParser } from "TEMPLATE-antlr4";
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";

let inputStream = new ANTLRInputStream("<strong>Hello there, <i>world</i>!</strong>");

let lexer = new TEMPLATELexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new TEMPLATEParser(tokenStream);

let tree = parser.TEMPLATEDocument();
```

The two main ways to inspect the tree are by using a listener or a visitor, you can read about the differences between the two [here](https://github.com/antlr/antlr4/blob/master/doc/listeners.md).

###### Listener Approach

```typescript
// ...
import { TEMPLATEParserListener, TEMPLATEElementContext } from "TEMPLATE-antlr4";
import { ParseTreeWalker } from "antlr4ts/tree";

class EnterTEMPLATEElementListener implements TEMPLATEParserListener {
  enterTEMPLATEElement(context: TEMPLATEElementContext) {
    console.log(`Element start line number ${context._start.line}`);
    // ...
  }

  // other enterX functions...
}

// Create the listener
const listener: TEMPLATEParserListener = new EnterTEMPLATEElementListener();
// Use the entry point for listeners
ParseTreeWalker.DEFAULT.walk(listener, tree);
```

###### Visitor Approach

```typescript
// ...
import { TEMPLATEParserVisitor, TEMPLATEElementContext } from "TEMPLATE-antlr4";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

// Extend the AbstractParseTreeVisitor to get default visitor behaviour
class CountElementsVisitor
  extends AbstractParseTreeVisitor<number>
  implements TEMPLATEParserVisitor<number> {

  defaultResult() {
    return 0;
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitTEMPLATEElement(context: TEMPLATEElementContext): number {
    return 1 + super.visitChildren(context);
  }
}

// Create the visitor
const countElementsVisitor = new CountElementsVisitor();
// Use the visitor entry point
const count = countElementsVisitor.visit(tree);
console.log(`There are ${count} elements`);
```
