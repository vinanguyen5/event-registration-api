module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};
