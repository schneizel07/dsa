// ==========================================
// INIT.JS - Initialization Script
// ==========================================

// Ensure patterns object exists (don't override if already populated)
window.patterns = window.patterns || {};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Add click handlers to tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.pattern);
        });
    });
    
    // Add theme toggle handler
    document.querySelector('.theme-btn').addEventListener('click', toggleTheme);
    
    // Load the first pattern by default (basic-binary-search)
    setTimeout(() => {
        if (window.patterns['basic-binary-search']) {
            switchTab('basic-binary-search');
        }
    }, 100);
});
