// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-theme')) {
        btn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').textContent = '☀️ Light Mode';
    }
});

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Escape HTML for safe rendering
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create Problem Card HTML
function createProblemCard(problem) {
    const visualSection = problem.visual ? `
        <div class="visual-section">
            <h4>📊 Visual Example</h4>
            <div class="visual-diagram">${escapeHtml(problem.visual)}</div>
        </div>
    ` : '';

    return `
        <div class="problem-card">
            <div class="problem-header">
                <h3><a href="${problem.link}" target="_blank">${problem.title}</a></h3>
                <span class="difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
            </div>
            <div class="problem-content">
                <div class="section">
                    <h4>💡 Intuition</h4>
                    <p>${problem.intuition}</p>
                </div>
                ${visualSection}
                <div class="section">
                    <h4>🎯 Approach</h4>
                    <p>${problem.approach}</p>
                </div>
                <div class="complexity">
                    <span>⏱️ Time: ${problem.timeComplexity}</span>
                    <span>💾 Space: ${problem.spaceComplexity}</span>
                </div>
                <button class="code-toggle" onclick="toggleCode(this)">
                    👨‍💻 Show C++ Solution
                </button>
                <div class="code-container" style="display: none;">
                    <pre><code class="language-cpp">${escapeHtml(problem.code)}</code></pre>
                </div>
            </div>
        </div>
    `;
}

// Create Pattern Section
function createPatternSection(pattern) {
    return `
        <div class="pattern-intro">
            <h2>${pattern.title}</h2>
            <div class="pattern-details">
                <p class="scenario"><strong>📋 Scenario:</strong> ${pattern.scenario}</p>
                <p class="clue"><strong>🔍 Clue:</strong> ${pattern.clue}</p>
            </div>
        </div>
        <div class="problems-grid">
            ${pattern.problems.map(p => createProblemCard(p)).join('')}
        </div>
    `;
}

// Toggle Code Visibility
function toggleCode(btn) {
    const codeContainer = btn.nextElementSibling;
    if (codeContainer.style.display === 'none') {
        codeContainer.style.display = 'block';
        btn.textContent = '👨‍💻 Hide C++ Solution';
        hljs.highlightAll();
    } else {
        codeContainer.style.display = 'none';
        btn.textContent = '👨‍💻 Show C++ Solution';
    }
}
