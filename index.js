import emojiMap from './emojimap.json' with { type: 'json' };
const shortcodeRegex = /:[a-z0-9_+-]+:/g;
document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById('displayInput');
    const hiddenInput = document.getElementById('hiddenInput');
    const copyBtn = document.getElementById('copyBtn');

    displayArea.addEventListener('click', focusHidden);
    hiddenInput.addEventListener('paste', handlePaste);
    copyBtn.addEventListener('click', handleCopy);
});

function focusHidden() {
    const hidden = document.getElementById('hiddenInput');
    const display = document.getElementById('displayInput');
    hidden.focus();
    display.style.borderColor = "#4A154B";
}

function handlePaste(event) {
    document.getElementById('hiddenInput').value = "";
    setTimeout(() => {
        const hiddenVal = document.getElementById('hiddenInput').value;
        // 숨겨진 값을 보이는 창에도 동기화 (사용자 확인용)
        document.getElementById('displayInput').value = hiddenVal;
        handleConvert();
    }, 100);
}

function handleConvert() {
    const inputVal = document.getElementById('hiddenInput').value;
    const outputArea = document.getElementById('output');

    if (!inputVal.trim()) return;

    outputArea.value = inputVal.replace(shortcodeRegex, (match) => {
        return emojiMap[match] || match;
    });
}
function handleCopy() {
    const outputArea = document.getElementById('output');
    
    navigator.clipboard.writeText(outputArea.value).then(() => {
        showToast();
    }).catch(err => {
        // 구형 브라우저 대응용 (선택 사항)
        outputArea.select();
        document.execCommand('copy');
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById("toast");
    
    // 클래스 추가
    toast.classList.add("show");
    
    // 3초(3000ms) 후에 다시 제거
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}