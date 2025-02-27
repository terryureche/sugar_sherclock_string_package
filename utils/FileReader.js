const fs = require("fs");
const path = require("path");
const config = require("./Config");

const reader = class FileReader {
    constructor(config) {
        this.config = config;
    }

    async readFiles(files) {
        return new Promise((resolve, reject) => {
            let res = files.filter(file => {
                const fileName = this.getFileNameFromString(file);

                const fileStatus = !config.filesToIgnore.includes(fileName);

                return fileStatus;
            }).map(file => {
                const fileContent = this.readFile(file);
                const fileType = path.extname(file);
                const filePath = file;

                return {
                    fileContent,
                    fileType,
                    filePath
                };
            })

            resolve(res);
        });
    }

    joinPath(basePath, ...addPath) {
        return path.join(basePath, ...addPath);
    }

    getFileNameFromString(stringPath) {
        return path.parse(stringPath).base;
    }

    mkDirSync(path) {
        fs.mkdirSync(path, { recursive: true });
    }

    readFile(absoluteFilePath) {
        var content = fs.readFileSync(absoluteFilePath, 'utf8');

        return content;
    }

    extractStrings(fileContent) {
        const matches = fileContent.match(this.config.searchStringDoubleQuoteRegex);

        return matches;
    }

    fileExist(path) {
        return fs.existsSync(path);
    }



}

module.exports = {
    reader
};