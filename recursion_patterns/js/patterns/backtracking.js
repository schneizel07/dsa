window.backtrackingPattern = {
    title: "Backtracking",
    scenario: "Explore all potential solutions to a problem by trying out different choices and backtracking when a dead-end is reached, undoing choices and trying alternative paths.",
    clue: "Problems where you need to find all permutations, combinations, or subsets of elements while satisfying specific constraints.",
    problems: [
        {
            title: "Generate Parentheses",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/generate-parentheses/",
            intuition: "Build valid parentheses strings character by character. At each step, we can add '(' if we haven't used all, or ')' if there are more '(' than ')' so far. Backtrack when we complete a valid string.",
            approach: "Use recursion with two counters: open (count of '(') and close (count of ')'). Add '(' if open < n. Add ')' if close < open. When string length is 2n, we have a valid combination.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">n = 3: Decision Tree for Parentheses Generation</div>
    
    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node root-node">"" <span class="node-info">open=0, close=0</span></div>
        </div>
        <div class="tree-connector">
            <div class="branch-line"></div>
        </div>
        <div class="tree-level">
            <div class="tree-node choice-node">"(" <span class="node-info">open=1</span></div>
            <div class="tree-node pruned-node" style="opacity: 0.4">")" <span class="node-info">❌ invalid</span></div>
        </div>
        <div class="tree-connector">
            <div class="branch-line"></div>
        </div>
        <div class="tree-level">
            <div class="tree-node choice-node">"((" <span class="node-info">open=2</span></div>
            <div class="tree-node choice-node">"()" <span class="node-info">close=1</span></div>
        </div>
        <div class="tree-connector">
            <div class="branch-line"></div>
        </div>
        <div class="tree-level">
            <div class="tree-node">"((("</div>
            <div class="tree-node">"(()"</div>
            <div class="tree-node">"()("</div>
        </div>
    </div>

    <div class="state-transition-flow">
        <div class="transition-title">Backtracking Pattern</div>
        <div class="state-row">
            <div class="state-box">
                <div class="state-label">State</div>
                <div class="state-value">(string, open, close)</div>
            </div>
            <div class="state-arrow">→</div>
            <div class="state-box highlight-box">
                <div class="state-label">Choice 1</div>
                <div class="state-value">Add '(' if open < n</div>
            </div>
            <div class="state-arrow">→</div>
            <div class="state-box highlight-box">
                <div class="state-label">Choice 2</div>
                <div class="state-value">Add ')' if close < open</div>
            </div>
        </div>
    </div>

    <div class="result-box">
        <div class="result-title">✅ Valid Results for n=3:</div>
        <div class="result-values">
            <span class="result-item">"((()))"</span>
            <span class="result-item">"(()())"</span>
            <span class="result-item">"(())()"</span>
            <span class="result-item">"()(())"</span>
            <span class="result-item">"()()()"</span>
        </div>
    </div>
</div>`,
            timeComplexity: "O(4^n / √n) - Catalan number",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        backtrack(result, current, 0, 0, n);
        return result;
    }
    
private:
    void backtrack(vector<string>& result, string& current, 
                   int open, int close, int n) {
        // Base case: valid combination complete
        if (current.length() == 2 * n) {
            result.push_back(current);
            return;
        }
        
        // Choice 1: Add '(' if we haven't used all
        if (open < n) {
            current.push_back('(');
            backtrack(result, current, open + 1, close, n);
            current.pop_back();  // Backtrack
        }
        
        // Choice 2: Add ')' if it won't make string invalid
        if (close < open) {
            current.push_back(')');
            backtrack(result, current, open, close + 1, n);
            current.pop_back();  // Backtrack
        }
    }
};`
        },
        {
            title: "Combination Sum",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/combination-sum/",
            intuition: "Find all unique combinations that sum to target. Each number can be used unlimited times. Use backtracking to explore: include current number (possibly multiple times) or skip to next.",
            approach: "Sort candidates. For each position, try including current candidate (stay at same index for unlimited use) or move to next. Backtrack when sum exceeds target. Add to result when sum equals target.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">candidates = [2,3,6,7], target = 7</div>
    
    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node root-node">[] <span class="node-info">sum=0</span></div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level">
            <div class="tree-node">[2] <span class="node-info">sum=2</span></div>
            <div class="tree-node">[3] <span class="node-info">sum=3</span></div>
            <div class="tree-node">[6] <span class="node-info">sum=6</span></div>
            <div class="tree-node success-node">[7] ✓ <span class="node-info">sum=7</span></div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level">
            <div class="tree-node">[2,2] <span class="node-info">sum=4</span></div>
            <div class="tree-node">[2,3] <span class="node-info">sum=5</span></div>
            <div class="tree-node">[3,3] <span class="node-info">sum=6</span></div>
            <div class="tree-node pruned-node">[6,6] ✗ <span class="node-info">sum=12</span></div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level">
            <div class="tree-node">[2,2,2] <span class="node-info">sum=6</span></div>
            <div class="tree-node success-node">[2,2,3] ✓ <span class="node-info">sum=7</span></div>
            <div class="tree-node pruned-node">[3,3,3] ✗ <span class="node-info">sum=9</span></div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level">
            <div class="tree-node pruned-node">[2,2,2,2] ✗ <span class="node-info">sum=8 > 7</span></div>
        </div>
    </div>

    <div class="key-insight">
        <div class="insight-title">🔑 Key Insight: Pruning</div>
        <div class="insight-content">
            <p>Sort candidates first. When candidate > remaining, skip all subsequent candidates (they're larger)</p>
            <p>Stay at same index to allow reuse: backtrack(i) not backtrack(i+1)</p>
        </div>
    </div>

    <div class="result-box">
        <div class="result-title">✅ Results:</div>
        <div class="result-values">
            <span class="result-item">[2, 2, 3]</span>
            <span class="result-item">[7]</span>
        </div>
    </div>
</div>`,
            timeComplexity: "O(n^(target/min))",
            spaceComplexity: "O(target/min)",
            code: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        sort(candidates.begin(), candidates.end());  // Sort for pruning
        backtrack(candidates, target, 0, current, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& candidates, int remaining, int start,
                   vector<int>& current, vector<vector<int>>& result) {
        // Base case: found valid combination
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        
        // Try each candidate starting from 'start'
        for (int i = start; i < candidates.size(); i++) {
            // Pruning: if current candidate > remaining, skip rest
            if (candidates[i] > remaining) break;
            
            // Include this candidate
            current.push_back(candidates[i]);
            
            // Recurse with same index (can reuse same number)
            backtrack(candidates, remaining - candidates[i], i, current, result);
            
            // Backtrack
            current.pop_back();
        }
    }
};`
        },
        {
            title: "N-Queens",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/n-queens/",
            intuition: "Place N queens on NxN board so no two attack each other. Queens attack horizontally, vertically, and diagonally. Place one queen per row and backtrack if placement leads to conflict.",
            approach: "Go row by row. For each row, try placing queen in each column. Check if placement is valid (no queen in same column or diagonals). Use sets to track occupied columns and diagonals for O(1) lookup.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">N = 4: N-Queens Solution</div>
    
    <div class="grid-visualization">
        <div class="board-container">
            <div class="board-title">One Valid Solution</div>
            <table class="chess-board">
                <tr>
                    <td class="cell light">.</td>
                    <td class="cell dark queen">♛</td>
                    <td class="cell light">.</td>
                    <td class="cell dark">.</td>
                </tr>
                <tr>
                    <td class="cell dark">.</td>
                    <td class="cell light">.</td>
                    <td class="cell dark">.</td>
                    <td class="cell light queen">♛</td>
                </tr>
                <tr>
                    <td class="cell light queen">♛</td>
                    <td class="cell dark">.</td>
                    <td class="cell light">.</td>
                    <td class="cell dark">.</td>
                </tr>
                <tr>
                    <td class="cell dark">.</td>
                    <td class="cell light">.</td>
                    <td class="cell dark queen">♛</td>
                    <td class="cell light">.</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="constraint-explanation">
        <div class="constraint-title">Diagonal Tracking Formula</div>
        <div class="formula-grid">
            <div class="formula-box">
                <div class="formula-name">Main Diagonal (↘)</div>
                <div class="formula">row - col = constant</div>
                <div class="formula-example">Q(0,1): 0-1 = -1</div>
            </div>
            <div class="formula-box">
                <div class="formula-name">Anti Diagonal (↙)</div>
                <div class="formula">row + col = constant</div>
                <div class="formula-example">Q(0,1): 0+1 = 1</div>
            </div>
        </div>
    </div>

    <div class="state-tracking">
        <div class="tracking-title">Sets to Track:</div>
        <div class="tracking-boxes">
            <div class="track-box">
                <span class="track-label">cols:</span>
                <span class="track-values">{1, 3, 0, 2}</span>
            </div>
            <div class="track-box">
                <span class="track-label">diag1 (row-col):</span>
                <span class="track-values">{-1, -2, 2, 1}</span>
            </div>
            <div class="track-box">
                <span class="track-label">diag2 (row+col):</span>
                <span class="track-values">{1, 4, 2, 5}</span>
            </div>
        </div>
    </div>
</div>`,
            timeComplexity: "O(n!)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> result;
        vector<string> board(n, string(n, '.'));
        
        // Sets to track occupied columns and diagonals
        unordered_set<int> cols;
        unordered_set<int> diag1;  // row - col
        unordered_set<int> diag2;  // row + col
        
        backtrack(result, board, 0, n, cols, diag1, diag2);
        return result;
    }
    
private:
    void backtrack(vector<vector<string>>& result, vector<string>& board,
                   int row, int n, unordered_set<int>& cols,
                   unordered_set<int>& diag1, unordered_set<int>& diag2) {
        // Base case: all queens placed
        if (row == n) {
            result.push_back(board);
            return;
        }
        
        // Try placing queen in each column
        for (int col = 0; col < n; col++) {
            // Check if position is under attack
            if (cols.count(col) || diag1.count(row - col) || 
                diag2.count(row + col)) {
                continue;
            }
            
            // Place queen
            board[row][col] = 'Q';
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            
            // Recurse to next row
            backtrack(result, board, row + 1, n, cols, diag1, diag2);
            
            // Backtrack
            board[row][col] = '.';
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
        }
    }
};`
        },
        {
            title: "Letter Combinations of a Phone Number",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            intuition: "Each digit maps to 3-4 letters. For input digits, generate all possible letter combinations. This is a Cartesian product problem - try each letter for current digit, then recurse.",
            approach: "Create digit-to-letters mapping. Use backtracking: for current digit, try each mapped letter, recurse for remaining digits, then backtrack. Base case: when we've processed all digits.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">digits = "23"</div>
    
    <div class="phone-mapping">
        <div class="mapping-title">Phone Keypad Mapping</div>
        <div class="keypad-grid">
            <div class="key-box highlight-key">2 → abc</div>
            <div class="key-box highlight-key">3 → def</div>
            <div class="key-box">4 → ghi</div>
            <div class="key-box">5 → jkl</div>
            <div class="key-box">6 → mno</div>
            <div class="key-box">7 → pqrs</div>
            <div class="key-box">8 → tuv</div>
            <div class="key-box">9 → wxyz</div>
        </div>
    </div>

    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node root-node">"" <span class="node-info">idx=0</span></div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level">
            <div class="tree-node">"a"</div>
            <div class="tree-node">"b"</div>
            <div class="tree-node">"c"</div>
        </div>
        <div class="tree-connector"><div class="branch-line"></div></div>
        <div class="tree-level tree-level-dense">
            <div class="tree-node leaf-node">"ad"</div>
            <div class="tree-node leaf-node">"ae"</div>
            <div class="tree-node leaf-node">"af"</div>
            <div class="tree-node leaf-node">"bd"</div>
            <div class="tree-node leaf-node">"be"</div>
            <div class="tree-node leaf-node">"bf"</div>
            <div class="tree-node leaf-node">"cd"</div>
            <div class="tree-node leaf-node">"ce"</div>
            <div class="tree-node leaf-node">"cf"</div>
        </div>
    </div>

    <div class="result-box">
        <div class="result-title">✅ Result (9 combinations):</div>
        <div class="result-values">
            <span class="result-item">"ad"</span>
            <span class="result-item">"ae"</span>
            <span class="result-item">"af"</span>
            <span class="result-item">"bd"</span>
            <span class="result-item">"be"</span>
            <span class="result-item">"bf"</span>
            <span class="result-item">"cd"</span>
            <span class="result-item">"ce"</span>
            <span class="result-item">"cf"</span>
        </div>
    </div>
</div>`,
            timeComplexity: "O(4^n × n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        
        // Phone keypad mapping
        vector<string> mapping = {
            "",     // 0
            "",     // 1
            "abc",  // 2
            "def",  // 3
            "ghi",  // 4
            "jkl",  // 5
            "mno",  // 6
            "pqrs", // 7
            "tuv",  // 8
            "wxyz"  // 9
        };
        
        vector<string> result;
        string current;
        backtrack(digits, 0, current, result, mapping);
        return result;
    }
    
private:
    void backtrack(const string& digits, int index, string& current,
                   vector<string>& result, const vector<string>& mapping) {
        // Base case: processed all digits
        if (index == digits.length()) {
            result.push_back(current);
            return;
        }
        
        // Get letters for current digit
        string letters = mapping[digits[index] - '0'];
        
        // Try each letter
        for (char c : letters) {
            current.push_back(c);
            backtrack(digits, index + 1, current, result, mapping);
            current.pop_back();  // Backtrack
        }
    }
    
    // Iterative BFS-style approach
    vector<string> letterCombinationsIterative(string digits) {
        if (digits.empty()) return {};
        
        vector<string> mapping = {"", "", "abc", "def", "ghi", 
                                   "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> result = {""};
        
        for (char digit : digits) {
            vector<string> temp;
            string letters = mapping[digit - '0'];
            
            for (const string& existing : result) {
                for (char c : letters) {
                    temp.push_back(existing + c);
                }
            }
            result = temp;
        }
        
        return result;
    }
};`
        },
        {
            title: "Word Search",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/word-search/",
            intuition: "Search for word in 2D grid by exploring adjacent cells. From each starting position, use DFS/backtracking to match characters. Mark visited cells to avoid reuse in same path.",
            approach: "For each cell matching first character, start DFS. Mark cell visited, try all 4 directions for next character. If word found, return true. Backtrack by unmarking cell. Optimize by checking bounds and character match early.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">word = "ABCCED"</div>
    
    <div class="grid-comparison">
        <div class="grid-panel">
            <div class="panel-title">Original Board</div>
            <table class="search-grid">
                <tr><td class="grid-cell">A</td><td class="grid-cell">B</td><td class="grid-cell">C</td><td class="grid-cell">E</td></tr>
                <tr><td class="grid-cell">S</td><td class="grid-cell">F</td><td class="grid-cell">C</td><td class="grid-cell">S</td></tr>
                <tr><td class="grid-cell">A</td><td class="grid-cell">D</td><td class="grid-cell">E</td><td class="grid-cell">E</td></tr>
            </table>
        </div>
        
        <div class="arrow-connector">→</div>
        
        <div class="grid-panel">
            <div class="panel-title">Path Found</div>
            <table class="search-grid">
                <tr><td class="grid-cell path-cell path-1">A</td><td class="grid-cell path-cell path-2">B</td><td class="grid-cell path-cell path-3">C</td><td class="grid-cell">E</td></tr>
                <tr><td class="grid-cell">S</td><td class="grid-cell">F</td><td class="grid-cell path-cell path-4">C</td><td class="grid-cell">S</td></tr>
                <tr><td class="grid-cell">A</td><td class="grid-cell path-cell path-6">D</td><td class="grid-cell path-cell path-5">E</td><td class="grid-cell">E</td></tr>
            </table>
        </div>
    </div>

    <div class="path-trace">
        <div class="trace-title">Path Trace</div>
        <div class="trace-steps">
            <div class="trace-step">
                <span class="step-num">1</span>
                <span class="step-cell">[0,0]</span>
                <span class="step-char">A</span>
            </div>
            <span class="trace-arrow">→</span>
            <div class="trace-step">
                <span class="step-num">2</span>
                <span class="step-cell">[0,1]</span>
                <span class="step-char">B</span>
            </div>
            <span class="trace-arrow">→</span>
            <div class="trace-step">
                <span class="step-num">3</span>
                <span class="step-cell">[0,2]</span>
                <span class="step-char">C</span>
            </div>
            <span class="trace-arrow">↓</span>
            <div class="trace-step">
                <span class="step-num">4</span>
                <span class="step-cell">[1,2]</span>
                <span class="step-char">C</span>
            </div>
            <span class="trace-arrow">↓</span>
            <div class="trace-step">
                <span class="step-num">5</span>
                <span class="step-cell">[2,2]</span>
                <span class="step-char">E</span>
            </div>
            <span class="trace-arrow">←</span>
            <div class="trace-step">
                <span class="step-num">6</span>
                <span class="step-cell">[2,1]</span>
                <span class="step-char">D</span>
            </div>
        </div>
    </div>

    <div class="key-insight">
        <div class="insight-title">🔑 Backtracking Technique</div>
        <div class="insight-content">
            <p><strong>Mark visited:</strong> board[row][col] = '#'</p>
            <p><strong>Restore on backtrack:</strong> board[row][col] = original_char</p>
        </div>
    </div>
</div>`,
            timeComplexity: "O(m × n × 4^L) where L = word length",
            spaceComplexity: "O(L) recursion stack",
            code: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        
        // Try starting from each cell
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (backtrack(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
private:
    bool backtrack(vector<vector<char>>& board, const string& word,
                   int row, int col, int index) {
        // Base case: all characters matched
        if (index == word.length()) return true;
        
        // Boundary and character check
        if (row < 0 || row >= board.size() || 
            col < 0 || col >= board[0].size() ||
            board[row][col] != word[index]) {
            return false;
        }
        
        // Mark as visited
        char temp = board[row][col];
        board[row][col] = '#';
        
        // Explore 4 directions
        bool found = backtrack(board, word, row + 1, col, index + 1) ||
                     backtrack(board, word, row - 1, col, index + 1) ||
                     backtrack(board, word, row, col + 1, index + 1) ||
                     backtrack(board, word, row, col - 1, index + 1);
        
        // Backtrack: restore original character
        board[row][col] = temp;
        
        return found;
    }
};`
        }
    ]
};
