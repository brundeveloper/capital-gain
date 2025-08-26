import { OperationController } from '../../src/operation.js';

const input = '[{"operation":"buy","unit-cost":10,"quantity":10000},{"operation":"sell","unit-cost":20,"quantity":5000}]';
const operationController = new OperationController(input);

describe('OperationController', () => {
    it('should convert JSON input to array property', () => {        
        expect(operationController.operations).toEqual([
            { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
            { operation: 'sell', 'unit-cost': 20, quantity: 5000 }
        ]);
    });

    it('should return taxes', () => {
        expect(operationController.run()).toEqual([{ tax: 0.0 },{ tax: 10000.0 }]);
    });
});
