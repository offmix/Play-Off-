const games = [
  {
    id: 1,
    title: 'Brawl Stars',
    genre: 'action',
    path: 'Games/Brawl%20Stars.html',
    thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    title: 'Drift Hunters',
    genre: 'racing',
    path: 'Games/Drift%20Hunters.html',
    thumb: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'Geometry Dash',
    genre: 'action',
    path: 'Games/Geometry%20Dash.html',
    thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'Madalin Stunt Cars 2',
    genre: 'racing',
    path: 'Games/Madalin%20Stunt%20Cars%202',
    thumb: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    title: 'Madalin Stunt Cars 3',
    genre: 'racing',
    path: 'Games/Madalin%20Stunt%20Cars%203.html',
    thumb: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    title: 'RFS',
    genre: 'racing',
    path: 'Games/RFS.html',
    thumb: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    title: 'Slope',
    genre: 'action',
    path: 'Games/Slope.html',
    thumb: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    title: 'Survivor.io',
    genre: 'action',
    path: 'Games/Survivor.io.html',
    thumb: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80'
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
