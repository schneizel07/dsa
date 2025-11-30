// Initialize all patterns when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all pattern scripts to load
    setTimeout(() => {
        // Render all patterns
        if (window.designProblemsPattern) {
            createPatternSection(window.designProblemsPattern, 'design-problems');
        }
        if (window.monotonicStackPattern) {
            createPatternSection(window.monotonicStackPattern, 'monotonic-stack');
        }
        if (window.expressionEvalPattern) {
            createPatternSection(window.expressionEvalPattern, 'expression-eval');
        }
        if (window.twoStacksPattern) {
            createPatternSection(window.twoStacksPattern, 'two-stacks');
        }
        if (window.slidingWindowPattern) {
            createPatternSection(window.slidingWindowPattern, 'sliding-window');
        }
        
        // Activate first tab
        const firstTab = document.querySelector('.tab-btn');
        const firstContent = document.querySelector('.tab-content');
        if (firstTab) firstTab.classList.add('active');
        if (firstContent) firstContent.classList.add('active');
    }, 100);
});
