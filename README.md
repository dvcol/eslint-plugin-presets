# eslint-plugin-id

Basic presets for eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-id`:

```sh
npm install eslint-plugin-id --save-dev
```

## Usage

Add `id` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "id"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "id/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


