1. Добавил `config` файлы для commitlint и добавил workflows для github (https://github.com/AparinAA/unit-demo-cra/blob/dev1/.github/workflows/commitlint.yml)[commitlint.yml] . Делать коммит через с именем `'refactor: commitText'` .

В этом репозитории находится пример приложения с тестами:

-   [e2e тесты](e2e/example.spec.ts)
-   [unit тесты](src/example.test.tsx)

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
