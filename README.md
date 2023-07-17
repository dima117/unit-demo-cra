# ДЗ "Инфраструктура"

### Conventional commits & commitlint

Зачем нужен хаски, когда есть ~~золотистый ретривер~~ терминал? По крайней мере, так подумал я. А потому решил, что лучше написать одну строчку в [commit-msg](https://git-scm.com/book/ru/v2/%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-Git-%D0%A5%D1%83%D0%BA%D0%B8-%D0%B2-Git) хуке гита:

```sh
cat $1 | npx commitlint
```

На стороне gh actions проверка, разумеется, [автоматизированная](https://github.com/st-isk/infra-shri-hw/blob/master/.github/workflows/conventional-commits-action.yaml) (прямиком из [доки](https://commitlint.js.org/#/guides-ci-setup)).

### Запуск автотестов для PR

[Тут](https://github.com/st-isk/infra-shri-hw/blob/master/.github/workflows/autotests-action.yaml). Единственное что, я так и не понял, почему не работает корректно [кэширование](https://github.com/st-isk/infra-shri-hw/blob/master/.github/workflows/cache-modules-action.yaml) нод модулей. Экшнс кэш подтягивает, но вот без повторного запуска "npm ci" ругается на отсутствие react-scripts. Если есть мысли по этому поводу, был бы крайне рад почитать в issues.

### Инструкция по запуску (source)

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
