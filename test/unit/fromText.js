import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('#fromText', () => {

    testCases.forEach(testCase => {

        it(`should convert text to a barrel: ${testCase.text}`, () => {
            assert.strictEqual(Barrel.fromText(testCase.text).toString('hex'), testCase.hex);
        });

    });

});
