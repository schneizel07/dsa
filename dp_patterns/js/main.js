// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.textContent = '🌙';
        text.textContent = 'Dark';
        localStorage.setItem('dp-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        text.textContent = 'Light';
        localStorage.setItem('dp-theme', 'dark');
    }
}

// Load saved theme
(function() {
    const savedTheme = localStorage.getItem('dp-theme');
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

// ==========================================
// VISUAL HELPER FUNCTIONS
// ==========================================

// Create DP Table
function createDPTable(headers, rows, options = {}) {
    const { highlightCells = [], resultCell = null, currentCell = null } = options;
    
    let html = '<div class="dp-table-wrapper"><div class="dp-table">';
    
    // Header row
    html += '<div class="dp-row">';
    headers.forEach((h, i) => {
        html += `<div class="dp-cell header">${h}</div>`;
    });
    html += '</div>';
    
    // Data rows
    rows.forEach((row, rowIdx) => {
        html += '<div class="dp-row">';
        row.forEach((cell, colIdx) => {
            let cellClass = 'dp-cell';
            
            const cellKey = `${rowIdx},${colIdx}`;
            if (highlightCells.includes(cellKey)) cellClass += ' highlight';
            if (resultCell === cellKey) cellClass += ' result';
            if (currentCell === cellKey) cellClass += ' current';
            if (cell === true || cell === 'T') cellClass += ' true';
            if (cell === false || cell === 'F') cellClass += ' false';
            if (colIdx === 0) cellClass += ' row-header';
            
            const displayVal = cell === true ? 'T' : cell === false ? 'F' : cell;
            html += `<div class="${cellClass}">${displayVal}</div>`;
        });
        html += '</div>';
    });
    
    html += '</div></div>';
    return html;
}

// Create Array Visual
function createArrayVisual(values, options = {}) {
    const { highlightIndices = [], selectedIndices = [], resultIndices = [], showIndices = true } = options;
    
    let html = '<div class="array-visual">';
    
    values.forEach((val, i) => {
        let cellClass = 'array-cell';
        if (highlightIndices.includes(i)) cellClass += ' highlight';
        if (selectedIndices.includes(i)) cellClass += ' selected';
        if (resultIndices.includes(i)) cellClass += ' result';
        
        html += `<div class="${cellClass}">`;
        if (showIndices) html += `<span class="index">${i}</span>`;
        html += `${val}</div>`;
    });
    
    html += '</div>';
    return html;
}

// Create Grid Visual
function createGridVisual(grid, options = {}) {
    const { pathCells = [], startCell = null, endCell = null, obstacleCells = [] } = options;
    const rows = grid.length;
    const cols = grid[0].length;
    
    let html = `<div class="grid-visual" style="grid-template-columns: repeat(${cols}, 40px);">`;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cellClass = 'grid-cell';
            const key = `${i},${j}`;
            
            if (pathCells.includes(key)) cellClass += ' path';
            if (startCell === key) cellClass += ' start';
            if (endCell === key) cellClass += ' end';
            if (obstacleCells.includes(key)) cellClass += ' obstacle';
            
            html += `<div class="${cellClass}">${grid[i][j]}</div>`;
        }
    }
    
    html += '</div>';
    return html;
}

// Create Recurrence Box
function createRecurrenceBox(label, formula) {
    return `
        <div class="recurrence-box">
            <div class="label">📐 ${label}</div>
            <code>${formula}</code>
        </div>
    `;
}

