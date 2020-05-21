# tortoise-ui

This project provides a simple single pager vuejs application to monitor our tortoises via [tortoise-service][1].

## environment

All environment variables are prefixed with `TORTOISE_UI`, so `*_A` maps to `TORTOISE_UI_A`

| ENV                 | Description                           | type   | required |
|:--------------------|:--------------------------------------|:-------|:---------|
| `*_PROXY_TARGET`    | toirtoise-service host                | string | __YES__  |
| `*_PROXY_AUTH`      | only for local development, http auth | string | __NO__   |
| `*_PROXY_LOG_LEVEL` | devServer log level                   | string | __YES__  |


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



[1]: https://github.com/keksnicoh/tortoise-service