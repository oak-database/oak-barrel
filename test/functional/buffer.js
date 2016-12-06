import Barrel from '../../.dist/barrel';
import testCases from '../buffer-test-cases';
import { assert } from 'chai';

describe('Buffer', () => {

    testCases.forEach(testCase => {

        it(`should convert a buffer to and from a barrel: ${testCase.buffer}`, () => {
            let barrel = Barrel.fromBuffer(Buffer.from(testCase.buffer, 'hex'));
            assert.strictEqual(Barrel.toBuffer(barrel).toString('hex'), testCase.buffer);
        });

    });

});
