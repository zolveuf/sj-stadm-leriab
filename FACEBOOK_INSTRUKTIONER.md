# Instruktioner för Facebook-integration

## Nuvarande layout

Facebook-sektionen visar 3 Facebook-inlägg i en grid (3 kolumner på desktop, 1 kolumn på mobil). Detta ger en professionell och snygg översikt av dina senaste inlägg.

## Så här uppdaterar du Facebook-inläggen

### Steg 1: Uppdatera inlägg
1. Öppna filen `index.html`
2. Scrolla ner till "Social Media Section" (ca rad 115)
3. Hitta de 3 `.facebook-post` elementen (rad 123-191)
4. Uppdatera innehållet för varje inlägg:
   - **Post date**: Ändra tiden
   - **Post image**: Lägg till riktiga bilder eller ändra placeholder-texten
   - **Post content**: Skriv faktiskt innehåll från dina Facebook-inlägg

**Exempel på hur du uppdaterar ett inlägg:**
```html
<div class="facebook-post">
    <div class="post-header">
        <div class="post-author">
            <div class="author-avatar">SM</div>
            <div class="author-info">
                <strong>Sjöstedt Måleri AB</strong>
                <span class="post-date">2 timmar sedan</span>
            </div>
        </div>
    </div>
    <div class="post-image">
        <div class="post-image-placeholder">Din bild kommer här</div>
    </div>
    <div class="post-content">
        <p>Ditt faktiska Facebook-inläggs text...</p>
    </div>
    <div class="post-actions">
        <span class="action-item">Gilla</span>
        <span class="action-item">Kommentera</span>
        <span class="action-item">Dela</span>
    </div>
</div>
```

### Steg 2: Lägg till riktiga bilder
För att lägga till riktiga bilder från dina Facebook-inlägg:

1. Hitta bilden från ditt Facebook-inlägg
2. Högerklicka och kopiera bildadressen
3. Ersätt `<div class="post-image-placeholder">...</div>` med:
```html
<img src="DIN_BILD_URL" alt="Projektbild" style="width: 100%; height: 200px; object-fit: cover;">
```

### Steg 3: Uppdatera Facebook-länken
Hitta Facebook-länken (ca rad 195):
```html
<a href="YOUR_FACEBOOK_URL" class="social-link-btn facebook" target="_blank">Följ oss på Facebook</a>
```

Uppdatera `YOUR_FACEBOOK_URL` med din faktiska Facebook-sida URL.

## Automatisk integration med Facebook (Avancerat)

För att få Facebook-inlägg att uppdateras automatiskt behöver du:

### Alternativ 1: Facebook Graph API
Detta kräver programmeringskunskap och ett Facebook App:
1. Skapa en Facebook App på [Facebook Developers](https://developers.facebook.com/)
2. Hämta Page Access Token
3. Använd Facebook Graph API för att hämta senaste inläggen
4. Integrera med JavaScript för att visa dem dynamiskt

### Alternativ 2: Tredjepartstjänster
Du kan använda tjänster som:
- [Juicer.io](https://www.juicer.io/) - Gratis för Facebook-feed
- [Smash Balloon](https://smashballoon.com/) - Professionell lösning
- [Widgetkit](https://www.elegantthemes.com/) - WordPress-plugin

### Alternativ 3: Manual uppdatering
Enklaste sättet är att uppdatera inläggen manuellt:
1. Kopiera text och bilder från dina Facebook-inlägg
2. Uppdatera HTML-koden i `index.html`
3. Spara och uppdatera hemsidan

**Rekommendation:** För en liten hemsida är manuell uppdatering enkelt och ger full kontroll över vad som visas.

## Responsiv design

Grid-layouten anpassar sig automatiskt:
- **Desktop (> 768px)**: 3 kolumner sida vid sida
- **Mobil (< 768px)**: 1 kolumn (inlägg staplade vertikalt)

## Design-anpassningar

Om du vill ändra layouten, öppna `styles.css` och hitta `.facebook-posts-grid` (ca rad 429):

**För 2 kolumner istället av 3:**
```css
.facebook-posts-grid {
    grid-template-columns: repeat(2, 1fr);
}
```

**För 4 kolumner:**
```css
.facebook-posts-grid {
    grid-template-columns: repeat(4, 1fr);
}
```

## Ytterligare resurser

- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Facebook Page Plugin](https://developers.facebook.com/docs/plugins/page-plugin)

