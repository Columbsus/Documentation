# PAYDAY 3 Modding Documentation

Antora documentation for the community PAYDAY 3 modding toolchain:

- Custom PAYDAY 3 Unreal Engine 5.5.4 editor/modkit
- CrimeForge
- PDML
- Custom heist tooling

## First-time setup

Antora reads local content through Git, so initialize the repository before the first build:

```powershell
git init
git add .
git commit -m "Initial PAYDAY 3 modding documentation"
npm install
npm run build
```

Open:

```text
build/site/index.html
```

For subsequent installs/builds:

```powershell
npm install
npm run build
```

Once a committed `package-lock.json` exists, CI and local clean installs can be switched to `npm ci`.

## Repository layout

Documentation is split into Antora modules by subject:

- `ROOT` - landing page, terminology, contribution information
- `getting-started` - linear beginner guide
- `modkit` - custom editor and cooked-asset environment
- `crimeforge` - authoring, templates, validation and packaging
- `creating-mods` - task-oriented mod creation guides
- `custom-heists` - custom heist authoring
- `pdml` - runtime loader and APIs
- `advanced` - internals and reverse-engineering-oriented topics
- `reference` - reference material
- `troubleshooting` - error-oriented help

## Writing rules

1. Prefer a reproducible procedure over unexplained instructions.
2. Never tell users to redistribute PAYDAY 3 base-game content.
3. Clearly distinguish cooked reference content from mod-owned source content.
4. Mark experimental or incomplete functionality explicitly.
5. Do not document guessed paths, class names, or APIs as facts.
6. Put warnings immediately before the operation that can cause a problem.
7. Keep the Getting Started guide linear and beginner-friendly.
8. Put deep technical explanations in the relevant concept/reference page and link to them.

## Status labels

Use these consistently:

- **Supported** - part of the intended current workflow.
- **Experimental** - implemented but still being validated.
- **In progress** - actively being developed and not ready to rely on.
- **Known limitation** - an understood capability gap.

## Screenshots

Store screenshots in the `images/` directory belonging to the module that uses them.

Prefer descriptive names such as:

```text
crimeforge-create-mod-window.png
crimeforge-package-window.png
pdml-mod-settings.png
```

Do not commit screenshots containing private filesystem paths, account names, API keys, AES keys, or other sensitive information.
