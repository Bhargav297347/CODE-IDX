document.addEventListener('DOMContentLoaded', () => {
    let editorInstance = null;
    const previewIframe = document.getElementById('preview-iframe');
    const terminalContent = document.querySelector('#terminal .terminal-content');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const previewBox = document.getElementById('preview-box');
    const previewArea = document.getElementById('preview-area');
    const terminalDiv = document.getElementById('terminal');
    const openFilesButton = document.getElementById('open-files');
    const LIVE = document.getElementById("live");
    let currentMode = 'html';
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    const PYTHON_TERMINAL = document.getElementById('python-terminal');
    const PREVIEW_SIZE = document.getElementById('preview-size');
    const editorToggleButton = document.getElementById('editor-toggle-btn');
    const previewToggleButton = document.getElementById('preview-toggle-btn');

    function showEditor() {
        editorPane.style.display = 'flex';
        previewPane.style.display = 'none';
        editorToggleButton.classList.add('active');
        previewToggleButton.classList.remove('active');
    }

    function showPreview() {
        editorPane.style.display = 'none';
        previewPane.style.display = 'flex';
        previewToggleButton.classList.add('active');
        editorToggleButton.classList.remove('active');
    }

    if (window.innerWidth <= 768) { 
        editorToggleButton.addEventListener('click', showEditor);
        previewToggleButton.addEventListener('click', showPreview);
    } else {

        editorPane.style.display = 'flex';
        previewPane.style.display = 'flex';
    }
    function updateSizeInputs() {
        widthInput.value = previewBox.offsetWidth;
        heightInput.value = previewBox.offsetHeight;
    }
    function logToTerminal(message, type = 'log') {
        if (!terminalContent) return;
        const entry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        const safeMessage = String(message).replace(/</g, "<").replace(/>/g, ">");
        entry.innerHTML = `[<span style="color:#6b7280;">${timestamp}</span>] ${safeMessage}`;
        entry.classList.add(`terminal-entry-${type}`);
        switch (type) {
            case 'error': entry.style.color = '#e06c75'; break;
            case 'warn': entry.style.color = '#e5c07b'; break;
            case 'info': entry.style.color = '#61afef'; break;
            default: entry.style.color = '#abb2bf';
        }
        terminalContent.appendChild(entry);
        terminalContent.scrollTo({ top: terminalContent.scrollHeight, behavior: 'smooth' });
    }
    editorInstance = ace.edit('editor-container');
    editorInstance = ace.edit('editor-container');
    editorInstance.session.setMode('ace/mode/html'); 
    ace.define('ace/theme/myCustomTheme', ['require', 'exports', 'module' ], function(require, exports, module) {
        exports.isDark = false; 
        exports.cssClass = "ace-myCustomTheme"; 
        exports.cssText = `
        .${exports.cssClass} .ace_gutter {
          background: #fcfdff; 
          color: #aaaaaa;       
        }
        .${exports.cssClass} .ace_print-margin {
          width: 1px;
          background: #e8e8e8; 
        }
        .${exports.cssClass} { 
          background-color: #fcfdff; 
          color: #333333;        
        }
        .${exports.cssClass} .ace_cursor {
          color: #333333; 
        }
        .${exports.cssClass} .ace_marker-layer .ace_selection {
          background: #ADD6FF; 
        }
        .${exports.cssClass}.ace_multiselect .ace_selection.ace_start {
          box-shadow: 0 0 3px 0px #fcfdff; 
        }
        .${exports.cssClass} .ace_marker-layer .ace_step {
          background: rgb(198, 219, 174); 
        }
        .${exports.cssClass} .ace_marker-layer .ace_bracket {
          margin: -1px 0 0 -1px;
          border: 1px solid #BFBFBF; 
        }
        .${exports.cssClass} .ace_marker-layer .ace_active-line {
          background: #edf2f7; 
        }
        .${exports.cssClass} .ace_gutter-active-line {
          background-color: #e1e8f0; 
        }
        .${exports.cssClass} .ace_marker-layer .ace_selected-word {
          border: 1px solid #ADD6FF; 
        }
        .${exports.cssClass} .ace_invisible {
          color: #dddddd; 
        }
        .${exports.cssClass} .ace_tag { 
            color: #1155cc; 
        }
        .${exports.cssClass} .ace_entity.ace_other.ace_attribute-name { 
            color: #669900; 
        }
        .${exports.cssClass} .ace_string { 
            color: #cc3300; 
        }
        .${exports.cssClass} .ace_comment { 
            color: #aaaaaa; 
        }
        .${exports.cssClass} .ace_punctuation.ace_tag {
            color: #333333; 
        }
        .${exports.cssClass} .ace_meta.ace_tag.ace_css { 
            color: #1155cc; 
        }
        .${exports.cssClass} .ace_support.ace_type.ace_property-name.ace_css { 
            color: #669900; 
        }
        .${exports.cssClass} .ace_support.ace_constant.ace_property-value.ace_css, 
        .${exports.cssClass} .ace_constant.ace_numeric.ace_css { 
            color: #cc3300; 
        }
        .${exports.cssClass} .ace_keyword.ace_other.ace_unit.ace_css { 
             color: #cc3300; 
        }
        .${exports.cssClass} .ace_keyword.ace_important.ace_css { 
             color: #0055aa; 
             font-weight: bold;
        }
        .${exports.cssClass} .ace_keyword { 
            color: #0055aa; 
            font-weight: bold;
        }
        .${exports.cssClass} .ace_constant.ace_numeric { 
            color: #339933; 
        }

        .${exports.cssClass} .ace_variable.ace_parameter { 

            color: #7a7a7a; 
        }
        .${exports.cssClass} .ace_entity.ace_name.ace_function { 
            color: #61afef; 
        }
        .${exports.cssClass} .ace_storage.ace_type { 
            color: #0055aa; 
            font-weight: bold;
        }
        .${exports.cssClass} .ace_support.ace_function { 
            color: #61afef; 
        }
        .${exports.cssClass} .ace_operator { 
             color: #0055aa; 
        }
        .${exports.cssClass} .ace_punctuation.ace_definition.ace_comment {

            color: #aaaaaa; 
        }
        `;
        }); 
            editorInstance.setTheme('ace/theme/myCustomTheme');
         HTML_THEME = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - CODE EDITOR</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <style>
        :root {
            font-family: 'Inter', sans-serif;
        }
        body {
            background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
            color: #E2E8F0;
            overflow-x: hidden;
            margin: 0;
        }
        #particle-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
            pointer-events: none;
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-25px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }
        .delay-4 { animation-delay: 0.7s; }
        .delay-5 { animation-delay: 0.9s; }
        .cursor {
            display: inline-block;
            width: 2px;
            height: 1.1em;
            background: #CBD5E0;
            margin-left: 4px;
            vertical-align: text-bottom;
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        code.button-name {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background-color: #2D3748;
            color: #F9FAFB;
            padding: 0.25em 0.5em;
            border-radius: 8px;
            font-size: 0.95em;
            margin: 0 0.2em;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .secondary-link {
             color: #94A3B8;
             transition: color 0.2s ease-in-out;
        }
        .secondary-link:hover {
            color: #CBD5E0;
            text-decoration: underline;
        }
        .cta-button {
            background: linear-gradient(135deg, #6366F1 0%, #3B82F6 100%);
            color: #F9FAFB;
            padding: 0.8rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
        }
        .cta-button:active {
            transform: translateY(0);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .cta-button:focus {
            outline: none;
            ring-offset-width: 2px;
            ring-color: #A5B4FC;
            ring-opacity: 70%;
        }
        .instructions-block {
            background-color: rgba(30, 41, 59, 0.85);
            backdrop-filter: blur(10px);
            border-color: #4B5563;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            border-width: 1px;
        }
        footer {
            color: #7E8897;
            opacity: 0.8;
        }
        header h1 {
            font-size: 3.75rem;
            line-height: 1;
            letter-spacing: -0.05em;
            font-weight: 800;
        }
        header p {
            font-size: 1.25rem;
            font-weight: 300;
            color: #A3AAB4;
        }
    </style>
</head>
<body class="bg-[#0F172A] text-gray-300 flex flex-col items-center justify-center min-h-screen px-6 py-12 relative">
    <canvas id="particle-canvas"></canvas>
    <div class="text-center max-w-2xl w-full">
        <header class="animate-fade-in-down mb-10">
            <h1 class="text-4xl sm:text-4xl font-extrabold tracking-tight mb-6 text-white">
                Welcome to <span class="text-indigo-400">CODE IDX</span>.
            </h1>
            <p class="text-lg md:text-xl text-gray-400 font-light">
                Unleash your coding potential with a browser-based editor that's fast, flexible, and shareable.
            </p>
        </header>
        <div class="mb-12 h-8 flex items-center justify-center animate-fade-in-up delay-1">
            <p class="text-lg md:text-xl text-gray-400">
                Start to <span id="action-typing" class="font-medium text-gray-200 whitespace-nowrap"></span><span class="cursor" id="action-cursor"></span>
            </p>
        </div>
        <div class="instructions-block text-left bg-gray-900/70 p-10 rounded-xl border border-gray-700/60 animate-fade-in-up delay-3 mb-16 shadow-sm">
            <h2 class="text-2xl font-semibold text-white mb-6 text-center sm:text-left">Quick Start Guide</h2>
            <ul class="space-y-5 text-gray-300">
                <li class="flex items-start gap-4">
                    <span class="text-indigo-500 mt-1.5 shrink-0">→</span>
                    <span>Begin coding instantly by clicking the <code class="button-name">Clear</code> button above. This will clear the boilerplate and present you with a fresh canvas for your code.</span>
                </li>
                <li class="flex items-start gap-4">
                     <span class="text-indigo-500 mt-1.5 shrink-0">→</span>
                    <span>Experiencing preview glitches? Select <code class="button-name">Hard Reset</code> for a robust refresh, clearing any persistent issues and ensuring a clean preview.</span>
                </li>
                <li class="flex items-start gap-4">
                     <span class="text-indigo-500 mt-1.5 shrink-0">→</span>
                    <span>Share your creations effortlessly using the <code class="button-name">New Tab</code> button. Generate a unique, shareable link to showcase your code in a dedicated browser tab.</span>
                </li>
                <li class="flex items-start gap-4">
                    <span class="text-indigo-500 mt-1.5 shrink-0">→</span>
                    <span> Change your language seemlessly by clicking the <code class="button-name"> Switch</code> button at the top of your editor.</span>
            </ul>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in-up delay-4 mb-20">
            <a href="#documentation" target="_blank" rel="noopener noreferrer" id="documentation-link" class="cta-button">
                Explore Documentation
            </a>
            <a href="#github-repo" target="_blank" rel="noopener noreferrer" id="github-link" class="secondary-link underline">
                 Github
            </a>
        </div>
         <footer class="mt-24 text-center text-sm text-gray-100 animate-fade-in-up delay-5">
            Crafted by Bhargav ✨
         </footer>
    </div>
    <script>
        const actionPhrases = ["write code.", "build projects.", "test ideas.", "share creativity.", "learn.", "experiment.", "innovate."];
        const typeSpeed = 65;
        const eraseSpeed = 30;
        const phrasePause = 2200;
        const initialDelay = 400;
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        const numParticles = 80;
        const particleColor = 'rgba(156, 163, 175, 0.4)';
        const lineColor = 'rgba(156, 163, 175, 0.2)';
        const maxLineDistance = 120;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 2;
                this.vx = (Math.random() - 0.5);
                this.vy = (Math.random() - 0.5);
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        function initParticles() {
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        }
        function drawLines() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxLineDistance) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            drawLines();
            requestAnimationFrame(animateParticles);
        }
        function setupTypingAnimation(elementId, cursorId, phrases) {
             const typingElement = document.getElementById(elementId);
            const cursorElement = document.getElementById(cursorId);
            if (!typingElement || !cursorElement) {
                console.error("Typing elements not found for:", elementId);
                return;
            }
            let phraseIndex = 0;
            let charIndex = 0;
            let isErasing = false;
            let typeTimeout, eraseTimeout;
            function type() {
                isErasing = false;
                cursorElement.style.animation = 'blink 1s infinite';
                if (charIndex < phrases[phraseIndex].length) {
                    typingElement.textContent += phrases[phraseIndex][charIndex];
                    charIndex++;
                    typeTimeout = setTimeout(type, typeSpeed);
                } else {
                    eraseTimeout = setTimeout(erase, phrasePause);
                }
            }
            function erase() {
                isErasing = true;
                if (charIndex > 0) {
                    typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
                    charIndex--;
                    eraseTimeout = setTimeout(erase, eraseSpeed);
                } else {
                    isErasing = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeTimeout = setTimeout(type, typeSpeed / 2);
                }
            }
             setTimeout(type, initialDelay);
            return () => {
                clearTimeout(typeTimeout);
                clearTimeout(eraseTimeout);
            };
        }
        document.addEventListener('DOMContentLoaded', () => {
            const docLink = document.getElementById('documentation-link');
            const githubLink = document.getElementById('github-link');
            const documentationUrl = "https://github.com/Bhargavxyz738/CODE-IDE/blob/main/README.md";
            const githubRepoUrl = "https://github.com/bhargavxyz738";

            if (docLink) docLink.href = documentationUrl;
            if (githubLink) githubLink.href = githubRepoUrl;

            const cleanupAction = setupTypingAnimation('action-typing', 'action-cursor', actionPhrases);
            window.addEventListener('beforeunload', () => {
                cleanupHeader();
                cleanupAction();
            });
            initParticles();
            animateParticles();
        });
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    <\/script>

</body>
</html>`    
            editorInstance.setOptions({
                showPrintMargin: false, 
                vScrollBarAlwaysVisible: true, 
                hScrollBarAlwaysVisible: true, 
                showLineNumbers: true, 
                wrap: 'off', 
                highlightActiveLine: true, 
                scrollPastEnd: 0.5, 
                fontSize: 14,
                enableBasicAutocompletion: true, 
                enableLiveAutocompletion: true, 
                enableSnippets: true, 
                behavioursEnabled: true, 
                tabSize: 4, 
                useSoftTabs: true 
            });
            editorInstance.setValue(HTML_THEME);
            triggerInitialPreview();

            let debounceTimer;
            editorInstance.session.on('change', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(updatePreview, 500);
            });
            function updatePreview() {
                if (!editorInstance) {
                     logToTerminal("Editor not ready for update.", "warn");
                     return;
                };
                 if (!previewIframe) {
                     logToTerminal("Preview iframe not found.", "error");
                     return;
                 }
                const code = editorInstance.getValue();
                try {

previewIframe.srcdoc = code;
                logToTerminal("Inline preview refreshed.", "info");
            } catch (e) {
                console.error("Error updating preview:", e);
                logToTerminal(`Error updating preview: ${e.message}`, "error");
            }
        }
        const copyAllBtn = document.getElementById('copy-all-btn');
        const clearAllBtn = document.getElementById('clear-all-btn');
        const openFilesBtn = document.getElementById('open-files');
        copyAllBtn?.addEventListener('click', () => {
            if (!editorInstance) return;
            const code = editorInstance.getValue();
            navigator.clipboard.writeText(code).then(() => {
                const originalTextEl = copyAllBtn.querySelector('span');
                const originalText = originalTextEl.textContent;
                originalTextEl.textContent = 'Copied!';
                copyAllBtn.disabled = true;
                logToTerminal("Code copied to clipboard.");
                setTimeout(() => {
                    originalTextEl.textContent = originalText;
                    copyAllBtn.disabled = false;
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                logToTerminal('Failed to copy code to clipboard.', 'error');
                alert('Failed to copy code. See browser console for details.');
            });
        });
        clearAllBtn?.addEventListener('click', () => {
            if (editorInstance) {
                if (confirm("Are you sure you want to clear the editor?")) {
                     editorInstance.setValue('');
                     logToTerminal("Editor cleared.");
                     updatePreview();
                }
            }
        });
        const RUN = document.getElementById("run-python");
        openFilesBtn?.addEventListener('click', () => {
            if (currentMode === 'html') {
                currentMode = 'python';
                editorInstance.session.setMode('ace/mode/python');
                // Corrected Python mode visibility logic:
                previewArea.style.display = 'flex'; // Ensure preview area is visible
                previewBox.style.display = 'none'; // Hide the HTML preview box (iframe and handles)
                PYTHON_TERMINAL.style.display = 'flex'; // Show the Python terminal
                PREVIEW_SIZE.style.display = "none";
                LIVE.innerText = "Connected to Python";
                RUN.style.display = "flex";
                editorInstance.setValue('print("Hello User")');
                openPreviewTabBtn.style.display = "none";
                terminalBtn.style.display = "none";
                openFilesButton.querySelector('span').textContent = 'Switch to HTML';
                logToTerminal('Switched to Python mode. Terminal activated.');
            } else {
                currentMode = 'html';
                editorInstance.session.setMode('ace/mode/html');
                previewArea.style.display = 'flex'; // Ensure preview area is visible
                previewBox.style.display = 'flex'; // Show the HTML preview box
                openPreviewTabBtn.style.display = "flex";
                terminalDiv.style.display = "flex";
                RUN.style.display = "none";
                LIVE.innerText = "Live";
                terminalBtn.style.display = "flex";
                editorInstance.setValue(HTML_THEME);
                PYTHON_TERMINAL.style.display = 'none'; // Hide the Python terminal
                PREVIEW_SIZE.style.display = "flex";
                terminalDiv.style.display = 'none'; // Keep this to hide general terminal when switching back to HTML, or remove to keep it visible
                openFilesButton.querySelector('span').textContent = 'Switch to Python';
                updatePreview();
                logToTerminal('Switched to HTML mode. Preview activated.');
            }
        });
        const handleLeft = document.getElementById('resize-handle-left');
        const handleRight = document.getElementById('resize-handle-right');
        const handleTop = document.getElementById('resize-handle-top');
        const handleBottom = document.getElementById('resize-handle-bottom');
        let isResizing = false;
        let currentHandle = null;
        let startX, startY, initialWidth, initialHeight;
        let resizeDirection = 'both';
        const startResize = (eventLike, handle) => {
            if (eventLike instanceof MouseEvent && eventLike.button !== 0) return;
            isResizing = true;
            currentHandle = handle;
            startX = eventLike.clientX;
            startY = eventLike.clientY;
            initialWidth = previewBox.offsetWidth;
            initialHeight = previewBox.offsetHeight;
            previewBox.style.transition = 'none';
            document.body.style.userSelect = 'none';
            if (handle === handleLeft || handle === handleRight) {
                document.body.style.cursor = 'ew-resize';
                resizeDirection = 'width';
            } else if (handle === handleTop || handle === handleBottom) {
                document.body.style.cursor = 'ns-resize';
                resizeDirection = 'height';
            } else {
                document.body.style.cursor = 'nwse-resize';
                resizeDirection = 'both';
            }
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
            window.addEventListener('mouseleave', stopResize);
            window.addEventListener('touchmove', resizeTouch);
            window.addEventListener('touchend', stopResizeTouch);
            window.addEventListener('touchcancel', stopResizeTouch);
             if (eventLike instanceof TouchEvent) {
                eventLike.preventDefault();
            }
        };
        const resize = (eventLike) => {
            if (!isResizing) return;
            const currentX = eventLike.clientX;
            const currentY = eventLike.clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            let newWidth, newHeight;
            if (resizeDirection === 'width' || resizeDirection === 'both') {
                if (currentHandle === handleLeft) {
                    newWidth = initialWidth - diffX;
                } else {
                    newWidth = initialWidth + diffX;
                }
                const minWidth = parseInt(getComputedStyle(previewBox).minWidth, 10) || 200;
                const parentPaddingH = parseInt(getComputedStyle(previewArea).paddingLeft, 10) + parseInt(getComputedStyle(previewArea).paddingRight, 10);
                const maxWidth = previewArea.offsetWidth - parentPaddingH;
                newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
                previewBox.style.width = `${newWidth}px`;
            }
            if (resizeDirection === 'height' || resizeDirection === 'both') {
                if (currentHandle === handleTop) {
                    newHeight = initialHeight - diffY;
                } else {
                    newHeight = initialHeight + diffY;
                }
                const minHeight = parseInt(getComputedStyle(previewBox).minHeight, 10) || 100;
                const parentPaddingV = parseInt(getComputedStyle(previewArea).paddingTop, 10) + parseInt(getComputedStyle(previewArea).paddingBottom, 10);
                const maxHeight = previewArea.offsetHeight - parentPaddingV;
                newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
                previewBox.style.height = `${newHeight}px`;
            }
        };
        const stopResize = () => {
            if (isResizing) {
                isResizing = false;
                currentHandle = null;
                resizeDirection = 'both';
                previewBox.style.transition = '';
                document.body.style.cursor = '';
                previewArea.style.userSelect = '';
                window.removeEventListener('mousemove', resize);
                window.removeEventListener('mouseup', stopResize);
                window.removeEventListener('mouseleave', stopResize);
                window.removeEventListener('touchmove', resizeTouch);
                window.removeEventListener('touchend', stopResizeTouch);
                window.removeEventListener('touchcancel', stopResizeTouch);
                updateSizeInputs();
                logToTerminal(`Preview resized to ${previewBox.offsetWidth}px wide and ${previewBox.offsetHeight}px tall.`, 'info');
            }
        };
        const startResizeTouch = (e, handle) => {
            if (e.touches.length > 1) return;
            startResize(e.touches[0], handle);
        };
        const resizeTouch = (e) => {
            if (e.touches.length > 1) return;
            resize(e.touches[0]);
        };
        const stopResizeTouch = (e) => {
            stopResize();
        };
        handleLeft?.addEventListener('mousedown', (e) => startResize(e, handleLeft));
        handleRight?.addEventListener('mousedown', (e) => startResize(e, handleRight));
        handleTop?.addEventListener('mousedown', (e) => startResize(e, handleTop));
        handleBottom?.addEventListener('mousedown', (e) => startResize(e, handleBottom));
        handleLeft?.addEventListener('touchstart', (e) => startResizeTouch(e, handleLeft));
        handleRight?.addEventListener('touchstart', (e) => startResizeTouch(e, handleRight));
        handleTop?.addEventListener('touchstart', (e) => startResizeTouch(e, handleTop));
        handleBottom?.addEventListener('touchstart', (e) => startResizeTouch(e, handleBottom));
        widthInput.addEventListener('change', () => {
            const newWidth = parseInt(widthInput.value, 10);
            if (!isNaN(newWidth) && newWidth > 0) {
                previewBox.style.width = `${newWidth}px`;
                updateSizeInputs();
            } else {
                alert("Please enter a valid positive number for width.");
                updateSizeInputs();
            }
        });
        heightInput.addEventListener('change', () => {
            const newHeight = parseInt(heightInput.value, 10);
            if (!isNaN(newHeight) && newHeight > 0) {
                previewBox.style.height = `${newHeight}px`;
                updateSizeInputs();
            } else {
                alert("Please enter a valid positive number for height.");
                updateSizeInputs();
            }
        });
        const terminalBtn = document.getElementById('terminal-btn');
        const closeTerminalBtn = document.getElementById('close-terminal-btn');
        terminalBtn?.addEventListener('click', () => {
            const isHidden = terminalDiv.style.display === 'none' || terminalDiv.style.display === '';
            terminalDiv.style.display = isHidden ? 'flex' : 'none';
            logToTerminal(`Console ${isHidden ? 'opened' : 'closed'}.`);
            terminalBtn?.classList.toggle('active', isHidden);
        });
        closeTerminalBtn?.addEventListener('click', () => {
            terminalDiv.style.display = 'none';
            logToTerminal("Console closed.");
            terminalBtn?.classList.remove('active');
        });
        logToTerminal("Editor initialized. Welcome!", "info");
        const refreshBtn = document.getElementById('refresh-btn');
        const hardResetBtn = document.getElementById('hard-reset-btn');
        refreshBtn?.addEventListener('click', () => {
            logToTerminal("Manual refresh triggered.");
            updatePreview();
        });
        hardResetBtn?.addEventListener('click', () => {
            logToTerminal("Hard reset triggered...");
             if (previewIframe && editorInstance) {
                const currentCode = editorInstance.getValue();
                previewIframe.srcdoc = '<html><head><title>Resetting...</title></head><body></body></html>';
                setTimeout(() => {
                     previewIframe.srcdoc = currentCode;
                     logToTerminal("Inline preview hard reset complete.", "info");
                }, 50);
             } else {
                 logToTerminal("Cannot perform hard reset: iframe or editor missing.", "error");
             }
        });
        const downloadBtnContainer = document.querySelector('.download');
        downloadBtnContainer?.addEventListener('click', () => {
            if (!editorInstance) {
                logToTerminal("Cannot download: Editor not ready.", "warn");
                return;
            }
            try {
                const code = editorInstance.getValue();
                const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                let suggestedFilename = "index.html";
                const titleMatch = code.match(/<title>(.*?)<\/title>/i);
                if (titleMatch && titleMatch[1] && titleMatch[1].trim()) {
                    suggestedFilename = titleMatch[1].trim().replace(/[^a-z0-9_\-\.]/gi, '_').replace(/_+/g, '_').toLowerCase() + ".html";
                     if (suggestedFilename.startsWith('_') || suggestedFilename.startsWith('.')) {
                        suggestedFilename = "file" + suggestedFilename;
                     }
                     if (!suggestedFilename.endsWith('.html')) {
                        suggestedFilename += ".html";
                     }
                }
                 const MAX_FILENAME_LENGTH = 60;
                 if (suggestedFilename.length > MAX_FILENAME_LENGTH) {
                    suggestedFilename = suggestedFilename.substring(0, MAX_FILENAME_LENGTH - 5) + ".html";
                 }
                a.download = suggestedFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                logToTerminal(`File download initiated as "${suggestedFilename}".`);
            } catch (e) {
                console.error("Download failed:", e);
                logToTerminal(`Error initiating download: ${e.message}`, "error");
                alert("Failed to initiate download.");
            }
        });
        const openPreviewTabBtn = document.getElementById('open-preview-tab-btn');
        openPreviewTabBtn?.addEventListener('click', () => {
            if (!editorInstance) {
                alert("Editor not initialized yet.");
                logToTerminal("Cannot open in new tab: Editor not ready.", "warn");
                return;
            }
            const currentCode = editorInstance.getValue();
            const backendEndpoint = '/generate_preview';
            openPreviewTabBtn.disabled = true;
            const originalButtonTextEl = openPreviewTabBtn.querySelector('span');
            const originalButtonText = originalButtonTextEl.textContent;
            originalButtonTextEl.textContent = 'Generating...';
            logToTerminal("Requesting unique preview link...");
            fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'code': currentCode
                })
            })
            .then(response => {
                if (!response.ok) {

                    return response.text().then(text => {
                        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}. Body: ${text || '(empty)'}`);
                    });
                }
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                     return response.text().then(text => {
                        throw new Error(`Expected JSON response, but got ${contentType || 'unknown'}. Body: ${text}`);
                     });
                }
            })
            .then(data => {
                if (data && data.preview_url) {
                    window.open(data.preview_url, '_blank');
                    logToTerminal(`Preview link generated: ${data.preview_url}`, "info");
                } else {
                    throw new Error(data?.error || 'Invalid response structure from server (missing preview_url)');
                }
            })
            .catch(error => {
                console.error('Error generating preview link:', error);
                logToTerminal(`Error opening preview in new tab: ${error.message}`, "error");
                alert(`Could not generate preview link. Please check the console or ensure the backend server is running and the '/generate_preview' endpoint is correct.\n\nDetails: ${error.message}`);
            })
            .finally(() => {
                openPreviewTabBtn.disabled = false;
                originalButtonTextEl.textContent = originalButtonText;
            });
        });
        
    async function executeCode() {
        const code = editorInstance.getValue(); // **Correctly get code from Ace Editor**
        const outputDiv = PYTHON_TERMINAL; // Use the PYTHON_TERMINAL variable defined in script.js
        console.log("clicked")
        try {
            const response = await fetch("https://python-4b0j.onrender.com/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: code })
            });
            if (!response.ok) {
                const errorData = await response.json();
                outputDiv.innerHTML = "Output: Error from server.";
                console.error("Server Error:", errorData);
                return;
            }
            const data = await response.json();
            console.log(data)
            const formattedText = data.output.replace(/\n/g, "<br>");  
            outputDiv.innerHTML = ( formattedText || data.error);
        } catch (error) {
            outputDiv.innerHTML = errorData; // Improved error message
            console.error("Fetch Error:", error); 
        }
    }
    RUN.addEventListener("click", executeCode);

        function triggerInitialPreview() {
             if(editorInstance && previewIframe && editorInstance.getValue()) {
                 updatePreview();
             } else {
                 setTimeout(triggerInitialPreview, 150);
             }
        }
        updateSizeInputs();
    });