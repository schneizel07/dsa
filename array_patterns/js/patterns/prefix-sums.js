window.patterns['prefix-sums'] = {
    icon: '➕',
    title: 'Prefix Sums',
    timeComplexity: 'O(n) typical',
    scenario: 'Consider problems where you need to compute cumulative sums or averages of elements in subarrays or answer queries about subarray sums efficiently. Look for tasks where precomputing sums or other aggregate values can help reduce the time complexity of operations involving subarrays.',
    clue: 'Look for problems mentioning subarray sums, cumulative sums, or range sums, and hints that precomputing sums might optimize the solution.',
    problems: [
        {
            title: 'Count of Smaller Numbers After Self',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
            intuition: 'Use merge sort with index tracking. During merge, count how many elements from right half are smaller than current left element. This gives the count of smaller elements after.',
            visual: `nums = [5, 2, 6, 1]

Merge sort with counting:
[5, 2] [6, 1]
  ↓      ↓
[2, 5] [1, 6]  (track inversions during merge)

Merging [2, 5] and [1, 6]:
- 1 < 2: pick 1, nothing to count
- 2 < 6: pick 2, count 1 (one element from right moved)
- 5 < 6: pick 5, count 1 more
- pick 6

counts: [2, 1, 1, 0]

Original indices tracking needed for correct answer.`,
            approach: '1. Create array of (value, originalIndex) pairs\n2. Merge sort while tracking inversions\n3. During merge, when picking from left, count how many right elements passed\n4. Store counts at original indices',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    vector<int> counts;
    
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        counts.resize(n, 0);
        vector<pair<int, int>> arr(n);  // (value, original index)
        
        for (int i = 0; i < n; i++) {
            arr[i] = {nums[i], i};
        }
        
        mergeSort(arr, 0, n - 1);
        return counts;
    }
    
    void mergeSort(vector<pair<int, int>>& arr, int left, int right) {
        if (left >= right) return;
        
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
    
    void merge(vector<pair<int, int>>& arr, int left, int mid, int right) {
        vector<pair<int, int>> temp;
        int i = left, j = mid + 1;
        int rightCount = 0;  // Elements from right that are smaller
        
        while (i <= mid && j <= right) {
            if (arr[j].first < arr[i].first) {
                rightCount++;
                temp.push_back(arr[j++]);
            } else {
                counts[arr[i].second] += rightCount;
                temp.push_back(arr[i++]);
            }
        }
        
        while (i <= mid) {
            counts[arr[i].second] += rightCount;
            temp.push_back(arr[i++]);
        }
        
        while (j <= right) {
            temp.push_back(arr[j++]);
        }
        
        for (int k = left; k <= right; k++) {
            arr[k] = temp[k - left];
        }
    }
};`
        },
        {
            title: 'Range Sum Query - Mutable',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/range-sum-query-mutable/',
            intuition: 'Use a Segment Tree or Binary Indexed Tree (BIT/Fenwick Tree) for efficient point updates and range sum queries. BIT offers simpler implementation with same complexity.',
            visual: `nums = [1, 3, 5]

Binary Indexed Tree (BIT):
Index:  1    2    3   (1-indexed)
Value:  1    4    5
        ↑    ↑    ↑
       [1] [1+3] [5]

Query sum(0, 2):
  prefix(3) - prefix(0) = (1+3+5) - 0 = 9

Update(1, 2): change nums[1] from 3 to 2
  delta = 2 - 3 = -1
  Update BIT at index 2

After update:
Query sum(0, 2) = 1 + 2 + 5 = 8`,
            approach: '1. Build Binary Indexed Tree from array\n2. For update: calculate delta, update all affected BIT nodes\n3. For sum query: get prefix sum up to right, subtract prefix up to left-1\n4. BIT uses lowbit operation: i & (-i)',
            timeComplexity: 'O(log n) per query/update',
            spaceComplexity: 'O(n)',
            code: `class NumArray {
    vector<int> tree;  // BIT
    vector<int> nums;
    int n;
    
    int lowbit(int x) {
        return x & (-x);
    }
    
    void updateBIT(int i, int delta) {
        while (i <= n) {
            tree[i] += delta;
            i += lowbit(i);
        }
    }
    
    int queryBIT(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= lowbit(i);
        }
        return sum;
    }
    
public:
    NumArray(vector<int>& nums) {
        this->nums = nums;
        n = nums.size();
        tree.resize(n + 1, 0);
        
        // Build BIT
        for (int i = 0; i < n; i++) {
            updateBIT(i + 1, nums[i]);
        }
    }
    
    void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        updateBIT(index + 1, delta);
    }
    
    int sumRange(int left, int right) {
        return queryBIT(right + 1) - queryBIT(left);
    }
};`
        },
        {
            title: 'Count of Range Sum',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/count-of-range-sum/',
            intuition: 'Use prefix sums: range sum [i,j] = prefix[j+1] - prefix[i]. We need to count pairs (i,j) where lower <= prefix[j] - prefix[i] <= upper. Use merge sort to count valid pairs.',
            visual: `nums = [-2, 5, -1], lower = -2, upper = 2

