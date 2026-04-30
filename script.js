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
    "فيلم Spider-Man: مع القوة العظيمة، تأتي مسؤولية عظيمة.",
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
    "فيلم Cast Away: غداً ستشرق الشمس، ومن يعرف ماذا قد يأتي به المد? ",
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

const core = {
    list: [], timer: null, left: 0, paused: false, allDone: false,
    wakeLock: null,

    async requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                this.wakeLock = await navigator.wakeLock.request('screen');
                console.log("Wake Lock active"); 
            }
        } catch (err) {
            console.log("Wake Lock failed");
        }
    },

    releaseWakeLock() {
        if (this.wakeLock) { this.wakeLock.release(); this.wakeLock = null; }
    },

    add() {
        const name = document.getElementById('tName').value.trim();
        const h = parseInt(document.getElementById('tH').value) || 0;
        const m = parseInt(document.getElementById('tM').value) || 0;
        if(!name || (h===0 && m===0)) return;
        this.list.push({ name, sec: (h*3600) + (m*60) });
        
        // تصفير الخانات تماماً
        document.getElementById('tName').value = '';
        document.getElementById('tH').value = '';
        document.getElementById('tM').value = '';
        
        this.updateUI();
    },

    updateUI() {
        const count = this.list.length;
        const countDiv = document.getElementById('countDisplay');
        const startBtn = document.getElementById('startBtn');
        if (count > 0) {
            countDiv.classList.remove('hidden');
            countDiv.textContent = `عدد المهام المضافة حتى الآن: ${count}`;
            startBtn.classList.remove('hidden');
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
        const next = this.list[1];
        document.getElementById('nextTaskName').textContent = next ? next.name : "لا توجد مهام قادمة";
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
        const h = Math.floor(this.left / 3600);
        const m = Math.floor((this.left % 3600) / 60);
        const s = this.left % 60;
        document.getElementById('disp').textContent = 
            `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    },

    toggle() {
        this.paused = !this.paused;
        const b = document.getElementById('pBtn');
        b.textContent = this.paused ? "استئناف" : "إيقاف مؤقت";
        // تغيير اللون للأخضر عند التوقف
        b.style.background = this.paused ? "var(--success)" : "#334155";
        if(this.paused) this.releaseWakeLock(); else this.requestWakeLock();
    },

    reset() { this.left = this.list[0].sec; this.updateDisp(); },

    finishOne() {
        clearInterval(this.timer);
        this.list.shift();
        if(this.list.length === 0) {
            this.allDone = true;
            this.releaseWakeLock();
            this.showFinalMessage();
        } else {
            this.showMotivation();
        }
    },

    showMotivation() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quoteArea').textContent = randomQuote;
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    showFinalMessage() {
        document.getElementById('modalEmoji').textContent = "🏆";
        document.getElementById('quoteArea').innerHTML = "رسالة من <span style='color:var(--primary); font-weight:800;'>Harpy</span>:<br><br>لقد أتممت جميع مهامك بنجاح باهر! أنت الآن شخص أفضل مما كنت عليه قبل البدء. فخور بك!";
        document.getElementById('modalBtn').textContent = "إغلاق وبدء يوم جديد";
        document.getElementById('motivationalModal').classList.remove('hidden');
    },

    closeModal() {
        document.getElementById('motivationalModal').classList.add('hidden');
        if(this.allDone) { location.reload(); }
        else if(this.list.length > 0) { this.load(); }
    }
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !core.paused && !core.allDone && core.timer) {
        core.requestWakeLock();
    }
});
