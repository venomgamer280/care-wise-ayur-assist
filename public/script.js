// Health Companion App - JavaScript

// Global state
let currentLanguage = 'en';
let selectedSymptoms = [];
let selectedConditions = [];
let medicines = [];
let isListening = false;
let recognition = null;
let voiceTranscript = '';

// Language translations
const translations = {
    en: {
        // Add English translations as fallback
    },
    hi: {
        // Hindi translations
    },
    bn: {
        // Bengali translations  
    },
    ta: {
        // Tamil translations
    }
};

// Common symptoms data
const symptomsData = [
    { id: 'fever', name: { en: 'Fever', hi: 'बुखार', bn: 'জ্বর', ta: 'காய்ச்சல்' } },
    { id: 'headache', name: { en: 'Headache', hi: 'सिरदर्द', bn: 'মাথাব্যথা', ta: 'தலைவலி' } },
    { id: 'cough', name: { en: 'Cough', hi: 'खांसी', bn: 'কাশি', ta: 'இருமல்' } },
    { id: 'fatigue', name: { en: 'Fatigue', hi: 'थकान', bn: 'ক্লান্তি', ta: 'சோர்வு' } },
    { id: 'nausea', name: { en: 'Nausea', hi: 'मतली', bn: 'বমি বমি ভাব', ta: 'குமட்டல்' } },
    { id: 'dizziness', name: { en: 'Dizziness', hi: 'चक्कर आना', bn: 'মাথা ঘোরা', ta: 'தலைசுற்றல்' } },
    { id: 'joint-pain', name: { en: 'Joint Pain', hi: 'जोड़ों में दर्द', bn: 'জয়েন্টে ব্যথা', ta: 'மூட்டு வலி' } },
    { id: 'stomach-ache', name: { en: 'Stomach Ache', hi: 'पेट दर्द', bn: 'পেট ব্যথা', ta: 'வயிற்று வலி' } },
    { id: 'shortness-breath', name: { en: 'Shortness of Breath', hi: 'सांस लेने में कठिनाई', bn: 'শ্বাসকষ্ট', ta: 'மூச்சு விடுதல் சிரமம்' } },
    { id: 'chest-pain', name: { en: 'Chest Pain', hi: 'छाती में दर्द', bn: 'বুকে ব্যথা', ta: 'மார்பு வலி' } },
    { id: 'back-pain', name: { en: 'Back Pain', hi: 'कमर दर्द', bn: 'পিঠে ব্যথা', ta: 'முதுகு வலி' } },
    { id: 'insomnia', name: { en: 'Sleep Problems', hi: 'नींद की समस्या', bn: 'ঘুমের সমস্যা', ta: 'தூக்கமின்மை' } }
];

// Health conditions data
const conditionsData = [
    { id: 'arthritis', name: { en: 'Arthritis', hi: 'गठिया', bn: 'বাত', ta: 'மூட்டுவாதம்' } },
    { id: 'back-pain', name: { en: 'Back Pain', hi: 'कमर दर्द', bn: 'পিঠে ব্যথা', ta: 'முதுகு வலி' } },
    { id: 'diabetes', name: { en: 'Diabetes', hi: 'मधुमेह', bn: 'ডায়াবেটিস', ta: 'நீரிழிவு' } },
    { id: 'hypertension', name: { en: 'High BP', hi: 'उच्च रक्तचाप', bn: 'উচ্চ রক্তচাপ', ta: 'உயர் இரक்த அழுத்தம்' } },
    { id: 'heart', name: { en: 'Heart Issues', hi: 'हृदय संबंधी', bn: 'হার্টের সমস্যা', ta: 'இதய பிரச்சினைகள்' } },
    { id: 'anxiety', name: { en: 'Anxiety', hi: 'चिंता', bn: 'উদ্বেগ', ta: 'கவலை' } }
];

// Yoga poses data
const yogaPoses = [
    {
        id: 'sukhasana',
        name: { en: 'Easy Pose', hi: 'सुखासन', bn: 'সুখাসন', ta: 'சுகாசனம்' },
        difficulty: 'beginner',
        duration: '5-10 minutes',
        benefits: {
            en: ['Calms the mind', 'Improves posture', 'Reduces stress'],
            hi: ['मन को शांत करता है', 'आसन में सुधार', 'तनाव कम करता है'],
            bn: ['মন শান্ত করে', 'ভঙ্গি উন্নত করে', 'স্ট্রেস কমায়'],
            ta: ['மனதை அமைதிப்படுத்துகிறது', 'நிலைமையை மேம்படுத்துகிறது', 'மன அழுத்தத்தைக் குறைக்கிறது']
        },
        instructions: {
            en: ['Sit cross-legged on the floor', 'Keep your spine straight', 'Rest hands on knees', 'Breathe deeply and slowly', 'Focus on your breath'],
            hi: ['फर्श पर पालथी मारकर बैठें', 'अपनी रीढ़ सीधी रखें', 'हाथों को घुटनों पर रखें', 'गहरी और धीमी सांस लें', 'अपनी सांस पर ध्यान दें'],
            bn: ['মেঝেতে পা ভাঁজ করে বসুন', 'মেরুদণ্ড সোজা রাখুন', 'হাত হাঁটুতে রাখুন', 'গভীর এবং ধীরে শ্বাস নিন', 'আপনার শ্বাসে মনোযোগ দিন'],
            ta: ['தரையில் குறுக்காக அமருங்கள்', 'உங்கள் முதுகெலும்பை நேராக வைத்திருங்கள்', 'கைகளை முழங்காலில் வைக்கவும்', 'ஆழமாகவும் மெதுவாகவும் சுவாசிக்கவும்', 'உங்கள் மூச்சில் கவனம் செலுத்துங்கள்']
        },
        ageGroup: ['50+', '60+', '70+', '80+']
    },
    {
        id: 'pranayama',
        name: { en: 'Deep Breathing', hi: 'प्राणायाम', bn: 'প্রাণায়াম', ta: 'பிராணாயாமம்' },
        difficulty: 'beginner',
        duration: '10-15 minutes',
        benefits: {
            en: ['Lowers blood pressure', 'Reduces anxiety', 'Improves lung capacity'],
            hi: ['रक्तचाप कम करता है', 'चिंता कम करता है', 'फेफड़ों की क्षमता बढ़ाता है'],
            bn: ['রক্তচাপ কমায়', 'উদ্বেগ কমায়', 'ফুসফুসের ক্ষমতা বাড়ায়'],
            ta: ['இரத்த அழுத்தத்தைக் குறைக்கிறது', 'கவலையைக் குறைக்கிறது', 'நுரையீரல் திறனை மேம்படுத்துகிறது']
        },
        instructions: {
            en: ['Sit comfortably with spine erect', 'Close your eyes gently', 'Inhale slowly through nose for 4 counts', 'Hold breath for 2 counts', 'Exhale slowly through mouth for 6 counts', 'Repeat 10-15 times'],
            hi: ['रीढ़ सीधी करके आराम से बैठें', 'आंखें धीरे से बंद करें', '4 गिनती में नाक से धीरे सांस लें', '2 गिनती तक सांस रोकें', '6 गिनती में मुंह से धीरे सांस छोड़ें', '10-15 बार दोहराएं'],
            bn: ['মেরুদণ্ড সোজা করে আরামে বসুন', 'আস্তে চোখ বন্ধ করুন', '৪ গোনা পর্যন্ত নাক দিয়ে ধীরে শ্বাস নিন', '২ গোনা পর্যন্ত শ্বাস আটকে রাখুন', '৬ গোনা পর্যন্ত মুখ দিয়ে ধীরে শ্বাস ছাড়ুন', '১০-১৫ বার পুনরাবৃত্তি করুন'],
            ta: ['முதுகெலும்பை நேராக வைத்து வசதியாக அமருங்கள்', 'மெதுவாக கண்களை மூடுங்கள்', '4 எண்ணிக்கையில் மூக்கு வழியாக மெதுவாக மூச்சு இழுக்கவும்', '2 எண்ணிக்கைக்கு மூச்சைப் பிடித்துக் கொள்ளுங்கள்', '6 எண்ணிக்கையில் வாய் வழியாக மெதுவாக மூச்சை விடுங்கள்', '10-15 முறை மீண்டும் செய்யுங்கள்']
        },
        ageGroup: ['50+', '60+', '70+', '80+']
    }
];

