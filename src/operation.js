import { OperationUseCase } from "./useCases/operationUseCase.js";

export class OperationController {
    #operations = [];
    #taxes = [];
    #quantities = 0;
    #weightedAverage = 0;
    #losses = 0;

    constructor(operations) {
        JSON.parse(operations).forEach(operation => {
            this.#operations.push(operation);
        });
    }

    get operations() {
        return this.#operations;
    }

    get taxes() {
        return this.#taxes;
    }

    get quantities() {
        return this.#quantities;
    }
    set quantities(value) {
        this.#quantities = value;
    }

    get weightedAverage() {
        return this.#weightedAverage;
    }
    set weightedAverage(value) {
        this.#weightedAverage = value;
    }

    get losses() {
        return this.#losses;
    }
    set losses(value) {
        this.#losses = value;
    }

    run() {
        this.operations.forEach(operation => {
            const operationUseCase = new OperationUseCase(operation, { quantities: this.quantities, weightedAverage: this.weightedAverage, losses: this.losses });

            const { tax, currentQuantity, currentWeightedAverage, losses } = operationUseCase.run();

            this.quantities = currentQuantity;
            this.weightedAverage = currentWeightedAverage;
            this.losses = losses

            this.#taxes.push({
                tax: tax
            });
        });

        return this.taxes;
    }
}
