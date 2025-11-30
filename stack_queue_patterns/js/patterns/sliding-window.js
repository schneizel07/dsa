window.slidingWindowPattern = {
    title: "Pattern 5: Sliding Window & Monotonic Queue",
    scenario: "When you need to track min/max in a sliding window, or need a double-ended queue structure for efficient operations at both ends",
    clue: "Problems involving 'sliding window maximum/minimum', 'k elements window', or need for deque operations",
    problems: [
        {
            title: "239. Sliding Window Maximum",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
            intuition: "Naive O(nk) is too slow. Key insight: if nums[i] > nums[j] and i > j, nums[j] can never be the max for any future window. Use a monotonic decreasing deque - front is always the max!",
            approach: "Maintain deque of indices with decreasing values. For each element: 1) Remove indices outside window from front, 2) Remove smaller elements from back (they're useless), 3) Add current index, 4) Front is the max.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(k)",
            visual: `<div class="visual-diagram">
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

Deque stores indices, maintains decreasing order of VALUES

┌─────┬───────┬─────────────────┬────────────────────────────────┐
│  i  │ num[i]│ Deque (indices) │ Action & Window Max            │
├─────┼───────┼─────────────────┼────────────────────────────────┤
│  0  │   1   │ [0]             │ push 0                         │
│  1  │   3   │ [1]             │ 3>1, pop 0, push 1             │
│  2  │  -1   │ [1, 2]          │ -1<3, push 2; Window: max=3    │
│  3  │  -3   │ [1, 2, 3]       │ push 3; pop front(1 out of     │
│     │       │ → [2, 3]        │ window); Window: max=-1 (idx 2)│
│     │       │                 │ Wait, 1 is still valid!        │
│     │       │ [1, 2, 3]       │ 1 is in range [1,3]; max=3     │
│  4  │   5   │ [4]             │ 5>all, clear & push; max=5     │
│  5  │   3   │ [4, 5]          │ 3<5, push 5; max=5             │
│  6  │   6   │ [6]             │ 6>all, clear & push; max=6     │
│  7  │   7   │ [7]             │ 7>6, pop, push; max=7          │
└─────┴───────┴─────────────────┴────────────────────────────────┘

Result: [3, 3, 5, 5, 6, 7]

Visual of monotonic deque:
Before adding 5:        After adding 5:
  ┌───┐                   ┌───┐
  │ 3 │ front (max)       │ 5 │ front (new max)
  ├───┤                   └───┘
  │-1 │                   5 kicks out everything
  ├───┤                   smaller!
  │-3 │ back
  └───┘
</div>`,
            code: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;  // Stores indices, decreasing by value
        vector<int> result;
        
        for (int i = 0; i < nums.size(); i++) {
            // Remove indices outside current window
            while (!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }
            
            // Remove smaller elements from back (they're useless)
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            
            dq.push_back(i);
            
            // Window is complete (i >= k-1)
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "641. Design Circular Deque",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-circular-deque/",
            intuition: "Like circular queue but with operations at both ends. Use array with front and rear pointers, using modulo for wrap-around. The trick is handling both directions correctly.",
            approach: "Array of size k, front starts at 0, rear starts at k-1. InsertFront: decrement front (wrap), place element. InsertLast: increment rear (wrap), place element. Delete operations reverse this.",
            timeComplexity: "O(1) for all operations",
            spaceComplexity: "O(k)",
            visual: `<div class="visual-diagram">
Circular Deque of size 4:

Initial state:
┌───┬───┬───┬───┐
│   │   │   │   │
└───┴───┴───┴───┘
  ↑
front=0, rear=3 (one before front, circular)

After insertLast(1), insertLast(2), insertFront(4):
┌───┬───┬───┬───┐
│ 4 │ 1 │ 2 │   │
└───┴───┴───┴───┘
  ↑       ↑
front   rear

After insertFront(5): (front wraps to index 3)
┌───┬───┬───┬───┐
│ 4 │ 1 │ 2 │ 5 │
└───┴───┴───┴───┘
          ↑   ↑
        rear front

getFront() = 5 (at front index 3)
getRear() = 2 (at rear index 2)
</div>`,
            code: `class MyCircularDeque {
    vector<int> data;
    int front, rear, count, capacity;
    
public:
    MyCircularDeque(int k) : data(k), front(0), rear(k-1), count(0), capacity(k) {}
    
    bool insertFront(int value) {
        if (isFull()) return false;
        front = (front - 1 + capacity) % capacity;  // Move front backward
        data[front] = value;
        count++;
        return true;
    }
    
    bool insertLast(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;  // Move rear forward
        data[rear] = value;
        count++;
        return true;
    }
    
    bool deleteFront() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;  // Move front forward
        count--;
        return true;
    }
    
    bool deleteLast() {
        if (isEmpty()) return false;
        rear = (rear - 1 + capacity) % capacity;  // Move rear backward
        count--;
        return true;
    }
    
    int getFront() {
        return isEmpty() ? -1 : data[front];
    }
    
    int getRear() {
        return isEmpty() ? -1 : data[rear];
    }
    
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == capacity; }
};`
        },
        {
            title: "346. Moving Average from Data Stream",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/moving-average-from-data-stream/",
            intuition: "Classic sliding window! Maintain sum of last k elements. When window is full, subtract the oldest element before adding new one. Queue naturally maintains FIFO order.",
            approach: "Use queue to store window elements, track running sum. When queue size exceeds window size, subtract front element and pop. Average = sum / current_size.",
            timeComplexity: "O(1) per call",
            spaceComplexity: "O(size)",
            visual: `<div class="visual-diagram">
size = 3

┌─────────┬───────────┬─────────┬─────────────────────┐
│  Input  │   Queue   │   Sum   │    Average          │
├─────────┼───────────┼─────────┼─────────────────────┤
│    1    │   [1]     │    1    │   1/1 = 1.0         │
│   10    │  [1,10]   │   11    │  11/2 = 5.5         │
│    3    │ [1,10,3]  │   14    │  14/3 = 4.667       │
│    5    │ [10,3,5]  │   18    │  18/3 = 6.0         │
│         │  ↑ pop 1  │ -1+5=18 │   (1 removed)       │
└─────────┴───────────┴─────────┴─────────────────────┘
</div>`,
            code: `class MovingAverage {
    queue<int> window;
    int maxSize;
    double sum;
    
public:
    MovingAverage(int size) : maxSize(size), sum(0) {}
    
    double next(int val) {
        // Add new value
        window.push(val);
        sum += val;
        
        // Remove oldest if window exceeds size
        if (window.size() > maxSize) {
            sum -= window.front();
            window.pop();
        }
        
        return sum / window.size();
    }
};`
        },
        {
            title: "1429. First Unique Number",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/first-unique-number/",
            intuition: "Need O(1) showFirstUnique. Use queue for order, hashmap for count. But duplicates in queue are stale! On showFirstUnique, pop from front until we find one with count=1.",
            approach: "Queue stores all numbers in order, map tracks counts. add: push to queue, increment count. showFirstUnique: pop duplicates from front until finding count=1 or empty.",
            timeComplexity: "O(1) amortized",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Initial: [2, 3, 5]
count = {2:1, 3:1, 5:1}
Queue: [2, 3, 5]
showFirstUnique() → 2 ✓

add(5):
count = {2:1, 3:1, 5:2}
Queue: [2, 3, 5, 5]
showFirstUnique() → 2 ✓ (5 is duplicate now but 2 still unique)

add(2):
count = {2:2, 3:1, 5:2}
Queue: [2, 3, 5, 5, 2]
showFirstUnique() → check front:
  - 2 has count 2, pop!
  - 3 has count 1, return 3 ✓

add(3):
count = {2:2, 3:2, 5:2}
Queue: [3, 5, 5, 2, 3]
showFirstUnique() → all duplicates → return -1
</div>`,
            code: `class FirstUnique {
    queue<int> q;
    unordered_map<int, int> count;
    
public:
    FirstUnique(vector<int>& nums) {
        for (int num : nums) {
            add(num);
        }
    }
    
    int showFirstUnique() {
        // Remove duplicates from front
        while (!q.empty() && count[q.front()] > 1) {
            q.pop();
        }
        return q.empty() ? -1 : q.front();
    }
    
    void add(int value) {
        count[value]++;
        q.push(value);
    }
};`
        },
        {
            title: "363. Max Sum of Rectangle No Larger Than K",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/",
            intuition: "2D problem → reduce to 1D. Fix left and right columns, compute row sums. Now find max subarray sum ≤ k. For the 1D problem: use prefix sums + sorted set to find best complement.",
            approach: "For each pair of columns (l, r): compute cumulative row sums. Use set of prefix sums: for each prefix[i], find smallest prefix[j] where prefix[i] - prefix[j] ≤ k using lower_bound.",
            timeComplexity: "O(cols² × rows × log(rows))",
            spaceComplexity: "O(rows)",
            visual: `<div class="visual-diagram">
Matrix:          k = 4
┌───┬───┬───┐
│ 1 │ 0 │ 1 │
├───┼───┼───┤
│ 0 │-2 │ 3 │
└───┴───┴───┘

Fix columns [0,1]: Row sums = [1, -2]
Fix columns [0,2]: Row sums = [2, 1]
...

1D Subarray Sum ≤ k problem:
nums = [a, b, c, d], find max subarray sum ≤ k

Use prefix sums: P[0]=0, P[1]=a, P[2]=a+b, ...
Subarray[i,j] sum = P[j+1] - P[i]

We want: P[j] - P[i] ≤ k  →  P[i] ≥ P[j] - k

For each P[j], use set to find smallest P[i] ≥ P[j] - k
This gives us the largest valid sum ending at j.

Set operations with lower_bound = O(log n)
</div>`,
            code: `class Solution {
public:
    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        int rows = matrix.size(), cols = matrix[0].size();
        int maxSum = INT_MIN;
        
        // Fix left column
        for (int left = 0; left < cols; left++) {
            vector<int> rowSum(rows, 0);
            
            // Expand right column
            for (int right = left; right < cols; right++) {
                // Add current column to row sums
                for (int i = 0; i < rows; i++) {
                    rowSum[i] += matrix[i][right];
                }
                
                // Find max subarray sum <= k in rowSum
                maxSum = max(maxSum, maxSubarraySumNoMoreThanK(rowSum, k));
                
                if (maxSum == k) return k;  // Can't do better
            }
        }
        
        return maxSum;
    }
    
private:
    int maxSubarraySumNoMoreThanK(vector<int>& nums, int k) {
        set<int> prefixSet;
        prefixSet.insert(0);  // Empty prefix
        
        int prefix = 0;
        int maxSum = INT_MIN;
        
        for (int num : nums) {
            prefix += num;
            
            // Find smallest prefix >= (prefix - k)
            // So that prefix - foundPrefix <= k
            auto it = prefixSet.lower_bound(prefix - k);
            
            if (it != prefixSet.end()) {
                maxSum = max(maxSum, prefix - *it);
            }
            
            prefixSet.insert(prefix);
        }
        
        return maxSum;
    }
};`
        }
    ]
};
