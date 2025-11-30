window.divideConquerPattern = {
    title: "Divide & Conquer",
    scenario: "Break down a problem into smaller subproblems of the same type, solve each subproblem recursively, and combine their solutions to solve the original problem.",
    clue: "Tasks where the solution to a larger problem can be obtained by recursively combining solutions to smaller instances of the same problem, such as binary search or finding maximum or minimum elements in an array.",
    problems: [
        {
            title: "Binary Search",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/binary-search/",
            intuition: "In a sorted array, we can eliminate half of the search space with each comparison. Compare target with middle element: if equal, found it; if target is smaller, search left half; if larger, search right half.",
            approach: "Define base case: if search space is empty (left > right), return -1. Calculate mid = left + (right - left) / 2 to avoid overflow. Compare nums[mid] with target and recursively search the appropriate half.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Array: [1, 3, 5, 7, 9, 11, 13], Target: 9</div>
    
    <div class="binary-search-steps">
        <div class="search-step">
            <div class="step-header">Step 1: left=0, right=6, mid=3</div>
            <div class="array-visual">
                <div class="array-cell">1</div>
                <div class="array-cell">3</div>
                <div class="array-cell">5</div>
                <div class="array-cell mid-cell">7</div>
                <div class="array-cell search-range">9</div>
                <div class="array-cell search-range">11</div>
                <div class="array-cell search-range">13</div>
            </div>
            <div class="step-info">mid=7 < target=9 → Search right half</div>
        </div>
        
        <div class="step-arrow">↓</div>
        
        <div class="search-step">
            <div class="step-header">Step 2: left=4, right=6, mid=5</div>
            <div class="array-visual">
                <div class="array-cell dimmed">1</div>
                <div class="array-cell dimmed">3</div>
                <div class="array-cell dimmed">5</div>
                <div class="array-cell dimmed">7</div>
                <div class="array-cell search-range">9</div>
                <div class="array-cell mid-cell">11</div>
                <div class="array-cell search-range">13</div>
            </div>
            <div class="step-info">mid=11 > target=9 → Search left half</div>
        </div>
        
        <div class="step-arrow">↓</div>
        
        <div class="search-step">
            <div class="step-header">Step 3: left=4, right=4, mid=4</div>
            <div class="array-visual">
                <div class="array-cell dimmed">1</div>
                <div class="array-cell dimmed">3</div>
                <div class="array-cell dimmed">5</div>
                <div class="array-cell dimmed">7</div>
                <div class="array-cell found-cell">9 ✓</div>
                <div class="array-cell dimmed">11</div>
                <div class="array-cell dimmed">13</div>
            </div>
            <div class="step-info success-info">mid=9 == target=9 → Found at index 4!</div>
        </div>
    </div>

    <div class="recurrence-box">
        <div class="recurrence-title">Time Recurrence</div>
        <div class="recurrence-formula">T(n) = T(n/2) + O(1) = O(log n)</div>
    </div>
</div>`,
            timeComplexity: "O(log n)",
            spaceComplexity: "O(log n) recursive, O(1) iterative",
            code: `class Solution {
public:
    // Recursive approach
    int search(vector<int>& nums, int target) {
        return binarySearch(nums, target, 0, nums.size() - 1);
    }
    
    int binarySearch(vector<int>& nums, int target, int left, int right) {
        // Base case: element not found
        if (left > right) return -1;
        
        // Calculate mid (avoid overflow)
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;  // Found!
        } else if (nums[mid] < target) {
            // Search right half
            return binarySearch(nums, target, mid + 1, right);
        } else {
            // Search left half
            return binarySearch(nums, target, left, mid - 1);
        }
    }
    
    // Iterative approach (more space efficient)
    int searchIterative(vector<int>& nums, int target) {
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
        
        return -1;
    }
};`
        },
        {
            title: "Merge Sort (Sort an Array)",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/sort-an-array/",
            intuition: "Divide array into two halves, recursively sort each half, then merge the sorted halves. The merge step combines two sorted arrays into one sorted array in linear time.",
            approach: "Base case: array of size 0 or 1 is already sorted. Divide: split array at midpoint. Conquer: recursively sort both halves. Combine: merge two sorted halves using two-pointer technique.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Merge Sort: [38, 27, 43, 3, 9, 82, 10]</div>
    
    <div class="merge-sort-tree">
        <div class="phase-label divide-label">📤 Divide Phase</div>
        
        <div class="tree-level">
            <div class="merge-node">[38, 27, 43, 3, 9, 82, 10]</div>
        </div>
        <div class="split-arrow">↙ ↘</div>
        <div class="tree-level">
            <div class="merge-node">[38, 27, 43, 3]</div>
            <div class="merge-node">[9, 82, 10]</div>
        </div>
        <div class="split-arrow">↙↘ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↙↘</div>
        <div class="tree-level">
            <div class="merge-node small-node">[38, 27]</div>
            <div class="merge-node small-node">[43, 3]</div>
            <div class="merge-node small-node">[9, 82]</div>
            <div class="merge-node small-node">[10]</div>
        </div>
        <div class="split-arrow">↙↘ &nbsp; ↙↘ &nbsp; ↙↘</div>
        <div class="tree-level">
            <div class="merge-node leaf-node">[38]</div>
            <div class="merge-node leaf-node">[27]</div>
            <div class="merge-node leaf-node">[43]</div>
            <div class="merge-node leaf-node">[3]</div>
            <div class="merge-node leaf-node">[9]</div>
            <div class="merge-node leaf-node">[82]</div>
            <div class="merge-node leaf-node">[10]</div>
        </div>
        
        <div class="phase-divider"></div>
        <div class="phase-label merge-label">📥 Merge Phase</div>
        
        <div class="tree-level">
            <div class="merge-node sorted-node">[27, 38]</div>
            <div class="merge-node sorted-node">[3, 43]</div>
            <div class="merge-node sorted-node">[9, 82]</div>
            <div class="merge-node sorted-node">[10]</div>
        </div>
        <div class="merge-arrow">↖↗ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↖↗</div>
        <div class="tree-level">
            <div class="merge-node sorted-node">[3, 27, 38, 43]</div>
            <div class="merge-node sorted-node">[9, 10, 82]</div>
        </div>
        <div class="merge-arrow">↖ ↗</div>
        <div class="tree-level">
            <div class="merge-node final-node">[3, 9, 10, 27, 38, 43, 82]</div>
        </div>
    </div>

    <div class="recurrence-box">
        <div class="recurrence-title">Time Recurrence</div>
        <div class="recurrence-formula">T(n) = 2T(n/2) + O(n) = O(n log n)</div>
    </div>
</div>`,
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size() - 1);
        return nums;
    }
    
