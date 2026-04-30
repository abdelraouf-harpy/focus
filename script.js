/* 
   Focus System - Logic File
   Developed by: Harpy
*/

const quotes = [
    "خالد بن الوليد: ما ليلة أُهديت إليّ فيها عروس.. أحب إليّ من ليلة شديدة البرد أصبّح فيها العدو.",
    "عمر بن الخطاب: لا تصغرنّ همتكم، فإني لم أرَ أقعد عن المكرمات من صغر الهمم.",
    "علي بن أبي طالب: قيمة كل امرئ ما يُحسنه.",
    "صلاح الدين الأيوبي: كيف أضحك والقدس أسيرة؟",
    "طارق بن زياد: العدو من أمامكم والبحر من ورائكم.",
    "عمر بن عبد العزيز: إن لي نفساً تواقة، كلما وصلت لشيء تاقت لما هو أعظم منه.",
    "عمر المختار: نحن لا نستسلم.. ننتصر أو نموت.",
    "ابن القيم: لو علم المتصدق أن صدقته تقع في يد الله قبل يد الفقير، لكانت لذة المعطي أكبر من لذة الآخذ.",
    "الإمام الشافعي: بقدر الكد تُكتسب المعالي.. ومن طلب العلا سهر الليالي.",
    "ابن تيمية: ما يصنع أعدائي بي؟ أنا جنتي وبستاني في صدري.",
    "أبو بكر الصديق: احرص على الموت توهب لك الحياة.",
    "هارون الرشيد: أمطري حيث شئتِ، فخراجك آتٍ إليّ.",
    "عبد الرحمن الداخل: الشوق إلى العظمة هو الذي يصنع العظماء.",
    "يوسف بن تاشفين: الجبال لا تلتقي، لكن الرجال يلتقون بالعمل.",
    "ابن خلدون: الفتن التي تتخفى وراء قناع الدين تجارة رائجة جداً في عصور التراجع الفكري للشعوب.",
    "ابن سينا: الوهم نصف الداء، والاطمئنان نصف الدواء، والصبر أول خطوات الشفاء.",
    "الحسن البصري: يا ابن آدم، إنما أنت أيام، فإذا ذهب يوم ذهب بعضك.",
    "مصطفى محمود: لكي تنهض من جديد، عليك أن تحرق صورك القديمة.",
    "عباس محمود العقاد: اقرأ لكي أعيش حياة أكثر من حياة واحدة.",
    "أحمد زويل: الغرب يدعمون الفاشل حتى ينجح، ونحن نحارب الناجح حتى يفشل.",
    "ستيف جوبز: وقتك محدود، فلا تضيعه في عيش حياة شخص آخر.",
    "إيلون ماسك: إذا كان الأمر مهماً بما يكفي، فعليك المحاولة حتى لو كانت الاحتمالات ضدك.",
    "توماس إديسون: أنا لم أفشل، أنا فقط وجدت 10,000 طريقة لا تعمل.",
    "ونستون تشرشل: النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس.",
    "المهاتما غاندي: كن أنت التغيير الذي تريد أن تراه في العالم.",
    "نيلسون مانديلا: يبدو الأمر دائماً مستحيلاً حتى يتم تحقيقه.",
    "كونفوشيوس: لا يهم مدى بطئك طالما أنك لا تتوقف.",
    "نابليون بونابرت: المستحيل كلمة في قاموس المجانين.",
    "ليوناردو دا فينشي: الحديد يصدأ من الإهمال، والماء يفقد نقاءه من الركود.",
    "والت ديزني: إذا كنت تستطيع حلمه، يمكنك فعله.",
    "مالكوم إكس: المستقبل ينتمي لأولئك الذين يستعدون له اليوم.",
    "مايكل جوردن: لقد فشلت مراراً وتكراراً في حياتي، وهذا هو سبب نجاحي.",
    "ألبرت أينشتاين: الخيال أهم من المعرفة.",
    "بابلو بيكاسو: كل ما يمكنك تخيله هو حقيقي.",
    "هنري فورد: سواء كنت تعتقد أنك تستطيع أو لا تستطيع.. فأنت على حق.",
    "مارك زوكربيرج: أكبر خطر هو عدم المخاطرة بأي شيء.",
    "أوبرا وينفري: العظمة هي أن تخدم الآخرين بنجاحك.",
    "أرسطو: نحن ما نفعله بشكل متكرر، التميز إذن ليس فعلاً بل عادة.",
    "سقراط: الحياة غير المختبرة لا تستحق العيش.",
    "جيف بيزوس: علامتك التجارية هي ما يقوله الناس عنك عندما تخرج من الغرفة.",
    "جاك ما: اليوم صعب، غداً أصعب، ولكن بعد غد سيكون جميلاً.",
    "فيكتور هوجو: العمل يبعد عنا ثلاث شرور: السأم، والرذيلة، والحاجة.",
    "تشارلي تشابلن: يوم بدون ضحك هو يوم ضائع.",
    "باولو كويلو: عندما تريد شيئاً، فإن الكون كله يتآمر لمساعدتك على تحقيقه.",
    "جورج برنارد شو: الحياة لا تتعلق بإيجاد نفسك، بل بخلق نفسك.",
    "أرنولد شوارزنيجر: لا يمكنك تسلق سلم النجاح ويديك في جيوبك.",
    "فريدريك نيتشه: من لديه 'لماذا' ليعيش من أجلها، يمكنه تحمل أي 'كيف' تقريباً.",
    "كوبي براينت: الثبات هو مفتاح التميز.",
    "طه حسين: الإرادة هي سر الحياة.",
    "غسان كنفاني: لا تكن كالمسمار، يطرق في الرأس ويسكت.",
    "فيلم Braveheart: الجميع يموتون، لكن ليس كل الناس يعيشون حقاً.",
    "فيلم The Pursuit of Happyness: إذا كان لديك حلم، عليك أن تحميه.",
    "فيلم Rocky: الأمر لا يتعلق بقوة ضربتك، بل بمدى قدرتك على تلقي الضربات والاستمرار.",
    "فيلم Lion King: الماضي يمكن أن يؤلم، لكن يمكنك إما الهروب منه أو التعلم منه.",
    "فيلم Gladiator: ما نفعله في الحياة.. يتردد صداه في الأبدية.",
    "فيلم Batman Begins: لماذا نسقط؟ لكي نتعلم كيف ننهض من جديد.",
    "فيلم Inception: لا تخف من أن تحلم بحلم أكبر قليلاً.",
    "فيلم The Godfather: العظيم لا يولد عظيماً، بل ينمو ليكون كذلك.",
    "فيلم Spider-Man: مع القوة العظيمة، تأتي مسؤولية عظيمة.",
    "فيلم Forrest Gump: الحياة مثل علبة الشوكولاتة، لا تعرف أبداً ما ستحصل عليه.",
    "فيلم Star Wars: افعل أو لا تفعل.. لا يوجد شيء اسمه 'حاول'.",
    "فيلم 300: لا تراجع، لا استسلام.. هذا هو قانون سبارتا.",
    "فيلم The Shawshank Redemption: إما أن تنشغل بالعيش، أو تنشغل بالموت.",
    "فيلم Harry Potter: خياراتنا هي التي تظهر حقيقتنا، أكثر بكثير من قدراتنا.",
    "فيلم Kung Fu Panda: الأمس تاريخ، الغد لغز، أما اليوم فهو هدية.",
    "فيلم Interstellar: نحن هنا لنكون مستكشفين، لا مجرد حراس.",
    "فيلم Creed: أنت أصعب خصم ستواجهه في المرآة.",
    "فيلم Cast Away: غداً ستشرق الشمس، ومن يعرف ماذا قد يأتي به المد؟",
    "فيلم Top Gun: لا تفكر، فقط افعل.",
    "فيلم The Dark Knight: أنت إما تموت بطلاً، أو تعيش طويلاً بما يكفي لترى نفسك تصبح شريراً.",
    "فيلم Whiplash: لا توجد كلمتان في اللغة الإنجليزية أكثر ضرراً من 'عمل جيد'.",
    "فيلم Up: المغامرة موجودة في الخارج.. اذهب وجدها.",
    "فيلم The Matrix: هناك فرق بين معرفة الطريق وسلوك الطريق.",
    "فيلم Hidden Figures: العقول لا لون لها.",
    "فيلم Schindler's List: من ينقذ حياة واحدة، كأنما أنقذ العالم كله.",
    "النجاح ليس نهائياً، والفشل ليس قاتلاً، إنها الشجاعة للاستمرار هي ما يهم.",
    "لا تقارن بدايتك بموسم حصاد الآخرين.",
    "الألم مؤقت، لكن التوقف يدوم للأبد.",
    "اعمل في صمت، ودع النجاح يحدث الضجيج.",
    "إذا لم تطرق الفرصة بابك، فابنِ باباً.",
    "السر يكمن في البداية.",
    "الانضباط هو الجسر بين الأهداف والإنجاز.",
    "لا تنتظر الظروف المثالية، اصنعها أنت.",
    "الصبر مر، ولكن ثمرته حلوة.",
    "الفرق بين المستحيل والممكن هو الإرادة.",
    "العقل الذي يتوسع بفكرة جديدة لا يعود أبداً إلى أبعاده الأصلية.",
    "أفضل طريقة للتنبؤ بالمستقبل هي اختراعه.",
    "أنت لا تخسر أبداً، إما أن تنجح أو تتعلم.",
    "العظمة تبدأ من الخارج، ولكنها تُبنى من الداخل.",
    "لا تتوقف عندما تتعب، توقف عندما تنتهي.",
    "كل إنجاز عظيم كان يعتبر يوماً ما مستحيلاً.",
    "لا تعد الأيام، بل اجعل الأيام تعد.",
    "الشغف هو الطاقة التي تحول العمل إلى فن.",
    "التركيز هو القدرة على قول 'لا' لألف فكرة جيدة لتركز على فكرة عظيمة واحدة.",
    "النجاح يبدأ برغبة قوية.",
    "عش كل لحظة كأنها آخر لحظة في حياتك.",
    "كن النسخة الأفضل من نفسك.",
    "العقبات هي تلك الأشياء المخيفة التي تراها عندما ترفع عينيك عن هدفك.",
    "العمل الجاد يتفوق على الموهبة حين لا تعمل الموهبة بجد.",
    "Harpy: التركيز اليوم هو ثمرة النجاح غداً."
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
        if(!name || (h===0 && m===0)) return alert("أدخل اسم المهمة والوقت");
        this.list.push({ name, sec: (h*3600) + (m*60) });
        document.getElementById('tName').value = '';
        document.getElementById('tH').value = '0';
        document.getElementById('tM').value = '0';
        this.updateUI();
    },

    updateUI() {
        const count = this.list.length;
        if (count > 0) {
            const countDiv = document.getElementById('countDisplay');
            countDiv.classList.remove('hidden');
            countDiv.textContent = `المهام المضافة: ${count}`;
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
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quoteArea').textContent = randomQuote;
        document.getElementById('modalEmoji').textContent = "🌟";
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    showFinal() {
        document.getElementById('modalEmoji').textContent = "🏆";
        document.getElementById('quoteArea').innerHTML = "رسالة من <span style='color:var(--primary); font-weight:800;'>Harpy</span>:<br><br>لقد أتممت جميع مهامك بنجاح باهر!";
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
