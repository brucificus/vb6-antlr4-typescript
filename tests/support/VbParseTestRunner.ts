/**
 * VB6 parse runner for Jest tests.
 */

import { createLogger, ILogger } from './infrastructure/Logger';
import { File } from './infrastructure/File';
import { readFileSync } from 'fs';
const readFileToString = (path: string): string => readFileSync(path, {encoding: 'utf8'});
import { StartRuleContext, VisualBasic6Parser, VisualBasic6Lexer } from '../../index';
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { cleanFileTree } from './cleanFileTree';
import { IVbParserParams, VbParserParams } from './VbParserParams';
import { ThrowingErrorListener } from './ThrowingErrorListener';
import { isClazzModule, isStandardModule, isForm } from './vbFileTypes'

export interface IVbParseTestRunner  {
    parseFile(inputFile: File): void;
}

const LOG: ILogger = createLogger(__filename);

const TREE_SUFFIX: string = ".tree";

export class VbParseTestRunner 
    implements IVbParseTestRunner {

	protected createDefaultParams(): IVbParserParams {
		return new VbParserParams();
	}

	protected doCompareParseTree(treeFile: File, startRule: StartRuleContext, parser: VisualBasic6Parser): void {
		const treeFileData: string = readFileToString(treeFile.getAbsolutePath());

		if (treeFileData && treeFileData.length) {
			LOG.info(`Comparing parse tree with file ${treeFile.getName()}.`);

            it(treeFile.getName(), () => {
                const inputFileTree: string = startRule.toStringTree(parser);
                const cleanedInputFileTree: string = cleanFileTree(inputFileTree);
                const cleanedTreeFileData: string = cleanFileTree(treeFileData);
                
                expect(cleanedInputFileTree).toBe(cleanedTreeFileData);
            });
		} else {
			LOG.info(`Ignoring empty parse tree file ${treeFile.getName()}.`);
		}
	}

	protected doParse(inputFile: File, params: IVbParserParams): void {
		LOG.info(`Parsing file ${inputFile.getName()}.`);

        const lexer: VisualBasic6Lexer = new VisualBasic6Lexer(new ANTLRInputStream(readFileToString(inputFile.getAbsolutePath())));

		if (!params.getIgnoreSyntaxErrors()) {
			lexer.removeErrorListeners();
			lexer.addErrorListener(new ThrowingErrorListener());
		}

		const tokens: CommonTokenStream = new CommonTokenStream(lexer);
		const parser: VisualBasic6Parser = new VisualBasic6Parser(tokens);

		if (!params.getIgnoreSyntaxErrors()) {
			parser.removeErrorListeners();
			parser.addErrorListener(new ThrowingErrorListener());
		}

		const startRule: StartRuleContext = parser.startRule();
		const treeFile: File = new File(inputFile.getAbsolutePath() + TREE_SUFFIX);

		if (treeFile.exists()) {
			this.doCompareParseTree(treeFile, startRule, parser);
		}
	}

    parseFile(inputFile: File): void {
		if (!isClazzModule(inputFile) && !isStandardModule(inputFile) && !isForm(inputFile)) {
			LOG.info(`Ignoring file ${inputFile.getName()}.`);
		} else {
			this.doParse(inputFile, this.createDefaultParams());
		}
    }
}
