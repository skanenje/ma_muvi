import { writable } from 'svelte/store';

type WatchlistItem = {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string;
  watched: boolean;
};

function createWatchlist() {
  const stored = localStorage.getItem('watchlist');
  const initial = stored ? JSON.parse(stored) : [];

  const { subscribe, update, set } = writable<WatchlistItem[]>(initial);

  subscribe((value) => {
    localStorage.setItem('watchlist', JSON.stringify(value));
  });

  return {
    subscribe,
    add: (item: WatchlistItem) =>
      update((list) =>
        list.find((i) => i.id === item.id && i.type === item.type)
          ? list
          : [...list, item]
      ),
    remove: (id: number, type: 'movie' | 'tv') =>
      update((list) => list.filter((i) => i.id !== id || i.type !== type)),
    toggleWatched: (id: number, type: 'movie' | 'tv') =>
      update((list) =>
        list.map((i) =>
          i.id === id && i.type === type ? { ...i, watched: !i.watched } : i
        )
      ),
    reset: () => set([]),
  };
}

export const watchlist = createWatchlist();
