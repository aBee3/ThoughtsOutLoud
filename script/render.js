// script/render.js
// This script fetches articles from a JSON file and renders them into HTML boxes based on their categories.

async function renderArticles() {
    const response = await fetch('data/articles.json');
    console.log('Fetching articles from data/articles.json');

    const res = await fetch('data/articles.json');
    const articles = await res.json();
    console.log('Articles fetched:', articles);
    
    // Now I want to group my articles by category
    const categories = {};
    articles.forEach(article => {
        if (!categories[article.category]) categories[article.category] = [];
        categories[article.category].push(article);
    });

    document.querySelectorAll('.box').forEach(box => {
        const category = box.dataset.category;
        const holder = box.querySelector('.holder');

        
        if (!holder || !category) return;

        const children = holder.querySelectorAll('.article');
        const content = categories[category] || [];

        // Now I can slice to render only 4 articles
        content.slice(0, 4).forEach((article, i) => {
            const target = children[i];
            if (!target) return;

            target.innerHTML = `
                <div class="image-container">
                    <img src="${article.cover}" alt="${article.title}" class="cover-image" />
                </div>
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <button class="read-button" onclick="location.href = '/article.html?file=${article.file}'">Read More</button>
            `;
        });

        // Hide any remaining children if there are fewer articles than slots
        for (let i = content.length; i < children.length; i++) {
            children[i].style.display = 'none';
        }


    });
}
async function renderNavBar() {
    try {
    const res = await fetch('data/categories.json');
    const categories = await res.json();

    const nav = document.getElementById('nav-bar');
    if (!nav) return;

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'nav-button';
      btn.innerHTML = `
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.9 6.2L22 9.3l-5 4.9 1.2 7.1L12 18.6l-6.2 3.7L7 14.2 2 9.3l7.1-1.1L12 2z"/>
        </svg>

        <span>${cat.name}</span>
      `;

      // Scroll to the matching section
      btn.onclick = () => {
        const section = document.querySelector(`.box[data-category="${cat.name}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };

      nav.appendChild(btn);
    });

  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

async function renderThoughts(limit = 3) {
  try {
    const res = await fetch('data/thoughts.json'); // Use a new file if preferred
    const thoughts = await res.json();

    // Sort by date, newest first
    thoughts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pick one randomly from the top N
    const topThoughts = thoughts.slice(0, limit);
    const random = topThoughts[Math.floor(Math.random() * topThoughts.length)];

    const container = document.querySelector('.thought-holder');
    if (!container) return;

    container.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'thought';
    div.innerHTML = `
      <div class="thought-text">
        <p>"${random.text}"</p>
      </div>
      <div class="thought-image">
        <img src="${random.image}" alt="Thought visual">
      </div>
    `;

    container.appendChild(div);
  } catch (err) {
    console.error("Failed to load thoughts:", err);
  }
}

renderThoughts();
renderNavBar();
renderArticles();