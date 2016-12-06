import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('#fromTexts', () => {

    it('should convert texts to a buffer', () => {
        let texts = testCases.map(testCase => testCase.text);
        let hex = testCases.map(testCase => testCase.hex).join('');
        assert.strictEqual(Barrel.fromTexts(texts).toString('hex'), hex);
    });

    it('should require an array of strings', () => {
        assert.throws(() => Barrel.fromTexts());
        assert.throws(() => Barrel.fromTexts({}));
        assert.throws(() => Barrel.fromTexts(false));
        assert.throws(() => Barrel.fromTexts('Hello, World!'));
        assert.throws(() => Barrel.fromTexts([1, 2, 3]));
        assert.throws(() => Barrel.fromTexts([{}, true, []]));
        assert.throws(() => Barrel.fromTexts(['Hello, World!', 123]));
    });

});
