# Web3Forms Setup Guide

Denna guide visar hur du konfigurerar kontaktformulären för att fungera med Web3Forms.

---

## 🚀 Snabbstart

### Steg 1: Skapa Web3Forms-konto och hämta Access Key

1. Gå till [web3forms.com](https://web3forms.com/)
2. Klicka på **"Get Started"** eller **"Get Your Access Key"**
3. Fyll i din e-postadress: `sjostedtsmaleri@gmail.com`
4. Klicka på **"Get Access Key"**
5. Kontrollera din e-post och kopiera din **Access Key**

### Steg 2: Lägg till Access Key i formulären

Du behöver uppdatera Access Key i två filer:

#### 1. Kontaktformulär (`kontakt.html`)

Öppna `kontakt.html` och hitta denna rad (cirka rad 147):

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

Ersätt `YOUR_WEB3FORMS_ACCESS_KEY` med din faktiska access key från Web3Forms.

#### 2. Bokningsformulär (`boka.html`)

Öppna `boka.html` och hitta denna rad (cirka rad 117):

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

Ersätt `YOUR_WEB3FORMS_ACCESS_KEY` med samma access key.

---

## ✅ Klar!

Efter att du har lagt till din access key kommer formulären att fungera automatiskt. När någon skickar ett formulär kommer du att få ett e-postmeddelande med formulärdata.

---

## 📧 E-postmeddelanden

Web3Forms skickar automatiskt e-postmeddelanden till den e-postadress du angav när du skapade kontot. Du kan också konfigurera ytterligare e-postadresser i Web3Forms dashboard.

---

## 🎨 Anpassning

### Ändra mottagare

Du kan lägga till flera mottagare genom att lägga till ett dolt fält:

```html
<input type="hidden" name="to_email" value="sjostedtsmaleri@gmail.com">
```

### Anpassa ämnesrad

Ämnesraden är redan konfigurerad i formulären:
- Kontaktformulär: "Kontaktförfrågan från Sjöstedts Måleri AB hemsida"
- Bokningsformulär: "Bokningsförfrågan från Sjöstedts Måleri AB hemsida"

Du kan ändra dessa i HTML-filerna om du vill.

---

## 🆘 Felsökning

### Formuläret skickas inte

1. Kontrollera att access key är korrekt
2. Kontrollera konsolen för felmeddelanden (F12 i webbläsaren)
3. Kontrollera att internetanslutningen fungerar

### E-postmeddelanden kommer inte fram

1. Kontrollera spam-mappen
2. Kontrollera att e-postadressen i Web3Forms är korrekt
3. Kontrollera Web3Forms dashboard för eventuella felmeddelanden

### Formuläret visar felmeddelande

- Kontrollera att alla obligatoriska fält är ifyllda
- Kontrollera att e-postadressen är korrekt formaterad
- Kontrollera konsolen för detaljerade felmeddelanden

---

## 📚 Ytterligare resurser

- [Web3Forms Dokumentation](https://docs.web3forms.com/)
- [Web3Forms Dashboard](https://web3forms.com/dashboard)
- [Web3Forms Exempel](https://docs.web3forms.com/getting-started/getting-started-with-html)

---

**Lycka till med dina formulär! 🎉**

