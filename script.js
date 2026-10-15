/* ==========================================================================
   JAVASCRIPT CORE LOGIC FOR PROFILE WEBSITE (QUANG TUAN PROFILE)
   ========================================================================== */

// --- Configuration Settings ---
const CONFIG = {
    // ID Discord của bạn (để lấy trạng thái thời gian thực qua Lanyard API)
    // Đã cập nhật ID chính thức của Quang Tuấn
    DISCORD_USER_ID: "991231406535610369",

    // Danh sách câu gõ chữ tự động (Typing Quote Box)
    TYPING_QUOTES: [
        "Khuya rồi, ngủ ngon nhé 🌙",
        "Thư giãn & tận hưởng từng giai điệu 🎧",
        "Tận hưởng cuộc sống bên ly cà phê thơm ☕",
        "Chào mừng bạn đến với góc bình yên của mình ✨"
    ],

    // Danh sách bài hát (Đã cập nhật bài hot rap & chill tình cảm)
    PLAYLIST: [
        {
            title: "MÁU & MỒ HÔI",
            artist: "playboicamau",
            src: "mau_va_mo_hoi.m4a"
        },
        {
            title: "Bước Qua Nhau",
            artist: "Vũ.",
            src: "buoc_qua_nhau.m4a"
        }
    ]
};

// --- DOM Elements ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const mouseSpotlight = document.getElementById('mouse-spotlight');
const cursorDot = document.getElementById('cursor-dot');
const cyberCursor = document.getElementById('cyber-cursor');
const enterOverlay = document.getElementById('enter-overlay');
const enterBtn = document.getElementById('enter-btn');
const mainWrapper = document.getElementById('main-wrapper');

const digitalClock = document.getElementById('digital-clock');
const typingTextEl = document.getElementById('typing-text');
const toastContainer = document.getElementById('toast-container');

// Copy Buttons
const copyUsernameBtn = document.getElementById('copy-username-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');

// Music Player Elements
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitleEl = document.getElementById('track-title');
const trackMetaEl = document.getElementById('track-meta');
const vinylDisc = document.getElementById('vinyl-disc');
const equalizer = document.getElementById('equalizer');
const volumeSlider = document.getElementById('volume-slider');

// --- Global State ---
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();
audio.crossOrigin = "anonymous";

/* ==========================================================================
   1. CANVAS STARFIELD PARTICLES SYSTEM
   ========================================================================== */
let particles = [];
const PARTICLE_COUNT = 55;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.6 + 0.5,
            color: Math.random() > 0.5 ? 'rgba(255, 255, 255, ' : 'rgba(56, 189, 248, ',
            alpha: Math.random() * 0.7 + 0.2,
            speedY: Math.random() * 0.4 + 0.1,
            speedX: (Math.random() - 0.5) * 0.2
        });
    }
}

function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
            p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    });

    requestAnimationFrame(renderParticles);
}

window.addEventListener('resize', initCanvas);

/* ==========================================================================
   2. CYBER CURSOR & SPOTLIGHT MOUSE TRACKING
   ========================================================================== */
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct update for spotlight & small dot
    mouseSpotlight.style.left = `${mouseX}px`;
    mouseSpotlight.style.top = `${mouseY}px`;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
    // Lerp smooth movement for cyber reticle
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cyberCursor.style.left = `${cursorX}px`;
    cyberCursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
}

/* ==========================================================================
   3. ENTER OVERLAY & SANCTUARY UNLOCK
   ========================================================================== */
function unlockSanctuary() {
    enterOverlay.classList.add('fade-out');
    mainWrapper.classList.remove('hidden-content');
    mainWrapper.classList.add('visible-content');

    // Auto start music on enter
    loadTrack(currentTrackIndex);
    playMusic();
}

enterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    unlockSanctuary();
});

enterOverlay.addEventListener('click', unlockSanctuary);

/* ==========================================================================
   4. MUSIC PLAYER SYSTEM
   ========================================================================== */
function loadTrack(index) {
    const track = CONFIG.PLAYLIST[index];
    audio.src = track.src;
    trackTitleEl.textContent = track.title;
    trackMetaEl.textContent = `${index + 1}/${CONFIG.PLAYLIST.length} • ${track.artist}`;
}

