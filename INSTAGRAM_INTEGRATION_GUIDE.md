# Instagram Integration Guide - Custom Design

Denna guide visar hur du integrerar Instagram-inlägg på din hemsida med din anpassade design.

---

## 🎯 Översikt

Det finns flera sätt att integrera Instagram-inlägg. Vi rekommenderar **Instagram Basic Display API** (GRATIS) eller **Juicer.io Free Plan** för full kontroll över designen utan kostnad.

---

## 📱 Metod 1: Instagram Basic Display API (GRATIS - Rekommenderat)

Instagram Basic Display API är **helt gratis** och ger dig full kontroll över designen. Detta är den bästa lösningen för att matcha din exakta design.

För full kontroll över designen och för att matcha din exakta stil, använd Instagram Basic Display API.

### Steg 1: Skapa Facebook App

1. Gå till [developers.facebook.com](https://developers.facebook.com/)
2. Klicka på **"My Apps"** → **"Create App"**
3. Välj **"Consumer"** som app-typ
4. Fyll i app-information:
   - App Name: `Sjöstedts Måleri Website`
   - Contact Email: `sjostedtsmaleri@gmail.com`
5. Lägg till **Instagram Basic Display** produkt

### Steg 2: Konfigurera Instagram Basic Display

1. I Instagram Basic Display-inställningar:
   - Lägg till **Valid OAuth Redirect URIs**: `https://malerisjostedts.se/`
   - Lägg till **Deauthorize Callback URL**: `https://malerisjostedts.se/`
   - Lägg till **Data Deletion Request URL**: `https://malerisjostedts.se/`

2. Skapa **Instagram App ID** och **Instagram App Secret**
3. Lägg till **Test Users** (din Instagram-användare)

### Steg 3: Generera Access Token

1. Gå till **"Basic Display"** → **"User Token Generator"**
2. Lägg till din Instagram-användare som test user
3. Generera token och kopiera den

### Steg 4: Skapa JavaScript-fil

Skapa en fil `instagram-feed.js`:

```javascript
// Instagram Feed Configuration
const INSTAGRAM_ACCESS_TOKEN = 'DIN_ACCESS_TOKEN_HÄR';
const INSTAGRAM_USER_ID = 'DIN_USER_ID_HÄR'; // Hittas i API-svaret

async function fetchInstagramPosts() {
    const container = document.querySelector('.instagram-feed-grid');
    if (!container) return;

    container.innerHTML = '<div class="loading-spinner-small"></div><p>Laddar Instagram-inlägg...</p>';
    container.classList.add('loading-state');

    try {
        // Hämta senaste inläggen
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayInstagramPosts(data.data.slice(0, 9)); // Visa 9 senaste inläggen
        } else {
            container.innerHTML = '<p>Inga Instagram-inlägg att visa just nu.</p>';
        }
    } catch (error) {
        console.error('Fel vid hämtning av Instagram-inlägg:', error);
        container.innerHTML = '<p>Kunde inte ladda Instagram-inlägg. Försök igen senare.</p>';
    } finally {
        container.classList.remove('loading-state');
    }
}

function displayInstagramPosts(posts) {
    const container = document.querySelector('.instagram-feed-grid');
    if (!container) return;

    container.innerHTML = ''; // Rensa befintliga inlägg

    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'instagram-post fade-in';

    const imageUrl = post.media_type === 'VIDEO' 
        ? (post.thumbnail_url || post.media_url)
        : post.media_url;

    postDiv.innerHTML = `
        <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" aria-label="Öppna Instagram-inlägg">
            <div class="instagram-post-image">
                <img src="${imageUrl}" 
                     alt="${post.caption ? post.caption.substring(0, 100) : 'Instagram-inlägg från Sjöstedts Måleri AB'}" 
                     loading="lazy">
                ${post.media_type === 'VIDEO' ? '<div class="video-badge">▶</div>' : ''}
            </div>
        </a>
    `;

    return postDiv;
}

// Ladda inlägg när sidan är klar
document.addEventListener('DOMContentLoaded', () => {
    fetchInstagramPosts();
    // Uppdatera var 30:e minut
    setInterval(fetchInstagramPosts, 30 * 60 * 1000);
});
```

### Steg 5: Lägg till HTML-struktur

I `index.html`, i social media-sektionen:

```html
<!-- Social Media Section -->
<section class="social-media">
    <div class="container">
        <h2>Följ Oss på Sociala Medier</h2>
        <p>Se våra senaste projekt och få inspiration för ditt nästa måleriprojekt</p>
        
        <!-- Instagram Feed Grid -->
        <div class="instagram-feed-wrapper">
            <div class="instagram-feed-grid" id="instagram-feed">
                <!-- Inlägg kommer att laddas här automatiskt -->
            </div>
        </div>

        <div class="social-links">
            <!-- Sociala länkar -->
        </div>
    </div>
</section>

<!-- Lägg till script innan </body> -->
<script src="instagram-feed.js"></script>
```

### Steg 6: CSS är redan klart!

CSS-stilarna finns redan i `styles.css` (rad 1186-1233). De matchar din design perfekt!

---

## 🎨 Metod 2: Juicer.io Free Plan (Gratis Alternativ)

Juicer.io erbjuder en **gratis plan** som är perfekt för små webbplatser.

### Steg 1: Skapa Gratis Konto

1. Gå till [juicer.io](https://www.juicer.io/)
2. Klicka på **"Sign Up Free"**
3. Välj **Free Plan** (gratis för upp till 1 social feed)
4. Skapa konto med email eller Google

### Steg 2: Lägg till Instagram

1. Efter inloggning, klicka på **"Add Social Feed"**
2. Välj **Instagram**
3. Logga in med ditt Instagram-konto (`sjostedtsmaleri`)
4. Godkänn behörigheter

### Steg 3: Anpassa Design

1. Gå till **"Design"**-fliken
2. Anpassa färger för att matcha din design:
   - Background: `#f8f9fa`
   - Text: `#333333`
   - Links: `#1a1a1a`
3. Välj **Grid Layout** med 3 kolumner
4. Spara ändringar

### Steg 4: Hämta Embed-kod

1. Gå till **"Embed"**-fliken
2. Kopiera JavaScript-koden
3. Den kommer se ut ungefär så här:
```html
<script src="https://www.juicer.io/embed.js"></script>
<link href="https://www.juicer.io/embed.css" media="all" rel="stylesheet" type="text/css"/>
<ul class="juicer-feed" data-feed-id="DIN_FEED_ID" data-per="9"></ul>
```

### Steg 5: Lägg till på din sida

I `index.html`, i social media-sektionen:

```html
<!-- Social Media Section -->
<section class="social-media">
    <div class="container">
        <h2>Följ Oss på Sociala Medier</h2>
        <p>Se våra senaste projekt och få inspiration för ditt nästa måleriprojekt</p>
        
        <!-- Juicer.io Feed -->
        <div class="instagram-feed-wrapper">
            <script src="https://www.juicer.io/embed.js"></script>
            <link href="https://www.juicer.io/embed.css" media="all" rel="stylesheet" type="text/css"/>
            <ul class="juicer-feed" data-feed-id="DIN_FEED_ID" data-per="9"></ul>
        </div>

        <div class="social-links">
            <!-- Dina sociala länkar -->
        </div>
    </div>
</section>
```

### Steg 6: Anpassa CSS

Lägg till detta i `styles.css` för att matcha din design:

```css
.juicer-feed {
    list-style: none;
    padding: 0;
    margin: 0;
}

.juicer-feed .j-item {
    border-radius: 0 !important;
    box-shadow: 0 3px 10px var(--shadow) !important;
}

.juicer-feed .j-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}
```

---

## 🔧 Metod 3: Instagram Basic Display API (Full Kontroll - GRATIS)

---

## 🔒 Säkerhet & Best Practices

### ⚠️ VIKTIGT för Instagram Basic Display API:

1. **Lägg INTE access token direkt i JavaScript!**
   - Skapa en backend-endpoint som hanterar API-anropen
   - Använd server-side rendering eller serverless functions

2. **Exempel på säker backend (Node.js/Express):**

```javascript
// backend/instagram.js
const express = require('express');
const router = express.Router();

router.get('/api/instagram-posts', async (req, res) => {
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Kunde inte hämta Instagram-inlägg' });
    }
});
```

3. **Uppdatera `instagram-feed.js` för att använda backend:**

```javascript
const response = await fetch('/api/instagram-posts');
const data = await response.json();
```

---

## 📋 Checklista

- [ ] Välj metod (Instagram Basic Display API rekommenderas för gratis + full kontroll)
- [ ] Skapa konto/konfigurera API (gratis)
- [ ] Lägg till HTML-struktur i `index.html`
- [ ] Lägg till JavaScript-fil (om metod 1 eller 3)
- [ ] Testa att inlägg visas korrekt
- [ ] Anpassa CSS om nödvändigt
- [ ] Testa på mobil och desktop

---

## 🆘 Felsökning

### Inlägg visas inte
- Kontrollera att access token är korrekt (metod 2)
- Kontrollera att widget-ID är korrekt (metod 1)
- Kontrollera konsolen för felmeddelanden (F12)

### Design matchar inte
- Anpassa CSS i `styles.css`
- Använd SnapWidget's customization-options
- Kontrollera att dina CSS-klasser används korrekt

### CORS-fel (metod 2)
- Använd backend-endpoint istället för direkt API-anrop
- Konfigurera CORS på servern

---

## 📚 Ytterligare Resurser

- [SnapWidget Dokumentation](https://snapwidget.com/docs)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Juicer.io Dokumentation](https://www.juicer.io/help)

---

**Rekommendation:** 

- **Instagram Basic Display API (Metod 1)** - Bäst för full kontroll och matchning av din design. GRATIS men kräver lite mer setup.
- **Juicer.io Free Plan (Metod 2)** - Enklast att implementera och helt GRATIS. Bra alternativ om du vill ha något snabbt.
- **Instagram Basic Display API (Metod 3)** - Samma som Metod 1, men med backend för säkerhet.

För din sida rekommenderar vi **Metod 1 (Instagram Basic Display API)** eftersom du redan har CSS-stilar klara och vill ha full kontroll över designen.

