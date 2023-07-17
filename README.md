# Описание релизных скриптов

- [commitlint.yml](.github/workflows/commitlint.yml)  
Линтер коммитов, запускается при каждом push

- [pullrequest.yml](.github/workflows/pullrequest.yml)  
Запускается при pull request в master. Нельзя сделать PR, пока он не отработает, проверяет unit и e2e тесты

- [static.yml](.github/workflows/static.yml)  
Отвечает за сборку и деплой. Может быть запущен вручную или из другого workflow (в частности, из releaseprocess)

- [releaseprocess.yml](.github/workflows/releaseprocess.yml)  
Создаёт или перезаписывает Issue, добавляет инфу о релизе, changelog, информацию о тестах  
Далее производится деплой, и в случае успеха в Issue дописывается строчка об этом, а сам Issue закрывается  
Changelog реализован без сторонних actions, на основе взятия последнего Issue и сравнения его тега с HEAD через git rev-list  
Changelog работает корректно только при последовательных пушах с тегами в ветке master, в остальных случаях возможны сбои и вывод "no correct info"  
Changelog был доделан через несколько часов после дедлайна, поэтому балл на ваше усмотрение)  

По условиям задачи:
- "Идеальный" Issue можно найти для тега [v.1.14.12](https://github.com/eugene-elk/unit-demo-cra/issues/44)
- Проверку при слиянии веток можно найти здесь, нажать View Details: [PR dev-demo-3](https://github.com/eugene-elk/unit-demo-cra/pull/46)
- Наличие проверок на каждый commitlint можно увидеть в [Actions](https://github.com/eugene-elk/unit-demo-cra/actions)
- Секрет(токен) хранится защищенно

По любым вопросам отвечу в тг: [t.me/losickij](t.me/losickij)


# Описание исходного репозитория
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
