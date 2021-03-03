# ic-frontend

Repo for development:

## Development setup

First clone repo and CD into it.

Set api URL

```bash
echo "VUE_APP_API_URL=https://DEVAPIURL.com/" > .env.development
```

Install dependecies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

Open Webbrowser @ http://localhost:8080

## ToDO

### Login

- [x] Login mit bestehendem Konto
- [x] Registrierung ueber Invite Code
- [ ] Passwort vergessen!

### Home

- [ ] Uebersicht aller Seiten

### Project

- [x] Übersicht Projekte
  - [ ] Subprojekte anzeigen
- [x] Neues projekt erstellen (admin)
  - [ ] Subprojekte erstellen (projektmitglied)

### View

- [x] Einbindung ThreeJS
  - [x] Kamera Koordinaten an Server uebertragen
  - [ ] Avatar Modelle anhand Koordinaten laden
  - [ ] Elemente klickbar machen ( border color )
  - [ ] Materialdaten uebertragen
- [x] Einbindung Project Chatroom
  - [x] Online Status
  - [x] Sicht des anderen einnehmen anhand Koordinaten
  - [ ] Eigene Koordinaten als Link posten
- [ ] Issue Management
  - [ ] Neues Issue erstellen
  - [ ] Bim Collab Sync
  - [ ] Issues Liste
- [x] Materials
  - [ ] Materialdaten Liste und klickbar machen
- [ ] Saved Views
  - [ ] Screenshot erstellen und ablegen
- [ ] Files
  - [ ] Projekstpezifische Dateien ablegen mit Modell verknuepfen

### Chat

- [x] Uebersicht aller Chatraeume und Raumwechsel
- [ ] Neuen Allgemeinen Raum erstellen
- [ ] Neuen Private Chat erstellen
- [ ] File Upload, Emojis
- [ ] Chat Notifications

### Learnings

- [ ] Ubersicht in Karten ( Videos, PDF, externe Links )
  - [x] Neues Learning anlegen
    - [x] Youtube Vimo Vorschau
    - [ ] Links, PDF Vorschau
    - [ ] ggf Kommentarfunktion, Likes
- [ ] automatische Einbindung der Wiki Beitraege in die Uebersicht

### Project Edit

- [x] IFC - DAE - GLTF Upload
- [ ] Projektname / Beschreibung setzen
- [ ] Projekt löschen

### User Profil

- [ ] Bearbeiten persoehnliche Daten ( Profilbild, etc)
- [ ] Initialisierung einer BIM Collab Verbindung

### Admin - User Management

- [ ] Ubersicht aller Benutzer Chatrooms Projekte
- [ ] Benutzer zu Admin delegieren
- [ ] Benutzer zu Projekten zuweisen ( Batch: Emailadressen)

### Sonstiges

- [ ] ggf. VideoAudio Stream ( moeglich mit 3rd Party Services)
