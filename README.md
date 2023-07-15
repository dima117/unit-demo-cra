# Отчёт о выполненной работе

При работе над проектом использовался `pnpm`.

При необходимости работы с проектом локально, важно установить его:

```
npm i pnpm -g
```

## Commits

Для валидации сообщений коммитов используется [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter). Настройки пакета не требуется, всё запускается автоматически после установки.

Рекомендуемый формат сообщения:

```
<type>(<scope?>): <short summary>
```

где:

- `type` - тип коммита, например *feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp*;
- `scope` - область коммита, опционально, может быть чем угодно, например *CHANGELOG|compiler|README*;
- `short summary` - краткое описание, текст в строчном регистре, без точки в конце.

Примеры:

- Плохой: `Correct spelling of CHANGELOG`;
- Хороший: `docs: correct spelling of CHANGELOG`;
- Отличный: `docs(CHANGELOG): correct spelling`.

## Linting

Для проекта добавлен и настроен `eslint`. Настройки были вынесены из `package.json` и перенесены в `.eslintrc.json`. Дополнительно добавлены исключения для тестовых файлов (модульных, так и интеграционных).

Для запуска процесса проверки необходимо воспользоваться командой:

```
pnpm run lint
```
