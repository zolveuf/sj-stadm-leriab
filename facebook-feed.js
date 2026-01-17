/**
 * Professionell Facebook Feed Loader för Sjöstedts Måleri AB
 * Automatisk uppdatering av Facebook-inlägg på hemsidan
 * 
 * INSTRUKTIONER:
 * 1. Se FACEBOOK_PROFESSIONAL_GUIDE.md för komplett setup
 * 2. Uppdatera apiUrl nedan med din backend URL
 * 3. Se till att din backend-server körs
 */

class FacebookFeed {
    constructor(config) {
        this.apiUrl = config.apiUrl || '/api/facebook/posts';
        this.containerSelector = config.containerSelector || '.facebook-posts-grid';
        this.maxPosts = config.maxPosts || 6;
        this.updateInterval = config.updateInterval || 30 * 60 * 1000; // 30 minuter
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.querySelector(this.containerSelector);
        if (!this.container) {
            console.warn('Facebook feed container hittades inte');
            return;
        }

        // Visa loading state
        this.showLoading();

        // Ladda inlägg när sidan laddas
        this.loadPosts();

        // Uppdatera automatiskt med jämna mellanrum
        setInterval(() => this.loadPosts(), this.updateInterval);
    }

    async loadPosts() {
        try {
            const response = await fetch(this.apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
                this.renderPosts(data.data.slice(0, this.maxPosts));
            } else {
                this.showNoPosts();
            }
        } catch (error) {
            console.error('Fel vid hämtning av Facebook-inlägg:', error);
            this.showError(error);
        }
    }

    renderPosts(posts) {
        if (!this.container) return;

        this.container.innerHTML = '';

        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            this.container.appendChild(postElement);
        });

        // Lägg till fade-in animation
        this.container.querySelectorAll('.facebook-post').forEach((post, index) => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'facebook-post';
        postDiv.setAttribute('data-post-id', post.id);

        const timeAgo = this.formatTimeAgo(post.created_time);
        const message = this.truncateText(post.message || '', 150);
        const imageUrl = post.image || '';

        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <div class="author-avatar">SM</div>
                    <div class="author-info">
                        <strong>Sjöstedts Måleri AB</strong>
                        <span class="post-date">${timeAgo}</span>
                    </div>
                </div>
            </div>
            ${imageUrl ? `
            <div class="post-image">
                <a href="${post.permalink_url}" target="_blank" rel="noopener noreferrer">
                    <img src="${imageUrl}" 
                         alt="${message || 'Facebook-inlägg från Sjöstedts Måleri AB'}" 
                         loading="lazy"
                         onerror="this.parentElement.parentElement.style.display='none'">
                </a>
            </div>
            ` : ''}
            <div class="post-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="post-actions">
                <a href="${post.permalink_url}" target="_blank" rel="noopener noreferrer" class="action-item">Gilla</a>
                <a href="${post.permalink_url}" target="_blank" rel="noopener noreferrer" class="action-item">Kommentera</a>
                <a href="${post.permalink_url}" target="_blank" rel="noopener noreferrer" class="action-item">Dela</a>
            </div>
        `;

        return postDiv;
    }

    formatTimeAgo(dateString) {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) return 'Nu';
        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minut' : 'minuter'} sedan`;
        }
        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'timme' : 'timmar'} sedan`;
        }
        if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'dag' : 'dagar'} sedan`;
        }
        if (diffInSeconds < 2592000) {
            const weeks = Math.floor(diffInSeconds / 604800);
            return `${weeks} ${weeks === 1 ? 'vecka' : 'veckor'} sedan`;
        }
        
        return postDate.toLocaleDateString('sv-SE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength).trim() + '...';
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoading() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="facebook-loading" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div class="loading-spinner" style="width: 50px; height: 50px; border: 4px solid rgba(0,0,0,0.1); border-top-color: #000; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                <p style="margin-top: 1rem; color: var(--text-light);">Laddar Facebook-inlägg...</p>
            </div>
        `;
    }

    showNoPosts() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="facebook-no-posts" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: var(--text-light); margin-bottom: 1rem;">Inga Facebook-inlägg tillgängliga just nu.</p>
                <a href="https://www.facebook.com/p/Sj%C3%B6stedts-M%C3%A5leri-AB-100066792379905/" 
                   target="_blank" 
                   class="btn btn-secondary">
                    Besök vår Facebook-sida
                </a>
            </div>
        `;
    }

    showError(error) {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="facebook-error" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: var(--text-light); margin-bottom: 1rem;">Kunde inte ladda Facebook-inlägg just nu.</p>
                <a href="https://www.facebook.com/p/Sj%C3%B6stedts-M%C3%A5leri-AB-100066792379905/" 
                   target="_blank" 
                   class="btn btn-secondary">
                    Besök vår Facebook-sida
                </a>
            </div>
        `;
    }
}

// Initiera när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    // Konfiguration - UPPDATERA DENNA MED DIN BACKEND URL
    const config = {
        apiUrl: '/api/facebook/posts', // Ändra till din backend URL (t.ex. 'https://malerisjostedts.se/api/facebook/posts')
        containerSelector: '.facebook-posts-grid',
        maxPosts: 6,
        updateInterval: 30 * 60 * 1000 // 30 minuter
    };

    // Skapa feed-instans
    new FacebookFeed(config);
});