private:
    void mergeSort(vector<int>& nums, int left, int right) {
        // Base case: single element or empty
        if (left >= right) return;
        
        // Divide
        int mid = left + (right - left) / 2;
        
        // Conquer: recursively sort both halves
        mergeSort(nums, left, mid);
        mergeSort(nums, mid + 1, right);
        
        // Combine: merge sorted halves
        merge(nums, left, mid, right);
    }
    
    void merge(vector<int>& nums, int left, int mid, int right) {
        // Create temporary arrays
        vector<int> leftArr(nums.begin() + left, nums.begin() + mid + 1);
        vector<int> rightArr(nums.begin() + mid + 1, nums.begin() + right + 1);
        
        int i = 0, j = 0, k = left;
        
        // Merge while both arrays have elements
        while (i < leftArr.size() && j < rightArr.size()) {
            if (leftArr[i] <= rightArr[j]) {
                nums[k++] = leftArr[i++];
            } else {
                nums[k++] = rightArr[j++];
            }
        }
        
        // Copy remaining elements
        while (i < leftArr.size()) nums[k++] = leftArr[i++];
        while (j < rightArr.size()) nums[k++] = rightArr[j++];
    }
};`
        },
        {
            title: "Quick Sort (Sort an Array)",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/sort-an-array/",
            intuition: "Select a pivot element, partition array so elements smaller than pivot are on left and larger on right. Recursively sort the partitions. Unlike merge sort, the work is done before recursion.",
            approach: "Choose a pivot (random for better average case). Partition: rearrange so elements < pivot are left, elements > pivot are right. Recursively sort left and right partitions. No merge step needed.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Quick Sort: [3, 6, 8, 10, 1, 2, 1]</div>
    
    <div class="quicksort-steps">
        <div class="partition-step">
            <div class="step-label">Step 1: Partition around pivot = 6</div>
            <div class="partition-visual">
                <div class="partition-section less-than">
                    <div class="section-label">&lt; pivot</div>
                    <div class="section-values">[3, 1, 2, 1]</div>
                </div>
                <div class="pivot-element">
                    <div class="section-label">pivot</div>
                    <div class="section-values pivot-value">[6]</div>
                </div>
                <div class="partition-section greater-than">
                    <div class="section-label">&gt; pivot</div>
                    <div class="section-values">[8, 10]</div>
                </div>
            </div>
        </div>
        
        <div class="recursion-branches">
            <div class="branch left-branch">
                <div class="branch-label">Left Partition</div>
                <div class="branch-content">
                    <div class="sub-step">[3, 1, 2, 1] pivot=2</div>
                    <div class="sub-arrow">↓</div>
                    <div class="sub-step">[1, 1] [2] [3]</div>
                    <div class="sub-arrow">↓</div>
                    <div class="sub-step sorted-result">[1, 1, 2, 3]</div>
                </div>
            </div>
            <div class="branch right-branch">
                <div class="branch-label">Right Partition</div>
                <div class="branch-content">
                    <div class="sub-step">[8, 10] pivot=8</div>
                    <div class="sub-arrow">↓</div>
                    <div class="sub-step">[] [8] [10]</div>
                    <div class="sub-arrow">↓</div>
                    <div class="sub-step sorted-result">[8, 10]</div>
                </div>
            </div>
        </div>
        
        <div class="final-result">
            <div class="result-label">✅ Final Result</div>
            <div class="result-array">[1, 1, 2, 3, 6, 8, 10]</div>
        </div>
    </div>

    <div class="approach-comparison">
        <div class="approach-card">
            <div class="approach-title">Merge Sort</div>
            <div class="approach-detail">Work after recursion (merge)</div>
            <div class="approach-detail">Stable sort</div>
            <div class="approach-detail">O(n) extra space</div>
        </div>
        <div class="approach-card">
            <div class="approach-title">Quick Sort</div>
            <div class="approach-detail">Work before recursion (partition)</div>
            <div class="approach-detail">Not stable</div>
            <div class="approach-detail">O(log n) space (in-place)</div>
        </div>
    </div>
</div>`,
            timeComplexity: "O(n log n) average, O(n²) worst",
            spaceComplexity: "O(log n) average",
            code: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        srand(time(0));  // For random pivot
        quickSort(nums, 0, nums.size() - 1);
        return nums;
    }
    
