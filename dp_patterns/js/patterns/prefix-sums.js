window.prefixSums = {
    id: "prefix-sums",
    title: "Prefix Sum DP Patterns",
    description: "DP problems leveraging prefix sum arrays for efficient range queries and cumulative computations",
    patterns: [
        {
            title: "1. Range Sum Query - Immutable",
            description: "Given an integer array nums, handle multiple queries to calculate the sum of elements between indices left and right (inclusive).",
            visualization: `
<div class="visual-container">
    <h4>Prefix Sum Array Construction</h4>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">-2</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">-5</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">-1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">idx</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">5</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">prefix</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell highlight">-2</div>
        <div class="dp-cell highlight">-2</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">-4</div>
        <div class="dp-cell highlight">-2</div>
        <div class="dp-cell highlight">-3</div>
    </div>
</div>

<div class="visual-container">
    <h4>Query: sum(0, 2) = prefix[3] - prefix[0] = 1 - 0 = 1</h4>
    <div class="transition-flow">
        <div class="state-box">prefix[right+1]</div>
        <div class="arrow">-</div>
        <div class="state-box">prefix[left]</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">Range Sum</div>
    </div>
</div>

<div class="approach-comparison">
    <h4>Approach Comparison</h4>
    <div class="approach-card">
        <h5>Brute Force</h5>
        <p><strong>Time:</strong> O(n) per query</p>
        <p><strong>Space:</strong> O(1)</p>
        <p>Sum elements in loop each query</p>
    </div>
    <div class="approach-card">
        <h5>Prefix Sum</h5>
        <p><strong>Time:</strong> O(1) per query</p>
        <p><strong>Space:</strong> O(n)</p>
        <p>Precompute, answer in O(1)</p>
    </div>
</div>`,
            code: `class NumArray {
public:
    vector<int> prefix;
    
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        
        // Build prefix sum array
        // prefix[i] = sum of nums[0..i-1]
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        // Sum of nums[left..right]
        // = prefix[right+1] - prefix[left]
        return prefix[right + 1] - prefix[left];
    }
};

// Time: O(n) preprocessing, O(1) per query
// Space: O(n)`
        },
        {
            title: "2. 2D Range Sum Query - Immutable",
            description: "Given a 2D matrix, handle multiple queries to calculate the sum of elements in a rectangular region.",
            visualization: `
<div class="visual-container">
    <h4>2D Prefix Sum Using Inclusion-Exclusion</h4>
    <div style="display: grid; grid-template-columns: repeat(5, 50px); gap: 2px; margin: 15px auto; width: fit-content;">
        <div class="dp-cell">3</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell highlight">6</div>
        <div class="dp-cell highlight">3</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">7</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">5</div>
    </div>
    <p>Query region highlighted: sum(1,1) to (2,2) = 6+3+2+0 = 11</p>
</div>

<div class="visual-container">
    <h4>Inclusion-Exclusion Principle</h4>
    <div class="transition-flow">
        <div class="state-box">prefix[r2+1][c2+1]</div>
        <div class="arrow">-</div>
        <div class="state-box">prefix[r1][c2+1]</div>
        <div class="arrow">-</div>
        <div class="state-box">prefix[r2+1][c1]</div>
        <div class="arrow">+</div>
        <div class="state-box">prefix[r1][c1]</div>
    </div>
</div>

<div class="visual-container">
    <h4>2D Prefix Sum Formula</h4>
    <pre style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px;">
Building: prefix[i][j] = matrix[i-1][j-1] 
                       + prefix[i-1][j] 
                       + prefix[i][j-1] 
                       - prefix[i-1][j-1]

Query: sum(r1,c1,r2,c2) = prefix[r2+1][c2+1] 
                        - prefix[r1][c2+1] 
                        - prefix[r2+1][c1] 
                        + prefix[r1][c1]
    </pre>
</div>`,
            code: `class NumMatrix {
public:
    vector<vector<int>> prefix;
    
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.empty()) return;
        int m = matrix.size(), n = matrix[0].size();
        prefix.resize(m + 1, vector<int>(n + 1, 0));
        
        // Build 2D prefix sum
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                prefix[i + 1][j + 1] = matrix[i][j]
                                     + prefix[i][j + 1]
                                     + prefix[i + 1][j]
                                     - prefix[i][j];
            }
        }
    }
    
    int sumRegion(int r1, int c1, int r2, int c2) {
        // Inclusion-exclusion principle
        return prefix[r2 + 1][c2 + 1]
             - prefix[r1][c2 + 1]
             - prefix[r2 + 1][c1]
             + prefix[r1][c1];
    }
};

// Time: O(mn) preprocessing, O(1) per query
// Space: O(mn)`
        },
        {
            title: "3. Subarray Sum Equals K",
            description: "Given an array of integers and an integer k, find the total number of subarrays whose sum equals k.",
            visualization: `
<div class="visual-container">
    <h4>Prefix Sum with HashMap Technique</h4>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">prefix</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">3</div>
    </div>
    <p>k = 2: Find pairs where prefix[j] - prefix[i] = k</p>
</div>

<div class="visual-container">
    <h4>Key Insight: count(prefix_sum - k)</h4>
    <div class="transition-flow">
        <div class="state-box">Current Sum</div>
        <div class="arrow">-</div>
        <div class="state-box">k</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">Target in Map?</div>
    </div>
</div>

<div class="visual-container">
    <h4>Step-by-Step Execution (k=2)</h4>
    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <tr style="background: var(--bg-tertiary);">
            <th style="padding: 8px; border: 1px solid var(--border);">i</th>
            <th style="padding: 8px; border: 1px solid var(--border);">sum</th>
            <th style="padding: 8px; border: 1px solid var(--border);">sum-k</th>
            <th style="padding: 8px; border: 1px solid var(--border);">map[sum-k]</th>
            <th style="padding: 8px; border: 1px solid var(--border);">count</th>
            <th style="padding: 8px; border: 1px solid var(--border);">map state</th>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">init</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">{0:1}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">{0:1, 1:1}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">{0:1, 1:1, 2:1}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">3</td>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">{0:1, 1:1, 2:1, 3:1}</td>
        </tr>
    </table>
</div>`,
            code: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1; // Empty prefix has sum 0
    
    int sum = 0, count = 0;
    
    for (int num : nums) {
        sum += num;
        
        // If (sum - k) exists, we found subarray(s) with sum k
        if (prefixCount.count(sum - k)) {
            count += prefixCount[sum - k];
        }
        
        prefixCount[sum]++;
    }
    
    return count;
}

// Time: O(n)
// Space: O(n)`
        },
        {
            title: "4. Product of Array Except Self",
            description: "Given an integer array nums, return an array where each element is the product of all elements except itself, without using division.",
            visualization: `
<div class="visual-container">
    <h4>Prefix and Suffix Products</h4>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">prefix</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">6</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">suffix</div>
        <div class="dp-cell highlight">24</div>
        <div class="dp-cell highlight">12</div>
        <div class="dp-cell highlight">4</div>
        <div class="dp-cell">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">result</div>
        <div class="dp-cell" style="color: var(--accent);">24</div>
        <div class="dp-cell" style="color: var(--accent);">12</div>
        <div class="dp-cell" style="color: var(--accent);">8</div>
        <div class="dp-cell" style="color: var(--accent);">6</div>
    </div>
</div>

<div class="visual-container">
    <h4>Formula: result[i] = prefix[i] × suffix[i]</h4>
    <div class="transition-flow">
        <div class="state-box">Product of Left</div>
        <div class="arrow">×</div>
        <div class="state-box">Product of Right</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">Result</div>
    </div>
</div>

<div class="parallel-section">
    <h4>Two Approaches</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="approach-card">
            <h5>Two Arrays</h5>
            <pre style="font-size: 12px;">
prefix[i] = prefix[i-1] * nums[i-1]
suffix[i] = suffix[i+1] * nums[i+1]
result[i] = prefix[i] * suffix[i]</pre>
            <p><strong>Space:</strong> O(n)</p>
        </div>
        <div class="approach-card">
            <h5>O(1) Space Optimized</h5>
            <pre style="font-size: 12px;">
// Pass 1: Build prefix in result
// Pass 2: Multiply suffix on the fly</pre>
            <p><strong>Space:</strong> O(1) extra</p>
        </div>
    </div>
</div>`,
            code: `// Solution 1: Two separate arrays
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> prefix(n, 1), suffix(n, 1), result(n);
    
    // Build prefix products
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }
    
    // Build suffix products
    for (int i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }
    
    // Combine
    for (int i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }
    
    return result;
}

// Solution 2: O(1) extra space
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Build prefix products in result
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    
    // Multiply suffix products
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}

// Time: O(n), Space: O(1) extra for Solution 2`
        },
        {
            title: "5. Continuous Subarray Sum",
            description: "Given an array and integer k, check if the array has a continuous subarray of size at least 2 whose sum is a multiple of k.",
            visualization: `
<div class="visual-container">
    <h4>Key Insight: Prefix Sum Modulo</h4>
    <p style="background: var(--bg-tertiary); padding: 10px; border-radius: 8px;">
        If prefix[j] % k == prefix[i] % k where j > i+1<br>
        Then (prefix[j] - prefix[i]) % k == 0<br>
        So subarray sum from i+1 to j is divisible by k
    </p>
</div>

<div class="visual-container">
    <h4>Example: nums = [23, 2, 4, 6, 7], k = 6</h4>
    <div class="dp-table">
        <div class="dp-cell">idx</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">23</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">6</div>
        <div class="dp-cell">7</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">prefix</div>
        <div class="dp-cell">23</div>
        <div class="dp-cell">25</div>
        <div class="dp-cell highlight">29</div>
        <div class="dp-cell">35</div>
        <div class="dp-cell">42</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">mod 6</div>
        <div class="dp-cell highlight">5</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">5</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell">0</div>
    </div>
</div>

<div class="visual-container">
    <h4>Detection at index 2</h4>
    <div class="transition-flow">
        <div class="state-box">prefix[2] % 6 = 5</div>
        <div class="arrow">==</div>
        <div class="state-box">prefix[0] % 6 = 5</div>
        <div class="arrow">→</div>
        <div class="state-box highlight">Found!</div>
    </div>
    <p>Subarray [2, 4] from index 1 to 2 has sum = 6, divisible by 6 ✓</p>
</div>`,
            code: `bool checkSubarraySum(vector<int>& nums, int k) {
    // Map: remainder -> first index where this remainder occurred
    unordered_map<int, int> remainderIndex;
    remainderIndex[0] = -1; // Handle case when subarray starts from index 0
    
    int prefixSum = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        prefixSum += nums[i];
        int remainder = prefixSum % k;
        
        // Handle negative remainders
        if (remainder < 0) remainder += k;
        
        if (remainderIndex.count(remainder)) {
            // Found same remainder at earlier index
            // Check if subarray length >= 2
            if (i - remainderIndex[remainder] >= 2) {
                return true;
            }
        } else {
            // Store first occurrence of this remainder
            remainderIndex[remainder] = i;
        }
    }
    
    return false;
}

// Time: O(n)
// Space: O(min(n, k))`
        },
        {
            title: "6. Maximum Size Subarray Sum Equals k",
            description: "Given an array nums and target value k, find the maximum length of a subarray that sums to k.",
            visualization: `
<div class="visual-container">
    <h4>Track Earliest Index of Each Prefix Sum</h4>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">-1</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell">-2</div>
        <div class="dp-cell">3</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">prefix</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell highlight">5</div>
        <div class="dp-cell highlight">3</div>
        <div class="dp-cell">6</div>
    </div>
    <p>k = 3: Looking for sum - k in the map</p>
</div>

<div class="visual-container">
    <h4>Step-by-Step (k = 3)</h4>
    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <tr style="background: var(--bg-tertiary);">
            <th style="padding: 8px; border: 1px solid var(--border);">i</th>
            <th style="padding: 8px; border: 1px solid var(--border);">sum</th>
            <th style="padding: 8px; border: 1px solid var(--border);">sum-k</th>
            <th style="padding: 8px; border: 1px solid var(--border);">Found at idx</th>
            <th style="padding: 8px; border: 1px solid var(--border);">Length</th>
            <th style="padding: 8px; border: 1px solid var(--border);">maxLen</th>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-3</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">5</td>
            <td style="padding: 8px; border: 1px solid var(--border);">2</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">-</td>
            <td style="padding: 8px; border: 1px solid var(--border);">0</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">3</td>
            <td style="padding: 8px; border: 1px solid var(--border);">3</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">0</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">-1</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">4</td>
            <td style="padding: 8px; border: 1px solid var(--border); color: var(--accent);">4</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid var(--border);">4</td>
            <td style="padding: 8px; border: 1px solid var(--border);">6</td>
            <td style="padding: 8px; border: 1px solid var(--border);">3</td>
            <td style="padding: 8px; border: 1px solid var(--border);">3</td>
            <td style="padding: 8px; border: 1px solid var(--border);">1</td>
            <td style="padding: 8px; border: 1px solid var(--border);">4</td>
        </tr>
    </table>
    <p>Maximum length subarray with sum 3: indices [0..3] = [1, -1, 5, -2]</p>
</div>`,
            code: `int maxSubArrayLen(vector<int>& nums, int k) {
    unordered_map<long long, int> sumIndex;
    sumIndex[0] = -1; // Sum 0 at index -1 (before array starts)
    
    long long sum = 0;
    int maxLen = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        sum += nums[i];
        
        // If sum - k exists, we found a subarray with sum k
        if (sumIndex.count(sum - k)) {
            maxLen = max(maxLen, i - sumIndex[sum - k]);
        }
        
        // Only store FIRST occurrence (for maximum length)
        if (!sumIndex.count(sum)) {
            sumIndex[sum] = i;
        }
    }
    
    return maxLen;
}

// Time: O(n)
// Space: O(n)`
        },
        {
            title: "7. Count Number of Nice Subarrays",
            description: "Given an array of integers and k, return the number of subarrays with exactly k odd numbers.",
            visualization: `
<div class="visual-container">
    <h4>Transform: odd = 1, even = 0</h4>
    <div class="dp-table">
        <div class="dp-cell">nums</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">parity</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
    </div>
    <p>Now it's "Subarray Sum Equals K" problem!</p>
</div>

<div class="visual-container">
    <h4>Prefix Count of Odd Numbers (k=3)</h4>
    <div class="dp-table">
        <div class="dp-cell">idx</div>
        <div class="dp-cell">-</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">oddCount</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell highlight">3</div>
        <div class="dp-cell highlight">4</div>
    </div>
    <p>At idx 3: oddCount=3, looking for 3-3=0 in map → found 1 subarray</p>
    <p>At idx 4: oddCount=4, looking for 4-3=1 in map → found 1 subarray</p>
</div>

<div class="approach-comparison">
    <h4>Pattern Recognition</h4>
    <div class="approach-card">
        <h5>Key Transformation</h5>
        <p>Count odd numbers = Sum of (num % 2)</p>
        <p>Reduces to prefix sum + hashmap pattern</p>
    </div>
    <div class="approach-card">
        <h5>Similar Problems</h5>
        <p>• Binary Subarrays With Sum</p>
        <p>• Subarrays with K Different Integers</p>
    </div>
</div>`,
            code: `int numberOfSubarrays(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    count[0] = 1; // 0 odd numbers seen before array starts
    
    int oddCount = 0;
    int result = 0;
    
    for (int num : nums) {
        // Count odd numbers (equivalent to sum of num % 2)
        oddCount += num % 2;
        
        // If (oddCount - k) exists, we found subarrays with exactly k odds
        if (count.count(oddCount - k)) {
            result += count[oddCount - k];
        }
        
        count[oddCount]++;
    }
    
    return result;
}

// Alternative: Sliding Window (At Most K approach)
int atMost(vector<int>& nums, int k) {
    if (k < 0) return 0;
    int left = 0, count = 0, result = 0;
    
    for (int right = 0; right < nums.size(); right++) {
        count += nums[right] % 2;
        while (count > k) {
            count -= nums[left] % 2;
            left++;
        }
        result += right - left + 1;
    }
    return result;
}

int numberOfSubarrays(vector<int>& nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

// Time: O(n), Space: O(n) for hashmap, O(1) for sliding window`
        },
        {
            title: "8. Path Sum III (Prefix Sum in Trees)",
            description: "Given a binary tree and target sum, find the number of paths that sum to target. The path can start and end at any node but must go downwards.",
            visualization: `
<div class="visual-container">
    <h4>Prefix Sum Applied to Tree Paths</h4>
    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node highlight">10 (prefix=10)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">5 (prefix=15)</div>
            <div class="tree-node">-3 (prefix=7)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">3 (prefix=18)</div>
            <div class="tree-node highlight">2 (prefix=17)</div>
            <div class="tree-node">11 (prefix=18)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">3</div>
            <div class="tree-node">-2</div>
            <div class="tree-node highlight">1</div>
        </div>
    </div>
    <p>Target = 8: Find paths where currentPrefix - targetPrefix = 8</p>
</div>

<div class="visual-container">
    <h4>DFS with Prefix Sum HashMap</h4>
    <div class="transition-flow">
        <div class="state-box">Enter Node</div>
        <div class="arrow">→</div>
        <div class="state-box">Update Prefix</div>
        <div class="arrow">→</div>
        <div class="state-box">Check (prefix - target)</div>
        <div class="arrow">→</div>
        <div class="state-box highlight">Backtrack</div>
    </div>
    <p style="margin-top: 10px; color: var(--accent);">Important: Remove current prefix from map when backtracking!</p>
</div>

<div class="parallel-section">
    <h4>Approaches Comparison</h4>
    <div class="approach-card">
        <h5>Brute Force</h5>
        <p>Start DFS from every node</p>
        <p><strong>Time:</strong> O(n²)</p>
    </div>
    <div class="approach-card">
        <h5>Prefix Sum + HashMap</h5>
        <p>Single DFS with backtracking</p>
        <p><strong>Time:</strong> O(n)</p>
    </div>
</div>`,
            code: `class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> prefixCount;
        prefixCount[0] = 1; // Handle path starting from root
        return dfs(root, 0, targetSum, prefixCount);
    }
    
private:
    int dfs(TreeNode* node, long long currSum, int target,
            unordered_map<long long, int>& prefixCount) {
        if (!node) return 0;
        
        currSum += node->val;
        
        // Count paths ending at current node
        int count = 0;
        if (prefixCount.count(currSum - target)) {
            count = prefixCount[currSum - target];
        }
        
        // Add current prefix sum to map
        prefixCount[currSum]++;
        
        // Recurse to children
        count += dfs(node->left, currSum, target, prefixCount);
        count += dfs(node->right, currSum, target, prefixCount);
        
        // BACKTRACK: Remove current prefix when leaving this subtree
        prefixCount[currSum]--;
        if (prefixCount[currSum] == 0) {
            prefixCount.erase(currSum);
        }
        
        return count;
    }
};

// Time: O(n) - visit each node once
// Space: O(h) for recursion + O(n) for hashmap`
        }
    ]
};
