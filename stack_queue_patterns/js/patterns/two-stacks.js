window.twoStacksPattern = {
    title: "Pattern 4: Two Stacks",
    scenario: "When operations require tracking additional state, undoing operations, or simulating complex behaviors with simple stack operations",
    clue: "Problems involving min/max tracking, operation history, or sequential processing with rollback",
    problems: [
        {
            title: "150. Evaluate Reverse Polish Notation",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            intuition: "RPN (postfix) is designed for stack evaluation! Numbers go on stack, operators pop two operands, compute, and push result. The beauty: no parentheses needed, operator precedence is implicit.",
            approach: "Iterate through tokens. If number: push to stack. If operator: pop two operands, apply operator (second popped is left operand!), push result. Final answer is the only element left.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
tokens = ["2","1","+","3","*"]

Equivalent infix: ((2 + 1) * 3)

Step-by-step stack trace:
┌─────────┬─────────────────────────────────────────────┐
│  Token  │  Stack (bottom → top)                       │
├─────────┼─────────────────────────────────────────────┤
│   "2"   │  [2]           ← push number                │
│   "1"   │  [2, 1]        ← push number                │
│   "+"   │  [3]           ← pop 1,2; push 2+1=3        │
│   "3"   │  [3, 3]        ← push number                │
│   "*"   │  [9]           ← pop 3,3; push 3*3=9        │
└─────────┴─────────────────────────────────────────────┘

Result: 9

Note: For -, / the order matters!
"4 2 -" means 4 - 2 = 2 (not 2 - 4)
Second popped is LEFT operand!
</div>`,
            code: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<long long> st;
        
        for (const string& token : tokens) {
            if (token == "+" || token == "-" || 
                token == "*" || token == "/") {
                long long b = st.top(); st.pop();  // Right operand
                long long a = st.top(); st.pop();  // Left operand
                
                long long result;
                if (token == "+") result = a + b;
                else if (token == "-") result = a - b;
                else if (token == "*") result = a * b;
                else result = a / b;  // Truncates toward zero
                
                st.push(result);
            }
            else {
                st.push(stoll(token));
            }
        }
        
        return st.top();
    }
};`
        },
        {
            title: "155. Min Stack",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/min-stack/",
            intuition: "We need O(1) getMin, but minimum changes as we push/pop. Key insight: track minimum at each stack state! Each element stores the minimum of all elements below it (including itself).",
            approach: "Store pairs (value, minSoFar) in the stack. On push: new min = min(value, current min). On pop: just pop. getMin: return top's minSoFar.",
            timeComplexity: "O(1) for all operations",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Operations: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()

Stack stores (value, minAtThisLevel):
┌─────────────────────────────────────────────────────────────┐
│  Operation   │  Stack (bottom → top)      │  Result         │
├──────────────┼────────────────────────────┼─────────────────┤
│  push(-2)    │  [(-2, -2)]                │                 │
│  push(0)     │  [(-2,-2), (0,-2)]         │                 │
│  push(-3)    │  [(-2,-2), (0,-2), (-3,-3)]│                 │
│  getMin()    │  [(-2,-2), (0,-2), (-3,-3)]│  -3             │
│  pop()       │  [(-2,-2), (0,-2)]         │                 │
│  top()       │  [(-2,-2), (0,-2)]         │   0             │
│  getMin()    │  [(-2,-2), (0,-2)]         │  -2             │
└─────────────────────────────────────────────────────────────┘

Each element "remembers" the minimum seen so far!
</div>`,
            code: `class MinStack {
    stack<pair<int, int>> st;  // (value, minAtThisLevel)
    
public:
    void push(int val) {
        int newMin = st.empty() ? val : min(val, st.top().second);
        st.push({val, newMin});
    }
    
    void pop() {
        st.pop();
    }
    
    int top() {
        return st.top().first;
    }
    
    int getMin() {
        return st.top().second;
    }
};`
        },
        {
            title: "1381. Design a Stack With Increment Operation",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-a-stack-with-increment-operation/",
            intuition: "Naive increment is O(k). Clever approach: use lazy propagation! Store increments separately. When incrementing bottom k elements, only mark the k-th position. When popping, propagate the increment down.",
            approach: "Use two arrays: stack values and increment array. On increment(k, val): add val to inc[k-1]. On pop: add inc[top] to result and propagate inc[top] to inc[top-1]. O(1) for all operations!",
            timeComplexity: "O(1) for all operations",
            spaceComplexity: "O(maxSize)",
            visual: `<div class="visual-diagram">
maxSize = 3

Operations sequence:
┌───────────────────────────────────────────────────────────────┐
│ Operation        │ Stack    │ Inc[]   │ Notes                 │
├──────────────────┼──────────┼─────────┼───────────────────────┤
│ push(1)          │ [1]      │ [0,0,0] │                       │
│ push(2)          │ [1,2]    │ [0,0,0] │                       │
│ push(3)          │ [1,2,3]  │ [0,0,0] │                       │
│ increment(2,100) │ [1,2,3]  │ [0,100,0]│ Mark idx 1 (bottom 2)│
│ increment(3,50)  │ [1,2,3]  │ [0,100,50]│ Mark idx 2          │
│ pop()            │ [1,2]    │ [0,150,0]│ Return 3+50=53       │
│                  │          │         │ Propagate 50 down     │
│ pop()            │ [1]      │ [150,0,0]│ Return 2+150=152     │
│                  │          │         │ Propagate 150 down    │
│ pop()            │ []       │ [0,0,0] │ Return 1+150=151      │
└───────────────────────────────────────────────────────────────┘

The increment propagates lazily as we pop!
</div>`,
            code: `class CustomStack {
    vector<int> stack;
    vector<int> inc;  // Lazy increment storage
    int maxSize;
    
public:
    CustomStack(int maxSize) : maxSize(maxSize), inc(maxSize, 0) {}
    
    void push(int x) {
        if (stack.size() < maxSize) {
            stack.push_back(x);
        }
    }
    
    int pop() {
        if (stack.empty()) return -1;
        
        int idx = stack.size() - 1;
        int result = stack.back() + inc[idx];
        stack.pop_back();
        
        // Propagate increment to element below
        if (idx > 0) {
            inc[idx - 1] += inc[idx];
        }
        inc[idx] = 0;
        
        return result;
    }
    
    void increment(int k, int val) {
        // Mark the k-th element (0-indexed: k-1)
        int idx = min(k, (int)stack.size()) - 1;
        if (idx >= 0) {
            inc[idx] += val;
        }
    }
};`
        },
        {
            title: "682. Baseball Game",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/baseball-game/",
            intuition: "A stack naturally handles the 'record' and can reference previous records. '+' sums last two, 'D' doubles last, 'C' removes last. Each operation interacts with the top of the stack.",
            approach: "Use a stack to store valid scores. Process each operation: numbers push directly, '+' pushes sum of top two (without popping), 'D' pushes double of top, 'C' pops. Sum all values at end.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> record;  // Using vector as stack for easy access
        
        for (const string& op : operations) {
            if (op == "+") {
                int n = record.size();
                record.push_back(record[n-1] + record[n-2]);
            }
            else if (op == "D") {
                record.push_back(2 * record.back());
            }
            else if (op == "C") {
                record.pop_back();
            }
            else {
                record.push_back(stoi(op));
            }
        }
        
        int sum = 0;
        for (int score : record) {
            sum += score;
        }
        return sum;
    }
};`
        },
        {
            title: "844. Backspace String Compare",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/backspace-string-compare/",
            intuition: "Backspace (#) deletes the previous character - perfect for a stack! Push characters, pop on #. Compare final stacks. For O(1) space: process from right with backspace counter.",
            approach: "Stack approach: build final strings using stack (push chars, pop on #), compare. O(1) space: use two pointers from right, skip characters based on backspace count.",
            timeComplexity: "O(n + m)",
            spaceComplexity: "O(1) with two-pointer approach",
            visual: `<div class="visual-diagram">
s = "ab#c", t = "ad#c"

Stack approach:
s processing:           t processing:
┌─────┬────────────┐   ┌─────┬────────────┐
│Char │ Stack      │   │Char │ Stack      │
├─────┼────────────┤   ├─────┼────────────┤
│  a  │ [a]        │   │  a  │ [a]        │
│  b  │ [a, b]     │   │  d  │ [a, d]     │
│  #  │ [a]  (pop) │   │  #  │ [a]  (pop) │
│  c  │ [a, c]     │   │  c  │ [a, c]     │
└─────┴────────────┘   └─────┴────────────┘

Both result in "ac" → true

O(1) Space - Two Pointer (right to left):
s = "ab##", t = "c#d#"
Process from right, count #'s, skip chars accordingly
</div>`,
            code: `class Solution {
public:
    bool backspaceCompare(string s, string t) {
        return buildString(s) == buildString(t);
    }
    
private:
    string buildString(const string& str) {
        string result;
        for (char c : str) {
            if (c == '#') {
                if (!result.empty()) result.pop_back();
            } else {
                result.push_back(c);
            }
        }
        return result;
    }
    
    // O(1) space alternative using two pointers
    bool backspaceCompareO1(string s, string t) {
        int i = s.length() - 1, j = t.length() - 1;
        int skipS = 0, skipT = 0;
        
        while (i >= 0 || j >= 0) {
            // Find next valid char in s
            while (i >= 0) {
                if (s[i] == '#') { skipS++; i--; }
                else if (skipS > 0) { skipS--; i--; }
                else break;
            }
            // Find next valid char in t
            while (j >= 0) {
                if (t[j] == '#') { skipT++; j--; }
                else if (skipT > 0) { skipT--; j--; }
                else break;
            }
            
            if (i >= 0 && j >= 0 && s[i] != t[j]) return false;
            if ((i >= 0) != (j >= 0)) return false;
            i--; j--;
        }
        return true;
    }
};`
        }
    ]
};
