import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('#toTexts', () => {

    it('should convert a buffer to texts', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.hex).join(''), 'hex');
        let texts = testCases.map(testCase => testCase.text);
        assert.deepEqual(Barrel.toTexts(buffer), texts);
    });

    it('should require a terminator', () => {
        let buffer = Buffer.from(testCases.map(testCase => testCase.hex).join(''), 'hex');
        buffer = Buffer.concat([buffer, Buffer.from('ab', 'hex')]);
        assert.throws(() => Barrel.toTexts(buffer));
    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.toTexts());
        assert.throws(() => Barrel.toTexts({}));
        assert.throws(() => Barrel.toTexts([]));
        assert.throws(() => Barrel.toTexts(false));
        assert.throws(() => Barrel.toTexts('Hello, World!'));
    });

});
