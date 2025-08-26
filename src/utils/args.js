import { existsSync, statSync, readFileSync } from 'fs';

export class ArgsController {
    #args = [];
    
    constructor(args) {
        if (!args) {
            throw new Error('Parameter is required');
        }

        const content = !this.isFilePath(args) ? args : this.readFile(args);

        content.split('][').forEach(arg => {
            arg = arg.replace('[', '').replace(']', '');

            arg = '[' + arg + ']';

            if (!this.isValidJSON(arg)) {
                throw new Error('Input parameter is not a valid JSON');
            }

            this.#args.push(arg);
        });
    }

    get args() {
        return this.#args;
    }

    isFilePath(str) {
        try {
            return existsSync(str) && statSync(str).isFile();
        } catch (error) {
            return false;
        }
    }

    readFile(file) {
        try {
            return readFileSync(file, 'utf8');
        } catch (error) {
            throw new Error(`Could not read file: ${error.message}`);
        }
    }

    isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}