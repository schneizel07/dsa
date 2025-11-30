// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.textContent = '🌙';
        text.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        text.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        setTimeout(() => {
            const icon = document.getElementById('theme-icon');
            const text = document.getElementById('theme-text');
            if (icon) icon.textContent = '☀️';
            if (text) text.textContent = 'Light';
        }, 0);
    }
})();

// Create problem card HTML
function createProblemCard(problem, index) {
    const difficultyClass = problem.difficulty.toLowerCase();
    const codeId = `code-${Date.now()}-${index}`;
    
    let visualHtml = '';
    if (problem.visual) {
        visualHtml = `
            <div class="visual-section">
                <h5>📊 Visual Explanation</h5>
                ${problem.visual}
            </div>
        `;
    }
    
    // Store code for later highlighting
    if (!window.codeStore) window.codeStore = {};
    window.codeStore[codeId] = problem.code;
    
    return `
        <div class="problem-card">
            <div class="problem-header">
                <div class="problem-title">
                    <span>📌</span>
                    <a href="${problem.leetcodeUrl}" target="_blank">${problem.title}</a>
                </div>
                <span class="difficulty ${difficultyClass}">${problem.difficulty}</span>
            </div>
            <div class="problem-body">
                <div class="section">
                    <h4>💡 Intuition</h4>
                    <p>${problem.intuition}</p>
                </div>
                ${visualHtml}
                <div class="section">
                    <h4>🎯 Approach</h4>
                    <p>${problem.approach}</p>
                    <div class="complexity">
                        <span><strong>Time:</strong> ${problem.timeComplexity}</span>
                        <span><strong>Space:</strong> ${problem.spaceComplexity}</span>
                    </div>
                </div>
                <div class="section">
                    <button class="code-toggle" onclick="toggleCode(this, '${codeId}')">
                        <span>📝 View C++ Solution</span>
                        <span class="icon">▼</span>
                    </button>
                    <div class="code-wrapper" data-code-id="${codeId}">
                        <pre><code class="language-cpp"></code></pre>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create pattern section
function createPatternSection(pattern, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
        <div class="pattern-header">
            <h2>${pattern.title}</h2>
            <p class="scenario"><strong>📋 When to use:</strong> ${pattern.scenario}</p>
            <p class="clue"><strong>🔑 Key Clue:</strong> ${pattern.clue}</p>
        </div>
    `;
    
    pattern.problems.forEach((problem, index) => {
        html += createProblemCard(problem, `${containerId}-${index}`);
    });
    
    container.innerHTML = html;
}

// Toggle code visibility
function toggleCode(btn, codeId) {
    btn.classList.toggle('open');
    const codeWrapper = btn.nextElementSibling;
    codeWrapper.classList.toggle('show');
    
    // Highlight if not already done
    if (codeWrapper.classList.contains('show')) {
        const codeBlock = codeWrapper.querySelector('code');
        if (!codeBlock.dataset.highlighted && window.codeStore && window.codeStore[codeId]) {
            codeBlock.textContent = window.codeStore[codeId];
            hljs.highlightElement(codeBlock);
            codeBlock.dataset.highlighted = 'true';
        }
    }
}

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
