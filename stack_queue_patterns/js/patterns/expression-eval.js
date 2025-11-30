window.expressionEvalPattern = {
    title: "Pattern 3: Expression Evaluation",
    scenario: "When you need to parse and evaluate mathematical expressions, handle nested structures, or process strings with special syntax",
    clue: "Problems involving calculators, paths, brackets, or recursive string patterns",
    problems: [
        {
            title: "227. Basic Calculator II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/basic-calculator-ii/",
            intuition: "Handle operator precedence (* / before + -) using a stack. Push numbers for +, push negatives for -, immediately compute for * and /. At the end, sum everything in the stack.",
            approach: "Parse numbers and operators. Track previous operator. On seeing new operator (or end): apply previous operator - push ±num for +/-, compute and push for */. Finally sum stack.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Expression: "3+2*2-4/2"

Process: (prevOp starts as '+')

┌─────────────────────────────────────────────────────────────┐
│ Char  │ Num │ prevOp │ Action              │ Stack          │
├───────┼─────┼────────┼─────────────────────┼────────────────┤
│  3    │  3  │   +    │                     │                │
│  +    │  3  │   +    │ push +3             │ [3]            │
│  2    │  2  │   +    │                     │ [3]            │
│  *    │  2  │   +    │ push +2             │ [3, 2]         │
│  2    │  2  │   *    │                     │ [3, 2]         │
│  -    │  2  │   *    │ pop 2, 2*2=4, push  │ [3, 4]         │
│  4    │  4  │   -    │                     │ [3, 4]         │
│  /    │  4  │   -    │ push -4             │ [3, 4, -4]     │
│  2    │  2  │   /    │                     │ [3, 4, -4]     │
│ END   │  2  │   /    │ pop -4, -4/2=-2     │ [3, 4, -2]     │
└─────────────────────────────────────────────────────────────┘

Sum stack: 3 + 4 + (-2) = 5
</div>`,
            code: `class Solution {
public:
    int calculate(string s) {
        stack<long long> st;
        long long num = 0;
        char prevOp = '+';
        
        for (int i = 0; i <= s.length(); i++) {
            char c = (i < s.length()) ? s[i] : '+';
            
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            }
            else if (c == '+' || c == '-' || c == '*' || c == '/') {
                if (prevOp == '+') st.push(num);
                else if (prevOp == '-') st.push(-num);
                else if (prevOp == '*') {
                    long long top = st.top(); st.pop();
                    st.push(top * num);
                }
                else if (prevOp == '/') {
                    long long top = st.top(); st.pop();
                    st.push(top / num);
                }
                prevOp = c;
                num = 0;
            }
        }
        
        long long result = 0;
        while (!st.empty()) {
            result += st.top();
            st.pop();
        }
        return result;
    }
};`
        },
        {
            title: "399. Evaluate Division",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/evaluate-division/",
            intuition: "This is a graph problem! If a/b = 2, then there's an edge a→b with weight 2 and b→a with weight 0.5. To find x/y, find a path from x to y and multiply all edge weights.",
            approach: "Build a weighted graph where edge (a,b) has weight a/b. For each query, use BFS/DFS to find path and multiply weights. Return -1 if no path exists or variable unknown.",
            timeComplexity: "O(Q * (V + E))",
            spaceComplexity: "O(V + E)",
            visual: `<div class="visual-diagram">
equations = [["a","b"],["b","c"]], values = [2.0, 3.0]

Graph:
       2.0        3.0
   a ──────► b ──────► c
     ◄──────   ◄──────
       0.5        0.33

Query: a/c?
Path: a → b → c
Result: 2.0 * 3.0 = 6.0

Query: c/a?
Path: c → b → a  
Result: 0.33 * 0.5 = 0.167

Query: a/e?
'e' not in graph → -1.0
</div>`,
            code: `class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, 
                                 vector<double>& values,
                                 vector<vector<string>>& queries) {
        // Build graph
        unordered_map<string, vector<pair<string, double>>> graph;
        
        for (int i = 0; i < equations.size(); i++) {
            string a = equations[i][0], b = equations[i][1];
            double val = values[i];
            graph[a].push_back({b, val});
            graph[b].push_back({a, 1.0 / val});
        }
        
        vector<double> results;
        for (auto& q : queries) {
            results.push_back(bfs(graph, q[0], q[1]));
        }
        return results;
    }
    
private:
    double bfs(unordered_map<string, vector<pair<string, double>>>& graph,
               string src, string dst) {
        if (!graph.count(src) || !graph.count(dst)) return -1.0;
        if (src == dst) return 1.0;
        
        queue<pair<string, double>> q;
        unordered_set<string> visited;
        q.push({src, 1.0});
        visited.insert(src);
        
        while (!q.empty()) {
            auto [node, product] = q.front();
            q.pop();
            
            for (auto& [neighbor, weight] : graph[node]) {
                if (neighbor == dst) return product * weight;
                if (!visited.count(neighbor)) {
                    visited.insert(neighbor);
                    q.push({neighbor, product * weight});
                }
            }
        }
        return -1.0;
    }
};`
        },
        {
            title: "71. Simplify Path",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/simplify-path/",
            intuition: "Unix path simplification uses a stack. '.' means current dir (ignore), '..' means parent dir (pop), other names are pushed. Split by '/' and process each component.",
            approach: "Split path by '/'. For each component: skip empty and '.'; pop for '..' (if stack not empty); push valid directory names. Join stack with '/' and prepend '/'.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
path = "/home/user/Documents/../Pictures/./image.png"

Split by '/': ["", "home", "user", "Documents", "..", "Pictures", ".", "image.png"]

Processing:
┌────────────────┬────────────────────────────────────┐
│   Component    │   Stack                            │
├────────────────┼────────────────────────────────────┤
│   ""           │   []           (skip empty)        │
│   "home"       │   [home]       (push)              │
│   "user"       │   [home, user] (push)              │
│   "Documents"  │   [home, user, Documents] (push)   │
│   ".."         │   [home, user] (pop!)              │
│   "Pictures"   │   [home, user, Pictures] (push)    │
│   "."          │   [home, user, Pictures] (skip)    │
│   "image.png"  │   [home, user, Pictures, image.png]│
└────────────────┴────────────────────────────────────┘

Result: "/home/user/Pictures/image.png"
</div>`,
            code: `class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string component;
        
        while (getline(ss, component, '/')) {
            if (component == "" || component == ".") {
                continue;  // Skip empty and current dir
            }
            else if (component == "..") {
                if (!stack.empty()) {
                    stack.pop_back();  // Go to parent
                }
            }
            else {
                stack.push_back(component);  // Valid directory
            }
        }
        
        string result = "/";
        for (int i = 0; i < stack.size(); i++) {
            result += stack[i];
            if (i < stack.size() - 1) result += "/";
        }
        return result;
    }
};`
        },
        {
            title: "224. Basic Calculator",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/basic-calculator/",
            intuition: "Handle +, -, and parentheses. The key insight: a sign before '(' affects everything inside. Use stack to save (result, sign) when entering '(' and restore when seeing ')'. Current result becomes a sub-expression.",
            approach: "Track current result and current sign. On '(': push result and sign to stack, reset. On ')': pop sign and previous result, combine. Numbers apply current sign to result.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Expression: "1 - (2 - (3 + 4))"

Stack stores (previousResult, signBeforeParenthesis)

┌──────────────────────────────────────────────────────────────┐
│ Char │ Action                      │ result │ sign │ Stack   │
├──────┼─────────────────────────────┼────────┼──────┼─────────┤
│  1   │ result = 0 + 1*1 = 1        │   1    │  +1  │ []      │
│  -   │ sign = -1                   │   1    │  -1  │ []      │
│  (   │ push(1, -1), reset          │   0    │  +1  │[(1,-1)] │
│  2   │ result = 0 + 1*2 = 2        │   2    │  +1  │[(1,-1)] │
│  -   │ sign = -1                   │   2    │  -1  │[(1,-1)] │
│  (   │ push(2, -1), reset          │   0    │  +1  │[(1,-1), │
│      │                             │        │      │ (2,-1)] │
│  3   │ result = 0 + 1*3 = 3        │   3    │  +1  │         │
│  +   │ sign = +1                   │   3    │  +1  │         │
│  4   │ result = 3 + 1*4 = 7        │   7    │  +1  │         │
│  )   │ pop(2,-1): 2 + (-1)*7 = -5  │  -5    │  -1  │[(1,-1)] │
│  )   │ pop(1,-1): 1 + (-1)*(-5)= 6 │   6    │  +1  │ []      │
└──────────────────────────────────────────────────────────────┘

Result: 6
</div>`,
            code: `class Solution {
public:
    int calculate(string s) {
        stack<pair<long long, int>> st; // (previousResult, signBeforeParen)
        long long result = 0;
        long long num = 0;
        int sign = 1;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            }
            else if (c == '+') {
                result += sign * num;
                num = 0;
                sign = 1;
            }
            else if (c == '-') {
                result += sign * num;
                num = 0;
                sign = -1;
            }
            else if (c == '(') {
                // Save current state and reset
                st.push({result, sign});
                result = 0;
                sign = 1;
            }
            else if (c == ')') {
                result += sign * num;
                num = 0;
                // Restore previous state
                auto [prevResult, prevSign] = st.top();
                st.pop();
                result = prevResult + prevSign * result;
            }
        }
        
        return result + sign * num;
    }
};`
        },
        {
            title: "394. Decode String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/decode-string/",
            intuition: "Nested brackets mean recursion, which means stack! When we see '[', push current string and number. When we see ']', pop and repeat the inner string. Build strings character by character.",
            approach: "Use two stacks: one for multipliers, one for previous strings. On '[': push current state, reset. On ']': pop and repeat current string. Digits build the multiplier, letters build current string.",
            timeComplexity: "O(output length)",
            spaceComplexity: "O(n) stack depth",
            visual: `<div class="visual-diagram">
