export interface ILogger {
    info(message: string): void;
}

export class ConsoleLogger implements ILogger {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    info(message: string): void {
        console.log(`${this._name}: ${message}`);
    }
}

export class NullLogger implements ILogger {
    constructor(name: string) {
    }

    info(message: string): void {
    }
}

export function createLogger(name: string): ILogger {
    return new NullLogger(name);
}
