// Initialize all pattern sections
document.addEventListener('DOMContentLoaded', () => {
    // Finding Connected Components
    if (window.connectedComponentsPattern) {
        document.getElementById('connected-components').innerHTML = createPatternSection(window.connectedComponentsPattern);
    }
    
    // Shortest Path Finding
    if (window.shortestPathPattern) {
        document.getElementById('shortest-path').innerHTML = createPatternSection(window.shortestPathPattern);
    }
    
    // Cycle Detection
    if (window.cycleDetectionPattern) {
        document.getElementById('cycle-detection').innerHTML = createPatternSection(window.cycleDetectionPattern);
    }
    
    // Bipartite Graph Check
    if (window.bipartitePattern) {
        document.getElementById('bipartite').innerHTML = createPatternSection(window.bipartitePattern);
    }
    
    // Minimum Spanning Tree
    if (window.mstPattern) {
        document.getElementById('mst').innerHTML = createPatternSection(window.mstPattern);
    }
    
    // DAG Traversal
    if (window.dagTraversalPattern) {
        document.getElementById('dag-traversal').innerHTML = createPatternSection(window.dagTraversalPattern);
    }
    
    // Graph Coloring
    if (window.graphColoringPattern) {
        document.getElementById('graph-coloring').innerHTML = createPatternSection(window.graphColoringPattern);
    }
    
    // Initialize syntax highlighting
    hljs.highlightAll();
});
