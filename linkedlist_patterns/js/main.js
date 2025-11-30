// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ll-patterns-theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('ll-patterns-theme', isDark ? 'dark' : 'light');
});

// Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const contentArea = document.getElementById('content-area');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPattern(btn.dataset.tab);
    });
});

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create Problem Card
function createProblemCard(problem) {
    return `
        <div class="problem-card">
            <div class="problem-header">
                <h3><a href="${problem.link}" target="_blank">${problem.title}</a></h3>
                <span class="difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
            </div>
            <div class="problem-body">
                <div class="section">
                    <h4>💡 Intuition</h4>
                    <p>${problem.intuition}</p>
                </div>
                ${problem.visual ? `
                <div class="section">
                    <h4>🎨 Visual</h4>
                    ${problem.visual}
                </div>
                ` : ''}
                <div class="section">
                    <h4>🎯 Approach</h4>
                    <ol>
                        ${problem.approach.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="section">
                    <h4>⏱️ Complexity</h4>
                    <p><strong>Time:</strong> ${problem.timeComplexity} | <strong>Space:</strong> ${problem.spaceComplexity}</p>
                </div>
                <div class="section">
                    <button class="code-toggle" onclick="toggleCode(this)">
                        <span>📝</span> Show Code
                    </button>
                    <div class="code-container">
                        <pre><code class="language-cpp">${escapeHtml(problem.code)}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create Pattern Section
function createPatternSection(pattern) {
    return `
        <section class="pattern-section">
            <div class="pattern-header">
                <h2>${pattern.icon} ${pattern.title}</h2>
                <p>${pattern.description}</p>
            </div>
            <div class="pattern-content">
                ${pattern.clue ? `
                <div class="clue-box">
                    <h5>🔍 When to Use This Pattern</h5>
                    <p>${pattern.clue}</p>
                </div>
                ` : ''}
                ${pattern.problems.map(problem => createProblemCard(problem)).join('')}
            </div>
        </section>
    `;
}

// Toggle Code Visibility
function toggleCode(button) {
    const container = button.nextElementSibling;
    container.classList.toggle('show');
    button.innerHTML = container.classList.contains('show') 
        ? '<span>📝</span> Hide Code' 
        : '<span>📝</span> Show Code';
    
    if (container.classList.contains('show')) {
        hljs.highlightAll();
    }
}

// Load Pattern Content
function loadPattern(patternId) {
    const pattern = window.patterns[patternId];
    if (pattern) {
        contentArea.innerHTML = createPatternSection(pattern);
        hljs.highlightAll();
    }
}

// ==========================================
// LINKED LIST VISUAL HELPER FUNCTIONS
// ==========================================

// Create a single node
function createNode(value, className = '') {
    return `
        <div class="ll-node">
            <div class="ll-node-box ${className}">
                <div class="ll-node-value">${value}</div>
                <div class="ll-node-next">•</div>
            </div>
        </div>
    `;
}

// Create arrow between nodes
function createArrow(className = '') {
    return `<span class="ll-arrow ${className}">→</span>`;
}

// Create NULL terminator
function createNull() {
    return `<span class="ll-null">NULL</span>`;
}

// Create node with pointer label above it
function createNodeWithPointer(value, pointerLabel, nodeClass = '', pointerClass = '') {
    return `
        <div class="ll-pointer-container">
            <span class="ll-pointer-label ${pointerClass}">${pointerLabel}</span>
            <span class="ll-pointer-arrow">↓</span>
            <div class="ll-node">
                <div class="ll-node-box ${nodeClass}">
                    <div class="ll-node-value">${value}</div>
                    <div class="ll-node-next">•</div>
                </div>
            </div>
        </div>
    `;
}

// Create a linked list from array of values
function createLinkedList(values, options = {}) {
    const { 
        highlightIndex = -1, 
        highlightClass = 'highlight',
        slowIndex = -1,
        fastIndex = -1,
        showNull = true,
        nodeClasses = {}  // {index: className}
    } = options;
    
    let html = '<div class="ll-diagram">';
    
    values.forEach((val, i) => {
        let className = nodeClasses[i] || '';
        if (i === highlightIndex) className = highlightClass;
        if (i === slowIndex) className = 'slow';
        if (i === fastIndex) className = 'fast';
        
        html += createNode(val, className);
        if (i < values.length - 1) {
            html += createArrow();
        }
    });
    
    if (showNull) {
        html += createArrow();
        html += createNull();
    }
    
    html += '</div>';
    return html;
}

// Create linked list with fast and slow pointers
function createFastSlowDiagram(values, slowPos, fastPos) {
    let html = '<div class="ll-diagram">';
    
    values.forEach((val, i) => {
        if (i === slowPos && i === fastPos) {
            html += createNodeWithPointer(val, 'S/F', 'slow', 'slow');
        } else if (i === slowPos) {
            html += createNodeWithPointer(val, 'slow', 'slow', 'slow');
        } else if (i === fastPos) {
            html += createNodeWithPointer(val, 'fast', 'fast', 'fast');
        } else {
            html += createNode(val);
        }
        
        if (i < values.length - 1) {
            html += createArrow();
        }
    });
    
    html += createArrow();
    html += createNull();
    html += '</div>';
    return html;
}

// Create linked list with cycle visual
function createCycleList(values, cycleStartIndex) {
    let html = '<div class="ll-diagram">';
    
    values.forEach((val, i) => {
        const className = i >= cycleStartIndex ? 'highlight' : '';
        html += createNode(val, className);
        
        if (i < values.length - 1) {
            html += createArrow();
        }
    });
    
    html += `
        <div class="ll-cycle-indicator">
            <span class="ll-cycle-arrow">↩</span>
            <span class="ll-cycle-label">cycle to [${cycleStartIndex}]</span>
        </div>
    `;
    
    html += '</div>';
    return html;
}

// Create dummy node diagram
function createDummyNodeDiagram(values, dummyValue = 'D') {
    let html = '<div class="ll-diagram">';
    
    // Dummy node
    html += createNodeWithPointer(dummyValue, 'dummy', 'dummy', 'dummy');
    html += createArrow();
    
    // Rest of the list
    values.forEach((val, i) => {
        html += createNode(val);
        if (i < values.length - 1) {
            html += createArrow();
        }
    });
    
    html += createArrow();
    html += createNull();
    html += '</div>';
    return html;
}

// Create two lists with labels
function createTwoLists(list1, list2, label1 = 'List 1', label2 = 'List 2') {
    return `
        <div class="ll-lists-container">
            <div class="ll-list-row">
                <span class="ll-list-label">${label1}:</span>
                ${createLinkedList(list1, { showNull: true }).replace('<div class="ll-diagram">', '').replace('</div>', '')}
            </div>
            <div class="ll-list-row">
                <span class="ll-list-label">${label2}:</span>
                ${createLinkedList(list2, { showNull: true }).replace('<div class="ll-diagram">', '').replace('</div>', '')}
            </div>
        </div>
    `;
}

// Create reversal visualization (before/after)
function createReversalVisual(before, after) {
    return `
        <div class="ll-reversal-visual">
            <div class="ll-before-after">
                <span class="ll-state-label before">Before</span>
                <div class="ll-diagram" style="padding: 0.5rem;">
                    ${before.map((v, i) => createNode(v) + (i < before.length - 1 ? createArrow() : '')).join('')}
                    ${createArrow()}${createNull()}
                </div>
            </div>
            <div class="ll-before-after">
                <span class="ll-state-label after">After</span>
                <div class="ll-diagram" style="padding: 0.5rem;">
                    ${after.map((v, i) => createNode(v, 'reversed') + (i < after.length - 1 ? createArrow() : '')).join('')}
                    ${createArrow()}${createNull()}
                </div>
            </div>
        </div>
    `;
}

// Create step-by-step visualization
function createStepsVisual(steps) {
    let html = '<div class="ll-steps-container">';
    
    steps.forEach((step, i) => {
        html += `
            <div class="ll-step">
                <div class="ll-step-header">
                    <span class="ll-step-number">${i + 1}</span>
                    <span class="ll-step-title">${step.title}</span>
                </div>
                <div class="ll-step-content">
                    ${step.content}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Create intersection diagram
function createIntersectionDiagram(list1Unique, list2Unique, common) {
    return `
        <div class="ll-intersection-container">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                <div style="display: flex; align-items: center;">
                    <span class="ll-list-label">A:</span>
                    ${list1Unique.map(v => createNode(v)).join(createArrow())}
                    <span class="ll-branch-arrow">↘</span>
                </div>
                <div style="display: flex; align-items: center; margin-left: 100px;">
                    ${common.map((v, i) => createNode(v, 'highlight') + (i < common.length - 1 ? createArrow() : '')).join('')}
                    ${createArrow()}${createNull()}
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="ll-list-label">B:</span>
                    ${list2Unique.map(v => createNode(v)).join(createArrow())}
                    <span class="ll-branch-arrow">↗</span>
                </div>
            </div>
        </div>
    `;
}

// Initialize patterns object
window.patterns = {};
