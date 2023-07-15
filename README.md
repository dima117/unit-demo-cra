ДЗ "Инфраструктура"

1) экшон [commitlint.yml](https://github.com/Memesaurus/SHRI_Infrastructure/blob/master/.github/workflows/commitlint.yml) чекает при пушах и пулах (помимо того, что это настроено локально)
2) [пример PR, который чекает коммиты и тесты](https://github.com/Memesaurus/SHRI_Infrastructure/pull/31). Без пройденных тестов мердж сделать нельзя
![image](https://github.com/Memesaurus/SHRI_Infrastructure/assets/105174367/6365d6a2-3457-4d7e-bd6e-ca45f8a2f0df)
3) при пуше с тегом с релизным тегом запускается экшон [релиза](https://github.com/Memesaurus/SHRI_Infrastructure/blob/master/.github/workflows/release.yml) и [тестов](https://github.com/Memesaurus/SHRI_Infrastructure/blob/master/.github/workflows/tests.yml)

Чтобы воркфлоу работали корректно, тег должен стоять на последнем коммите релиза (вообще это неправильный подход, но оно работает)

Если тесты выполнились, и раз в 10 минут, запускается [деплой](https://github.com/Memesaurus/SHRI_Infrastructure/blob/master/.github/workflows/deploy.yml), который чекает последние, или триггернувшие релизные теги на наличие лейбла *ready for deployment*. Если тег есть, пушит в деплой ветку данные, и оставляет запись об этом в релизном реестре.

Данные в релизном реестре дублируются в сам релиз. Баджик тестов содержит в себе линк на соответствующий прогон воркфлол

![image](https://github.com/Memesaurus/SHRI_Infrastructure/assets/105174367/d859df01-fff3-4eac-a04a-ed716cd3512f)
Пример инишиал коммита.

![image](https://github.com/Memesaurus/SHRI_Infrastructure/assets/105174367/4c3aa0fd-00b7-41b8-9a94-094ef02aecdb)
Прмиер релиза с хотфиксами, между "хотфиксами" после релиза есть пустая линия

![image](https://github.com/Memesaurus/SHRI_Infrastructure/assets/105174367/cf81c2e6-34c8-4ad5-80a6-199ba345d996)
После выставления соотвествующего лейбла, в течение 10 минут или при хотфиксах появляется сообщение о том, что релиз был запушен в деплойную ветку, с ссылками на сам пейджес и на прогон воркфлоу. Также добавлятся дополнительный лебл *deployed* (сделано для того, чтобы прогоны по расписанию не триггерились на уже задеплоенные релизы)

Прогон по расписанию не проверяет наличие выполнных тестов. Это связано с тем, что пометка релиза - это не автоматический процесс. Подразумевается, что релиз с упавшими тестами деплоить никто не будет.

БольшАя часть работы сделана с помощью [actions/github-script](https://github.com/actions/github-script). Там делаются запросы к апи и реализуется логика

4)
![image](https://github.com/Memesaurus/SHRI_Infrastructure/assets/105174367/4bccd959-4733-4ffe-8e7f-091ac0eb2acb)
