window.optimalSubstructurePattern = {
    id: "optimal-substructure",
    title: "Optimal Substructure",
    description: "Problems where optimal solution can be constructed from optimal solutions of subproblems",
    patterns: [
        {
            title: "Maximum Subarray (Kadane's Algorithm)",
            description: "Find the contiguous subarray with the largest sum",
            intuition: `
                <h4>Core Insight</h4>
                <p>At each position, make a <strong>local decision</strong>: should we extend the 
                previous subarray or start a new one? If previous sum is negative, starting fresh is better!</p>
                
                <div class="visualization-container">
                    <h4>Decision at Each Element</h4>
                    <div class="transition-flow">
                        <div class="state-box">currentSum > 0?</div>
                        <div class="arrow">Yes→</div>
                        <div class="state-box highlight">Extend: currentSum + nums[i]</div>
                    </div>
                    <div class="transition-flow">
                        <div class="state-box">currentSum ≤ 0?</div>
                        <div class="arrow">No→</div>
                        <div class="state-box highlight">Start fresh: nums[i]</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card current">
                        <h5>Kadane's Algorithm</h5>
                        <p>currentSum = max(nums[i], currentSum + nums[i])</p>
                        <p>O(n) time, O(1) space</p>
                    </div>
                    <div class="approach-card">
                        <h5>Divide & Conquer</h5>
                        <p>Split array, combine results</p>
                        <p>O(n log n) time</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Kadane's Algorithm</h4>
                <ol>
                    <li><strong>Initialize:</strong> currentSum = maxSum = nums[0]</li>
                    <li><strong>For each element:</strong> currentSum = max(nums[i], currentSum + nums[i])</li>
                    <li><strong>Track maximum:</strong> maxSum = max(maxSum, currentSum)</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</h4>
                    <table class="complexity-table">
                        <tr><th>i</th><th>nums[i]</th><th>currentSum</th><th>maxSum</th><th>Action</th></tr>
                        <tr><td>0</td><td>-2</td><td>-2</td><td>-2</td><td>Start</td></tr>
                        <tr><td>1</td><td>1</td><td class="highlight">1</td><td>1</td><td>Start fresh</td></tr>
                        <tr><td>2</td><td>-3</td><td>-2</td><td>1</td><td>Extend</td></tr>
                        <tr><td>3</td><td>4</td><td class="highlight">4</td><td>4</td><td>Start fresh</td></tr>
                        <tr><td>4</td><td>-1</td><td>3</td><td>4</td><td>Extend</td></tr>
                        <tr><td>5</td><td>2</td><td>5</td><td>5</td><td>Extend</td></tr>
                        <tr><td>6</td><td>1</td><td class="highlight">6</td><td class="highlight">6</td><td>Extend</td></tr>
                        <tr><td>7</td><td>-5</td><td>1</td><td>6</td><td>Extend</td></tr>
                        <tr><td>8</td><td>4</td><td>5</td><td>6</td><td>Extend</td></tr>
                    </table>
                    <p><em>Maximum subarray: [4, -1, 2, 1] = 6</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            // Either extend previous subarray or start new
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
    
    // With subarray indices
    pair<int, pair<int,int>> maxSubArrayWithIndices(vector<int>& nums) {
        int maxSum = nums[0], currSum = nums[0];
        int start = 0, end = 0, tempStart = 0;
        
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] > currSum + nums[i]) {
                currSum = nums[i];
                tempStart = i;
            } else {
                currSum += nums[i];
            }
            
            if (currSum > maxSum) {
                maxSum = currSum;
                start = tempStart;
                end = i;
            }
        }
        
        return {maxSum, {start, end}};
    }
};`
        },
        {
            title: "Longest Increasing Subsequence",
            description: "Find the length of the longest strictly increasing subsequence",
            intuition: `
                <h4>Core Insight</h4>
                <p>Two approaches: <strong>O(n²) DP</strong> where dp[i] = LIS ending at i, 
                or <strong>O(n log n)</strong> using a "tails" array with binary search.</p>
                
                <div class="visualization-container">
                    <h4>Two Approaches</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>O(n²) DP</h5>
                            <p>dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]</p>
                            <p>Simple but slower</p>
                        </div>
                        <div class="approach-card current">
                            <h5>O(n log n) Binary Search</h5>
                            <p>tails[i] = smallest tail of LIS with length i+1</p>
                            <p>Binary search to find position</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">For each num</div>
                    <div class="arrow">→</div>
                    <div class="state-box">Binary search in tails</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Replace or extend tails</div>
                </div>
            `,
            approach: `
                <h4>Binary Search Approach</h4>
                <ol>
                    <li><strong>Maintain tails array:</strong> tails[i] = smallest ending element of LIS of length i+1</li>
                    <li><strong>For each element:</strong> Binary search for position in tails</li>
                    <li><strong>If larger than all:</strong> Append to tails (extend LIS)</li>
                    <li><strong>Otherwise:</strong> Replace smallest element ≥ current (maintain optimal tails)</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: [10, 9, 2, 5, 3, 7, 101, 18]</h4>
                    <table class="complexity-table">
                        <tr><th>num</th><th>Action</th><th>tails</th><th>LIS len</th></tr>
                        <tr><td>10</td><td>Append</td><td>[10]</td><td>1</td></tr>
                        <tr><td>9</td><td>Replace 10</td><td>[9]</td><td>1</td></tr>
                        <tr><td>2</td><td>Replace 9</td><td>[2]</td><td>1</td></tr>
                        <tr><td>5</td><td>Append</td><td>[2, 5]</td><td>2</td></tr>
                        <tr><td>3</td><td>Replace 5</td><td>[2, 3]</td><td>2</td></tr>
                        <tr><td>7</td><td>Append</td><td>[2, 3, 7]</td><td>3</td></tr>
                        <tr><td>101</td><td>Append</td><td>[2, 3, 7, 101]</td><td class="highlight">4</td></tr>
                        <tr><td>18</td><td>Replace 101</td><td>[2, 3, 7, 18]</td><td>4</td></tr>
                    </table>
                    <p><em>LIS length = 4 (e.g., [2, 3, 7, 18] or [2, 3, 7, 101])</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n log n)</li>
                    <li><strong>Space:</strong> O(n)</li>
                </ul>
            `,
            code: `class Solution {
public:
    // O(n log n) solution
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        
        for (int num : nums) {
            // Binary search for position
            auto it = lower_bound(tails.begin(), tails.end(), num);
            
            if (it == tails.end()) {
                tails.push_back(num);  // Extend LIS
            } else {
                *it = num;  // Replace to maintain smallest tails
            }
        }
        
        return tails.size();
    }
    
    // O(n²) DP solution
    int lengthOfLIS_DP(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        int maxLen = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        
        return maxLen;
    }
    
    // Get actual LIS sequence
    vector<int> getLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> tails, indices, parent(n, -1);
        
        for (int i = 0; i < n; i++) {
            auto it = lower_bound(tails.begin(), tails.end(), nums[i]);
            int pos = it - tails.begin();
            
            if (it == tails.end()) {
                tails.push_back(nums[i]);
                indices.push_back(i);
            } else {
                *it = nums[i];
                indices[pos] = i;
            }
            
            if (pos > 0) parent[i] = indices[pos - 1];
        }
        
        // Reconstruct sequence
        vector<int> result;
        for (int i = indices.back(); i != -1; i = parent[i]) {
            result.push_back(nums[i]);
        }
        reverse(result.begin(), result.end());
        return result;
    }
};`
        },
        {
            title: "Maximum Product Subarray",
            description: "Find the contiguous subarray with the largest product",
            intuition: `
                <h4>Core Insight</h4>
                <p>Unlike sum, product can flip signs! Track both <strong>maximum</strong> and 
                <strong>minimum</strong> products ending at each position (min can become max when multiplied by negative).</p>
                
                <div class="visualization-container">
                    <h4>Why Track Both Max and Min?</h4>
                    <div class="dp-table">
                        <div class="dp-cell">nums</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">-2</div>
                        <div class="dp-cell">4</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">maxProd</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">6</div>
                        <div class="dp-cell">-2</div>
                        <div class="dp-cell">4</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">minProd</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">-12</div>
                        <div class="dp-cell">-48</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">For negative num</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Swap max and min before multiply!</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Track maxProd and minProd:</strong> Both ending at current position</li>
                    <li><strong>When negative:</strong> Swap max and min (negative × min = potential new max)</li>
                    <li><strong>Update both:</strong> Compare with current element (restart) and products</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: [2, 3, -2, 4, -1]</h4>
                    <table class="complexity-table">
                        <tr><th>i</th><th>nums[i]</th><th>maxProd</th><th>minProd</th><th>result</th></tr>
                        <tr><td>0</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>
                        <tr><td>1</td><td>3</td><td class="highlight">6</td><td>3</td><td>6</td></tr>
                        <tr><td>2</td><td>-2</td><td>-2</td><td>-12</td><td>6</td></tr>
                        <tr><td>3</td><td>4</td><td>4</td><td>-48</td><td>6</td></tr>
                        <tr><td>4</td><td>-1</td><td class="highlight">48</td><td>-4</td><td class="highlight">48</td></tr>
                    </table>
                    <p><em>Maximum product = 48 (subarray [3, -2, 4, -1])</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            // Swap when negative (min becomes max)
            if (nums[i] < 0) {
                swap(maxProd, minProd);
            }
            
            // Either start fresh or extend
            maxProd = max(nums[i], maxProd * nums[i]);
            minProd = min(nums[i], minProd * nums[i]);
            
            result = max(result, maxProd);
        }
        
        return result;
    }
};`
        },
        {
            title: "Jump Game",
            description: "Determine if you can reach the last index",
            intuition: `
                <h4>Core Insight</h4>
                <p>Greedy approach: Track the <strong>farthest position reachable</strong>. 
                At each position, if we can reach it, update farthest. If farthest reaches end, success!</p>
                
                <div class="visualization-container">
                    <h4>Greedy Visualization</h4>
                    <div class="dp-table">
                        <div class="dp-cell">Index</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">4</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">nums</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">4</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">farthest</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">4</div>
                        <div class="dp-cell">4</div>
                        <div class="dp-cell">4</div>
                        <div class="dp-cell highlight">8</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card current">
                        <h5>Greedy O(n)</h5>
                        <p>Track farthest reachable</p>
                        <p>Simple and optimal</p>
                    </div>
                    <div class="approach-card">
                        <h5>DP O(n²)</h5>
                        <p>dp[i] = can reach i?</p>
                        <p>Check all predecessors</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Greedy Algorithm</h4>
                <ol>
                    <li><strong>Initialize:</strong> farthest = 0</li>
                    <li><strong>For each index i:</strong>
                        <ul>
                            <li>If i > farthest: can't reach i, return false</li>
                            <li>Update farthest = max(farthest, i + nums[i])</li>
                        </ul>
                    </li>
                    <li><strong>Return:</strong> farthest >= n-1</li>
                </ol>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;
        int n = nums.size();
        
        for (int i = 0; i < n; i++) {
            if (i > farthest) return false;  // Can't reach i
            farthest = max(farthest, i + nums[i]);
            if (farthest >= n - 1) return true;
        }
        
        return true;
    }
    
    // DP solution (for comparison)
    bool canJumpDP(vector<int>& nums) {
        int n = nums.size();
        vector<bool> dp(n, false);
        dp[0] = true;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && j + nums[j] >= i) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[n - 1];
    }
};`
        },
        {
            title: "Jump Game II",
            description: "Minimum number of jumps to reach the last index",
            intuition: `
                <h4>Core Insight</h4>
                <p>Think of it as <strong>BFS by levels</strong>! Each "level" is one jump. 
                Track the farthest position reachable in current level and next level.</p>
                
                <div class="visualization-container">
                    <h4>BFS-like Level Traversal</h4>
                    <div class="dp-table">
                        <div class="dp-cell" style="background: #ffcccc;">Level 0</div>
                        <div class="dp-cell" style="background: #ccffcc;">Level 1</div>
                        <div class="dp-cell" style="background: #ccffcc;">Level 1</div>
                        <div class="dp-cell" style="background: #ccccff;">Level 2</div>
                        <div class="dp-cell" style="background: #ccccff;">Level 2</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">nums[i]</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">4</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">At end of each level</div>
                    <div class="arrow">→</div>
                    <div class="state-box">jumps++</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Expand to next level boundary</div>
                </div>
            `,
            approach: `
                <h4>Greedy BFS</h4>
                <ol>
                    <li><strong>Track:</strong> currentEnd (end of current level), farthest (end of next level)</li>
                    <li><strong>At each position:</strong> Update farthest</li>
                    <li><strong>At level end:</strong> jumps++, currentEnd = farthest</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: [2, 3, 1, 1, 4]</h4>
                    <table class="complexity-table">
                        <tr><th>i</th><th>nums[i]</th><th>farthest</th><th>currentEnd</th><th>jumps</th></tr>
                        <tr><td>0</td><td>2</td><td>2</td><td>0→2</td><td>0→1</td></tr>
                        <tr><td>1</td><td>3</td><td>4</td><td>2</td><td>1</td></tr>
                        <tr><td>2</td><td>1</td><td>4</td><td>2→4</td><td>1→2</td></tr>
                    </table>
                    <p><em>Minimum jumps = 2</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return 0;
        
        int jumps = 0;
        int currentEnd = 0;   // End of current jump level
        int farthest = 0;     // Farthest we can reach
        
        for (int i = 0; i < n - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
                
                if (currentEnd >= n - 1) break;
            }
        }
        
        return jumps;
    }
};`
        },
        {
            title: "Best Time to Buy and Sell Stock",
            description: "Maximum profit from one transaction",
            intuition: `
                <h4>Core Insight</h4>
                <p>Track the <strong>minimum price seen so far</strong>. At each day, the maximum 
                profit is today's price minus the minimum price we've seen before today.</p>
                
                <div class="visualization-container">
                    <h4>Tracking Minimum Price</h4>
                    <div class="dp-table">
                        <div class="dp-cell">Day</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">4</div>
                        <div class="dp-cell">5</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">Price</div>
                        <div class="dp-cell">7</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">5</div>
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">6</div>
                        <div class="dp-cell">4</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">minPrice</div>
                        <div class="dp-cell">7</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">Profit</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">4</div>
                        <div class="dp-cell">2</div>
                        <div class="dp-cell highlight">5</div>
                        <div class="dp-cell">3</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">Buy at min = 1</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Sell at 6 → Profit = 5</div>
                </div>
            `,
            approach: `
                <h4>One Pass Solution</h4>
                <ol>
                    <li><strong>Initialize:</strong> minPrice = ∞, maxProfit = 0</li>
                    <li><strong>For each price:</strong>
                        <ul>
                            <li>Update minPrice = min(minPrice, price)</li>
                            <li>Update maxProfit = max(maxProfit, price - minPrice)</li>
                        </ul>
                    </li>
                </ol>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
};`
        }
    ]
};
