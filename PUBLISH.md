# npm Publishing Anleitung / npm Publishing Guide

## Vorbereitung / Preparation

### 1. npm Account erstellen / Create npm Account

Falls noch nicht vorhanden, erstellen Sie einen Account auf [npmjs.com](https://www.npmjs.com/signup)

If you don't have one yet, create an account on [npmjs.com](https://www.npmjs.com/signup)

### 2. npm Login

```bash
npm login
```

Geben Sie Ihren npm Benutzernamen, Passwort und E-Mail-Adresse ein.

Enter your npm username, password, and email address.

### 3. Repository URLs anpassen / Update Repository URLs

**WICHTIG / IMPORTANT:** Vor dem Veröffentlichen müssen Sie in der [package.json](package.json) die Repository-URLs anpassen:

Before publishing, you must update the repository URLs in [package.json](package.json):

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_USERNAME/n8n-nodes-greyhound.git"
},
"homepage": "https://github.com/YOUR_USERNAME/n8n-nodes-greyhound#readme",
"bugs": {
  "url": "https://github.com/YOUR_USERNAME/n8n-nodes-greyhound/issues"
}
```

Ersetzen Sie `YOUR_USERNAME` mit Ihrem GitHub-Benutzernamen.

Replace `YOUR_USERNAME` with your GitHub username.

Optional können Sie auch den `author` in der package.json anpassen:

Optionally, you can also update the `author` field in package.json:

```json
"author": "Ihr Name <ihre.email@example.com>"
```

### 4. Projekt builden / Build the Project

```bash
npm run build
```

Dies kompiliert den TypeScript-Code und kopiert die Icons in den `dist/` Ordner.

This compiles the TypeScript code and copies the icons to the `dist/` folder.

### 5. Package testen / Test the Package

```bash
# Lokales Testen mit npm link
# Local testing with npm link
npm link

# In Ihrem n8n Verzeichnis
# In your n8n directory
cd ~/.n8n
npm link n8n-nodes-greyhound

# n8n neu starten und die Node testen
# Restart n8n and test the node
```

### 6. Überprüfen, was veröffentlicht wird / Check What Will Be Published

```bash
npm pack --dry-run
```

Dies zeigt alle Dateien, die im npm Package enthalten sein werden.

This shows all files that will be included in the npm package.

## Veröffentlichung / Publishing

### Erstmalige Veröffentlichung / First-time Publishing

```bash
npm publish
```

### Updates veröffentlichen / Publishing Updates

1. **Version erhöhen / Bump Version**

   ```bash
   # Patch Version (1.5.0 -> 1.5.1) für Bugfixes
   npm version patch

   # Minor Version (1.5.0 -> 1.6.0) für neue Features
   npm version minor

   # Major Version (1.5.0 -> 2.0.0) für Breaking Changes
   npm version major
   ```

2. **Änderungen pushen / Push Changes**

   ```bash
   git push
   git push --tags
   ```

3. **Veröffentlichen / Publish**

   ```bash
   npm publish
   ```

## Automatische Pre-Publish Checks

Das Package ist bereits mit einem `prepublishOnly` Script konfiguriert, das automatisch vor jedem `npm publish` ausgeführt wird:

The package is already configured with a `prepublishOnly` script that runs automatically before every `npm publish`:

```json
"prepublishOnly": "npm run build && npm run lint"
```

Dies stellt sicher, dass:
- Das Projekt erfolgreich gebaut werden kann
- Alle Lint-Regeln eingehalten werden

This ensures that:
- The project can be built successfully
- All linting rules are followed

## Package zurückziehen / Unpublish Package

**WARNUNG / WARNING:** Innerhalb von 72 Stunden nach der Veröffentlichung:

Within 72 hours of publishing:

```bash
npm unpublish n8n-nodes-greyhound@<version>
```

Nach 72 Stunden können Sie das Package nur noch als deprecated markieren:

After 72 hours, you can only mark the package as deprecated:

```bash
npm deprecate n8n-nodes-greyhound@<version> "Grund für Deprecation"
```

## Checkliste vor der Veröffentlichung / Pre-Publish Checklist

- [ ] Repository URLs in package.json aktualisiert / Repository URLs updated in package.json
- [ ] Author-Feld in package.json ausgefüllt / Author field filled in package.json
- [ ] Version ist korrekt / Version is correct
- [ ] README.md ist vollständig / README.md is complete
- [ ] LICENSE vorhanden / LICENSE present
- [ ] `npm run build` läuft ohne Fehler / `npm run build` runs without errors
- [ ] `npm run lint` läuft ohne Fehler / `npm run lint` runs without errors
- [ ] Alle Tests erfolgreich (falls vorhanden) / All tests pass (if any)
- [ ] `.npmignore` ist korrekt konfiguriert / `.npmignore` is properly configured
- [ ] Package lokal getestet / Package tested locally
- [ ] Commit und Push zu Git / Commit and push to Git

## Nach der Veröffentlichung / After Publishing

1. Überprüfen Sie die Package-Seite auf npm: https://www.npmjs.com/package/n8n-nodes-greyhound

   Check the package page on npm: https://www.npmjs.com/package/n8n-nodes-greyhound

2. Testen Sie die Installation in einer frischen n8n-Instanz:

   Test the installation in a fresh n8n instance:

   ```bash
   # In n8n: Settings > Community Nodes > Install
   # Oder / Or:
   npm install n8n-nodes-greyhound
   ```

3. Erstellen Sie ein Release auf GitHub (falls Repository vorhanden):

   Create a release on GitHub (if repository exists):

   ```bash
   # GitHub UI: Releases > Create a new release
   # Tag: v1.5.0
   # Title: Release v1.5.0
   # Description: [Beschreibung der Änderungen / Description of changes]
   ```

## Hilfreiche Links / Helpful Links

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Semantic Versioning](https://semver.org/)
