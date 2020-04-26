const readdir = require("@jsdevtools/readdir-enhanced");
const { existsSync, readdirSync } = require("fs");
const path = require("path");
const NotSugarFolderException = require("./NotSugarFolderException").sugarException;

const scanner = class PackageScanner {
    constructor(config) {
        this.path = config.scanTarget;
        this.allowedExtensionsRegex = config.allowedExtensionsRegex;
        this.ignoredDirectories = config.ignoreDirectory;
    }

    jumpInSrcFolder(targetPath) {
        const newPath = path.join(targetPath, "src");

        if (existsSync(newPath) === false) {
            throw new NotSugarFolderException;
        }

        return newPath;
    }

    async getFiles(targetPath, deep = true) {
        if (!targetPath) {
            targetPath = this.path;
        }

        const files = await readdir(targetPath, {
            basePath: targetPath,
            filter: this.allowedExtensionsRegex,
            deep: deep
        });

        return files;
    }

    getPackages() {
        const directories = readdirSync(this.path, { withFileTypes: true }).
            filter(item => item.isDirectory()).
            map(item => path.join(this.path, item.name));

        return directories;
    }

    getSugarPackageName(file) {
        var dirName = path.basename(file);

        return dirName;
    }
}

module.exports = {
    scanner
}