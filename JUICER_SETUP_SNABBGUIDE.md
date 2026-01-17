# Juicer.io Snabbguide - Instagram Feed (GRATIS)

Detta är den ENKLASTE metoden för att få Instagram-inlägg på din sida. Inga developer-konton behövs!

---

## 🚀 Snabbstart (5 minuter)

### Steg 1: Skapa Gratis Konto

1. Gå till [juicer.io](https://www.juicer.io/)
2. Klicka på **"Sign Up Free"** (stor grön knapp)
3. Välj **"Sign up with Email"** eller **"Sign up with Google"**
4. Fyll i:
   - Email: `sjostedtsmaleri@gmail.com`
   - Lösenord: (välj ett säkert lösenord)
5. Klicka på **"Create Account"**

### Steg 2: Lägg till Instagram

1. Efter inloggning ser du en dashboard
2. Klicka på **"Add Social Feed"** eller **"+ Add Feed"**
3. Välj **"Instagram"**
4. Klicka på **"Connect Instagram"**
5. Logga in med ditt Instagram-konto (`sjostedtsmaleri`)
6. Godkänn behörigheter när Instagram frågar

### Steg 3: Hämta Feed-ID

1. Efter att Instagram är kopplat, gå till din **Dashboard** (startsidan när du loggar in)
2. Klicka på **"Embed"**-knappen eller fliken (finns oftast högst upp till höger eller i menyn)
3. Du ser en kod som ser ut så här:
```html
<ul class="juicer-feed" data-feed-id="ditt-feed-namn"></ul>
```
4. **Kopiera texten** efter `data-feed-id="` (kan vara ett nummer, ett namn eller din feed-URL)

**OBS:** Om du inte ser "Embed"-fliken:
- Kontrollera att du har skapat feeden och lagt till Instagram
- Feed-ID:t kan också vara ditt feed-namn eller feed-URL
- I vissa fall kan du hitta det i feed-inställningarna under "Settings"

### Steg 4: Lägg till på din sida

1. Öppna `index.html`
2. Hitta rad 547 där det står `data-feed-id="DITT_FEED_ID"`
3. Ersätt `DITT_FEED_ID` med ditt feed-ID från steg 3
4. Spara filen

**Klart!** Instagram-inläggen kommer nu att visas på din sida.

---

## 🎨 Anpassa Design (Valfritt)

Om du vill ändra hur många inlägg som visas:

1. I `index.html`, ändra `data-per="9"` till önskat antal (t.ex. `data-per="6"`)

Om du vill ändra layout:

1. CSS-stilarna är redan konfigurerade i `styles.css`
2. De matchar din design automatiskt
3. Inlägg visas i 3 kolumner på desktop, 2 på tablet, 1 på mobil

---

## ✅ Testa

1. Öppna din hemsida i webbläsaren
2. Scrolla ner till "Följ Oss på Sociala Medier"-sektionen
3. Du bör se dina Instagram-inlägg i en snygg grid!

---

## 🆘 Felsökning

### Inlägg visas inte
- Kontrollera att feed-ID:t är korrekt i `index.html`
- Kontrollera att Instagram är kopplat i Juicer.io dashboard
- Kontrollera konsolen för felmeddelanden (F12)

### Feed-ID hittas inte
- Gå till Juicer.io dashboard
- Klicka på **"Embed"**-fliken
- Feed-ID:t står i koden som visas där

### Instagram kopplas inte
- Försök logga ut och in igen på Juicer.io
- Kontrollera att du loggar in med rätt Instagram-konto
- Godkänn alla behörigheter som Instagram frågar om

---

## 💡 Tips

- Juicer.io uppdaterar automatiskt när du lägger upp nya inlägg på Instagram
- Gratis planen inkluderar upp till 1 social feed (perfekt för dig!)
- Du kan alltid uppgradera senare om du vill ha fler feeds

---

**Det är så enkelt! Inga developer-konton, inga API-nycklar, bara kopiera feed-ID:t och klart! 🎉**

