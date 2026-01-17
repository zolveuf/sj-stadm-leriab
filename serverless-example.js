/**
 * Serverless Function-exempel för Facebook Feed API
 * 
 * Detta fungerar med Vercel, Netlify Functions, eller AWS Lambda
 * 
 * FÖR VERCEL:
 * 1. Skapa mapp: api/facebook-posts.js
 * 2. Kopiera denna kod dit
 * 3. Lägg till miljövariabler i Vercel Dashboard:
 *    - FB_PAGE_ID
 *    - FB_ACCESS_TOKEN
 * 
 * FÖR NETLIFY:
 * 1. Skapa mapp: netlify/functions/facebook-posts.js
 * 2. Kopiera denna kod dit
 * 3. Lägg till miljövariabler i Netlify Dashboard
 */

// Cache (använd Redis eller liknande för produktion)
let cache = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuter

export default async function handler(req, res) {
    // Endast GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const FB_PAGE_ID = process.env.FB_PAGE_ID;
    const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

    if (!FB_PAGE_ID || !FB_ACCESS_TOKEN) {
        return res.status(500).json({ 
            error: 'Server configuration error',
            message: 'FB_PAGE_ID and FB_ACCESS_TOKEN must be set'
        });
    }

    try {
        // Kontrollera cache
        if (cache && cacheTime && (Date.now() - cacheTime) < CACHE_DURATION) {
            res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return res.json(cache);
        }

        // Hämta från Facebook API
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FB_PAGE_ID}/posts?` +
            `access_token=${FB_ACCESS_TOKEN}&` +
            `fields=id,message,created_time,full_picture,permalink_url,attachments{media,subattachments}&` +
            `limit=6`
        );

        const data = await response.json();

        if (data.error) {
            // Om vi har cachad data, returnera den även vid fel
            if (cache) {
                res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
                return res.json(cache);
            }
            return res.status(500).json({ error: data.error.message });
        }

        // Formatera data
        const formattedPosts = {
            data: data.data.map(post => ({
                id: post.id,
                message: post.message || '',
                created_time: post.created_time,
                image: post.full_picture || (post.attachments?.data?.[0]?.media?.image?.src),
                permalink_url: post.permalink_url
            }))
        };

        // Uppdatera cache
        cache = formattedPosts;
        cacheTime = Date.now();

        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        res.json(formattedPosts);

    } catch (error) {
        console.error('Facebook API Error:', error);
        
        // Om vi har cachad data, returnera den även vid fel
        if (cache) {
            res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return res.json(cache);
        }

        res.status(500).json({ 
            error: 'Kunde inte hämta Facebook-inlägg',
            details: error.message
        });
    }
}

// FÖR NETLIFY FUNCTIONS (använd denna struktur istället):
/*
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const FB_PAGE_ID = process.env.FB_PAGE_ID;
    const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

    try {
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FB_PAGE_ID}/posts?` +
            `access_token=${FB_ACCESS_TOKEN}&` +
            `fields=id,message,created_time,full_picture,permalink_url&` +
            `limit=6`
        );

        const data = await response.json();

        if (data.error) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: data.error.message })
            };
        }

        const formattedPosts = {
            data: data.data.map(post => ({
                id: post.id,
                message: post.message || '',
                created_time: post.created_time,
                image: post.full_picture || '',
                permalink_url: post.permalink_url
            }))
        };

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300'
            },
            body: JSON.stringify(formattedPosts)
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
*/

