// Pattern 3: Merge K Lists
const mergeKListsProblems = {
    title: "Merge K Lists",
    scenario: "You have K sorted lists and need to merge them into a single sorted list while maintaining order.",
    clue: "Look for problems where you're required to merge multiple sorted sequences while maintaining order.",
    problems: [
        {
            number: 23,
            title: "Merge k Sorted Lists",
            link: "https://leetcode.com/problems/merge-k-sorted-lists/",
            difficulty: "Hard",
            intuition: "Use a min-heap to always get the smallest element among all list heads. After taking an element, advance that list's pointer and add the next element to the heap.",
            approach: [
                "Create a min-heap storing {value, node pointer}",
                "Add the head of each non-empty list to the heap",
                "While heap is not empty, pop the minimum",
                "Add popped node to result list",
                "If popped node has next, push next to heap",
                "Return the merged list head"
            ],
            timeComplexity: "O(n log k) where n = total nodes",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Min-heap comparator
        auto cmp = [](ListNode* a, ListNode* b) {
            return a->val > b->val;
        };
        
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> minHeap(cmp);
        
        // Add head of each list
        for (ListNode* list : lists) {
            if (list) {
                minHeap.push(list);
            }
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!minHeap.empty()) {
            ListNode* node = minHeap.top();
            minHeap.pop();
            
            tail->next = node;
            tail = tail->next;
            
            if (node->next) {
                minHeap.push(node->next);
            }
        }
        
        return dummy.next;
    }
};`
        },
        {
            number: 88,
            title: "Merge Sorted Array",
            link: "https://leetcode.com/problems/merge-sorted-array/",
            difficulty: "Easy",
            intuition: "While this can be solved with two pointers (optimal), a heap approach works too. However, the two-pointer approach from the end is more elegant and in-place.",
            approach: [
                "Start from the end of both arrays",
                "Compare elements and place larger one at the end of nums1",
                "Move pointers accordingly",
                "Handle remaining elements from nums2 if any",
                "No heap needed - two pointers is optimal here"
            ],
            timeComplexity: "O(m + n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1;      // Last element in nums1's data
        int j = n - 1;      // Last element in nums2
        int k = m + n - 1;  // Last position in nums1
        
        // Merge from the end
        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }
        
        // Copy remaining elements from nums2
        while (j >= 0) {
            nums1[k--] = nums2[j--];
        }
    }
};

// Alternative: Heap approach (less efficient but shows pattern)
class SolutionHeap {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (int i = 0; i < m; i++) minHeap.push(nums1[i]);
        for (int i = 0; i < n; i++) minHeap.push(nums2[i]);
        
        for (int i = 0; i < m + n; i++) {
            nums1[i] = minHeap.top();
            minHeap.pop();
        }
    }
};`
        },
        {
            number: 56,
            title: "Merge Intervals",
            link: "https://leetcode.com/problems/merge-intervals/",
            difficulty: "Medium",
            intuition: "Sort intervals by start time, then iterate and merge overlapping intervals. While not a classic heap problem, understanding interval merging is key for related heap problems.",
            approach: [
                "Sort intervals by start time",
                "Initialize result with first interval",
                "For each subsequent interval, check overlap with last in result",
                "If overlapping, merge by extending end time",
                "If not overlapping, add as new interval",
                "Return merged intervals"
            ],
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        
        // Sort by start time
        sort(intervals.begin(), intervals.end());
        
        vector<vector<int>> result;
        result.push_back(intervals[0]);
        
        for (int i = 1; i < intervals.size(); i++) {
            // Check if current overlaps with last merged
            if (intervals[i][0] <= result.back()[1]) {
                // Merge by extending end
                result.back()[1] = max(result.back()[1], intervals[i][1]);
            } else {
                // No overlap, add new interval
                result.push_back(intervals[i]);
            }
        }
        
        return result;
    }
};`
        },
        {
            number: 632,
            title: "Smallest Range Covering Elements from K Lists",
            link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",
            difficulty: "Hard",
            intuition: "Use a min-heap containing one element from each list. Track the current max. The range is [heap_min, current_max]. Advance the minimum element's list to try to shrink the range.",
            approach: [
                "Initialize min-heap with first element from each list",
                "Track the maximum element among current selections",
                "Current range = [heap.top(), max_value]",
                "Pop minimum, update range if smaller",
                "Push next element from that list, update max",
                "Stop when any list is exhausted"
            ],
            timeComplexity: "O(n log k) where n = total elements",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        // Min-heap: {value, list_index, element_index}
        priority_queue<tuple<int,int,int>,
                      vector<tuple<int,int,int>>,
                      greater<tuple<int,int,int>>> minHeap;
        
        int curMax = INT_MIN;
        
        // Initialize with first element from each list
        for (int i = 0; i < nums.size(); i++) {
            minHeap.push({nums[i][0], i, 0});
            curMax = max(curMax, nums[i][0]);
        }
        
        vector<int> result = {0, INT_MAX};
        
        while (true) {
            auto [curMin, listIdx, elemIdx] = minHeap.top();
            minHeap.pop();
            
            // Update result if current range is smaller
            if (curMax - curMin < result[1] - result[0]) {
                result = {curMin, curMax};
            }
            
            // Move to next element in this list
            if (elemIdx + 1 == nums[listIdx].size()) {
                break;  // This list exhausted
            }
            
            int nextVal = nums[listIdx][elemIdx + 1];
            minHeap.push({nextVal, listIdx, elemIdx + 1});
            curMax = max(curMax, nextVal);
        }
        
        return result;
    }
};`
        }
    ]
};

// Store for later rendering
window.mergeKListsProblems = mergeKListsProblems;
