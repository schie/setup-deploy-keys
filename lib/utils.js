"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function getFileName(ownerName, packageName) {
    return [ownerName, packageName, "id_rsa"].map(lodash_1.snakeCase).join("__");
}
exports.getFileName = getFileName;
