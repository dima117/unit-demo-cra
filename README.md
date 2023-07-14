# Домашнее задание ШРИ "Инфраструктура"

Зеленков Александр Сергеевич

https://t.me/sasha_zelenkov

## Сборка приложения и зависимости

Для запуска примеров необходимо установить [NodeJS](https://nodejs.org/en/download/) 16 или выше.

### Как запустить:

```sh
# установить зависимости
npm ci

# запустить приложение
npm start
```
### Как настроить линтер коммитов git:

```sh
# Activate husky hooks
npx husky install

# Add git hooks
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```
Теперь ваши сообщения коммитов должны соответствовать конвенции, например `git commit -m "chore: add hot"`.

[Подробнее о конвенции коммитов](https://www.conventionalcommits.org/en/v1.0.0/)

При неверном форматировании будет сообщение об ошибке и коммит будет отклонен.

## Тестирование локальное

### Как запустить e2e тесты локально:

```sh
# скачать браузеры
npx playwright install

# запустить тесты
npm run e2e
```
### Как запустить все модульные тесты локально и однократно:

```sh
CI=true npm test
```

### Как запустить модульные тесты в режиме наблюдения при разработке:

```sh
npm test
```

## CI

### Как проверить CI pull request

```sh
# отведите ветку для новой фичи
git checkout -b "featureOneSuperNew"

# сделайте изменения в коде, а затем сделайте коммит
git add .

# помните про линтер коммитов
git commit -m "chore: add hot feature bug fix"

# добавьте новую удаленную ветку для фичи 
# (адрес моего репо или адрес вашего форка)
git remote add feature_one https://github.com/SashaZel/unit-demo-cra

# в браузере перейдите на адрес моего репо https://github.com/SashaZel/unit-demo-cra
# сделайте pull request в меню сверху (большая зеленая кнопочка или в меню Pull requests) 
# Внимание! Выберите правильную ветку КУДА будет пулл реквест 
# (не в базовый репо домашки!!! В иконке "base" должен быть мой репо или ваш форк.)

```
