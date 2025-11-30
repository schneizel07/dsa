// Initialize all patterns when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.basicTraversalPattern) {
            createPatternSection(window.basicTraversalPattern, 'basic-traversal');
        }
        if (window.treeConstructionPattern) {
            createPatternSection(window.treeConstructionPattern, 'tree-construction');
        }
        if (window.bstPattern) {
            createPatternSection(window.bstPattern, 'binary-search-tree');
        }
        if (window.lcaPattern) {
            createPatternSection(window.lcaPattern, 'lowest-common-ancestor');
        }
        if (window.treePathPattern) {
            createPatternSection(window.treePathPattern, 'tree-path');
        }
        if (window.treeDepthPattern) {
            createPatternSection(window.treeDepthPattern, 'tree-depth');
        }
        if (window.treeViewPattern) {
            createPatternSection(window.treeViewPattern, 'tree-view');
        }
        if (window.treeTransformPattern) {
            createPatternSection(window.treeTransformPattern, 'tree-transform');
        }
        
        const firstTab = document.querySelector('.tab-btn');
        const firstContent = document.querySelector('.tab-content');
        if (firstTab) firstTab.classList.add('active');
        if (firstContent) firstContent.classList.add('active');
    }, 100);
});