private:
    void quickSort(vector<int>& nums, int left, int right) {
        // Base case
        if (left >= right) return;
        
        // Partition and get pivot position
        int pivotIdx = partition(nums, left, right);
        
        // Recursively sort partitions
        quickSort(nums, left, pivotIdx - 1);
        quickSort(nums, pivotIdx + 1, right);
    }
    
    int partition(vector<int>& nums, int left, int right) {
        // Random pivot for better average case
        int randomIdx = left + rand() % (right - left + 1);
        swap(nums[randomIdx], nums[right]);
        
        int pivot = nums[right];
        int i = left - 1;  // Pointer for smaller elements
        
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                i++;
                swap(nums[i], nums[j]);
            }
        }
        
        // Place pivot in correct position
        swap(nums[i + 1], nums[right]);
        return i + 1;
    }
    
    // Three-way partition for handling duplicates efficiently
    void quickSort3Way(vector<int>& nums, int left, int right) {
        if (left >= right) return;
        
        int lt = left, gt = right, i = left;
        int pivot = nums[left];
        
        while (i <= gt) {
            if (nums[i] < pivot) {
                swap(nums[lt++], nums[i++]);
            } else if (nums[i] > pivot) {
                swap(nums[i], nums[gt--]);
            } else {
                i++;
            }
        }
        
        quickSort3Way(nums, left, lt - 1);
        quickSort3Way(nums, gt + 1, right);
    }
};`
        },
        {
            title: "Maximum Subarray",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/maximum-subarray/",
            intuition: "Using divide and conquer: maximum subarray is either entirely in left half, entirely in right half, or crosses the midpoint. Recursively find max in both halves and compare with crossing sum.",
            approach: "Divide array at mid. Recursively find max subarray in left and right halves. Find max crossing subarray (must include mid and mid+1). Return maximum of these three values.",
            visualHtml: true,
            visual: `
