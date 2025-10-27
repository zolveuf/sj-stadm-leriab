# Facebook Real-Time Integration - Steg för Steg Guide

## ⚠️ Viktigt: Det är GRATIS!

Facebook Graph API är **helt gratis** att använda. Det finns ingen kostnad för att hämta och visa dina Facebook-inlägg på din hemsida.

---

## Hur det fungerar

När du lägger ut ett inlägg på din Facebook-sida, syns det automatiskt på din hemsida utan att du behöver göra något manuellt.

---

## Steg-för-steg: Koppla Facebook (Teknisk väg)

### Steg 1: Skapa Facebook App

1. Gå till [Facebook Developers](https://developers.facebook.com/)
2. Logga in med ditt Facebook-konto
3. Klicka på "Mina appar" → "Skapa app"
4. Välj typ: "Företag" eller "Affärsverksamhet"
5. Fyll i:
   - **App-namn**: Sjöstedt Måleri AB Website
   - **E-post**: Din e-post
   - **Appmål**: "Webb" eller "Facebook-inloggning"
6. Klicka "Skapa app-ID"

### Steg 2: Konfigurera Facebook App

1. I appens dashboard, välj "Växlingsläge"
2. Klicka på "Sidor" i vänstermenyn
3. Klicka "Lägg till flikar" → "Page Management"
4. Anslut din Facebook-sida (Sjöstedt Måleri AB)

### Steg 3: Skapa Access Token

1. Gå till [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Välj din app i dropdown-menyn
3. Klicka på "Token för att testa" → "Sidtoken"
4. Välj din Facebook-sida från listan
5. Kopiera den långa token-strängen

**Alternativ - Hämta permanent token:**
1. Gå till din app → "Växlingsläge" → "Token för att använda"
2. Klicka "Genereera token"
3. Kopiera denna token (den är permanent)

### Steg 4: Implementera i JavaScript

Skapa en ny fil `facebook-feed.js` eller lägg till i din befintliga `script.js`:

```javascript
// Facebook Feed Configuration
const FB_PAGE_ID = 'DIN_FACEBOOK_PAGE_ID'; // Hitta detta i din sidas inställningar
const FB_ACCESS_TOKEN = 'DIN_ACCESS_TOKEN'; // Från steg 3

// Funktion för att hämta Facebook-inlägg
async function fetchFacebookPosts() {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FB_PAGE_ID}/posts?access_token=${FB_ACCESS_TOKEN}&fields=message,created_time,full_picture,permalink_url&limit=3`
        );
        
        const data = await response.json();
        
        if (data.data) {
            displayFacebookPosts(data.data);
        }
    } catch (error) {
        console.error('Fel vid hämtning av Facebook-inlägg:', error);
    }
}

// Funktion för att visa inlägg
function displayFacebookPosts(posts) {
    const container = document.querySelector('.facebook-posts-grid');
    if (!container) return;
    
    container.innerHTML = ''; // Rensa befintliga inlägg
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

// Funktion för att skapa post-element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'facebook-post';
    
    const timeAgo = getTimeAgo(post.created_time);
    const imageUrl = post.full_picture || '';
    const message = post.message || 'Inget text-innehåll';
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <div class="author-avatar">SM</div>
                <div class="author-info">
                    <strong>Sjöstedt Måleri AB</strong>
                    <span class="post-date">${timeAgo}</span>
                </div>
            </div>
        </div>
        ${imageUrl ? `
        <div class="post-image">
            <img src="${imageUrl}" alt="Facebook post" style="width: 100%; height: 200px; object-fit: cover;">
        </div>
        ` : ''}
        <div class="post-content">
            <p>${message}</p>
        </div>
        <div class="post-actions">
            <a href="${post.permalink_url}" target="_blank" class="action-item">Gilla</a>
            <a href="${post.permalink_url}" target="_blank" class="action-item">Kommentera</a>
            <a href="${post.permalink_url}" target="_blank" class="action-item">Dela</a>
        </div>
    `;
    
    return postDiv;
}

// Funktion för att beräkna tid sedan inlägg
function getTimeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    
    if (diffInSeconds < 60) return 'Nu';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minuter sedan`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} timmar sedan`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} dagar sedan`;
    return `${Math.floor(diffInSeconds / 604800)} veckor sedan`;
}