Prefix sums: [0, -2, 3, 2]

Find pairs (i, j) where i < j and:
lower <= prefix[j] - prefix[i] <= upper
-2 <= prefix[j] - prefix[i] <= 2

Pairs:
(0,1): -2 - 0 = -2 ✓
(0,3): 2 - 0 = 2 ✓
(2,3): 2 - 3 = -1 ✓

Count = 3

Ranges: [-2], [-2,5,-1], [-1]`,
            approach: '1. Compute prefix sum array\n2. Use merge sort on prefix array\n3. During merge, for each left element, count right elements in valid range\n4. Use two pointers to find range [lower, upper]',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        
        return mergeSort(prefix, 0, n, lower, upper);
    }
    
    int mergeSort(vector<long long>& prefix, int left, int right, int lower, int upper) {
        if (left >= right) return 0;
        
        int mid = left + (right - left) / 2;
        int count = mergeSort(prefix, left, mid, lower, upper) +
                    mergeSort(prefix, mid + 1, right, lower, upper);
        
        // Count valid pairs across left and right halves
        int lo = mid + 1, hi = mid + 1;
        for (int i = left; i <= mid; i++) {
            while (lo <= right && prefix[lo] - prefix[i] < lower) lo++;
            while (hi <= right && prefix[hi] - prefix[i] <= upper) hi++;
            count += hi - lo;
        }
        
        // Merge
        vector<long long> temp;
        int i = left, j = mid + 1;
        while (i <= mid && j <= right) {
            if (prefix[i] <= prefix[j]) {
                temp.push_back(prefix[i++]);
            } else {
                temp.push_back(prefix[j++]);
            }
        }
        while (i <= mid) temp.push_back(prefix[i++]);
        while (j <= right) temp.push_back(prefix[j++]);
        
        for (int k = left; k <= right; k++) {
            prefix[k] = temp[k - left];
        }
        
        return count;
    }
};`
        },
        {
            title: 'Subarray Product Less Than K',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/subarray-product-less-than-k/',
            intuition: 'Use sliding window. Maintain product of window elements. When product >= k, shrink window from left. Count subarrays ending at current right position.',
            visual: `nums = [10, 5, 2, 6], k = 100

right=0: [10], prod=10 < 100
  subarrays: [10] → count += 1

right=1: [10,5], prod=50 < 100
  subarrays: [5], [10,5] → count += 2

right=2: [10,5,2], prod=100 >= 100
  shrink: [5,2], prod=10 < 100
  subarrays: [2], [5,2] → count += 2

right=3: [5,2,6], prod=60 < 100
  subarrays: [6], [2,6], [5,2,6] → count += 3

Total count = 1 + 2 + 2 + 3 = 8`,
            approach: '1. Initialize left=0, product=1\n2. Expand window by multiplying nums[right]\n3. While product >= k, shrink from left\n4. Add (right - left + 1) to count (subarrays ending at right)\n5. Return total count',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0;
        
        int count = 0;
        int product = 1;
        int left = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            product *= nums[right];
            
            // Shrink window while product >= k
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            
            // All subarrays ending at right with start from left to right
            count += right - left + 1;
        }
        
        return count;
    }
};`
        },
        {
            title: 'Find All Duplicates in an Array',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/',
            intuition: 'Use array indices as hash. Since values are 1 to n, use value as index and negate element at that index. If already negative, it\'s a duplicate.',
            visual: `nums = [4, 3, 2, 7, 8, 2, 3, 1]

Process each number, mark index (value-1) as negative:
i=0, val=4: mark index 3 → [4, 3, 2, -7, 8, 2, 3, 1]
i=1, val=3: mark index 2 → [4, 3, -2, -7, 8, 2, 3, 1]
i=2, val=2: mark index 1 → [4, -3, -2, -7, 8, 2, 3, 1]
i=3, val=7: mark index 6 → [4, -3, -2, -7, 8, 2, -3, 1]
i=4, val=8: mark index 7 → [4, -3, -2, -7, 8, 2, -3, -1]
i=5, val=2: index 1 already negative! → duplicate: 2
i=6, val=3: index 2 already negative! → duplicate: 3
i=7, val=1: mark index 0 → [-4, -3, -2, -7, 8, 2, -3, -1]

Duplicates: [2, 3]`,
            approach: '1. For each value, compute index = abs(value) - 1\n2. If nums[index] is negative, value is duplicate\n3. Otherwise, negate nums[index]\n4. Return all duplicates found',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> duplicates;
        
        for (int num : nums) {
            int index = abs(num) - 1;  // Map value to index
            
            if (nums[index] < 0) {
                // Already visited, so it's a duplicate
                duplicates.push_back(abs(num));
            } else {
                // Mark as visited by negating
                nums[index] = -nums[index];
            }
        }
        
        return duplicates;
    }
};`
        }
    ]
};
