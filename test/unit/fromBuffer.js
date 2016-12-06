import Barrel from '../../.dist/barrel';
import testCases from '../buffer-test-cases';
import { assert } from 'chai';

describe('#fromBuffer', () => {

    testCases.forEach(testCase => {

        it(`should convert a buffer to a barrel: ${testCase.buffer}`, () => {
            assert.strictEqual(Barrel.fromBuffer(Buffer.from(testCase.buffer, 'hex')).toString('hex'), testCase.barrel);
        });

    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.fromBuffer());
        assert.throws(() => Barrel.fromBuffer({}));
        assert.throws(() => Barrel.fromBuffer([]));
        assert.throws(() => Barrel.fromBuffer(false));
        assert.throws(() => Barrel.fromBuffer('Hello, World!'));
    });

});
