// ==========================================
// RANGE SEARCH PATTERN
// Split Array Largest Sum, Find Kth Smallest in Sorted Matrix,
// Capacity To Ship Packages, Maximum Average Subarray I
// ==========================================

window.patterns['range-search'] = {
    title: "Range Search",
    scenario: "Involves searching for the maximum or minimum value that satisfies a specific condition within a given range, such as maximizing or minimizing a certain condition.",
    clue: "Look for scenarios where you need to optimize a value within a given range, such as maximizing or minimizing a certain condition.",
    problems: [
        {
            title: "410. Split Array Largest Sum",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/split-array-largest-sum/",
            description: "Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📊 Split Array: [7,2,5,10,8], k=2</div>
                    
                    <div class="allocation-visual">
                        <div class="allocation-row">
                            <div class="allocation-label">Option 1:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">7,2,5</div>
                                <div class="allocation-item">10,8</div>
                            </div>
                            <div class="allocation-sum">max = 18</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Option 2:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">7,2,5,10</div>
                                <div class="allocation-item">8</div>
                            </div>
                            <div class="allocation-sum">max = 24</div>
                        </div>
                        <div class="allocation-row" style="background: rgba(34, 197, 94, 0.1); padding: 0.5rem; border-radius: 8px;">
                            <div class="allocation-label">Optimal:</div>
                            <div class="allocation-items">
                                <div class="allocation-item" style="border-color: #22c55e;">7,2,5</div>
                                <div class="allocation-item" style="border-color: #22c55e;">10,8</div>
                            </div>
                            <div class="allocation-sum" style="color: #22c55e;">max = 18 ✓</div>
                        </div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low=10 (max element)</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high=32 (sum)</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on the answer (largest sum)</p>
                            <p>• For each candidate sum, check if array can be split into ≤k parts</p>
                            <p>• If possible with ≤k parts, try smaller sum (go left)</p>
                            <p>• If not possible, need larger sum (go right)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimized Largest Sum</div>
                        <div class="result-value">18</div>
                    </div>
                </div>
            `,
            approach: "Binary search on the answer. Search range is [max(nums), sum(nums)]. For each mid, use greedy to check if we can split array into ≤k parts where each part has sum ≤mid.",
            timeComplexity: "O(n × log(sum))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int left = *max_element(nums.begin(), nums.end());
        int right = accumulate(nums.begin(), nums.end(), 0);
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canSplit(nums, k, mid)) {
                right = mid;  // Try smaller max sum
            } else {
                left = mid + 1;  // Need larger max sum
            }
        }
        
        return left;
    }
    
    bool canSplit(vector<int>& nums, int k, int maxSum) {
        int partitions = 1;
        int currentSum = 0;
        
        for (int num : nums) {
            if (currentSum + num > maxSum) {
                partitions++;
                currentSum = num;
            } else {
                currentSum += num;
            }
        }
        
        return partitions <= k;
    }
};`
        },
        {
            title: "378. Kth Smallest Element in a Sorted Matrix",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
            description: "Given an n x n matrix where each row and column is sorted in ascending order, return the kth smallest element in the matrix.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔢 Sorted Matrix, k=8</div>
                    
                    <div style="display: flex; justify-content: center;">
                        <div class="matrix-visual" style="grid-template-columns: repeat(3, 1fr);">
                            <div class="matrix-cell">1</div>
                            <div class="matrix-cell">5</div>
                            <div class="matrix-cell">9</div>
                            <div class="matrix-cell">10</div>
                            <div class="matrix-cell highlight">11</div>
                            <div class="matrix-cell highlight">13</div>
                            <div class="matrix-cell highlight">12</div>
                            <div class="matrix-cell highlight">13</div>
                            <div class="matrix-cell highlight">15</div>
                        </div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low=1</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker mid">mid=8</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high=15</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">mid=8, count elements ≤8 = 4 < k=8 → go right</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">mid=11, count elements ≤11 = 6 < k=8 → go right</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">mid=13, count elements ≤13 = 8 >= k=8 → Found!</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on value range [matrix[0][0], matrix[n-1][n-1]]</p>
                            <p>• For each mid, count how many elements ≤ mid</p>
                            <p>• Use matrix's sorted property for O(n) counting</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">8th Smallest Element</div>
                        <div class="result-value">13</div>
                    </div>
                </div>
            `,
            approach: "Binary search on value range. For each mid value, count elements ≤ mid using the sorted property of matrix (start from bottom-left corner).",
            timeComplexity: "O(n × log(max-min))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        int left = matrix[0][0];
        int right = matrix[n-1][n-1];
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            int count = countLessEqual(matrix, mid);
            
            if (count < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
    
    int countLessEqual(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int count = 0;
        int row = n - 1, col = 0;
        
        // Start from bottom-left corner
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= target) {
                count += row + 1;  // All elements in this column up to row
                col++;
            } else {
                row--;
            }
        }
        
        return count;
    }
};`
        },
        {
            title: "1011. Capacity To Ship Packages Within D Days",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            description: "A conveyor belt has packages with weights. Find the minimum ship capacity to ship all packages within D days (packages must be shipped in order).",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📦 Packages: [1,2,3,4,5,6,7,8,9,10], days=5</div>
                    
                    <div class="allocation-visual">
                        <div class="allocation-row">
                            <div class="allocation-label">Day 1:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">1</div>
                                <div class="allocation-item">2</div>
                                <div class="allocation-item">3</div>
                                <div class="allocation-item">4</div>
                                <div class="allocation-item">5</div>
                            </div>
                            <div class="allocation-sum">= 15</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Day 2:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">6</div>
                                <div class="allocation-item">7</div>
                            </div>
                            <div class="allocation-sum">= 13</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Day 3:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">8</div>
                            </div>
                            <div class="allocation-sum">= 8</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Day 4:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">9</div>
                            </div>
                            <div class="allocation-sum">= 9</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Day 5:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">10</div>
                            </div>
                            <div class="allocation-sum">= 10</div>
                        </div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low=10 (max weight)</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high=55 (total)</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on ship capacity</p>
                            <p>• Minimum capacity = max weight (must fit largest package)</p>
                            <p>• Maximum capacity = sum of all weights (ship in 1 day)</p>
                            <p>• For each capacity, greedily check days needed</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Ship Capacity</div>
                        <div class="result-value">15</div>
                    </div>
                </div>
            `,
            approach: "Binary search on capacity. For each capacity, greedily count how many days needed to ship all packages. If days ≤ D, try smaller capacity.",
            timeComplexity: "O(n × log(sum))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int left = *max_element(weights.begin(), weights.end());
        int right = accumulate(weights.begin(), weights.end(), 0);
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canShip(weights, days, mid)) {
                right = mid;  // Try smaller capacity
            } else {
                left = mid + 1;  // Need larger capacity
            }
        }
        
        return left;
    }
    
    bool canShip(vector<int>& weights, int days, int capacity) {
        int daysNeeded = 1;
        int currentLoad = 0;
        
        for (int weight : weights) {
            if (currentLoad + weight > capacity) {
                daysNeeded++;
                currentLoad = weight;
            } else {
                currentLoad += weight;
            }
        }
        
        return daysNeeded <= days;
    }
};`
        },
        {
            title: "643. Maximum Average Subarray I",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/maximum-average-subarray-i/",
            description: "Given an integer array nums and an integer k, find a contiguous subarray of length k that has the maximum average value.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📈 Max Average: [1,12,-5,-6,50,3], k=4</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">1</div>
                        <div class="array-cell highlight">12</div>
                        <div class="array-cell highlight">-5</div>
                        <div class="array-cell highlight">-6</div>
                        <div class="array-cell highlight">50</div>
                        <div class="array-cell">3</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Window [1,12,-5,-6] → sum=2, avg=0.5</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">2</div>
                            <div class="step-content">Window [12,-5,-6,50] → sum=51, avg=12.75 ✓</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">3</div>
                            <div class="step-content">Window [-5,-6,50,3] → sum=42, avg=10.5</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Use sliding window of size k</p>
                            <p>• Maintain running sum, slide by subtracting left and adding right</p>
                            <p>• Track maximum sum found</p>
                            <p>• Return maxSum / k</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Average</div>
                        <div class="result-value">12.75 (sum=51, k=4)</div>
                    </div>
                </div>
            `,
            approach: "Sliding window: compute initial window sum, then slide by removing leftmost and adding new rightmost element. Track maximum sum.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        // Calculate initial window sum
        double windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        double maxSum = windowSum;
        
        // Slide the window
        for (int i = k; i < nums.size(); i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = max(maxSum, windowSum);
        }
        
        return maxSum / k;
    }
};`
        }
    ]
};
