# В случае каких-либо проблем (ну или если просто не будет желания разбираться в стене текста, которую я написал)

Телеграм: t.me/Sisha0

# Релизные процессы

## Ветки

Разработка ведётся в ветке **develop**. Ветка **master** используется для релизов.

## Процесс разработки

1. Отводим от ветки **develop** отдельную ветку для разработки. Например, **feature/my-new-feature**.
2. Делаем `npm install`, `npx husky install`. Возможно, если будут проблемы с запуском git хуков, надо будем сделать `chmod ug+x .husky/*`.
3. Делаем все изменения в рамках отведённой ветки. На каждый коммит запускаются следующие проверки:
   - Линтер (`npm run lint`)
   - Юнит-тесты (`npm run test:unit:ci`)
   - Интеграционные тесты (`npm run test:e2e:ci`)
   - Проверка на соответствие коммита стилю [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
4. Когда разработка закончена, необходимо запушить изменения в удалённый репозиторий и создать pull request из отведённой ветки в ветку **develop**.
5. Созданный pull request обязан пройти следующие проверки:
   - Линтер (`npm run lint`)
   - Юнит-тесты (`npm run test:unit:ci`)
   - Интеграционные тесты (`npm run test:e2e:ci`)
   - Проверка всех коммитов на соответствие стилю [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
   - Соответствие названия стилю [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) (поле subject должно начинаться с маленькой латинской буквы)
6. Если все проверки прошли успешно, то созданный pull request необходимо закрывать через _squash and commit_ с созданным по умолчанию названием. Это нужно, чтобы на каждую задачу в ветке был ровно один коммит.

## Процесс релиза

1. Когда все нужные для релиза изменения находятся в ветке **develop**, можно начинать релиз. Для этого создаём pull request из ветки **develop** в ветку **master**.
2. Созданный pull request обязан пройти следующие проверки:
   - Линтер (`npm run lint`)
   - Юнит-тесты (`npm run test:unit:ci`)
   - Интеграционные тесты (`npm run test:e2e:ci`)
   - Проверка всех коммитов на соответствие стилю [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
3. Если все проверки прошли успешно, то созданный pull request необходимо закрывать через _merge and commit_. Это нужно, чтобы коммиты для всех задач попали в ветку.
4. Теперь, когда в ветке **master** находятся все изменения, необходимо добавить к последнему коммиту в ветке тег с новой версией. Название тега должно удовлетворять выражению `v\d+` (например, `v1`, `v123`). После этого запустится workflow, который создаст issue с информацией о релизе.
5. Созданный issue будет содержать changelog, сгенерированный на основе влитых изменений. Он также будет содержать версию релиза (можно найти также в названии issue) и его дату. Дополнительно будет проставлен лейбл RELEASE, а в поле Assignees можно будет увидеть автора.
6. Issue будет также содержать ссылку на результаты проверок изменений (проверки аналогичны проверкам для pull request в ветку **master**). Если все проверки прошли успешно, то запустится деплой приложения на github pages. В случае успешного деплоя, в issue будет ссылка на страницу с приложением. Если же деплой не удался, то появится ссылка на пайплайн, который упал.

## Create commit by TheodoreTwombly

Данный коммит создан в рамках проверки задания по инфраструктуре.
