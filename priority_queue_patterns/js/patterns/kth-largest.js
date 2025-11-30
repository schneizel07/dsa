// Pattern 1: Finding Kth Largest/Smallest
const kthLargestProblems = {
    title: "Finding Kth Largest/Smallest",
    scenario: "You have a large dataset, and you need to efficiently find the Kth largest or smallest element while processing the dataset.",
    clue: "Look for problems where you need to track the K largest or smallest elements while processing the dataset.",
    problems: [
        {
            number: 215,
            title: "Kth Largest Element in an Array",
            link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            difficulty: "Medium",
            intuition: "To find the Kth largest element, we can use a min-heap of size K. The top of this heap will always be the Kth largest element seen so far. By maintaining only K elements, we ensure efficient memory usage while tracking what we need.",
            approach: [
                "Create a min-heap (priority_queue with greater<int>)",
                "Iterate through all elements in the array",
                "Add each element to the heap",
                "If heap size exceeds K, remove the smallest element (top)",
                "After processing all elements, the heap top is the Kth largest"
            ],
            timeComplexity: "O(n log k)",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Min-heap to keep track of k largest elements
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (int num : nums) {
            minHeap.push(num);
            // Keep only k elements in heap
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        // Top of min-heap is the kth largest
        return minHeap.top();
    }
};`
        },
        {
            number: 378,
            title: "Kth Smallest Element in a Sorted Matrix",
            link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
            difficulty: "Medium",
            intuition: "Since each row and column is sorted, we can use a min-heap to efficiently find the Kth smallest. Start with the first element, then always expand to the right and down neighbors, similar to merging sorted lists.",
            approach: [
                "Use a min-heap storing {value, row, col}",
                "Start by pushing the first element matrix[0][0]",
                "Pop the smallest element K times",
                "Each time we pop, push the right and down neighbors if not visited",
                "Use a visited set or mark visited elements",
                "The Kth popped element is our answer"
            ],
            timeComplexity: "O(k log k)",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        // Min-heap: {value, row, col}
        priority_queue<tuple<int,int,int>, 
                      vector<tuple<int,int,int>>,
                      greater<tuple<int,int,int>>> minHeap;
        
        // Track visited cells
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        
        minHeap.push({matrix[0][0], 0, 0});
        visited[0][0] = true;
        
        int result = 0;
        for (int i = 0; i < k; i++) {
            auto [val, row, col] = minHeap.top();
            minHeap.pop();
            result = val;
            
            // Push right neighbor
            if (col + 1 < n && !visited[row][col + 1]) {
                minHeap.push({matrix[row][col + 1], row, col + 1});
                visited[row][col + 1] = true;
            }
            
            // Push down neighbor
            if (row + 1 < n && !visited[row + 1][col]) {
                minHeap.push({matrix[row + 1][col], row + 1, col});
                visited[row + 1][col] = true;
            }
        }
        
        return result;
    }
};`
        },
        {
            number: 295,
            title: "Find Median from Data Stream",
            link: "https://leetcode.com/problems/find-median-from-data-stream/",
            difficulty: "Hard",
            intuition: "To find median efficiently, we need quick access to the middle element(s). Using two heaps - a max-heap for the lower half and a min-heap for the upper half - allows O(1) access to the middle elements.",
            approach: [
                "Maintain two heaps: maxHeap (lower half) and minHeap (upper half)",
                "Balance heaps so maxHeap has equal or one more element",
                "When adding: first add to maxHeap, then move max to minHeap",
                "Rebalance if minHeap has more elements",
                "Median is either maxHeap top (odd count) or average of both tops (even)"
            ],
            timeComplexity: "O(log n) per add, O(1) for findMedian",
            spaceComplexity: "O(n)",
            code: `class MedianFinder {
    // Max-heap for lower half
    priority_queue<int> maxHeap;
    // Min-heap for upper half
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
public:
    MedianFinder() {}
    
    void addNum(int num) {
        // Always add to maxHeap first
        maxHeap.push(num);
        
        // Balance: move largest from lower half to upper half
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Ensure maxHeap has >= elements than minHeap
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`
        },
        {
            number: 973,
            title: "K Closest Points to Origin",
            link: "https://leetcode.com/problems/k-closest-points-to-origin/",
            difficulty: "Medium",
            intuition: "We need K points with smallest distances. Using a max-heap of size K, we keep the K smallest distances seen. Any new point with smaller distance replaces the current maximum.",
            approach: [
                "Use a max-heap storing {distance², point}",
                "For each point, calculate squared distance (avoid sqrt)",
                "Push to heap if size < K or distance < heap top",
                "If size exceeds K after push, pop the largest",
                "Extract all K points from heap as result"
            ],
            timeComplexity: "O(n log k)",
            spaceComplexity: "O(k)",
            code: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Max-heap: {distance², index}
        priority_queue<pair<int, int>> maxHeap;
        
        for (int i = 0; i < points.size(); i++) {
            int dist = points[i][0] * points[i][0] + 
                       points[i][1] * points[i][1];
            
            maxHeap.push({dist, i});
            
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }
        
        vector<vector<int>> result;
        while (!maxHeap.empty()) {
            result.push_back(points[maxHeap.top().second]);
            maxHeap.pop();
        }
        
        return result;
    }
};`
        },
        {
            number: 703,
            title: "Kth Largest Element in a Stream",
            link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
            difficulty: "Easy",
            intuition: "For a stream of numbers, we need to continuously track the Kth largest. A min-heap of size K perfectly maintains this - the smallest in our K largest is the Kth largest overall.",
            approach: [
                "Initialize min-heap with given numbers, keeping size ≤ K",
                "For each add operation, push the new element",
                "If heap size exceeds K, pop the minimum",
                "The heap top is always the Kth largest",
                "Return heap top after each add"
            ],
            timeComplexity: "O(n log k) init, O(log k) per add",
            spaceComplexity: "O(k)",
            code: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int K;
    
public:
    KthLargest(int k, vector<int>& nums) {
        K = k;
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        minHeap.push(val);
        
        if (minHeap.size() > K) {
            minHeap.pop();
        }
        
        return minHeap.top();
    }
};`
        }
    ]
};

// Store for later rendering
window.kthLargestProblems = kthLargestProblems;
