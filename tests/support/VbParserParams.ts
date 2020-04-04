export interface IVbParserParams {
    getIgnoreSyntaxErrors(): boolean;
}

export class VbParserParams implements IVbParserParams {
    getIgnoreSyntaxErrors(): boolean {
        return false;
    }
}
