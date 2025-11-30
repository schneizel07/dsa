// ==========================================
// INTERVAL/RANGE DP PATTERN
// Min Falling Path, Burst Balloons, Partition Equal Subset Sum, Strange Printer, Max Vacation Days
// ==========================================

window.patterns['interval-range'] = {
    title: "Interval/Range DP",
    scenario: "Problems that involve making decisions over intervals or ranges, where the solution depends on how you split or process the range. Often involves merging or splitting intervals optimally.",
    clue: "Look for: problems involving ranges/intervals, decisions about where to split, matrix chain-like multiplication, palindrome problems, or problems where you process from smaller ranges to larger ones.",
    problems: [
        {
            title: "931. Minimum Falling Path Sum",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/minimum-falling-path-sum/",
            description: "Find the minimum sum of a falling path through a square matrix. A falling path starts at any element in the first row and moves to an adjacent element in the next row.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⬇️ Minimum Falling Path: [[2,1,3],[6,5,4],[7,8,9]]</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Input Matrix:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">2</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">6</div>
                                <div class="grid-cell path">5</div>
                                <div class="grid-cell">4</div>
                                <div class="grid-cell path">7</div>
                                <div class="grid-cell">8</div>
                                <div class="grid-cell">9</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">DP Table:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">2</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">7</div>
                                <div class="grid-cell">6</div>
                                <div class="grid-cell">5</div>
                                <div class="grid-cell current">13</div>
                                <div class="grid-cell">14</div>
                                <div class="grid-cell">13</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i][j] = matrix[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Each cell can receive from up to 3 cells above it</p>
                            <p>• Handle edge cases for leftmost/rightmost columns</p>
                            <p>• Answer is minimum in the last row</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Falling Path Sum</div>
                        <div class="result-value">13 (path: 1 → 5 → 7)</div>
                    </div>
                </div>
            `,
            approach: "Process row by row. Each cell stores minimum sum to reach it. Can come from 3 directions above (diagonal left, straight, diagonal right). Answer is minimum of last row.",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> dp = matrix[0];
        
        for (int i = 1; i < n; i++) {
            vector<int> newDp(n);
            for (int j = 0; j < n; j++) {
                int minAbove = dp[j];
                if (j > 0) minAbove = min(minAbove, dp[j-1]);
                if (j < n-1) minAbove = min(minAbove, dp[j+1]);
                newDp[j] = matrix[i][j] + minAbove;
            }
            dp = newDp;
        }
        return *min_element(dp.begin(), dp.end());
    }
};`
        },
        {
            title: "312. Burst Balloons",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/burst-balloons/",
            description: "Given n balloons with numbers on them, burst all and collect maximum coins. When balloon i is burst, you get nums[i-1] * nums[i] * nums[i+1] coins.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎈 Burst Balloons: [3, 1, 5, 8]</div>
                    
                    <div class="state-flow">
                        <div class="state-box">[1]</div>
                        <div class="state-box active">3</div>
                        <div class="state-box">1</div>
                        <div class="state-box">5</div>
                        <div class="state-box">8</div>
                        <div class="state-box active">[1]</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Added virtual balloons [1] at boundaries</p>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>i\\j</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">30</td>
                                <td class="dp-cell">159</td>
                                <td class="dp-cell current">167</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">15</td>
                                <td class="dp-cell">135</td>
                                <td class="dp-cell highlight">159</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">40</td>
                                <td class="dp-cell">48</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">40</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Key Idea: Last balloon to burst in range</div>
                        <div class="recurrence-formula">dp[i][j] = max(dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Think in reverse: which balloon is LAST to burst in range?</p>
                            <p>• If k is last, it's adjacent to boundary balloons i-1 and j+1</p>
                            <p>• Left and right subproblems become independent</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Coins</div>
                        <div class="result-value">167</div>
                    </div>
                </div>
            `,
            approach: "Classic interval DP. For each range [i,j], try each balloon k as the LAST to burst. This makes subproblems independent. Add virtual balloons with value 1 at boundaries.",
            timeComplexity: "O(n³)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        // Add boundary balloons
        vector<int> arr(n + 2, 1);
        for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
        
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        
        // len is the length of range
        for (int len = 1; len <= n; len++) {
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                // k is the last balloon to burst in range [i, j]
                for (int k = i; k <= j; k++) {
                    dp[i][j] = max(dp[i][j], 
                        dp[i][k-1] + arr[i-1] * arr[k] * arr[j+1] + dp[k+1][j]);
                }
            }
        }
        return dp[1][n];
    }
};`
        },
        {
            title: "416. Partition Equal Subset Sum",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/partition-equal-subset-sum/",
            description: "Determine if you can partition the array into two subsets with equal sum.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⚖️ Partition: [1, 5, 11, 5]</div>
                    
                    <div class="state-flow">
                        <div class="state-box success">1</div>
                        <div class="state-box success">5</div>
                        <div class="state-box active">11</div>
                        <div class="state-box success">5</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Total = 22, Target = 11</p>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Sum</th>
                                <th>0</th>
                                <th>1</th>
                                <th>5</th>
                                <th>6</th>
                                <th>10</th>
                                <th>11</th>
                            </tr>
                            <tr>
                                <td>Possible?</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell current">✓</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">0/1 Knapsack Pattern</div>
                        <div class="recurrence-formula">dp[j] = dp[j] || dp[j - nums[i]]</div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <div class="approach-title">Subset 1</div>
                            <div class="approach-detail">[1, 5, 5]</div>
                            <div class="approach-detail">Sum = 11</div>
                        </div>
                        <div class="approach-card">
                            <div class="approach-title">Subset 2</div>
                            <div class="approach-detail">[11]</div>
                            <div class="approach-detail">Sum = 11</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Can Partition?</div>
                        <div class="result-value">True ✓</div>
                    </div>
                </div>
            `,
            approach: "If total sum is odd, impossible. Otherwise find if subset with sum = total/2 exists. Use 1D DP where dp[j] = true if sum j is achievable. Process in reverse to avoid reusing elements.",
            timeComplexity: "O(n × sum)",
            spaceComplexity: "O(sum)",
            code: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % 2 != 0) return false;
        
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int num : nums) {
            // Process in reverse to avoid using same element twice
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
};`
        },
        {
            title: "664. Strange Printer",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/strange-printer/",
            description: "A strange printer can only print a sequence of the same character each time. Find minimum turns to print a string.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🖨️ Strange Printer: "aba"</div>
                    
                    <div class="transition-diagram">
                        <div class="transition-row">
                            <div class="transition-node">Turn 1: "aaa"</div>
                            <span class="transition-arrow">→</span>
                            <div class="transition-node">Turn 2: "aba"</div>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>i\\j</th>
                                <th>a(0)</th>
                                <th>b(1)</th>
                                <th>a(2)</th>
                            </tr>
                            <tr>
                                <th>a(0)</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell current">2</td>
                            </tr>
                            <tr>
                                <th>b(1)</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>a(2)</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">1</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">
                            if s[i] == s[j]: dp[i][j] = dp[i][j-1]<br>
                            else: dp[i][j] = min(dp[i][k] + dp[k+1][j]) for k in [i, j-1]
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• If first and last chars match, can print them together</p>
                            <p>• Otherwise, try all split points and take minimum</p>
                            <p>• Base case: single char needs 1 turn</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Turns</div>
                        <div class="result-value">2 turns</div>
                    </div>
                </div>
            `,
            approach: "Interval DP where dp[i][j] = min turns to print s[i..j]. If s[i] == s[j], can print together saving one turn. Otherwise, try all partitions and minimize.",
            timeComplexity: "O(n³)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int strangePrinter(string s) {
        int n = s.size();
        if (n == 0) return 0;
        
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        // Base case: single characters
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        
        // Fill for increasing lengths
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = dp[i][j-1] + 1; // Print s[j] separately
                
                // Try merging if same character found
                for (int k = i; k < j; k++) {
                    if (s[k] == s[j]) {
                        dp[i][j] = min(dp[i][j], dp[i][k] + (k+1 <= j-1 ? dp[k+1][j-1] : 0));
                    }
                }
            }
        }
        return dp[0][n-1];
    }
};`
        },
        {
            title: "568. Maximum Vacation Days",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/maximum-vacation-days/",
            description: "Given flight connections and vacation days available in each city each week, maximize total vacation days over k weeks starting from city 0.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">✈️ Maximum Vacation Days</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Flight Matrix:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">0</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">0</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Days Matrix:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">6</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell current">3</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[week][city] = days[city][week] + max(dp[week-1][prevCity]) where flight exists</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• State: (current week, current city)</p>
                            <p>• Transition: can stay or fly to connected city</p>
                            <p>• Start from city 0 in week 0</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Vacation Days</div>
                        <div class="result-value">12 (City 2 all weeks: 1+3+3+3+3 or optimal path)</div>
                    </div>
                </div>
            `,
            approach: "DP where dp[w][c] = max vacation days up to week w ending in city c. For each week and city, check all cities you could have come from (including staying). Answer is max of all cities in last week.",
            timeComplexity: "O(n² × k)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int maxVacationDays(vector<vector<int>>& flights, vector<vector<int>>& days) {
        int n = flights.size(), k = days[0].size();
        vector<int> dp(n, INT_MIN);
        dp[0] = 0; // Start at city 0
        
        for (int week = 0; week < k; week++) {
            vector<int> newDp(n, INT_MIN);
            
            for (int curr = 0; curr < n; curr++) {
                for (int prev = 0; prev < n; prev++) {
                    // Can reach curr from prev if same city or flight exists
                    if (prev == curr || flights[prev][curr] == 1) {
                        if (dp[prev] != INT_MIN) {
                            newDp[curr] = max(newDp[curr], dp[prev] + days[curr][week]);
                        }
                    }
                }
            }
            dp = newDp;
        }
        return *max_element(dp.begin(), dp.end());
    }
};`
        }
    ]
};
