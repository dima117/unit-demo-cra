# 🚀 Инфраструктура 🚀

## Коммиты

Настроен commit-msg хук без всяких хасок выполняет проверку conventional commit в commitlint

`cat $1 | npx commitlint`

Эта же проверка запускается на CI чтобы устранить проблему локального отключения хуков

Workflow описан в `.github/workflows/commitlint-github-actions.yml`

Для PR выполняется проверка всех коммитов (из документации к commitLint)

## Тесты

Workflow описан в `.github/workflows/test-github-actions.yml`

Запускается для пул реквестов и может быть вызван из других ворк флоу

- Выполняет установку node_modules, и скалдывает их в кэш
- Выполняет прогон юнит тестов и публикует артефакты в формате junit
- Выполняет прогон e2e тестов PlayWright в headless Chrome, публикует отчет html

## Сборка



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
