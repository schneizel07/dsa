window.recursiveSearchPattern = {
    title: "Recursive Search",
    scenario: "Search for a target element or solution recursively by exploring different branches of a search space until the target is found or the search space is exhausted.",
    clue: "Problems involving searching for specific elements or solutions in a structured or unstructured search space. Tasks requiring finding paths in mazes, solving Sudoku puzzles, or searching for elements in a tree or graph.",
    problems: [
        {
            title: "Sudoku Solver",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/sudoku-solver/",
            intuition: "Fill empty cells one by one, trying digits 1-9. For each digit, check if it's valid (not in same row, column, or 3x3 box). If valid, place it and recurse. If recursion fails, backtrack and try next digit.",
            approach: "Find next empty cell. Try placing 1-9, checking validity with isValid(). If valid, place digit and recursively solve rest. If recursion returns true, puzzle solved. Otherwise, reset cell to '.' and try next digit.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Sudoku Solver</div>
    
    <div class="sudoku-comparison">
        <div class="sudoku-panel">
            <div class="panel-title">Initial State</div>
            <table class="sudoku-grid">
                <tr><td>5</td><td>3</td><td class="empty-cell">.</td><td class="box-border">.</td><td>7</td><td>.</td><td class="box-border">.</td><td>.</td><td>.</td></tr>
                <tr><td>6</td><td>.</td><td>.</td><td class="box-border">1</td><td>9</td><td>5</td><td class="box-border">.</td><td>.</td><td>.</td></tr>
                <tr class="row-border"><td>.</td><td>9</td><td>8</td><td class="box-border">.</td><td>.</td><td>.</td><td class="box-border">.</td><td>6</td><td>.</td></tr>
                <tr><td>8</td><td>.</td><td>.</td><td class="box-border">.</td><td>6</td><td>.</td><td class="box-border">.</td><td>.</td><td>3</td></tr>
                <tr><td>4</td><td>.</td><td>.</td><td class="box-border">8</td><td>.</td><td>3</td><td class="box-border">.</td><td>.</td><td>1</td></tr>
                <tr class="row-border"><td>7</td><td>.</td><td>.</td><td class="box-border">.</td><td>2</td><td>.</td><td class="box-border">.</td><td>.</td><td>6</td></tr>
                <tr><td>.</td><td>6</td><td>.</td><td class="box-border">.</td><td>.</td><td>.</td><td class="box-border">2</td><td>8</td><td>.</td></tr>
                <tr><td>.</td><td>.</td><td>.</td><td class="box-border">4</td><td>1</td><td>9</td><td class="box-border">.</td><td>.</td><td>5</td></tr>
                <tr><td>.</td><td>.</td><td>.</td><td class="box-border">.</td><td>8</td><td>.</td><td class="box-border">.</td><td>7</td><td>9</td></tr>
            </table>
        </div>
        
        <div class="arrow-connector">→</div>
        
        <div class="sudoku-panel">
            <div class="panel-title">Solved</div>
            <table class="sudoku-grid solved">
                <tr><td>5</td><td>3</td><td class="filled-cell">4</td><td class="box-border filled-cell">6</td><td>7</td><td class="filled-cell">8</td><td class="box-border filled-cell">9</td><td class="filled-cell">1</td><td class="filled-cell">2</td></tr>
                <tr><td>6</td><td class="filled-cell">7</td><td class="filled-cell">2</td><td class="box-border">1</td><td>9</td><td>5</td><td class="box-border filled-cell">3</td><td class="filled-cell">4</td><td class="filled-cell">8</td></tr>
                <tr class="row-border"><td class="filled-cell">1</td><td>9</td><td>8</td><td class="box-border filled-cell">3</td><td class="filled-cell">4</td><td class="filled-cell">2</td><td class="box-border filled-cell">5</td><td>6</td><td class="filled-cell">7</td></tr>
                <tr><td>8</td><td class="filled-cell">5</td><td class="filled-cell">9</td><td class="box-border filled-cell">7</td><td>6</td><td class="filled-cell">1</td><td class="box-border filled-cell">4</td><td class="filled-cell">2</td><td>3</td></tr>
                <tr><td>4</td><td class="filled-cell">2</td><td class="filled-cell">6</td><td class="box-border">8</td><td class="filled-cell">5</td><td>3</td><td class="box-border filled-cell">7</td><td class="filled-cell">9</td><td>1</td></tr>
                <tr class="row-border"><td>7</td><td class="filled-cell">1</td><td class="filled-cell">3</td><td class="box-border filled-cell">9</td><td>2</td><td class="filled-cell">4</td><td class="box-border filled-cell">8</td><td class="filled-cell">5</td><td>6</td></tr>
                <tr><td class="filled-cell">9</td><td>6</td><td class="filled-cell">1</td><td class="box-border filled-cell">5</td><td class="filled-cell">3</td><td class="filled-cell">7</td><td class="box-border">2</td><td>8</td><td class="filled-cell">4</td></tr>
                <tr><td class="filled-cell">2</td><td class="filled-cell">8</td><td class="filled-cell">7</td><td class="box-border">4</td><td>1</td><td>9</td><td class="box-border filled-cell">6</td><td class="filled-cell">3</td><td>5</td></tr>
                <tr><td class="filled-cell">3</td><td class="filled-cell">4</td><td class="filled-cell">5</td><td class="box-border filled-cell">2</td><td>8</td><td class="filled-cell">6</td><td class="box-border filled-cell">1</td><td>7</td><td>9</td></tr>
            </table>
        </div>
    </div>

    <div class="validity-check">
        <div class="check-title">Validity Check for cell (0,2):</div>
        <div class="check-details">
            <div class="check-row">
                <span class="check-label">Row 0:</span>
                <span class="check-values">5, 3 present → ❌ can't use 5, 3</span>
            </div>
            <div class="check-row">
                <span class="check-label">Col 2:</span>
                <span class="check-values">8, 6 present → ❌ can't use 8, 6</span>
            </div>
            <div class="check-row">
                <span class="check-label">3×3 Box:</span>
                <span class="check-values">5, 3, 6, 9, 8 present → ❌ can't use these</span>
            </div>
            <div class="check-row valid-options">
                <span class="check-label">Valid:</span>
                <span class="check-values">1, 2, 4, 7</span>
            </div>
        </div>
    </div>
</div>`,
            timeComplexity: "O(9^(n)) where n = empty cells",
            spaceComplexity: "O(n) recursion stack",
            code: `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    
private:
    bool solve(vector<vector<char>>& board) {
        // Find next empty cell
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    // Try digits 1-9
                    for (char digit = '1'; digit <= '9'; digit++) {
                        if (isValid(board, row, col, digit)) {
                            // Place digit
                            board[row][col] = digit;
                            
                            // Recursively solve rest
                            if (solve(board)) {
                                return true;
                            }
                            
                            // Backtrack
                            board[row][col] = '.';
                        }
                    }
                    // No valid digit found
                    return false;
                }
            }
        }
        // All cells filled
        return true;
    }
    
    bool isValid(vector<vector<char>>& board, int row, int col, char digit) {
        // Check row
        for (int j = 0; j < 9; j++) {
            if (board[row][j] == digit) return false;
        }
        
        // Check column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == digit) return false;
        }
        
        // Check 3x3 box
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] == digit) {
                    return false;
                }
            }
        }
        
        return true;
    }
};`
        },
        {
            title: "Number of Islands",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/number-of-islands/",
            intuition: "An island is a group of connected '1's. Use DFS/recursive search from each unvisited '1' to mark all connected land cells. Count number of times we start a new DFS - that's the island count.",
            approach: "Iterate through grid. When we find '1', increment island count and use recursive DFS to mark all connected '1's as visited (change to '0' or use visited array). This 'sinks' the island so we don't count it again.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Number of Islands</div>
    
    <div class="islands-demo">
        <div class="island-step">
            <div class="step-header">Original Grid</div>
            <table class="island-grid">
                <tr><td class="land">1</td><td class="land">1</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                <tr><td class="land">1</td><td class="land">1</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                <tr><td class="water">0</td><td class="water">0</td><td class="land">1</td><td class="water">0</td><td class="water">0</td></tr>
                <tr><td class="water">0</td><td class="water">0</td><td class="water">0</td><td class="land">1</td><td class="land">1</td></tr>
            </table>
        </div>

        <div class="island-steps-container">
            <div class="island-step">
                <div class="step-header">🏝️ Island 1: DFS from (0,0)</div>
                <table class="island-grid">
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="land">1</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="water">0</td><td class="land">1</td><td class="land">1</td></tr>
                </table>
                <div class="step-info">Marks (0,0), (0,1), (1,0), (1,1)</div>
            </div>
            
            <div class="island-step">
                <div class="step-header">🏝️ Island 2: DFS from (2,2)</div>
                <table class="island-grid">
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="water">0</td><td class="land">1</td><td class="land">1</td></tr>
                </table>
                <div class="step-info">Marks (2,2)</div>
            </div>
            
            <div class="island-step">
                <div class="step-header">🏝️ Island 3: DFS from (3,3)</div>
                <table class="island-grid">
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="visited">X</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="visited">X</td><td class="water">0</td><td class="water">0</td></tr>
                    <tr><td class="water">0</td><td class="water">0</td><td class="water">0</td><td class="visited">X</td><td class="visited">X</td></tr>
                </table>
                <div class="step-info">Marks (3,3), (3,4)</div>
            </div>
        </div>
    </div>

    <div class="result-box">
        <div class="result-title">Total Islands: <span class="count-value">3</span></div>
    </div>

    <div class="key-insight">
        <div class="insight-title">🔑 Sink the Island Technique</div>
        <div class="insight-content">Mark visited cells as '0' to avoid revisiting. No extra space needed!</div>
    </div>
</div>`,
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m × n) worst case recursion",
            code: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    dfs(grid, i, j);  // Sink the island
                }
            }
        }
        
        return islands;
    }
    
