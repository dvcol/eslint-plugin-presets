# eslint-plugin-id

Basic presets for eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@dvcol/eslint-plugin-presets`:

```sh
npm install @dvcol/eslint-plugin-presets --save-dev
```

## Usage

Add `@dvcol/eslint-plugin-presets` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "@dvcol/presets"
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@dvcol/presets/rule-name": 2
  }
}
```

Or extends one of the presets.

```json
{
  "extends": [
    "@dvcol/presets/base"
  ]
}
```
