import { OperationUseCase } from '../../../src/useCases/operationUseCase.js';

describe('OperationUseCase', () => {
    it('should create an instance with the correct properties', () => {
        const operationUseCase = new OperationUseCase({ operation: 'buy', 'unit-cost': 10, quantity: 10000 }, { quantities: 0, weightedAverage: 0, losses: 0 });

        expect(operationUseCase.operation).toBe('buy');
        expect(operationUseCase.unitCost).toBe(10);
        expect(operationUseCase.quantity).toBe(10000);
        expect(operationUseCase.currentQuantity).toBe(0);
        expect(operationUseCase.currentWeightedAverage).toBe(0);
        expect(operationUseCase.losses).toBe(0);
    });

    it('should operate buy correctly', () => {
        const operationUseCase = new OperationUseCase({ operation: 'buy', 'unit-cost': 10, quantity: 10000 }, { quantities: 0, weightedAverage: 0, losses: 0 });

        expect(operationUseCase.run()).toEqual({
            tax: 0,
            currentQuantity: 10000,
            currentWeightedAverage: 10,
            losses: 0
        });
    });

    it('should operate sell correctly', () => {
        const operationUseCase = new OperationUseCase({ operation: 'sell', 'unit-cost': 20, quantity: 5000 }, { quantities: 10000, weightedAverage: 10, losses: 0 });

        expect(operationUseCase.run()).toEqual({
            tax: 10000,
            currentQuantity: 5000,
            currentWeightedAverage: 10,
            losses: 0
        });
    });

    it('should operate sell with low values', () => {
        const operationUseCase = new OperationUseCase({ operation: 'sell', 'unit-cost': 10, quantity: 5 }, { quantities: 5, weightedAverage: 10, losses: 0 });

        expect(operationUseCase.run()).toEqual({
            tax: 0,
            currentQuantity: 0,
            currentWeightedAverage: 10,
            losses: 0
        });
    });

    it('should operate sell with losses', () => {
        const operationUseCase = new OperationUseCase({ operation: 'sell', 'unit-cost': 20, quantity: 5000 }, { quantities: 10000, weightedAverage: 30, losses: 0 });

        expect(operationUseCase.run()).toEqual({
            tax: 0,
            currentQuantity: 5000,
            currentWeightedAverage: 30,
            losses: -50000
        });
    });
});
