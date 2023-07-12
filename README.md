# unit-demo-cra infrastructure

## Contributing

Caution: don't use `pnpm` or `yarn`, use `npm`

- `git clone https://github.com/bernizhel/infrastructure`
- `cd infrastructure`
- `npm ci` or `npm install` (will run prepare npm script hook too)
- work
- `git add .`
- `git commit -m "your commit message"`

That's all

В этом репозитории находится пример приложения с тестами:

- [e2e тесты](e2e/example.spec.ts)
- [unit тесты](src/example.test.tsx)

Для запуска примеров необходимо установить [NodeJS](https://nodejs.org/en/download/) 16 или выше.

Как запустить:

```sh
# установить зависимости
npm ci

# запустить приложение
npm start
```

Как запустить e2e тесты:

```sh
# скачать браузеры
npx playwright install

# запустить тесты
npm run e2e
```

Как запустить модульные тесты:

```sh
npm test
```
