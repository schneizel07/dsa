window.monotonicStackPattern = {
    title: "Pattern 2: Monotonic Stack",
    scenario: "When you need to find the next/previous greater/smaller element, or need to process elements while maintaining a sorted order in the stack",
    clue: "Problems involving 'next greater', 'previous smaller', histograms, or span calculations",
    problems: [
        {
            title: "496. Next Greater Element I",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
            intuition: "For each element, we want to find the first larger element to its right. A monotonic decreasing stack helps: when we see a larger element, it's the 'next greater' for all smaller elements currently in the stack.",
            approach: "Iterate through nums2 right-to-left. Maintain a monotonic decreasing stack. For each element, pop all smaller elements (they can't be next greater for anything). The stack top (if exists) is the next greater. Store in hashmap.",
            timeComplexity: "O(n + m)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
nums2 = [1, 3, 4, 2]  (process right to left)

Step 1: i=3, val=2    Stack: []      → push 2     Stack: [2]       NGE[2] = -1
Step 2: i=2, val=4    Stack: [2]     → pop 2      Stack: []        NGE[4] = -1
                                      → push 4     Stack: [4]
Step 3: i=1, val=3    Stack: [4]     → 3 < 4      Stack: [4]       NGE[3] = 4
                                      → push 3     Stack: [4,3]
Step 4: i=0, val=1    Stack: [4,3]   → 1 < 3      Stack: [4,3]     NGE[1] = 3
                                      → push 1     Stack: [4,3,1]

Result: NGE = {1:3, 3:4, 4:-1, 2:-1}
</div>`,
            code: `class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nge; // value -> next greater element
        stack<int> st;
        
        // Process right to left
        for (int i = nums2.size() - 1; i >= 0; i--) {
            // Pop smaller elements (can't be NGE for anything)
            while (!st.empty() && st.top() <= nums2[i]) {
                st.pop();
            }
            // Stack top is the NGE (or -1 if empty)
            nge[nums2[i]] = st.empty() ? -1 : st.top();
            st.push(nums2[i]);
        }
        
        vector<int> result;
        for (int num : nums1) {
            result.push_back(nge[num]);
        }
        return result;
    }
};`
        },
        {
            title: "84. Largest Rectangle in Histogram",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            intuition: "For each bar, the largest rectangle with that bar as the shortest one extends left and right until we hit a shorter bar. We need to find, for each bar, the first shorter bar on left and right. Monotonic increasing stack gives us this!",
            approach: "Use monotonic increasing stack storing indices. When we see a shorter bar, pop and calculate area for the popped bar (it found its right boundary). The left boundary is the new stack top. Push -1 as sentinel for left boundary.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
heights = [2, 1, 5, 6, 2, 3]
indices =  0  1  2  3  4  5

Stack stores indices in increasing height order.
When we pop index i, heights[i] found its right boundary!

Step-by-step:
┌──────────────────────────────────────────────────────────────┐
│ i=0: push 0           Stack: [-1, 0]                         │
│ i=1: h[1]=1 < h[0]=2  Pop 0: width=1-(-1)-1=1, area=2*1=2    │
│      push 1           Stack: [-1, 1]                         │
│ i=2: push 2           Stack: [-1, 1, 2]                       │
│ i=3: push 3           Stack: [-1, 1, 2, 3]                    │
│ i=4: h[4]=2 < h[3]=6  Pop 3: width=4-2-1=1, area=6*1=6       │
│      h[4]=2 < h[2]=5  Pop 2: width=4-1-1=2, area=5*2=10 ★    │
│      push 4           Stack: [-1, 1, 4]                       │
│ i=5: push 5           Stack: [-1, 1, 4, 5]                    │
│ End: Pop remaining with right boundary = 6                    │
└──────────────────────────────────────────────────────────────┘

Visual of max rectangle (area=10):
     ┌───┐
     │   │
 ┌───┤   │
 │███│███│ ┌───┐
 │███│███│ │   │
─┴───┴───┴─┴───┴─
  2   5   6  2  3
      └─────┘
     width = 2, height = 5, area = 10
</div>`,
            code: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        st.push(-1);  // Sentinel for left boundary
        int maxArea = 0;
        
        for (int i = 0; i < heights.size(); i++) {
            // Pop taller bars - they found their right boundary
            while (st.top() != -1 && heights[st.top()] >= heights[i]) {
                int h = heights[st.top()];
                st.pop();
                int width = i - st.top() - 1;
                maxArea = max(maxArea, h * width);
            }
            st.push(i);
        }
        
        // Pop remaining bars - right boundary is end of array
        while (st.top() != -1) {
            int h = heights[st.top()];
            st.pop();
            int width = heights.size() - st.top() - 1;
            maxArea = max(maxArea, h * width);
        }
        
        return maxArea;
    }
};`
        },
        {
            title: "901. Online Stock Span",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
            intuition: "Stock span is the number of consecutive days with price ≤ today's price. Instead of storing every price, we can store (price, span) pairs. When new price comes, we absorb spans of all smaller prices.",
            approach: "Maintain a monotonic decreasing stack of (price, span) pairs. When a new price arrives, pop all smaller prices and accumulate their spans. The total span is 1 (current day) + all accumulated spans.",
            timeComplexity: "O(1) amortized per call",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Prices: 100, 80, 60, 70, 60, 75, 85

              Price   Stack (price,span)              Span
Day 1:  100   [(100,1)]                              1
Day 2:   80   [(100,1), (80,1)]                      1
Day 3:   60   [(100,1), (80,1), (60,1)]              1
Day 4:   70   Pop (60,1), absorb span                
              [(100,1), (80,1), (70,2)]              2
Day 5:   60   [(100,1), (80,1), (70,2), (60,1)]      1
Day 6:   75   Pop (60,1) and (70,2), absorb spans
              [(100,1), (80,1), (75,4)]              4
Day 7:   85   Pop (75,4) and (80,1), absorb spans
              [(100,1), (85,6)]                      6

Price Chart with Spans:
100 ─────●───────────────────────
         │
 85 ─────│─────────────────●─────  span=6
 80 ─────│───●───────────────────
 75 ─────│───│───────────●───────  span=4
 70 ─────│───│───●───────────────  span=2
 60 ─────│───│───●───●───────────
</div>`,
            code: `class StockSpanner {
    stack<pair<int, int>> st; // (price, span)
public:
    int next(int price) {
        int span = 1;
        
        // Absorb spans of all smaller or equal prices
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        
        st.push({price, span});
        return span;
    }
};`
        },
        {
            title: "739. Daily Temperatures",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
            intuition: "For each day, find the first warmer day ahead. This is the classic 'next greater element' pattern. Use monotonic decreasing stack - when we find a warmer day, it resolves all colder days waiting in the stack.",
            approach: "Stack stores indices of days waiting for a warmer day. Process left to right. When current temp is warmer than stack top, pop and compute days difference. Push current index.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
indices       =  0   1   2   3   4   5   6   7

Processing (stack stores indices):
┌────────────────────────────────────────────────────────────┐
│ i=0: push 0           Stack: [0]                           │
│ i=1: 74>73, pop 0     ans[0]=1-0=1    Stack: [1]          │
│ i=2: 75>74, pop 1     ans[1]=2-1=1    Stack: [2]          │
│ i=3: 71<75, push      Stack: [2, 3]                        │
│ i=4: 69<71, push      Stack: [2, 3, 4]                     │
│ i=5: 72>69, pop 4     ans[4]=5-4=1                         │
│      72>71, pop 3     ans[3]=5-3=2    Stack: [2, 5]       │
│ i=6: 76>72, pop 5     ans[5]=6-5=1                         │
│      76>75, pop 2     ans[2]=6-2=4    Stack: [6]          │
│ i=7: 73<76, push      Stack: [6, 7]                        │
│ Remaining: ans[6]=0, ans[7]=0                              │
└────────────────────────────────────────────────────────────┘

Answer: [1, 1, 4, 2, 1, 1, 0, 0]
</div>`,
            code: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        stack<int> st; // indices
        
        for (int i = 0; i < n; i++) {
            // Current temp is warmer - resolve waiting days
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevDay = st.top();
                st.pop();
                answer[prevDay] = i - prevDay;
            }
            st.push(i);
        }
        
        return answer;
    }
};`
        },
        {
            title: "316. Remove Duplicate Letters",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/remove-duplicate-letters/",
            intuition: "We want the lexicographically smallest result with each letter appearing exactly once. Use monotonic increasing stack - if current char is smaller and the top char appears later, pop the top. But we can only pop if that char has more occurrences remaining!",
            approach: "Count frequency of each char. Use stack for result and set to track what's in stack. For each char: skip if in stack; pop larger chars from stack if they appear later (count > 0); push current char.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1) - at most 26 chars",
            visual: `<div class="visual-diagram">
s = "cbacdcbc"

Remaining count:  c:4, b:2, a:1, d:1
Process each char:

┌─────────────────────────────────────────────────────────────────┐
│ i=0, 'c': Stack empty, push        Stack: [c]    inStack: {c}   │
│ i=1, 'b': b<c, c has more (3)      Stack: [b]    inStack: {b}   │
│           → pop c, push b                                        │
│ i=2, 'a': a<b, b has more (1)      Stack: [a]    inStack: {a}   │
│           → pop b, push a                                        │
│ i=3, 'c': c>a, push                Stack: [a,c]  inStack: {a,c} │
│ i=4, 'd': d>c, push                Stack: [a,c,d] inStack:{a,c,d}│
│ i=5, 'c': c already in stack       Skip                          │
│ i=6, 'b': b<d but d has 0 left     Stack: [a,c,d,b]              │
│           → can't pop d, push b    inStack: {a,b,c,d}            │
│ i=7, 'c': c already in stack       Skip                          │
└─────────────────────────────────────────────────────────────────┘

Result: "acdb"
</div>`,
            code: `class Solution {
public:
    string removeDuplicateLetters(string s) {
        vector<int> count(26, 0);
        vector<bool> inStack(26, false);
        string result;
        
        // Count frequency of each char
        for (char c : s) count[c - 'a']++;
        
        for (char c : s) {
            count[c - 'a']--;
            
            // Skip if already in result
            if (inStack[c - 'a']) continue;
            
            // Pop larger chars if they appear later
            while (!result.empty() && 
                   result.back() > c && 
                   count[result.back() - 'a'] > 0) {
                inStack[result.back() - 'a'] = false;
                result.pop_back();
            }
            
            result.push_back(c);
            inStack[c - 'a'] = true;
        }
        
        return result;
    }
};`
        }
    ]
};
