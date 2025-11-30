// ==========================================
// BITONIC ARRAY SEARCH PATTERN
// Find Peak Element, Find in Mountain Array, Longest Mountain in Array,
// Peak Index in Mountain Array, Maximum Value at a Given Index in a Bounded Array
// ==========================================

window.patterns['bitonic-array-search'] = {
    title: "Bitonic Array Search",
    scenario: "Involves searching for an element in a bitonic array, which first increases and then decreases (or vice versa).",
    clue: "Look for scenarios where the array exhibits a bitonic behavior, and you need to find an element within it efficiently.",
    problems: [
        {
            title: "162. Find Peak Element",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/find-peak-element/",
            description: "Find a peak element in an array. A peak element is strictly greater than its neighbors. The array may contain multiple peaks, return the index of any peak.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⛰️ Find Peak: [1,2,1,3,5,6,4]</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar ascending" style="height: 25px;">1</div>
                        <div class="mountain-bar peak" style="height: 40px;">2</div>
                        <div class="mountain-bar descending" style="height: 25px;">1</div>
                        <div class="mountain-bar ascending" style="height: 55px;">3</div>
                        <div class="mountain-bar ascending" style="height: 75px;">5</div>
                        <div class="mountain-bar peak" style="height: 95px;">6</div>
                        <div class="mountain-bar descending" style="height: 65px;">4</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer">2</div>
                        <div class="pointer">3</div>
                        <div class="pointer">4</div>
                        <div class="pointer mid">5</div>
                        <div class="pointer">6</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">mid=3, arr[3]=3 < arr[4]=5 → go right (ascending)</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">mid=5, arr[5]=6 > arr[6]=4 → go left or found</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">Index 5 is a peak (6 > 5 and 6 > 4)</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• nums[-1] = nums[n] = -∞ (imaginary boundaries)</p>
                            <p>• If arr[mid] < arr[mid+1] → peak exists on right</p>
                            <p>• If arr[mid] > arr[mid+1] → peak exists on left (or is mid)</p>
                            <p>• Always converges to a peak</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Peak Index</div>
                        <div class="result-value">5 (or 1, both valid)</div>
                    </div>
                </div>
            `,
            approach: "Binary search comparing mid with mid+1. If arr[mid] < arr[mid+1], peak is on the right. Otherwise, peak is at mid or left.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] < nums[mid + 1]) {
                // Ascending, peak is on right
                left = mid + 1;
            } else {
                // Descending, peak is at mid or left
                right = mid;
            }
        }
        
        return left;
    }
};`
        },
        {
            title: "1095. Find in Mountain Array",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/find-in-mountain-array/",
            description: "Given a mountain array and target, return the minimum index where target exists. A mountain array strictly increases then strictly decreases. You can only access the array through an API.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🏔️ Mountain Array: [1,2,3,4,5,3,1], target=3</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar ascending" style="height: 20px;">1</div>
                        <div class="mountain-bar ascending" style="height: 35px;">2</div>
                        <div class="mountain-bar ascending target" style="height: 50px; border: 3px solid #f59e0b;">3</div>
                        <div class="mountain-bar ascending" style="height: 65px;">4</div>
                        <div class="mountain-bar peak" style="height: 80px;">5</div>
                        <div class="mountain-bar descending target" style="height: 50px; border: 3px solid #f59e0b;">3</div>
                        <div class="mountain-bar descending" style="height: 20px;">1</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer found">2✓</div>
                        <div class="pointer">3</div>
                        <div class="pointer">4</div>
                        <div class="pointer">5</div>
                        <div class="pointer">6</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Find peak index = 4</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">Binary search ascending [0,4] → found at index 2</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">Return 2 (minimum index)</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Step 1: Find peak index (binary search)</p>
                            <p>• Step 2: Binary search ascending part [0, peak]</p>
                            <p>• Step 3: If not found, binary search descending part [peak+1, n-1]</p>
                            <p>• Return first found index (minimum)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Index of Target</div>
                        <div class="result-value">2</div>
                    </div>
                </div>
            `,
            approach: "Three binary searches: 1) Find peak, 2) Search ascending part, 3) Search descending part. Return first valid index found.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int findInMountainArray(int target, MountainArray &arr) {
        int n = arr.length();
        
        // Step 1: Find peak
        int left = 0, right = n - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr.get(mid) < arr.get(mid + 1)) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        int peak = left;
        
        // Step 2: Binary search ascending part
        int idx = binarySearch(arr, target, 0, peak, true);
        if (idx != -1) return idx;
        
        // Step 3: Binary search descending part
        return binarySearch(arr, target, peak + 1, n - 1, false);
    }
    
    int binarySearch(MountainArray &arr, int target, int left, int right, bool ascending) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = arr.get(mid);
            
            if (val == target) {
                return mid;
            }
            
            if (ascending) {
                if (val < target) left = mid + 1;
                else right = mid - 1;
            } else {
                if (val > target) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};`
        },
        {
            title: "845. Longest Mountain in Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/longest-mountain-in-array/",
            description: "Return the length of the longest mountain. A mountain has length >= 3, strictly increases to a peak, then strictly decreases.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🏔️ Array: [2,1,4,7,3,2,5]</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar" style="height: 35px;">2</div>
                        <div class="mountain-bar" style="height: 20px;">1</div>
                        <div class="mountain-bar ascending" style="height: 55px;">4</div>
                        <div class="mountain-bar peak" style="height: 95px;">7</div>
                        <div class="mountain-bar descending" style="height: 45px;">3</div>
                        <div class="mountain-bar descending" style="height: 35px;">2</div>
                        <div class="mountain-bar" style="height: 70px;">5</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer left">2</div>
                        <div class="pointer mid">3</div>
                        <div class="pointer"></div>
                        <div class="pointer right">5</div>
                        <div class="pointer">6</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">For each potential peak, expand left and right</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">Peak at index 3 (value 7): left=1, right=5</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">Mountain [1,4,7,3,2] has length 5</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Find peaks: arr[i-1] < arr[i] > arr[i+1]</p>
                            <p>• For each peak, expand left while ascending</p>
                            <p>• Expand right while descending</p>
                            <p>• Track maximum mountain length</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Longest Mountain Length</div>
                        <div class="result-value">5</div>
                    </div>
                </div>
            `,
            approach: "For each potential peak (where arr[i] > arr[i-1] and arr[i] > arr[i+1]), expand left and right to find mountain boundaries. Track max length.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int longestMountain(vector<int>& arr) {
        int n = arr.size();
        if (n < 3) return 0;
        
        int maxLen = 0;
        
        for (int i = 1; i < n - 1; i++) {
            // Check if i is a peak
            if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
                // Expand left
                int left = i;
                while (left > 0 && arr[left-1] < arr[left]) {
                    left--;
                }
                
                // Expand right
                int right = i;
                while (right < n-1 && arr[right] > arr[right+1]) {
                    right++;
                }
                
                int len = right - left + 1;
                maxLen = max(maxLen, len);
            }
        }
        
        return maxLen;
    }
};`
        },
        {
            title: "852. Peak Index in a Mountain Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
            description: "Given a mountain array, return the peak index. Guaranteed to have exactly one peak.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⛰️ Mountain: [0,10,5,2]</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar ascending" style="height: 10px;">0</div>
                        <div class="mountain-bar peak" style="height: 100px;">10</div>
                        <div class="mountain-bar descending" style="height: 50px;">5</div>
                        <div class="mountain-bar descending" style="height: 20px;">2</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer left">L</div>
                        <div class="pointer found">1✓</div>
                        <div class="pointer mid">M</div>
                        <div class="pointer right">R</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">left=0, right=3, mid=1</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">arr[1]=10 > arr[2]=5 → right = mid = 1</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">left == right == 1 → Peak at index 1</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Guaranteed exactly one peak</p>
                            <p>• Compare arr[mid] with arr[mid+1]</p>
                            <p>• If ascending (mid < mid+1) → go right</p>
                            <p>• If descending (mid > mid+1) → go left or stay</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Peak Index</div>
                        <div class="result-value">1</div>
                    </div>
                </div>
            `,
            approach: "Binary search: if arr[mid] < arr[mid+1], peak is to the right (left = mid + 1). Otherwise, peak is at mid or left (right = mid).",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int left = 0, right = arr.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] < arr[mid + 1]) {
                // Ascending, peak on right
                left = mid + 1;
            } else {
                // Descending, peak at mid or left
                right = mid;
            }
        }
        
        return left;
    }
};`
        },
        {
            title: "1802. Maximum Value at a Given Index in a Bounded Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/",
            description: "Construct array of length n where sum ≤ maxSum, all elements ≥ 1, and |arr[i] - arr[i+1]| ≤ 1. Maximize arr[index].",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📊 n=4, index=2, maxSum=6</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar" style="height: 30px;">1</div>
                        <div class="mountain-bar ascending" style="height: 50px;">2</div>
                        <div class="mountain-bar peak" style="height: 70px;">2</div>
                        <div class="mountain-bar descending" style="height: 30px;">1</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer mid">2</div>
                        <div class="pointer">3</div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low = 1</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high = maxSum</div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Sum Calculation</div>
                        <div class="recurrence-formula">
                            Left sum: arithmetic series from max(1, val-index) to val<br>
                            Right sum: arithmetic series from val to max(1, val-(n-1-index))
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on arr[index] value</p>
                            <p>• For each candidate value, calculate minimum sum needed</p>
                            <p>• Array forms a "mountain" around index</p>
                            <p>• Use arithmetic series sum formula</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Value at Index</div>
                        <div class="result-value">2</div>
                    </div>
                </div>
            `,
            approach: "Binary search on the value at index. For each candidate value, calculate the minimum sum required using arithmetic series. Check if sum ≤ maxSum.",
            timeComplexity: "O(log(maxSum))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int maxValue(int n, int index, int maxSum) {
        long left = 1, right = maxSum;
        
        while (left < right) {
            long mid = left + (right - left + 1) / 2;
            
            if (canAchieve(n, index, maxSum, mid)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
    bool canAchieve(int n, int index, long maxSum, long val) {
        long sum = 0;
        
        // Calculate left sum
        long leftCount = index;
        if (val > leftCount) {
            // Arithmetic series from (val - leftCount) to val
            sum += (val - leftCount + val) * (leftCount + 1) / 2;
        } else {
            // Part arithmetic series + ones
            sum += (1 + val) * val / 2;
            sum += (leftCount - val + 1);  // Fill with 1s
        }
        
        // Calculate right sum
        long rightCount = n - index - 1;
        if (val > rightCount) {
            sum += (val - rightCount + val) * (rightCount + 1) / 2;
        } else {
            sum += (1 + val) * val / 2;
            sum += (rightCount - val + 1);
        }
        
        // Subtract val (counted twice)
        sum -= val;
        
        return sum <= maxSum;
    }
};`
        }
    ]
};