<div class="visual-container">
    <div class="visual-title">Maximum Subarray: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</div>
    
    <div class="max-subarray-visual">
        <div class="divide-step">
            <div class="step-title">Divide at mid (index 4)</div>
            <div class="array-split">
                <div class="split-half left-half">
                    <div class="half-label">Left Half</div>
                    <div class="half-values">[-2, 1, -3, 4, -1]</div>
                </div>
                <div class="split-divider">|</div>
                <div class="split-half right-half">
                    <div class="half-label">Right Half</div>
                    <div class="half-values">[2, 1, -5, 4]</div>
                </div>
            </div>
        </div>

        <div class="three-cases">
            <div class="case-box">
                <div class="case-title">Case 1: Left Max</div>
                <div class="case-value">max([4]) = 4</div>
            </div>
            <div class="case-box">
                <div class="case-title">Case 2: Right Max</div>
                <div class="case-value">max([2,1]) = 3</div>
            </div>
            <div class="case-box highlight-case">
                <div class="case-title">Case 3: Crossing Max</div>
                <div class="case-calculation">
                    <div class="calc-row">Left from mid: 4 + (-1) = 3</div>
                    <div class="calc-row">Right from mid+1: 2 + 1 = 3</div>
                    <div class="calc-row result-row">Crossing: 3 + 3 = 6</div>
                </div>
            </div>
        </div>

        <div class="answer-box">
            <div class="answer-formula">Answer = max(4, 3, 6) = <span class="answer-value">6</span></div>
            <div class="answer-subarray">Subarray: [4, -1, 2, 1]</div>
        </div>
    </div>

    <div class="approach-comparison">
        <div class="approach-card">
            <div class="approach-title">Divide & Conquer</div>
            <div class="approach-detail">Time: O(n log n)</div>
            <div class="approach-detail">Space: O(log n)</div>
        </div>
        <div class="approach-card recommended-approach">
            <div class="approach-title">Kadane's Algorithm ⭐</div>
            <div class="approach-detail">Time: O(n)</div>
            <div class="approach-detail">Space: O(1)</div>
        </div>
    </div>
</div>`,
            timeComplexity: "O(n log n) D&C, O(n) Kadane's",
            spaceComplexity: "O(log n) D&C, O(1) Kadane's",
            code: `class Solution {
public:
    // Divide and Conquer approach
    int maxSubArray(vector<int>& nums) {
        return maxSubArrayDC(nums, 0, nums.size() - 1);
    }
    
private:
    int maxSubArrayDC(vector<int>& nums, int left, int right) {
        // Base case: single element
        if (left == right) return nums[left];
        
        int mid = left + (right - left) / 2;
        
        // Find max in left half, right half, and crossing
        int leftMax = maxSubArrayDC(nums, left, mid);
        int rightMax = maxSubArrayDC(nums, mid + 1, right);
        int crossMax = maxCrossingSum(nums, left, mid, right);
        
        return max({leftMax, rightMax, crossMax});
    }
    
    int maxCrossingSum(vector<int>& nums, int left, int mid, int right) {
        // Find max sum starting from mid going left
        int leftSum = INT_MIN;
        int sum = 0;
        for (int i = mid; i >= left; i--) {
            sum += nums[i];
            leftSum = max(leftSum, sum);
        }
        
        // Find max sum starting from mid+1 going right
        int rightSum = INT_MIN;
        sum = 0;
        for (int i = mid + 1; i <= right; i++) {
            sum += nums[i];
            rightSum = max(rightSum, sum);
        }
        
        return leftSum + rightSum;
    }
    
public:
    // Kadane's Algorithm - O(n) - More efficient
    int maxSubArrayKadane(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            // Either extend current subarray or start new
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};`
        }
    ]
};
