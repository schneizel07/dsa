// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('array-patterns-theme');
if (savedTheme) {
    body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeButton();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('array-patterns-theme', isDark ? 'dark' : 'light');
    updateThemeButton();
});

function updateThemeButton() {
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const content = document.getElementById('content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPattern(btn.dataset.tab);
    });
});

// Load Pattern Content
function loadPattern(patternId) {
    const pattern = window.patterns[patternId];
    if (!pattern) return;

    content.innerHTML = createPatternSection(pattern);
    
    // Re-highlight code blocks
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
}

// Create Pattern Section HTML
function createPatternSection(pattern) {
    return `
        <div class="pattern-section">
            <div class="pattern-header">
                <h2>${pattern.icon} ${pattern.title}</h2>
                <div class="pattern-meta">
                    <span>📚 ${pattern.problems.length} Problems</span>
                    <span>⏱️ ${pattern.timeComplexity}</span>
                </div>
            </div>
            <div class="pattern-description">
                <h3>🎯 When to Use</h3>
                <p>${pattern.scenario}</p>
                <h3>🔍 Pattern Clues</h3>
                <p>${pattern.clue}</p>
            </div>
            <div class="problems-grid">
                ${pattern.problems.map(p => createProblemCard(p)).join('')}
            </div>
        </div>
    `;
}

// Create Problem Card HTML
function createProblemCard(problem) {
    return `
        <div class="problem-card">
            <div class="problem-header">
                <span class="problem-title">${problem.title}</span>
                <div class="problem-meta">
                    <span class="difficulty ${problem.difficulty}">${problem.difficulty}</span>
                    <a href="${problem.link}" target="_blank" class="problem-link">LeetCode ↗</a>
                </div>
            </div>
            <div class="problem-content">
                <div class="section">
                    <h4>💡 Intuition</h4>
                    <p>${problem.intuition}</p>
                    ${problem.visual ? `<div class="visual-diagram"><pre>${problem.visual}</pre></div>` : ''}
                </div>
                <div class="section">
                    <h4>📋 Approach</h4>
                    <p>${problem.approach}</p>
                </div>
                <div class="section">
                    <h4>⚡ Complexity</h4>
                    <div class="complexity">
                        <div class="complexity-item"><strong>Time:</strong> ${problem.timeComplexity}</div>
                        <div class="complexity-item"><strong>Space:</strong> ${problem.spaceComplexity}</div>
                    </div>
                </div>
                <div class="code-section">
                    <button class="code-toggle" onclick="toggleCode(this)">
                        <span>📝 View C++ Solution</span>
                        <span class="arrow">▼</span>
                    </button>
                    <div class="code-content">
                        <pre><code class="language-cpp">${escapeHtml(problem.code)}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle Code Visibility
function toggleCode(button) {
    const codeContent = button.nextElementSibling;
    button.classList.toggle('active');
    codeContent.classList.toggle('show');
}

// Escape HTML for code display
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize patterns object
window.patterns = {};