// Mock disease data
const diseaseData = {
    'common-cold': {
        name: { en: 'Common Cold', hi: 'सामान्य सर्दी', bn: 'সাধারণ সর্দি', ta: 'சாதாரண சளி' },
        probability: 85,
        description: { en: 'A viral infection affecting the upper respiratory system', hi: 'ऊपरी श्वसन तंत्र को प्रभावित करने वाला वायरल संक्रमण', bn: 'উপরের শ্বাসযন্ত্রকে প্রভাবিত করে এমন ভাইরাল সংক্রমণ', ta: 'மேல் சுவாச அமைப்பைப் பாதிக்கும் வைரஸ் தொற்று' },
        ayurvedicRemedies: {
            en: ['Honey and ginger in warm water', 'Tulsi tea', 'Turmeric milk at bedtime', 'Steam inhalation with eucalyptus'],
            hi: ['गर्म पानी में शहद और अदरक', 'तुलसी की चाय', 'सोते समय हल्दी वाला दूध', 'नीलगिरी के साथ भाप लेना'],
            bn: ['গরম পানিতে মধু ও আদা', 'তুলসি চা', 'শোয়ার সময় হলুদ দুধ', 'ইউক্যালিপটাস দিয়ে বাষ্প নেওয়া'],
            ta: ['வெதுவெதுப்பான நீரில் தேன் மற்றும் இஞ்சி', 'துளசி தேநீர்', 'படுக்கும் நேரத்தில் மஞ்சள் பால்', 'யூகலிப்டஸுடன் நீராவி உள்ளிழுத்தல்']
        },
        precautions: {
            en: ['Rest and get adequate sleep', 'Drink warm fluids', 'Avoid cold foods'],
            hi: ['आराम करें और पर्याप्त नींद लें', 'गर्म तरल पदार्थ पिएं', 'ठंडे भोजन से बचें'],
            bn: ['বিশ্রাম নিন এবং পর্যাপ্ত ঘুম পান', 'গরম তরল পান করুন', 'ঠান্ডা খাবার এড়িয়ে চলুন'],
            ta: ['ஓய்வு மற்றும் போதுமான தூக்கம்', 'வெதுவெதுப்பான திரவங்களைக் குடிக்கவும்', 'குளிர்ச்சியான உணவுகளைத் தவிர்க்கவும்']
        },
        severity: 'mild'
    },
    'hypertension': {
        name: { en: 'High Blood Pressure', hi: 'उच्च रक्तचाप', bn: 'উচ্চ রক্তচাপ', ta: 'உயர் இரத்த அழுத்தம்' },
        probability: 75,
        description: { en: 'Elevated blood pressure that may require medical attention', hi: 'बढ़ा हुआ रक्तचाप जिसमें चिकित्सा सहायता की आवश्यकता हो सकती है', bn: 'উচ্চ রক্তচাপ যার জন্য চিকিৎসা সহায়তার প্রয়োজন হতে পারে', ta: 'மருத்துவ கவனிப்பு தேவைப்படக்கூডிய உயர் இரத்த அழুत்தம்' },
        ayurvedicRemedies: {
            en: ['Arjuna bark decoction', 'Regular garlic consumption', 'Amla juice on empty stomach', 'Meditation and breathing exercises'],
            hi: ['अर्जुन की छाल का काढ़ा', 'नियमित लहसुन का सेवन', 'खाली पेट आंवला का रस', 'ध्यान और प्राणायाम'],
            bn: ['অর্জুন ছালের কাঢ়া', 'নিয়মিত রসুন সেবন', 'খালি পেটে আমলকির রস', 'ধ্যান এবং শ্বাস প্রশ্বাসের ব্যায়াম'],
            ta: ['அர்ஜுன மரப்பட்டை கஷாயம்', 'வழக்கமான பூண்டு உட்கொள்ளல்', 'வெறும் வயிற்றில் நெல்லிக்காய் ரசம்', 'தியானம் மற்றும் சுவாச பயிற்சிகள்']
        },
        precautions: {
            en: ['Reduce salt intake', 'Regular exercise', 'Reduce stress', 'Consult doctor'],
            hi: ['नमक कम करें', 'नियमित व्यायाम', 'तनाव कम करें', 'डॉक्टर से सलाह लें'],
            bn: ['লবণ কম খান', 'নিয়মিত ব্যায়াম', 'স্ট্রেস কমান', 'ডাক্তারের সাথে পরামর্শ করুন'],
            ta: ['உப்பு உட்கொள்ளலைக் குறைக்கவும்', 'வழக்கமான உடற்பயிற்சி', 'மன அழுத்தத்தைக் குறைக்கவும்', 'மருத்துவரை அணுகவும்']
        },
        severity: 'moderate'
    }
};

