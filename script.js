// ============================================
// BO'LIM (TABS) ALMASHTIRISH FUNKSIYASI
// ============================================
function switchTab(tabId, element) {
    // hamma contentlarni o'chiramiz
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    // tugmalarning aktivlik rangini o'chiramiz
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // faqat bosilganini aktivlaymiz
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// ============================================
// 1. TEATR SSENARIYSI UCHUN MANTIQ
// ============================================
function generateAIPlan() {
    const aiPrompt = document.getElementById('aiPrompt');
    const topic = aiPrompt.value.trim();
    const loader = document.getElementById('loader');
    const resultBox = document.getElementById('resultContainer');
    const btn = document.getElementById('generateBtn');

    if (!topic) {
        shakeElement(aiPrompt);
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class='bx bx-loader-circle bx-spin'></i> AI O'ylamoqda...`;
    
    resultBox.innerHTML = '';
    resultBox.style.display = 'none';
    loader.style.display = 'block';

    setTimeout(() => {
        loader.style.display = 'none';
        btn.disabled = false;
        btn.innerHTML = `<span class="btn-text">Yangi Reja Qo'shish</span> <i class='bx bx-refresh'></i>`;

        renderPremiumResult(topic);
    }, 2500); // Test delay
}

function renderPremiumResult(topic) {
    const resultBox = document.getElementById('resultContainer');
    const blocksInfo = [
        {
            icon: "bx-target-lock",
            title: "Rejissura G'oyasi & Maqsadi",
            content: `
                <p><strong>Bosh maqsad:</strong> Tomoshabinlarga hech qachon unutilmaydigan vizual va hissiyotli "<b>${topic}</b>" hikoyasini yetkazib berish.</p>
                <p><strong>Rejissura uslubi:</strong> Oddiy so'zlardan tashqariga chiqib, sahnada emotsional ko'tarilishlar vositasida ishlash.</p>
            `
        },
        {
            icon: "bx-mask",
            title: "Qahramonlar va Aktyorlar Tarkibi",
            content: `
                <ul>
                    <li><i class='bx bxs-user-check'></i> <strong>Aql bovar qilmas qahramon:</strong> Gaplari ta'sirli, ${topic} uchun kurashuvchi yosh.</li>
                    <li><i class='bx bxs-user-x'></i> <strong>Adashgan Raqib:</strong> Noto'g'ri ishlarni qilib adashgan rol.</li>
                    <li><i class='bx bx-book-reader'></i> <strong>Dono ustoz:</strong> Muammoga yechim beruvchi inson.</li>
                </ul>
            `
        },
        {
            icon: "bx-palette",
            title: "Sahna Anjomlari va Dekoratsiya",
            content: `
                <ul>
                    <li><i class='bx bx-bulb'></i> <strong>Qorong'i fon nuri:</strong> Markazdagi odamga qaratiluvchi nurlar.</li>
                    <li><i class='bx bx-paint-roll'></i> <strong>Mavzu foni:</strong> "${topic}" ko'rinishidagi dekoratsiya.</li>
                </ul>
            `
        },
        {
            icon: "bx-clapperboard",
            title: "Ssenariy Vaqti (Timeline)",
            content: `
                <p><strong>I Asos - Tugun (2 daqiqa):</strong> Sahnaga Raqib yugurib keladi va Bosh qahramon bilan urishishiga oz qoladi.</p>
                <p><strong>II Asos - Konflikt (8 daqiqa):</strong> Harakatlar jiddiy tus olganda Dono Ustoz paydo bo'ladi.</p>
                <p><strong>III Asos - Yechim (3 daqiqa):</strong> Ulug'vor kuy asosida haqiqat isbotlanadi va tomosha nihoyasiga yetadi.</p>
            `
        }
    ];

    let fullHTML = '';
    blocksInfo.forEach((block, index) => {
        fullHTML += \`
            <div class="result-card" style="--delay: \${index + 1}">
                <div class="card-header">
                    <i class='bx \${block.icon}'></i>
                    <h3>\${block.title}</h3>
                </div>
                <div class="card-body">
                    \${block.content}
                </div>
            </div>
        \`;
    });

    resultBox.innerHTML = fullHTML;
    resultBox.style.display = 'block';
    
    scrollToResult('#tab-scenario .ai-result-area');
}

// ============================================
// 2. SLAYD (PREZENTATSIYA) TAYYORLASH MANTIQ
// ============================================
function generateSlidePlan() {
    const topicInput = document.getElementById('slideTopic');
    const audienceInput = document.getElementById('slideAudience');
    const countInput = document.getElementById('slideCount');
    
    const topic = topicInput.value.trim();
    const audience = audienceInput.value;
    let count = parseInt(countInput.value);

    // Bo'sh inputlar uchun validatsiya va tebranish
    if (!topic) { shakeElement(topicInput); return; }
    if (!audience) { alert("Iltimos, dars (auditoriya) kimlar uchun ekanligini tanlang!"); return; }
    if (!count || count < 3) { count = 5; } // default 5 ta slayd

    const loader = document.getElementById('slideLoader');
    const resultBox = document.getElementById('slideResultContainer');
    const btn = document.getElementById('generateSlideBtn');

    btn.disabled = true;
    btn.innerHTML = `<i class='bx bx-loader-circle bx-spin'></i> AI O'rganmoqda...`;
    
    resultBox.innerHTML = '';
    resultBox.style.display = 'none';
    loader.style.display = 'block';

    setTimeout(() => {
        loader.style.display = 'none';
        btn.disabled = false;
        btn.innerHTML = `<span class="btn-text">Boshqa Reja Yaratish</span> <i class='bx bx-refresh'></i>`;

        renderSlideResult(topic, audience, count);
    }, 2500); // Simulate network wait
}

function renderSlideResult(topic, audience, count) {
    const resultBox = document.getElementById('slideResultContainer');
    
    // Bosh qism xabari
    let headerHtml = \`
    <div class="result-card" style="--delay: 0; border-color: var(--accent-secondary);">
        <div class="card-header">
            <i class='bx bx-check-shield' style="color:var(--accent-secondary);"></i>
            <h3 style="color:var(--accent-secondary);">Mukammal Tayyor Slayd Rejasi!</h3>
        </div>
        <div class="card-body">
            <p>Sizning <b>"\${topic}"</b> mavzusingiz uchun <b>\${count}</b> ta slayddan iborat maxsus reja AI tomonidan <b>\${audience}</b> ga to'liq moslashtirilib tuzib chiqildi.</p>
        </div>
    </div>
    \`;

    // Slaydlar sikli
    let slidesHtml = '';
    for(let i=1; i<=count; i++) {
        let slideTitle = "";
        let content = "";
        let icon = "bx-carousel";
        
        if(i === 1) { // 1-slayd (Kirish)
            slideTitle = \`1-Slayd: Kirish (Tanishuv)\`;
            content = \`<p><strong>Matn:</strong> "Xush kelibsiz! Bugun juda sirli va fanga asoslangan \${topic} mavzusini muhokama qilamiz."</p><ul><li>Bosh rasm: Mavzuni vizual aks ettiruvchi eng katta va tiniq rasm.</li><li>Spiker yozuvi (Ismingiz).</li></ul>\`;
            icon = "bx-flag";
        } 
        else if (i === count) { // Oxirgi Slayd
            slideTitle = \`\${i}-Slayd: Xulosa va Savol-Javob\`;
            content = \`<p><strong>Matn:</strong> "Xulosa shuki, \${topic} barchamiz uchun muhim vazifa."</p><ul><li>Ochiq savollar berish usuli ("Kimda qanday savollar bor?")</li><li>"E'tiboringiz uchun rahmat!" degan chiroyli rasm/yozuv.</li></ul>\`;
            icon = "bx-check-double";
        } 
        else { // O'rta Slaydlar
            slideTitle = \`\${i}-Slayd: Asosiy omillar va Tahlillar\`;
            content = \`<p><strong>Matn:</strong> "\${topic} ning \${i}-ahamiyati: (\${audience} qiynalmay tushunadigan oson so'zlar bilan statistika beriladi)."</p><ul><li>Bir tomonda matn (3-4 ta tezis qisqa gaplar).</li><li>Ikkinchi tomonda bitta gif yoki infografika qo'shiladi.</li></ul>\`;
            // Ikonlarni navbat bilan chiroyli qo'yish
            if(i % 3 === 0) icon = "bx-pie-chart-alt-2";
            else if (i % 2 === 0) icon = "bx-image";
            else icon = "bx-list-ul";
        }
        
        slidesHtml += \`
            <div class="result-card" style="--delay: \${i}">
                <div class="card-header">
                    <i class='bx \${icon}'></i>
                    <h3>\${slideTitle}</h3>
                </div>
                <div class="card-body">
                    \${content}
                </div>
            </div>
        \`;
    }

    resultBox.innerHTML = headerHtml + slidesHtml;
    resultBox.style.display = 'block';

    scrollToResult('#tab-presentation .ai-result-area');
}

// Yordamchi tebranish (xato) animatsiyasi
function shakeElement(element) {
    element.style.transform = 'translateX(10px)';
    setTimeout(() => element.style.transform = 'translateX(-10px)', 100);
    setTimeout(() => element.style.transform = 'translateX(10px)', 200);
    setTimeout(() => element.style.transform = 'translateX(0)', 300);
    element.focus();
}

// Yordamchi Scroll funksiya
function scrollToResult(selector) {
    setTimeout(() => {
        const offsetTop = document.querySelector(selector).getBoundingClientRect().top + window.scrollY - 30;
        window.scroll({ top: offsetTop, behavior: 'smooth' });
    }, 150);
}

// Klaviyaturadagi "Enter" orqali mos tugmani chaqirish
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // qaysi tab aktiv bo'lsa o'shani generate funksiyasini chaqiramiz
        if (document.getElementById('tab-scenario').classList.contains('active')) {
            generateAIPlan();
        } else if (document.getElementById('tab-presentation').classList.contains('active')) {
            generateSlidePlan();
        }
    }
});
