
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
Как настроить линтер коммитов git:

```sh
# Activate husky hooks
npx husky install

# Add git hooks
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

Как запустить e2e тесты:

```sh
# скачать браузеры
npx playwright install

# запустить тесты
npm run e2e
```
Как запустить все модульные тесты однократно:

```sh
CI=true npm test
```

Как запустить модульные тесты в режиме наблюдения при разработке:

```sh
npm test
```

Hot new
