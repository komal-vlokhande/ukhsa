/** @type {import("ts-jest/dist/types").InitialOptionsTsJest}*/
module.exports = {
    transform:{
        "^.+\\.ts$": "ts-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    moduleDirectories:["node_modules","ukhsa/src/app"],
    moduleNameMapper:{
        "@controllers/(.*)": "<rootDir>/src/app/components/$1",
        "@middleware/(.*)": "<rootDir>/src/app/middleware/$1",
        "@models/(.*)": "<rootDir>/src/app/models/$1",
        "@routes/(.*)": "<rootDir>/src/app/routes/$1",
        "@util/(.*)": "<rootDir>/src/app/util/$1",

    }
}