window.patterns['sliding-window'] = {
    icon: '🪟',
    title: 'Sliding Window',
    timeComplexity: 'O(n) typical',
    scenario: 'Identify problems involving contiguous subarrays or substrings where you need to maintain a window of elements and slide it across the array. Look for tasks where you need to track a subset of elements within the array that satisfies specific conditions.',
    clue: 'Look for problems involving contiguous subarrays, hints a "window" needs to slide through the array, or mention of properties like "maximum sum" or "minimum length".',
    problems: [
        {
            title: 'Minimum Size Subarray Sum',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
            intuition: 'Use sliding window to find the smallest subarray with sum >= target. Expand window by adding elements until sum >= target, then shrink from left to find minimum length.',
            visual: `nums = [2, 3, 1, 2, 4, 3], target = 7

Window expansion and contraction:
[2] sum=2 < 7, expand
[2,3] sum=5 < 7, expand
[2,3,1] sum=6 < 7, expand
[2,3,1,2] sum=8 >= 7, len=4, shrink
  [3,1,2] sum=6 < 7, expand
  [3,1,2,4] sum=10 >= 7, len=4, shrink
    [1,2,4] sum=7 >= 7, len=3, shrink
      [2,4] sum=6 < 7, expand
      [2,4,3] sum=9 >= 7, len=3, shrink
        [4,3] sum=7 >= 7, len=2 ← minimum!

Answer: 2`,
            approach: '1. Initialize left=0, sum=0, minLen=infinity\n2. Expand window by adding nums[right]\n3. While sum >= target, update minLen and shrink from left\n4. Return minLen if valid, else 0',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0;
        int minLen = INT_MAX;
        
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            
            // Shrink window while sum >= target
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        
        return minLen == INT_MAX ? 0 : minLen;
    }
};`
        },
        {
            title: 'Longest Mountain in Array',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-mountain-in-array/',
            intuition: 'A mountain has strictly increasing then strictly decreasing elements. For each potential peak, count how far left it increases and how far right it decreases.',
            visual: `arr = [2, 1, 4, 7, 3, 2, 5]

Check each potential peak:
i=2 (val=4): left=1, right=0 → not a peak (no right descent)
i=3 (val=7): 
  left extension: 1→4→7 (len=2)
  right extension: 7→3→2 (len=2)
  mountain length = 2 + 1 + 2 = 5 ✓

Mountain visualization:
        7
       /\\
      4  3
     /    \\
    1      2
    
Longest mountain: [1, 4, 7, 3, 2] length = 5`,
            approach: '1. For each index, check if it could be a peak\n2. Count consecutive increasing elements to the left\n3. Count consecutive decreasing elements to the right\n4. If both sides > 0, calculate mountain length\n5. Track maximum mountain length',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int longestMountain(vector<int>& arr) {
        int n = arr.size();
        if (n < 3) return 0;
        
        int maxLen = 0;
        
        for (int i = 1; i < n - 1; i++) {
            // Check if arr[i] is a peak
            if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
                int left = i - 1;
                int right = i + 1;
                
                // Extend left (must be strictly increasing towards peak)
                while (left > 0 && arr[left] > arr[left-1]) {
                    left--;
                }
                
                // Extend right (must be strictly decreasing from peak)
                while (right < n - 1 && arr[right] > arr[right+1]) {
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
            title: 'Longest Continuous Increasing Subsequence',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/longest-continuous-increasing-subsequence/',
            intuition: 'Track the length of current increasing sequence. When sequence breaks (current <= previous), reset length. Track maximum throughout.',
            visual: `nums = [1, 3, 5, 4, 7]

i=0: start sequence, len=1
i=1: 3 > 1, continue, len=2
i=2: 5 > 3, continue, len=3 ← max so far
i=3: 4 < 5, reset, len=1
i=4: 7 > 4, continue, len=2

Maximum: 3 (subsequence [1, 3, 5])

Visualization:
     5
    /  4
   3     7
  /     /
 1     (reset)`,
            approach: '1. Initialize currentLen=1, maxLen=1\n2. For each element, compare with previous\n3. If increasing, increment currentLen\n4. Otherwise, reset currentLen to 1\n5. Update maxLen after each step',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int findLengthOfLCIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        int maxLen = 1, currentLen = 1;
        
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] > nums[i-1]) {
                currentLen++;
                maxLen = max(maxLen, currentLen);
            } else {
                currentLen = 1;
            }
        }
        
        return maxLen;
    }
};`
        },
        {
            title: 'Maximum Points You Can Obtain from Cards',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/',
            intuition: 'We take k cards from either end. Equivalently, find minimum sum of (n-k) consecutive cards in the middle, then subtract from total.',
            visual: `cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3
n = 7, window size = n - k = 4

Total sum = 22

Find minimum window of size 4:
[1,2,3,4] sum=10
  [2,3,4,5] sum=14
    [3,4,5,6] sum=18
      [4,5,6,1] sum=16

Minimum = 10 (first window)
Maximum points = 22 - 10 = 12

Take: [5,6,1] from right or combination`,
            approach: '1. Calculate total sum of all cards\n2. Find minimum sum window of size (n-k)\n3. Answer = total - minimum window sum\n4. This represents taking k cards from ends',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int windowSize = n - k;
        
        // Calculate total sum
        int totalSum = 0;
        for (int card : cardPoints) {
            totalSum += card;
        }
        
        // If we take all cards
        if (windowSize == 0) return totalSum;
        
        // Find minimum sum window of size (n-k)
        int windowSum = 0;
        for (int i = 0; i < windowSize; i++) {
            windowSum += cardPoints[i];
        }
        
        int minWindowSum = windowSum;
        
        for (int i = windowSize; i < n; i++) {
            windowSum += cardPoints[i] - cardPoints[i - windowSize];
            minWindowSum = min(minWindowSum, windowSum);
        }
        
        return totalSum - minWindowSum;
    }
};`
        },
        {
            title: 'Maximum Product Subarray',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/maximum-product-subarray/',
            intuition: 'Track both maximum and minimum product ending at each position. Minimum can become maximum when multiplied by negative number. Reset when current element alone is better.',
            visual: `nums = [2, 3, -2, 4]

i=0: num=2
  maxProd = 2, minProd = 2

i=1: num=3
  maxProd = max(3, 2*3, 2*3) = 6
  minProd = min(3, 2*3, 2*3) = 3

i=2: num=-2
  maxProd = max(-2, 6*-2, 3*-2) = max(-2, -12, -6) = -2
  minProd = min(-2, 6*-2, 3*-2) = min(-2, -12, -6) = -12

i=3: num=4
  maxProd = max(4, -2*4, -12*4) = max(4, -8, -48) = 4
  minProd = min(4, -2*4, -12*4) = -48

Global max = 6 (subarray [2, 3])`,
            approach: '1. Track maxProd and minProd ending at current position\n2. For each element, compute new max and min\n3. Consider: element alone, max*element, min*element\n4. Update global maximum product',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            int num = nums[i];
            
            // Need temp because maxProd is updated before minProd calculation
            int tempMax = max({num, maxProd * num, minProd * num});
            int tempMin = min({num, maxProd * num, minProd * num});
            
            maxProd = tempMax;
            minProd = tempMin;
            
            result = max(result, maxProd);
        }
        
        return result;
    }
};`
        }
    ]
};