private:
    void dfs(vector<vector<char>>& grid, int row, int col) {
        int m = grid.size(), n = grid[0].size();
        
        // Boundary check and water check
        if (row < 0 || row >= m || col < 0 || col >= n || 
            grid[row][col] == '0') {
            return;
        }
        
        // Mark as visited (sink the land)
        grid[row][col] = '0';
        
        // Recursively explore 4 directions
        dfs(grid, row + 1, col);  // Down
        dfs(grid, row - 1, col);  // Up
        dfs(grid, row, col + 1);  // Right
        dfs(grid, row, col - 1);  // Left
    }
    
    // BFS alternative
    int numIslandsBFS(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        vector<pair<int,int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    queue<pair<int,int>> q;
                    q.push({i, j});
                    grid[i][j] = '0';
                    
                    while (!q.empty()) {
                        auto [r, c] = q.front(); q.pop();
                        for (auto [dr, dc] : dirs) {
                            int nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n 
                                && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return islands;
    }
};`
        },
        {
            title: "Path Sum",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/path-sum/",
            intuition: "Check if tree has root-to-leaf path with given sum. At each node, subtract node's value from target. At leaf node, check if remaining sum equals node's value. Recursively check left and right subtrees.",
            approach: "Base case: null node returns false. At leaf (no children), check if node value equals remaining sum. Otherwise, recursively check if either subtree has path with (targetSum - node.val).",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Path Sum: targetSum = 22</div>
    
    <div class="tree-visualization">
        <div class="binary-tree">
            <div class="tree-level">
                <div class="tree-node root-node">5</div>
            </div>
            <div class="tree-connector">
                <div class="branch-line left-branch"></div>
                <div class="branch-line right-branch"></div>
            </div>
            <div class="tree-level">
                <div class="tree-node path-node">4</div>
                <div class="tree-node">8</div>
            </div>
            <div class="tree-connector">
                <div class="branch-line single-left"></div>
                <div class="branch-line double-branch"></div>
            </div>
            <div class="tree-level">
                <div class="tree-node path-node">11</div>
                <div class="tree-node">13</div>
                <div class="tree-node">4</div>
            </div>
            <div class="tree-connector">
                <div class="branch-line double-branch"></div>
                <div class="branch-line single-right"></div>
            </div>
            <div class="tree-level">
                <div class="tree-node">7</div>
                <div class="tree-node path-node leaf-node">2 ✓</div>
                <div class="tree-node">1</div>
            </div>
        </div>
    </div>

    <div class="path-highlight">
        <div class="path-title">✅ Valid Path Found</div>
        <div class="path-display">
            <span class="path-node-inline">5</span>
            <span class="path-arrow">→</span>
            <span class="path-node-inline">4</span>
            <span class="path-arrow">→</span>
            <span class="path-node-inline">11</span>
            <span class="path-arrow">→</span>
            <span class="path-node-inline">2</span>
        </div>
        <div class="path-sum">Sum: 5 + 4 + 11 + 2 = <span class="sum-value">22</span></div>
    </div>

    <div class="recursion-trace">
        <div class="trace-title">Recursive Calls</div>
        <div class="trace-flow">
            <div class="trace-call">hasPath(5, 22)</div>
            <div class="trace-arrow">→</div>
            <div class="trace-call">hasPath(4, 17)</div>
            <div class="trace-arrow">→</div>
            <div class="trace-call">hasPath(11, 13)</div>
            <div class="trace-arrow">→</div>
            <div class="trace-call result-call">hasPath(2, 2) = true ✓</div>
        </div>
    </div>
</div>`,
            timeComplexity: "O(n)",
            spaceComplexity: "O(h) where h = height",
            code: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        // Base case: empty tree
        if (!root) return false;
        
        // Leaf node: check if remaining sum equals node value
        if (!root->left && !root->right) {
            return root->val == targetSum;
        }
        
        // Recursive case: check either subtree
        int remaining = targetSum - root->val;
        return hasPathSum(root->left, remaining) || 
               hasPathSum(root->right, remaining);
    }
    
    // Iterative approach using stack
    bool hasPathSumIterative(TreeNode* root, int targetSum) {
        if (!root) return false;
        
        // Stack stores (node, remaining sum)
        stack<pair<TreeNode*, int>> stk;
        stk.push({root, targetSum});
        
        while (!stk.empty()) {
            auto [node, remaining] = stk.top();
            stk.pop();
            
            // Check leaf node
            if (!node->left && !node->right) {
                if (node->val == remaining) return true;
            }
            
            // Add children with updated remaining sum
            if (node->right) {
                stk.push({node->right, remaining - node->val});
            }
            if (node->left) {
                stk.push({node->left, remaining - node->val});
            }
        }
        
        return false;
    }
};`
        },
        {
            title: "Word Search II",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/word-search-ii/",
            intuition: "Find all words from dictionary in the grid. Naive approach: do Word Search for each word. Optimized: build Trie from words, then DFS from each cell, following Trie structure to prune invalid paths early.",
            approach: "Build Trie from words. From each grid cell, start DFS. At each step, check if current path exists in Trie. If Trie node has word, add to result. Mark cells visited during DFS, restore on backtrack.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Word Search II</div>
    
    <div class="word-search-setup">
        <div class="board-section">
            <div class="section-title">Board</div>
            <table class="word-board">
                <tr><td class="highlight-cell">o</td><td class="highlight-cell">a</td><td>a</td><td>n</td></tr>
                <tr><td>e</td><td class="highlight-cell">t</td><td>a</td><td>e</td></tr>
                <tr><td>i</td><td class="highlight-cell">h</td><td>k</td><td>r</td></tr>
                <tr><td>a</td><td>i</td><td>f</td><td>l</td></tr>
            </table>
        </div>
        
        <div class="words-section">
            <div class="section-title">Words to Find</div>
            <div class="word-list">
                <span class="word-item found">oath ✓</span>
                <span class="word-item">pea</span>
                <span class="word-item found">eat ✓</span>
                <span class="word-item">rain</span>
            </div>
        </div>
    </div>

    <div class="trie-visual">
        <div class="trie-title">Trie Structure</div>
        <div class="trie-tree">
            <div class="trie-level">
                <div class="trie-node root-trie">root</div>
            </div>
            <div class="trie-connector">↓</div>
            <div class="trie-level">
                <div class="trie-node">o</div>
                <div class="trie-node">p</div>
                <div class="trie-node">e</div>
                <div class="trie-node">r</div>
            </div>
            <div class="trie-connector">↓</div>
            <div class="trie-level">
                <div class="trie-node">a</div>
                <div class="trie-node">e</div>
                <div class="trie-node">a</div>
                <div class="trie-node">a</div>
            </div>
            <div class="trie-connector">↓</div>
            <div class="trie-level">
                <div class="trie-node">t</div>
                <div class="trie-node word-end">a*</div>
                <div class="trie-node word-end">t*</div>
                <div class="trie-node">i</div>
            </div>
            <div class="trie-connector">↓</div>
            <div class="trie-level">
                <div class="trie-node word-end">h*</div>
                <div class="trie-node word-end">n*</div>
            </div>
        </div>
    </div>

    <div class="dfs-traces">
        <div class="trace-box">
            <div class="trace-title">DFS from 'o'(0,0)</div>
            <div class="trace-path">o → a → t → h</div>
            <div class="trace-result success">Found "oath" ✓</div>
        </div>
        <div class="trace-box">
            <div class="trace-title">DFS from 'e'(1,0)</div>
            <div class="trace-path">e → a → t</div>
            <div class="trace-result success">Found "eat" ✓</div>
        </div>
    </div>

    <div class="key-insight">
        <div class="insight-title">🔑 Why Trie?</div>
        <div class="insight-content">Prunes invalid paths early. Without Trie: O(W × m × n × 4^L). With Trie: shared prefix traversal!</div>
    </div>
</div>`,
            timeComplexity: "O(m × n × 4^L + W×L)",
            spaceComplexity: "O(W × L) for Trie",
            code: `class Solution {
    struct TrieNode {
        TrieNode* children[26] = {};
        string* word = nullptr;  // Store word at end node
    };
    
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        // Build Trie
        TrieNode* root = new TrieNode();
        for (string& word : words) {
            TrieNode* node = root;
            for (char c : word) {
                int idx = c - 'a';
                if (!node->children[idx]) {
                    node->children[idx] = new TrieNode();
                }
                node = node->children[idx];
            }
            node->word = &word;
        }
        
        vector<string> result;
        int m = board.size(), n = board[0].size();
        
        // DFS from each cell
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return result;
    }
    
private:
    void dfs(vector<vector<char>>& board, int row, int col,
             TrieNode* node, vector<string>& result) {
        // Boundary check
        if (row < 0 || row >= board.size() || 
            col < 0 || col >= board[0].size()) {
            return;
        }
        
        char c = board[row][col];
        
        // Already visited or no Trie path
        if (c == '#' || !node->children[c - 'a']) {
            return;
        }
        
        node = node->children[c - 'a'];
        
        // Found a word
        if (node->word) {
            result.push_back(*node->word);
            node->word = nullptr;  // Avoid duplicates
        }
        
        // Mark visited
        board[row][col] = '#';
        
        // Explore 4 directions
        dfs(board, row + 1, col, node, result);
        dfs(board, row - 1, col, node, result);
        dfs(board, row, col + 1, node, result);
        dfs(board, row, col - 1, node, result);
        
        // Backtrack
        board[row][col] = c;
    }
};`
        }
    ]
};
