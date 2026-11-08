'use strict';

/* =========================================================================
   💖 KHU VỰC CẤU HÌNH & CHỈNH SỬA DỄ DÀNG (THAY ĐỔI THÔNG TIN TẠI ĐÂY)
   =========================================================================
   Bạn có thể chỉnh sửa các thông tin bên dưới để cá nhân hóa món quà:
   1. name        : Tên người nhận (xuất hiện trên vé, tiêu đề thư, bánh kem)
   2. musicUrl    : File nhạc ("nhac.mp3" đặt cùng thư mục web)
   3. letterPhoto : Ảnh kỷ niệm trong bức thư (bạn có thể đổi ảnh riêng tại đây)
   4. photos      : Danh sách ảnh kỷ niệm rơi trong màn mưa sinh nhật
   5. message     : Nội dung bức thư gửi người ấy (hỗ trợ xuống dòng)
   6. signature   : Chữ ký ở cuối thư
   7. rainWishes  : Các câu chúc ngọt ngào rơi trong màn mưa sinh nhật
   ========================================================================= */

const CONFIG = {
    // 1. Tên người nhận (sẽ hiển thị trên vé, tiêu đề thư và bánh sinh nhật)
    name: "Khánh Vy",

    // 2. File nhạc nền chuyến tàu (chỉ cần đặt file nhac.mp3 vào cùng thư mục web):
    musicUrl: "nhac.mp3",

    // 3. Ảnh hiển thị riêng trong lá thư (bạn có thể đổi sang bất kỳ ảnh nào bạn muốn):
    letterPhoto: "image/anh2.jpg",

    // 4. Danh sách ảnh kỷ niệm rơi trong màn mưa sinh nhật (các ảnh trong thư mục image/):
    photos: [
        "image/anh1.jpg",
        "image/anh2.jpg",
        "image/anh3.jpg",
        "image/anh4.jpg",
        "image/anh5.jpg",
        "image/anh6.jpg",
        "image/anh7.jpg",
        "image/anh8.jpg",
        "image/anh11.jpg",
        "image/anh10.jpg"
    ],

    // 5. Nội dung bức thư gửi người ấy (có thể xuống dòng tự nhiên):
    message: `Chúc mừng sinh nhật chị, người em yêu!

Em vẫn nhớ những lần cùng chị trú mưa, những buổi ngồi ở quán quen và nụ cười khiến một ngày bình thường cũng trở nên thật đẹp. Cảm ơn chị đã cùng em tạo nên những kỷ niệm ấy.

Tuổi mới, mong chị luôn bình an, cười thật nhiều và có đủ tự tin để làm những điều chị yêu thích. Những ngày mệt mỏi, cứ nghỉ một chút, kể cả tâm trí của chị, nhé. Em luôn muốn ở bên, lắng nghe chị và là chỗ dựa của chị.

Em không biết tất cả những nơi mình sẽ đi qua. Nhưng em mong, trong nhiều chuyến đi sắp tới, người ngồi cạnh em vẫn là chị.

Yêu chị, hôm nay và những ngày sau. ♡`,

    // 6. Chữ ký ở cuối bức thư:
    signature: "Yêu chị, Bảo Huy ♡",

    // 7. Các câu chúc ngọt ngào rơi cùng ảnh trong màn sinh nhật:
    rainWishes: [
        " Yêu chị ♡",
        "Happy Birthday!",
        "Cảm ơn chị đã đến.",
        "Luôn cười thật nhiều nhé.",
        "Mong chị luôn bình an.",
        "Thương chị mỗi ngày.",
        "Mình luôn có nhau ♡",
        "Tuổi mới, thật nhiều niềm vui!"
    ]
};

// Đồng bộ biến cấu hình cho toàn bộ hệ thống (giữ nguyên hoạt động của code)
const cfg = {
    name: CONFIG.name,
    music: CONFIG.musicUrl,
    letterPhoto: CONFIG.letterPhoto,
    photos: CONFIG.photos,
    message: CONFIG.message
};
const MUSIC_URL = CONFIG.musicUrl;
const $ = id => document.getElementById(id);

