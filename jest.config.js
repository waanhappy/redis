module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: `.*\\.test\\.tsx?$`,
};
