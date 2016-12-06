import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('#toText', () => {

    testCases.forEach(testCase => {

        it(`should convert a barrel to text: ${testCase.hex}`, () => {
            assert.strictEqual(Barrel.toText(Buffer.from(testCase.hex, 'hex')), testCase.text);
        });

    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.toText());
        assert.throws(() => Barrel.toText({}));
        assert.throws(() => Barrel.toText([]));
        assert.throws(() => Barrel.toText(false));
        assert.throws(() => Barrel.toText('Hello, World!'));
    });

});