/* =========================================================================
   ⚙️ MÃ NGUỒN CHÍNH (TOÀN BỘ LOGIC HOẠT HỌA & HIỆU ỨNG ĐƯỢC GIỮ NGUYÊN 100%)
   ========================================================================= */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; let page = 'station', rideStep = 0, rideTimer, run = 0; const order = ['station', 'ride', 'planet']; const labels = ['NHÀ GA', 'LÁ THƯ', 'SINH NHẬT'];
function show(id) { page = id; order.forEach(s => $(s).hidden = s !== id); window.scrollTo(0, 0) }
function illustration(i) { const colors = [['#ad8daa', '#f0c9d7'], ['#9a889f', '#f0d8bb'], ['#bd91a8', '#f5d0c5']][i % 3]; const shapes = [`<path d="M70 180Q200 30 330 180Z" fill="#f6d9dc"/><path d="M200 180v110q0 40 35 20" fill="none" stroke="#624a67" stroke-width="9"/><path d="M80 60l-12 30m70-55-12 30m180-15-12 30m60 70-12 30" stroke="#efe4ec" stroke-width="5"/>`, `<rect x="70" y="100" width="260" height="230" rx="5" fill="#edc9c6"/><path d="M50 115l50-65h200l50 65" fill="#815975"/><rect x="105" y="155" width="65" height="100" rx="32" fill="#ffebc4"/><rect x="215" y="155" width="70" height="175" rx="35" fill="#ffebc4"/>`, `<path d="M200 307C-10 169 123 45 200 153C280 45 410 169 200 307" fill="#f6d6d7"/><path d="M168 207q32 35 64 0" fill="none" stroke="#b67e97" stroke-width="6" stroke-linecap="round"/>`][i % 3]; const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="450"><rect width="400" height="450" fill="${colors[0]}"/><circle cx="300" cy="75" r="35" fill="${colors[1]}" opacity=".5"/>${shapes}</svg>`; return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) }
const placeholders = [0, 1, 2].map(illustration); function pics() { return cfg.photos.length ? cfg.photos : placeholders } function pic(i) { return pics()[i % pics().length] }
function letterPic() { return (CONFIG.letterPhoto && CONFIG.letterPhoto.trim()) ? CONFIG.letterPhoto.trim() : pic(0) }

// ====== MUSIC MANAGER (Chạm/click bất kỳ đâu trên màn hình là phát nhạc) ======
// ► Sử dụng HTML5 Audio thuần 100% — TUYỆT ĐỐI KHÔNG DÙNG IFRAME VIDEO
// ► Đảm bảo trên Zalo, Messenger, Safari, Chrome KHÔNG BAO GIỜ bị nhảy video hay chiếm màn hình!
// ► Chạm hoặc nhấn bất kỳ đâu trên màn hình là nhạc nền phát êm ái ngay lập tức.

let musicPlaying = false, gestureBound = false, musicStarted = false;
const bgMusic = new Audio();
bgMusic.loop = true;
bgMusic.volume = 0.8;
bgMusic.preload = 'auto';

// Nạp file nhạc từ CONFIG (mặc định: nhac.mp3)
(function initAudio() {
    bgMusic.src = (CONFIG.musicUrl || 'nhac.mp3').trim();
    try { bgMusic.load(); } catch (e) { }
})();

function playMusic() {
    if (musicStarted && !bgMusic.paused) return;
    musicPlaying = true;
    bgMusic.play().then(() => {
        musicStarted = true;
    }).catch(() => {
        // Trình duyệt chặn autoplay ban đầu — onScreenTouch sẽ thử lại khi người dùng chạm
    });
}

function pauseMusic() {
    musicPlaying = false;
    bgMusic.pause();
}

// Bất kỳ chạm/nhấn nào vào màn hình cũng kích hoạt phát nhạc ngay
function onScreenTouch() {
    if (!musicStarted) {
        playMusic();
    }
}

function setupMusicGesture() {
    if (gestureBound) return;
    gestureBound = true;
    ['pointerdown', 'touchstart', 'touchend', 'mousedown', 'click', 'keydown'].forEach(evt => {
        window.addEventListener(evt, onScreenTouch, { capture: true, passive: true });
        document.addEventListener(evt, onScreenTouch, { capture: true, passive: true });
    });
}
setupMusicGesture();

function removeMusicGesture() {
    // Giữ lại listener để đảm bảo nhạc luôn phát khi cần
}

function apply() {
    document.querySelectorAll('.recipient').forEach(e => e.textContent = cfg.name);
    document.title = `Chuyến tàu sinh nhật của ${cfg.name} ♡`;
    if (page === 'ride') renderRide();
    $('travelMessage').textContent = cfg.message;
    const lp = letterPic();
    $('travelPhoto').src = lp;
    $('travelPhoto').onclick = () => viewPhoto(lp);
    $('travelPhoto').style.cursor = 'pointer';
    if ($('travelSignature') && CONFIG.signature) $('travelSignature').textContent = CONFIG.signature;
    if (candlesOut) { startBirthdayRain(); document.querySelector('.birthday-content')?.classList.add('content-fadeout'); }

    setupMusicGesture();
    // Thử phát ngay nếu trình duyệt cho phép
    setTimeout(() => { playMusic(); }, 250);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
$('board').onclick = async () => {
    const token = ++run; $('board').disabled = true; $('ticket').classList.add('checked');
    if ($('boardHint')) $('boardHint').textContent = 'Vé đã được xác nhận. Chuyến tàu bắt đầu!';
    playMusic();
    await delay(reduce ? 100 : 850); $('train').classList.add('depart');
    await delay(reduce ? 100 : 1100); if (token !== run) return;
    rideStep = 0; show('ride'); renderRide();
};

const stops = [['Trạm Ngày Mưa', 'Hôm ấy trời mưa, nhưng có em nên anh vẫn thấy thật vui.'], ['Trạm Quán Quen', 'Một chỗ ngồi quen, và người anh luôn muốn ngồi cạnh.'], ['Trạm Nụ Cười', 'Đây là điều khiến mọi chuyến đi của anh trở nên đáng nhớ.']];
function renderRide() {
    clearTimeout(rideTimer);
    const lines = [
        'Chuyến tàu mang theo một món quà nhỏ em dành riêng cho chị.',
        'Trong đó có những kỷ niệm, những lời chưa nói và thật nhiều yêu thương.',
        'Có một lá thư đang chờ. Chị mở ra cùng em nhé?'
    ];
    rideStep = Math.min(rideStep, 2);
    $('rideText').textContent = lines[rideStep];
    $('letterReveal').hidden = rideStep < 2;
    if ($('rideNext')) $('rideNext').hidden = true;
    if (rideStep < 2) {
        rideTimer = setTimeout(() => {
            if (page === 'ride' && !document.hidden) {
                rideStep++;
                renderRide();
            }
        }, 2000);
    }
}
if ($('rideNext')) $('rideNext').onclick = () => { rideStep++; renderRide(); };
$('openTravelLetter').onclick = () => {
    $('travelMessage').textContent = cfg.message;
    const currentLp = letterPic();
    $('travelPhoto').src = currentLp;
    $('travelPhoto').onclick = () => viewPhoto(currentLp);
    $('travelLetter').showModal();
};
$('closeTravelLetter').onclick = () => $('travelLetter').close();
$('continueJourney').onclick = () => { $('travelLetter').close(); clearTimeout(rideTimer); show('planet'); };
function viewPhoto(src) { $('viewerImage').src = src; if ($('viewerCaption')) $('viewerCaption').textContent = ''; $('viewer').showModal(); }
$('closeViewer').onclick = () => $('viewer').close();
let candlesOut = false, rainPaused = false;
function startBirthdayRain() {
    const layer = $('birthdayRain');
    layer.replaceChildren();
    const words = (CONFIG.rainWishes && CONFIG.rainWishes.length) ? CONFIG.rainWishes : [
        `Anh yêu ${cfg.name} ♡`, 'Happy Birthday!', 'Cảm ơn chị iu đã đến.',
        'Luôn cười thật nhiều nhé.', 'Mong chị luôn bình an.', 'Thương chị mỗi ngày.',
        'Mình luôn có nhau ♡', 'Tuổi mới, thật nhiều niềm vui!'
    ];
    const isMobile = window.innerWidth < 650;
    const count = isMobile ? 36 : 52;

    // Tạo danh sách phần tử: phân bổ đều ảnh, câu chúc và trái tim
    const numPhotos = Math.round(count * 0.35);
    const numHearts = Math.round(count * 0.18);
    const numWords = count - numPhotos - numHearts;

    const items = [];
    for (let p = 0; p < numPhotos; p++) {
        items.push({ type: 'photo', photoIndex: p });
    }
    for (let w = 0; w < numWords; w++) {
        items.push({ type: 'word', text: words[w % words.length] });
    }
    for (let h = 0; h < numHearts; h++) {
        items.push({ type: 'heart', text: '♡' });
    }

    // Xáo trộn ngẫu nhiên hoàn toàn thứ tự các phần tử (Fisher-Yates)
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    // Phân bổ vị trí ngang trải đều khắp toàn màn hình từ 3% đến 88%, không bị dồn 1 bên
    const minLeft = 3;
    const maxLeft = isMobile ? 82 : 88;
    const laneSlots = [];
    for (let i = 0; i < items.length; i++) {
        laneSlots.push(minLeft + (i / (items.length - 1)) * (maxLeft - minLeft));
    }
    // Xáo trộn độc lập các vị trí ngang
    for (let i = laneSlots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [laneSlots[i], laneSlots[j]] = [laneSlots[j], laneSlots[i]];
    }

    // Khởi tạo các phần tử rơi ngẫu nhiên liên tục
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const e = document.createElement('div');

        if (item.type === 'photo') {
            e.className = 'birthday-drop rain-photo';
            const im = new Image();
            const photoSrc = pic(item.photoIndex);
            im.src = photoSrc;
            im.alt = 'Ảnh kỷ niệm';
            e.append(im);
            e.onclick = (evt) => { evt.stopPropagation(); viewPhoto(photoSrc); };
            e.style.cursor = 'pointer';
            e.style.pointerEvents = 'auto';
        } else if (item.type === 'word') {
            e.className = 'birthday-drop rain-word';
            e.textContent = item.text;
        } else {
            e.className = 'birthday-drop rain-heart';
            e.textContent = item.text;
        }

        // Tọa độ ngang ngẫu nhiên tự nhiên
        const jitter = Math.random() * 4 - 2;
        const posX = Math.max(minLeft, Math.min(maxLeft, laneSlots[i] + jitter));
        e.style.left = posX.toFixed(1) + '%';

        // Góc nghiêng và đung đưa nhẹ nhàng
        e.style.setProperty('--tilt', (Math.random() * 22 - 11).toFixed(1) + 'deg');
        e.style.setProperty('--sway', (Math.random() * 32 - 16).toFixed(1) + 'px');
        e.style.setProperty('--stillTop', (6 + Math.random() * 78).toFixed(1) + '%');

        // Thời gian rơi và delay so le liên tục
        const duration = (8 + Math.random() * 5.5).toFixed(1);
        const delayTime = (i * 0.22 + Math.random() * 0.15).toFixed(2);
        e.style.animationDuration = duration + 's';
        e.style.animationDelay = delayTime + 's';

        layer.append(e);
    }
    layer.classList.toggle('rain-paused', rainPaused);
}
let fwAnim = null; const fwCanvas = $('fireworkCanvas'), fwCtx = fwCanvas ? fwCanvas.getContext('2d') : null;
let fwRockets = [], fwParticles = [], fwRings = [];
function resizeFw() { if (!fwCanvas) return; fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }
window.addEventListener('resize', resizeFw); resizeFw();

function createExplosion(x, y, baseHue, count = 90, maxSpeed = 7) {
    if (!fwCtx) return;
    fwRings.push({ x, y, radius: 2, maxRadius: (window.innerWidth < 650 ? 38 : 62) + Math.random() * 20, alpha: 1, hue: baseHue });
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.12 - 0.06);
        const speed = Math.pow(Math.random(), 0.55) * maxSpeed + 0.6;
        const hue = (baseHue + Math.random() * 36 - 18 + 360) % 360;
        fwParticles.push({
            x, y, history: [{ x, y }, { x, y }],
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            friction: 0.958, gravity: 0.11, hue, brightness: 62 + Math.random() * 32,
            alpha: 1, decay: Math.random() * 0.013 + 0.008, size: Math.random() * 2 + 1.2,
            sparkle: Math.random() > 0.35
        });
    }
    if (!fwAnim) fwAnim = requestAnimationFrame(fwLoop);
}

function launchRocket(sx, sy, tx, ty, hue) {
    const angle = Math.atan2(ty - sy, tx - sx), dist = Math.hypot(tx - sx, ty - sy);
    fwRockets.push({ x: sx, y: sy, targetX: tx, targetY: ty, history: [{ x: sx, y: sy }], angle, speed: Math.max(12, dist / 26), hue });
    if (!fwAnim) fwAnim = requestAnimationFrame(fwLoop);
}

function fwLoop() {
    if (!fwCtx) return;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fwCtx.globalCompositeOperation = 'lighter';
    for (let i = fwRings.length - 1; i >= 0; i--) {
        const r = fwRings[i]; r.radius += (r.maxRadius - r.radius) * 0.18 + 0.8; r.alpha -= 0.05;
        if (r.alpha <= 0) { fwRings.splice(i, 1); continue; }
        fwCtx.save(); fwCtx.beginPath(); fwCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        fwCtx.strokeStyle = `hsla(${r.hue}, 100%, 75%, ${r.alpha})`; fwCtx.lineWidth = 2.5; fwCtx.stroke(); fwCtx.restore();
    }
    for (let i = fwRockets.length - 1; i >= 0; i--) {
        const r = fwRockets[i]; r.history.push({ x: r.x, y: r.y }); if (r.history.length > 5) r.history.shift();
        r.x += Math.cos(r.angle) * r.speed; r.y += Math.sin(r.angle) * r.speed;
        fwCtx.save(); fwCtx.beginPath(); fwCtx.moveTo(r.history[0].x, r.history[0].y);
        for (let k = 1; k < r.history.length; k++) fwCtx.lineTo(r.history[k].x, r.history[k].y);
        fwCtx.lineTo(r.x, r.y); fwCtx.strokeStyle = `hsla(${r.hue}, 100%, 82%, 0.85)`; fwCtx.lineWidth = 3; fwCtx.lineCap = 'round'; fwCtx.stroke();
        fwCtx.beginPath(); fwCtx.arc(r.x, r.y, 3, 0, Math.PI * 2); fwCtx.fillStyle = '#fff'; fwCtx.fill(); fwCtx.restore();
        if (r.y <= r.targetY || Math.hypot(r.targetX - r.x, r.targetY - r.y) < r.speed * 1.2) {
            createExplosion(r.targetX, r.targetY, r.hue, window.innerWidth < 650 ? 75 : 105, window.innerWidth < 650 ? 5.5 : 7.5);
            fwRockets.splice(i, 1);
        }
    }
    for (let i = fwParticles.length - 1; i >= 0; i--) {
        const p = fwParticles[i]; p.history.push({ x: p.x, y: p.y }); if (p.history.length > 4) p.history.shift();
        p.vx *= p.friction; p.vy *= p.friction; p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.alpha -= p.decay;
        if (p.alpha <= 0) { fwParticles.splice(i, 1); continue; }
        const flicker = p.sparkle && Math.random() > 0.35 ? 1.4 : 1.0;
        const a = Math.max(0, Math.min(1, p.alpha * flicker));
        fwCtx.save(); fwCtx.beginPath(); fwCtx.moveTo(p.history[0].x, p.history[0].y);
        for (let k = 1; k < p.history.length; k++) fwCtx.lineTo(p.history[k].x, p.history[k].y);
        fwCtx.lineTo(p.x, p.y); fwCtx.strokeStyle = `hsla(${p.hue}, 100%, ${p.brightness}%, ${a * 0.75})`;
        fwCtx.lineWidth = p.size; fwCtx.lineCap = 'round'; fwCtx.stroke();
        fwCtx.beginPath(); fwCtx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        fwCtx.fillStyle = `hsla(${p.hue}, 90%, 94%, ${a})`; fwCtx.fill(); fwCtx.restore();
    }
    if (fwRockets.length > 0 || fwParticles.length > 0 || fwRings.length > 0) {
        fwAnim = requestAnimationFrame(fwLoop);
    } else {
        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height); fwAnim = null;
    }
}

$('blowCandles').onclick = () => { if (candlesOut) return; candlesOut = true; $('blowCandles').disabled = true; $('blowCandles').hidden = true; $('cakeStage').classList.add('candles-out'); $('cakeIntro').textContent = 'Điều ước của em đã được gửi đến những vì sao.'; launchFireworks(); startBirthdayRain(); setTimeout(() => { document.querySelector('.birthday-content')?.classList.add('content-fadeout'); }, 3000); };

function launchFireworks() {
    if (reduce || !fwCtx) return;
    resizeFw();
    const w = fwCanvas.width, h = fwCanvas.height;
    const cakeEl = $('cakeStage');
    const rect = cakeEl ? cakeEl.getBoundingClientRect() : { left: w / 2, top: h * 0.65, width: 0, height: 0 };
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.35;
    createExplosion(cx, cy, 45, w < 650 ? 65 : 95, w < 650 ? 5 : 7);
    setTimeout(() => launchRocket(cx - 35, cy, w * 0.28, h * 0.24, 340), 160);
    setTimeout(() => launchRocket(cx + 35, cy, w * 0.72, h * 0.22, 275), 320);
    setTimeout(() => launchRocket(cx, cy, w * 0.50, h * 0.16, 48), 580);
    setTimeout(() => createExplosion(w * 0.18, h * 0.36, 175, w < 650 ? 60 : 85, 6), 850);
    setTimeout(() => createExplosion(w * 0.82, h * 0.34, 320, w < 650 ? 60 : 85, 6), 1050);
    setTimeout(() => createExplosion(w * 0.50, h * 0.22, 52, w < 650 ? 85 : 120, 8), 1300);
}
for (let i = 0; i < 75; i++) { const s = document.createElement('i'); s.className = 'spark'; s.style.left = Math.random() * 100 + '%'; s.style.top = Math.random() * 100 + '%'; const size = i % 7 === 0 ? 3 : 1.5; s.style.width = s.style.height = size + 'px'; s.style.animationDelay = -Math.random() * 5 + 's'; s.style.opacity = .3 + Math.random() * .5; $('starfield').append(s) }
document.addEventListener('visibilitychange', () => { document.body.classList.toggle('tab-paused', document.hidden); if (document.hidden) { clearTimeout(rideTimer); } else { if (page === 'ride' && rideStep < 3) renderRide(); } }); apply();
