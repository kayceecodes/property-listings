module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components/$1",
    "^@/theme(.*)$": "<rootDir>/src/theme/$1",
    "^@/src(.*)$": "<rootDir>/src/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1"
  }
};
process.env = Object.assign(process.env, {
  NEXT_CONTENTFUL_SPACE_ID: 'dx4qvrmnbbvs',
  NEXT_CONTENTFUL_ACCESS_TOKEN: 'OM_ZIoz2uKmf5Uqd-Szux7PPk6wcFp-38KvbCWVTJs8'
});