// Mock hospital data
const hospitalData = [
    {
        id: '1',
        name: 'City General Hospital',
        distance: '0.8 km',
        phone: '+91-11-2345-6789',
        address: '123 Medical Street, Central Delhi',
        specialty: ['Emergency', 'Cardiology', 'Neurology'],
        rating: 4.5,
        estimatedTime: '5 mins',
        emergency24h: true
    },
    {
        id: '2',
        name: 'Ayurveda Health Center',
        distance: '1.2 km',
        phone: '+91-11-2345-6790',
        address: '456 Wellness Avenue, South Delhi',
        specialty: ['Ayurvedic Medicine', 'Geriatric Care', 'Emergency'],
        rating: 4.3,
        estimatedTime: '8 mins',
        emergency24h: true
    },
    {
        id: '3',
        name: 'Senior Care Medical Center',
        distance: '1.5 km',
        phone: '+91-11-2345-6791',
        address: '789 Elder Street, West Delhi',
        specialty: ['Geriatric Medicine', 'Emergency', 'Orthopedics'],
        rating: 4.7,
        estimatedTime: '10 mins',
        emergency24h: true
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTime();
    setInterval(updateTime, 1000);
    loadMedicines();
});

function initializeApp() {
    updateLanguageContent();
    populateSymptoms();
    populateConditions();
    initializeVoiceRecognition();
}

// Language functions
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('hidden');
}

function changeLanguage(languageCode, displayName) {
    currentLanguage = languageCode;
    document.getElementById('current-language').textContent = displayName;
    document.getElementById('language-menu').classList.add('hidden');
    updateLanguageContent();
    showToast(getLocalizedText('Language changed', 'भाषा बदली गई', 'ভাষা পরিবর্তিত', 'மொழி மாற்றப்பட்டது'), 'success');
}

function updateLanguageContent() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const key = `data-${currentLanguage}`;
        if (element.hasAttribute(key)) {
            element.textContent = element.getAttribute(key);
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll(`[data-${currentLanguage}-placeholder]`);
    placeholderElements.forEach(element => {
        element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
    });
}

function getLocalizedText(en, hi, bn, ta) {
    const texts = { en, hi, bn, ta };
    return texts[currentLanguage] || en;
}

// Navigation functions
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard').classList.add('active');
    document.getElementById('main-nav').classList.remove('hidden');
}

function showFeature(featureId) {
    hideAllSections();
    document.getElementById(featureId).classList.add('active');
    document.getElementById('main-nav').classList.add('hidden');
}

function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
}

// Symptom checker functions
function populateSymptoms() {
    const grid = document.getElementById('symptoms-grid');
    grid.innerHTML = '';
    
    symptomsData.forEach(symptom => {
        const button = document.createElement('button');
        button.className = 'symptom-btn';
        button.textContent = symptom.name[currentLanguage] || symptom.name.en;
        button.onclick = () => toggleSymptom(symptom);
        grid.appendChild(button);
    });
}

function toggleSymptom(symptom) {
    const existingIndex = selectedSymptoms.findIndex(s => s.id === symptom.id);
    
    if (existingIndex === -1) {
        selectedSymptoms.push(symptom);
    } else {
        selectedSymptoms.splice(existingIndex, 1);
    }
    
    updateSelectedSymptoms();
    updateAnalyzeButton();
}

function addCustomSymptom() {
    const input = document.getElementById('custom-symptom');
    const symptomText = input.value.trim();
    
    if (symptomText) {
        const customSymptom = {
            id: `custom-${Date.now()}`,
            name: { en: symptomText, hi: symptomText, bn: symptomText, ta: symptomText }
        };
        
        selectedSymptoms.push(customSymptom);
        input.value = '';
        updateSelectedSymptoms();
        updateAnalyzeButton();
    }
}

function updateSelectedSymptoms() {
    const container = document.getElementById('selected-symptoms');
    container.innerHTML = '';
    
    if (selectedSymptoms.length > 0) {
        const title = document.createElement('h4');
        title.textContent = getLocalizedText('Selected Symptoms:', 'चयनित लक्षण:', 'নির্বাচিত লক্ষণ:', 'தேர்ந்தெடுக்கப்பட்ட அறிகுறிகள்:');
        container.appendChild(title);
        
        selectedSymptoms.forEach(symptom => {
            const tag = document.createElement('span');
            tag.className = 'symptom-tag';
            tag.innerHTML = `${symptom.name[currentLanguage] || symptom.name.en} <i class="fas fa-times"></i>`;
            tag.onclick = () => removeSymptom(symptom.id);
            container.appendChild(tag);
        });
    }
}

function removeSymptom(symptomId) {
    selectedSymptoms = selectedSymptoms.filter(s => s.id !== symptomId);
    updateSelectedSymptoms();
    updateAnalyzeButton();
}

function updateAnalyzeButton() {
    const button = document.getElementById('analyze-btn');
    button.disabled = selectedSymptoms.length === 0;
}

async function analyzeSymptoms() {
    if (selectedSymptoms.length === 0) return;
    
    showLoading();
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const results = performSymptomAnalysis();
        displayAnalysisResults(results);
        
    } catch (error) {
        showToast(getLocalizedText('Error analyzing symptoms', 'लक्षण विश्लेषण में त्रुटि', 'লক্ষণ বিশ্লেষণে ত্রুটি', 'அறிகுறி பகுப்पाय्वু में त्रुटि'), 'error');
    } finally {
        hideLoading();
    }
}

function performSymptomAnalysis() {
    const results = [];
    
    // Simple matching logic
    const symptomNames = selectedSymptoms.map(s => (s.name[currentLanguage] || s.name.en).toLowerCase());
    
    if (symptomNames.some(name => name.includes('cough') || name.includes('fever') || name.includes('खांसी') || name.includes('बुखार'))) {
        results.push(diseaseData['common-cold']);
    }
    
    if (symptomNames.some(name => name.includes('dizziness') || name.includes('headache') || name.includes('चक्कर') || name.includes('सिरदर्द'))) {
        results.push(diseaseData['hypertension']);
    }
    
    return results;
}

