import { File } from './infrastructure/File';
import { isClazzModule, isStandardModule, isForm } from './vbFileTypes';
import { IVbParseTestRunner, VbParseTestRunner } from './VbParseTestRunner';

function validateParseTrees(vb6InputFile: File): void {       
    const runner: IVbParseTestRunner = new VbParseTestRunner();
    runner.parseFile(vb6InputFile);
}

export default function scanAndValidateParseTrees(inputDirectory: File, exclusionFilter: (file: File) => boolean) {
    if (inputDirectory.isDirectory() && !exclusionFilter(inputDirectory)) {
        describe(inputDirectory.getName(), () => {
            // for each of the files in the directory
            inputDirectory.listFiles().forEach(inputDirectoryFile => {
                // if the file is a VB6 relevant file
                if (
                    inputDirectoryFile.isFile() 
                    && (isClazzModule(inputDirectoryFile)
                        || isStandardModule(inputDirectoryFile) 
                        || isForm(inputDirectoryFile))) {
                    validateParseTrees(inputDirectoryFile);
                }
                // else, if the file is a relevant directory
                else if (inputDirectoryFile.isDirectory()) {
                    const subInputDirectory: File = inputDirectoryFile;
                    const subInputDirectoryName: string = subInputDirectory.getName();

                    if ("."!==subInputDirectoryName && ".."!==subInputDirectoryName) {
                        scanAndValidateParseTrees(subInputDirectory, exclusionFilter);
                    }
                }
            });
        });
    }
}
