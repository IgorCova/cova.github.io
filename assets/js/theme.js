document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');

    // Функция для применения темы
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
    };

    // Функция для обновления иконки
    const updateToggleIcon = (theme) => {
        if (toggle) {
            toggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    // Проверяем сохраненную тему или предпочтения системы
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Применяем начальную тему
    applyTheme(initialTheme);

    // Обработчик клика
    if (toggle) {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Следим за изменениями системных предпочтений
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});
