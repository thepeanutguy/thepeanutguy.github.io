'use strict';

const PREFERS_COLOR_SCHEME_KEY = 'prefers-color-scheme';
const DARK = 'dark';
const LIGHT = 'light';

/**
 * @return {'dark' | 'light'}
 */
const determinePreferredColorScheme = () => {
  const local = localStorage.getItem(PREFERS_COLOR_SCHEME_KEY);

  if (local === null) {
    const { matches } = window.matchMedia(`(prefers-color-scheme: ${DARK})`);

    return matches
      ? DARK
      : LIGHT;
  }

  return local;
};

/**
 * @param {'dark' | 'light'} setTo
 * @return {void}
 */
const saveThemePreference = (setTo) => {
  if (setTo === DARK) {
    localStorage.setItem(PREFERS_COLOR_SCHEME_KEY, 'dark');

    return;
  }

  localStorage.setItem(PREFERS_COLOR_SCHEME_KEY, 'light');
};

window.onload = () => {
  const htmlEl = document.querySelector('html');
  const themeSwitcherButtonEl = document.querySelector('#theme-switcher-button');
  const themeSwitcherStateEl = document.querySelector('#theme-switcher-state');
  const prefersColorScheme = determinePreferredColorScheme();

  /**
   * @param {'dark' | 'light'} setTo
   * @return {void}
   */
  const toggleClassOnHtml = (setTo) => {
    if (setTo === DARK) {
      htmlEl.classList.remove('light-theme');
      htmlEl.classList.add('dark-theme');

      return;
    }

    htmlEl.classList.remove('dark-theme');
    htmlEl.classList.add('light-theme');
  };

  /**
   * @param {'dark' | 'light'} setTo
   * @return {void}
   */
  const toggleTheme = (setTo) => {
    if (setTo === DARK) {
      toggleClassOnHtml(DARK);
      saveThemePreference(DARK);
      themeSwitcherButtonEl.setAttribute('aria-pressed', 'true');
      themeSwitcherStateEl.textContent = 'on';

      return;
    }

    toggleClassOnHtml(LIGHT);
    saveThemePreference(LIGHT);
    themeSwitcherButtonEl.setAttribute('aria-pressed', 'false');
    themeSwitcherStateEl.textContent = 'off';
  };

  prefersColorScheme === 'dark'
    ? toggleTheme(DARK)
    : toggleTheme(LIGHT);

  themeSwitcherButtonEl.addEventListener('click', () => {
    const theme = themeSwitcherStateEl.textContent === 'on'
      ? LIGHT
      : DARK;

    toggleTheme(theme);
  });
};
