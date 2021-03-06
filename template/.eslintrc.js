module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow Template Literals
    'quotes': ["error", "single", {"allowTemplateLiterals": true}]
  },
  'globals': {
    '_': true,
    'qq': true,
    'wx': true,
    'router': true,
    'history': true,
    'localStorage': true,
    'alert': true,
    'location': true,
    'Raven': true,
    'Moment': true,
    'emoji': true,
    'Image': true,
    'Decimal': true,
    'WeixinJSBridge': true,
    'firstHref': true
  }
}
