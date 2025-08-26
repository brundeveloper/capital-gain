import { OperationController } from "./operation.js";

export class AppController {
    #data = '';
    #output = '';

    constructor(input) {
        if (!input) {
            throw new Error('Input parameter is required');
        }

        this.data = input;
    }

    get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = value;
    }

    get output() {
        return this.#output;
    }
    set output(value) {
        this.#output = JSON.stringify(value);
    }

    run() {
        const operations = new OperationController(this.data);

        const output = operations.run();

        this.output = output;

        return this.output;
    }
}
