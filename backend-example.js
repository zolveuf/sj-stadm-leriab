/**
 * Backend-exempel för Facebook Feed API
 * 
 * Detta är ett exempel på hur du kan skapa en backend-server
 * för att hämta Facebook-inlägg säkert.
 * 
 * INSTRUKTIONER:
 * 1. Installera dependencies: npm install express axios cors dotenv
 * 2. Skapa en .env fil med FB_PAGE_ID och FB_ACCESS_TOKEN
 * 3. Kör: node backend-example.js
 * 
 * ALTERNATIV: Använd serverless-funktion (se serverless-example.js)
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konfiguration från miljövariabler
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

// Validera att konfiguration finns
if (!FB_PAGE_ID || !FB_ACCESS_TOKEN) {
    console.error('❌ Fel: FB_PAGE_ID och FB_ACCESS_TOKEN måste sättas i .env filen');
    process.exit(1);
}

// Cache för att minska API-anrop
let postsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuter

/**
 * Endpoint för att hämta Facebook-inlägg
 * GET /api/facebook/posts
 */
app.get('/api/facebook/posts', async (req, res) => {
    try {
        // Kontrollera cache
        if (postsCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
            console.log('✅ Returnerar cachad data');
            return res.json(postsCache);
        }

        console.log('🔄 Hämtar nya inlägg från Facebook API...');

        // Hämta inlägg från Facebook Graph API
        const response = await axios.get(`https://graph.facebook.com/v18.0/${FB_PAGE_ID}/posts`, {
            params: {
                access_token: FB_ACCESS_TOKEN,
                fields: 'id,message,created_time,full_picture,permalink_url,attachments{media,subattachments}',
                limit: 6
            }
        });

        // Formatera data
        const formattedPosts = response.data.data.map(post => ({
            id: post.id,
            message: post.message || '',
            created_time: post.created_time,
            image: post.full_picture || (post.attachments?.data?.[0]?.media?.image?.src),
            permalink_url: post.permalink_url
        }));

        // Uppdatera cache
        postsCache = { data: formattedPosts };
        cacheTimestamp = Date.now();

        console.log(`✅ Hämtade ${formattedPosts.length} inlägg`);
        res.json(postsCache);

    } catch (error) {
        console.error('❌ Facebook API Error:', error.response?.data || error.message);
        
        // Om vi har cachad data, returnera den även vid fel
        if (postsCache) {
            console.log('⚠️ Returnerar cachad data på grund av fel');
            return res.json(postsCache);
        }

        res.status(500).json({ 
            error: 'Kunde inte hämta Facebook-inlägg',
            details: error.response?.data || error.message
        });
    }
});

/**
 * Health check endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        cacheAge: cacheTimestamp ? Math.floor((Date.now() - cacheTimestamp) / 1000) : null
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server körs på port ${PORT}`);
    console.log(`📡 Facebook API endpoint: http://localhost:${PORT}/api/facebook/posts`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

