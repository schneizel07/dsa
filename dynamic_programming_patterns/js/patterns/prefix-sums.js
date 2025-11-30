// ==========================================
// PREFIX SUMS PATTERN
// Subarray Sum K, Range Sum Query, Count of Range Sum, Number of Submatrices, Subarray Sums Divisible K
// ==========================================

window.patterns['prefix-sums'] = {
    title: "Prefix Sums",
    scenario: "Problems involving range queries, subarray sums, or cumulative computations. Prefix sums precompute cumulative sums to answer range queries in O(1) time.",
    clue: "Look for: subarray sum problems, range sum queries, cumulative statistics, problems involving sums of contiguous elements, or when you need sum(i, j) = prefix[j] - prefix[i-1].",
    problems: [
        {
            title: "560. Subarray Sum Equals K",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/subarray-sum-equals-k/",
            description: "Given an array of integers and target k, find total number of continuous subarrays whose sum equals k.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔢 Subarray Sum = K: nums=[1,1,1], k=2</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>-</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                            </tr>
                            <tr>
                                <td>Array</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <td>Prefix Sum</td>
                                <td class="dp-cell highlight">0</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell current">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Subarray sum(i, j) = prefix[j] - prefix[i-1]</p>
                            <p>• If prefix[j] - prefix[i-1] = k, then prefix[i-1] = prefix[j] - k</p>
                            <p>• Use hashmap to count prefix sums seen so far</p>
                            <p>• For each prefix[j], check how many times (prefix[j] - k) appeared</p>
                        </div>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box">prefix=0</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">prefix=1</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box highlight">prefix=2</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box active">prefix=3</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">At prefix=2: look for 2-2=0 ✓ | At prefix=3: look for 3-2=1 ✓</p>
                    
                    <div class="result-box">
                        <div class="result-title">Count of Subarrays with Sum K</div>
                        <div class="result-value">2 subarrays: [1,1] at indices 0-1 and 1-2</div>
                    </div>
                </div>
            `,
            approach: "Use prefix sum with hashmap. For each position, check how many previous prefix sums equal (current prefix - k). Those represent valid subarrays ending at current position.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1; // Empty prefix
        
        int count = 0, prefix = 0;
        for (int num : nums) {
            prefix += num;
            // How many previous prefixes satisfy: prefix - prevPrefix = k
            if (prefixCount.count(prefix - k)) {
                count += prefixCount[prefix - k];
            }
            prefixCount[prefix]++;
        }
        return count;
    }
};`
        },
        {
            title: "303. Range Sum Query - Immutable",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/range-sum-query-immutable/",
            description: "Given an integer array, find the sum of elements between indices i and j (inclusive). The sumRange function will be called many times.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📊 Range Sum Query: [-2, 0, 3, -5, 2, -1]</div>
                    
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
                            </tr>
                            <tr>
                                <td>Array</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell highlight">3</td>
                                <td class="dp-cell highlight">-5</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell">-1</td>
                            </tr>
                            <tr>
                                <td>Prefix Sum</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">-4</td>
                                <td class="dp-cell current">-2</td>
                                <td class="dp-cell">-3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Range Sum Formula</div>
                        <div class="recurrence-formula">sumRange(i, j) = prefix[j] - prefix[i-1]</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Example: sumRange(2, 4)</div>
                        <div class="insight-content">
                            <p>• prefix[4] = -2 (sum of indices 0 to 4)</p>
                            <p>• prefix[1] = -2 (sum of indices 0 to 1)</p>
                            <p>• sumRange(2, 4) = prefix[4] - prefix[1] = -2 - (-2) = 0</p>
                            <p>• Verification: 3 + (-5) + 2 = 0 ✓</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Query Time</div>
                        <div class="result-value">O(1) per query after O(n) preprocessing</div>
                    </div>
                </div>
            `,
            approach: "Precompute prefix sum array. Range sum = prefix[j+1] - prefix[i]. Store prefix array of size n+1 where prefix[0] = 0 to handle edge cases cleanly.",
            timeComplexity: "O(1) query, O(n) preprocess",
            spaceComplexity: "O(n)",
            code: `class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`
        },
        {
            title: "327. Count of Range Sum",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/count-of-range-sum/",
            description: "Given array nums and range [lower, upper], return count of range sums in [lower, upper] inclusive. Range sum is sum of elements between indices i and j.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📐 Count of Range Sum: [-2, 5, -1], lower=-2, upper=2</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                            </tr>
                            <tr>
                                <td>Array</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">-1</td>
                            </tr>
                            <tr>
                                <td>Prefix</td>
                                <td class="dp-cell highlight">-2</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell highlight">2</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Range sum(i,j) = prefix[j] - prefix[i-1]</p>
                            <p>• Need: lower ≤ prefix[j] - prefix[i] ≤ upper</p>
                            <p>• For each j, count i where: prefix[j]-upper ≤ prefix[i] ≤ prefix[j]-lower</p>
                            <p>• Use merge sort or segment tree for efficient counting</p>
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card naive">
                            <div class="approach-title">❌ Brute Force</div>
                            <div class="approach-detail">O(n²) - check all pairs</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">✅ Merge Sort</div>
                            <div class="approach-detail">O(n log n) - count during merge</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Valid Range Sums in [-2, 2]</div>
                        <div class="result-value">3: [-2], [5,-1]=4 ✗, [-2,5]=3 ✗, [-2,5,-1]=2 ✓, [5]=5 ✗, [-1]=-1 ✓</div>
                    </div>
                </div>
            `,
            approach: "Use merge sort on prefix sums. During merge, for each element in right half, count elements in left half within valid range using two pointers. O(n log n) time.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return mergeSort(prefix, 0, n, lower, upper);
    }
    
    int mergeSort(vector<long>& prefix, int lo, int hi, int lower, int upper) {
        if (lo >= hi) return 0;
        
        int mid = lo + (hi - lo) / 2;
        int count = mergeSort(prefix, lo, mid, lower, upper) + 
                    mergeSort(prefix, mid + 1, hi, lower, upper);
        
        // Count valid pairs
        int j = mid + 1, k = mid + 1;
        for (int i = lo; i <= mid; i++) {
            while (j <= hi && prefix[j] - prefix[i] < lower) j++;
            while (k <= hi && prefix[k] - prefix[i] <= upper) k++;
            count += k - j;
        }
        
        // Standard merge
        inplace_merge(prefix.begin() + lo, prefix.begin() + mid + 1, prefix.begin() + hi + 1);
        return count;
    }
};`
        },
        {
            title: "1074. Number of Submatrices That Sum to Target",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/",
            description: "Given a matrix and target, return the number of non-empty submatrices that sum to target.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📦 Submatrices Sum = Target: matrix, target=0</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Matrix:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">0</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell current">0</div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Row Prefix Sum:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">2</div>
                                <div class="grid-cell">3</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight: Reduce to 1D</div>
                        <div class="insight-content">
                            <p>• Fix two columns (c1, c2)</p>
                            <p>• Compress rows between c1 and c2 into 1D array</p>
                            <p>• Apply "Subarray Sum = K" on compressed array</p>
                            <p>• Repeat for all column pairs: O(cols²) pairs</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Algorithm</div>
                        <div class="recurrence-formula">
                            For each (c1, c2) pair: compress to 1D, apply prefix sum hashmap
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Submatrices with Sum = Target</div>
                        <div class="result-value">4 submatrices</div>
                    </div>
                </div>
            `,
            approach: "For each pair of columns (c1, c2), compress rows to 1D array. Apply 'Subarray Sum = K' algorithm on compressed array. Total: O(cols² × rows) pairs.",
            timeComplexity: "O(rows × cols²)",
            spaceComplexity: "O(rows × cols)",
            code: `class Solution {
public:
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        
        // Compute row prefix sums
        for (int i = 0; i < m; i++) {
            for (int j = 1; j < n; j++) {
                matrix[i][j] += matrix[i][j-1];
            }
        }
        
        int count = 0;
        for (int c1 = 0; c1 < n; c1++) {
            for (int c2 = c1; c2 < n; c2++) {
                // Apply subarray sum = K on compressed 1D array
                unordered_map<int, int> prefixCount;
                prefixCount[0] = 1;
                int prefix = 0;
                
                for (int r = 0; r < m; r++) {
                    // Sum of row r from column c1 to c2
                    int rowSum = matrix[r][c2] - (c1 > 0 ? matrix[r][c1-1] : 0);
                    prefix += rowSum;
                    
                    if (prefixCount.count(prefix - target)) {
                        count += prefixCount[prefix - target];
                    }
                    prefixCount[prefix]++;
                }
            }
        }
        return count;
    }
};`
        },
        {
            title: "974. Subarray Sums Divisible by K",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
            description: "Return count of non-empty subarrays that have a sum divisible by k.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">➗ Subarrays Divisible by K: [4,5,0,-2,-3,1], k=5</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>-</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                            </tr>
                            <tr>
                                <td>Array</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">0</td>
                                <td class="dp-cell">-2</td>
                                <td class="dp-cell">-3</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <td>Prefix</td>
                                <td class="dp-cell highlight">0</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell highlight">9</td>
                                <td class="dp-cell highlight">9</td>
                                <td class="dp-cell">7</td>
                                <td class="dp-cell highlight">4</td>
                                <td class="dp-cell highlight">5</td>
                            </tr>
                            <tr>
                                <td>Mod 5</td>
                                <td class="dp-cell highlight">0</td>
                                <td class="dp-cell current">4</td>
                                <td class="dp-cell current">4</td>
                                <td class="dp-cell current">4</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell current">4</td>
                                <td class="dp-cell highlight">0</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• (prefix[j] - prefix[i]) % k == 0</p>
                            <p>• Equivalent to: prefix[j] % k == prefix[i] % k</p>
                            <p>• Count pairs with same remainder!</p>
                            <p>• Handle negative: ((x % k) + k) % k</p>
                        </div>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box">Mod 0: 2</div>
                        <div class="state-box">Mod 2: 1</div>
                        <div class="state-box active">Mod 4: 4</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Pairs with mod 0: C(2,2)=1, Pairs with mod 4: C(4,2)=6 → Total = 7</p>
                    
                    <div class="result-box">
                        <div class="result-title">Subarrays Divisible by 5</div>
                        <div class="result-value">7 subarrays</div>
                    </div>
                </div>
            `,
            approach: "Use prefix sum with modular arithmetic. Two prefix sums with same remainder form a valid subarray. Count remainders with hashmap, then count pairs using nC2 formula.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        unordered_map<int, int> modCount;
        modCount[0] = 1;
        
        int count = 0, prefix = 0;
        for (int num : nums) {
            prefix += num;
            // Handle negative modulo
            int mod = ((prefix % k) + k) % k;
            
            if (modCount.count(mod)) {
                count += modCount[mod];
            }
            modCount[mod]++;
        }
        return count;
    }
};`
        }
    ]
};
