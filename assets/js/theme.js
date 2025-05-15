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

// Обновление флаера Stack Exchange при смене темы
function updateStackExchangeFlair() {
    const flairImg = document.getElementById('stackoverflow-flair-flair-img');
    if (flairImg) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const theme = isDark ? 'dark' : 'clean';
        flairImg.src = `https://stackoverflow.com/users/flair/5136955.png?theme=${theme}`;
    }
}

// Обновление флаера Stack Exchange при смене темы
function updateCodeWarsFlair() {
    const flairImg = document.getElementById('codewars-flair-img');
    if (flairImg) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const theme = isDark ? 'dark' : 'light';
        flairImg.src = `https://www.codewars.com/users/IgorCova/badges/large?theme=${theme}`;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateStackExchangeFlair();

    // Обновляем при смене темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateStackExchangeFlair, 30); // Ждем завершения анимации темы
        });
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateStackExchangeFlair();

    // Обновляем при смене темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateCodeWarsFlair, 30);
        });
    }
});