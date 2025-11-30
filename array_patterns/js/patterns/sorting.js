window.patterns['sorting'] = {
    icon: '📈',
    title: 'Sorting',
    timeComplexity: 'O(n log n) typical',
    scenario: 'Consider problems where arranging elements in a specific order can simplify searching, counting, or comparing elements efficiently. Look for tasks where sorting elements according to certain criteria can lead to a solution or optimize subsequent operations.',
    clue: 'Look for problems mentioning that the array needs to be sorted first or hints that sorting might facilitate the solution process.',
    problems: [
        {
            title: 'Sort Colors',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/sort-colors/',
            intuition: 'Dutch National Flag algorithm: use three pointers to partition array into three sections (0s, 1s, 2s). Process elements and swap to correct section.',
            visual: `nums = [2, 0, 2, 1, 1, 0]

low=0  mid=0               high=5
  ↓     ↓                    ↓
[ 2,    0,   2,   1,   1,   0 ]

nums[mid]=2: swap with high, high--
low=0  mid=0          high=4
[ 0,    0,   2,   1,   1,   2 ]

nums[mid]=0: swap with low, low++, mid++
   low=1  mid=1       high=4
[ 0,    0,   2,   1,   1,   2 ]

Continue...
Final: [0, 0, 1, 1, 2, 2]

Regions: [0...low-1]=0s, [low...mid-1]=1s, [high+1...n-1]=2s`,
            approach: '1. Initialize low=0, mid=0, high=n-1\n2. While mid <= high:\n   - If nums[mid]=0: swap with low, increment both\n   - If nums[mid]=1: just increment mid\n   - If nums[mid]=2: swap with high, decrement high\n3. Array is partitioned into 0s, 1s, 2s',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {  // nums[mid] == 2
                swap(nums[mid], nums[high]);
                high--;
                // Don't increment mid, need to check swapped element
            }
        }
    }
};`
        },
        {
            title: 'Meeting Rooms II',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/meeting-rooms-ii/',
            intuition: 'Track when meetings start and end. Sort start and end times separately. At each start, we need a room. At each end, a room frees up. Track maximum concurrent meetings.',
            visual: `intervals = [[0,30], [5,10], [15,20]]

starts = [0, 5, 15]
ends   = [10, 20, 30]

Time 0: meeting starts, rooms = 1
Time 5: meeting starts, rooms = 2
Time 10: meeting ends, rooms = 1
Time 15: meeting starts, rooms = 2
Time 20: meeting ends, rooms = 1
Time 30: meeting ends, rooms = 0

Max rooms needed = 2

Timeline:
0---------30
    5--10
         15--20`,
            approach: '1. Extract and sort start times and end times separately\n2. Use two pointers for starts and ends\n3. If start < end: new meeting, increment rooms\n4. Else: meeting ended, decrement rooms\n5. Track maximum rooms needed',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        vector<int> starts, ends;
        
        for (auto& interval : intervals) {
            starts.push_back(interval[0]);
            ends.push_back(interval[1]);
        }
        
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        
        int rooms = 0, maxRooms = 0;
        int s = 0, e = 0;
        
        while (s < starts.size()) {
            if (starts[s] < ends[e]) {
                rooms++;  // New meeting starts
                s++;
            } else {
                rooms--;  // Meeting ends
                e++;
            }
            maxRooms = max(maxRooms, rooms);
        }
        
        return maxRooms;
    }
};`
        },
        {
            title: 'Largest Number',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/largest-number/',
            intuition: 'Custom sort: for two numbers a and b, compare concatenations ab vs ba. If ab > ba, a should come first. Handle edge case of all zeros.',
            visual: `nums = [3, 30, 34, 5, 9]

Compare pairs by concatenation:
3 vs 30: "330" vs "303" → 330 > 303 → 3 before 30
3 vs 34: "334" vs "343" → 334 < 343 → 34 before 3
5 vs 3:  "53" vs "35"   → 53 > 35   → 5 before 3
9 vs 5:  "95" vs "59"   → 95 > 59   → 9 before 5

After custom sort: [9, 5, 34, 3, 30]
Result: "9534330"`,
            approach: '1. Convert numbers to strings\n2. Custom sort: compare a+b vs b+a\n3. Concatenate sorted strings\n4. Handle edge case: if result starts with 0, return "0"',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> strs;
        for (int num : nums) {
            strs.push_back(to_string(num));
        }
        
        // Custom comparator: "ab" vs "ba"
        sort(strs.begin(), strs.end(), [](const string& a, const string& b) {
            return a + b > b + a;
        });
        
        // Handle edge case of all zeros
        if (strs[0] == "0") return "0";
        
        string result;
        for (const string& s : strs) {
            result += s;
        }
        
        return result;
    }
};`
        },
        {
            title: 'Wiggle Sort II',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/wiggle-sort-ii/',
            intuition: 'We need nums[0] < nums[1] > nums[2] < nums[3]... Find median, then place elements smaller than median at even indices, larger at odd indices.',
            visual: `nums = [1, 5, 1, 1, 6, 4]

