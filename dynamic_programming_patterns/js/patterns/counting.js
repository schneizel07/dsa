// ==========================================
// COUNTING PROBLEMS PATTERN
// Unique Paths II, Unique Paths III, Distinct Subsequences, Count Different Palindromic, Count Numbers Unique Digits, Count Smaller Numbers After Self
// ==========================================

window.patterns['counting'] = {
    title: "Counting Problems",
    scenario: "Problems that ask for the count of ways, arrangements, or valid configurations. These typically use DP to count rather than find optimal values, with transitions adding up possibilities.",
    clue: "Look for: 'count the number of ways', 'how many', permutation/combination problems, counting paths with constraints, or problems where you accumulate counts from subproblems.",
    problems: [
        {
            title: "63. Unique Paths II",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/unique-paths-ii/",
            description: "A robot is at the top-left corner of an m x n grid. Some cells are obstacles. Count unique paths to bottom-right corner (can only move right or down).",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🤖 Unique Paths with Obstacles</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Grid (1=obstacle):</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell blocked">1</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell current">0</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">DP Table (paths):</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell blocked">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell current">2</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">
                            dp[i][j] = 0 if obstacle<br>
                            dp[i][j] = dp[i-1][j] + dp[i][j-1] otherwise
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Obstacle cell has 0 paths through it</p>
                            <p>• First row/col: 0 after first obstacle encountered</p>
                            <p>• Normal cells: sum paths from top and left</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Unique Paths</div>
                        <div class="result-value">2 paths</div>
                    </div>
                </div>
            `,
            approach: "Similar to Unique Paths I but set dp[i][j] = 0 for obstacles. First row/column gets 0 after any obstacle. Other cells sum paths from top and left.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        if (grid[0][0] == 1) return 0;
        
        vector<long> dp(n, 0);
        dp[0] = 1;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j-1];
                }
            }
        }
        return dp[n-1];
    }
};`
        },
        {
            title: "980. Unique Paths III",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/unique-paths-iii/",
            description: "On a 2D grid: 1 = starting square, 2 = ending square, 0 = empty squares (must walk over), -1 = obstacles. Return the number of 4-directional walks that visit every non-obstacle square exactly once.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🗺️ Unique Paths III - Visit All Cells</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Grid:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(4, 1fr);">
                                <div class="grid-cell path" style="background: #22c55e;">1</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell current" style="background: #ef4444;">2</div>
                                <div class="grid-cell blocked">-1</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">One Valid Path:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(4, 1fr);">
                                <div class="grid-cell" style="background: #22c55e;">①</div>
                                <div class="grid-cell highlight">②</div>
                                <div class="grid-cell highlight">③</div>
                                <div class="grid-cell highlight">④</div>
                                <div class="grid-cell highlight">⑩</div>
                                <div class="grid-cell highlight">⑨</div>
                                <div class="grid-cell highlight">⑧</div>
                                <div class="grid-cell highlight">⑤</div>
                                <div class="grid-cell highlight">⑪</div>
                                <div class="grid-cell highlight">⑫</div>
                                <div class="grid-cell" style="background: #ef4444;">⑬</div>
                                <div class="grid-cell blocked">X</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Approach</div>
                        <div class="recurrence-formula">
                            Backtracking with bitmask to track visited cells<br>
                            Count paths that visit ALL empty cells before reaching end
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Count empty cells first (need to visit all of them)</p>
                            <p>• Use DFS/backtracking from start cell</p>
                            <p>• Valid path reaches end after visiting all empty cells</p>
                            <p>• 4 directions: up, down, left, right</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Unique Paths</div>
                        <div class="result-value">2 paths that visit all cells</div>
                    </div>
                </div>
            `,
            approach: "Backtracking with cell counting. First, count empty cells (need to visit all). DFS from start, mark cells visited, count paths that reach end after visiting exactly all empty cells. Backtrack to explore all possibilities.",
            timeComplexity: "O(4^(m×n)) - exponential due to backtracking",
            spaceComplexity: "O(m × n) for recursion stack",
            code: `class Solution {
public:
    int rows, cols, emptyCount;
    int result = 0;
    
    int uniquePathsIII(vector<vector<int>>& grid) {
        rows = grid.size();
        cols = grid[0].size();
        emptyCount = 0;
        int startR, startC;
        
        // Find start and count empty cells
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    startR = i;
                    startC = j;
                } else if (grid[i][j] == 0) {
                    emptyCount++;
                }
            }
        }
        
        dfs(grid, startR, startC, 0);
        return result;
    }
    
    void dfs(vector<vector<int>>& grid, int r, int c, int visited) {
        // Out of bounds or obstacle
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == -1) {
            return;
        }
        
        // Reached end - check if all empty cells visited
        if (grid[r][c] == 2) {
            if (visited == emptyCount) {
                result++;
            }
            return;
        }
        
        // Mark current cell as visited (obstacle)
        int temp = grid[r][c];
        grid[r][c] = -1;
        int newVisited = visited + (temp == 0 ? 1 : 0);
        
        // Explore 4 directions
        dfs(grid, r + 1, c, newVisited);
        dfs(grid, r - 1, c, newVisited);
        dfs(grid, r, c + 1, newVisited);
        dfs(grid, r, c - 1, newVisited);
        
        // Backtrack
        grid[r][c] = temp;
    }
};`
        },
        {
            title: "115. Distinct Subsequences",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/distinct-subsequences/",
            description: "Given strings s and t, return the number of distinct subsequences of s which equals t.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔤 Distinct Subsequences: s="rabbbit", t="rabbit"</div>
                    
                    <div class="subsequence-visual">
                        <div class="seq-char match">r</div>
                        <div class="seq-char match">a</div>
                        <div class="seq-char match">b</div>
                        <div class="seq-char match">b</div>
                        <div class="seq-char">b</div>
                        <div class="seq-char match">i</div>
                        <div class="seq-char match">t</div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th></th>
                                <th>""</th>
                                <th>r</th>
                                <th>a</th>
                                <th>b</th>
                                <th>b</th>
                                <th>i</th>
                                <th>t</th>
                            </tr>
                            <tr>
                                <th>""</th>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>r</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>a</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>b</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>b</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">3</td>
                            </tr>
                            <tr>
                                <th>i</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">3</td>
                            </tr>
                            <tr>
                                <th>t</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell current">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">
                            if s[j] == t[i]: dp[i][j] = dp[i-1][j-1] + dp[i][j-1]<br>
                            else: dp[i][j] = dp[i][j-1]
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Distinct Subsequences</div>
                        <div class="result-value">3 ways to form "rabbit" from "rabbbit"</div>
                    </div>
                </div>
            `,
            approach: "2D DP where dp[i][j] = ways to form t[0..i] from s[0..j]. If chars match, we can either use the char or skip it. If no match, we must skip the char in s.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m)",
            code: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<unsigned long> dp(n + 1, 0);
        dp[0] = 1; // Empty t can be formed from any prefix
        
        for (int i = 0; i < m; i++) {
            // Process in reverse to avoid overwriting needed values
            for (int j = n - 1; j >= 0; j--) {
                if (s[i] == t[j]) {
                    dp[j + 1] += dp[j];
                }
            }
        }
        return dp[n];
    }
};`
        },
        {
            title: "730. Count Different Palindromic Subsequences",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/count-different-palindromic-subsequences/",
            description: "Given a string s, return the count of different non-empty palindromic subsequences. Answer modulo 10^9 + 7.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔄 Palindromic Subsequences: "bccb"</div>
                    
                    <div class="subsequence-visual">
                        <div class="seq-char match">b</div>
                        <div class="seq-char current">c</div>
                        <div class="seq-char current">c</div>
                        <div class="seq-char match">b</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">📋 Palindromic Subsequences</div>
                        <div class="insight-content">
                            <p>• Single chars: 'b', 'c' (2)</p>
                            <p>• Length 2: 'bb', 'cc' (2)</p>
                            <p>• Length 3: 'bcb', 'cbc' (2 - wait, no 'cbc'!)</p>
                            <p>• Length 4: 'bccb' (1)</p>
                            <p>• Total: b, c, bb, cc, bcb, bccb = 6</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Key Idea</div>
                        <div class="recurrence-formula">
                            For range [i,j], count palindromes starting/ending with each char 'a'-'d'
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <div class="approach-title">State</div>
                            <div class="approach-detail">dp[len][i] = count for range starting at i</div>
                        </div>
                        <div class="approach-card">
                            <div class="approach-title">Transition</div>
                            <div class="approach-detail">Find matching chars at ends, recurse inside</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Different Palindromic Subsequences</div>
                        <div class="result-value">6</div>
                    </div>
                </div>
            `,
            approach: "Interval DP. For range [i,j], find leftmost and rightmost occurrence of each character. Count palindromes that start/end with that character by recursing on the inside range.",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int countPalindromicSubsequences(string s) {
        int n = s.size();
        const int MOD = 1e9 + 7;
        vector<vector<long>> dp(n, vector<long>(n, 0));
        
        // Base case: single characters
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                
                if (s[i] != s[j]) {
                    dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1];
                } else {
                    int lo = i + 1, hi = j - 1;
                    while (lo <= hi && s[lo] != s[i]) lo++;
                    while (lo <= hi && s[hi] != s[i]) hi--;
                    
                    if (lo > hi) {
                        // No matching char inside
                        dp[i][j] = dp[i+1][j-1] * 2 + 2;
                    } else if (lo == hi) {
                        // One matching char inside
                        dp[i][j] = dp[i+1][j-1] * 2 + 1;
                    } else {
                        // Multiple matching chars inside
                        dp[i][j] = dp[i+1][j-1] * 2 - dp[lo+1][hi-1];
                    }
                }
                dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD;
            }
        }
        return dp[0][n-1];
    }
};`
        },
        {
            title: "357. Count Numbers with Unique Digits",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/count-numbers-with-unique-digits/",
            description: "Given n, count all numbers x where 0 ≤ x < 10^n with all unique digits.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔢 Count Numbers with Unique Digits (n=2)</div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Counting Logic</div>
                        <div class="insight-content">
                            <p>• n=0: just [0] → 1</p>
                            <p>• n=1: [0-9] → 10</p>
                            <p>• n=2: 10 + (9 choices for 1st digit) × (9 choices for 2nd) = 10 + 81 = 91</p>
                            <p>• n=3: 91 + 9 × 9 × 8 = 91 + 648 = 739</p>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Digits</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <td>New Count</td>
                                <td class="dp-cell">9</td>
                                <td class="dp-cell highlight">81</td>
                                <td class="dp-cell">648</td>
                                <td class="dp-cell">4536</td>
                            </tr>
                            <tr>
                                <td>Formula</td>
                                <td class="dp-cell">9</td>
                                <td class="dp-cell">9×9</td>
                                <td class="dp-cell">9×9×8</td>
                                <td class="dp-cell">9×9×8×7</td>
                            </tr>
                            <tr>
                                <td>Cumulative</td>
                                <td class="dp-cell">10</td>
                                <td class="dp-cell current">91</td>
                                <td class="dp-cell">739</td>
                                <td class="dp-cell">5275</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Pattern</div>
                        <div class="recurrence-formula">
                            uniqueDigits(k) = 9 × 9 × 8 × 7 × ... (k terms, first is 9 not 10 to avoid leading 0)
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Count for n=2</div>
                        <div class="result-value">91 numbers (0-99 with unique digits)</div>
                    </div>
                </div>
            `,
            approach: "For k-digit numbers: first digit has 9 choices (1-9), second has 9 (0-9 except first), third has 8, etc. Sum counts for all lengths from 0 to n.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        
        int result = 10; // n=1: 0-9
        int uniqueDigits = 9; // First digit choices (can't be 0)
        int available = 9;   // Remaining digit choices
        
        for (int i = 2; i <= n && available > 0; i++) {
            uniqueDigits *= available;
            result += uniqueDigits;
            available--;
        }
        return result;
    }
};`
        },
        {
            title: "315. Count of Smaller Numbers After Self",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
            description: "Given array nums, return counts where counts[i] is the number of smaller elements to the right of nums[i].",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📉 Count Smaller After Self: [5, 2, 6, 1]</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <td>Count</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell current">0</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• For 5: elements to right {2,6,1}, smaller = {2,1} → count = 2</p>
                            <p>• For 2: elements to right {6,1}, smaller = {1} → count = 1</p>
                            <p>• For 6: elements to right {1}, smaller = {1} → count = 1</p>
                            <p>• For 1: no elements to right → count = 0</p>
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card naive">
                            <div class="approach-title">❌ Brute Force</div>
                            <div class="approach-detail">O(n²) - check all pairs</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">✅ Merge Sort</div>
                            <div class="approach-detail">O(n log n) - count inversions</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">✅ BIT/Fenwick</div>
                            <div class="approach-detail">O(n log n) - process right to left</div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Merge Sort Approach</div>
                        <div class="recurrence-formula">
                            During merge, when element from right half is placed before left half element, increment count for left element
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Smaller Counts</div>
                        <div class="result-value">[2, 1, 1, 0]</div>
                    </div>
                </div>
            `,
            approach: "Use modified merge sort tracking indices. When merging, if right element comes first, it's smaller than remaining left elements - count this. Alternative: BIT with coordinate compression.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n, 0);
        vector<pair<int, int>> arr(n); // {value, original index}
        
        for (int i = 0; i < n; i++) {
            arr[i] = {nums[i], i};
        }
        
        mergeSort(arr, result, 0, n - 1);
        return result;
    }
    
    void mergeSort(vector<pair<int,int>>& arr, vector<int>& result, int lo, int hi) {
        if (lo >= hi) return;
        
        int mid = lo + (hi - lo) / 2;
        mergeSort(arr, result, lo, mid);
        mergeSort(arr, result, mid + 1, hi);
        
        // Merge and count
        vector<pair<int,int>> temp;
        int i = lo, j = mid + 1;
        int rightCount = 0;
        
        while (i <= mid && j <= hi) {
            if (arr[j].first < arr[i].first) {
                rightCount++;
                temp.push_back(arr[j++]);
            } else {
                result[arr[i].second] += rightCount;
                temp.push_back(arr[i++]);
            }
        }
        
        while (i <= mid) {
            result[arr[i].second] += rightCount;
            temp.push_back(arr[i++]);
        }
        while (j <= hi) {
            temp.push_back(arr[j++]);
        }
        
        for (int k = lo; k <= hi; k++) {
            arr[k] = temp[k - lo];
        }
    }
};`
        }
    ]
};
