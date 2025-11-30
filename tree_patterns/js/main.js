// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').textContent = '☀️';
        document.getElementById('theme-text').textContent = 'Light';
    }
});

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create problem card HTML
function createProblemCard(problem) {
    const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
    
    let visualHtml = '';
    if (problem.visual) {
        visualHtml = `
            <div class="visual-section">
                <h4>📊 Visual Explanation</h4>
                ${problem.visual}
            </div>
        `;
    }
    
    return `
        <div class="problem-card">
            <div class="problem-header">
                <h3><a href="${problem.leetcodeUrl}" target="_blank">${problem.title}</a></h3>
                <span class="difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
            </div>
            
            <div class="problem-content">
                <div class="section">
                    <h4>💡 Intuition</h4>
                    <p>${problem.intuition}</p>
                </div>
                
                <div class="section">
                    <h4>🎯 Approach</h4>
                    <p>${problem.approach}</p>
                </div>

                ${visualHtml}
                
                <div class="complexity">
                    <span>⏱️ Time: ${problem.timeComplexity}</span>
                    <span>💾 Space: ${problem.spaceComplexity}</span>
                </div>
                
                <button class="code-toggle" onclick="toggleCode('${codeId}')">
                    Show Code ▼
                </button>
                <div id="${codeId}" class="code-container" style="display: none;">
                    <pre><code class="language-cpp">${escapeHtml(problem.code)}</code></pre>
                </div>
            </div>
        </div>
    `;
}

// Toggle code visibility with syntax highlighting
function toggleCode(codeId) {
    const codeContainer = document.getElementById(codeId);
    const button = codeContainer.previousElementSibling;
    
    if (codeContainer.style.display === 'none') {
        codeContainer.style.display = 'block';
        button.textContent = 'Hide Code ▲';
        
        const codeBlock = codeContainer.querySelector('code');
        if (codeBlock && !codeBlock.classList.contains('hljs')) {
            hljs.highlightElement(codeBlock);
        }
    } else {
        codeContainer.style.display = 'none';
        button.textContent = 'Show Code ▼';
    }
}

// Create pattern section
function createPatternSection(pattern, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
        <div class="pattern-intro">
            <h2>${pattern.title}</h2>
            <div class="pattern-details">
                <div class="scenario">
                    <strong>📋 Scenario:</strong> ${pattern.scenario}
                </div>
                <div class="clue">
                    <strong>🔍 Clue:</strong> ${pattern.clue}
                </div>
            </div>
        </div>
        <div class="problems-grid">
    `;
    
    pattern.problems.forEach(problem => {
        html += createProblemCard(problem);
    });
    
    html += '</div>';
    container.innerHTML = html;
}
