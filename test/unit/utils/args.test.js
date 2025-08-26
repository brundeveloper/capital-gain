import { expect, jest } from '@jest/globals';

jest.unstable_mockModule('fs', () => ({
    existsSync: jest.fn(),
    statSync: jest.fn(),
    readFileSync: jest.fn()
}));

const { ArgsController } = await import("../../../src/utils/args.js");
const { existsSync, statSync, readFileSync } = await import('fs');

describe('Parameter', () => {
    const param = '[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":5000}][{\"operation\":\"buy\",\"unit-cost\":20,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":10,\"quantity\":5000}]';

    it('should return the parameter passed to the ArgsController converted to array', () => {
        const argsController = new ArgsController(param);
        
        expect(argsController.args).toEqual([
            '[{"operation":"buy","unit-cost":10,"quantity":10000},{"operation":"sell","unit-cost":20,"quantity":5000}]',
            '[{"operation":"buy","unit-cost":20,"quantity":10000},{"operation":"sell","unit-cost":10,"quantity":5000}]'
        ]);
    });

    it('should return the parameter passed to the ArgsController converted to array with just one JSON', () => {
        const argsController = new ArgsController('[{\"operation\":\"buy\",\"unit-cost\":10,\"quantity\":10000},{\"operation\":\"sell\",\"unit-cost\":20,\"quantity\":5000}]');
        
        expect(argsController.args).toEqual([
            '[{"operation":"buy","unit-cost":10,"quantity":10000},{"operation":"sell","unit-cost":20,"quantity":5000}]'
        ]);
    });
    
    it('should throw an error if no parameter is passed', () => {
        expect(() => {
            new ArgsController()
        }).toThrow('Parameter is required');
    });

    it('should throw an error if the parameter is an empty string', () => {
        expect(() => {
            new ArgsController('')
        }).toThrow('Parameter is required');
    });

    it('should throw an error if the parameter is not a valid JSON', () => {
        expect(() => {
            new ArgsController('string')
        }).toThrow('Input parameter is not a valid JSON');
    });
});

describe('File Parameter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should read the file and return its content as a string', () => {
        existsSync.mockReturnValue(true);
        statSync.mockReturnValue({ isFile: () => true });
        readFileSync.mockReturnValue('[{"operation":"buy","unit-cost":10,"quantity":100}]');
        
        const argsController = new ArgsController('./data/input.json');
        
        expect(argsController.args).toEqual([
            '[{"operation":"buy","unit-cost":10,"quantity":100}]'
        ]);
    });

    it('should return error when validate whether the path is a file', () => {
        existsSync.mockImplementation(() => {
            throw new Error('');
        });

        expect(() => {
            new ArgsController('./data/input.json');
        }).toThrow('Input parameter is not a valid JSON');
    });

    it('should return error when there is an issue reading the file', () => {
        existsSync.mockReturnValue(true);
        statSync.mockReturnValue({ isFile: () => true });
        readFileSync.mockImplementation(() => {
            throw new Error('Could not read file');
        });

        expect(() => {
            new ArgsController('./data/input.json');
        }).toThrow('Could not read file: Could not read file');
    });
});
