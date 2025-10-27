# Hur lägger jag till bilder i projektet?

## 1. Öppna projektmappen

Projektet ligger på: **`C:\Users\User\sj-stadm-leriab`**

### Alternativ A: Via Windows Explorer
1. Öppna Windows Explorer (Win + E)
2. Navigera till: `C:\Users\User\sj-stadm-leriab`
3. Gå in i mappen `images`

### Alternativ B: Via Cursor/VS Code
1. Öppna Cursor/VS Code
2. File → Open Folder
3. Välj: `C:\Users\User\sj-stadm-leriab`

## 2. Bildstruktur

```
sj-stadm-leriab/
├── images/
│   ├── about/          ← Lägg "om oss"-bilder här
│   ├── projekt/        ← Lägg projektbilder här
│   ├── services/       ← Lägg tjänstebilder här
│   ├── hero/           ← Lägg hero/bakgrundsbilder här
│   └── facebook/       ← Lägg Facebook-bilder här
```

## 3. Lägg till bilder

### Steg-för-steg:

1. **Preparera bilderna:**
   - Optimera bilderna med Squoosh (https://squoosh.app)
   - Konvertera till WebP-format
   - Ta bort onödig metadata

2. **Spara bilderna:**
   - Kopiera bildfilerna till rätt mapp i Windows Explorer
   - Eller dra och släpp i Cursor/VS Code i filnavigatorn till vänster

3. **Exempel för about-bilden:**
   - Filnamn: `om-oss-foretag.webp`
   - Placering: `images/about/om-oss-foretag.webp`
   - Fallback: `images/about/om-oss-foretag.jpg` (optional)

## 4. Så här lägger du till bilder i Windows Explorer:

1. Öppna Windows Explorer
2. Navigera till `C:\Users\User\sj-stadm-leriab\images\about`
3. Högerklicka i mappen → Nya → Kortgenväg (eller kopiera och klistra in bilder)
4. Eller dra bilderna från din dator direkt in i mappen

## 5. Så här lägger du till bilder i Cursor:

1. Öppna Cursor
2. Öppna projektmappen (File → Open Folder → välj `sj-stadm-leriab`)
3. I filnavigatorn till vänster, högerklicka på `images/about`
4. Välj "Reveal in File Explorer" för att öppna mappen
5. Dra bilderna dit, eller kopiera/klistra in

## 6. Verifiera att bilderna är korrekta:

Efter att du lagt till bilderna, kontrollera att:
- ✅ Bilden finns i rätt mapp
- ✅ Filnamnet matchar vad som står i HTML:en
- ✅ Filen är i WebP-format (eller JPEG som fallback)

## Problem att leta efter:

- **Bilden syns inte?** 
  - Kontrollera att filnamnet är exakt rätt (case-sensitive)
  - Kontrollera att bilden är i rätt mapp

- **Kan inte lägga till filer?**
  - Kontrollera att du har skrivrättigheter i mappen
  - Försök öppna Windows Explorer direkt

- **Cursor syns inte filerna?**
  - Tryck på refresh-knappen i filnavigatorn
  - Stäng och öppna projektmappen igen

## Snabbgenväg:

**Öppna bildmappen direkt:**
```
C:\Users\User\sj-stadm-leriab\images\about
```

Kopiera denna sökväg och klistra in i Windows Explorer's adressfält, eller högerklicka på mappen i Cursor och välj "Reveal in File Explorer".

