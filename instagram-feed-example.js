/**
 * Instagram Feed Loader - Exempel implementation
 * 
 * Detta är ett exempel på hur du kan implementera Instagram-feed
 * med olika metoder. Välj den metod som passar dig bäst.
 * 
 * INSTRUKTIONER:
 * 1. För SnapWidget: Följ INSTAGRAM_REALTIME_GUIDE.md Alternativ 1
 * 2. För API: Följ INSTAGRAM_REALTIME_GUIDE.md Alternativ 2
 */

// ============================================
// METOD 1: SnapWidget (Enklast - Rekommenderas)
// ============================================
// Använd denna om du vill ha snabbast lösning
// Se INSTAGRAM_REALTIME_GUIDE.md för instruktioner

// ============================================
// METOD 2: Instagram API (Full kontroll)
// ============================================

/**
 * Hämta Instagram-inlägg från din backend
 * OBS: Du behöver en backend-server för detta
 */
async function loadInstagramFeedFromAPI() {
    const feedContainer = document.querySelector('.instagram-feed-grid');
    if (!feedContainer) return;

    try {
        // Ersätt med din backend URL
        const response = await fetch('/api/instagram/posts');
        
        if (!response.ok) {
            throw new Error('Kunde inte hämta Instagram-inlägg');
        }
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            feedContainer.innerHTML = '';
            
            // Visa max 9 inlägg
            const posts = data.data.slice(0, 9);
            
            posts.forEach(post => {
                const postElement = createInstagramPost(post);
                feedContainer.appendChild(postElement);
            });
        } else {
            showNoPostsMessage(feedContainer);
        }
    } catch (error) {
        console.error('Fel vid hämtning av Instagram-feed:', error);
        showErrorMessage(feedContainer);
    }
}

/**
 * Skapa ett Instagram-post element
 */
function createInstagramPost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'instagram-post';
    
    // Hämta bild-URL (video använder thumbnail)
    const imageUrl = post.media_type === 'VIDEO' 
        ? (post.thumbnail_url || post.media_url) 
        : post.media_url;
    
    // Kortare bildtext
    const caption = post.caption 
        ? (post.caption.length > 100 ? post.caption.substring(0, 100) + '...' : post.caption)
        : '';
    
    // Formatera datum
    const date = post.timestamp 
        ? formatDate(post.timestamp) 
        : '';
    
    postDiv.innerHTML = `
        <a href="${post.permalink}" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Visa Instagram-inlägg">
            <div class="instagram-post-image">
                <img src="${imageUrl}" 
                     alt="${caption || 'Instagram-inlägg från Sjöstedts Måleri AB'}" 
                     loading="lazy">
                <div class="instagram-post-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </div>
            </div>
        </a>
    `;
    
    return postDiv;
}

/**
 * Visa meddelande när inga inlägg finns
 */
function showNoPostsMessage(container) {
    container.innerHTML = `
        <div class="instagram-no-posts">
            <p>Inga Instagram-inlägg tillgängliga just nu.</p>
            <a href="https://www.instagram.com/sjostedtsmaleri/" 
               target="_blank" 
               class="btn btn-secondary">
                Följ oss på Instagram
            </a>
        </div>
    `;
}

/**
 * Visa felmeddelande
 */
function showErrorMessage(container) {
    container.innerHTML = `
        <div class="instagram-error">
            <p>Kunde inte ladda Instagram-inlägg just nu.</p>
            <a href="https://www.instagram.com/sjostedtsmaleri/" 
               target="_blank" 
               class="btn btn-secondary">
                Besök vår Instagram
            </a>
        </div>
    `;
}

/**
 * Formatera datum till svensk format
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Idag';
    } else if (diffDays === 1) {
        return 'Igår';
    } else if (diffDays < 7) {
        return `${diffDays} dagar sedan`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'vecka' : 'veckor'} sedan`;
    } else {
        return date.toLocaleDateString('sv-SE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

// ============================================
// Initiera när sidan laddas
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Om du använder API-metoden, avkommentera detta:
    // loadInstagramFeedFromAPI();
    
    // Uppdatera var 30:e minut om du använder API
    // setInterval(loadInstagramFeedFromAPI, 30 * 60 * 1000);
    
    console.log('Instagram Feed Loader laddad. Se INSTAGRAM_REALTIME_GUIDE.md för instruktioner.');
});

