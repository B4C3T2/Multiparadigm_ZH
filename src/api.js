
const _HunspellCheck = (characters) =>{
    const fs= require('jest-serializer');
    const Hunspell = require('hunspell-spellchecker')
    const AllAnagrams = _GenerateAllAnagrams(characters);
    const HunspellChecker = new Hunspell();

    const Dictionary = HunspellChecker.parse({
        aff: fs.readFileSync("./dictionary/en_US.aff"),
        dic: fs.readFileSync("./dictionary/en_US.dic")
    });

    HunspellChecker.use(Dictionary);

    const result = {};
    let i = 0;
    for (const anagram in AllAnagrams){
        if(HunspellChecker.check(anagram)){
            result[i]=anagram;
            i++;
        }
    }
}

function _GenerateAllAnagrams(characters){

    if(characters.length === 0) return [''];
    const result = {};
    characters.split('').forEach(function(letter,i){
        const RemainingLetters = characters.slice(0,i) + characters.slice(i+1);

        _GenerateAllAnagrams(RemainingLetters).forEach(
            function(anagram){
                result[letter+anagram] = true;
            });
    });
    return Object.keys(result);
}

module.exports = {
    HunspellCheck : _HunspellCheck
}