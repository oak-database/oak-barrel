import Barrel from '../../.dist/barrel';
import testCases from '../buffer-test-cases';
import { assert } from 'chai';

describe('#getFirstBarrels', () => {

    for (let i = 0; i <= testCases.length; i++) {
        it (`should get the first ${i} barrels`, () => {
            let buffer = Buffer.from(testCases.map(testCase => testCase.barrel).join(''), 'hex');
            let result = Barrel.getFirstBarrels(buffer, i);
            assert.lengthOf(result.barrels, i);
            result.barrels.forEach((barrel, i) => assert.strictEqual(barrel.toString('hex'), testCases[i].barrel));
            assert.strictEqual(result.buffer.toString('hex'), testCases.slice(i).map(testCase => testCase.barrel).join(''));
        });
    }

    it('should default to reading all barrels', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.barrel).join(''), 'hex');
        let result = Barrel.getFirstBarrels(buffer);
        assert.lengthOf(result.barrels, testCases.length);
        result.barrels.forEach((barrel, i) => assert.strictEqual(barrel.toString('hex'), testCases[i].barrel));
        assert.lengthOf(result.buffer, 0);
    });

    it('should reject fraction counts', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.barrel).join(''), 'hex');
        assert.throws(() => Barrel.getFirstBarrels(buffer, 0.0001));
        assert.throws(() => Barrel.getFirstBarrels(buffer, 3.14));
        assert.throws(() => Barrel.getFirstBarrels(buffer, 100.5));
    });

    it('should reject counts less than 0 (zero)', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.barrel).join(''), 'hex');
        assert.throws(() => Barrel.getFirstBarrels(buffer, -1));
        assert.throws(() => Barrel.getFirstBarrels(buffer, -5));
        assert.throws(() => Barrel.getFirstBarrels(buffer, -20));
    });

    it('should reject defined counts that are not numbers', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.barrel).join(''), 'hex');
        assert.throws(() => Barrel.getFirstBarrels(buffer, 'Hello, World!'));
        assert.throws(() => Barrel.getFirstBarrels(buffer, []));
        assert.throws(() => Barrel.getFirstBarrels(buffer, false));
        assert.throws(() => Barrel.getFirstBarrels(buffer, null));
    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.getFirstBarrels());
        assert.throws(() => Barrel.getFirstBarrels({}));
        assert.throws(() => Barrel.getFirstBarrels({}, 5));
        assert.throws(() => Barrel.getFirstBarrels([], 5));
        assert.throws(() => Barrel.getFirstBarrels(false, 5));
        assert.throws(() => Barrel.getFirstBarrels('Hello, World!', 10));
    });

});
