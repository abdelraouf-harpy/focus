const quotes = [
    "على قدر أهل العزم تأتي العزائم.",
    "التركيز هو سر القوة.",
    "خالد بن الوليد: لا نامت أعين الجبناء.",
    "أنت يا Harpy: التركيز اليوم هو ثمرة النجاح غداً."
    // أضف أي عدد من الجمل هنا مستقبلاً بسهولة
];

const core = {
    list: [], timer: null, left: 0, paused: false, allDone: false, wakeLock: null,

    async requestWakeLock() {
        try { if ('wakeLock' in navigator) this.wakeLock = await navigator.wakeLock.request('screen'); }
        catch (err) { console.log("WakeLock error"); }
    },

    releaseWakeLock() { if (this.wakeLock) { this.wakeLock.release(); this.wakeLock = null; } },

    add() {
        const name = document.getElementById('tName').value.trim();
        const h = parseInt(document.getElementById('tH').value) || 0;
        const m = parseInt(document.getElementById('tM').value) || 0;
        if(!name || (h===0 && m===0)) return alert("أدخل البيانات كاملة");
        this.list.push({ name, sec: (h*3600) + (m*60) });
        document.getElementById('tName').value = '';
        document.getElementById('tH').value = '0';
        document.getElementById('tM').value = '0';
        this.updateUI();
    },

    updateUI() {
        const count = this.list.length;
        if (count > 0) {
            document.getElementById('countDisplay').classList.remove('hidden');
            document.getElementById('countDisplay').textContent = `المهام المضافة: ${count}`;
            document.getElementById('startBtn').classList.remove('hidden');
        }
    },

    begin() {
        document.getElementById('setupView').classList.add('hidden');
        document.getElementById('focusView').classList.remove('hidden');
        this.requestWakeLock();
        this.load();
    },

    load() {
        const current = this.list[0];
        document.getElementById('activeTask').textContent = current.name;
        this.left = current.sec;
        this.paused = false;
        this.updateDisp();
        this.start();
    },

    start() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if(!this.paused) {
                if(this.left > 0) { this.left--; this.updateDisp(); }
                else { this.finishOne(); }
            }
        }, 1000);
    },

    updateDisp() {
        const h = Math.floor(this.left / 3600).toString().padStart(2,'0');
        const m = Math.floor((this.left % 3600) / 60).toString().padStart(2,'0');
        const s = (this.left % 60).toString().padStart(2,'0');
        document.getElementById('disp').textContent = `${h}:${m}:${s}`;
    },

    toggle() {
        this.paused = !this.paused;
        document.getElementById('pBtn').textContent = this.paused ? "استئناف" : "إيقاف مؤقت";
        if(this.paused) this.releaseWakeLock(); else this.requestWakeLock();
    },

    reset() { this.left = this.list[0].sec; this.updateDisp(); },

    finishOne() {
        clearInterval(this.timer);
        this.list.shift();
        if(this.list.length === 0) { this.allDone = true; this.showFinal(); }
        else { this.showMotivation(); }
    },

    showMotivation() {
        document.getElementById('quoteArea').textContent = quotes[Math.floor(Math.random()*quotes.length)];
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    showFinal() {
        document.getElementById('modalEmoji').textContent = "🏆";
        document.getElementById('quoteArea').innerHTML = "انتهت المهمة بنجاح!";
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    closeModal() {
        document.getElementById('motivationalModal').classList.add('hidden');
        if(this.allDone) {
            this.list = []; this.allDone = false;
            document.getElementById('focusView').classList.add('hidden');
            document.getElementById('setupView').classList.remove('hidden');
            document.getElementById('countDisplay').classList.add('hidden');
            document.getElementById('startBtn').classList.add('hidden');
            this.releaseWakeLock();
        } else { this.load(); }
    }
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !core.paused && !core.allDone && core.timer) core.requestWakeLock();
});
