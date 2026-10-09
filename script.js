const games = [
  {
    id: 1,
    title: 'Brawl Stars',
    genre: 'action',
    path: 'Games/Brawl%20Stars.html',
    thumb: 'https://supercell.com/images/b524ca49e8549e5d3f5485452da7f26c/cropped.webp'
  },
  {
    id: 2,
    title: 'Drift Hunters',
    genre: 'racing',
    path: 'Games/Drift%20Hunters.html',
    thumb: 'https://imgs.crazygames.com/games/drift-hunters/cover-1656950639575.png?metadata=none&quality=100&width=1200&height=630&fit=crop'
  },
  {
    id: 3,
    title: 'Geometry Dash',
    genre: 'action',
    path: 'Games/Geometry%20Dash.html',
    thumb: 'https://imgs.crazygames.com/games/geometry-dash-online/cover_16x9-1732744370399.png?metadata=none&quality=60&height=7089'
  },
  {
    id: 4,
    title: 'Madalin Stunt Cars 2',
    genre: 'racing',
    path: 'Games/Madalin%20Stunt%20Cars%202',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB0sjyv5lYN5yGSaM-7gD4711OK_wRT-_yZVs2E6PSReCppXBk_2IQXvQ&s=10'
  },
  {
    id: 5,
    title: 'Madalin Stunt Cars 3',
    genre: 'racing',
    path: 'Games/Madalin%20Stunt%20Cars%203.html',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYrVPOcSvbFDAQq9xmpGQyUSjVdwjtLrpWPC0-bLdLbYtx-DzLYpjxa-P&s=10'
  },
  {
    id: 6,
    title: 'Real Flight Simulator',
    genre: 'Simulator',
    path: 'Games/RFS.html',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRitjB3E8W0JDsmXv8Y3MDUdSRuKVqbQQG63dGX3mkNNg&s=10
  },
  {
    id: 7,
    title: 'Slope',
    genre: 'action',
    path: 'Games/Slope.html',
    thumb: 'https://g.minigemu.com/slope-3d/slope-3d.jpg'
  },
  {
    id: 8,
    title: 'Survivor.io',
    genre: 'action',
    path: 'Games/Survivor.io.html',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVbVU_PJPur8N4QhfyDP6pzERkgA-b9051cY1smJ2dnG_JWqtZmKk3wxQ0&s=10'
  }
];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const noResults = document.getElementById('noResults');

let currentGenre = 'all';

function getGenreLabel(genre) {
  const labels = {
    action: 'アクション',
    racing: 'レーシング'
  };
  return labels[genre] || 'その他';
}

function createGameCard(game) {
  return `
    <a href="${game.path}" class="game-card" target="_blank" rel="noopener noreferrer" aria-label="${game.title}をプレイ">
      <div class="game-thumbnail" style="background-image: url('${game.thumb}');"></div>
      <div class="game-info">
        <h2 class="game-title">${game.title}</h2>
        <span class="game-genre">${getGenreLabel(game.genre)}</span>
        <div class="game-footer">
          <span class="game-meta">Play</span>
          <button class="play-button" type="button" aria-label="${game.title}を開始">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
    </a>
  `;
}

function filterAndDisplayGames() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm) ||
      getGenreLabel(game.genre).includes(searchTerm);

    const matchesGenre = currentGenre === 'all' || game.genre === currentGenre;

    return matchesSearch && matchesGenre;
  });

  if (filtered.length === 0) {
    gamesGrid.innerHTML = '';
    noResults.style.display = 'flex';
  } else {
    gamesGrid.innerHTML = filtered.map(createGameCard).join('');
    noResults.style.display = 'none';
  }
}

searchInput.addEventListener('input', filterAndDisplayGames);

categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentGenre = btn.dataset.genre;
    filterAndDisplayGames();
  });
});

filterAndDisplayGames();