After finding median (3) and partitioning:
smaller: [1, 1, 1]
larger:  [4, 5, 6]

Place larger at odd indices (1, 3, 5): [_, 6, _, 5, _, 4]
Place smaller at even indices (0, 2, 4): [1, 6, 1, 5, 1, 4]

Verify: 1 < 6 > 1 < 5 > 1 < 4 ✓`,
            approach: '1. Find median using nth_element\n2. Use virtual indexing to map positions\n3. Three-way partition around median\n4. Place larger elements at odd indices\n5. Place smaller elements at even indices',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        int n = nums.size();
        
        // Find median
        auto midptr = nums.begin() + n / 2;
        nth_element(nums.begin(), midptr, nums.end());
        int median = *midptr;
        
        // Virtual index mapping
        // Maps 0,1,2,3,4,5 to 1,3,5,0,2,4 for n=6
        auto idx = [n](int i) {
            return (2 * i + 1) % (n | 1);
        };
        
        // Three-way partition using Dutch flag
        int i = 0, j = 0, k = n - 1;
        
        while (j <= k) {
            if (nums[idx(j)] > median) {
                swap(nums[idx(i)], nums[idx(j)]);
                i++;
                j++;
            } else if (nums[idx(j)] < median) {
                swap(nums[idx(j)], nums[idx(k)]);
                k--;
            } else {
                j++;
            }
        }
    }
};`
        },
        {
            title: 'Merge Sorted Array',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/merge-sorted-array/',
            intuition: 'Merge from the end to avoid overwriting elements. Compare largest unprocessed elements from both arrays, place larger one at the end of nums1.',
            visual: `nums1 = [1, 2, 3, 0, 0, 0], m = 3
nums2 = [2, 5, 6], n = 3

Start from end:
p1=2, p2=2, pos=5
nums1[2]=3, nums2[2]=6 → 6 > 3 → place 6
[1, 2, 3, 0, 0, 6]

p1=2, p2=1, pos=4
nums1[2]=3, nums2[1]=5 → 5 > 3 → place 5
[1, 2, 3, 0, 5, 6]

p1=2, p2=0, pos=3
nums1[2]=3, nums2[0]=2 → 3 > 2 → place 3
[1, 2, 3, 3, 5, 6]

p1=1, p2=0, pos=2
nums1[1]=2, nums2[0]=2 → place 2
[1, 2, 2, 3, 5, 6]

Continue... Final: [1, 2, 2, 3, 5, 6]`,
            approach: '1. Start from the end of both arrays\n2. Compare elements, place larger at end of nums1\n3. Move pointers accordingly\n4. If nums2 elements remain, copy them',
            timeComplexity: 'O(m + n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p1 = m - 1;      // Pointer for nums1
        int p2 = n - 1;      // Pointer for nums2
        int pos = m + n - 1; // Position to fill
        
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[pos] = nums1[p1];
                p1--;
            } else {
                nums1[pos] = nums2[p2];
                p2--;
            }
            pos--;
        }
        
        // Copy remaining elements from nums2 (if any)
        while (p2 >= 0) {
            nums1[pos] = nums2[p2];
            p2--;
            pos--;
        }
    }
};`
        }
    ]
};
