import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('#getFirstBarrel', () => {

    it('should get the first barrel', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.hex).join(''), 'hex');
        let result = Barrel.getFirstBarrel(buffer);
        assert.strictEqual(result.barrel.toString('hex'), testCases[0].hex);
        assert.strictEqual(result.buffer.toString('hex'), testCases.slice(1).map(testCase => testCase.hex).join(''));
    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.getFirstBarrel());
        assert.throws(() => Barrel.getFirstBarrel({}));
        assert.throws(() => Barrel.getFirstBarrel([]));
        assert.throws(() => Barrel.getFirstBarrel(false));
        assert.throws(() => Barrel.getFirstBarrel('Hello, World!'));
    });

});
