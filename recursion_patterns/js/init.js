// Initialize all pattern sections
document.addEventListener('DOMContentLoaded', () => {
    // Basic Recursive Functions
    if (window.basicRecursivePattern) {
        document.getElementById('basic-recursive').innerHTML = createPatternSection(window.basicRecursivePattern);
    }
    
    // Divide & Conquer
    if (window.divideConquerPattern) {
        document.getElementById('divide-conquer').innerHTML = createPatternSection(window.divideConquerPattern);
    }
    
    // Backtracking
    if (window.backtrackingPattern) {
        document.getElementById('backtracking').innerHTML = createPatternSection(window.backtrackingPattern);
    }
    
    // Recursive Search
    if (window.recursiveSearchPattern) {
        document.getElementById('recursive-search').innerHTML = createPatternSection(window.recursiveSearchPattern);
    }
    
    // Initialize syntax highlighting
    hljs.highlightAll();
});