function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        playIcon.className = 'fa-solid fa-pause';
        vinylDisc.classList.add('spin');
        equalizer.classList.add('playing');
    }).catch(err => {
        console.log("Audio playback error:", err);
    });
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playIcon.className = 'fa-solid fa-play';
    vinylDisc.classList.remove('spin');
    equalizer.classList.remove('playing');
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + CONFIG.PLAYLIST.length) % CONFIG.PLAYLIST.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playMusic();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % CONFIG.PLAYLIST.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playMusic();
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

/* ==========================================================================
   5. TYPING TEXT ANIMATION
   ========================================================================== */
let quoteIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentQuote = CONFIG.TYPING_QUOTES[quoteIndex];

    if (isDeleting) {
        typingTextEl.textContent = currentQuote.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextEl.textContent = currentQuote.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentQuote.length) {
        typeSpeed = 2200; // Pause at end of quote
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        quoteIndex = (quoteIndex + 1) % CONFIG.TYPING_QUOTES.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

/* ==========================================================================
   6. DIGITAL CLOCK (GMT+7)
   ========================================================================== */
function updateClock() {
    const now = new Date();
    // Convert to GMT+7
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmt7Time = new Date(utcTime + (3600000 * 7));

    const hours = String(gmt7Time.getHours()).padStart(2, '0');
    const minutes = String(gmt7Time.getMinutes()).padStart(2, '0');
    const seconds = String(gmt7Time.getSeconds()).padStart(2, '0');

    digitalClock.textContent = `${hours}:${minutes}:${seconds} (GMT+7)`;
}
setInterval(updateClock, 1000);

/* ==========================================================================
   7. TOAST NOTIFICATIONS & COPY UTILITIES
   ========================================================================== */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

copyUsernameBtn.addEventListener('click', () => {
    navigator.clipboard.writeText("@tuan_1207");
    showToast("Đã sao chép Username @tuan_1207 vào bộ nhớ tạm!");
});

copyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép đường dẫn trang web!");
});

/* ==========================================================================
   8. LANYARD DISCORD REALTIME PRESENCE API
   ========================================================================== */
async function fetchDiscordStatus() {
    if (!CONFIG.DISCORD_USER_ID) return;

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${CONFIG.DISCORD_USER_ID}`);
        const data = await response.json();

        if (data.success && data.data) {
            const presence = data.data;
            const status = presence.discord_status;

            const badgeDot = document.querySelector('#discord-badge .badge-dot');
            const badgeText = document.getElementById('discord-badge-text');
            const statusVal = document.getElementById('presence-status-val');
            const presenceDot = document.getElementById('presence-dot');

            if (status === 'online') {
                badgeDot.className = 'badge-dot online';
                badgeText.textContent = 'DISCORD • TRỰC TUYẾN';
                statusVal.textContent = 'Trạng thái: Trực tuyến • Đang hoạt động';
                if (presenceDot) presenceDot.style.background = '#22c55e';
            } else if (status === 'idle') {
                badgeDot.className = 'badge-dot online';
                badgeText.textContent = 'DISCORD • CHỜ';
                statusVal.textContent = 'Trạng thái: Đang treo máy • Tạm vắng';
                if (presenceDot) presenceDot.style.background = '#f59e0b';
            } else if (status === 'dnd') {
                badgeDot.className = 'badge-dot online';
                badgeText.textContent = 'DISCORD • ĐỪNG LÀM PHIỀN';
                statusVal.textContent = 'Trạng thái: Đang bận • Đừng làm phiền';
                if (presenceDot) presenceDot.style.background = '#ef4444';
            } else {
                badgeDot.className = 'badge-dot offline';
                badgeText.textContent = 'DISCORD • NGOẠI TUYẾN';
                statusVal.textContent = 'Trạng thái: Ngoại tuyến • Sẵn sàng kết nối';
                if (presenceDot) presenceDot.style.background = '#6b7280';
            }
        }
    } catch (err) {
        console.log("Lanyard Discord API fetch info:", err);
    }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    renderParticles();
    animateCursor();
    typeEffect();
    updateClock();
    loadTrack(currentTrackIndex);
    fetchDiscordStatus();
    setInterval(fetchDiscordStatus, 30000); // Refresh Discord status every 30s
});