function displayAnalysisResults(results) {
    const container = document.getElementById('analysis-results');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="card">
                <p>${getLocalizedText('No specific conditions identified. Please consult a healthcare professional for a proper diagnosis.', 'कोई विशिष्ट स्थिति की पहचान नहीं हुई। उचित निदान के लिए कृपया एक स्वास्थ्य सेवा पेशेवर से सलाह लें।', 'কোনো নির্দিষ্ট অবস্থা চিহ্নিত হয়নি। সঠিক নির্ণয়ের জন্য একজন স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করুন।', 'குறிப்பிட்ட நிலைமைகள் எதுவும் அடையாளம் காணப்படவில்லை. சரியான நோயறிதலுக்கு ஒரு சுகாதார நிபुணரை அணுகவும்।')}</p>
            </div>
        `;
        return;
    }
    
    const title = document.createElement('h2');
    title.innerHTML = `<i class="fas fa-leaf"></i> ${getLocalizedText('Health Analysis & Ayurvedic Remedies', 'स्वास्थ्य विश्लेषण और आयुर्वेदिक उपचार', 'স্বাস্থ্য বিশ্লেষণ এবং আয়ুর্বেদিক প্রতিকার', 'சுகாதார பகுப्पाய्वు மற்றும் ஆयுர্வேத தীர்वुகள்')}`;
    container.appendChild(title);
    
    results.forEach(disease => {
        const card = createAnalysisCard(disease);
        container.appendChild(card);
    });
    
    // Add disclaimer
    const disclaimer = document.createElement('div');
    disclaimer.className = 'card';
    disclaimer.style.background = 'rgba(var(--ayurveda), 0.1)';
    disclaimer.style.border = '1px solid rgba(var(--ayurveda), 0.3)';
    disclaimer.innerHTML = `
        <p style="text-align: center; color: var(--ayurveda-foreground); font-weight: 600;">
            <strong>${getLocalizedText('Disclaimer:', 'अस्वीकरण:', 'দাবিত্যাগ:', 'மறுப்பு:')}</strong> 
            ${getLocalizedText('This analysis is for informational purposes only and should not replace professional medical advice.', 'यह विश्लेषण केवल सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का स्थान नहीं ले सकता।', 'এই বিশ্লেষণ শুধুমাত্র তথ্যগত উদ্দেশ্যে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প হতে পারে না।', 'இந்த பகுப्पाय्वু தகவल் நோक्कங்களுক्कु மात्रમே এবং পেশাদार চিকিৎসা পরামর্শের বিকল্প হতে পারে না।')}
        </p>
    `;
    container.appendChild(disclaimer);
}

function createAnalysisCard(disease) {
    const card = document.createElement('div');
    card.className = 'analysis-card';
    
    const severityIcon = disease.severity === 'mild' ? 'fa-check-circle' : 
                        disease.severity === 'moderate' ? 'fa-clock' : 'fa-exclamation-triangle';
    
    card.innerHTML = `
        <div class="analysis-header">
            <div class="analysis-title">
                <i class="fas ${severityIcon}"></i>
                ${disease.name[currentLanguage] || disease.name.en}
            </div>
            <div class="match-badge">${disease.probability}% Match</div>
        </div>
        <p style="margin-bottom: 1.5rem; color: var(--muted-foreground);">
            ${disease.description[currentLanguage] || disease.description.en}
        </p>
        
        <div class="remedies-section">
            <h4><i class="fas fa-leaf" style="margin-right: 0.5rem;"></i>${getLocalizedText('Ayurvedic Remedies:', 'आयुर्वेदिक उपचार:', 'আয়ুর্বেদিক প্রতিকার:', 'ஆயுர্वேत தீர্वுகள்:')}</h4>
            <ul class="remedies-list">
                ${(disease.ayurvedicRemedies[currentLanguage] || disease.ayurvedicRemedies.en).map(remedy => 
                    `<li><i class="fas fa-leaf"></i>${remedy}</li>`
                ).join('')}
            </ul>
        </div>
        
        <div class="precautions-section">
            <h4><i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>${getLocalizedText('Precautions:', 'सावधानियां:', 'সতর্কতা:', 'முன्னचेतावनियां:')}</h4>
            <ul class="precautions-list">
                ${(disease.precautions[currentLanguage] || disease.precautions.en).map(precaution => 
                    `<li><i class="fas fa-exclamation-triangle"></i>${precaution}</li>`
                ).join('')}
            </ul>
        </div>
        
        ${disease.severity === 'severe' ? `
            <div style="background: rgba(var(--emergency), 0.1); border: 1px solid rgba(var(--emergency), 0.3); border-radius: var(--radius); padding: 1rem; margin-top: 1rem;">
                <p style="color: var(--emergency); font-weight: 600;">
                    ⚠️ ${getLocalizedText('Important: These symptoms may require immediate medical attention.', 'महत्वपूर्ण: इन लक्षणों के लिए तत्काल चिकित्सा सहायता की आवश्यकता हो सकती है।', 'গুরুত্বপূর্ণ: এই লক্ষণগুলির জন্য তাৎক্ষণিক চিকিৎসা সহায়তার প্রয়োজন হতে পারে।', 'முக्यमानं: இந்த அறிகুறिகளுక্कு உடनडि चিকিৎসা সহায়তা தேবைপ्படलाম्।')}
                </p>
            </div>
        ` : ''}
    `;
    
    return card;
}

// Emergency functions
function callEmergency() {
    if (confirm(getLocalizedText('Call Emergency Services (108/112)?', 'आपातकालीन सेवाओं को कॉल करें (108/112)?', 'জরুরি সেবায় কল করুন (108/112)?', 'அவசர சेবைகளை அழைক्कवुम् (108/112)?'))) {
        window.open('tel:108');
        showToast(getLocalizedText('Calling Emergency Services...', 'आपातकालीन सेवाओं को कॉल कर रहे हैं...', 'জরুরি সেবায় কল করছি...', 'அवसர সেবைகளை अझைত্তु কোন্দিরুক্কিরোম্...'), 'success');
    }
}

function findHospitals() {
    const location = document.getElementById('location-input').value.trim();
    
    if (!location) {
        showToast(getLocalizedText('Please enter your location', 'कृपया अपना स्थान दर्ज करें', 'অনুগ্রহ করে আপনার অবস্থান লিখুন', 'தयवু செয়து উমার स्थानত্তै उল्লिडবुম্'), 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        displayHospitals(hospitalData);
        hideLoading();
        showToast(getLocalizedText('Hospitals found', 'अस्पताल मिले', 'হাসপাতাল পাওয়া গেছে', 'மருত্तুবমনैগळ् কান্ডুপিडিচ্চিনা'), 'success');
    }, 1500);
}

function displayHospitals(hospitals) {
    const container = document.getElementById('hospitals-list');
    container.innerHTML = '';
    
    if (hospitals.length === 0) {
        container.innerHTML = `<p>${getLocalizedText('No hospitals found nearby', 'आसपास कोई अस्पताल नहीं मिला', 'আশেপাশে কোনো হাসপাতাল পাওয়া যায়নি', 'আরুগিল् যাদুম् মারুত্তুবমানগল् কাન্ডুপিডিক্কবিल্লै')}</p>`;
        return;
    }
    
    hospitals.forEach(hospital => {
        const card = document.createElement('div');
        card.className = 'hospital-card';
        
        card.innerHTML = `
            <div class="hospital-header">
                <div class="hospital-info">
                    <h4>${hospital.name}</h4>
                    <div class="hospital-meta">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hospital.distance} • ${hospital.estimatedTime} away</span>
                    </div>
                    <p class="hospital-address">${hospital.address}</p>
                </div>
                <div class="hospital-badges">
                    <div class="hospital-badge">⭐ ${hospital.rating}</div>
                    ${hospital.emergency24h ? '<div class="hospital-badge"><i class="fas fa-clock"></i> 24/7</div>' : ''}
                </div>
            </div>
            
            <div class="hospital-specialties">
                ${hospital.specialty.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
            </div>
            
            <div class="hospital-actions">
                <button class="btn btn-primary" onclick="callHospital('${hospital.phone}', '${hospital.name}')">
                    <i class="fas fa-phone"></i>
                    ${getLocalizedText('Call Now', 'अभी कॉल करें', 'এখনই কল করুন', 'இप্পोळ् अল্यুङ्গল্')}
                </button>
                <button class="btn btn-secondary" onclick="getDirections('${hospital.address}')">
                    <i class="fas fa-directions"></i>
                    ${getLocalizedText('Directions', 'दिशाएं', 'দিক নির্দেশনা', 'দিশাগল्')}
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function callHospital(phone, name) {
    if (confirm(getLocalizedText(`Call ${name}?`, `${name} को कॉल करें?`, `${name} কে কল করুন?`, `${name}ऐ अल্যবুম्?`))) {
        window.open(`tel:${phone}`);
        showToast(getLocalizedText('Calling hospital...', 'अस्पताल को कॉल कर रहे हैं...', 'হাসপাতালে কল করছি...', 'মারুত্তুবমানত্তिলেক্কু ফোন् সেয়ুন্নু...'), 'success');
    }
}

function getDirections(address) {
    const url = `https://maps.google.com/search/${encodeURIComponent(address)}`;
    window.open(url, '_blank');
    showToast(getLocalizedText('Opening directions...', 'दिशाएं खोल रहे हैं...', 'দিক নির্দেশনা খুলছি...', 'দিশাগল् তिরक্কুন্নু...'), 'success');
}

// Voice recognition functions
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 
                         currentLanguage === 'bn' ? 'bn-BD' : 
                         currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
        
        recognition.onstart = () => {
            isListening = true;
            updateVoiceUI();
        };
        
        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            voiceTranscript = finalTranscript + interimTranscript;
            updateVoiceTranscript();
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            updateVoiceUI();
            showToast(getLocalizedText('Voice recognition error', 'वॉयस पहचान त्रुटि', 'ভয়েস চিনতে ত্রুটি', 'কুরাল् அরিয়াল् তপ্পু'), 'error');
        };
        
        recognition.onend = () => {
            isListening = false;
            updateVoiceUI();
        };
    }
}

