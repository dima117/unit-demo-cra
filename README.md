
# Домашка по Инфраструктуре

## Что происходит при PR
При PR запускаются проверки с помощью GH Actions на
- commit lint
- eslint
- tests

## Как проверить GH Actions на релизе 
Чтобы затриггерить GH Actions нужно сделать изменение, закоммитить, затегать и запушить
```bash
touch testfile.txt
git add testfile.txt
git commit -m "feat: add new feature"
git tag -a v3 -m "third release"
git push origin v3
```

## Что происходит на релизе
После действий описаных выше запуститься GH Action, который
1. Создаст issue с названием Release v3 c информацией коммитера и Changelog с последнего релиза
2. Создаст отдельную ветку release-v3 
3. Запустит тесты, билд и деплой
4. Оставит репорты этих процессов в комментарий к issue
5. После деплоя issue закрывается
