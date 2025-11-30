// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('string-patterns-theme');
if (savedTheme) {
    body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeButton();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('string-patterns-theme', isDark ? 'dark' : 'light');
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
                </div>
                <div class="section">
                    <h4>👁️ Visual Explanation</h4>
                    ${problem.visual}
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

// =====================================================
// VISUAL HELPER FUNCTIONS
// =====================================================

// Create a string display with character boxes
function createStringDisplay(str, options = {}) {
    const {
        highlightIndices = [],
        matchIndices = [],
        mismatchIndices = [],
        windowStart = -1,
        windowEnd = -1,
        showIndices = true,
        leftPointer = -1,
        rightPointer = -1
    } = options;
    
    let html = '<div class="string-display">';
    
    for (let i = 0; i < str.length; i++) {
        let classes = ['char'];
        
        if (highlightIndices.includes(i)) classes.push('highlight');
        if (matchIndices.includes(i)) classes.push('match');
        if (mismatchIndices.includes(i)) classes.push('mismatch');
        if (i >= windowStart && i <= windowEnd && windowStart !== -1) classes.push('window');
        
        html += `<div class="char-box">`;
        html += `<div class="${classes.join(' ')}">${str[i]}</div>`;
        if (showIndices) {
            html += `<span class="char-index">${i}</span>`;
        }
        html += `</div>`;
    }
    
    html += '</div>';
    
    // Add pointer row if needed
    if (leftPointer !== -1 || rightPointer !== -1) {
        html += '<div class="pointer-row">';
        for (let i = 0; i < str.length; i++) {
            html += '<div class="pointer-cell">';
            if (i === leftPointer) html += '<span class="arrow left">↑L</span>';
            else if (i === rightPointer) html += '<span class="arrow right">↑R</span>';
            html += '</div>';
        }
        html += '</div>';
    }
    
    return html;
}

// Create hashmap display
function createHashmapDisplay(map) {
    let html = '<div class="hashmap-display">';
    
    for (const [key, value] of Object.entries(map)) {
        html += `
            <div class="hashmap-row">
                <div class="hashmap-key">${key}</div>
                <span class="hashmap-arrow">→</span>
                <div class="hashmap-value">${value}</div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

// Create frequency counter display
function createFreqDisplay(map) {
    let html = '<div class="freq-counter">';
    
    for (const [key, value] of Object.entries(map)) {
        html += `
            <div class="freq-item">
                <span class="freq-char">'${key}'</span>
                <span class="freq-count">: ${value}</span>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

// Create comparison box
function createComparisonBox(val1, val2, label1 = 'Left', label2 = 'Right') {
    const isEqual = val1 === val2;
    return `
        <div class="comparison-box">
            <div class="compare-item">
                <span class="compare-label">${label1}</span>
                <span class="compare-value">${val1}</span>
            </div>
            <span class="${isEqual ? 'compare-equals' : 'compare-not-equals'}">${isEqual ? '=' : '≠'}</span>
            <div class="compare-item">
                <span class="compare-label">${label2}</span>
                <span class="compare-value">${val2}</span>
            </div>
            <div class="result-badge ${isEqual ? 'success' : 'failure'}">
                ${isEqual ? '✓ Match' : '✗ No Match'}
            </div>
        </div>
    `;
}

// Initialize patterns object
window.patterns = {};

// Export helper functions for use in pattern files
window.visualHelpers = {
    createStringDisplay,
    createHashmapDisplay,
    createFreqDisplay,
    createComparisonBox
};
