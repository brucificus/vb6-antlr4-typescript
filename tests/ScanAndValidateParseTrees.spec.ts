import { File } from './support/infrastructure/File';
import scanAndValidateParseTrees from './support/scanAndValidateParseTrees';

const INPUT_DIRECTORY: File = new File(__dirname, "../proleap-vb6/src/test/resources");
const DIRECTORIES_EXCLUDED: File[] = [ new File(INPUT_DIRECTORY.getAbsolutePath(), "io/proleap/vb6/asg") ];

scanAndValidateParseTrees(INPUT_DIRECTORY, (directory) => Boolean(DIRECTORIES_EXCLUDED.find(d => d.equals(directory))));
