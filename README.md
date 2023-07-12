Github actions CI
---
### Релизный процесс
Основная ветка разработки - `develop`.
Когда мы готовы к релизу на ветке develop создаем тэг `v<число>`   (например,  `v12`  ).

Последний тэг необходимо проверить в https://github.com/shvkn/ci-unit-demo-cra/tags

```git
(develop) git tag -a v* -m 'v*'
(develop) git push --follow-tags
```

При появдения пуша с тэгом v* запускается флоу релизного процесса
- отведение ветки release-v*
- build
- lint
- e2e / unit тестирование
- добавление записи в реестр релизов (issue)
- в случае отсутсвия ошибок происходит деплой на gh pages и автоматическое закрытие issue релиза

### Если тесты прошли
После успешного прохождения релизного процесса создаем pull-request
`master << release-v*`

Запускается флоу `pull_request`
- build
- linter
- e2e / unit тестирование

Мерджим pull request изменения в master
и подобновляем от master'a ветку develop

```git
git checkout develop
git rebase master
git push
```

### Если тесты упали
```git
# в ветке develop создается коммит с hot-fix
(develop) git commit -m 'fix: hot-fix'
(develop) git push
(develop) git checkout release-v*

# Переносим hot-fix и переставляем тэг
(release-v*) git cherry-pick develop
(release-v*) git tag -fa v*
(release-v*) git push
(release-v*) git push --tags --force
```
Релизный процесс перезапускается.
После хотфиксов необходимо удалить неудавшиеся action run'ы, они не дадут провести pull-request.



Флоу release, pull_request можно запускать вручную (на случай ошибки гитхаба 429)

---

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
