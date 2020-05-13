const PackageScanner = require("./PackageScanner").scanner;
const FileReader = require("./FileReader").reader;
const config = require("./Config");
const NotSugarFolderException = require("./NotSugarFolderException").sugarException;
const PhpParser = require("./Parsers/Php").phpParser;
const JsParser = require("./Parsers/JavaScript").jsParser;
const HbsParser = require("./Parsers/Hbs");
const CsvWriter = require("./CsvWriter").csv;

const process = class Process {
    async start() {
        const scanner = new PackageScanner(config);
        const reader = new FileReader(config);

        const packages = await scanner.getPackages();

        for (let i = 0; i < packages.length; i++) {
            const packageName = scanner.getSugarPackageName(packages[i]);

            try {
                packages[i] = scanner.jumpInSrcFolder(packages[i]);
            } catch (error) {
                if (error instanceof NotSugarFolderException) {
                    continue;
                } else {
                    throw error;
                }
            }

            const files = await scanner.getFiles(packages[i]);
            const filesContent = await reader.readFiles(files);


            const parsedFiles = await this.parseFiles(filesContent, packageName);
            const sanitizedFiles = [].concat(...parsedFiles);


            await this.createCsv(sanitizedFiles, packageName);
        }
    }

    async parseFiles(files, packageName) {
        const phpParser = new PhpParser();
        const jsParser = new JsParser();
        const hbsParser = new HbsParser();

        return Promise.all(
            files.map(async (file) => {
                let res
                if (file.fileType === ".php") {
                    res = await phpParser.parse(file, packageName);
                } else if (file.fileType === ".js") {
                    res = await jsParser.parse(file, packageName);
                } else if (file.fileType === ".hbs") {
                    res = hbsParser.parse(file, packageName);
                }

                return res;
            })
        );
    }

    async createCsv(parsedFiles, packageName) {
        const csvWriter = new CsvWriter(config.basePathForExportingCsv, packageName);
        await csvWriter.createCsv(parsedFiles)
    }
}

module.exports = {
    process
};