let currentLang = 'dhad';

// القوالب الافتراضية المحدثة لعرض قوة القاموس الجديد
const templates = {
    dhad: 'عرف الاسم = أدخل("ما هو اسمك؟");\n\nاكتب("مرحباً بك يا " + الاسم + " في لغة الضاد! ✨");\n\nعرف العدد = 10;\nإذا (العدد > 5 و صحيح) {\n    اكتب("تم التحقق من الشروط بنجاح 🚀");\n}',
    python: 'number = 10\nif (number > 5):\n    print("Number is greater than 5")',
    javascript: 'console.log("Hello from JavaScript! ⚡");\n\nlet num = 10;\nif(num > 5) {\n    console.log("Number is greater than 5");\n}',
    web: '<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { background: #11111b; color: white; text-align: center; padding-top: 50px; }\n  h1 { color: #00adb5; font-family: sans-serif; }\n</style>\n</head>\n<body>\n  <h1>صفحة ويب مخصصة ومتكاملة! 🌐</h1>\n</body>\n</html>'
};

document.getElementById('code-editor').value = templates.dhad;

function switchLanguage(lang, event) {
    currentLang = lang;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    const label = document.getElementById('editor-label');
    const textOut = document.getElementById('output-text');
    const frameOut = document.getElementById('output-frame');
    document.getElementById('code-editor').value = templates[lang];
    textOut.innerText = "النتيجة ستظهر هنا بعد الضغط على تشغيل الكود...";
    if (lang === 'web') {
        label.innerText = '✍️ اكتب أكواد HTML و CSS هنا:';
        textOut.style.display = 'none';
        frameOut.style.display = 'block';
        frameOut.srcdoc = "";
    } else {
        label.innerText = `✍️ اكتب كود "${lang.toUpperCase()}" هنا:`;
        textOut.style.display = 'block';
        frameOut.style.display = 'none';
    }
}

// المفسر والمترجم الخارق والمطور للغة الضاد الشاملة
function translateDhadToJS(arabicCode) {
    let code = arabicCode;

    // 1. الأوامر الأساسية والشروط والتكرار
    code = code.replace(/اكتب\(/g, 'console.log(');
    code = code.replace(/إذا /g, 'if ');
    code = code.replace(/وإلا إذا /g, 'else if ');
    code = code.replace(/وإلا /g, 'else ');
    code = code.replace(/طالما /g, 'while ');
    code = code.replace(/لكل /g, 'for ');
    code = code.replace(/كرر /g, 'for ');

    // 2. تعريف المتغيرات والثوابت والدوال
    code = code.replace(/عرف /g, 'let ');
    code = code.replace(/متغير /g, 'let ');
    code = code.replace(/ثابت /g, 'const ');
    code = code.replace(/دالة /g, 'function ');
    code = code.replace(/أرجع /g, 'return ');

    // 3. استقبال البيانات والقيم المنطقية
    code = code.replace(/أدخل\(/g, 'prompt(');
    code = code.replace(/صحيح/g, 'true');
    code = code.replace(/خطأ_منطقي/g, 'false');

    // 4. الروابط والعمليات المنطقية (مع مراعاة المسافات)
    code = code.replace(/ و /g, ' && ');
    code = code.replace(/ أو /g, ' || ');

    return code;
}

// مفسر بايثون الداخلي
function translatePythonToJS(pythonCode) {
    let lines = pythonCode.split('\n');
    let translatedLines = [];
    for (let line of lines) {
        let newLine = line;
        newLine = newLine.replace(/print\(/g, 'console.log(');
        newLine = newLine.replace(/if /g, 'if ');
        newLine = newLine.replace(/elif /g, 'else if ');
        newLine = newLine.replace(/else:/g, 'else');
        newLine = newLine.replace(/while /g, 'while ');
        if (newLine.trim().endsWith(':')) {
            newLine = newLine.substring(0, newLine.lastIndexOf(':'));
        }
        translatedLines.push(newLine);
    }
    return translatedLines.join('\n');
}

function processExecution() {
    const code = document.getElementById('code-editor').value;
    const textOut = document.getElementById('output-text');
    const frameOut = document.getElementById('output-frame');
    
    if (!code.trim()) { alert("يرجى كتابة الكود أولاً!"); return; }
    if (currentLang === 'web') { frameOut.srcdoc = code; return; }

    textOut.innerText = "";
    let logs = [];
    const originalLog = console.log;
    console.log = (msg) => logs.push(msg);

    try {
        let jsFinalCode = "";

        if (currentLang === 'javascript') {
            jsFinalCode = code;
        } 
        else if (currentLang === 'dhad') {
            jsFinalCode = translateDhadToJS(code);
        }
        else if (currentLang === 'python') {
            jsFinalCode = translatePythonToJS(code);
        }

        // تشغيل الكود المترجم كاملاً
        new Function(jsFinalCode)();
        console.log = originalLog;
        textOut.style.color = "#a6e22e";
        textOut.innerText = logs.length ? logs.join('\n') : "تم تنفيذ الشفرة بنجاح داخلياً ⚡";

    } catch (err) {
        console.log = originalLog;
        textOut.style.color = "#ff2e63";
        textOut.innerText = `🚨 خطأ في تشغيل الشفرة البرمجية:\n${err.message}`;
    }
}