function toggleVoiceRecognition() {
    if (!recognition) {
        showToast(getLocalizedText('Speech recognition not supported', 'वाक् पहचान समर्थित नहीं', 'বক্তৃতা চিনতে সমর্থিত নয়', 'পেচ্চু அরিয়াল् सपোর্ট্ট् সেয়ুন্নില্ল'), 'error');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        voiceTranscript = '';
        updateVoiceTranscript();
        recognition.start();
    }
}

function updateVoiceUI() {
    const button = document.getElementById('voice-btn');
    const icon = document.getElementById('voice-icon');
    const status = document.getElementById('voice-status');
    
    if (isListening) {
        button.classList.add('recording');
        icon.className = 'fas fa-microphone-slash';
        status.textContent = getLocalizedText('Listening... Click to stop', 'सुन रहे हैं... रोकने के लिए क्लिक करें', 'শুনছি... থামতে ক্লিক করুন', 'কেট্টুকোন্ডিরिक্কুन্নু... निরুত্তान् ক্লিক্ ছেয়ুক');
    } else {
        button.classList.remove('recording');
        icon.className = 'fas fa-microphone';
        status.textContent = getLocalizedText('Click to start speaking', 'बोलना शुरू करने के लিए क्लिक करें', 'কথা বলতে শুরু করতে ক্লিক করুন', 'পেচ্চা আরম্ভিক্কান् ক্লিক্ কোরুক');
    }
    
    document.getElementById('voice-analyze-btn').disabled = !voiceTranscript.trim();
}

function updateVoiceTranscript() {
    const container = document.getElementById('voice-transcript');
    container.textContent = voiceTranscript || '';
    updateVoiceUI();
}

async function analyzeVoiceInput() {
    if (!voiceTranscript.trim()) return;
    
    showLoading();
    
    try {
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const analysis = performVoiceAnalysis(voiceTranscript);
        displayVoiceAnalysis(analysis);
        
    } catch (error) {
        showToast(getLocalizedText('Error analyzing voice input', 'वॉयस इनपुट विश्लेषण में त्रुटि', 'ভয়েস ইনপুট বিশ্লেষণে ত্রুটি', 'ভোইস् इন্পুট্ বিশ্লेষণত্তিल् তপ্পু'), 'error');
    } finally {
        hideLoading();
    }
}

function performVoiceAnalysis(transcript) {
    const text = transcript.toLowerCase();
    
    let analysis = '';
    
    if (text.includes('सिरदर्द') || text.includes('headache') || text.includes('মাথাব্যথা') || text.includes('தলைবলি')) {
        analysis = getLocalizedText(
            'Based on your symptoms: Possible tension headache. Ayurvedic remedies: Apply peppermint oil on forehead, drink tulsi tea, take adequate rest.',
            'आपके लक्षणों के आधार पर: संभावित तनाव सिरदर्द। आयुर्वेदिक उपचार: माथे पर पुदीने का तेल लगाएं, तुलसी की चाय पिएं, पर्याप्त आराम करें।',
            'আপনার লক্ষণের ভিত্তিতে: সম্ভাব্য টেনশনের মাথাব্যথা। আয়ুর্বেদিক প্রতিকার: কপালে পুদিনা তেল লাগান, তুলসি চা পান করুন, পর্যাপ্ত বিশ্রাম নিন।',
            'உங্கল் অরিকুরিকলিন् আধারত্তিল্: সম্ভাবনাউল্ল तনাব তলைবলি। आয়ুর্ব্বেদিক উপায়গল্: নেত্রত্তিল् পুদিনা এণ্ণ তেক্কুক, তুলসী চা குডিക্कুক, মতিয়ায় আরাম এডুক্কুক।'
        );
    } else if (text.includes('खांसी') || text.includes('cough') || text.includes('কাশি') || text.includes('ইরুমल্')) {
        analysis = getLocalizedText(
            'Based on your symptoms: Possible common cold. Ayurvedic remedies: Honey and ginger mixture, warm water gargling, tulsi and black pepper tea.',
            'आपके लक्षणों के आधार पर: संभावित सामान्य सर्दी। आयुर्वेदिक उपचार: शहद और अदरक का मिश्रण, गुनगुने पानी से गरारे, तुलसी और काली मिर্च की चाय।',
            'আপনার লক্ষণের ভিত্তিতে: সম্ভাব্য সাধারণ সর্দি। আয়ুর্বেদিক প্রতিকার: মধু ও আদার মিশ্রণ, গরম পানি দিয়ে গার্গল, তুলসি ও কালো মরিচের চা।',
            'উমকল् অরিকুরিকলিন् আধারত্তিল্: সাধারণमায় বর্দী। আয়ুর্ব্বেদিক উপায়গল্: তেন্ মরিচ্চুন্নু সেরুমা, চুডু নীরিল් गारগল্ সেয়ুক, তুলসী করুপ্পু मিলাকু চা।'
        );
    } else {
        analysis = getLocalizedText(
            `Based on your input: "${transcript}". General advice: Drink plenty of water, get adequate rest, maintain balanced diet. For detailed examination, please consult a physician.`,
            `आपके द्वारा बताए गए लक्षण: "${transcript}"। सामान्य सलाह: पर्याप्त पानी पिएं, आराम करें, संतुलित आहार लें। विस्तृत जांच के लिए चिकित्सक से सलाह लें।`,
            `আপনার বর্ণিত লক্ষণ: "${transcript}"। সাধারণ পরামর্শ: পর্যাপ্ত পানি পান করুন, বিশ্রাম নিন, সুষম খাবার খান। বিস্তারিত পরীক্ষার জন্য চিকিৎসকের পরামর্শ নিন।`,
            `নিঙ্গল্ পরঞ্ঞ লক্ষণঙ্গল্: "${transcript}"। সাধারণ উপদেশম্: পোতুমানঅল্ল নীরম् কুডিক্কুক, আরাম এডুক্কুক, সমতুল্য আহারম্ কঝিক্কুক। বিস্তরীকরিচ্চ পরীক্ষিক্কান্ वैদ্যनোডु সলাহ চোদিক্কুক।`
        );
    }
    
    return analysis;
}

