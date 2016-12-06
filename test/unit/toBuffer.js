import Barrel from '../../.dist/barrel';
import testCases from '../buffer-test-cases';
import { assert } from 'chai';

describe('#toBuffer', () => {

    testCases.forEach(testCase => {

        it(`should convert a barrel to a buffer: ${testCase.barrel}`, () => {
            assert.strictEqual(Barrel.toBuffer(Buffer.from(testCase.barrel, 'hex')).toString('hex'), testCase.buffer);
        });

    });

    it('should require a buffer', () => {
        assert.throws(() => Barrel.toBuffer());
        assert.throws(() => Barrel.toBuffer({}));
        assert.throws(() => Barrel.toBuffer([]));
        assert.throws(() => Barrel.toBuffer(false));
        assert.throws(() => Barrel.toBuffer('Hello, World!'));
    });

    it('should reject barrels that terminate before the end of the buffer', () => {
        assert.throws(() => Barrel.toBuffer(Buffer.from('abcdffabcdff', 'hex')));
    });

    it('should reject barrels that do not terminate', () => {
        assert.throws(() => Barrel.toBuffer(Buffer.from('abcdabcd', 'hex')));
        assert.throws(() => Barrel.toBuffer(Buffer.from('abcdabcdfeff', 'hex')));
    });

});
