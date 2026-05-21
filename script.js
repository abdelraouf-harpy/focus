// === Data & Storage ===
let userData = JSON.parse(localStorage.getItem('focusUser')) || null;

window.onload = function() {
    if(!userData) {
        document.getElementById('welcomeModal').classList.remove('hidden');
    } else {
        document.getElementById('welcomeModal').classList.add('hidden');
        applyPersonalization();
        syncUserWithAnalytics();
    }
};

function setGender(g) {
    const nameInput = document.getElementById('userNameInput');
    const name = nameInput.value.trim();
    if(!name) { 
        alert("اكتب اسمك الأول يا بطل!"); 
        return; 
    }
    
    userData = { name: name, gender: g };
    localStorage.setItem('focusUser', JSON.stringify(userData));
    
    document.getElementById('welcomeModal').classList.add('hidden');
    applyPersonalization();
    syncUserWithAnalytics();
}

function syncUserWithAnalytics() {
    if (userData && userData.name && typeof gtag === 'function') {
        gtag('set', 'user_properties', {
            'user_name': userData.name,
            'user_gender': userData.gender
        });
        gtag('config', 'G-584VY84B6Y', {
            'user_id': userData.name + '_' + new Date().getTime()
        });
    }
}

function applyPersonalization() {
    const display = document.getElementById('userDisplayName');
    const header = document.getElementById('userGlowHeader');
    if(userData && display && header) {
        display.textContent = userData.name;
        header.classList.remove('hidden');
    }
}

// === Audio Notification ===
function playBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'triangle';
        oscillator.frequency.value = 523.25; // C5 note
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        
        // Fade out to avoid click
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 1.5);
    } catch(e) {
        console.warn("Audio not supported or blocked", e);
    }
}

