// ==========================================
// KNAPSACK PROBLEMS PATTERN
// 0/1 Knapsack, Partition Equal Subset Sum, Target Sum, Minimum Subset Sum Difference, Equal Subset Sum Partition
// ==========================================

window.patterns['knapsack'] = {
    title: "Knapsack Problems",
    scenario: "Problems where you need to select items (with constraints) to optimize some value. Classic variants include 0/1 Knapsack (each item once), Unbounded Knapsack (unlimited items), and subset selection problems.",
    clue: "Look for: selecting items with weight/value constraints, partition problems, subset sum problems, problems asking if a target sum can be achieved, or maximizing/minimizing with a budget.",
    problems: [
        {
            title: "0/1 Knapsack Problem",
            difficulty: "Medium",
            link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
            description: "Given weights and values of n items, put items in a knapsack of capacity W to get maximum total value. Each item can only be used once.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎒 0/1 Knapsack: W=7, items={(1,1), (3,4), (4,5), (5,7)}</div>
                    
                    <div class="knapsack-items">
                        <div class="knapsack-item">
                            <div class="item-value">$1</div>
                            <div class="item-weight">1 kg</div>
                        </div>
                        <div class="knapsack-item selected">
                            <div class="item-value">$4</div>
                            <div class="item-weight">3 kg</div>
                        </div>
                        <div class="knapsack-item selected">
                            <div class="item-value">$5</div>
                            <div class="item-weight">4 kg</div>
                        </div>
                        <div class="knapsack-item">
                            <div class="item-value">$7</div>
                            <div class="item-weight">5 kg</div>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Item\\W</th>
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
                                <th>0</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>(1,1)</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>(3,4)</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell highlight">5</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">5</td>
                            </tr>
                            <tr>
                                <th>(4,5)</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell current">9</td>
                            </tr>
                            <tr>
                                <th>(5,7)</th>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">7</td>
                                <td class="dp-cell">8</td>
                                <td class="dp-cell highlight">9</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence Relation</div>
                        <div class="recurrence-formula">dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• For each item: either SKIP it or TAKE it</p>
                            <p>• Skip: dp[i-1][w] (don't include item i)</p>
                            <p>• Take: dp[i-1][w-wt[i]] + val[i] (include if weight allows)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Value</div>
                        <div class="result-value">$9 (items with weights 3 and 4)</div>
                    </div>
                </div>
            `,
            approach: "2D DP where dp[i][w] = max value using first i items with capacity w. For each item, choose to take it (if weight allows) or skip it. Can optimize to 1D by processing weights in reverse.",
            timeComplexity: "O(n × W)",
            spaceComplexity: "O(W)",
            code: `int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // Process in reverse to ensure each item used at most once
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}`
        },
        {
            title: "416. Partition Equal Subset Sum",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/partition-equal-subset-sum/",
            description: "Determine if you can partition the array into two subsets with equal sum.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⚖️ Partition: [1, 5, 11, 5] → Target = 11</div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 1 ✓</div>
                            <div class="approach-detail">[1, 5, 5]</div>
                            <div class="approach-detail">Sum = 11</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 2 ✓</div>
                            <div class="approach-detail">[11]</div>
                            <div class="approach-detail">Sum = 11</div>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Num\\Sum</th>
                                <th>0</th>
                                <th>1</th>
                                <th>5</th>
                                <th>6</th>
                                <th>10</th>
                                <th>11</th>
                            </tr>
                            <tr>
                                <th>Init</th>
                                <td class="dp-cell highlight">T</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell highlight">T</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                            </tr>
                            <tr>
                                <th>+5</th>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell highlight">T</td>
                                <td class="dp-cell highlight">T</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell">F</td>
                            </tr>
                            <tr>
                                <th>+11</th>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">F</td>
                                <td class="dp-cell highlight">T</td>
                            </tr>
                            <tr>
                                <th>+5</th>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell">T</td>
                                <td class="dp-cell highlight">T</td>
                                <td class="dp-cell current">T</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Subset Sum Pattern</div>
                        <div class="recurrence-formula">dp[j] = dp[j] || dp[j - num]</div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Can Partition?</div>
                        <div class="result-value">True ✓</div>
                    </div>
                </div>
            `,
            approach: "Reduce to subset sum: find if subset with sum = total/2 exists. If total is odd, impossible. Use 0/1 knapsack pattern with boolean values.",
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
            link: "https://leetcode.com/problems/target-sum/",
            description: "Assign + or - to each number to achieve the target sum. Return the count of ways.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎯 Target Sum: nums=[1,1,1,1,1], target=3</div>
                    
                    <div class="state-flow">
                        <div class="state-box success">-1</div>
                        <div class="state-box success">+1</div>
                        <div class="state-box success">+1</div>
                        <div class="state-box success">+1</div>
                        <div class="state-box success">+1</div>
                        <span class="state-arrow">=</span>
                        <div class="state-box active">3</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">🔑 Mathematical Transformation</div>
                        <div class="insight-content">
                            <p>• Let P = sum of positive, N = sum of negative</p>
                            <p>• P - N = target, P + N = total</p>
                            <p>• Solving: P = (target + total) / 2</p>
                            <p>• Problem reduces to: count subsets with sum P</p>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Num\\Sum</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <th>Init</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">0</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">6</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <th>+1</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">10</td>
                                <td class="dp-cell">10</td>
                                <td class="dp-cell current">5</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Number of Ways</div>
                        <div class="result-value">5 ways to get sum 3</div>
                    </div>
                </div>
            `,
            approach: "Transform to subset sum: find count of subsets with sum = (target + total) / 2. Use counting DP where dp[j] = number of ways to achieve sum j.",
            timeComplexity: "O(n × sum)",
            spaceComplexity: "O(sum)",
            code: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        
        // P = (target + total) / 2
        if ((target + total) % 2 != 0 || abs(target) > total) return 0;
        int P = (target + total) / 2;
        
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
            title: "1049. Last Stone Weight II",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/last-stone-weight-ii/",
            description: "Smash stones together (difference remains). Find minimum possible weight of last stone (or 0). Equivalent to minimizing |S1 - S2| partition.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🪨 Min Subset Sum Diff: [2, 7, 4, 1, 8, 1]</div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <div class="approach-title">Subset 1</div>
                            <div class="approach-detail">[2, 4, 1, 4]</div>
                            <div class="approach-detail">Sum = 11</div>
                        </div>
                        <div class="approach-card">
                            <div class="approach-title">Subset 2</div>
                            <div class="approach-detail">[7, 1, 1, 3]</div>
                            <div class="approach-detail">Sum = 12</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">🔑 Key Insight</div>
                        <div class="insight-content">
                            <p>• Goal: Partition into two groups with minimum difference</p>
                            <p>• Find all achievable sums up to total/2</p>
                            <p>• Answer = total - 2 * (largest achievable sum ≤ total/2)</p>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Sum</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>...</th>
                                <th>11</th>
                            </tr>
                            <tr>
                                <td>Achievable?</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell highlight">✓</td>
                                <td class="dp-cell">...</td>
                                <td class="dp-cell current">✓</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Strategy</div>
                        <div class="recurrence-formula">answer = total - 2 * max(achievable sum ≤ total/2)</div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Last Stone Weight</div>
                        <div class="result-value">1 (23 - 2*11 = 1)</div>
                    </div>
                </div>
            `,
            approach: "Partition problem in disguise. Find maximum achievable sum ≤ total/2. The difference between two partitions is total - 2*sum. Use subset sum DP.",
            timeComplexity: "O(n × sum)",
            spaceComplexity: "O(sum)",
            code: `class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int total = accumulate(stones.begin(), stones.end(), 0);
        int target = total / 2;
        
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int stone : stones) {
            for (int j = target; j >= stone; j--) {
                dp[j] = dp[j] || dp[j - stone];
            }
        }
        
        // Find largest achievable sum <= target
        for (int j = target; j >= 0; j--) {
            if (dp[j]) {
                return total - 2 * j;
            }
        }
        return total;
    }
};`
        },
        {
            title: "698. Partition to K Equal Sum Subsets",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
            description: "Check if array can be partitioned into k subsets with equal sum.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📦 K Equal Subsets: [4,3,2,3,5,2,1], k=4</div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 1</div>
                            <div class="approach-detail">[4, 1]</div>
                            <div class="approach-detail">Sum = 5</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 2</div>
                            <div class="approach-detail">[3, 2]</div>
                            <div class="approach-detail">Sum = 5</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 3</div>
                            <div class="approach-detail">[3, 2]</div>
                            <div class="approach-detail">Sum = 5</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subset 4</div>
                            <div class="approach-detail">[5]</div>
                            <div class="approach-detail">Sum = 5</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Total sum must be divisible by k</p>
                            <p>• Each subset must sum to total/k</p>
                            <p>• Use bitmask DP or backtracking with memoization</p>
                            <p>• State: which elements are used (bitmask)</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Bitmask DP State</div>
                        <div class="recurrence-formula">dp[mask] = can remaining elements form complete subsets?</div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Can Partition into 4 Equal Subsets?</div>
                        <div class="result-value">True ✓</div>
                    </div>
                </div>
            `,
            approach: "Use bitmask DP where state is set of used elements. For each state, track current bucket sum. When bucket fills, start new bucket. Optimization: sort descending to prune early.",
            timeComplexity: "O(n × 2^n)",
            spaceComplexity: "O(2^n)",
            code: `class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;
        
        int target = total / k;
        int n = nums.size();
        
        sort(nums.rbegin(), nums.rend()); // Optimization
        if (nums[0] > target) return false;
        
        vector<int> buckets(k, 0);
        return backtrack(nums, buckets, 0, target);
    }
    
    bool backtrack(vector<int>& nums, vector<int>& buckets, int idx, int target) {
        if (idx == nums.size()) return true;
        
        for (int i = 0; i < buckets.size(); i++) {
            if (buckets[i] + nums[idx] <= target) {
                buckets[i] += nums[idx];
                if (backtrack(nums, buckets, idx + 1, target)) return true;
                buckets[i] -= nums[idx];
            }
            // Optimization: if bucket is empty, no need to try others
            if (buckets[i] == 0) break;
        }
        return false;
    }
};`
        }
    ]
};
