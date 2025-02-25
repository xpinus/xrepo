function copyToClipboard(textToCopy) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard 向剪贴板写文本
            navigator.clipboard.writeText(textToCopy).then(() => resolve());
        } else {
            // 创建text area
            let textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            // 使text area不在viewport，同时设置不可见
            textArea.style.position = 'absolute';
            textArea.style.opacity = 0;
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            resolve();
        }
    });
}
