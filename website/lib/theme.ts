const THEME_STORAGE_KEY = 'lichess-papers-theme';

export type ThemeMode = 'automatic' | 'light' | 'dark';

export function applyTheme(mode: ThemeMode, prefersDark: boolean) {
  const root = document.documentElement;
  const nextTheme = mode === 'automatic' ? (prefersDark ? 'dark' : 'light') : mode;
  const changeToken = String(Number(root.dataset.themeChangeToken ?? 0) + 1);

  root.dataset.themeChanging = '';
  root.dataset.themeChangeToken = changeToken;
  root.dataset.themeMode = mode;
  root.dataset.theme = nextTheme;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (root.dataset.themeChangeToken !== changeToken) {
        return;
      }

      delete root.dataset.themeChanging;
      delete root.dataset.themeChangeToken;
    });
  });
}

export function toggleTheme() {
  const currentMode = document.documentElement.dataset.themeMode;
  const nextMode: ThemeMode = currentMode === 'automatic' ? 'light' : currentMode === 'light' ? 'dark' : 'automatic';

  applyTheme(nextMode, window.matchMedia('(prefers-color-scheme: dark)').matches);
  window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
}
