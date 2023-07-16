## Настройки

Включить Issues: 
- Settings > General > Issues
Включить Branch protection rule: 
- Setting > Branches > Add rule > Require status checks to pass before merging > Autotests for Pull Requests, Check commits format for convention
Включить GitHub Pages на gh-pages:
- Settings > Pages > Branch: gh-pages /root


## Репозиторий включает:

#### Проверка на правильной сообщений о коммитах
- Попробуй сделать коммит "test" (вызовет ошибку) или "test: example" (пройдет проверки) 

#### Проверка pull request
- Создай ветку (в примере: branch-test-PR-with-error-commit), сделай в нее коммит (error commit) и создай Pull request > на странице Pull request будет видно, что PR не прошел тесты
- Создай ветку (в примере: branch-test-PR), сделай в нее коммит (test: readme.md for PR) и создай Pull request > на странице Pull request будет видно, что PR прошел тесты

#### Release
- Добавь в новый коммит tag в формате v2
- Все проверки можно увидеть на странице Actions
- В Issues создается новый issue, с необходимыми данными, ссылками и закрывается.
- В GitHub Pages создается рабочий сайт


-------------------
## О рабочем репозитории

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