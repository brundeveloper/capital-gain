export class OperationUseCase {
    #operation;
    #unitCost;
    #quantity;
    #tax = 0.0;
    #currentQuantity;
    #currentWeightedAverage;
    #losses = 0;
    
    constructor(operation, current) {
        this.operation = operation['operation'];
        this.unitCost = operation['unit-cost'];
        this.quantity = operation['quantity'];
        this.currentQuantity = current.quantities;
        this.currentWeightedAverage = current.weightedAverage;
        this.losses = current.losses;
    }

    get operation() {
        return this.#operation;
    }
    set operation(value) {
        this.#operation = value;
    }

    get unitCost() {
        return this.#unitCost;
    }
    set unitCost(value) {
        this.#unitCost = value;
    }

    get quantity() {
        return this.#quantity;
    }
    set quantity(value) {
        this.#quantity = value;
    }

    get currentQuantity() {
        return this.#currentQuantity;
    }
    set currentQuantity(value) {
        this.#currentQuantity = value;
    }

    get currentWeightedAverage() {
        return this.#currentWeightedAverage;
    }
    set currentWeightedAverage(value) {
        this.#currentWeightedAverage = value;
    }

    get tax() {
        return this.#tax;
    }
    set tax(value) {
        this.#tax = value;
    }

    get losses() {
        return this.#losses;
    }
    set losses(value) {
        this.#losses = value;
    }

    buy() {
        this.tax = 0.0;
        this.currentWeightedAverage = ((this.currentQuantity * this.currentWeightedAverage) + (this.quantity * this.unitCost)) / (this.currentQuantity + this.quantity);
        this.currentQuantity += this.quantity;
    }

    sell() {
        this.tax = 0.0;
        this.currentQuantity -= this.quantity;

        const gain = (this.unitCost * this.quantity) - (this.currentWeightedAverage * this.quantity);

        if (this.unitCost * this.quantity <= 20000){
            if (this.losses === 0){
                this.losses += gain;
            }
            
            return;
        }

        if ((this.unitCost > this.currentWeightedAverage) && (this.losses + gain > 0)){
            this.tax = (gain + this.losses) * 0.2;
            this.losses = 0;
        }
        else {
            this.losses += gain;
        }
    }

    run() {
        if (this.operation === 'buy') {
            this.buy();
        }
        if (this.operation === 'sell') {
            this.sell();
        }

        return {
            tax: this.tax,
            currentQuantity: this.currentQuantity,
            currentWeightedAverage: this.currentWeightedAverage,
            losses: this.losses
        };
    }
}
