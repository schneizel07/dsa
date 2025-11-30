// Pattern 4: Sliding Window Maximum/Minimum
const slidingWindowProblems = {
    title: "Sliding Window Maximum/Minimum",
    scenario: "You need to find the maximum or minimum element in all contiguous subarrays of size K.",
    clue: "Look for problems where you maintain a sliding window of fixed size and efficiently find the maximum or minimum element.",
    problems: [
        {
            number: 239,
            title: "Sliding Window Maximum",
            link: "https://leetcode.com/problems/sliding-window-maximum/",
            difficulty: "Hard",
            intuition: "Use a monotonic deque to maintain candidates for maximum in decreasing order. The front always has the current window maximum. Remove elements outside window and smaller elements when adding new ones.",
            approach: [
                "Use deque storing indices (not values)",
                "For each element, remove indices outside current window",
                "Remove indices of smaller elements from back (they can't be max)",
                "Add current index to deque",
                "Front of deque is index of maximum for current window",
                "Record result once window size reaches K"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;  // Store indices
        vector<int> result;
        
        for (int i = 0; i < nums.size(); i++) {
            // Remove indices outside current window
            while (!dq.empty() && dq.front() < i - k + 1) {
                dq.pop_front();
            }
            
            // Remove smaller elements (they can't be maximum)
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            
            dq.push_back(i);
            
            // Window is complete, record maximum
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        
        return result;
    }
};

// Alternative: Max-Heap approach (slightly less efficient)
class SolutionHeap {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Max-heap: {value, index}
        priority_queue<pair<int, int>> maxHeap;
        vector<int> result;
        
        for (int i = 0; i < nums.size(); i++) {
            maxHeap.push({nums[i], i});
            
            // Remove elements outside window
            while (maxHeap.top().second < i - k + 1) {
                maxHeap.pop();
            }
            
            if (i >= k - 1) {
                result.push_back(maxHeap.top().first);
            }
        }
        
        return result;
    }
};`
        },
        {
            number: 76,
            title: "Minimum Window Substring",
            link: "https://leetcode.com/problems/minimum-window-substring/",
            difficulty: "Hard",
            intuition: "Use sliding window with two pointers. Expand right to include required characters, shrink left to minimize window while maintaining validity. Track character counts to check validity.",
            approach: [
                "Count required characters from string t",
                "Use two pointers (left, right) for window",
                "Expand right, decrement required count for each char",
                "When all chars found, shrink left while valid",
                "Track minimum window during shrinking",
                "Update result if current window is smaller"
            ],
            timeComplexity: "O(m + n)",
            spaceComplexity: "O(1) - fixed size array",
            code: `class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> need(128, 0);
        for (char c : t) need[c]++;
        
        int required = t.size();
        int left = 0, minLen = INT_MAX, minStart = 0;
        
        for (int right = 0; right < s.size(); right++) {
            // Expand window
            if (need[s[right]] > 0) {
                required--;
            }
            need[s[right]]--;
            
            // Shrink window when valid
            while (required == 0) {
                // Update minimum
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                
                // Shrink from left
                need[s[left]]++;
                if (need[s[left]] > 0) {
                    required++;
                }
                left++;
            }
        }
        
        return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
    }
};`
        },
        {
            number: 1004,
            title: "Max Consecutive Ones III",
            link: "https://leetcode.com/problems/max-consecutive-ones-iii/",
            difficulty: "Medium",
            intuition: "Use sliding window to find longest subarray with at most K zeros. Expand right always, shrink left when zeros exceed K. Track maximum window size.",
            approach: [
                "Use two pointers for sliding window",
                "Count zeros in current window",
                "Expand right pointer, increment zero count if 0",
                "When zeros > K, shrink left until zeros ≤ K",
                "Track maximum window size throughout",
                "Return maximum length found"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, zeros = 0, maxLen = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            // Expand window
            if (nums[right] == 0) {
                zeros++;
            }
            
            // Shrink if too many zeros
            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }
            
            // Update maximum
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`
        },
        {
            number: 1438,
            title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
            link: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/",
            difficulty: "Medium",
            intuition: "We need max and min in sliding window to check if diff ≤ limit. Use two deques: one for max (decreasing) and one for min (increasing). Shrink window when diff exceeds limit.",
            approach: [
                "Use two monotonic deques for max and min tracking",
                "maxDeque: decreasing order (front = max)",
                "minDeque: increasing order (front = min)",
                "Expand right, maintain deque properties",
                "Shrink left when max - min > limit",
                "Track maximum window size"
            ],
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> maxDq, minDq;  // Store indices
        int left = 0, maxLen = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            // Maintain decreasing deque for max
            while (!maxDq.empty() && nums[maxDq.back()] < nums[right]) {
                maxDq.pop_back();
            }
            maxDq.push_back(right);
            
            // Maintain increasing deque for min
            while (!minDq.empty() && nums[minDq.back()] > nums[right]) {
                minDq.pop_back();
            }
            minDq.push_back(right);
            
            // Shrink window if diff exceeds limit
            while (nums[maxDq.front()] - nums[minDq.front()] > limit) {
                left++;
                if (maxDq.front() < left) maxDq.pop_front();
                if (minDq.front() < left) minDq.pop_front();
            }
            
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};

// Alternative: Using multiset (cleaner but O(n log n))
class SolutionMultiset {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        multiset<int> window;
        int left = 0, maxLen = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            window.insert(nums[right]);
            
            // Shrink while diff > limit
            while (*window.rbegin() - *window.begin() > limit) {
                window.erase(window.find(nums[left]));
                left++;
            }
            
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`
        }
    ]
};

// Store for later rendering
window.slidingWindowProblems = slidingWindowProblems;
