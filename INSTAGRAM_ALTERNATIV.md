# Instagram Feed - Alternativ om Juicer.io inte fungerar

Om du har problem med Juicer.io eller inte hittar feed-ID:t, här är ett enkelt alternativ:

---

## 🎯 Enkel Lösning: Statisk Instagram Grid

Om du vill ha en enkel, snygg Instagram-grid utan API eller externa tjänster, kan du lägga till dina Instagram-inlägg manuellt.

### Steg 1: Ta Screenshots eller Ladda ner Bilder

1. Gå till din Instagram-profil: [instagram.com/sjostedtsmaleri](https://www.instagram.com/sjostedtsmaleri/)
2. Ta screenshots eller ladda ner bilderna från dina senaste inlägg
3. Spara dem i `images/instagram/` mappen

### Steg 2: Lägg till HTML

Ersätt Juicer.io-koden i `index.html` med detta:

```html
<!-- Instagram Feed Grid -->
<div class="instagram-feed-wrapper">
    <div class="instagram-feed-grid">
        <!-- Instagram Post 1 -->
        <div class="instagram-post">
            <a href="https://www.instagram.com/p/DITT_INLAGG_ID_1/" target="_blank" rel="noopener noreferrer">
                <div class="instagram-post-image">
                    <img src="images/instagram/post-1.webp" alt="Sjöstedts Måleri projekt" loading="lazy">
                </div>
            </a>
        </div>
        
        <!-- Instagram Post 2 -->
        <div class="instagram-post">
            <a href="https://www.instagram.com/p/DITT_INLAGG_ID_2/" target="_blank" rel="noopener noreferrer">
                <div class="instagram-post-image">
                    <img src="images/instagram/post-2.webp" alt="Sjöstedts Måleri projekt" loading="lazy">
                </div>
            </a>
        </div>
        
        <!-- Lägg till fler posts här (upp till 9) -->
    </div>
</div>
```

### Steg 3: Hitta Instagram Post-ID

1. Öppna ett Instagram-inlägg i webbläsaren
2. URL:en ser ut så här: `https://www.instagram.com/p/ABC123XYZ/`
3. `ABC123XYZ` är post-ID:t - kopiera det

### Steg 4: CSS är redan klart!

CSS-stilarna finns redan i `styles.css` och kommer att fungera direkt!

---

## 🔄 Automatisk Uppdatering (Valfritt)

Om du vill uppdatera inläggen automatiskt senare, kan du:
1. Använda Juicer.io när du har tid att sätta upp det
2. Eller lägga till nya bilder manuellt när du lägger upp på Instagram

---

## ✅ Fördelar med denna metod:

- ✅ Fungerar direkt utan API
- ✅ Ingen extern tjänst behövs
- ✅ Full kontroll över vilka bilder som visas
- ✅ Matchar din design perfekt
- ✅ Snabb att implementera

---

**Tips:** Du kan börja med denna metod nu och byta till Juicer.io senare när du har tid att sätta upp det ordentligt!

