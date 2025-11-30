// ==========================================
// MAIN.JS - Core Functions for Binary Search Patterns
// ==========================================

/**
 * Creates a problem card HTML element
 * @param {Object} problem - Problem object with title, difficulty, description, etc.
 * @returns {HTMLElement} - The problem card element
 */
function createProblemCard(problem) {
    const card = document.createElement('div');
    card.className = 'problem-card';
    
    // Determine if we're using HTML visualization or text-based
    const visualContent = problem.visualHtml 
        ? problem.visual 
        : `<div class="visual-diagram">${escapeHtml(problem.visual)}</div>`;
    
    card.innerHTML = `
        <div class="problem-header">
            <h3><a href="${problem.link}" target="_blank">${problem.title}</a></h3>
            <span class="difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
        </div>
        <div class="problem-content">
            <div class="section">
                <h4>📝 Problem Description</h4>
                <p>${problem.description}</p>
            </div>
            
            <div class="visual-section">
                <h4>🎨 Visual Representation</h4>
                ${visualContent}
            </div>
            
            <div class="section">
                <h4>💡 Approach</h4>
                <p>${problem.approach}</p>
            </div>
            
            <div class="section">
                <h4>⏱️ Complexity</h4>
                <div class="complexity">
                    <span>Time: ${problem.timeComplexity}</span>
                    <span>Space: ${problem.spaceComplexity}</span>
                </div>
            </div>
            
            <button class="code-toggle" onclick="toggleCode(this)">
                <span>👁️ Show Solution Code</span>
            </button>
            <div class="code-container" style="display: none;">
                <pre><code class="language-cpp">${escapeHtml(problem.code)}</code></pre>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Escapes HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Toggles the visibility of code sections
 * @param {HTMLElement} btn - The toggle button
 */
function toggleCode(btn) {
    const container = btn.nextElementSibling;
    const isHidden = container.style.display === 'none';
    
    container.style.display = isHidden ? 'block' : 'none';
    btn.innerHTML = isHidden 
        ? '<span>🙈 Hide Solution Code</span>' 
        : '<span>👁️ Show Solution Code</span>';
    
    // Highlight code if showing
    if (isHidden && window.hljs) {
        container.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    }
}

/**
 * Renders a pattern section with intro and problems
 * @param {Object} patternData - Pattern data object
 */
function renderPattern(patternData) {
    const container = document.getElementById('pattern-content');
    container.innerHTML = '';
    
    // Create pattern intro
    const intro = document.createElement('div');
    intro.className = 'pattern-intro';
    intro.innerHTML = `
        <h2>${patternData.title}</h2>
        <div class="scenario-box">
            <h3>🎯 When to Use</h3>
            <p>${patternData.scenario}</p>
        </div>
        <div class="clue-box">
            <h3>🔍 Pattern Recognition</h3>
            <p>${patternData.clue}</p>
        </div>
    `;
    container.appendChild(intro);
    
    // Create problems grid
    const grid = document.createElement('div');
    grid.className = 'problems-grid';
    
    patternData.problems.forEach(problem => {
        grid.appendChild(createProblemCard(problem));
    });
    
    container.appendChild(grid);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Switches between pattern tabs
 * @param {string} patternName - Name of the pattern to display
 */
function switchTab(patternName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.pattern === patternName) {
            btn.classList.add('active');
        }
    });
    
    // Get pattern data and render
    const patternData = window.patterns[patternName];
    if (patternData) {
        renderPattern(patternData);
    }
}

/**
 * Toggles between light and dark theme
 */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.querySelector('.theme-btn');
    const isDark = document.body.classList.contains('dark-theme');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Initializes theme from localStorage
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-btn').textContent = '☀️';
    }
}

// Export functions for global use
window.createProblemCard = createProblemCard;
window.renderPattern = renderPattern;
window.switchTab = switchTab;
window.toggleTheme = toggleTheme;
window.toggleCode = toggleCode;
window.initTheme = initTheme;
