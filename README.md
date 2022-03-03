# npm-link-by-copy

Forked from [npm-link-copy](https://github.com/laggingreflex/npm-link-copy/blob/master/readme.md) because one of the original dependencies (chokidar) was hanging.

## What is this?

Alternative to [npm link] that works by copying files instead of linking.

Copies a `module` that you have `npm link`ed to `./node_modules/module`

## Install

```sh
npm install -g npm-link-by-copy
```

## Usage

```sh
npm-link-by-copy [..modules]
```

For example:

```sh
npm-link-by-copy lodash express
```

### Exclude directories

- **`--exclude`** exclude directories

For example:

```sh
npm-link-by-copy --exclude node_modules,.git lodash express
```

<Links/>

[npm link]: https://docs.npmjs.com/cli/link

```

```
