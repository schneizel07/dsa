// ==========================================
// BASIC DYNAMIC PROGRAMMING PATTERN
// Fibonacci, Climbing Stairs, House Robber, Unique Paths, Min Path Sum
// ==========================================

window.patterns['basic-dp'] = {
    title: "Basic Dynamic Programming",
    scenario: "Problems that can be broken down into overlapping subproblems with optimal substructure. The solution to the main problem depends on solutions to smaller instances of the same problem.",
    clue: "Look for: recursive solutions that compute the same subproblems multiple times, problems asking for count/min/max of ways to reach a goal, base cases that are trivial to solve.",
    problems: [
        {
            title: "509. Fibonacci Number",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/fibonacci-number/",
            description: "Calculate the nth Fibonacci number. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔢 Fibonacci Sequence Computation</div>
                    
                    <div class="state-flow">
                        <div class="state-box">F(0)=0</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">F(1)=1</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">F(2)=1</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">F(3)=2</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">F(4)=3</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box active">F(5)=5</div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i] = dp[i-1] + dp[i-2]</div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card naive">
                            <div class="approach-title">❌ Naive Recursion</div>
                            <div class="approach-detail">Time: O(2^n)</div>
                            <div class="approach-detail">Repeated calculations</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">✅ DP Approach</div>
                            <div class="approach-detail">Time: O(n)</div>
                            <div class="approach-detail">Space: O(1) optimized</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Only need last two values at any point</p>
                            <p>• Use two variables instead of array for O(1) space</p>
                        </div>
                    </div>
                </div>
            `,
            approach: "Use bottom-up DP starting from base cases F(0) and F(1). At each step, compute F(i) using the previous two values. Space can be optimized to O(1) since we only need the last two values.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        
        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`
        },
        {
            title: "70. Climbing Stairs",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/climbing-stairs/",
            description: "You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🪜 Ways to Climb Stairs (n=5)</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Step</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                            </tr>
                            <tr>
                                <td>Ways</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell highlight">3</td>
                                <td class="dp-cell highlight">5</td>
                                <td class="dp-cell current">8</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i] = dp[i-1] + dp[i-2]</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• To reach step i, you can come from step i-1 (1 step) OR step i-2 (2 steps)</p>
                            <p>• This is exactly the Fibonacci pattern!</p>
                            <p>• Base: dp[0] = 1 (standing at ground), dp[1] = 1 (one way)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Answer for n=5</div>
                        <div class="result-value">8 distinct ways</div>
                    </div>
                </div>
            `,
            approach: "Each step can be reached from either (i-1) or (i-2). The number of ways to reach step i is the sum of ways to reach (i-1) and (i-2). This follows the Fibonacci pattern.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`
        },
        {
            title: "198. House Robber",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/house-robber/",
            description: "Given an array where each element represents money at each house, find the maximum money you can rob without robbing two adjacent houses.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🏠 House Robber Example: [2, 7, 9, 3, 1]</div>
                    
                    <div class="state-flow">
                        <div class="state-box success">$2</div>
                        <div class="state-box">$7</div>
                        <div class="state-box success">$9</div>
                        <div class="state-box">$3</div>
                        <div class="state-box success">$1</div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>House</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <td>Money</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">7</td>
                                <td class="dp-cell">9</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <td>Max</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">7</td>
                                <td class="dp-cell highlight">11</td>
                                <td class="dp-cell highlight">11</td>
                                <td class="dp-cell current">12</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Decision at Each House</div>
                        <div class="recurrence-formula">dp[i] = max(dp[i-1], dp[i-2] + nums[i])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• At each house: either SKIP it (take dp[i-1]) or ROB it (take dp[i-2] + current)</p>
                            <p>• Can't rob adjacent houses, so if we rob i, we must skip i-1</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Money</div>
                        <div class="result-value">$12 (rob houses 0, 2, 4)</div>
                    </div>
                </div>
            `,
            approach: "At each house, decide to rob it (add current + max from 2 houses back) or skip it (keep max from previous house). Track the maximum achievable up to each position.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        int prev2 = 0, prev1 = 0;
        for (int i = 0; i < n; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`
        },
        {
            title: "62. Unique Paths",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/unique-paths/",
            description: "A robot is at the top-left corner of a m x n grid. It can only move right or down. Count the number of unique paths to reach the bottom-right corner.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🤖 Unique Paths in 3x7 Grid</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th></th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                            </tr>
                            <tr>
                                <th>0</th>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell">7</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell">10</td>
                                <td class="dp-cell">15</td>
                                <td class="dp-cell">21</td>
                                <td class="dp-cell current">28</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i][j] = dp[i-1][j] + dp[i][j-1]</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Each cell can only be reached from top OR left</p>
                            <p>• First row and column are all 1's (only one path)</p>
                            <p>• Space optimized: only need previous row!</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Answer for 3x7 Grid</div>
                        <div class="result-value">28 unique paths</div>
                    </div>
                </div>
            `,
            approach: "Use 2D DP where dp[i][j] represents paths to reach cell (i,j). Each cell is sum of paths from top and left. First row and column are all 1s. Can optimize to 1D array.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[n-1];
    }
};`
        },
        {
            title: "64. Minimum Path Sum",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/minimum-path-sum/",
            description: "Given a m x n grid with non-negative numbers, find a path from top-left to bottom-right that minimizes the sum. You can only move right or down.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🛤️ Minimum Path Sum Example</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Input Grid:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">3</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">5</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell path">4</div>
                                <div class="grid-cell path">2</div>
                                <div class="grid-cell path">1</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">DP Table:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">4</div>
                                <div class="grid-cell">5</div>
                                <div class="grid-cell">2</div>
                                <div class="grid-cell">7</div>
                                <div class="grid-cell">6</div>
                                <div class="grid-cell">6</div>
                                <div class="grid-cell">8</div>
                                <div class="grid-cell current">7</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Similar to Unique Paths but with min instead of sum</p>
                            <p>• First row: cumulative sum from left</p>
                            <p>• First col: cumulative sum from top</p>
                            <p>• Optimal path: 1 → 3 → 1 → 1 → 1 = 7</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Path Sum</div>
                        <div class="result-value">7</div>
                    </div>
                </div>
            `,
            approach: "Build DP table where dp[i][j] is minimum sum to reach (i,j). Fill first row/column with cumulative sums. For other cells, take min of top and left, add current cell value.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n);
        
        dp[0] = grid[0][0];
        // Fill first row
        for (int j = 1; j < n; j++) {
            dp[j] = dp[j-1] + grid[0][j];
        }
        
        // Fill remaining rows
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++) {
                dp[j] = grid[i][j] + min(dp[j], dp[j-1]);
            }
        }
        return dp[n-1];
    }
};`
        }
    ]
};
