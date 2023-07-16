### ДЗ "Инфраструктура"

## Задание 1
Для появления ошибки при несоответствии сообщения коммита формату conventional commits был использован commitlint<br/>

**Проверка форматирования в пре-коммитах:**
```sh
# установить зависимости
npm ci

# Активация пре-коммит хуков
npx husky install

# Если пре-коммит хук был пропущен
chmod ug+x .husky/*
chmod ug+x .git/hooks/*

#Тест пре-коммита, который выдаст ошибку
git commit -m "foo: this will fail"

#Тест пре-коммита, который пройдет проверку
git commit -m "chore: lint on commitmsg"
```

**Проверка форматирования коммитов, реализованная с помощью GitHub Actions:**<br/>
Для проверки был добавлен файл `.github/workflows/commit-lint.yml`. При пуше коммита запускается задача `commitlint`, которая делает следующее:
1. Настраивает окружение, в котором будет происходить проверка
2. Проверяется сообщение коммита
3. Если проверка не проходит - задача падает

В разделе Actions репозитория можно посмотреть [успешные задачи](https://github.com/VictoriaSko/unit-demo-cra/actions/runs/5524885565) для правильного сообщения коммита и [проваленные задачи](https://github.com/VictoriaSko/unit-demo-cra/actions/runs/5524885969)

-------------

## Задание 2

В GitHub Actions были реализованы задачи для запуска unit и e2e тестов, а так же запуск eslint проверки, при пуше коммита в пул реквест
В разделе Pull requests можно посмотреть пример [успешных запусков тестов](https://github.com/VictoriaSko/unit-demo-cra/pull/5) и [проваленных запусков тестов](https://github.com/VictoriaSko/unit-demo-cra/pull/6)

- [.yml файл для unit тестов](https://github.com/VictoriaSko/unit-demo-cra/blob/master/.github/workflows/unit-test.yml)

- [.yml файл для e2e тестов](https://github.com/VictoriaSko/unit-demo-cra/blob/master/.github/workflows/test.yml)

- [.yml файл для eslint проверки](https://github.com/VictoriaSko/unit-demo-cra/blob/master/.github/workflows/lint.yml)

Описание работы задач:
1. Устанавливаются зависимости и настраивается окружение, на котором будет проводится проверка
2. Запускается соответствующий (test, e2e, lint) npm скрипт, прописанный в package.json
3. Если проверка не проходит (в случае тестов, если хотя бы один из тестов завершается с ошибкой) - задача падает

-------------

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
