# Min Stack Problem

## Problem Statement
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).

## Intuition
The challenge is getting the minimum element in O(1) time. A regular stack can do push, pop, and top in O(1), but finding the minimum would require O(n) traversal.

**Key Insight**: Use an auxiliary stack to track minimums. Whenever we push a new element, we also track what the minimum is at that point in the stack. This way, when we pop elements, we always know the current minimum.

## Approach
1. Use two stacks:
   - **Main stack**: stores all elements
   - **Min stack**: stores the minimum element at each level

2. On **push(x)**:
   - Push `x` to main stack
   - Push `min(x, current_min)` to min stack

3. On **pop()**:
   - Pop from both stacks

4. On **top()**:
   - Return top of main stack

5. On **getMin()**:
   - Return top of min stack

## C++ Code

```cpp
#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
private:
    stack<int> mainStack;
    stack<int> minStack;

public:
    MinStack() {
        // Constructor - stacks are already empty
    }
    
    void push(int val) {
        mainStack.push(val);
        
        // If minStack is empty, push val; otherwise push the smaller of val and current min
        if (minStack.empty()) {
            minStack.push(val);
        } else {
            minStack.push(min(val, minStack.top()));
        }
    }
    
    void pop() {
        mainStack.pop();
        minStack.pop();
    }
    
    int top() {
        return mainStack.top();
    }
    
    int getMin() {
        return minStack.top();
    }
};

// Example usage
/*
int main() {
    MinStack minStack;
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    cout << minStack.getMin(); // Returns -3
    minStack.pop();
    cout << minStack.top();    // Returns 0
    cout << minStack.getMin(); // Returns -2
    return 0;
}
*/
```

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| push()    | O(1) | O(1)  |
| pop()     | O(1) | O(1)  |
| top()     | O(1) | O(1)  |
| getMin()  | O(1) | O(1)  |

**Overall Space Complexity**: O(n) where n is the number of elements in the stack (we store each element twice in worst case)

## Space-Optimized Version

We can optimize space by only pushing to minStack when the new element is ≤ current minimum:

```cpp
class MinStackOptimized {
private:
    stack<int> mainStack;
    stack<int> minStack;

public:
    void push(int val) {
        mainStack.push(val);
        // Only push if minStack is empty or val is <= current min
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        }
    }
    
    void pop() {
        // If popped element equals current min, pop from minStack too
        if (mainStack.top() == minStack.top()) {
            minStack.pop();
        }
        mainStack.pop();
    }
    
    int top() {
        return mainStack.top();
    }
    
    int getMin() {
        return minStack.top();
    }
};
```

## Visual Example

```
Operations:        Main Stack    Min Stack    getMin()
push(-2)           [-2]          [-2]         -2
push(0)            [-2, 0]       [-2, -2]     -2
push(-3)           [-2, 0, -3]   [-2, -2, -3] -3
pop()              [-2, 0]       [-2, -2]     -2
top() → 0
getMin() → -2
```

The min stack always maintains the minimum value "seen so far" at each level, enabling O(1) minimum retrieval!
