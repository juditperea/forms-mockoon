module.exports = {
    testEnvironment: 'jsdom',
    transform: {
    '^.+\\.(t|m?j)sx?$': '@swc/jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx'],
    moduleNameMapper: {
    uuid: require.resolve('uuid'),
    '\\.(css|less|png|jpg|gif|jpeg|webp)$': 'identity-obj-proxy' // You have to add all files types of the resources that you use like png...
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
    'src/__tests__/',
    'node_modules/',
    '.yarn/'
    ]
    }
    