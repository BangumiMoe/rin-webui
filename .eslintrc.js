module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'eqeqeq': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-undef': 0, // support window or document var
    'no-inner-declarations': 0, // only pro team need it
    'global-require': 0,
    'camelcase': 0, // you like is_own or IsOwn or _IsOwn_Own, yes, write it!
    'guard-for-in': 0, // only pro team need it
    'no-restricted-syntax': 0, // only pro team need it
    'no-underscore-dangle': 0, // only pro team need it
    'max-len': 0, // only pro team need it
    'space-before-function-paren': 0, // unkown, i could not format it auto. so :) closed
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
