window.knapsackPattern = {
    title: "🎒 Pattern 4: Knapsack Problems",
    scenario: "When you need to optimize the allocation of resources to maximize or minimize a value, subject to capacity constraints. Each item can be taken or left (0/1 knapsack) or taken multiple times (unbounded).",
    clue: "Look for problems where you select items from a set to maximize/minimize value without exceeding capacity. Keywords: 'subset sum', 'partition', 'capacity', 'weight/value'.",
    problems: [
        {
            title: "416. Partition Equal Subset Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
            intuition: "If we can find a subset with sum = totalSum/2, the other subset automatically has the same sum. This is a <strong>0/1 knapsack</strong> problem: can we achieve target sum by selecting some elements?",
            approach: [
                "Calculate total sum. If odd, return false (can't partition equally)",
                "Target = totalSum / 2",
                "dp[j] = true if we can achieve sum j using some elements",
                "For each number, traverse right to left: dp[j] = dp[j] || dp[j-num]",
                "Traverse right-to-left to avoid using same number twice!"
            ],
            timeComplexity: "O(n × sum)",
            spaceComplexity: "O(sum)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'dp[j] = dp[j] || dp[j - num]<br>Can we make sum j without this num? OR can we make (j-num) and add this num?')}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">nums = [1, 5, 11, 5], totalSum = 22, target = 11</p>
                
                ${createDPTable(
                    ['j →', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                    [
                        ['init', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
                        ['+1', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
                        ['+5', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'F'],
                        ['+11', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'T'],
                        ['+5', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 'T']
                    ],
                    { resultCell: '4,12' }
                )}
                
                ${createParallelBox([
                    {
                        type: 'recursive',
                        icon: '⚠️',
                        title: 'Why Right-to-Left?',
                        content: 'Left-to-right would allow using same element multiple times! We\'d update dp[j] using already-updated dp[j-num].'
                    },
                    {
                        type: 'tabulation',
                        icon: '✅',
                        title: 'Result',
                        content: 'dp[11] = true!<br>Partition: {11} and {1, 5, 5}'
                    }
                ])}
                
                ${createKeyInsight('0/1 Knapsack: Process elements one by one, traverse capacity right-to-left to ensure each item used at most once.')}
            `,
            code: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int num : nums) {
            // Traverse right to left to avoid using same number twice
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
};`
        },
        {
            title: "494. Target Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/target-sum/",
            intuition: "Mathematical insight: Let P = sum of positive terms, N = sum of negative terms. We need P - N = target and P + N = total. Solving: P = (total + target) / 2. Transform to: <strong>count subsets summing to P</strong>!",
            approach: [
                "Transform: find count of subsets with sum = (total + target) / 2",
                "If (total + target) is odd or negative, return 0",
                "dp[j] = number of ways to achieve sum j",
                "For each num: dp[j] += dp[j - num]",
                "This is counting version of subset sum"
            ],
            timeComplexity: "O(n × sum)",
            spaceComplexity: "O(sum)",
            visual: `
                ${createRecurrenceBox('Mathematical Transformation', 
                    'P - N = target<br>P + N = total<br>━━━━━━━━━━━━<br>2P = total + target<br>P = (total + target) / 2'
                )}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">nums = [1, 1, 1, 1, 1], target = 3</p>
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">total = 5, P = (5 + 3) / 2 = 4</p>
                
                ${createDPTable(
                    ['j →', '0', '1', '2', '3', '4'],
                    [
                        ['init', '1', '0', '0', '0', '0'],
                        ['+1', '1', '1', '0', '0', '0'],
                        ['+1', '1', '2', '1', '0', '0'],
                        ['+1', '1', '3', '3', '1', '0'],
                        ['+1', '1', '4', '6', '4', '1'],
                        ['+1', '1', '5', '10', '10', '5']
                    ],
                    { resultCell: '5,5' }
                )}
                
                ${createKeyInsight('Transform \"assign + or -\" problems into subset sum counting by algebraic manipulation!')}
            `,
            code: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        
        if ((total + target) % 2 != 0 || total + target < 0) return 0;
        
        int P = (total + target) / 2;
        vector<int> dp(P + 1, 0);
        dp[0] = 1;
        
        for (int num : nums) {
            for (int j = P; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[P];
    }
};`
        },
        {
            title: "474. Ones and Zeroes",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/ones-and-zeroes/",
            intuition: "This is a <strong>2D knapsack</strong>: two constraints (m zeros, n ones) instead of one. For each string, decide to include or exclude. If included, reduces both capacities.",
            approach: [
                "dp[i][j] = max strings using at most i zeros and j ones",
                "For each string, count its zeros and ones",
                "Traverse both dimensions right-to-left (0/1 knapsack)",
                "dp[i][j] = max(dp[i][j], dp[i-zeros][j-ones] + 1)"
            ],
            timeComplexity: "O(l × m × n), l = number of strings",
            spaceComplexity: "O(m × n)",
            visual: `
                ${createRecurrenceBox('2D Knapsack Recurrence', 
                    'dp[i][j] = max(dp[i][j], dp[i-zeros][j-ones] + 1)<br>Two constraints: zeros ≤ m, ones ≤ n'
                )}
                
                ${createParallelBox([
                    {
                        type: 'memoization',
                        icon: '🎯',
                        title: 'Standard Knapsack',
                        content: 'One capacity dimension<br><code>dp[capacity]</code>'
                    },
                    {
                        type: 'tabulation',
                        icon: '🎯',
                        title: '2D Knapsack',
                        content: 'Two capacity dimensions<br><code>dp[capacity1][capacity2]</code>'
                    }
                ])}
                
                ${createKeyInsight('Multi-constraint knapsack: add a dimension to DP for each constraint. All dimensions traverse right-to-left.')}
            `,
            code: `class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (const string& s : strs) {
            int zeros = count(s.begin(), s.end(), '0');
            int ones = s.size() - zeros;
            
            // 2D knapsack: traverse both dimensions right-to-left
            for (int i = m; i >= zeros; i--) {
                for (int j = n; j >= ones; j--) {
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1);
                }
            }
        }
        return dp[m][n];
    }
};`
        },
        {
            title: "322. Coin Change",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/coin-change/",
            intuition: "This is <strong>unbounded knapsack</strong>: each coin can be used unlimited times. We want minimum coins to make amount. Unlike 0/1 knapsack, we traverse left-to-right!",
            approach: [
                "dp[j] = minimum coins to make amount j",
                "Initialize dp[0] = 0, others = infinity",
                "For each coin, traverse LEFT-TO-RIGHT",
                "dp[j] = min(dp[j], dp[j-coin] + 1)",
                "Left-to-right allows reusing same coin"
            ],
            timeComplexity: "O(n × amount)",
            spaceComplexity: "O(amount)",
            visual: `
                ${createRecurrenceBox('Unbounded Knapsack Recurrence', 
                    'dp[j] = min(dp[j], dp[j - coin] + 1)<br>Can use each coin unlimited times!'
                )}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">coins = [1, 2, 5], amount = 11</p>
                
                ${createDPTable(
                    ['amt →', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                    [
                        ['dp', '0', '1', '1', '2', '2', '1', '2', '2', '3', '3', '2', '3']
                    ],
                    { resultCell: '0,12' }
                )}
                
                ${createParallelBox([
                    {
                        type: 'recursive',
                        icon: '➡️',
                        title: 'Unbounded: Left-to-Right',
                        content: 'Same item CAN be reused<br>dp[j] may use updated dp[j-coin]'
                    },
                    {
                        type: 'iterative',
                        icon: '⬅️',
                        title: '0/1: Right-to-Left',
                        content: 'Same item CANNOT be reused<br>dp[j] uses old dp[j-coin]'
                    }
                ])}
                
                ${createKeyInsight('Unbounded = left-to-right (reuse allowed). 0/1 = right-to-left (no reuse).')}
            `,
            code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, INT_MAX);
        dp[0] = 0;
        
        for (int coin : coins) {
            // LEFT-TO-RIGHT for unbounded knapsack
            for (int j = coin; j <= amount; j++) {
                if (dp[j - coin] != INT_MAX) {
                    dp[j] = min(dp[j], dp[j - coin] + 1);
                }
            }
        }
        return dp[amount] == INT_MAX ? -1 : dp[amount];
    }
};`
        },
        {
            title: "518. Coin Change 2",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
            intuition: "Count <strong>combinations</strong> (not permutations) to make amount. Key: process coins in outer loop to avoid counting same combination multiple times in different orders.",
            approach: [
                "dp[j] = number of ways to make amount j",
                "Process each coin type completely before moving to next",
                "This ensures we count combinations, not permutations",
                "dp[j] += dp[j - coin]"
            ],
            timeComplexity: "O(n × amount)",
            spaceComplexity: "O(amount)",
            visual: `
                ${createRecurrenceBox('Counting Combinations', 
                    'dp[j] += dp[j - coin]<br>Outer loop: coins. Inner loop: amounts.'
                )}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">coins = [1, 2, 5], amount = 5</p>
                
                ${createDPTable(
                    ['amt →', '0', '1', '2', '3', '4', '5'],
                    [
                        ['init', '1', '0', '0', '0', '0', '0'],
                        ['+1s', '1', '1', '1', '1', '1', '1'],
                        ['+2s', '1', '1', '2', '2', '3', '3'],
                        ['+5s', '1', '1', '2', '2', '3', '4']
                    ],
                    { resultCell: '3,6' }
                )}
                
                ${createParallelBox([
                    {
                        type: 'tabulation',
                        icon: '✅',
                        title: 'Combinations (This Problem)',
                        content: 'Outer: coins, Inner: amounts<br>{1,1,1,1,1}, {1,1,1,2}, {1,2,2}, {5}'
                    },
                    {
                        type: 'memoization',
                        icon: '⚠️',
                        title: 'Permutations (Different)',
                        content: 'Outer: amounts, Inner: coins<br>Would count {1,2,2} and {2,1,2} separately'
                    }
                ])}
            `,
            code: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        
        // Outer loop: coins (for combinations)
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
};`
        }
    ]
};
