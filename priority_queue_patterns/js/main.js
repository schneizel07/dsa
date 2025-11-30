// Helper to escape HTML in code - MUST be defined first
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/`/g, '&#096;');
}

// Helper function to create problem card HTML
function createProblemCard(problem) {
    const difficultyClass = problem.difficulty.toLowerCase();
    const escapedCode = escapeHtml(problem.code);
    const escapedIntuition = escapeHtml(problem.intuition);
    const escapedTitle = escapeHtml(problem.title);
    
    const approachItems = problem.approach.map(function(step) {
        return '<li>' + escapeHtml(step) + '</li>';
    }).join('');
    
    return '<div class="problem-card">' +
        '<div class="problem-header">' +
            '<div class="problem-title">' +
                '<span>' + problem.number + '.</span>' +
                '<a href="' + problem.link + '" target="_blank">' + escapedTitle + '</a>' +
            '</div>' +
            '<span class="difficulty ' + difficultyClass + '">' + problem.difficulty + '</span>' +
        '</div>' +
        '<div class="problem-body">' +
            '<div class="section">' +
                '<h4>💡 Intuition</h4>' +
                '<p>' + escapedIntuition + '</p>' +
            '</div>' +
            '<div class="section">' +
                '<h4>🎯 Approach</h4>' +
                '<ul>' + approachItems + '</ul>' +
                '<div class="complexity">' +
                    '<span><strong>Time:</strong> ' + escapeHtml(problem.timeComplexity) + '</span>' +
                    '<span><strong>Space:</strong> ' + escapeHtml(problem.spaceComplexity) + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="section">' +
                '<h4>💻 C++ Solution</h4>' +
                '<button class="code-toggle">' +
                    '<span>View Code</span>' +
                    '<span class="icon">▼</span>' +
                '</button>' +
                '<div class="code-wrapper">' +
                    '<pre><code class="language-cpp">' + escapedCode + '</code></pre>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
}

// Helper to create pattern section
function createPatternSection(config) {
    var problemsHtml = '';
    for (var i = 0; i < config.problems.length; i++) {
        problemsHtml += createProblemCard(config.problems[i]);
    }
    
    return '<div class="pattern-header">' +
            '<h2>' + escapeHtml(config.title) + '</h2>' +
            '<p class="scenario"><strong>Scenario:</strong> ' + escapeHtml(config.scenario) + '</p>' +
            '<p class="clue"><strong>Clue:</strong> ' + escapeHtml(config.clue) + '</p>' +
        '</div>' + problemsHtml;
}