// Kör när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    fetchFacebookPosts();
});
```

### Steg 5: Uppdatera index.html

Lägg till detta i din `<head>` sektion i `index.html`:

```html
<script src="facebook-feed.js"></script>
```

ELLER om du har lagt till koden i `script.js`, behöver du inte göra något extra.

### Steg 6: Uppdatera index.html - Ta bort mockup-inlägg

Ersätt den befintliga Facebook-sektionen med:

```html
<!-- Social Media Section -->
<section class="social-media">
    <div class="container">
        <h2>Följ Oss på Sociala Medier</h2>
        <p>Se våra senaste projekt och få inspiration för ditt nästa måleriprojekt</p>
        
        <!-- Facebook Posts Grid - Laddas dynamiskt -->
        <div class="facebook-posts-grid">
            <!-- Inlägg kommer att laddas här automatiskt -->
        </div>

        <!-- Social Links -->
        <div class="social-links">
            <a href="https://www.facebook.com/p/Sj%C3%B6stedts-M%C3%A5leri-AB-100066792379905/" class="social-link-btn facebook" target="_blank">Följ oss på Facebook</a>
            <a href="#" class="social-link-btn instagram">Instagram</a>
            <a href="#" class="social-link-btn linkedin">LinkedIn</a>
        </div>
    </div>
</section>
```

---

## 🎯 Enklare väg: Använd färdig tjänst (Rekommenderas)

Om ovanstående känns för komplicerat, här är **gratis alternativ**:

### Alternativ 1: Juicer.io (REKOMMENDERAS för enkelhet) ⭐

**Detta är ENKELAST och HELT GRATIS!**

1. Gå till [juicer.io](https://www.juicer.io/)
2. Skapa ett gratis konto
3. Lägg till din Facebook-sida
4. Kopiera den kod de ger dig
5. Klistra in koden i din `index.html`

**Fördelar:**
- ✅ Helt gratis
- ✅ Automatisk uppdatering
- ✅ Inga tokens eller programmering behövs
- ✅ Fungerar direkt
- ✅ Även Instagram, Twitter etc.

**Nackdelar:**
- ⚠️ **Begränsad designkontroll** - Du kan inte få det att se exakt ut som din nuvarande grid
- ⚠️ Visar "Powered by Juicer" watermark (borttagbart i betalversion)
- ⚠️ Använder Juicer.io egen CSS (svårt att anpassa fullt ut)

**Vad du KAN anpassa i Juicer.io:**
- Antal kolumner (1-4)
- Tema/färger
- Storlek på bilder
- Layout (grid eller lista)

**Vad du INTE kan:**
- Lägga till egna CSS-klasser
- Ändra exakt hur kort-konstruktionen ser ut
- Ta bort Juicer:s HTML-struktur

### Alternativ 2: Facebook Page Plugin

**Ännu enklare förstasidan:**

```html
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v18.0"></script>
<div class="fb-page" 
     data-href="https://www.facebook.com/SjöstedtMåleriAB" 
     data-tabs="timeline" 
     data-width="1200" 
     data-height="500" 
     data-small-header="false" 
     data-adapt-container-width="true" 
     data-hide-cover="false" 
     data-show-facepile="true">
</div>
```

Detta visar en komplett Facebook-tidslinje, inte individuella inlägg.

---

## 📊 Kostnader och begränsningar

### Facebook Graph API (Gratis)
- ✅ **Gratis att använda**
- ⚠️ **Begränsning**: 200 API-anrop per timme per användare
- ⚠️ **Begränsning**: Max 100 inlägg kan hämtas åt gången
- ✅ Tillräckligt för de flesta småföretag

### Juicer.io (Gratis version)
- ✅ **Gratis**: Upp till 10 sociala feeds
- ✅ **Gratis**: Obegränsat antal uppdateringar
- ✅ **Gratis**: Automatisk uppdatering varje timme
- ⚠️ **Begränsning**: Visar "Powered by Juicer" watermark

### Facebook Page Plugin
- ✅ **Helt gratis**
- ✅ Inga begränsningar
- ✅ Automatisk uppdatering

---

## 🎓 Min rekommendation

För en **enkelt och gratis** lösning:

1. **Använd Juicer.io** - Tar 5 minuter att sätta upp, uppdateras automatiskt
2. **Eller**: Fortsätt med manuell uppdatering när du lägger ut nya projekt

Juicer.io är perfekt för dig eftersom:
- Du behöver inte programmera
- Det är gratis
- Uppdateras automatiskt
- Ser professionellt ut

---

## 🆘 Behöver du hjälp?

Om något är oklart eller du vill ha hjälp med implementation, säg till så hjälper jag dig steg för steg!

---

## Ytterligare resurser

- [Facebook Graph API Dokumentation](https://developers.facebook.com/docs/graph-api)
- [Juicer.io](https://www.juicer.io/)
- [Facebook Page Plugin Generator](https://developers.facebook.com/docs/plugins/page-plugin)

