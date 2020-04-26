const sugarException = class NotSugarFolderException extends Error {
    constructor(message = "Not SugarCRM package") {
        super(message);
    }
}

module.exports = {
    sugarException: sugarException
}