// === Quotes ===
const quotes = [
    "خالد بن الوليد: ما ليلة أُهديت إليّ فيها عروس.. أحب إليّ من ليلة شديدة البرد أصبّح فيها العدو.",
    "عمر بن الخطاب: لا تصغرنّ همتكم، فإني لم أرَ أقعد عن المكرمات من صغر الهمم.",
    "علي بن أبي طالب: قيمة كل امرئ ما يُحسنه.",
    "صلاح الدين الأيوبي: كيف أضحك والقدس أسيرة؟",
    "المتنبي: على قدر أهل العزم تأتي العزائم.. وتأتي على قدر الكرام المكارم.",
    "فيلم Braveheart: الجميع يموتون، لكن ليس كل الناس يعيشون حقاً.",
    "فيلم The Pursuit of Happyness: إذا كان لديك حلم، عليك أن تحميه.",
    "فيلم Rocky: الأمر لا يتعلق بقوة ضربتك، بل بمدى قدرتك على تلقي الضربات والاستمرار.",
    "فيلم Lion King: الماضي يمكن أن يؤلم، لكن يمكنك إما الهروب منه أو التعلم منه.",
    "ستيف جوبز: وقتك محدود، فلا تضيعه في عيش حياة شخص آخر.",
    "محمد علي كلاي: كرهت كل دقيقة من التدريب، ولكن قلت: لا تستسلم، عانِ الآن وعش بقية حياتك كبطل.",
    "ونستون تشرشل: النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس.",
    "طارق بن زياد: العدو من أمامكم والبحر من ورائكم.. ليس لكم والله إلا الصدق والصبر.",
    "عمر بن عبد العزيز: إن لي نفساً تواقة، كلما وصلت لشيء تاقت لما هو أعظم منه.",
    "ابن القيم: لو علم المتصدق أن صدقته تقع في يد الله قبل يد الفقير، لكانت لذة المعطي أكبر من لذة الآخذ.",
    "جلال الدين الرومي: لا تحزن، فكل ما تفقده يعود إليك في شكل آخر.",
    "المهاتما غاندي: كن أنت التغيير الذي تريد أن تراه في العالم.",
    "نيلسون مانديلا: يبدو الأمر دائماً مستحيلاً حتى يتم تحقيقه.",
    "فيلم Gladiator: ما نفعله في الحياة.. يتردد صداه في الأبدية.",
    "فيلم Batman Begins: لماذا نسقط؟ لكي نتعلم كيف نهض من جديد.",
    "إيلون ماسك: إذا كان الأمر مهماً بما يكفي، فعليك المحاولة حتى لو كانت الاحتمالات ضدك.",
    "توماس إديسون: أنا لم أفشل، أنا فقط وجدت 10,000 طريقة لا تعمل.",
    "عنترة بن شداد: سيذكرني قومي إذا جد جدهم.. وفي الليلة الظلماء يفتقد البدر.",
    "أبو بكر الصديق: احرص على الموت توهب لك الحياة.",
    "هارون الرشيد للسحابة: أمطري حيث شئتِ، فخراجك آتٍ إليّ.",
    "مارتن لوثر كينج: إذا لم تستطع الطيران فاجرِ، وإذا لم تستطع الجري فامشِ.",
    "فيلم Inception: لا تخف من أن تحلم بحلم أكبر قليلاً.",
    "كونفوشيوس: لا يهم مدى بطئك طالما أنك لا تتوقف.",
    "الإمام الشافعي: بقدر الكد تُكتسب المعالي.. ومن طلب العلا سهر الليالي.",
    "ابن خلدون: الشعوب المقهورة تسوء أخلاقها.",
    "نابليون بونابرت: المستحيل كلمة في قاموس المجانين.",
    "فيلم The Godfather: العظيم لا يولد عظيماً، بل ينمو ليكون كذلك.",
    "ليوناردو دا فينشي: الحديد يصدأ من الإهمال، والماء يفقد نقاءه من الركود.",
    "والت ديزني: إذا كنت تستطيع حلمه، يمكنك فعله.",
    "مالكوم إكس: المستقبل ينتمي لأولئك الذين يستعدون له اليوم.",
    "فيلم Spider-Man: مع القوة العظيمة, تأتي مسؤولية عظيمة.",
    "مايكل جوردن: لقد فشلت مراراً وتكراراً في حياتي، وهذا هو سبب نجاحي.",
    "عمر المختار: نحن لا نستسلم.. ننتصر أو نموت.",
    "ابن تيمية: ما يصنع أعدائي بي؟ أنا جنتي وبستاني في صدري.",
    "مصطفى محمود: لكي تنهض من جديد، عليك أن تحرق صورك القديمة.",
    "عباس محمود العقاد: اقرأ لكي أعيش حياة أكثر من حياة واحدة.",
    "فيلم Forrest Gump: الحياة مثل علبة الشوكولاتة، لا تعرف أبداً ما ستحصل عليه.",
    "ألبرت أينشتاين: الخيال أهم من المعرفة.",
    "بابلو بيكاسو: كل ما يمكنك تخيله هو حقيقي.",
    "فيلم Star Wars: افعل أو لا تفعل.. لا يوجد شيء اسمه 'حاول'.",
    "خليل جبران: أنت أعمى، وأنا أصم أبكم، فإذن وضع يدك في يدي أدركنا الطريق.",
    "إبراهيم الفقي: عش كل لحظة كأنها آخر لحظة في حياتك.",
    "هنري فورد: سواء كنت تعتقد أنك تستطيع أو لا تستطيع.. فأنت على حق.",
    "فيلم 300: لا تراجع، لا استسلام.. هذا هو قانون سبارتا.",
    "عبد الرحمن الداخل: الشوق إلى العظمة هو الذي يصنع العظماء.",
    "يوسف بن تاشفين: الجبال لا تلتقي، لكن الرجال يلتقون بالعمل.",
    "زياد بن أبيه: إن شدة الضعف تورث الذل، وإن شدة القوة تورث الكبر.",
    "فيلم The Shawshank Redemption: إما أن تنشغل بالعيش، أو تنشغل بالموت.",
    "مارك زوكربيرج: أكبر خطر هو عدم المخاطرة بأي شيء.",
    "أوبرا وينفري: العظمة هي أن تخدم الآخرين بنجاحك.",
    "فيلم Harry Potter: خياراتنا هي التي تظهر حقيقتنا، أكثر بكثير من قدراتنا.",
    "أرسطو: نحن ما نفعله بشكل متكرر، التميز إذن ليس فعلاً بل عادة.",
    "سقراط: الحياة غير المختبرة لا تستحق العيش.",
    "فيلم Kung Fu Panda: الأمس تاريخ، الغد لغز، أما اليوم فهو هدية.",
    "ابن سينا: الوهم نصف الداء، والاطمئنان نصف الدواء، والصبر أول خطوات الشفاء.",
    "الخوارزمي: إذا كان الإنسان ذا أخلاق فهو (1).",
    "المعتمد بن عباد: رعي الجمال خير من رعي الخنازير.",
    "فيلم Interstellar: نحن هنا لنكون مستكشفين، لا مجرد حراس.",
    "جيف بيزوس: علامتك التجارية هي ما يقوله الناس عنك عندما تخرج من الغرفة.",
    "جاك ما: اليوم صعب، غداً أصعب، ولكن بعد غد سيكون جميلاً.",
    "فيلم Creed: أنت أصعب خصم ستواجهه في المرآة.",
    "فيكتور هوجو: العمل يبعد عنا ثلاث شرور: السأم، والرذيلة، والحاجة.",
    "تشارلي تشابلن: يوم بدون ضحك هو يوم ضائع.",
    "فيلم Cast Away: غداً ستشرق الشمس، ومن يعرف ماذا قد يأتي به المد؟",
    "عروة بن الورد: إني امرؤ عافي إنائي شركة.. وأنت امرؤ عافي إنائك واحد.",
    "الحسن البصري: يا ابن آدم، إنما أنت أيام، فإذا ذهب يوم ذهب بعضك.",
    "أحمد زويل: الغرب يدعمون الفاشل حتى ينجح، ونحن نحارب الناجح حتى يفشل.",
    "فيلم Top Gun: لا تفكر، فقط افعل.",
    "باولو كويلو: عندما تريد شيئاً، فإن الكون كله يتآمر لمساعدتك على تحقيقه.",
    "جورج برنارد شو: الحياة لا تتعلق بإيجاد نفسك، بل بخلق نفسك.",
    "فيلم The Dark Knight: أنت إما تموت بطلاً، أو تعيش طويلاً بما يكفي لترى نفسك تصبح شريرًا.",
    "أمين الريحاني: ازرع شجرة، ابْنِ بيتاً، اكتب كتاباً.",
    "أحلام مستغانمي: النجاح هو أن تمر بتجربة مريرة دون أن تفقد توازنك.",
    "فيلم Whiplash: لا توجد كلمتان في اللغة الإنجليزية أكثر ضرراً من 'عمل جيد'.",
    "فريدريك نيتشه: من لديه 'لماذا' ليعيش من أجلها، يمكنه تحمل أي 'كيف' تقريباً.",
    "فيلم Up: المغامرة موجودة في الخارج.. اذهب وجدها.",
    "مالك بن نبي: إن الحضارة لا تباع ولا تشترى، بل تصنع بالجهد.",
    "الشيخ الشعراوي: لا تقلق من تدابير البشر، فأقصى ما يمكنهم فعله هو تنفيذ إرادة الله.",
    "فيلم The Matrix: هناك فرق بين معرفة الطريق وسلوك الطريق.",
    "أرنولد شوارزنيجر: لا يمكنك تسلق سلم النجاح ويديك في جيوبك.",
    "فولتير: العمل يحمينا من الملل والفقر.",
    "فيلم Hidden Figures: العقول لا لون لها.",
    "المهلب بن أبي صفرة: أوصيكم بالعمل، فإن العمل زينة الغني وعون الفقير.",
    "الزبير بن العوام: لكل نبي حواري، وحواريي الزبير.",
    "جعفر بن أبي طالب: والله لا أكذب ولو أن الكذب ينجيني.",
    "فيلم Schindler's List: من ينقذ حياة واحدة، كأنما أنقذ العالم كله.",
    "كوبي براينت: الثبات هو مفتاح التميز.",
    "طه حسين: الإرادة هي سر الحياة.",
    "غسان كنفاني: لا تكن كالمسمار، يطرق في الرأس ويسكت.",
    "فيلم The Great Gatsby: لا يمكن تكرار الماضي؟ بل يمكن ذلك!",
    "أحمد الشقيري: كن أنت النسخة الأفضل من نفسك.",
    "ابن القيم: الهمة العالية تغلي في القلب كغلي القدر.",
    "فيلم Coco: لا تدع أحداً يخبرك بما يجب أن تكون عليه.",
    "السموأل: إذا المرء لم يدنس من اللؤم عرضه.. فكل رداء يرتديه جميل.",
    "أنت يا Harpy: التركيز اليوم هو ثمرة النجاح غداً."
];

