window.patterns['merge-intervals'] = {
    icon: '📊',
    title: 'Merge Intervals',
    timeComplexity: 'O(n log n) typical',
    scenario: 'Identify problems involving intervals or ranges of values, such as time intervals, scheduling, or overlapping events. Look for tasks where you need to combine or compare intervals, merge overlapping intervals, or find intersections between them.',
    clue: 'Look for problems where the input involves intervals represented as pairs of start and end points, and the task revolves around combining or manipulating these intervals.',
    problems: [
        {
            title: 'Merge Intervals',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/merge-intervals/',
            intuition: 'Sort intervals by start time. Then iterate through and merge overlapping intervals. Two intervals overlap if the start of the second is less than or equal to the end of the first.',
            visual: `intervals = [[1,3], [2,6], [8,10], [15,18]]

After sorting by start:
[1,3], [2,6], [8,10], [15,18]

[1,3] + [2,6] → overlap (2 <= 3) → merge to [1,6]
[1,6] + [8,10] → no overlap (8 > 6) → keep separate
[8,10] + [15,18] → no overlap (15 > 10) → keep separate

Result: [[1,6], [8,10], [15,18]]

Timeline visualization:
1----3
  2------6
         8---10
                  15---18
|--merged--|`,
            approach: '1. Sort intervals by start time\n2. Initialize result with first interval\n3. For each interval, check if it overlaps with last in result\n4. If overlapping, merge by updating end time\n5. If not overlapping, add as new interval',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        
        // Sort by start time
        sort(intervals.begin(), intervals.end());
        
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        
        for (int i = 1; i < intervals.size(); i++) {
            // Check if current overlaps with last merged
            if (intervals[i][0] <= merged.back()[1]) {
                // Merge: update end time
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                // No overlap: add new interval
                merged.push_back(intervals[i]);
            }
        }
        
        return merged;
    }
};`
        },
        {
            title: 'Insert Interval',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/insert-interval/',
            intuition: 'Process intervals in three phases: add all intervals that end before new interval starts, merge all overlapping intervals with the new one, then add remaining intervals.',
            visual: `intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]]
newInterval = [4,8]

Phase 1: Add intervals ending before newInterval starts
[1,2] ends at 2 < 4 → add to result
[3,5] ends at 5 >= 4 → stop

Phase 2: Merge overlapping intervals
[3,5] overlaps [4,8] → merge to [3,8]
[6,7] overlaps [3,8] → merge to [3,8]
[8,10] overlaps [3,8] → merge to [3,10]
[12,16] starts at 12 > 10 → stop

Phase 3: Add remaining
[12,16] → add to result

Result: [[1,2], [3,10], [12,16]]`,
            approach: '1. Add all intervals ending before newInterval starts\n2. Merge all intervals overlapping with newInterval\n3. Add the merged interval\n4. Add all remaining intervals',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0, n = intervals.size();
        
        // Phase 1: Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }
        
        // Phase 2: Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);
        
        // Phase 3: Add remaining intervals
        while (i < n) {
            result.push_back(intervals[i]);
            i++;
        }
        
        return result;
    }
};`
        },
        {
            title: 'Non-overlapping Intervals',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/non-overlapping-intervals/',
            intuition: 'Greedy approach: sort by end time, always keep the interval that ends earliest. This leaves more room for subsequent intervals. Count how many we need to remove.',
            visual: `intervals = [[1,2], [2,3], [3,4], [1,3]]

Sort by end time:
[1,2], [2,3], [1,3], [3,4]

Process:
[1,2] → keep, end = 2
[2,3] → 2 >= 2, keep, end = 3
[1,3] → 1 < 3, OVERLAP! remove (count = 1)
[3,4] → 3 >= 3, keep, end = 4

Removed: 1 interval ([1,3])

Timeline:
1--2
   2--3
1-----3  ← overlaps, remove this
      3--4`,
            approach: '1. Sort intervals by end time\n2. Track the end of last kept interval\n3. If current start >= last end, keep it\n4. Otherwise, remove it (increment count)\n5. Return removal count',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        
        // Sort by end time
        sort(intervals.begin(), intervals.end(), 
             [](const auto& a, const auto& b) {
                 return a[1] < b[1];
             });
        
        int removals = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) {
                // Overlap: remove current (keep the one ending earlier)
                removals++;
            } else {
                // No overlap: keep current
                prevEnd = intervals[i][1];
            }
        }
        
        return removals;
    }
};`
        },
        {
            title: 'Interval List Intersections',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/interval-list-intersections/',
            intuition: 'Use two pointers, one for each list. For current intervals, find intersection (if any). Move the pointer of the interval that ends first.',
            visual: `A = [[0,2], [5,10], [13,23], [24,25]]
B = [[1,5], [8,12], [15,24], [25,26]]

i=0, j=0: [0,2] ∩ [1,5]
  Intersection: [max(0,1), min(2,5)] = [1,2]
  A[0] ends first → i++

i=1, j=0: [5,10] ∩ [1,5]
  Intersection: [max(5,1), min(10,5)] = [5,5]
  B[0] ends first → j++

i=1, j=1: [5,10] ∩ [8,12]
  Intersection: [max(5,8), min(10,12)] = [8,10]
  A[1] ends first → i++

Continue...
Result: [[1,2], [5,5], [8,10], [15,23], [24,24], [25,25]]`,
            approach: '1. Use two pointers i and j for lists A and B\n2. For current intervals, compute intersection\n3. Intersection exists if max(start) <= min(end)\n4. Move pointer of interval that ends first\n5. Continue until either list exhausted',
            timeComplexity: 'O(m + n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    vector<vector<int>> intervalIntersection(
        vector<vector<int>>& firstList, 
        vector<vector<int>>& secondList) {
        
        vector<vector<int>> result;
        int i = 0, j = 0;
        
        while (i < firstList.size() && j < secondList.size()) {
            // Find intersection
            int start = max(firstList[i][0], secondList[j][0]);
            int end = min(firstList[i][1], secondList[j][1]);
            
            // If valid intersection, add it
            if (start <= end) {
                result.push_back({start, end});
            }
            
            // Move pointer of interval that ends first
            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        
        return result;
    }
};`
        }
    ]
};
