/**
 * To be removed, as soon as the grammar does not require NEWLINEs and WS
 * anymore
 */
export function cleanFileTree(input: string): string {
    let result = input.trim();
    result = result.replace(/\\t/gm, " ");
    result = result.replace(/(\s+((\\r)?(\\n)|(\\r))?)+/gm, " ");
    result = result.replace(/(\s+(\r?\n|\r)?)+/gm, " ");
    result = result.replace(/(\s+\))+/gm, ")");
    return result;
}
