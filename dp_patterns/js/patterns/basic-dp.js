window.basicDpPattern = {
    title: "🧱 Pattern 1: Basic Dynamic Programming",
    scenario: "When recursive calls result in redundant computations leading to inefficiency. The problem can be optimized by storing the results of previous computations.",
    clue: "Look for recursive problems where subproblems are overlapping or repetitive. Keywords: 'ways to reach', 'minimum/maximum cost', 'count possibilities'.",
    problems: [
        {
            title: "509. Fibonacci Number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/fibonacci-number/",
            intuition: "The classic DP introduction. Naive recursion has exponential time because we recompute the same values. By storing computed Fibonacci numbers, we avoid redundant calculations. This demonstrates the core DP principle: <strong>trade space for time</strong>.",
            approach: [
                "Identify the recurrence: F(n) = F(n-1) + F(n-2)",
                "Base cases: F(0) = 0, F(1) = 1",
                "Use bottom-up approach: compute from small to large",
                "Space optimization: only need last two values, so O(1) space"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'F(n) = F(n-1) + F(n-2), where F(0)=0, F(1)=1')}
                
                ${createParallelBox([
                    {
                        type: 'recursive',
                        icon: '🔄',
                        title: 'Naive Recursion - O(2ⁿ)',
                        content: 'Each call branches into two calls. Same subproblems computed many times!'
                    },
                    {
                        type: 'tabulation',
                        icon: '📊',
                        title: 'DP Tabulation - O(n)',
                        content: 'Compute bottom-up, store each result. Each subproblem computed exactly once.'
                    }
                ])}
                
                ${createDPTable(
                    ['i', '0', '1', '2', '3', '4', '5'],
                    [['F(i)', '0', '1', '1', '2', '3', '5']],
                    { resultCell: '0,6' }
                )}
                
                ${createKeyInsight('We only need the previous two values at any point, so we can reduce space from O(n) to O(1)!')}
            `,
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
            leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
            intuition: "To reach step n, you can come from step n-1 (1 step) or step n-2 (2 steps). So ways(n) = ways(n-1) + ways(n-2). This is exactly the Fibonacci sequence! The key insight is recognizing the <strong>overlapping subproblems</strong>.",
            approach: [
                "Realize this is Fibonacci in disguise",
                "Base cases: 1 way to reach step 1, 2 ways to reach step 2",
                "dp[i] = dp[i-1] + dp[i-2]",
                "Optimize to O(1) space since we only need last two values"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'ways(n) = ways(n-1) + ways(n-2)')}
                
                ${createStepsVisual([
                    {
                        title: 'To reach step 4, we can come from:',
                        content: createStateDiagram([
                            { label: 'Step 3', class: 'active' },
                            { label: '+1 step', class: '' },
                            { label: 'Step 4', class: 'end' }
                        ])
                    },
                    {
                        title: 'OR from step 2:',
                        content: createStateDiagram([
                            { label: 'Step 2', class: 'active' },
                            { label: '+2 steps', class: '' },
                            { label: 'Step 4', class: 'end' }
                        ])
                    }
                ])}
                
                ${createDPTable(
                    ['Step', '1', '2', '3', '4', '5'],
                    [['Ways', '1', '2', '3', '5', '8']],
                    { resultCell: '0,5' }
                )}
                
                ${createClueBox('Pattern Recognition', 'When you can reach a state from multiple previous states, the total ways = sum of ways from each previous state.')}
            `,
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
            leetcodeUrl: "https://leetcode.com/problems/house-robber/",
            intuition: "At each house, we have two choices: <strong>rob it</strong> (add to max from house i-2, since we can't rob adjacent) or <strong>skip it</strong> (take max from house i-1). This is a classic <strong>include/exclude</strong> pattern.",
            approach: [
                "Define dp[i] = max money robbing houses 0 to i",
                "For each house i: dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
                "Skip: take dp[i-1] (best without current house)",
                "Rob: take dp[i-2] + nums[i] (must skip previous)",
                "Space optimize to O(1)"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])<br>Skip current OR Rob current (+ best from 2 houses back)')}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">Houses: [2, 7, 9, 3, 1]</p>
                ${createArrayVisual([2, 7, 9, 3, 1], { showIndices: true })}
                
                ${createDPTable(
                    ['House', '0', '1', '2', '3', '4'],
                    [
                        ['Value', '2', '7', '9', '3', '1'],
                        ['dp[i]', '2', '7', '11', '11', '12']
                    ],
                    { resultCell: '1,5' }
                )}
                
                ${createParallelBox([
                    {
                        type: 'memoization',
                        icon: '📝',
                        title: 'Decision at House 2 (value=9)',
                        content: '<code>Skip: dp[1] = 7</code><br><code>Rob: dp[0] + 9 = 2 + 9 = 11</code><br>Choose: max(7, 11) = <strong>11</strong>'
                    },
                    {
                        type: 'tabulation',
                        icon: '✅',
                        title: 'Optimal Solution',
                        content: 'Rob houses 0, 2, 4<br>Values: 2 + 9 + 1 = <strong>12</strong>'
                    }
                ])}
                
                ${createKeyInsight('The include/exclude pattern appears whenever you have constraints on adjacent selections.')}
            `,
            code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        int prev2 = nums[0];
        int prev1 = max(nums[0], nums[1]);
        
        for (int i = 2; i < n; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`
        },
        {
            title: "746. Min Cost Climbing Stairs",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
            intuition: "To reach step i, we can come from i-1 or i-2. The minimum cost to reach i is the minimum of (cost from i-1) and (cost from i-2). We want to reach beyond the last step (the 'top').",
            approach: [
                "dp[i] = minimum cost to reach step i",
                "Can start from step 0 or 1 (cost 0 to start there)",
                "dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])",
                "Answer is dp[n] - the cost to go past the last step"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])')}
                
                <p style="margin: 0.5rem 0; color: var(--text-secondary);">cost = [10, 15, 20]</p>
                ${createArrayVisual([10, 15, 20], { showIndices: true })}
                
                ${createDPTable(
                    ['Position', '0', '1', '2', '3 (top)'],
                    [
                        ['Cost to reach', '0', '0', '15', '15']
                    ],
                    { resultCell: '0,4' }
                )}
                
                ${createStepsVisual([
                    {
                        title: 'Position 2: min(0+15, 0+10) = 10? No wait...',
                        content: 'From pos 0: pay cost[0]=10 → total 10<br>From pos 1: pay cost[1]=15 → total 15<br>Min = <strong>10</strong>'
                    },
                    {
                        title: 'Position 3 (top): min(10+20, 0+15)',
                        content: 'From pos 2: pay cost[2]=20 → 10+20=30<br>From pos 1: pay cost[1]=15 → 0+15=15<br>Min = <strong>15</strong>'
                    }
                ])}
            `,
            code: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = 0, prev1 = 0;  // Cost to reach step 0 and 1
        
        for (int i = 2; i <= n; i++) {
            int curr = min(prev1 + cost[i-1], prev2 + cost[i-2]);
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
            leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
            intuition: "To reach cell (i,j), we can only come from (i-1,j) [top] or (i,j-1) [left]. So paths(i,j) = paths(i-1,j) + paths(i,j-1). First row and column have only 1 path each.",
            approach: [
                "dp[i][j] = number of paths to reach cell (i,j)",
                "First row: all 1s (can only go right)",
                "First column: all 1s (can only go down)",
                "For other cells: dp[i][j] = dp[i-1][j] + dp[i][j-1]",
                "Can optimize to 1D array since we only need previous row"
            ],
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(n)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'dp[i][j] = dp[i-1][j] + dp[i][j-1]')}
                
                ${createGridVisual(
                    [[1, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10]],
                    { startCell: '0,0', endCell: '2,3', pathCells: ['0,0', '2,3'] }
                )}
                
                ${createParallelBox([
                    {
                        type: 'memoization',
                        icon: '↓',
                        title: 'From Top',
                        content: 'Cell (1,1) gets 1 from cell (0,1)'
                    },
                    {
                        type: 'tabulation',
                        icon: '←',
                        title: 'From Left',
                        content: 'Cell (1,1) gets 1 from cell (1,0)'
                    }
                ])}
                
                ${createKeyInsight('Grid DP typically has transitions from adjacent cells. Direction of movement determines which cells contribute.')}
            `,
            code: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);  // First row is all 1s
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] = dp[j] + dp[j-1];  // top + left
            }
        }
        return dp[n-1];
    }
};`
        },
        {
            title: "1137. N-th Tribonacci Number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/n-th-tribonacci-number/",
            intuition: "Extension of Fibonacci: T(n) = T(n-1) + T(n-2) + T(n-3). Same principle - store previous computations to avoid redundancy. Track last three values instead of two.",
            approach: [
                "Base cases: T(0)=0, T(1)=1, T(2)=1",
                "Recurrence: T(n) = T(n-1) + T(n-2) + T(n-3)",
                "Track last three values for O(1) space",
                "Update all three in each iteration"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `
                ${createRecurrenceBox('Recurrence Relation', 'T(n) = T(n-1) + T(n-2) + T(n-3), where T(0)=0, T(1)=1, T(2)=1')}
                
                ${createDPTable(
                    ['i', '0', '1', '2', '3', '4', '5', '6'],
                    [['T(i)', '0', '1', '1', '2', '4', '7', '13']],
                    { resultCell: '0,7' }
                )}
                
                ${createClueBox('Generalization', 'This pattern extends to any k-bonacci number. Track last k values for O(1) space, O(n) time.')}
            `,
            code: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        
        int t0 = 0, t1 = 1, t2 = 1;
        for (int i = 3; i <= n; i++) {
            int curr = t0 + t1 + t2;
            t0 = t1;
            t1 = t2;
            t2 = curr;
        }
        return t2;
    }
};`
        }
    ]
};
