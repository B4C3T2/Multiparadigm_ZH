import api from '../api';
import {describe, it} from "@jest/globals";

describe('Anagram test', () => {
    it('This is the hunspell check', ()=>{
        let expected = ['all'];
        let actual = api.HunspellCheck('all');
        expect(actual).toBe(expected);
    });
})