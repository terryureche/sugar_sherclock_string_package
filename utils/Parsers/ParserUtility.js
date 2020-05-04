
const config = require("./../Config");

const parserUtility = function (val) {
    const checkNotWeirdString = (val) => {
        let reg = new RegExp(/^[0-9'*,.]*$/g);

        return !reg.test(val);
    }

    const checkIfIsNotLabelKey = (val) => {
        return !val.startsWith("LBL_");
    }

    const notInRestrictedWords = (val) => {
        return !config.keywordsToIgnore.includes(val);
    }

    const moreThanFourLetters = (val) => {
        return val.length > 6;
    }

    return checkNotWeirdString(val) && checkIfIsNotLabelKey(val) && notInRestrictedWords(val);
};

module.exports = parserUtility;