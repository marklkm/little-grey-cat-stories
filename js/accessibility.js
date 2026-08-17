(() => {
  const root = document.documentElement;
  const body = document.body;
  const byId = id => document.getElementById(id);

  const defaults = { scale: 1, dyslexic: false, contrast: false, dark: false, focus: false };

  let settings = { ...defaults };
  try {
    settings = { ...defaults, ...JSON.parse(localStorage.getItem('lgcReadingSettings') || '{}') };
  } catch {}

  function save() {
    localStorage.setItem('lgcReadingSettings', JSON.stringify(settings));
  }

  function apply() {
    root.style.setProperty('--reader-scale', settings.scale);
    body.classList.toggle('dyslexia-font', settings.dyslexic);
    body.classList.toggle('high-contrast', settings.contrast);
    body.classList.toggle('dark-mode', settings.dark);
    body.classList.toggle('focus-mode', settings.focus);

    if (byId('dyslexicToggle')) byId('dyslexicToggle').checked = settings.dyslexic;
    if (byId('contrastToggle')) byId('contrastToggle').checked = settings.contrast;
    if (byId('darkModeToggle')) byId('darkModeToggle').checked = settings.dark;
    if (byId('focusModeToggle')) byId('focusModeToggle').checked = settings.focus;
  }

  byId('fontDecrease')?.addEventListener('click', () => {
    settings.scale = Math.max(.9, +(settings.scale - .1).toFixed(1)); save(); apply();
  });

  byId('fontReset')?.addEventListener('click', () => {
    settings.scale = 1; save(); apply();
  });

  byId('fontIncrease')?.addEventListener('click', () => {
    settings.scale = Math.min(1.6, +(settings.scale + .1).toFixed(1)); save(); apply();
  });

  byId('dyslexicToggle')?.addEventListener('change', e => {
    settings.dyslexic = e.target.checked; save(); apply();
  });

  byId('contrastToggle')?.addEventListener('change', e => {
    settings.contrast = e.target.checked; save(); apply();
  });

  byId('darkModeToggle')?.addEventListener('change', e => {
    settings.dark = e.target.checked; save(); apply();
  });

  byId('focusModeToggle')?.addEventListener('change', e => {
    settings.focus = e.target.checked; save(); apply();
  });

  byId('settingsReset')?.addEventListener('click', () => {
    settings = { ...defaults }; save(); apply();
  });

  apply();
})();