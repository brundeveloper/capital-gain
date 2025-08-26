import { AppController } from '../../src/app.js';

describe('AppController', () => {
    const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":5000}]');

    it('should return the output', () => {
        expect(app.run()).toBe('[{"tax":0},{"tax":10000}]');
    });

    it('should throw an error if no input is provided', () => {
        expect(() => {
            new AppController();
        }).toThrow('Input parameter is required');
    });
});

describe('UseCases', () => {
    it('Caso #1', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":100},{\"operation\":\"sell\",\"unit-cost\":15,\"quantity\":50},{\"operation\":\"sell\",\"unit-cost\":15,\"quantity\":50}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0}]');
    });

    it('Caso #2', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":5,\"quantity\":5000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":10000},{"tax":0}]');
    });

    it('Caso #3', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":5,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":3000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":1000}]');
    });

    it('Caso #4', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"buy\",\"unit-cost\":25,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":15,\"quantity\":10000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0}]');
    });

    it('Caso #5', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"buy\",\"unit-cost\":25,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":15,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":25,\"quantity\":5000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0},{"tax":10000}]');
    });

    it('Caso #6', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":2,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":2000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":2000},{\"operation\":\"sell\",\"unit-cost\":25,\"quantity\":1000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000}]');
    });

    it('Caso #7', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":2,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":2000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":2000},{\"operation\":\"sell\",\"unit-cost\":25,\"quantity\":1000},{\"operation\":\"buy\",\"unit-cost\":20,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":15,\"quantity\":5000},{\"operation\":\"sell\",\"unit-cost\":30,\"quantity\":4350},{\"operation\":\"sell\",\"unit-cost\":30,\"quantity\":650}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000},{"tax":0},{"tax":0},{"tax":3700},{"tax":0}]');
    });

    it('Caso #8', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":50,\"quantity\":10000},{\"operation\":\"buy\",\"unit-cost\":20,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":50,\"quantity\":10000}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":80000},{"tax":0},{"tax":60000}]');
    });

    it('Caso #8', () => {
        const app = new AppController('[{\"operation\":\"buy\",\"unit-cost\":5000,\"quantity\":10},{\"operation\":\"sell\",\"unit-cost\":4000,\"quantity\":5},{\"operation\":\"buy\",\"unit-cost\":15000,\"quantity\":5},{\"operation\":\"buy\",\"unit-cost\":4000,\"quantity\":2},{\"operation\":\"buy\",\"unit-cost\":23000,\"quantity\":2},{\"operation\":\"sell\",\"unit-cost\":20000,\"quantity\":1},{\"operation\":\"sell\",\"unit-cost\":12000,\"quantity\":10},{\"operation\":\"sell\",\"unit-cost\":15000,\"quantity\":3}]');

        expect(app.run()).toBe('[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":1000},{"tax":2400}]');
    });
});
