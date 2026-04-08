document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();

    const topicInput = document.getElementById('topicInput');
    const generateBtn = document.getElementById('generateBtn');
    const loadingState = document.getElementById('loadingState');
    const resultCard = document.getElementById('resultCard');
    const resultContent = document.getElementById('resultContent');
    const tagsList = document.getElementById('tagsList');
    const loadingText = document.getElementById('loadingText');

    // UI Buttons
    const copyBtn = document.getElementById('copyBtn');
    const printBtn = document.getElementById('printBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    const translateBtn = document.getElementById('translateBtn');
    const voiceBtn = document.getElementById('voiceBtn');

    // Settings
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const themeSelect = document.getElementById('themeSelect');
    const voiceSpeed = document.getElementById('voiceSpeed');
    const speedValue = document.getElementById('speedValue');
    const fontSizeSelect = document.getElementById('fontSizeSelect');

    let currentLang = 'uz'; // Default language
    let currentTopicId = ''; // Matches with the database keys
    let currentInputVal = ''; // The exact text user entered
    let globalVoiceRate = 1.0;

    // ----- SETTINGS MODAL LOGIC -----
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if(e.target === settingsModal) {
            settingsModal.classList.add('hidden');
        }
    });

    // Theme changes
    themeSelect.addEventListener('change', (e) => {
        const root = document.documentElement;
        if(e.target.value === 'neon') {
            root.style.setProperty('--neon-blue', '#06b6d4');
            root.style.setProperty('--neon-purple', '#a855f7');
            root.style.setProperty('--neon-pink', '#ec4899');
        } else if (e.target.value === 'gold') {
            root.style.setProperty('--neon-blue', '#ffd700');
            root.style.setProperty('--neon-purple', '#ffaa00');
            root.style.setProperty('--neon-pink', '#d4af37');
        } else if (e.target.value === 'cyber') {
            root.style.setProperty('--neon-blue', '#00ffcc');
            root.style.setProperty('--neon-purple', '#ff007f');
            root.style.setProperty('--neon-pink', '#facc15');
        }
    });

    // Voice Speed
    voiceSpeed.addEventListener('input', (e) => {
        globalVoiceRate = parseFloat(e.target.value);
        speedValue.innerText = globalVoiceRate.toFixed(1) + 'x';
    });

    // Font Size
    fontSizeSelect.addEventListener('change', (e) => {
        resultContent.style.fontSize = e.target.value;
    });

    // ----- TAGS LOGIC -----
    tagsList.addEventListener('click', (e) => {
        if(e.target.classList.contains('tag')) {
            topicInput.value = e.target.innerText;
            generateDoc();
        }
    });

    // ----- SCENARIOS DATABASE (MUKAMMAL) -----
    const theaterDatabase = {
        "amir temur": {
            uz: `
# 👑 "Buyuk Turon Yulduzi" – Amir Temur 
*(Maktab teatri uchun batafsil va emotsional ssenariy)*

## 🎯 1. MAQSAD VA G'OYA
Talabalarga Sohibqiron Amir Temurning adolatli hukmdor, kuchli strateg va ilm-fan homiysi sifatidagi obrazini tarixiy faktlar va chuqur dialoglar orqali ko'rsatib, vatanparvarlik ruhini uyg'otish.

## 🏰 2. DEKORATSIYA VA REKVIZITLAR
*   **Asosiy Sahna Fon:** Sahnaning orqa qismida katta LED ekranda Samarqandning qadimiy ko'rinishi. Go'ri Amir maqbarasining 3D vizual efekti.
*   **Taxt:** Markazda zardo'zi yostiqli oltin taxt.
*   **Yoritish (Lighting):** Sahna qorong'u, faqat Amir Temur gapirganda ustiga qaratilgan sariq "spot-nur" (projektor) tushadi. Dushman kiritilganda nurlar qizilga aylanadi.
*   **Musiqa:** Og'ir, epik bass va baraban sadolari.

---

## 🎭 3. SAHNALAR VA DIALOGLAR 

### 1-SAHNA: Adolatning o'rnatilishi
*(Sahna ochilganda karnay-surnay sadolari daxshatli ohangda yangraydi. Amir Temur o'zining harbiy libosida xarita ustida jiddiy o'ylanib turibdi. Atrofida xos soqchilar qotib turishibdi.)*

**Amir Temur:** *(Sekin, ammo jarangdor va daxshatli ovozda)* 
"Bizkim, Mulki Turon, Amiri Turkistonmiz! Bizkim, millatlarning eng qadimiysi va eng ulug'i! Mening qilichim g'ilofidan chiqdimi, bilingki u hech qachon zanglamaydi! Ammo eng katta kuch... bu adolatdadir. Davlat adolat ustiga qurilmas ekan, u barbod bo'lishga mahkumdir!"

**Vazir:** *(Pildirab kelib, qattiq ta'zim qiladi)*
"Sohibqironim! Buxorodagi amaldorlar xalqqa jabr qilib, oliy o'lpanni oshiribdilar... Xalq dod demoqda, hukmdorim!"

**Amir Temur:** *(G'azab bilan qarab, qo'lini qattiq musht qiladi)*
"Xalqning ko'z yoshi – davlatning zavolidir! O'sha amaldorlar zudlik bilan zindonga tashlansin! O'z xalqiga xiyonat qilganni... men hech qachon kechirmayman. Adolat – ko'z oldimda sobit tursin!" *(Orqa fonga chaqmoq ovozi va chaqnash effekti beriladi)*

### 2-SAHNA: Ilm-fanga e'tibor (Bobo va Nevara)
*(Sahnaga kichkina Mirzo Ulug'bek sekingina yugurib, qo'lida usturlob (astrolabe) ko'tarib kirib keladi. Musiqa sokin va mayinlashadi)*

**Mirzo Ulug'bek:** "Bobojon! Men osmon sirlarini o'rganmoqdaman. Yulduzlar shunchalar ko'pki... ularning siri beqiyos!"

**Amir Temur:** *(Yuzida mayinlik paydo bo'lib, Ulug'bekning boshini silaydi)* 
"Mening aqlli bolam... Menga qilich tutish qismat bo'ldi, toki atrof tinchib, yurt farovon bo'lsin. Sen esa... sen qalam tut! Ilm-fan o'rgan. Chunki dunyoni faqat kuch bilan emas, aql bilan ham asrash kerak. Dunyo sirlarini och, shunda ismim sening ilming orqali mangu yashaydi."

### 3-SAHNA: Urush va Qat'iyat
*(Sahna qizaradi. Elchi tushkun kayfiyatda maktub olib keladi)*

**Elchi:** "To'xtamishxondan xabar... U ustingizga mardkardalar qo'shinini tortishini ma'lum qildi!"

**Amir Temur:** *(Qilichini sekin qinidan sug'uradi. Qilichning 'shing' etgan ovozi mikrofonda kuchaytirib beriladi)*
"Demak, qilich uzatmaqdan boshqa chora qolmadi... Xabar qil, sarkardalar!! Qo'shin shaylansin! Men yolg'on va xiyonatni yer yuzidan yulib tashlamagunimcha to'xtamayman!! Mening amrim... Qonundir!"

*(Daxshatli epik musiqa "Two Steps from Hell" taronasi eng yuqori notada yangraydi. Aktyorlar qotib qolishadi va parda yopiladi).*

---
## ⏳ 4. TAYYORGARLIK REJASI
*  **Ovoz va Nutq:** Aktyorlarni kuniga 1 soatdan ovozlarini baland va tiniq chiqarishga mashq qildirish.
*  **Vizual Mapping:** Sahnadagi har bir qadam yorug'lik bilan aniq sinxron ishlab chiqilishi shart.
*  **Eksport:** Liboslar ijarasi va repetitsiya davomiyligi 1 oy davomida.
            `,
            en: `
# 👑 "Star of the Great Turan" – Amir Timur
*(Detailed and emotional scenario for school theater)*

## 🎯 1. OBJECTIVE & CONCEPT
To reveal the character of Amir Timur as a just ruler, powerful strategist, and patron of science to students, arousing a spirit of patriotism through historical facts and deep dialogues.

## 🏰 2. SETTINGS & PROPS
*   **Background:** A huge LED screen displaying an ancient view of Samarkand and a 3D visual effect of the Gur-e-Amir mausoleum.
*   **Throne:** A golden throne with heavy traditional cushions in the center.
*   **Lighting:** Dark stage; a gold "spotlight" hits Amir Timur when he speaks. The lights turn crimson when enemies trigger.
*   **Music:** Heavy, epic bass and intense battle drum sounds.

---

## 🎭 3. SCENES AND DIALOGUES

### SCENE 1: Establishing Justice
*(The curtain opens to the heavy sound of battle horns. Amir Timur is in full military attire, standing thoughtfully over a map. Elite guards stand totally still around him.)*

**Amir Timur:** *(Speaks slowly, but with a terrifyingly resonant voice)* 
"We, who are the Lord of Turan Realm, the Emir of Turkestan! We, who are the oldest and greatest of nations! If my sword leaves its sheath, know that it will never rust! But the greatest power... lies in justice. A state not built on justice is doomed to fall!"

**Vizier:** *(Enters quickly with a deep bow)*
"My Sovereign! The officials in Bukhara have oppressed the people, raising taxes without your order... The people are pleading for mercy, my Lord!"

**Amir Timur:** *(Glaring angrily, making a tight fist)*
"The tears of the people are the downfall of the state! Throw those officials into the dungeon immediately! He who betrays his own people... I will never forgive. Let justice stand firm before my eyes!" *(Thunder sound matches a stage flash effect)*

### SCENE 2: Focus on Science (Grandfather and Grandson)
*(Little Mirzo Ulugbek gently runs onto the stage, holding a golden astrolabe. The music softens)*

**Mirzo Ulugbek:** "Grandfather! I am studying the secrets of the sky. The stars are so numerous... their mysteries are unmatched!"

**Amir Timur:** *(A gentle look appears on his face; he strokes Ulugbek’s head)* 
"My smart boy... It became my destiny to hold a sword, so that the surroundings would be peaceful. But you... you must hold a pen! Study science. Because the world shouldn't just be saved by force, but preserved by intellect. Uncover the secrets of the universe, and my name will live forever through your knowledge."

### SCENE 3: War and Resolve
*(Stage turns red. An envoy brings an insulting letter)*

**Envoy:** "A message from Tokhtamysh Khan... He declares he is marching a massive army against us!"

**Amir Timur:** *(Slowly draws his sword. The 'shing' sound of the blade is heavily amplified)*
"Then there is no choice left but to draw the sword... Announce it, commanders!! Prepare the army! I will not stop until I tear lies and betrayal from the face of the earth!! My command... is the Law!"

*(Dramatic epic music by "Two Steps from Hell" blasts. The actors freeze as the curtain slowly falls).*
            `
        },
        "navro'z": {
            uz: `
# 🌸 3D Navro'z: "Asrlar Sadosi - Sumalak Sayli"
*(Bahoriy super mega-shou senariysi)*

## 🎯 1. G'OYA VA KONSEYPSIYA
Butun maktab binosini yoki faqat zallarni bahoriy karnavalga, bayramona sayl va "tirik muzey"ga aylantirish. Tabiat o'yg'onishini to'liq ko'rsatish!

## 🎪 2. DEKORATSIYA QURILMALARI
*   **"Qaynayotgan Sumalak" gologrammasi:** Sahnaning qoq o'rtasida katta sun'iy qozon o'rnatiladi, uning tagiga olov rangidagi LED chiroqlar bilan tutun uskunasi qo'yiladi.
*   **Bayramona elementlar:** Tol barglari, qing'iroqcha gullar va har bir tomoshabinga kirishda sumalak tarqatiladigan kichik uychalar.

## 🎭 3. SAHNA KO'RINISHLARI

### 1-PODA: Uyg'onish va Jar
*(Sahnaga Bahor shabadasi (qizlar raqsi) orqali yengil va mayin musiqa ostida kirib kelishadi. Birdan karnay sadolari butun zallni titratib yuboradi).*

**Momo:** *(Boshida chiroyli adras ro'mol, jilmayib)* 
"Xoy chol, turing! Eshitmayapsizmi, turnalar qaytibdi! Yurtimizga, O'zbekistonimizga Navro'zi olam kirib kelibdi!" 

**Bobo:** *(Qo'lida hassasi, belida belbog' bilan yayrab kulib chigadi)* 
"Momo, barakalla! Yuzimga iliq shabada uriildi... Bahor bu - umid demakdir! Qani yoshlar, qani polvonlar, bayramni boshlaymiz!"

### 2-PODA: Polvonlar va Sumalak qasidasi
*(Maydonga milliy kiyimlardagi polvon yigitlar chiqadi. Arqon tortish musobaqasi boshlanadi. Ularning yonida katta qozon atrofida aylanib qizlar raqsga tushishadi)*

**Bahor Qizi:** *(Ustinida yashil moviy Atlas, boshida gul chambari bilan so'zga chiqadi)*
"Qozonga solganimiz tosh bo'lsin, g'am-alamimiz barchasi tuproqqa qorishsin!
Niyati pok, yuragi toza xalqimning, dasturxoni doim shunday to'kin-sochin bo'lsin!" 

*(Barcha zaldagi o'quvchilar birgalikda "Sumalak" qo'shig'ini jo'rovozlikda kuylashadi, osmondan qog'oz gullar yog'iladi).*
            `,
            en: `
# 🌸 3D Navruz: "Echoes of Centuries - Sumalak Festival"
*(A super mega-show scenario for Spring)*

## 🎯 1. CONCEPT AND IDEA
Transforming the entire school hall into a spring carnival, a festive fair and a "living museum". Fully demonstrating the awakening of nature!

## 🎪 2. DECORATION SETUPS
*   **"Boiling Sumalak" Hologram:** A large artificial cauldron is placed in the center of the stage. A smoke machine and fire-colored LED lights are placed under it.
*   **Festive elements:** Willow branches, bell flowers, and small booths distributing traditional Sumalak to viewers at the entrance.

## 🎭 3. SCENE ACTS

### ACT 1: Awakening and Announcement
*(The Spring breeze (danced by girls) softly glides into the stage under light music. Suddenly, the loud sound of the Karnay (national horn) shakes the hall).*

**Granny:** *(Wearing a beautiful adras scarf, smiling)* 
"Hey old man, get up! Don't you hear, the cranes have returned! The festival of Navruz has entered our land, our Uzbekistan!" 

**Grandpa:** *(Walks out cheerfully with a wooden staff and a traditional sash belt)* 
"Well done, my dear! I feel the warm breeze on my face... Spring means hope! Come on youths, come on wrestlers, let's start the festival!"

### ACT 2: Wrestlers and the Sumalak Ode
*(Young strong men in national clothes step into the arena. A tug-of-war competition begins. Next to them, girls dance circling the giant cauldron)*

**Daughter of Spring:** *(Steps out wearing green-blue Atlas silk, with a flower crown on her head)*
"May the stones we put in the cauldron be strong, may all our sorrows mix with the dust!
May the tables of my people, with their pure intentions and clean hearts, always be this abundant!" 

*(All the students in the hall sing the "Sumalak" song in a massive chorus, as paper flower petals fall from the ceiling).*
            `
        },
        "bitiruv": {
            uz: `
# 🎓 Bitiruv kechasi: "11 Yillik Parvoz: Bolalik bilan Xayrlashuv"

## 🎯 1. EMOTSIONAL MAQSAD
Har bir bitiruvchining va o'qituvchining ko'zida quvonch va sog'inch yoshlarini paydo qilish. Bolalikning beg'uborligidan katta hayot mas'uliyatiga qadamni teatrlashtirilgan tarzda ifodalash.

## 🎬 2. VIZUAL VA AUDI TO'PLAM
*   **Media Ekran:** Sahnadagi katta ekranda 1-sinfdan to 11-sinfgacha bo'lgan arxive rasm va videolar dinamik slayd-shouda "Hans Zimmer - Time" musiqasi ostida aylanadi.
*   **Sahna Obyektlari:** Sahnaning markazida bekat (Oltin davrim bekati) va devoriy soat (orqaga aylanuvchi).

## 🎭 3. DIALOG VA MONOLOGLAR

### Ko'rinish 1: "Birinchi Qo'ng'iroq Sog'inchi"
*(Sahnaga 11-sinf o'quvchisi papkasini osiltirib sekin kirib keladi, uning qarshisidan kichkina 1-sinf o'quvchisi katta gul bilan chopib keladi. Nur faqat ularga tushadi.)*

**Bitiruvchi:** *(Kichkintoyga termulib)*
"Shunchalar tez o'tib ketdimi? Kechagina sening o'rningda men edim... Qo'rqib, hayajonlanib shu darvozadan kirib kelgandim."

**1-Sinf:** "Aka (Opa), nega ko'zingizda yosh bor? Maktab hammaga yoqadi-ku! Meni bugun partaga o'tqazib, 'A' harfini yozishni o'rgatishdi!"

**Bitiruvchi:** *(Tizzalab, bolani bag'riga bosib)*
"Men senga havas qilyapman... Senda hali qizg'in tanaffuslar, beg'ubor sho'xliklar va mehribon ustozlarni kanda qilmasdan ko'rish imkoni bor... Bizning vaqtimiz esa tugadi. Buyog'iga katta hayot. Maktabimizni asrang!"

### Ko'rinish 2: "Ustozga Ta'zim" 
*(Sahnaga barcha bitiruvchilar yarim oy shaklida tiziladi. Sinf rahbari markazga taklif etiladi.*)

**Sardor/Bitiruvchi:** "Ustoz... Ba'zida darslardan qochdik, ba'zida asabingizni egovladik, sho'xlik qildik. Lekin siz bir marta ham bizdan voz kechmadingiz. Siz – bizning ikkinchi onamiz / otamizsiz! Sizning bergan tarbiyangiz bizni inson qildi. Qayerda bo'lmaylik, sizning yorug' yuzingiz bizni doim oldinga chorlaydi!"

*(Hamma o'quvchilar birdan: "RAHMAT SIZGA, USTOZ!" deb qo'llarini ko'kragiga qo'yib ta'zim qiladilar).*

*(Sahnada Vidolashuv valsi ijro etiladi. Osmondan sharlar va uchqunlar to'kiladi).*
            `,
            en: `
# 🎓 Graduation Night: "An 11-Year Flight: Farewell to Childhood"

## 🎯 1. EMOTIONAL OBJECTIVE
To bring tears of joy and nostalgia to the eyes of every graduate and teacher. To theatrically re-enact the step from the innocence of childhood to the responsibility of adult life.

## 🎬 2. VISUAL AND AUDIO SET
*   **Media Screen:** On the big stage screen, archival photos and videos from 1st to 11th grade play in a dynamic slideshow to the sound of "Hans Zimmer - Time".
*   **Stage Objects:** A bus stop (named "Golden Era Station") in the center of the stage, and a wall clock (ticking backwards).

## 🎭 3. DIALOGUES AND MONOLOGUES

### Scene 1: "Longing for the First Bell"
*(An 11th-grade student walks onto the stage slowly, backpack hanging loose. A little 1st grader with a huge bouquet runs towards him. The spotlight isolates only them.)*

**Graduate:** *(Stares at the little kid)*
"Did it really go by so fast? Only yesterday, I was in your place... Scared, excited, walking through those very gates."

**1st Grader:** "Brother (Sister), why are there tears in your eyes? Everyone loves school! Today they made me sit at a desk and taught me how to write the letter 'A'!"

**Graduate:** *(Kneels and hugs the child)*
"I envy you... You still have exciting recesses, innocent pranks, and the chance to see our caring teachers every day... Our time has run out. From here on, it's the big adult life. Take good care of our school!"

### Scene 2: "Bow to the Teacher" 
*(All graduates form a crescent shape on stage. The homeroom teacher is invited to the center.*)

**Class Leader/Graduate:** "Teacher... Sometimes we ran away from classes, sometimes we tested your patience, and we misbehaved. But you never gave up on us, not even once. You are our second mother / father! Your upbringing molded us into human beings. Wherever we may be, your bright face will always guide us forward!"

*(All students in unison: "THANK YOU, TEACHER!" placing their hands on their chests and bowing deeply).*

*(A Farewell Waltz is performed on stage. Balloons and sparkles flutter down from the ceiling).*
            `
        }
    };

    function generateUltraUniversalPlan(topic, lang) {
        if(lang === 'uz') {
            return `
# ⚡ AI KREATIV SSENARIY: "${topic.toUpperCase()}"

## 1. 🎬 VIZUAL DEKORATSIYA
*   **Dinamik Ekran:** "${topic}" mavzusini yorituvchi kucha / koinot / neontarmoq harakati vizualizatsiyasi.
*   **Yorug'lik:** Sirli ko'k-binafsha va oq-oltin lazer nurlari maxsus effektlar bilan (DMX controller orqali avtomatlashgan).

## 2. 🎭 AKTYORLAR VA REJISSURA
*   Dastlabki chiqish zaldagi oddiy kuzatuvchilar orasidan feyerverk ovozi bilan boshlanadi.
*   Har bir qahramonning qadamlari mikrofonlashtirilgan bo'lib, musiqa bilan mutlaqo sinxron qilinadi.

## 3. 📜 ZAMONAVIY SSENARIY TUZILMASI (3 ACT STRUCTURE)
*   **1-BO'LIM (Muqaddima):** Sa'natkorona muhitga kirish. Zalda mutlaq sokinlik va qahramonning shivirli ammo zalni titratuvchi monologi.
*   **2-BO'LIM (Konflikt):** Ekrandagi vizuallar qizil rangga kiradi. Asosiy maqsad yechimidagi qiyinchilik emotsional baqiriqlar hamda fonoviy orkestr yordamida uzatiladi.
*   **3-BO'LIM (Katarzis/Yechim):** G'alaba yoki chuqur falsafiy xulosa! Asosiy gapdan so'ng tepadan konfetti / yaltiroq effektlar yog'diriladi va epik musiqa o'z cho'qqisiga chiqadi.

> **AI Maslahati:** "Matnni yodlamang, uni o'zingizniki qilib yashang. Tomoshabin sizning ko'zingizga qarab ishonsin!"

## 4. ⏳ TO'LIQ ISH JADVALI
*   Konsepsiyani rahbariyat oqiga tasdiqlatish.
*   Kerakli Epik musiqa pley-listlarini Soundcloud/Audiojungle orqali yig'ish.
*   Maktab zalida eng kamida 3 marta general (liboslarda va chiroqlarda) repetitsiya.`;
        } else {
            return `
# ⚡ AI CREATIVE SCENARIO: "${topic.toUpperCase()}"

## 1. 🎬 VISUAL DECORATION
*   **Dynamic Screen:** Deep visual motion abstract graphics matching the "${topic}" theme.
*   **Lighting:** Mysterious blue-purple and white-gold laser beams with special effects (automated via DMX controller).

## 2. 🎭 ACTORS AND DIRECTING
*   The opening starts directly from the audience seats with sudden sound effects.
*   Every hero's footsteps are microphoned and completely synchronized with the background music track.

## 3. 📜 MODERN SCRIPT STRUCTURE (3 ACT STRUCTURE)
*   **ACT I (Prologue):** Entering the artistic atmosphere. Absolute silence in the hall, broken by a whispering but room-shaking monologue.
*   **ACT II (Conflict):** Screen visuals turn intensely red. The climax of the core issue is conveyed through emotional shouts and a heavy orchestral backdrop.
*   **ACT III (Resolution/Catharsis):** Victory or a deep philosophical conclusion! After the final punchline, confetti rains down from the ceiling as epic music reaches its zenith.

> **AI Advice:** "Don't just memorize the text; live it as your own. Make the audience believe just by looking into your eyes!"

## 4. ⏳ FULL TIMELINE
*   Approve the concept with the school administration.
*   Gather the necessary Epic music playlists via Soundcloud/Audiojungle.
*   Hold at least 3 full dress rehearsals (with costumes and lighting) in the main hall.`;
        }
    }

    // Generator function logic 
    function generateDoc() {
        const inputVal = topicInput.value.trim();
        const baseTopic = inputVal.toLowerCase();
        
        if (!baseTopic) {
            topicInput.focus();
            document.querySelector('.input-wrapper').style.boxShadow = "0 0 20px rgba(236, 72, 153, 0.8)";
            setTimeout(() => { document.querySelector('.input-wrapper').style.boxShadow = "none"; }, 1500);
            return;
        }

        currentInputVal = inputVal;

        // Find the matching topic key, fallback to direct string if not matched explicitly
        let foundKey = 'custom';
        for (let key in theaterDatabase) {
            if (baseTopic.includes(key) || key.includes(baseTopic)) {
                foundKey = key;
                break;
            }
        }
        currentTopicId = foundKey;

        generateBtn.style.transform = "scale(0.95)";
        setTimeout(() => generateBtn.style.transform = "scale(1)", 150);

        resultCard.classList.add('hidden');
        loadingState.classList.remove('hidden');
        translateBtn.innerHTML = '<i class="fa-solid fa-language"></i> EN';
        currentLang = 'uz'; // Reset to original lang on new generate
        window.speechSynthesis.cancel();
        
        let msgIndex = 0;
        const waitMessages = currentLang === 'uz' ? [
            "Neyrotarmoqlar analiz qilmoqda...",
            "Kreativ g'oyalar shakllantirilmoqda...",
            "3D Dekoratsiyalar modellari kiritilmoqda...",
            "Ssenariy qatorlari yozilmoqda...",
            "Tadbir mukammalligi tekshirilmoqda..."
        ] : ["Analyzing...", "Generating Script...", "Finalizing ideas..."];
        
        loadingText.innerText = waitMessages[msgIndex];
        const msgInterval = setInterval(() => {
            msgIndex++;
            if(msgIndex < waitMessages.length) loadingText.innerText = waitMessages[msgIndex];
        }, 800);

        setTimeout(() => {
            clearInterval(msgInterval);
            renderContent();
            
            loadingState.classList.add('hidden');
            resultCard.classList.remove('hidden');
            
            resultCard.style.boxShadow = "0 0 100px rgba(168,85,247, 0.8)";
            setTimeout(() => { resultCard.style.boxShadow = "0 0 30px rgba(168,85,247,0.15)"; }, 1200);
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3500); // 3.5 sec fake AI loading for premium realism
    }

    generateBtn.addEventListener('click', generateDoc);
    topicInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') generateDoc();
    });

    function renderContent() {
        let finalOutput = "";
        if (currentTopicId === 'custom') {
            finalOutput = generateUltraUniversalPlan(currentInputVal, currentLang);
        } else {
            finalOutput = theaterDatabase[currentTopicId][currentLang];
        }
        resultContent.innerHTML = marked.parse(finalOutput);
    }

    // UI BUTTONS
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultContent.innerText).then(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            copyBtn.style.color = "#10b981";
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyBtn.style.color = "";
            }, 2000);
        });
    });

    printBtn.addEventListener('click', () => window.print());

    pdfBtn.addEventListener('click', () => {
        const opt = {
            margin:       0.5,
            filename:     currentLang === 'uz' ? 'AI_Ssenariy.pdf' : 'AI_Scenario.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        const tempDiv = document.createElement('div');
        tempDiv.style.backgroundColor = "white";
        tempDiv.style.color = "black";
        tempDiv.style.padding = "20px";
        tempDiv.innerHTML = resultContent.innerHTML;
        const headings = tempDiv.querySelectorAll('h1, h2, h3');
        headings.forEach(h => {
             h.style.color = "black";
             h.style.background = "none";
             h.style.textShadow = "none";
             h.style.webkitTextFillColor = "black";
        });
        
        pdfBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        html2pdf().set(opt).from(tempDiv).save().then(() => {
            pdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i>';
        });
    });

    // Valid Translation (Swapping database fields!)
    translateBtn.addEventListener('click', () => {
        if(!currentInputVal) return; // if empty
        window.speechSynthesis.cancel();
        
        translateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Tarjima...';
        
        setTimeout(() => {
            currentLang = currentLang === 'uz' ? 'en' : 'uz';
            renderContent(); // Swap the text!
            
            if(currentLang === 'en') {
                translateBtn.innerHTML = '<i class="fa-solid fa-language"></i> UZ';
                translateBtn.style.color = "#10b981";
                translateBtn.style.borderColor = "#10b981";
            } else {
                translateBtn.innerHTML = '<i class="fa-solid fa-language"></i> EN';
                translateBtn.style.color = "";
                translateBtn.style.borderColor = "";
            }
        }, 1200); // 1.2s delay for realist translation feel
    });

    // Accurate Text to Speech Functionality
    voiceBtn.addEventListener('click', () => {
        if('speechSynthesis' in window) {
            
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel(); // Toggle Stop if clicked during speech
                voiceBtn.innerHTML = currentLang === 'uz' ? '<i class="fa-solid fa-volume-high"></i> O\'qish' : '<i class="fa-solid fa-volume-high"></i> Read';
                voiceBtn.style.color = "";
                voiceBtn.style.borderColor = "";
                return;
            }

            const textToSpeak = resultContent.innerText;
            if(!textToSpeak.trim()) return;

            const msg = new SpeechSynthesisUtterance(textToSpeak);
            msg.rate = globalVoiceRate; 
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            if(voices.length > 0) {
                if (currentLang === 'uz') {
                    // Search for explicit Uzbek voice (Microsoft Nodir)
                    let bestVoice = voices.find(v => v.lang.toLowerCase().includes('uz-uz') || v.name.toLowerCase().includes('uzbek'));
                    // Fallbacks for Uzbek text
                    if(!bestVoice) bestVoice = voices.find(v => v.lang.toLowerCase().includes('tr-')) || voices.find(v => v.lang.toLowerCase().includes('ru-')) || voices[0];
                    msg.voice = bestVoice;
                } else {
                    // English voice
                    let bestVoice = voices.find(v => v.lang.toLowerCase().includes('en-us') || v.lang.toLowerCase().includes('en-gb'));
                    msg.voice = bestVoice || voices[0];
                }
            }
            
            window.speechSynthesis.speak(msg);
            voiceBtn.innerHTML = '<i class="fa-solid fa-volume-up"></i> Gapirmoqda...';
            voiceBtn.classList.add('gold-btn'); // Add glowing effect back if it was removed
            voiceBtn.style.color = "#ec4899";
            voiceBtn.style.borderColor = "#ec4899";
            
            msg.onend = () => {
                voiceBtn.innerHTML = currentLang === 'uz' ? '<i class="fa-solid fa-volume-high"></i> O\'qish' : '<i class="fa-solid fa-volume-high"></i> Read';
                voiceBtn.style.color = "";
                voiceBtn.style.borderColor = "";
            }
            msg.onerror = () => {
                voiceBtn.innerHTML = currentLang === 'uz' ? '<i class="fa-solid fa-volume-high"></i> O\'qish' : '<i class="fa-solid fa-volume-high"></i> Read';
                voiceBtn.style.color = "";
                voiceBtn.style.borderColor = "";
            }
        } else {
            alert('Afsuski sizning brauzeringiz matnni ovozli o\'qishni(Text-To-Speech) qo\'llab quvvatlamaydi.');
        }
    });
});

// 3D Particles Background
function initThreeJSBackground() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.002);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // x, y, z
        posArray[i] = (Math.random() - 0.5) * 150;
        posArray[i+1] = (Math.random() - 0.5) * 150;
        posArray[i+2] = (Math.random() - 0.5) * 150;
        
        // Colors - mix of neon purple, blue and gold
        const randColor = Math.random();
        if(randColor < 0.4) { // Blue
            colorsArray[i] = 0.02; colorsArray[i+1] = 0.71; colorsArray[i+2] = 0.83;
        } else if (randColor < 0.8) { // Purple
            colorsArray[i] = 0.66; colorsArray[i+1] = 0.33; colorsArray[i+2] = 0.97;
        } else { // Pink
            colorsArray[i] = 0.92; colorsArray[i+1] = 0.28; colorsArray[i+2] = 0.6;
        }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.3, 
        vertexColors: true,
        transparent: true, 
        opacity: 0.8, 
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    let mouseX = 0; let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.005;
        mouseY = (e.clientY - windowHalfY) * 0.005;
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.03;
        particlesMesh.rotation.x = elapsedTime * 0.01;
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
