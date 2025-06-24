import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type WatchlistItem = {
  id: string; 
  type: 'movie' | 'tv';
  title: string;
  poster_path: string;
  watched: boolean;
};

function createWatchlist() {
  // if (browser) {
  //   localStorage.removeItem('watchlist');
  // }
  const stored = browser ? localStorage.getItem('watchlist') : null;
  let initial = [];
  if (stored) {
    try {
      initial = JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing watchlist from localStorage:", error);
      initial = [];
    }
  }

  const { subscribe, update, set } = writable<WatchlistItem[]>(initial);

  subscribe((value) => {
    if (browser) {
      localStorage.setItem('watchlist', JSON.stringify(value));
    }
  });

  return {
    subscribe,
    add: (item: WatchlistItem) =>
      update((list) =>
        list.find((i) => i.id === item.id && i.type === item.type)
          ? list
          : [...list, item]
      ),
    remove: (id: string, type: 'movie' | 'tv') => 
      update((list) => list.filter((i) => i.id !== id || i.type !== type)),
    toggleWatched: (id: string, type: 'movie' | 'tv') => 
      update((list) =>
        list.map((i) =>
          i.id === id && i.type === type ? { ...i, watched: !i.watched } : i
        )
      ),
    reset: () => set([]),
  };
}

export const watchlist = createWatchlist();

if (browser) {
  // window.addEventListener('beforeunload', () => {
  //   localStorage.removeItem('watchlist');
  // });
}