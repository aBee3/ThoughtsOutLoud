async function renderAllProjects() {
  const res = await fetch('data/projects.json');
  const projects = await res.json();

  const container = document.getElementById('projects-holder');

  for (const project of projects) {
    const card = document.createElement('div');
    card.className = 'git';
    card.innerHTML = `
      <div class="image-container">
        <img src="${project.cover}" alt="${project.title}">
      </div>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div class="readme-content" id="readme-${project.title.replace(/\s+/g, '-')}">Loading README...</div>
      <button class="read-button" onclick="window.open('${project.repo}', '_blank')">View on GitHub</button>
    `;

    container.appendChild(card);

    // Fetch and render the README
    if (project.readme) {
      const readmeEl = card.querySelector(`#readme-${project.title.replace(/\s+/g, '-')}`);
      const res = await fetch(project.readme);
      const md = await res.text();
      readmeEl.innerHTML = marked.parse(md); // assumes marked.js is included
    }
  }
}

renderAllProjects();
