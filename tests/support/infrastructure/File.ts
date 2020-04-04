import * as path from 'path';
import * as fs from 'fs';

export class File {
    private _path: string;
    
    constructor(value: string, ...additionalPathPieces: string[]) {
        if (additionalPathPieces && additionalPathPieces.length) {
            this._path = path.resolve(process.cwd(), value, ...additionalPathPieces);
        } else {
            this._path = path.resolve(process.cwd(), value);
        }
    }

    getName(): string {
        return path.basename(this._path);
    }

    getAbsolutePath(): string {
        return path.resolve(this._path);
    }

    exists(): boolean {
        return fs.existsSync(this._path);
    }

    removeExtension(): string {
        return path.basename(this._path, path.extname(this._path));
    }

    equals(other: File): boolean {
        return this.getAbsolutePath() === other.getAbsolutePath();
    }

    isDirectory(): boolean {
        return fs.statSync(this._path).isDirectory();
    }

    isFile(): boolean {
        return fs.statSync(this._path).isFile();
    }

    listFiles(): File[] {
        return fs.readdirSync(this._path).map(e => new File(this._path, e))
    }

    getParent(): string {
        return path.dirname(this._path);
    }
}
