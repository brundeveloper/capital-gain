#!/usr/bin/env node
import { Command } from 'commander';
import { ArgsController } from './utils/args.js';
import { AppController } from './app.js';

const program = new Command();

program
    .name('capitalgain')
    .description('CLI tool for calculating capital gains')
    .version('1.0.0')
    .argument('<input>', 'JSON string or file path containing operations')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --format <type>', 'output format', 'json')
    .action((input, options) => {
        try {
            const args = new ArgsController(input);

            const results = [];

            args.args.forEach(arg => {
                const app = new AppController(arg);
                const result = app.run();
                results.push(result);
            });

            if (options.verbose) {
                console.log('Processing completed successfully');
                console.log('Number of operation sets:', results.length);
            }

            results.forEach(result => {
                console.log(result);
            });
        } catch (error) {
            console.error('Error:', error.message);
            process.exit(1);
        }
    });

program.parse();
