/** @type {import("ts-jest/dist/types").InitialOptionsTsJest}*/
module.exports = {
    transform:{
        "^.+\\.ts$": "ts-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    moduleDirectories:["node_modules","uksa/src"],
    moduleNameMapper:{
        "@controllers/(.*)": "<rootDir>/src/components/$1",
        "@middleware/(.*)": "<rootDir>/src/middleware/$1",
        "@models/(.*)": "<rootDir>/src/models/$1",
        "@routes/(.*)": "<rootDir>/src/routes/$1",
        "@util/(.*)": "<rootDir>/src/util/$1",

    }
}