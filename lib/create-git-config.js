"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function createEntry({ packageName, ownerName }) {
    return `[url "git@${packageName}.github.com:${ownerName}/${packageName}"]
    insteadOf = https://github.com/${ownerName}/${packageName}\n`;
}
exports.createEntry = createEntry;
function createGitConfig(params) {
    const gitconfigPath = path.join(process.env.HOME, ".gitconfig");
    params.forEach(params => {
        const entry = createEntry(params);
        fs.appendFileSync(gitconfigPath, entry);
    });
    return gitconfigPath;
}
exports.createGitConfig = createGitConfig;
