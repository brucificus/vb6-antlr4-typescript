import { File } from './infrastructure/File';
import { extname as getFileExtension } from 'path';

export function isClazzModule(inputFile: File): boolean {
    const extension: string = getFileExtension(inputFile.getName()).toLowerCase();
    return ".cls" === extension;
}

export function isStandardModule(inputFile: File): boolean {
    const extension: string = getFileExtension(inputFile.getName()).toLowerCase();
    return ".bas" === extension;
}

export function isForm(inputFile: File): boolean {
    const extension: string = getFileExtension(inputFile.getName()).toLowerCase();
    return ".frm" === extension;
}
