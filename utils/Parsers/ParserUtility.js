
const config = require("./../Config");

const parserUtility = function (val) {
    const checkNotWeirdString = (val) => {
        let reg = new RegExp(/^[0-9'*,.]*$/g);

        return !reg.test(val);
    }

    const checkIfIsNotLabelKey = (val) => {
        return !val.startsWith("LBL_");
    }
    const checkIfIsNotLabelKeyString = (val) => {
        return !val.startsWith("'LBL_");
    }

    const notInRestrictedWords = (val) => {
        return !config.keywordsToIgnore.includes(val);
    }

    const containtEmptySpace = (val) => {
        let reg = new RegExp(/\s/g);

        return reg.test(val);
    }

    const moreThanFourLetters = (val) => {
        return val.length > 6;
    }

    const lessThanOneHundredLetters = (val) => {
        return val.length < 100;
    }

    return moreThanFourLetters(val) && checkNotWeirdString(val) && checkIfIsNotLabelKey(val) && notInRestrictedWords(val) && checkIfIsNotLabelKeyString(val) && containtEmptySpace(val) && lessThanOneHundredLetters(val);
};

module.exports = parserUtility;