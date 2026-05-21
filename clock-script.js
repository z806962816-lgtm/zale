// Default time zones
const DEFAULT_TIMEZONES = [
    'Asia/Shanghai',
    'Europe/London',
    'America/New_York',
    'Australia/Sydney'
];

let selectedTimezones = [];
let format24 = true;
let showSeconds = true;
let darkMode = true;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    initializeClocks();
    setupEventListeners();
    updateTime();
    setInterval(updateTime, 1000);
});

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('clockSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        selectedTimezones = settings.timezones || DEFAULT_TIMEZONES;
        format24 = settings.format24 !== false;
        showSeconds = settings.showSeconds !== false;
        darkMode = settings.darkMode !== false;
    } else {
        selectedTimezones = DEFAULT_TIMEZONES;
    }

    // Apply settings to UI
    document.getElementById('format24').checked = format24;
    document.getElementById('showSeconds').checked = showSeconds;
    document.getElementById('darkMode').checked = darkMode;
    applyDarkMode(darkMode);
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        timezones: selectedTimezones,
        format24: format24,
        showSeconds: showSeconds,
        darkMode: darkMode
    };
    localStorage.setItem('clockSettings', JSON.stringify(settings));
}

// Initialize clocks
function initializeClocks() {
    renderClocks();
}

// Render all clocks
function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    grid.innerHTML = '';

    selectedTimezones.forEach((timezone, index) => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <div class="clock-card-header">
                <div class="clock-card-location">
                    <h3 class="timezone-name">${formatTimezoneName(timezone)}</h3>
                    <div class="clock-card-date">Loading...</div>
                </div>
                <button class="remove-clock" onclick="removeTimezone(${index})" title="Remove">✕</button>
            </div>
            <div class="clock-card-time" data-timezone="${timezone}">00:00:00</div>
            <div class="clock-card-utc">UTC<span class="utc-offset"> +00:00</span></div>
        `;
        grid.appendChild(card);
    });
}

// Format timezone name
function formatTimezoneName(timezone) {
    return timezone.split('/').join(' → ');
}

// Update time for all clocks
function updateTime() {
    // Update main clock
    updateMainClock();

    // Update timezone clocks
    document.querySelectorAll('.clock-card-time').forEach(element => {
        const timezone = element.getAttribute('data-timezone');
        const time = getTimeInTimezone(timezone);
        element.textContent = formatTime(time);

        // Update UTC offset
        const card = element.closest('.clock-card');
        const utcOffset = getUTCOffset(timezone);
        card.querySelector('.utc-offset').textContent = utcOffset;

        // Update date
        const dateElement = card.querySelector('.clock-card-date');
        dateElement.textContent = formatDate(time, timezone);
    });
}

// Update main clock
function updateMainClock() {
    const time = getTimeInTimezone('Asia/Shanghai');
    const timeStr = formatTime(time);
    const [timeDisplay, period] = formatMainClockTime(time);

    document.getElementById('mainTime').textContent = timeDisplay;
    document.getElementById('mainPeriod').textContent = period;
    document.getElementById('mainDate').textContent = formatDate(time, 'Asia/Shanghai');
    document.getElementById('mainLocation').textContent = 'Beijing Time';
}

// Get time in specific timezone
function getTimeInTimezone(timezone) {
    const date = new Date();
    try {
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const offset = tzDate - utcDate;
        return new Date(date.getTime() + offset);
    } catch (e) {
        return date;
    }
}

// Get UTC offset string
function getUTCOffset(timezone) {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60); // minutes
    const hours = Math.floor(offset / 60);
    const minutes = Math.abs(offset % 60);
    const sign = hours >= 0 ? '+' : '';
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Format time
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (!showSeconds) {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

// Format main clock time with AM/PM
function formatMainClockTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    let period = 'AM';

    if (format24) {
        return [`${String(hours).padStart(2, '0')}:${minutes}${showSeconds ? ':' + seconds : ''}`, ''];
    }

    if (hours >= 12) {
        period = 'PM';
        hours = hours > 12 ? hours - 12 : hours;
    }
    hours = hours === 0 ? 12 : hours;

    return [`${String(hours).padStart(2, '0')}:${minutes}${showSeconds ? ':' + seconds : ''}`, period];
}

// Format date
function formatDate(date, timezone) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    try {
        return date.toLocaleDateString('zh-CN', { timeZone: timezone, ...options });
    } catch (e) {
        return date.toLocaleDateString('zh-CN', options);
    }
}

// Add timezone
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;

    if (!selectedTimezones.includes(timezone)) {
        selectedTimezones.push(timezone);
        saveSettings();
        renderClocks();
        updateTime();
    }
}

// Remove timezone
function removeTimezone(index) {
    selectedTimezones.splice(index, 1);
    saveSettings();
    renderClocks();
}

// Apply dark mode
function applyDarkMode(enabled) {
    if (enabled) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add timezone button
    document.getElementById('addTimezoneBtn').addEventListener('click', addTimezone);

    // Format toggle
    document.getElementById('format24').addEventListener('change', function() {
        format24 = this.checked;
        saveSettings();
        updateTime();
    });

    // Seconds toggle
    document.getElementById('showSeconds').addEventListener('change', function() {
        showSeconds = this.checked;
        saveSettings();
        updateTime();
    });

    // Dark mode toggle
    document.getElementById('darkMode').addEventListener('change', function() {
        darkMode = this.checked;
        applyDarkMode(darkMode);
        saveSettings();
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', function() {
        if (confirm('你确定要重置所有设置吗？')) {
            selectedTimezones = DEFAULT_TIMEZONES;
            format24 = true;
            showSeconds = true;
            darkMode = true;
            localStorage.removeItem('clockSettings');
            loadSettings();
            renderClocks();
            updateTime();
        }
    });
}

// Allow Enter key to add timezone
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('timezoneSelect') === document.activeElement) {
        addTimezone();
    }
});