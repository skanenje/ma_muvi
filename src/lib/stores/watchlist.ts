import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type WatchlistItem = {
  id: string; // Changed from number to string
  type: 'movie' | 'tv';
  title: string;
  poster_path: string;
  watched: boolean;
};

function createWatchlist() {
  if (browser) {
    localStorage.removeItem('watchlist');
  }
  const stored = browser ? localStorage.getItem('watchlist') : null;
  const initial = stored ? JSON.parse(stored) : [];

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
    remove: (id: string, type: 'movie' | 'tv') => // Changed parameter type
      update((list) => list.filter((i) => i.id !== id || i.type !== type)),
    toggleWatched: (id: string, type: 'movie' | 'tv') => // Changed parameter type
      update((list) =>
        list.map((i) =>
          i.id === id && i.type === type ? { ...i, watched: !i.watched } : i
        )
      ),
    reset: () => set([]),
  };
}

export const watchlist = createWatchlist();