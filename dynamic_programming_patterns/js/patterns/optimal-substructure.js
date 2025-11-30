// ==========================================
// OPTIMAL SUBSTRUCTURE PATTERN
// Max Subarray, LIS, Coin Change, Edit Distance, LCS
// ==========================================

window.patterns['optimal-substructure'] = {
    title: "Optimal Substructure",
    scenario: "Problems where the optimal solution can be constructed from optimal solutions of its subproblems. The key is identifying how smaller optimal solutions combine to form the overall optimal solution.",
    clue: "Look for: optimization problems (max/min), problems where you make choices affecting future states, problems where the optimal solution contains optimal solutions to subproblems.",
    problems: [
        {
            title: "53. Maximum Subarray",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/maximum-subarray/",
            description: "Find the contiguous subarray with the largest sum and return its sum.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📊 Kadane's Algorithm: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                            </tr>
                            <tr>
                                <td>Array</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">-3</td>
                                <td class="dp-cell highlight">4</td>
                                <td class="dp-cell highlight">-1</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">-5</td>
                                <td class="dp-cell">4</td>
                            </tr>
                            <tr>
                                <td>Current Sum</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell highlight">4</td>
                                <td class="dp-cell highlight">3</td>
                                <td class="dp-cell highlight">5</td>
                                <td class="dp-cell current">6</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">5</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Kadane's Recurrence</div>
                        <div class="recurrence-formula">currentSum = max(nums[i], currentSum + nums[i])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• At each position: either extend previous subarray OR start fresh</p>
                            <p>• Start fresh if previous sum is negative (dragging us down)</p>
                            <p>• Track global maximum across all positions</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Subarray Sum</div>
                        <div class="result-value">6 (subarray [4, -1, 2, 1])</div>
                    </div>
                </div>
            `,
            approach: "Kadane's algorithm: at each position, decide whether to extend the current subarray or start a new one. If current sum becomes negative, it's better to start fresh. Track the maximum sum seen.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`
        },
        {
            title: "300. Longest Increasing Subsequence",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/longest-increasing-subsequence/",
            description: "Find the length of the longest strictly increasing subsequence.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📈 LIS Example: [10, 9, 2, 5, 3, 7, 101, 18]</div>
                    
                    <div class="subsequence-visual">
                        <div class="seq-char">10</div>
                        <div class="seq-char">9</div>
                        <div class="seq-char match">2</div>
                        <div class="seq-char match">5</div>
                        <div class="seq-char">3</div>
                        <div class="seq-char match">7</div>
                        <div class="seq-char match">101</div>
                        <div class="seq-char">18</div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td class="dp-cell">10</td>
                                <td class="dp-cell">9</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">7</td>
                                <td class="dp-cell">101</td>
                                <td class="dp-cell">18</td>
                            </tr>
                            <tr>
                                <td>LIS</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell highlight">3</td>
                                <td class="dp-cell current">4</td>
                                <td class="dp-cell highlight">4</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card naive">
                            <div class="approach-title">O(n²) DP</div>
                            <div class="approach-detail">dp[i] = 1 + max(dp[j]) for j < i</div>
                            <div class="approach-detail">where nums[j] < nums[i]</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">O(n log n) Binary Search</div>
                            <div class="approach-detail">Maintain sorted "tails" array</div>
                            <div class="approach-detail">Binary search for insertion point</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Longest Increasing Subsequence</div>
                        <div class="result-value">Length = 4 ([2, 5, 7, 101] or [2, 3, 7, 101])</div>
                    </div>
                </div>
            `,
            approach: "O(n²): For each element, find the longest LIS ending at all previous smaller elements. O(n log n): Maintain array of smallest tail elements for LIS of each length, use binary search.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        
        for (int num : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), num);
            if (it == tails.end()) {
                tails.push_back(num);
            } else {
                *it = num;
            }
        }
        return tails.size();
    }
};`
        },
        {
            title: "322. Coin Change",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/coin-change/",
            description: "Find the fewest number of coins needed to make up a given amount. Return -1 if not possible.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🪙 Coin Change: coins=[1,2,5], amount=11</div>
                    
                    <div class="knapsack-items">
                        <div class="knapsack-item selected">
                            <div class="item-value">5¢</div>
                            <div class="item-weight">×2</div>
                        </div>
                        <div class="knapsack-item selected">
                            <div class="item-value">1¢</div>
                            <div class="item-weight">×1</div>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Amount</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                            </tr>
                            <tr>
                                <td>Min Coins</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell current">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i] = min(dp[i], dp[i - coin] + 1) for each coin</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Unbounded knapsack variant - can use each coin unlimited times</p>
                            <p>• For each amount, try using each coin and take minimum</p>
                            <p>• Base case: dp[0] = 0 (0 coins for amount 0)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Coins Needed</div>
                        <div class="result-value">3 coins (5 + 5 + 1 = 11)</div>
                    </div>
                </div>
            `,
            approach: "Build DP table where dp[i] = minimum coins for amount i. For each amount, try each coin and take minimum. Initialize with infinity, dp[0] = 0.",
            timeComplexity: "O(amount × coins)",
            spaceComplexity: "O(amount)",
            code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, INT_MAX);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i && dp[i - coin] != INT_MAX) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] == INT_MAX ? -1 : dp[amount];
    }
};`
        },
        {
            title: "72. Edit Distance",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/edit-distance/",
            description: "Find the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">✏️ Edit Distance: "horse" → "ros"</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th></th>
                                <th>""</th>
                                <th>r</th>
                                <th>o</th>
                                <th>s</th>
                            </tr>
                            <tr>
                                <th>""</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">3</td>
                            </tr>
                            <tr>
                                <th>h</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">3</td>
                            </tr>
                            <tr>
                                <th>o</th>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>r</th>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>s</th>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell highlight">2</td>
                            </tr>
                            <tr>
                                <th>e</th>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell current">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">
                            if s1[i] == s2[j]: dp[i][j] = dp[i-1][j-1]<br>
                            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
                        </div>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box">Delete</div>
                        <span>dp[i-1][j]</span>
                        <div class="state-box">Insert</div>
                        <span>dp[i][j-1]</span>
                        <div class="state-box">Replace</div>
                        <span>dp[i-1][j-1]</span>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Edit Distance</div>
                        <div class="result-value">3 operations: horse → rorse → rose → ros</div>
                    </div>
                </div>
            `,
            approach: "2D DP where dp[i][j] = min operations to convert first i chars of word1 to first j chars of word2. Three operations map to three adjacent cells in DP table.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m × n)",
            code: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        // Base cases
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j],      // delete
                                        dp[i][j-1],      // insert
                                        dp[i-1][j-1]});  // replace
                }
            }
        }
        return dp[m][n];
    }
};`
        },
        {
            title: "1143. Longest Common Subsequence",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/longest-common-subsequence/",
            description: "Find the length of the longest common subsequence of two strings.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔗 LCS: "abcde" and "ace"</div>
                    
                    <div style="display: flex; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">String 1:</div>
                            <div class="subsequence-visual">
                                <div class="seq-char match">a</div>
                                <div class="seq-char">b</div>
                                <div class="seq-char match">c</div>
                                <div class="seq-char">d</div>
                                <div class="seq-char match">e</div>
                            </div>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">String 2:</div>
                            <div class="subsequence-visual">
                                <div class="seq-char match">a</div>
                                <div class="seq-char match">c</div>
                                <div class="seq-char match">e</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th></th>
                                <th>""</th>
                                <th>a</th>
                                <th>c</th>
                                <th>e</th>
                            </tr>
                            <tr>
                                <th>""</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>a</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>b</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>c</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>d</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                            </tr>
                            <tr>
                                <th>e</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell current">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">
                            if s1[i] == s2[j]: dp[i][j] = dp[i-1][j-1] + 1<br>
                            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Match found: extend LCS by 1 from diagonal</p>
                            <p>• No match: take best of excluding either character</p>
                            <p>• Similar to Edit Distance but maximizing matches</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Longest Common Subsequence</div>
                        <div class="result-value">3 ("ace")</div>
                    </div>
                </div>
            `,
            approach: "2D DP where dp[i][j] = LCS length of first i chars of s1 and first j chars of s2. If characters match, extend diagonal value. Otherwise, take max of excluding either character.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m × n)",
            code: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
};`
        }
    ]
};
