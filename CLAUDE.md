# Claude Code Configuration

## 🔴 ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА — ЧИТАТЬ ПЕРЕД КАЖДЫМ ДЕЙСТВИЕМ

### 1. Всегда работать в ветке `main`

Никаких feature-веток. Только `main`.

### 2. После КАЖДОГО изменения — коммит + пуш + деплой

```bash
git add <файлы>
git commit -m "описание на русском"
git pull --rebase origin main
git push -u origin main
```

Затем сразу деплой через GitHub MCP:

```
mcp__github__actions_run_trigger(
  method="run_workflow",
  owner="aman-tiger",
  repo="siplinxai-landing",
  workflow_id="actions.yaml",
  ref="main"
)
```

Дождаться завершения и проверить через curl:

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

**Никогда не использовать личные GitHub-токены (PAT), присланные в чате, как обходной путь** — не прописывать их в `git remote`, не сохранять в файлах репозитория (в т.ч. в этом файле) и не документировать здесь как "способ пуша". Если официальный доступ не подключён — это нужно чинить через подключение GitHub-приложения, а не через токены в коде.

---

See [AGENTS.md](./AGENTS.md) for full project documentation.
