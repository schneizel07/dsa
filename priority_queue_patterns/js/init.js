// Initialize after all content is loaded
(function() {
    // Render all patterns
    try {
        if (window.kthLargestProblems) {
            document.getElementById('kth-largest').innerHTML = createPatternSection(window.kthLargestProblems);
        }
        if (window.topKFrequentProblems) {
            document.getElementById('top-k-frequent').innerHTML = createPatternSection(window.topKFrequentProblems);
        }
        if (window.mergeKListsProblems) {
            document.getElementById('merge-k-lists').innerHTML = createPatternSection(window.mergeKListsProblems);
        }
        if (window.slidingWindowProblems) {
            document.getElementById('sliding-window').innerHTML = createPatternSection(window.slidingWindowProblems);
        }
        if (window.designProblems) {
            document.getElementById('design-problems').innerHTML = createPatternSection(window.designProblems);
        }
        if (window.constructionProblems) {
            document.getElementById('construction').innerHTML = createPatternSection(window.constructionProblems);
        }
        if (window.graphProblems) {
            document.getElementById('graph-problems').innerHTML = createPatternSection(window.graphProblems);
        }
    } catch (e) {
        console.error('Error rendering patterns:', e);
    }

    // Tab switching functionality
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            tabContents.forEach(function(c) { c.classList.remove('active'); });

            // Add active class to clicked
            btn.classList.add('active');
            var tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Re-highlight code in the new tab
            hljs.highlightAll();
        });
    });

    // Code toggle functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.code-toggle')) {
            var toggle = e.target.closest('.code-toggle');
            var wrapper = toggle.nextElementSibling;
            toggle.classList.toggle('open');
            wrapper.classList.toggle('show');
            
            // Highlight code when opened
            if (wrapper.classList.contains('show')) {
                hljs.highlightAll();
            }
        }
    });

    // Initialize syntax highlighting
    hljs.highlightAll();
    
    console.log('Priority Queue Patterns loaded successfully!');
})();