s = "3[a2[c]]"

Processing step by step:
┌──────┬───────────────────────────────────────────────────────┐
│ Char │ numStack │ strStack │ currentNum │ currentStr        │
├──────┼──────────┼──────────┼────────────┼───────────────────┤
│  3   │ []       │ []       │     3      │ ""                │
│  [   │ [3]      │ [""]     │     0      │ ""                │
│  a   │ [3]      │ [""]     │     0      │ "a"               │
│  2   │ [3]      │ [""]     │     2      │ "a"               │
│  [   │ [3,2]    │ ["","a"] │     0      │ ""                │
│  c   │ [3,2]    │ ["","a"] │     0      │ "c"               │
│  ]   │ [3]      │ [""]     │     0      │ "a"+"cc"="acc"    │
│      │          │          │            │ (pop 2,repeat "c")│
│  ]   │ []       │ []       │     0      │ ""+"accaccacc"    │
│      │          │          │            │ (pop 3, repeat)   │
└──────┴──────────┴──────────┴────────────┴───────────────────┘

Result: "accaccacc"
</div>`,
            code: `class Solution {
public:
    string decodeString(string s) {
        stack<int> numStack;
        stack<string> strStack;
        string currentStr = "";
        int currentNum = 0;
        
        for (char c : s) {
            if (isdigit(c)) {
                currentNum = currentNum * 10 + (c - '0');
            }
            else if (c == '[') {
                // Save current state
                numStack.push(currentNum);
                strStack.push(currentStr);
                currentNum = 0;
                currentStr = "";
            }
            else if (c == ']') {
                // Pop and repeat
                int repeatTimes = numStack.top(); numStack.pop();
                string prevStr = strStack.top(); strStack.pop();
                string repeated = "";
                for (int i = 0; i < repeatTimes; i++) {
                    repeated += currentStr;
                }
                currentStr = prevStr + repeated;
            }
            else {
                currentStr += c;
            }
        }
        
        return currentStr;
    }
};`
        }
    ]
};
