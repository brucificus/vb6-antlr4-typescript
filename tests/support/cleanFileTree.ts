/**
 * To be removed, as soon as the grammar does not require NEWLINEs and WS
 * anymore
 */
export function cleanFileTree(input: string): string {
    const inputNoEscapedNewline: string = input.replace(/\\r/g, "").replace(/\\n/g, "").replace(/\\t/g, "");;
    const inputNoNewline: string = inputNoEscapedNewline.replace(/\r?\n|\r/g, "");
    const inputReducedWhitespace: string = inputNoNewline.replace(/[\s]+/g, " ").replace(/[\s]+\)/, ")");
    return inputReducedWhitespace;
}
