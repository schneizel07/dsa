// ==========================================
// BASIC BINARY SEARCH PATTERN
// Search Insert Position, Find Min in Rotated Sorted Array, Peak Index in Mountain Array,
// Find Smallest Letter Greater Than Target, Valid Perfect Square
// ==========================================

window.patterns['basic-binary-search'] = {
    title: "Basic Binary Search",
    scenario: "Involves searching for a target element in a sorted array by repeatedly dividing the search interval in half.",
    clue: "Look for scenarios where the array is sorted, and you need to find a specific element efficiently.",
    problems: [
        {
            title: "35. Search Insert Position",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/search-insert-position/",
            description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔍 Search Insert Position: [1,3,5,6], target=5</div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">left=0, right=3, mid=1 → arr[1]=3 < 5 → go right</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">left=2, right=3, mid=2 → arr[2]=5 == 5 → Found!</div>
                        </div>
                    </div>
                    
                    <div class="array-visual">
                        <div class="array-cell">1</div>
                        <div class="array-cell">3</div>
                        <div class="array-cell found">5</div>
                        <div class="array-cell">6</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer mid">2</div>
                        <div class="pointer">3</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• If target found, return mid</p>
                            <p>• If not found, left pointer = insert position</p>
                            <p>• Classic binary search template</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Result</div>
                        <div class="result-value">Index 2</div>
                    </div>
                </div>
            `,
            approach: "Use standard binary search. If target found, return index. If loop ends, return left pointer which indicates the correct insert position.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left; // Insert position
    }
};`
        },
        {
            title: "153. Find Minimum in Rotated Sorted Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            description: "Given a sorted rotated array of unique elements, find the minimum element. The array was originally sorted in ascending order and then rotated between 1 and n times.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔄 Rotated Array: [4,5,6,7,0,1,2]</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">4</div>
                        <div class="array-cell">5</div>
                        <div class="array-cell">6</div>
                        <div class="array-cell">7</div>
                        <div class="array-cell found">0</div>
                        <div class="array-cell">1</div>
                        <div class="array-cell">2</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer left">L</div>
                        <div class="pointer"></div>
                        <div class="pointer"></div>
                        <div class="pointer mid">M</div>
                        <div class="pointer"></div>
                        <div class="pointer"></div>
                        <div class="pointer right">R</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">mid=3, arr[3]=7 > arr[6]=2 → min is in right half</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">left=4, mid=5, arr[5]=1 < arr[6]=2 → go left</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">left=4, right=4 → Found minimum = 0</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Compare arr[mid] with arr[right]</p>
                            <p>• If arr[mid] > arr[right] → pivot is in right half</p>
                            <p>• Else → pivot is in left half (including mid)</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Element</div>
                        <div class="result-value">0</div>
                    </div>
                </div>
            `,
            approach: "Binary search comparing mid with right element. If arr[mid] > arr[right], minimum is in right half. Otherwise, it's in left half including mid.",
            timeComplexity: "O(log n)",
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
            } else {
                // Minimum is in left half (including mid)
                right = mid;
            }
        }
        
        return nums[left];
    }
};`
        },
        {
            title: "852. Peak Index in a Mountain Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
            description: "Given a mountain array (values increase then decrease), find the peak index. arr[0] < arr[1] < ... < arr[peak] > ... > arr[n-1].",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⛰️ Mountain Array: [0,2,4,8,6,3,1]</div>
                    
                    <div class="mountain-visual">
                        <div class="mountain-bar ascending" style="height: 20px;">0</div>
                        <div class="mountain-bar ascending" style="height: 40px;">2</div>
                        <div class="mountain-bar ascending" style="height: 60px;">4</div>
                        <div class="mountain-bar peak" style="height: 100px;">8</div>
                        <div class="mountain-bar descending" style="height: 75px;">6</div>
                        <div class="mountain-bar descending" style="height: 45px;">3</div>
                        <div class="mountain-bar descending" style="height: 25px;">1</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">mid=3, arr[3]=8 > arr[4]=6 → peak at mid or left</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">2</div>
                            <div class="step-content">left=0, right=3, mid=1 → arr[1]=2 < arr[2]=4 → go right</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• If arr[mid] < arr[mid+1] → ascending, peak is on right</p>
                            <p>• If arr[mid] > arr[mid+1] → descending, peak is on left (including mid)</p>
                            <p>• Binary search on monotonicity change</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Peak Index</div>
                        <div class="result-value">3 (value = 8)</div>
                    </div>
                </div>
            `,
            approach: "Binary search based on slope direction. If arr[mid] < arr[mid+1], we're on ascending part - go right. Otherwise, peak is at mid or left.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int left = 0, right = arr.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] < arr[mid + 1]) {
                // Ascending part, peak is on right
                left = mid + 1;
            } else {
                // Descending part, peak is at mid or left
                right = mid;
            }
        }
        
        return left; // Peak index
    }
};`
        },
        {
            title: "744. Find Smallest Letter Greater Than Target",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/",
            description: "Given a sorted array of letters and a target letter, find the smallest letter strictly greater than target. Letters wrap around.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔤 Letters: ['c','f','j'], target='c'</div>
                    
                    <div class="array-visual">
                        <div class="array-cell target">c</div>
                        <div class="array-cell found">f</div>
                        <div class="array-cell">j</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer">0</div>
                        <div class="pointer">1</div>
                        <div class="pointer">2</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">mid=1, 'f' > 'c' → answer could be 'f', search left</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">mid=0, 'c' <= 'c' → search right</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">left=1 → Answer is 'f'</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Find first letter > target (strictly greater)</p>
                            <p>• If no such letter, wrap around to first letter</p>
                            <p>• Use modulo for wrap-around: result % n</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Smallest Greater Letter</div>
                        <div class="result-value">'f'</div>
                    </div>
                </div>
            `,
            approach: "Binary search for first element strictly greater than target. Use modulo at the end for wrap-around case.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        int left = 0, right = letters.size();
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (letters[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // Wrap around using modulo
        return letters[left % letters.size()];
    }
};`
        },
        {
            title: "367. Valid Perfect Square",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/valid-perfect-square/",
            description: "Given a positive integer num, return true if num is a perfect square, else return false. Do not use any built-in library function like sqrt.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">✓ Is 16 a Perfect Square?</div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low=1</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker mid">mid</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high=16</div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">low=1, high=16, mid=8 → 8² = 64 > 16 → high = 7</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">low=1, high=7, mid=4 → 4² = 16 == 16 → Found!</div>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Binary Search on Answer</div>
                        <div class="recurrence-formula">Search range: [1, num], check if mid² == num</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search the potential square root</p>
                            <p>• If mid² == num → perfect square</p>
                            <p>• If mid² > num → search lower half</p>
                            <p>• Use long to avoid overflow</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Result</div>
                        <div class="result-value">true (4² = 16)</div>
                    </div>
                </div>
            `,
            approach: "Binary search for a number whose square equals num. Search space is [1, num]. Use long long to prevent overflow when computing mid*mid.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    bool isPerfectSquare(int num) {
        long long left = 1, right = num;
        
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            long long square = mid * mid;
            
            if (square == num) {
                return true;
            } else if (square < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
};`
        }
    ]
};
