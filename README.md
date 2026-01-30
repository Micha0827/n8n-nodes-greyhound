# n8n-nodes-greyhound

n8n community node for the GREYHOUND DMS REST API

[![npm version](https://badge.fury.io/js/n8n-nodes-greyhound.svg)](https://badge.fury.io/js/n8n-nodes-greyhound)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Deutsch](#deutsch) | [English](#english)

---

## English

This is an n8n community node that lets you use the GREYHOUND DMS REST API in your n8n workflows.

[GREYHOUND](https://greyhound-software.com/) is a document management system (DMS) that provides a REST API for integration.

### Features

- **Colors Resource**: Retrieve all colors or get a specific color by ID
- **Items Resource**: Retrieve all items or get a specific item by ID
  - Filter items by color IDs
  - Pagination support with offset parameter
- **Basic Authentication**: Secure access with username and password
- **Flexible Filtering**: Filter items using JSON-formatted query parameters

### Installation

#### Community Nodes (Recommended)

1. In n8n go to **Settings** > **Community Nodes**
2. Select **Install a community node**
3. Enter `n8n-nodes-greyhound` and install

#### Manual Installation

```bash
npm install n8n-nodes-greyhound
```

### Configuration

#### Credentials

The node requires GREYHOUND API credentials:

1. **Base URL**: The URL of your GREYHOUND REST API instance (e.g., `https://your-instance.com/rest`)
2. **Username**: Your username for authentication
3. **Password**: Your password for authentication

### Available Operations

#### Colors Resource

- **Get All**: Retrieve all available colors
  - Optional: `offset` - Number of results to skip (API returns 101 results by default)
- **Get**: Retrieve a single color by ID

#### Items Resource

- **Get All**: Retrieve all available items
  - Optional: Filter by `colorIds` (comma-separated integer IDs)
  - Optional: `offset` - Number of results to skip (API returns 101 results by default)
- **Get**: Retrieve a single item by ID

### Usage Example

1. Create a new credential of type "GREYHOUND API"
2. Enter your Base URL (including `/rest` path), Username, and Password
3. Add the GREYHOUND node to your workflow
4. Select the desired Resource (Colors or Items)
5. Select the desired Operation
6. Configure parameters based on the operation

### API Details

This node uses the GREYHOUND REST API with Basic Authentication.

#### Endpoints

- `GET /colors` - Retrieve all colors (with optional offset parameter)
- `GET /colors/{id}` - Retrieve a single color
- `GET /items` - Retrieve all items (with filter as JSON string in query parameter)
- `GET /items/{id}` - Retrieve a single item

#### Request Structure for Items (getAll)

```
GET /items?filter={"ColorRefs":[1,2,3]}&offset=0
```

The API returns 101 results by default.

#### Query Parameters

For `getAll` operations:

**Pagination:**
- `offset` - Number of results to skip (default: 0)
  - API returns 101 results by default
  - Example: `offset=101` for the second "page"
  - Example: `offset=200` to get results 200-300

**Filters for Items:**
- `filter` - JSON string with filter object
  - `ColorRefs` - Array of integer IDs to filter by colors
  - Input in node: Comma-separated values (e.g., `1,2,3`)
  - Automatically converted to JSON: `{"ColorRefs":[1,2,3]}`

### Development

```bash
# Watch mode for development
npm run dev

# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build
```

### Resources

- [GREYHOUND Software](https://greyhound-software.com/)
- [GREYHOUND API Documentation](https://greyhound-software.com/docs/rest)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

### License

MIT

### Support

For issues or questions, please create an issue in the repository.

---

## Deutsch

Dies ist eine n8n Community Node, mit der Sie die GREYHOUND DMS REST API in Ihren n8n-Workflows verwenden können.

[GREYHOUND](https://greyhound-software.com/) ist ein Dokumentenmanagementsystem (DMS), das eine REST API für die Integration bereitstellt.

### Funktionen

- **Colors Resource**: Alle Farben abrufen oder eine bestimmte Farbe nach ID abrufen
- **Items Resource**: Alle Items abrufen oder ein bestimmtes Item nach ID abrufen
  - Items nach Farb-IDs filtern
  - Pagination-Unterstützung mit Offset-Parameter
- **Basic Authentication**: Sicherer Zugriff mit Benutzername und Passwort
- **Flexible Filterung**: Items mit JSON-formatierten Query-Parametern filtern

### Installation

#### Community Nodes (Empfohlen)

1. In n8n gehe zu **Settings** > **Community Nodes**
2. Wähle **Install a community node**
3. Gebe `n8n-nodes-greyhound` ein und installiere

#### Manuelle Installation

```bash
npm install n8n-nodes-greyhound
```

### Konfiguration

#### Credentials

Die Node benötigt GREYHOUND API Credentials:

1. **Base URL**: Die URL deiner GREYHOUND REST API Instanz (z.B. `https://your-instance.com/rest`)
2. **Username**: Dein Benutzername für die Authentifizierung
3. **Password**: Dein Passwort für die Authentifizierung

### Verfügbare Operationen

#### Colors Resource

- **Get All**: Ruft alle verfügbaren Farben ab
  - Optional: `offset` - Anzahl zu überspringende Ergebnisse (API gibt standardmäßig 101 Ergebnisse zurück)
- **Get**: Ruft eine einzelne Farbe anhand ihrer ID ab

#### Items Resource

- **Get All**: Ruft alle verfügbaren Items ab
  - Optional: Filter nach `colorIds` (kommagetrennte Integer-IDs)
  - Optional: `offset` - Anzahl zu überspringende Ergebnisse (API gibt standardmäßig 101 Ergebnisse zurück)
- **Get**: Ruft ein einzelnes Item anhand seiner ID ab

### Verwendungsbeispiel

1. Erstelle eine neue Credential vom Typ "GREYHOUND API"
2. Gebe deine Base URL (inkl. `/rest`), Username und Password ein
3. Füge die GREYHOUND Node zu deinem Workflow hinzu
4. Wähle die gewünschte Resource (Colors oder Items)
5. Wähle die gewünschte Operation
6. Konfiguriere die Parameter je nach Operation

### API Details

Diese Node verwendet die GREYHOUND REST API Schnittstelle mit Basic Authentication.

#### Endpunkte

- `GET /colors` - Alle Farben abrufen (mit optionalem offset Parameter)
- `GET /colors/{id}` - Einzelne Farbe abrufen
- `GET /items` - Alle Items abrufen (mit Filter als JSON-String im Query Parameter)
- `GET /items/{id}` - Einzelnes Item abrufen

#### Request-Struktur für Items (getAll)

```
GET /items?filter={"ColorRefs":[1,2,3]}&offset=0
```

Die API gibt standardmäßig 101 Ergebnisse zurück.

#### Query Parameter

Für `getAll` Operationen:

**Paging:**
- `offset` - Anzahl der zu überspringenden Ergebnisse (Standard: 0)
  - API gibt standardmäßig 101 Ergebnisse zurück
  - Beispiel: `offset=101` für die zweite "Seite"
  - Beispiel: `offset=200` um Ergebnisse 200-300 zu erhalten

**Filter für Items:**
- `filter` - JSON-String mit Filter-Objekt
  - `ColorRefs` - Array von Integer-IDs zum Filtern nach Farben
  - Eingabe in der Node: Kommagetrennte Werte (z.B. `1,2,3`)
  - Wird automatisch zu JSON konvertiert: `{"ColorRefs":[1,2,3]}`

### Entwicklung

```bash
# Watch mode für Entwicklung
npm run dev

# Format Code
npm run format

# Lint Code
npm run lint

# Build für Produktion
npm run build
```

### Lokale Entwicklung

```bash
# Clone oder kopiere dieses Repository
cd n8n-nodes-greyhound

# Installiere Dependencies
npm install

# Build das Projekt
npm run build

# Verlinke das Paket lokal (für n8n Entwicklung)
npm link

# In deinem n8n Verzeichnis
cd ~/.n8n
npm link n8n-nodes-greyhound
```

### Ressourcen

- [GREYHOUND Software](https://greyhound-software.com/)
- [GREYHOUND API Dokumentation](https://greyhound-software.com/docs/rest)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

### Lizenz

MIT

### Support

Bei Problemen oder Fragen erstelle bitte ein Issue im Repository.
