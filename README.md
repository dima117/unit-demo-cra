## Что было добавлено

- при помощи husky и commitlint верифицирую локально верифицирую сообщение коммита
- в .github/workflows/tests.yml находятся тесты, срабатывают при создании PR, результат работы можно посмотреть там же в PR
- во вкладке branches в настройках добавил Branch protection rule, чтобы нельзя было мержить в ветку, если тесты не проходят
- релизы не успел допилить, там возникла вот такая проблема: "HttpError: Issues are disabled for this repo", но сейчас там прописаны следующие шаги:
  - создаётся changelog при помощи Bullrich/generate-release-changelog
  - создаётся issue при помощи JasonEtco/create-an-issue по шаблону .github/ISSUE_TEMPLATE.md
  - создаётся релиз при помощи actions/create-release
  - закрывается issue

Создание релизов работает, можно посмотреть соответственно во вкладке Releases, создание issue не проверял, тесты для релизов не успел допилить.

### Update
Протестировал issue, они создаются, https://github.com/mukkumayc/unit-demo-cra/issues/5

## Стандартное сообщение

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
