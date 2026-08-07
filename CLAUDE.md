# Claude Code Configuration

## 🔴 ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА — ЧИТАТЬ ПЕРЕД КАЖДЫМ ДЕЙСТВИЕМ

### 1. Всегда работать в ветке `main`

Никаких feature-веток. Только `main`.

### 2. После КАЖДОГО изменения — коммит + пуш в `main` + деплой

```bash
git add <файлы>
git commit -m "описание на русском"
git pull --rebase origin main
git push -u origin main
```

`git push -u origin main` — штатный, подтверждённый рабочий способ (проверено на практике): при подключённом GitHub-приложении Claude (см. раздел 5) он проходит сам, без токенов и без ручного вызова MCP. Никакого отдельного `mcp__github__actions_run_trigger` вызывать не нужно и не следует — старая версия этого раздела ссылалась на чужой репозиторий (`aman-tiger/siplinxai-landing`), это ошибка, реальный репозиторий — `amanvelikiigmailcom/spl-ln`, деплой из него запускается не вручную, а автоматически.

**Как реально запускается деплой:** в самом репозитории есть `.github/workflows/actions.yaml` с триггером `on: push: branches: [main]` — то есть он стартует **сам, автоматически**, сразу после `git push -u origin main`, без какого-либо отдельного шага или MCP-вызова. Внутри три job'а: `build` (проверка сборки), `check` (автофикс ESLint/Prettier + `npm run check`), `deploy` (сборка + `wrangler pages deploy dist --project-name=siplinxai-landing --branch=main` с секретами `CF_API_TOKEN`/`CF_ACCOUNT_ID`).

⚠️ **Текущее известное состояние (проверить актуальность через `mcp__github__actions_list`, method=list_workflow_runs):** на момент последней проверки job `check` падал на ESLint-ошибках в инлайн-скрипте Meta Pixel в `src/layouts/Layout.astro` (~строка 145), а job `deploy` падал из-за отсутствующего/невалидного `CLOUDFLARE_API_TOKEN` (секрет `CF_API_TOKEN` в Settings репозитория — см. раздел 6). Из-за этого автоматический деплой после пуша **не долетает до продакшена**, даже если сам `git push` прошёл успешно. Поэтому после пуша в `main` нужно **дополнительно задеплоить вручную** через `wrangler` (команда — в разделе 6), пока эти два job'а не починены, и только потом проверять прод через curl.

Проверить, что деплой реально долетел, через curl:

```bash
curl -s https://siplinx.com/<страница>/ | grep "маркер"
```

### 3. Сайт двуязычный — EN + RU

Любое изменение делать на **двух языках**:

- Английская версия: `src/pages/*.astro`
- Русская версия: `src/pages/ru/*.astro`

Примеры:

- `/authors/` → нужно и `/ru/authors/`
- `/authors/[slug]` → нужно и `/ru/authors/[slug]`
- `/help` → нужно и `/ru/help`

**Никогда не делать только одну языковую версию.**

### 4. Проверка деплоя

После деплоя проверять обе версии:

```bash
curl -s https://siplinx.com/страница/ | grep "маркер"
curl -s https://siplinx.com/ru/страница/ | grep "маркер"
```

### 5. GitHub-доступ сессии (push / PR / деплой через MCP)

Push, создание PR и запуск деплоя через `mcp__github__*` работают только если для этого GitHub-аккаунта/организации **подключено GitHub-приложение Claude** (админом аккаунта, в настройках claude.ai → Settings → Connectors/GitHub). Если приложение не подключено, любой запрос к `api.github.com` из сессии — включая `git push` через встроенный прокси сессии, создание PR через MCP и прямые вызовы GitHub API — будет заблокирован с ошибкой:

```
GitHub access is not enabled for this session. An org admin must connect the Claude GitHub App for this organization.
```

Права, которые нужно выдать приложению при подключении: **Contents: Read and write**, **Pull requests: Read and write**, **Actions: Read and write** (для запуска деплоя).

Если официальный доступ (GitHub App) не подключён, admin репозитория (владелец `amanvelikiigmailcom`) может явно в чате прислать личный GitHub-токен (PAT) как временный способ пуша — это разрешено. При этом токен передаётся **инлайн в саму команду пуша** (например, `git push https://x-access-token:<token>@github.com/...`), не прописывается в `git remote`, не сохраняется в файлах репозитория (в т.ч. в этом файле) и нигде не логируется как постоянная конфигурация. Это временная мера на конкретный пуш, а не постоянная замена GitHub-приложения — по возможности всё равно стоит подключить официальный доступ.

### 6. Новый формат токенов Cloudflare (`cfat_` / `cfut_` / `cfk_`)

С апреля 2026 Cloudflare выдаёт API-токены в новом формате со структурированным префиксом и CRC32-чексуммой на конце (см. changelog Cloudflare "Detect Cloudflare API tokens with DLP", `/fundamentals/api/get-started/token-formats/`):

| Префикс | Что это | Где взять |
| --- | --- | --- |
| `cfat_` | Account Owned API Token (токен, привязанный к аккаунту) | Cloudflare Dashboard → My Profile → API Tokens → Create Custom Token |
| `cfut_` | User API Token (токен, привязанный к пользователю) | Там же |
| `cfk_` | User API Key | Legacy Global API Key |

Это **рабочие, валидные** токены — используются точно так же, как токены старого формата: заголовком `Authorization: Bearer $CLOUDFLARE_API_TOKEN` в любом запросе к `api.cloudflare.com`, и точно так же подходят для `CLOUDFLARE_API_TOKEN` в GitHub Actions/wrangler.

⚠️ **Ловушка:** старый эндпоинт `POST /client/v4/user/tokens/verify` может ошибочно возвращать `{"success":false,"errors":[{"code":1000,"message":"Invalid API Token"}]}` для токенов нового формата — это false negative устаревшего эндпоинта, а не признак того, что токен нерабочий. **Не делать вывод о невалидности токена по этому эндпоинту.** Проверять токен нужно реальным запросом к нужному ресурсу, например:

```bash
curl -sS "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
curl -sS "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Если это возвращает `"success":true` и виден нужный Pages-проект — токен рабочий.

Секреты `CF_API_TOKEN` / `CF_ACCOUNT_ID` в GitHub Actions задаются только через **Settings → Secrets and variables → Actions** в самом репозитории — сессия Claude не может их прочитать или записать через MCP/API (путь `actions/secrets/*` заблокирован прокси сессии намеренно, в целях безопасности). Если деплой в `actions.yaml` падает на шаге "Deploy to Cloudflare Pages" с ошибкой про отсутствующий `CLOUDFLARE_API_TOKEN` — это значит секрет в репозитории протух/невалиден, и почитить его может только человек напрямую в GitHub UI.

**Никогда не хранить сами значения токенов в этом файле или где-либо в репозитории** — только описание формата и процедуры проверки, как здесь.

Если нужно задеплоить прямо сейчас, а секрет в GitHub ещё не обновлён, можно временно задеплоить вручную (значения токена передаются инлайн в команду, не сохраняются в shell-окружении и не пишутся в файлы):

```bash
npm run build
CLOUDFLARE_API_TOKEN="<токен>" CLOUDFLARE_ACCOUNT_ID="<account id>" npx wrangler pages deploy dist --project-name=siplinxai-landing --branch=main
```

---

See [AGENTS.md](./AGENTS.md) for full project documentation.