// Create Parallel Approaches Box
function createParallelBox(approaches) {
    let html = '<div class="parallel-box">';
    
    approaches.forEach(approach => {
        html += `
            <div class="approach-card ${approach.type}">
                <div class="approach-title">${approach.icon} ${approach.title}</div>
                <div class="approach-content">${approach.content}</div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Create State Diagram
function createStateDiagram(states, transitions) {
    let html = '<div class="state-diagram">';
    
    states.forEach((state, i) => {
        html += `<div class="state-box ${state.class || ''}">${state.label}</div>`;
        if (i < states.length - 1) {
            html += `<span class="state-arrow">→</span>`;
        }
    });
    
    html += '</div>';
    return html;
}

// Create Steps Visual
function createStepsVisual(steps) {
    let html = '<div class="steps-container">';
    
    steps.forEach((step, i) => {
        html += `
            <div class="step-item">
                <div class="step-number">${i + 1}</div>
                <div class="step-content">
                    <div class="step-title">${step.title}</div>
                    <div>${step.content}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Create Clue Box
function createClueBox(title, content) {
    return `
        <div class="clue-box">
            <h5>💡 ${title}</h5>
            <p>${content}</p>
        </div>
    `;
}

// Create Key Insight Box
function createKeyInsight(content) {
    return `
        <div class="key-insight">
            <strong>🎯 Key Insight:</strong> ${content}
        </div>
    `;
}

// Create Transition Visual
function createTransitionVisual(from, to, label = '') {
    return `
        <div class="transition-visual">
            <div class="transition-row">
                <div class="transition-box source">${from}</div>
                <span class="transition-arrow">→</span>
                <div class="transition-box target">${to}</div>
            </div>
            ${label ? `<div class="transition-label">${label}</div>` : ''}
        </div>
    `;
}

// Create Tree Visual for Recursion
function createTreeVisual(levels) {
    let html = '<div class="tree-visual">';
    
    levels.forEach((level, i) => {
        if (i > 0) {
            html += '<div class="tree-connector">↙ ↘</div>';
        }
        html += '<div class="tree-level">';
        level.forEach(node => {
            html += `<div class="tree-node ${node.class || ''}">${node.label}</div>`;
        });
        html += '</div>';
    });
    
    html += '</div>';
    return html;
}

// ==========================================
// PROBLEM CARD CREATION
// ==========================================

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
    
    // Approach section - can be string or structured
    let approachHtml = '';
    if (typeof problem.approach === 'string') {
        approachHtml = `<p>${problem.approach}</p>`;
    } else if (Array.isArray(problem.approach)) {
        approachHtml = '<ol>' + problem.approach.map(step => `<li>${step}</li>`).join('') + '</ol>';
    }
    
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
                    ${approachHtml}
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

// Create pattern section - supports both old and new formats
function createPatternSection(pattern, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Check format: old format has 'problems' array, new format has 'patterns' array
    const hasProblems = pattern.problems && pattern.problems.length > 0;
    const hasPatterns = pattern.patterns && pattern.patterns.length > 0;
    
    if (hasProblems) {
        createOldFormatSection(pattern, container, containerId);
    } else if (hasPatterns) {
        createNewFormatSection(pattern, container, containerId);
    }
}

// New format renderer (patterns array with visualization or intuition)
function createNewFormatSection(pattern, container, containerId) {
    let html = `
        <div class="pattern-header">
            <h2>${pattern.title}</h2>
            <p class="scenario"><strong>📋 Description:</strong> ${pattern.description || ''}</p>
        </div>
    `;
    
    pattern.patterns.forEach((item, index) => {
        const codeId = `${containerId}-code-${index}`;
        
        // Store code for later highlighting
        if (!window.codeStore) window.codeStore = {};
        window.codeStore[codeId] = item.code;
        
        // Get visual content - could be 'visualization', 'intuition', 'approach', or combination
        let visualContent = '';
        if (item.visualization) {
            visualContent = item.visualization;
        } else if (item.intuition) {
            visualContent = item.intuition;
            if (item.approach) {
                visualContent += item.approach;
            }
        }
        
        html += `
            <div class="problem-card">
                <div class="problem-header">
                    <div class="problem-title">
                        <span>📌</span>
                        <span>${item.title}</span>
                    </div>
                </div>
                <div class="problem-body">
                    <div class="section">
                        <h4>💡 Problem</h4>
                        <p>${item.description || ''}</p>
                    </div>
                    <div class="section">
                        <h4>📊 Visualization & Approach</h4>
                        ${visualContent}
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
    });
    
    container.innerHTML = html;
}

// Old format renderer (uses helper functions for visualizations)
function createOldFormatSection(pattern, container, containerId) {
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
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