// === Core Logic ===
const core = {
    list: [], timer: null, left: 0, paused: false, allDone: false,
    wakeLock: null,
    isOpenTimer: false, 

    async requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                this.wakeLock = await navigator.wakeLock.request('screen');
            }
        } catch (err) {
            console.warn("WakeLock request failed", err);
        }
    },

    releaseWakeLock() {
        if (this.wakeLock) { 
            this.wakeLock.release(); 
            this.wakeLock = null; 
        }
    },

    add() {
        const nameInput = document.getElementById('tName');
        const hInput = document.getElementById('tH');
        const mInput = document.getElementById('tM');
        
        const name = nameInput.value.trim();
        const h = parseInt(hInput.value) || 0;
        const m = parseInt(mInput.value) || 0;
        
        if(!name) { alert("يرجى إدخال اسم المهمة!"); return; }
        if(h === 0 && m === 0) { alert("يرجى تحديد وقت للمهمة!"); return; }
        
        this.list.push({ id: Date.now(), name, sec: (h * 3600) + (m * 60) });
        
        nameInput.value = '';
        hInput.value = '';
        mInput.value = '';
        
        this.updateUI();
    },

    removeTask(id) {
        this.list = this.list.filter(task => task.id !== id);
        this.updateUI();
    },

    updateUI() {
        const listContainer = document.getElementById('tasksListContainer');
        const startBtn = document.getElementById('startBtn');
        const ul = document.getElementById('tasksList');
        
        ul.innerHTML = '';
        
        if (this.list.length > 0) {
            listContainer.classList.remove('hidden');
            startBtn.classList.remove('hidden');
            
            this.list.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                
                const h = Math.floor(task.sec / 3600);
                const m = Math.floor((task.sec % 3600) / 60);
                const timeStr = `${h > 0 ? h+'س ' : ''}${m}د`;

                li.innerHTML = `
                    <span class="task-item-name">${task.name}</span>
                    <span class="task-item-time"><i class="fa-regular fa-clock"></i> ${timeStr}</span>
                    <button class="task-item-delete" onclick="core.removeTask(${task.id})" title="حذف">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `;
                ul.appendChild(li);
            });
        } else {
            listContainer.classList.add('hidden');
            startBtn.classList.add('hidden');
        }
    },

    startOpenTimer() {
        this.isOpenTimer = true;
        this.left = 0;
        
        document.getElementById('setupView').classList.add('hidden');
        document.getElementById('focusView').classList.remove('hidden');
        
        document.getElementById('activeTask').textContent = "مؤقت حر";
        document.getElementById('activeTask').parentElement.classList.remove('hidden');
        document.getElementById('nextTaskContainer').classList.add('hidden');

        this.requestWakeLock();
        this.updateDisp();
        this.start();
    },

    begin() {
        this.isOpenTimer = false;
        
        document.getElementById('setupView').classList.add('hidden');
        document.getElementById('focusView').classList.remove('hidden');
        document.getElementById('nextTaskContainer').classList.remove('hidden');

        this.requestWakeLock();
        this.load();
    },

    load() {
        if (this.list.length === 0) return;
        const current = this.list[0];
        
        document.getElementById('activeTask').textContent = current.name;
        
        this.left = current.sec;
        this.paused = false;
        
        const next = this.list[1];
        document.getElementById('nextTaskName').textContent = next ? next.name : "لا توجد مهام إضافية";
        
        this.updateDisp();
        this.start();
    },

    start() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if(!this.paused) {
                if (this.isOpenTimer) {
                    this.left++; 
                    this.updateDisp();
                } else {
                    if(this.left > 0) { 
                        this.left--; 
                        this.updateDisp(); 
                    } else { 
                        playBeep(); // Play sound when timer finishes
                        this.finishOne(); 
                    }
                }
            }
        }, 1000);
    },

    updateDisp() {
        const h = Math.floor(this.left / 3600);
        const m = Math.floor((this.left % 3600) / 60);
        const s = this.left % 60;
        
        document.getElementById('disp').textContent = 
            `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    },

    toggle() {
        this.paused = !this.paused;
        const btn = document.getElementById('pBtn');
        if(this.paused) {
            btn.innerHTML = '<i class="fa-solid fa-play"></i> استئناف';
            btn.className = 'glass-btn btn-success';
            this.releaseWakeLock();
        } else {
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> إيقاف مؤقت';
            btn.className = 'glass-btn btn-warning';
            this.requestWakeLock();
        }
    },

    reset() { 
        if (this.isOpenTimer) {
            this.left = 0;
        } else if (this.list.length > 0) {
            this.left = this.list[0].sec; 
        }
        this.updateDisp();
    },

    finishOne() {
        clearInterval(this.timer);
        if (this.isOpenTimer) {
            this.allDone = true;
            this.releaseWakeLock();
            this.showFinalMessage();
        } else {
            this.list.shift(); // Remove current task
            if(this.list.length === 0) {
                this.allDone = true;
                this.releaseWakeLock();
                this.showFinalMessage();
            } else {
                this.showMotivation();
            }
        }
    },

    showMotivation() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quoteArea').textContent = randomQuote;
        document.getElementById('motivationalModal').classList.remove('hidden');
        document.getElementById('modalBtn').innerHTML = 'استمرار <i class="fa-solid fa-arrow-left"></i>';
    },

    showFinalMessage() {
        const name = userData ? userData.name : "";
        document.getElementById('modalEmoji').textContent = "🏆";
        
        if (this.isOpenTimer) {
            const h = Math.floor(this.left / 3600);
            const m = Math.floor((this.left % 3600) / 60);
            document.getElementById('quoteArea').innerHTML = `رسالة من <span style='color:var(--primary);'>Harpy</span>:<br><br>لقد قضيت ${h} س و ${m} د من التركيز العميق يا ${name}!<br>الإنجاز ليس بالوقت بل بالاستمرارية.`;
        } else {
            document.getElementById('quoteArea').innerHTML = `رسالة من <span style='color:var(--primary);'>Harpy</span>:<br><br>لقد أتممت جميع مهامك بنجاح باهر يا ${name}! أنت الآن شخص أفضل مما كنت عليه قبل البدء.`;
        }
        
        document.getElementById('modalBtn').innerHTML = 'إغلاق <i class="fa-solid fa-check"></i>';
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    closeModal() {
        document.getElementById('motivationalModal').classList.add('hidden');
        if(this.allDone) { 
            location.reload(); 
        } else if(this.list.length > 0) { 
            this.load(); 
        }
    }
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !core.paused && !core.allDone && core.timer) {
        core.requestWakeLock();
    }
});