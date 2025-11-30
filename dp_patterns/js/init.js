// Initialize all patterns when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.basicDpPattern) {
            createPatternSection(window.basicDpPattern, 'basic-dp');
        }
        if (window.optimalSubstructurePattern) {
            createPatternSection(window.optimalSubstructurePattern, 'optimal-substructure');
        }
        if (window.intervalDpPattern) {
            createPatternSection(window.intervalDpPattern, 'interval-dp');
        }
        if (window.knapsackPattern) {
            createPatternSection(window.knapsackPattern, 'knapsack');
        }
        // Fixed variable names for prefix-sums and counting
        if (window.prefixSumsPattern || window.prefixSums) {
            createPatternSection(window.prefixSumsPattern || window.prefixSums, 'prefix-sums');
        }
        if (window.countingPattern || window.counting) {
            createPatternSection(window.countingPattern || window.counting, 'counting');
        }
        if (window.matrixPattern || window.matrixDpPattern) {
            createPatternSection(window.matrixPattern || window.matrixDpPattern, 'matrix-dp');
        }
        if (window.digitPattern || window.digitDpPattern) {
            createPatternSection(window.digitPattern || window.digitDpPattern, 'digit-dp');
        }
        if (window.matchingPattern || window.matchingDpPattern) {
            createPatternSection(window.matchingPattern || window.matchingDpPattern, 'matching-dp');
        }
        if (window.probabilityPattern || window.probabilityDpPattern) {
            createPatternSection(window.probabilityPattern || window.probabilityDpPattern, 'probability-dp');
        }
        if (window.stateMachinePattern || window.stateMachineDpPattern) {
            createPatternSection(window.stateMachinePattern || window.stateMachineDpPattern, 'state-machine');
        }
        
        const firstTab = document.querySelector('.tab-btn');
        const firstContent = document.querySelector('.tab-content');
        if (firstTab) firstTab.classList.add('active');
        if (firstContent) firstContent.classList.add('active');
    }, 100);
});