function displayVoiceAnalysis(analysis) {
    const container = document.getElementById('voice-analysis-results');
    
    container.innerHTML = `
        <div class="card" style="background: rgba(var(--wellness), 0.05); border: 1px solid rgba(var(--wellness), 0.3);">
            <h3 style="color: var(--wellness); margin-bottom: 1rem;">
                <i class="fas fa-brain"></i>
                ${getLocalizedText('Voice Analysis Results', 'वॉयस विश्लेषण परिणाम', 'ভয়েস বিশ্লেষণের ফলাফল', 'ভোইস বিশ্লেষণ ফলঙ্গল্')}
            </h3>
            <div style="white-space: pre-wrap; line-height: 1.6; font-size: 1rem;">
                ${analysis}
            </div>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(var(--secondary), 0.1); border: 1px solid rgba(var(--secondary), 0.3); border-radius: var(--radius);">
                <p style="color: var(--secondary-foreground); font-weight: 600;">
                    <strong>${getLocalizedText('Disclaimer:', 'अस्वीकरण:', 'দাবিত্যাগ:', 'অস্বীকরণম্:')}</strong> 
                    ${getLocalizedText('This information is for general guidance only. For serious symptoms, consult a healthcare professional immediately.', 'यह जानकारी केवल सामान्य मार्गदर्शन के लिए है। गंभीर लक्षणों के लिए तुरंत चिकित्सक से संपर্ककरें।', 'এই তথ্য শুধুমাত্র সাধারণ নির্দেশনার জন্য। গুরুতর লক্ষণের জন্য অবিলম্বে একজন চিকিৎসকের সাথে যোগাযোগ করুন।', 'ই তকবল্ কেবলম্ সাধারণ মার্গদর্শনত্তিনু বেন্দমানু। গুরুতরमায় লক্ষণঙ্গলুক্কু ওডনে ওরু বैদ্যনোডু যোগায়োগম্ কোল্লুক।')}
                </p>
            </div>
        </div>
    `;
}

// Yoga functions
function populateConditions() {
    const grid = document.getElementById('conditions-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    conditionsData.forEach(condition => {
        const button = document.createElement('button');
        button.className = 'condition-btn';
        button.textContent = condition.name[currentLanguage] || condition.name.en;
        button.onclick = () => toggleCondition(condition.id);
        grid.appendChild(button);
    });
}

function toggleCondition(conditionId) {
    const button = event.target;
    
    if (selectedConditions.includes(conditionId)) {
        selectedConditions = selectedConditions.filter(id => id !== conditionId);
        button.classList.remove('selected');
    } else {
        selectedConditions.push(conditionId);
        button.classList.add('selected');
    }
}

function getYogaRecommendations() {
    const age = document.getElementById('user-age').value;
    
    if (!age) {
        showToast(getLocalizedText('Please enter your age', 'कृपया अपनी उम्र दर्ज करें', 'অনুগ্রহ করে আপনার বয়স লিখুন', 'দয়া করে আপনার বয়স লিখুন'), 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const recommendations = filterYogaPoses(parseInt(age));
        displayYogaRecommendations(recommendations);
        hideLoading();
        showToast(getLocalizedText('Yoga recommendations generated', 'योग सिफारिशें तैयार की गईं', 'যোগ সুপারিশ তৈরি করা হয়েছে', 'যোগ परামর্শঙ্গল্ তয়ার् আক্কিয়িত্তু'), 'success');
    }, 1500);
}

function filterYogaPoses(age) {
    let filtered = [...yogaPoses];
    
    // Filter by age
    filtered = filtered.filter(pose => {
        if (age >= 80) return pose.ageGroup.includes('80+');
        if (age >= 70) return pose.ageGroup.includes('70+');
        if (age >= 60) return pose.ageGroup.includes('60+');
        return pose.ageGroup.includes('50+');
    });
    
    // Filter by health conditions
    if (selectedConditions.includes('arthritis') || selectedConditions.includes('back-pain')) {
        filtered = filtered.filter(pose => pose.difficulty === 'beginner');
    }
    
    return filtered;
}

