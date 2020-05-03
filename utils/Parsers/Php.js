const parser = require("php-parser");

const phpParser = class PhpParser {
    constructor(options = {}) {
        if (options.hasOwnProperty("parser") === false) {
            options.parse = {
                extractDoc: false,
                php7: true
            }
        }

        if (options.hasOwnProperty("ast") === false) {
            options.ast = {
                withPositions: true
            }
        }

        this.options = options;
    }

    async parse(file, packageName) {
        const content = parser.tokenGetAll(file.fileContent);
        const contentResult = await this.resultParse(content, file, packageName);

        return contentResult;
    }

    async resultParse(content, file, packageName) {
        return new Promise((resolve, reject) => {
            const res = content.filter(item => {
                //todo add filter in the future
                if (Array.isArray(item) === false) {
                    return false;
                }
                const itemType = item[0];
                const allowedTypes = [
                    "T_CONSTANT_ENCAPSED_STRING",
                ];

                if (allowedTypes.includes(itemType) === false) {
                    return false;
                }

                return true;
            }).map(item => {
                const fileType = file.fileType;
                const path = file.filePath;
                const value = item[1];
                const lineNumber = item[2];

                return {
                    fileType,
                    path,
                    value,
                    lineNumber,
                    packageName
                };
            })

            resolve(res);
        });
    }
}


module.exports = {
    phpParser
}