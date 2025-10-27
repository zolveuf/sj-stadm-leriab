# Bildformat Guide för Sjöstedt Måleri AB

## Rekommenderade Bildformat

### 🥇 **WebP** (Bästa valet)
- **När:** Alla foton och bilder på webbplatsen
- **Fördelar:** 
  - 25-35% mindre filstorlek än JPEG med samma kvalitet
  - Stödjer transparens
  - Modern standard som alla moderna webbläsare stödjer
- **Filstorlek:** Max 500KB per bild efter optimering
- **Kvalitet:** 80-85% är oftast perfekt

### 🥈 **JPEG** (Fallback)
- **När:** Som backup för äldre webbläsare
- **Fördelar:** Universell kompatibilitet
- **Filstorlek:** Max 800KB per bild
- **Kvalitet:** 85-90%

### 🥉 **PNG**
- **När:** Endast för logotyper eller bilder med text som behöver skarp kanter
- **Tänk på:** Mycket större filstorlek än WebP/JPEG

## Rekommenderade Bildstorlekar

### Hero-bilder (index.html)
- **Storlek:** 1920x1080px eller 2560x1440px
- **Filstorlek:** Max 300KB (WebP) eller 500KB (JPEG)
- **Format:** WebP med JPEG fallback

### Projektbilder (projekt.html)
- **Före/Efter bilder:** 1200x800px
- **Grid-bilder:** 800x600px
- **Filstorlek:** Max 200KB per bild (WebP)
- **Format:** WebP med JPEG fallback

### Thumbnails (Projektkort)
- **Storlek:** 400x300px
- **Filstorlek:** Max 50KB per bild
- **Format:** WebP

### Service-kort bilder
- **Storlek:** 600x400px
- **Filstorlek:** Max 150KB per bild
- **Format:** WebP

### Facebook-posts bilder
- **Storlek:** 1200x630px (Facebook rekommenderar detta)
- **Filstorlek:** Max 200KB
- **Format:** JPEG (Facebook stödjer inte WebP)

## Optimering Verktyg

### Online verktyg (Gratis):
1. **Squoosh** (https://squoosh.app) - Google's bildkomprimeringsverktyg
2. **TinyPNG** (https://tinypng.com) - Komprimerar JPEG och PNG
3. **ImageOptim** - För Mac användare

### Instruktioner för Squoosh:
1. Ladda upp din bild
2. Välj "WebP" som format
3. Justera kvalitet till 80-85%
4. Ladda ner den optimerade bilden

## Responsive Bilder (Framtida Förbättring)

För bästa prestanda bör du använda `<picture>` elementet:

```html
<picture>
  <source srcset="bild.avif" type="image/avif">
  <source srcset="bild.webp" type="image/webp">
  <img src="bild.jpg" alt="Beskrivning" loading="lazy">
</picture>
```

Detta laddar:
- AVIF för moderna webbläsare (minst filstorlek)
- WebP för de flesta webbläsare
- JPEG som fallback för äldre webbläsare

## Namngivning av Filer

Använd beskrivande namn:
- ✅ `fasade-villa-vaxjo-2024-fore.webp`
- ✅ `interior-lagenhet-jonkoping-2024-efter.webp`
- ❌ `IMG_1234.jpg`
- ❌ `bild1.png`

## Checklista före Uppladdning

- [ ] Bilden är optimerad (max storlek enligt rekommendationer)
- [ ] Format är WebP (eller JPEG som fallback)
- [ ] Bilden har beskrivande filnamn
- [ ] Alt-text är ifylld för tillgänglighet
- [ ] Bilden är rätt storlek för dess användning
- [ ] Kvalitet ser bra ut på olika skärmar

## Exempel på Bildstruktur

```
/images/
  /projekt/
    /fasade/
      villa-vaxjo-2024-fore.webp
      villa-vaxjo-2024-efter.webp
    /interior/
      lagenhet-jonkoping-2024-fore.webp
      lagenhet-jonkoping-2024-efter.webp
  /hero/
    hero-background.webp
  /services/
    bostadsmalning.webp
    foretagsmalning.webp
```

## Snabbfakta

- **WebP** = Bästa valet för 95% av bilderna
- **JPEG** = Bra fallback
- **PNG** = Endast för logotyper
- **Max filstorlek:** 500KB för stora bilder, 200KB för projektbilder
- **Optimera ALDRIG** före att ladda upp bilder