function displayYogaRecommendations(poses) {
    const container = document.getElementById('yoga-recommendations');
    
    if (poses.length === 0) {
        container.innerHTML = `
            <div class="card">
                <p>${getLocalizedText('No specific yoga poses found for your profile. Please consult a yoga instructor.', 'आपकी प्रोफ़ाइल के लिए कोई विशिष्ट योग आसन नहीं मिला। कृपया योग प्रशिক্ষক से सলाह लें।', 'আপনার প্রোফাইলের জন্য কোনো নির্দিষ্ট যোগ আসন পাওয়া যায়নি। একজন যোগ প্রশিক্ষকের সাথে পরামর্শ করুন।', 'নিঙ্গলুদে প্রোফাইলিনু তকুন্ন বিশেষ যোগासনঙ্গল্ কাণ্ডেত্তান् পট্টিল্ল। অরু যোগ গুরুবিনোডু পরামর্শিক্কুক।')}</p>
            </div>
        `;
        return;
    }
    
    const title = document.createElement('h2');
    title.innerHTML = `<i class="fas fa-star"></i> ${getLocalizedText('Recommended Yoga Poses for You', 'आपके लिए अनुशंसित योग आसन', 'আপনার জন্য প্রস্তাবিত যোগ আসন', 'নিঙ্গলুক্কু পরামর্শিক্কুন্ন যোগাসনঙ্গল্')}`;
    container.innerHTML = '';
    container.appendChild(title);
    
    const grid = document.createElement('div');
    grid.className = 'yoga-grid';
    
    poses.forEach(pose => {
        const card = createYogaCard(pose);
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
}

function createYogaCard(pose) {
    const card = document.createElement('div');
    card.className = 'yoga-card';
    
    const difficultyColor = pose.difficulty === 'beginner' ? 'beginner' : 
                           pose.difficulty === 'intermediate' ? 'intermediate' : 'advanced';
    
    card.innerHTML = `
        <div class="yoga-header">
            <div>
                <div class="yoga-title">
                    ${pose.name[currentLanguage] || pose.name.en}
                </div>
                <div style="margin-top: 0.5rem;">
                    <span class="difficulty-badge ${difficultyColor}">
                        ${pose.difficulty}
                    </span>
                </div>
            </div>
            <div class="yoga-badges">
                <span class="duration-badge">
                    <i class="fas fa-clock"></i>
                    ${pose.duration}
                </span>
            </div>
        </div>
        
        <div class="yoga-benefits">
            <h4>${getLocalizedText('Benefits:', 'लाभ:', 'উপকারিতা:', 'উপকারঙ্গল্:')}</h4>
            <ul class="benefits-list">
                ${(pose.benefits[currentLanguage] || pose.benefits.en).map(benefit => 
                    `<li>${benefit}</li>`
                ).join('')}
            </ul>
        </div>
        
        <button class="btn btn-wellness" onclick="showYogaInstructions('${pose.id}')">
            <i class="fas fa-play"></i>
            ${getLocalizedText('Start This Pose', 'इस आसन को शुरू करें', 'এই আসনটি শুরু করুন', 'ই আসনম् আরম্ভিক্কুক')}
        </button>
    `;
    
    return card;
}

function showYogaInstructions(poseId) {
    const pose = yogaPoses.find(p => p.id === poseId);
    if (!pose) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 1rem;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card); border-radius: var(--radius); max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: var(--primary); margin: 0;">
                    ${pose.name[currentLanguage] || pose.name.en}
                </h2>
                <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--muted-foreground);">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <h3 style="color: var(--primary); margin-bottom: 1rem;">
                ${getLocalizedText('Step-by-Step Instructions:', 'चरण-दर-चरण निर्देश:', 'ধাপে ধাপে নির্দেশাবলী:', 'പടിপडি निर্দেশঙ্গল্:')}
            </h3>
            <ol style="padding-left: 1.5rem; margin-bottom: 1.5rem;">
                ${(pose.instructions[currentLanguage] || pose.instructions.en).map(instruction => 
                    `<li style="margin-bottom: 0.5rem; line-height: 1.6;">${instruction}</li>`
                ).join('')}
            </ol>
            
            <div style="background: rgba(var(--wellness), 0.1); padding: 1rem; border-radius: var(--radius); margin-top: 1rem;">
                <p style="color: var(--wellness-foreground); font-weight: 600; margin: 0;">
                    <strong>${getLocalizedText('Remember:', 'याद रखें:', 'মনে রাখবেন:', 'অরিবিল্ বেক্কিরিক্কুক:')}</strong> 
                    ${getLocalizedText('Listen to your body. Stop if you feel pain or discomfort.', 'अपने शरीर की सुनें। दर्द या असुविधা महसूस होने पर रुकें।', 'আপনার শরীরের কথা শুনুন। ব্যথা বা অস্বস্তি অনুভব করলে থামুন।', 'নিঙ্গলুদে শরীরम् কেল্ক্কুক। বেদন অল্লেঙ্কিল অসবস্তত তোন্নুমপোল্ নিরুত্তুক।')}
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Medicine reminder functions
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

function showAddMedicineForm() {
    document.getElementById('add-medicine-form').classList.remove('hidden');
}

function hideAddMedicineForm() {
    document.getElementById('add-medicine-form').classList.add('hidden');
    clearMedicineForm();
}

function clearMedicineForm() {
    document.getElementById('medicine-name').value = '';
    document.getElementById('medicine-dosage').value = '';
    document.getElementById('medicine-time').value = '';
    document.getElementById('medicine-instructions').value = '';
}

function addMedicine() {
    const name = document.getElementById('medicine-name').value.trim();
    const dosage = document.getElementById('medicine-dosage').value.trim();
    const time = document.getElementById('medicine-time').value;
    const instructions = document.getElementById('medicine-instructions').value.trim();
    
    if (!name || !dosage || !time) {
        showToast(getLocalizedText('Please fill in all required fields', 'कृपया सभी आवश्यक फ़ील्ड भरें', 'অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন', 'দয়া সেয়তু এল্লা আবশ্যকമায় ফील্ডুগলুম্ পূরিপ্পিক্কুক'), 'warning');
        return;
    }
    
    const medicine = {
        id: Date.now().toString(),
        name,
        dosage,
        time,
        instructions: instructions || '',
        taken: false,
        color: getRandomColor()
    };
    
    medicines.push(medicine);
    saveMedicines();
    displayMedicines();
    hideAddMedicineForm();
    showToast(getLocalizedText('Medicine added successfully', 'दवा सफलतापूर्वक जोड़ी गई', 'ওষুধ সফলভাবে যোগ করা হয়েছে', 'মারুন্নु বিজয়করমায়ি চের্ত্তিরিক্কুন্নু'), 'success');
}

function getRandomColor() {
    const colors = ['#22c55e', '#3b82f6', '#fb923c', '#a855f7', '#ec4899', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function saveMedicines() {
    localStorage.setItem('health-medicines', JSON.stringify(medicines));
}

function loadMedicines() {
    const saved = localStorage.getItem('health-medicines');
    if (saved) {
        medicines = JSON.parse(saved);
        displayMedicines();
    }
}

function displayMedicines() {
    const container = document.getElementById('medicine-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (medicines.length === 0) {
        container.innerHTML = `
            <div class="card text-center" style="padding: 3rem;">
                <i class="fas fa-pills" style="font-size: 4rem; color: var(--muted-foreground); margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 1rem;">${getLocalizedText('No medicines added yet', 'अभी तक कोई दवा नहीं जोड़ी गई', 'এখনও কোনো ওষুধ যোগ করা হয়নি', 'ইন্নুম্ অরু মারুন্নুম্ চের্ত্তিত্তিট্টিল্ল')}</h3>
                <p style="color: var(--muted-foreground); margin-bottom: 2rem;">
                    ${getLocalizedText('Add your first medicine to start getting reminders', 'रिमाइंडर पाना शुरू करने के लिए अपनी पहली दवा जोड़ें', 'অনুস্মারক পেতে শুরু করতে আপনার প্রথম ওষুধ যোগ করুন', 'অনুস্মারক কিট্টান् আরম্ভিক্কান् নিঙ্গলুদে প্রতমমায় মারুন্নু চের্ত্তুক')}
                </p>
                <button class="btn btn-primary" onclick="showAddMedicineForm()">
                    <i class="fas fa-plus"></i>
                    ${getLocalizedText('Add Your First Medicine', 'अपनी पहली दवा जोड़ें', 'আপনার প্রথম ওষুধ যোগ করুন', 'নিঙ্গলুদে প্রতমমায় মারুন্নু চের্ত্তুক')}
                </button>
            </div>
        `;
        return;
    }
    
    medicines.forEach(medicine => {
        const card = createMedicineCard(medicine);
        container.appendChild(card);
    });
}

function createMedicineCard(medicine) {
    const card = document.createElement('div');
    card.className = 'medicine-card';
    
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const isOverdue = medicine.time < currentTime && !medicine.taken;
    const isDue = Math.abs(new Date(`2000-01-01 ${medicine.time}`).getTime() - new Date(`2000-01-01 ${currentTime}`).getTime()) < 300000; // 5 minutes
    
    let statusClass = '';
    let statusText = '';
    
    if (medicine.taken) {
        statusClass = 'taken';
        statusText = getLocalizedText('Taken', 'लिया गया', 'নেওয়া হয়েছে', 'এডুত্তিরিক্কুন্নু');
    } else if (isDue) {
        statusClass = 'due';
        statusText = getLocalizedText('Due Now!', 'अभी लेना है!', 'এখনই নিতে হবে!', 'ইপ্পোল্ এডুক্কণম্!');
    } else if (isOverdue) {
        statusClass = 'overdue';
        statusText = getLocalizedText('Overdue', 'समय बीत गया', 'সময় পেরিয়ে গেছে', 'সময়ম् কঝিঞ্ঞিরিক্কুন্নু');
    } else {
        statusText = getLocalizedText('Scheduled', 'निर्धारित', 'নির্ধারিত', 'निয়োগিচ্চিরিক্কুন্নু');
    }
    
    card.innerHTML = `
        <div class="medicine-header">
            <div class="medicine-info">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <div class="medicine-color" style="background-color: ${medicine.color};"></div>
                    <h4>${medicine.name}</h4>
                </div>
                <p class="medicine-dosage">${medicine.dosage}</p>
                ${medicine.instructions ? `<p class="medicine-instructions">📝 ${medicine.instructions}</p>` : ''}
            </div>
            <div style="text-align: right;">
                <span class="medicine-badge ${statusClass}" style="padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.875rem;">
                    ${statusText}
                </span>
            </div>
        </div>
        
        <div class="medicine-times">
            <div class="medicine-time">
                <div class="time-info">
                    <i class="fas fa-clock"></i>
                    <span style="font-weight: 600;">${medicine.time}</span>
                </div>
                <div class="medicine-actions">
                    <button class="btn ${medicine.taken ? 'btn-wellness' : 'btn-primary'}" onclick="toggleMedicineTaken('${medicine.id}')">
                        <i class="fas ${medicine.taken ? 'fa-check-circle' : 'fa-circle'}"></i>
                        ${medicine.taken ? getLocalizedText('Taken', 'लिया गया', 'নেওয়া হয়েছে', 'এডুত্তিরিক্কুন্নু') : getLocalizedText('Mark', 'चिह्नित करें', 'চিহ্নিত করুন', 'চিহ্নিক্কুক')}
                    </button>
                    <button class="btn btn-secondary" onclick="deleteMedicine('${medicine.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for status badges
    const style = document.createElement('style');
    style.textContent = `
        .medicine-badge.taken { background: rgba(var(--wellness), 0.2); color: var(--wellness); }
        .medicine-badge.due { background: rgba(var(--emergency), 0.2); color: var(--emergency); animation: pulse 2s infinite; }
        .medicine-badge.overdue { background: rgba(var(--secondary), 0.2); color: var(--secondary); }
        .medicine-badge { background: rgba(var(--muted), 0.5); color: var(--muted-foreground); }
    `;
    if (!document.querySelector('#medicine-styles')) {
        style.id = 'medicine-styles';
        document.head.appendChild(style);
    }
    
    return card;
}

function toggleMedicineTaken(medicineId) {
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine) {
        medicine.taken = !medicine.taken;
        saveMedicines();
        displayMedicines();
        
        const message = medicine.taken ? 
            getLocalizedText('Medicine marked as taken', 'दवा को लिया गया के रूप में चिह্নित किया गया', 'ওষুধকে নেওয়া হয়েছে হিসেবে চিহ্নিত করা হয়েছে', 'মারুন্নু এডুত্তু এন্নু চিহ্নিত্তু') :
            getLocalizedText('Medicine marked as not taken', 'दवा को नहीं लिया गया के रूप में चিह্নित किया गया', 'ওষুধকে নেওয়া হয়নি হিসেবে চিহ্নিত করা হয়েছে', 'মারুন্নু এডুক্কাত্তত् এন্নু চিহ্নিত্তু');
        
        showToast(message, 'success');
    }
}

function deleteMedicine(medicineId) {
    if (confirm(getLocalizedText('Delete this medicine?', 'इस दवा को हटाएं?', 'এই ওষুধটি মুছে দিবেন?', 'ই মারুন্নু निकाঃিক্কণমো?'))) {
        medicines = medicines.filter(m => m.id !== medicineId);
        saveMedicines();
        displayMedicines();
        showToast(getLocalizedText('Medicine deleted', 'दवा हटा दी गई', 'ওষুধ মুছে দেওয়া হয়েছে', 'মারুন্নু निकাল্লিকল्याঞ্ঞু'), 'success');
    }
}

// Utility functions
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const languageSelector = document.querySelector('.language-selector');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageSelector && !languageSelector.contains(event.target)) {
        languageMenu.classList.add('hidden');
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals or menus
        document.getElementById('language-menu').classList.add('hidden');
        
        // Remove any modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.remove());
    }
});

// Initialize speech recognition when voice section is shown
function initVoiceWhenShown() {
    const voiceSection = document.getElementById('voice');
    if (voiceSection && voiceSection.classList.contains('active')) {
        initializeVoiceRecognition();
    }
}

// Call when showing voice section
const originalShowFeature = showFeature;
showFeature = function(featureId) {
    originalShowFeature(featureId);
    if (featureId === 'voice') {
        setTimeout(initVoiceWhenShown, 100);
    }
};