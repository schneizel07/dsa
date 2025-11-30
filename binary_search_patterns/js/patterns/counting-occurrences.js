// ==========================================
// COUNTING OCCURRENCES PATTERN
// Find First and Last Position, Count Negative Numbers in Sorted Matrix,
// Search a 2D Matrix II, Find Minimum in Rotated Sorted Array II, Count Primes
// ==========================================

window.patterns['counting-occurrences'] = {
    title: "Counting Occurrences",
    scenario: "Involves counting the number of occurrences of a specific value or satisfying a certain condition.",
    clue: "Look for scenarios where you need to count occurrences or determine the frequency of certain elements/values in a sorted array or range.",
    problems: [
        {
            title: "34. Find First and Last Position of Element in Sorted Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            description: "Given an array of integers sorted in non-decreasing order, find the starting and ending position of a given target value. Return [-1, -1] if not found.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎯 Array: [5,7,7,8,8,8,10], target=8</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">5</div>
                        <div class="array-cell">7</div>
                        <div class="array-cell">7</div>
                        <div class="array-cell found">8</div>
                        <div class="array-cell target">8</div>
                        <div class="array-cell found">8</div>
                        <div class="array-cell">10</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer">2</div>
                        <div class="pointer left">3</div>
                        <div class="pointer">4</div>
                        <div class="pointer right">5</div>
                        <div class="pointer">6</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Find leftmost 8: binary search with right=mid when found</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">Find rightmost 8: binary search with left=mid+1 when found</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Two binary searches: one for first, one for last</p>
                            <p>• First occurrence: when found, keep searching left</p>
                            <p>• Last occurrence: when found, keep searching right</p>
                            <p>• Count = last - first + 1</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">First and Last Position</div>
                        <div class="result-value">[3, 5]</div>
                    </div>
                </div>
            `,
            approach: "Run two binary searches: one to find leftmost occurrence (when equal, go left), one to find rightmost (when equal, go right).",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findFirst(nums, target);
        int last = findLast(nums, target);
        return {first, last};
    }
    
    int findFirst(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                result = mid;
                right = mid - 1;  // Keep searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    int findLast(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                result = mid;
                left = mid + 1;  // Keep searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "1351. Count Negative Numbers in a Sorted Matrix",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
            description: "Given an m x n matrix where each row and column is sorted in non-increasing order, count the number of negative numbers.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📊 Count Negatives in Matrix</div>
                    
                    <div style="display: flex; justify-content: center;">
                        <div class="matrix-visual" style="grid-template-columns: repeat(4, 1fr);">
                            <div class="matrix-cell positive">4</div>
                            <div class="matrix-cell positive">3</div>
                            <div class="matrix-cell positive">2</div>
                            <div class="matrix-cell negative">-1</div>
                            <div class="matrix-cell positive">3</div>
                            <div class="matrix-cell positive">2</div>
                            <div class="matrix-cell positive">1</div>
                            <div class="matrix-cell negative">-1</div>
                            <div class="matrix-cell positive">1</div>
                            <div class="matrix-cell positive">1</div>
                            <div class="matrix-cell negative">-1</div>
                            <div class="matrix-cell negative">-2</div>
                            <div class="matrix-cell negative">-1</div>
                            <div class="matrix-cell negative">-1</div>
                            <div class="matrix-cell negative">-2</div>
                            <div class="matrix-cell negative">-3</div>
                        </div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Start from top-right corner</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">If negative, count rest of row and move down</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">3</div>
                            <div class="step-content">If positive/zero, move left</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Start from top-right (or bottom-left)</p>
                            <p>• Use sorted property: if cell is negative, all cells below in column are negative</p>
                            <p>• If cell is non-negative, all cells left are non-negative</p>
                            <p>• Staircase pattern traversal</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Count of Negative Numbers</div>
                        <div class="result-value">8</div>
                    </div>
                </div>
            `,
            approach: "Start from top-right corner. If current cell is negative, add remaining cells in row to count and move down. If non-negative, move left.",
            timeComplexity: "O(m + n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int count = 0;
        int row = 0, col = n - 1;
        
        // Start from top-right corner
        while (row < m && col >= 0) {
            if (grid[row][col] < 0) {
                // All elements below in this column are negative
                count += (m - row);
                col--;  // Move left
            } else {
                row++;  // Move down
            }
        }
        
        return count;
    }
};`
        },
        {
            title: "240. Search a 2D Matrix II",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            description: "Search for a target value in an m x n matrix where each row is sorted left to right and each column is sorted top to bottom.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔍 Search Matrix for target=5</div>
                    
                    <div style="display: flex; justify-content: center;">
                        <div class="matrix-visual" style="grid-template-columns: repeat(5, 1fr);">
                            <div class="matrix-cell">1</div>
                            <div class="matrix-cell">4</div>
                            <div class="matrix-cell">7</div>
                            <div class="matrix-cell">11</div>
                            <div class="matrix-cell highlight">15</div>
                            <div class="matrix-cell">2</div>
                            <div class="matrix-cell highlight">5</div>
                            <div class="matrix-cell">8</div>
                            <div class="matrix-cell">12</div>
                            <div class="matrix-cell">19</div>
                            <div class="matrix-cell">3</div>
                            <div class="matrix-cell">6</div>
                            <div class="matrix-cell">9</div>
                            <div class="matrix-cell">16</div>
                            <div class="matrix-cell">22</div>
                            <div class="matrix-cell">10</div>
                            <div class="matrix-cell">13</div>
                            <div class="matrix-cell">14</div>
                            <div class="matrix-cell">17</div>
                            <div class="matrix-cell">24</div>
                            <div class="matrix-cell">18</div>
                            <div class="matrix-cell">21</div>
                            <div class="matrix-cell">23</div>
                            <div class="matrix-cell">26</div>
                            <div class="matrix-cell">30</div>
                        </div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Start at (0,4)=15 > 5 → move left</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">At (0,3)=11 > 5 → move left</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">3</div>
                            <div class="step-content">At (0,2)=7 > 5 → move left</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">4</div>
                            <div class="step-content">At (0,1)=4 < 5 → move down</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">5</div>
                            <div class="step-content">At (1,1)=5 == 5 → Found!</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Start from top-right (or bottom-left)</p>
                            <p>• If current > target → move left (eliminate column)</p>
                            <p>• If current < target → move down (eliminate row)</p>
                            <p>• Each step eliminates a row or column</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Target Found?</div>
                        <div class="result-value">true (at position [1,1])</div>
                    </div>
                </div>
            `,
            approach: "Start from top-right corner. If current equals target, return true. If current > target, move left. If current < target, move down.",
            timeComplexity: "O(m + n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int row = 0, col = n - 1;
        
        // Start from top-right corner
        while (row < m && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;  // Eliminate column
            } else {
                row++;  // Eliminate row
            }
        }
        
        return false;
    }
};`
        },
        {
            title: "154. Find Minimum in Rotated Sorted Array II",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
            description: "Find minimum in rotated sorted array that may contain duplicates.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔄 Rotated Array with Duplicates: [2,2,2,0,1,2]</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">2</div>
                        <div class="array-cell">2</div>
                        <div class="array-cell">2</div>
                        <div class="array-cell found">0</div>
                        <div class="array-cell">1</div>
                        <div class="array-cell">2</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer left">L</div>
                        <div class="pointer"></div>
                        <div class="pointer mid">M</div>
                        <div class="pointer"></div>
                        <div class="pointer"></div>
                        <div class="pointer right">R</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">arr[mid]=2 == arr[right]=2 → can't decide, shrink right</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">arr[mid]=2 > arr[right]=1 → min is in right half</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">Converge to minimum = 0</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Same as Find Min I, but handle duplicates</p>
                            <p>• When arr[mid] == arr[right], can't determine which half</p>
                            <p>• Solution: shrink right by 1 (right--)</p>
                            <p>• Worst case becomes O(n) when all same</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Element</div>
                        <div class="result-value">0</div>
                    </div>
                </div>
            `,
            approach: "Same as Find Minimum I, but when arr[mid] == arr[right], we can't determine which half has the minimum. Simply decrement right by 1.",
            timeComplexity: "O(log n) average, O(n) worst case",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                // Minimum is in right half
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                // Minimum is in left half including mid
                right = mid;
            } else {
                // nums[mid] == nums[right], can't decide
                // Safely shrink by 1
                right--;
            }
        }
        
        return nums[left];
    }
};`
        },
        {
            title: "204. Count Primes",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/count-primes/",
            description: "Count the number of prime numbers less than a non-negative number n.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔢 Count Primes less than 10</div>
                    
                    <div class="array-visual">
                        <div class="array-cell eliminated">0</div>
                        <div class="array-cell eliminated">1</div>
                        <div class="array-cell found">2</div>
                        <div class="array-cell found">3</div>
                        <div class="array-cell eliminated">4</div>
                        <div class="array-cell found">5</div>
                        <div class="array-cell eliminated">6</div>
                        <div class="array-cell found">7</div>
                        <div class="array-cell eliminated">8</div>
                        <div class="array-cell eliminated">9</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Mark 0, 1 as not prime</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">Start with 2: mark 4, 6, 8 as composite</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">3</div>
                            <div class="step-content">Move to 3: mark 6, 9 as composite</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">4</div>
                            <div class="step-content">Primes found: 2, 3, 5, 7 = 4 primes</div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Sieve of Eratosthenes</div>
                        <div class="recurrence-formula">
                            For each prime p, mark p², p²+p, p²+2p, ... as composite
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Sieve of Eratosthenes algorithm</p>
                            <p>• Only need to check up to √n</p>
                            <p>• Start marking from i² (smaller multiples already marked)</p>
                            <p>• Can skip even numbers after 2</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Count of Primes < 10</div>
                        <div class="result-value">4</div>
                    </div>
                </div>
            `,
            approach: "Sieve of Eratosthenes: Create boolean array, mark multiples of each prime as composite. Count remaining primes.",
            timeComplexity: "O(n log log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int countPrimes(int n) {
        if (n <= 2) return 0;
        
        vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;
        
        // Sieve of Eratosthenes
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                // Mark multiples of i as not prime
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        // Count primes
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }
        
        return count;
    }
};`
        }
    ]
};
