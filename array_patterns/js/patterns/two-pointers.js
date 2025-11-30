window.patterns['two-pointers'] = {
    icon: '👆👆',
    title: 'Two Pointers',
    timeComplexity: 'O(n) typical',
    scenario: 'Look for problems where you need to iterate through the array with two pointers, typically starting from different ends or positions within the array. Consider tasks that involve comparing or manipulating elements from two different parts of the array simultaneously.',
    clue: 'Look for problem descriptions mentioning a sorted array or the need to compare elements from both ends of the array.',
    problems: [
        {
            title: 'Two Sum',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/two-sum/',
            intuition: 'For a sorted array, use two pointers from both ends. If sum is too small, move left pointer right. If sum is too big, move right pointer left. For unsorted arrays, use a hash map for O(n) lookup.',
            visual: `arr = [2, 7, 11, 15], target = 9

left=0           right=3
  ↓                 ↓
[ 2,   7,   11,   15 ]
  
2 + 15 = 17 > 9  → move right
2 + 11 = 13 > 9  → move right  
2 + 7  = 9  ✓   → Found!`,
            approach: '1. Initialize two pointers at start and end (for sorted array)\n2. Calculate sum of elements at both pointers\n3. If sum equals target, return indices\n4. If sum < target, move left pointer right\n5. If sum > target, move right pointer left\n6. Continue until pointers meet',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Using hash map for unsorted array
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
    
    // For sorted array - Two Pointers approach
    vector<int> twoSumSorted(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return {left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`
        },
        {
            title: '3Sum',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/3sum/',
            intuition: 'Fix one element, then use two pointers to find the other two that sum to negative of the fixed element. Sort the array first to enable two-pointer technique and easily skip duplicates.',
            visual: `nums = [-1, 0, 1, 2, -1, -4]
After sort: [-4, -1, -1, 0, 1, 2]

Fix i=1 (nums[i]=-1), find two sum = 1
      i    L           R
      ↓    ↓           ↓
[-4, -1,  -1,   0,   1,   2]
          
-1 + 2 = 1 ✓  Found triplet: [-1, -1, 2]`,
            approach: '1. Sort the array\n2. Fix the first element using outer loop\n3. Use two pointers for remaining two elements\n4. Skip duplicates to avoid duplicate triplets\n5. If sum < 0, move left pointer\n6. If sum > 0, move right pointer',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        for (int i = 0; i < n - 2; i++) {
            // Skip duplicates for first element
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1, right = n - 1;
            int target = -nums[i];
            
            while (left < right) {
                int sum = nums[left] + nums[right];
                if (sum == target) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    // Skip duplicates
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
};`
        },
        {
            title: '3Sum Closest',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/3sum-closest/',
            intuition: 'Similar to 3Sum, but instead of finding exact sum, track the closest sum seen so far. Update closest when we find a sum nearer to target.',
            visual: `nums = [-1, 2, 1, -4], target = 1
Sorted: [-4, -1, 1, 2]

Fix i=0: find closest to 1-(-4)=5
      i   L       R
      ↓   ↓       ↓
    [-4, -1,  1,  2]
    
-1 + 2 = 1, total = -4+1 = -3, diff = |1-(-3)| = 4
-1 + 1 = 0, total = -4+0 = -4, diff = |1-(-4)| = 5

Fix i=1: -1 + 1 + 2 = 2, diff = |1-2| = 1 ← Closest!`,
            approach: '1. Sort the array\n2. Initialize closest sum with first three elements\n3. Fix first element, use two pointers\n4. Calculate current sum and update closest if nearer\n5. Move pointers based on comparison with target',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int closest = nums[0] + nums[1] + nums[2];
        
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if (abs(sum - target) < abs(closest - target)) {
                    closest = sum;
                }
                
                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    return target; // Exact match found
                }
            }
        }
        return closest;
    }
};`
        },
        {
            title: 'Remove Duplicates from Sorted Array',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
            intuition: 'Use slow pointer to track position of unique elements, fast pointer to scan through array. When fast finds a new unique element, copy it to slow position.',
            visual: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]

slow  fast
 ↓     ↓
[0,    0,   1,   1,   1,   2,   2,   3,   3,   4]
       same, skip
       
slow       fast
 ↓          ↓
[0,    0,   1,   1,   1,   2,   2,   3,   3,   4]
            different! copy to slow+1
            
    slow        fast
     ↓           ↓
[0,   1,   1,   1,   1,   2,   2,   3,   3,   4]

Result: [0, 1, 2, 3, 4, ...], k = 5`,
            approach: '1. Initialize slow pointer at 0 (first unique element)\n2. Fast pointer scans from index 1\n3. When nums[fast] != nums[slow], increment slow and copy\n4. Return slow + 1 as count of unique elements',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        int slow = 0;  // Position of last unique element
        
        for (int fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        
        return slow + 1;  // Count of unique elements
    }
};`
        },
        {
            title: 'Squares of a Sorted Array',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/squares-of-a-sorted-array/',
            intuition: 'Since array is sorted, largest squares are at the ends (negative numbers become large when squared). Use two pointers from both ends, compare absolute values, and fill result array from the end.',
            visual: `nums = [-4, -1, 0, 3, 10]

left=0              right=4
  ↓                    ↓
[-4,  -1,   0,   3,   10]
|−4|=4            |10|=10

10 > 4, so place 100 at end
result = [_, _, _, _, 100]

left=0         right=3
  ↓               ↓
[-4,  -1,   0,   3,   10]
|−4|=4        |3|=3

4 > 3, so place 16
result = [_, _, _, 16, 100]

Final: [0, 1, 9, 16, 100]`,
            approach: '1. Initialize left=0, right=n-1\n2. Create result array, fill from end\n3. Compare |nums[left]| vs |nums[right]|\n4. Place larger square at current position\n5. Move the pointer that contributed',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);
        int left = 0, right = n - 1;
        int pos = n - 1;  // Fill from the end
        
        while (left <= right) {
            int leftSq = nums[left] * nums[left];
            int rightSq = nums[right] * nums[right];
            
            if (leftSq > rightSq) {
                result[pos] = leftSq;
                left++;
            } else {
                result[pos] = rightSq;
                right--;
            }
            pos--;
        }
        
        return result;
    }
};`
        }
    ]
};
