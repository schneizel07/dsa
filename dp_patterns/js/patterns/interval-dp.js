window.intervalDpPattern = {
    id: "interval-dp",
    title: "Interval/Range DP",
    description: "Dynamic programming on intervals where optimal solutions for larger intervals depend on smaller subintervals",
    patterns: [
        {
            title: "Minimum Falling Path Sum II",
            description: "Minimum path sum where adjacent rows can't have same column",
            intuition: `
                <h4>Core Insight</h4>
                <p>Track the <strong>two smallest values</strong> in each row. For the next row, 
                use the smallest unless same column, then use second smallest.</p>
                
                <div class="visualization-container">
                    <h4>Two Minimum Technique</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Naive O(n³)</h5>
                            <p>For each cell, scan entire previous row</p>
                            <p>Skip same column</p>
                        </div>
                        <div class="approach-card current">
                            <h5>Optimized O(n²)</h5>
                            <p>Track min1, min2, min1_idx</p>
                            <p>If same column: use min2, else min1</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">For column j in row i</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">prev = (j == min1_idx) ? min2 : min1</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>For each row:</strong> Track min1, min2, min1_idx</li>
                    <li><strong>For each cell:</strong> Add min1 unless same column as min1</li>
                    <li><strong>Update:</strong> New min1, min2 for current row</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>Col 0</th><th>Col 1</th><th>Col 2</th></tr>
                        <tr><td>Grid</td><td>1</td><td>2</td><td>3</td></tr>
                        <tr><td></td><td>4</td><td>5</td><td>6</td></tr>
                        <tr><td></td><td>7</td><td>8</td><td>9</td></tr>
                    </table>
                    <p>Row 0: min1=1 (col 0), min2=2</p>
                    <p>Row 1: col 0 uses min2=2 → 4+2=6, others use min1=1 → 5+1=6, 6+1=7</p>
                    <p>Row 1: min1=6 (col 0 or 1), min2=7</p>
                    <p>Row 2: Final min = 7+6 = <span class="highlight">13</span></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n²)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        int min1 = 0, min2 = 0, min1Idx = -1;
        
        for (int i = 0; i < n; i++) {
            int newMin1 = INT_MAX, newMin2 = INT_MAX, newMin1Idx = -1;
            
            for (int j = 0; j < n; j++) {
                // Use min2 if same column as min1
                int prevMin = (j == min1Idx) ? min2 : min1;
                int val = grid[i][j] + prevMin;
                
                if (val < newMin1) {
                    newMin2 = newMin1;
                    newMin1 = val;
                    newMin1Idx = j;
                } else if (val < newMin2) {
                    newMin2 = val;
                }
            }
            
            min1 = newMin1;
            min2 = newMin2;
            min1Idx = newMin1Idx;
        }
        
        return min1;
    }
};`
        },
        {
            title: "Burst Balloons",
            description: "Maximum coins from bursting all balloons",
            intuition: `
                <h4>Core Insight</h4>
                <p>Think <strong>backwards</strong>! Instead of which balloon to burst first, 
                think which balloon to burst <strong>last</strong> in a range. That balloon creates two independent subproblems.</p>
                
                <div class="visualization-container">
                    <h4>Why Think Backwards?</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Forward (Hard)</h5>
                            <p>Bursting changes neighbors</p>
                            <p>Subproblems overlap awkwardly</p>
                        </div>
                        <div class="approach-card current">
                            <h5>Backward (Easy) ✓</h5>
                            <p>Last balloon in range: neighbors are fixed!</p>
                            <p>Clean partition into left/right subproblems</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = max coins bursting all in (i, j)</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Last balloon k: dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]</div>
                </div>
            `,
            approach: `
                <h4>Interval DP</h4>
                <ol>
                    <li><strong>Pad array:</strong> Add 1 at both ends for boundary conditions</li>
                    <li><strong>State:</strong> dp[i][j] = max coins from balloons in open interval (i, j)</li>
                    <li><strong>Transition:</strong> Try each k as last balloon to burst in range</li>
                    <li><strong>Order:</strong> Process by increasing interval length</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: [3, 1, 5, 8]</h4>
                    <p>Padded: [1, 3, 1, 5, 8, 1]</p>
                    <table class="complexity-table">
                        <tr><th>Interval</th><th>Last balloon</th><th>Coins</th></tr>
                        <tr><td>(0,2)</td><td>1 (value 3)</td><td>1×3×1 = 3</td></tr>
                        <tr><td>(1,3)</td><td>2 (value 1)</td><td>3×1×5 = 15</td></tr>
                        <tr><td>...</td><td>...</td><td>...</td></tr>
                        <tr><td class="highlight">(0,5)</td><td>3 (value 5)</td><td class="highlight">167</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n³)</li>
                    <li><strong>Space:</strong> O(n²)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        
        // Pad with 1s at boundaries
        vector<int> arr(n + 2, 1);
        for (int i = 0; i < n; i++) {
            arr[i + 1] = nums[i];
        }
        
        // dp[i][j] = max coins from bursting balloons in (i, j) exclusive
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        
        // Process by interval length
        for (int len = 2; len <= n + 1; len++) {
            for (int i = 0; i + len <= n + 1; i++) {
                int j = i + len;
                
                // Try each balloon as the LAST one to burst in (i, j)
                for (int k = i + 1; k < j; k++) {
                    int coins = dp[i][k] + arr[i] * arr[k] * arr[j] + dp[k][j];
                    dp[i][j] = max(dp[i][j], coins);
                }
            }
        }
        
        return dp[0][n + 1];
    }
};`
        },
        {
            title: "Minimum Cost to Merge Stones",
            description: "Merge k consecutive piles at a time until one pile remains",
            intuition: `
                <h4>Core Insight</h4>
                <p>Can only merge k consecutive piles into 1. Final merge requires exactly k piles.
                After any sequence of merges, (n - 1) must be divisible by (k - 1).</p>
                
                <div class="visualization-container">
                    <h4>Merge Constraint</h4>
                    <div class="dp-table">
                        <div class="dp-cell">n piles</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell">n-k+1 piles</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell">...</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell highlight">1 pile</div>
                    </div>
                    <p><em>Each merge: k piles → 1 pile (reduce by k-1)</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">Valid if (n-1) % (k-1) == 0</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = min cost to merge [i,j] into minimum possible piles</div>
                </div>
            `,
            approach: `
                <h4>Interval DP with k-constraint</h4>
                <ol>
                    <li><strong>Check validity:</strong> (n-1) % (k-1) must be 0</li>
                    <li><strong>State:</strong> dp[i][j] = min cost to merge piles i to j as much as possible</li>
                    <li><strong>Transition:</strong> Try split points at intervals of k-1</li>
                    <li><strong>Final merge:</strong> If interval can become 1 pile, add prefix sum</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>When to Add Merge Cost?</h4>
                    <p>Add prefix[j+1]-prefix[i] only when (j-i) % (k-1) == 0</p>
                    <p>This means interval [i,j] reduces to exactly 1 pile</p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n³/k)</li>
                    <li><strong>Space:</strong> O(n²)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        
        // Check if merging is possible
        if ((n - 1) % (k - 1) != 0) return -1;
        
        // Prefix sums for range sum queries
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + stones[i];
        }
        
        // dp[i][j] = min cost to merge stones[i..j] into minimum piles
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        // Process by interval length
        for (int len = k; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                
                // Try split points (must leave valid pile counts)
                for (int m = i; m < j; m += k - 1) {
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                
                // If this interval becomes exactly 1 pile, add merge cost
                if ((j - i) % (k - 1) == 0) {
                    dp[i][j] += prefix[j + 1] - prefix[i];
                }
            }
        }
        
        return dp[0][n - 1];
    }
};`
        },
        {
            title: "Palindrome Partitioning II",
            description: "Minimum cuts to partition string into palindromes",
            intuition: `
                <h4>Core Insight</h4>
                <p>Two-phase DP: First precompute which substrings are palindromes, 
                then find minimum cuts using these.</p>
                
                <div class="visualization-container">
                    <h4>Two DP Tables</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>isPalin[i][j]</h5>
                            <p>Is s[i..j] a palindrome?</p>
                            <p>Expand from center or DP</p>
                        </div>
                        <div class="approach-card">
                            <h5>dp[i]</h5>
                            <p>Min cuts for s[0..i]</p>
                            <p>Try each valid partition</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">If s[j..i] is palindrome</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i] = min(dp[i], dp[j-1] + 1)</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Build isPalin:</strong> isPalin[i][j] = (s[i]==s[j]) && isPalin[i+1][j-1]</li>
                    <li><strong>Build dp:</strong> dp[i] = min cuts for s[0..i]</li>
                    <li><strong>Transition:</strong> For each j where s[j..i] is palindrome, dp[i] = min(dp[j-1]+1)</li>
                    <li><strong>Special case:</strong> If s[0..i] is palindrome, dp[i] = 0</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: "aab"</h4>
                    <table class="complexity-table">
                        <tr><th>i</th><th>s[0..i]</th><th>Valid partitions</th><th>dp[i]</th></tr>
                        <tr><td>0</td><td>"a"</td><td>"a"</td><td>0</td></tr>
                        <tr><td>1</td><td>"aa"</td><td>"aa" or "a|a"</td><td>0</td></tr>
                        <tr><td>2</td><td>"aab"</td><td>"aa|b" or "a|a|b"</td><td class="highlight">1</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n²)</li>
                    <li><strong>Space:</strong> O(n²) for isPalin, O(n) for dp</li>
                </ul>
            `,
            code: `class Solution {
public:
    int minCut(string s) {
        int n = s.length();
        
        // Precompute palindrome table
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPalin[i + 1][j - 1])) {
                    isPalin[i][j] = true;
                }
            }
        }
        
        // dp[i] = min cuts for s[0..i]
        vector<int> dp(n, INT_MAX);
        
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) {
                dp[i] = 0;  // Entire prefix is palindrome
            } else {
                for (int j = 1; j <= i; j++) {
                    if (isPalin[j][i]) {
                        dp[i] = min(dp[i], dp[j - 1] + 1);
                    }
                }
            }
        }
        
        return dp[n - 1];
    }
};`
        },
        {
            title: "Strange Printer",
            description: "Minimum turns to print a string (printer can print same char sequence)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Printer prints a sequence of same characters. Think about <strong>first character</strong> 
                of a range: it can be printed alone or extended to match later occurrences.</p>
                
                <div class="visualization-container">
                    <h4>Printing Strategy</h4>
                    <div class="dp-table">
                        <div class="dp-cell">String: "aba"</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">Option 1: "aaa" then "b" at [1] → 2 turns</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">vs printing "a", "b", "a" → 3 turns</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = min turns for s[i..j]</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">If s[i]==s[k], combine first char's print with k's range</div>
                </div>
            `,
            approach: `
                <h4>Interval DP</h4>
                <ol>
                    <li><strong>Base:</strong> dp[i][i] = 1 (single char needs 1 turn)</li>
                    <li><strong>Default:</strong> dp[i][j] = 1 + dp[i+1][j] (print s[i] alone)</li>
                    <li><strong>Optimization:</strong> If s[i] == s[k] for some k > i, merge prints</li>
                    <li><strong>Formula:</strong> dp[i][j] = min(dp[i][k-1] + dp[k][j]) where s[i]==s[k]</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: "aba"</h4>
                    <table class="complexity-table">
                        <tr><th>Range</th><th>String</th><th>Min turns</th></tr>
                        <tr><td>[0,0]</td><td>"a"</td><td>1</td></tr>
                        <tr><td>[1,1]</td><td>"b"</td><td>1</td></tr>
                        <tr><td>[2,2]</td><td>"a"</td><td>1</td></tr>
                        <tr><td>[0,1]</td><td>"ab"</td><td>2</td></tr>
                        <tr><td>[1,2]</td><td>"ba"</td><td>2</td></tr>
                        <tr><td class="highlight">[0,2]</td><td>"aba"</td><td class="highlight">2</td></tr>
                    </table>
                    <p><em>Print "aaa" (1 turn), then "b" at [1] (1 turn) = 2 turns</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n³)</li>
                    <li><strong>Space:</strong> O(n²)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int strangePrinter(string s) {
        int n = s.length();
        if (n == 0) return 0;
        
        // Remove consecutive duplicates (optimization)
        string t;
        for (char c : s) {
            if (t.empty() || t.back() != c) {
                t += c;
            }
        }
        
        int m = t.length();
        vector<vector<int>> dp(m, vector<int>(m, 0));
        
        // Base case: single character
        for (int i = 0; i < m; i++) {
            dp[i][i] = 1;
        }
        
        // Fill by increasing interval length
        for (int len = 2; len <= m; len++) {
            for (int i = 0; i + len - 1 < m; i++) {
                int j = i + len - 1;
                
                // Default: print t[i] alone, then handle rest
                dp[i][j] = 1 + dp[i + 1][j];
                
                // Try to merge t[i]'s print with some t[k] where t[i] == t[k]
                for (int k = i + 1; k <= j; k++) {
                    if (t[i] == t[k]) {
                        // Print t[i..k-1] then t[k..j], merging first char of each
                        int cost = dp[i][k - 1] + dp[k][j];
                        dp[i][j] = min(dp[i][j], cost);
                    }
                }
            }
        }
        
        return dp[0][m - 1];
    }
};`
        }
    ]
};
