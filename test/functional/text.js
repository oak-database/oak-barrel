import Barrel from '../../.dist/barrel';
import testCases from '../text-test-cases';
import { assert } from 'chai';

describe('Text', () => {

    for (let i = 0; i <= testCases.length; i++) {

        it (`should create and read a buffer of ${i} barrels`, () => {
            let texts = new Array(i).fill(0).map((e, j) => {
                return testCases[j].text;
            });
            let hex = new Array(i).fill(0).map((e, j) => testCases[j].hex).join('');
            let buffer = Barrel.fromTexts(texts);
            assert.isTrue(buffer.equals(Buffer.from(hex, 'hex')));
            assert.deepEqual(Barrel.toTexts(buffer), texts);
        });

    }

    testCases.forEach(testCase => {

        it(`should convert text to and from a barrel: ${testCase.text}`, () => {
            let barrel = Barrel.fromText(testCase.text);
            assert.isTrue(barrel.equals(Buffer.from(testCase.hex, 'hex')));
            assert.strictEqual(Barrel.toText(barrel), testCase.text);
        });

    });

});
