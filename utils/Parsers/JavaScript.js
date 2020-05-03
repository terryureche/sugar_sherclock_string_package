const acorn = require("acorn");

const jsParser = class JsParser {
    constructor(options = {}) {

    }

    async parse(file, packageName) {
        var strings = [];
        for (let token of acorn.tokenizer(file.fileContent, { locations: true })) {
            if (token.type.label === "string") {
                strings.push(token);
            }
        }

        const contentResult = await this.resultParse(strings, file, packageName);

        return contentResult;
    }

    async resultParse(content, file, packageName) {
        return new Promise((resolve, reject) => {
            const res = content.filter(item => {
                //todo add filter in the future
                return true;
            }).map(item => {
                const fileType = file.fileType;
                const path = file.filePath;
                const value = item.value;
                const startLine = item.loc.start.line;
                const endLine = item.loc.start.line;
                const lineNumber = startLine === endLine ? startLine : `Start: ${startLine} End: ${endLine}`;

                return {
                    fileType,
                    path,
                    value,
                    lineNumber,
                    packageName
                };
            });

            resolve(res);
        });
    }
};

module.exports = {
    jsParser
};