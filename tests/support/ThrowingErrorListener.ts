import { VbParserError } from './VbParserError';
import { ANTLRErrorListener, Recognizer, RecognitionException } from "antlr4ts";

export class ThrowingErrorListener<TSymbol> implements ANTLRErrorListener<TSymbol> {
    syntaxError<T extends TSymbol>(recognizer: Recognizer<T, any>, offendingSymbol: T | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined): void {
        throw new VbParserError("syntax error in line " + line + ":" + charPositionInLine + " " + msg);
    }
}
