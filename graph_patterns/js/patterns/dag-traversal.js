window.dagTraversalPattern = {
    title: "Directed Acyclic Graph (DAG) Traversal",
    scenario: "You're given a directed graph without cycles, and you need to traverse it efficiently.",
    clue: "Look for problems where you need to perform a topological sort or find the longest path without revisiting nodes.",
    problems: [
        {
            title: "Alien Dictionary",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/alien-dictionary/",
            intuition: "Given sorted alien words, derive the character ordering. Compare adjacent words to find character precedence. Build a graph of character dependencies and topologically sort.",
            approach: "Compare consecutive words to find first differing character - that gives an edge in our graph. Use Kahn's algorithm for topological sort. Handle invalid cases (like 'abc' before 'ab').",
            visual: `words = ["wrt","wrf","er","ett","rftt"]

Compare adjacent pairs:
wrt vs wrf: t → f
wrf vs er:  w → e
er vs ett:  r → t
ett vs rftt: e → r

Graph: w → e → r → t → f

Topological sort: "wertf"`,
            timeComplexity: "O(C) where C = total chars",
            spaceComplexity: "O(1) - max 26 chars",
            code: `class Solution {
public:
    string alienOrder(vector<string>& words) {
        // Build graph
        unordered_map<char, unordered_set<char>> graph;
        unordered_map<char, int> indegree;
        
        // Initialize all characters
        for (const string& word : words) {
            for (char c : word) {
                indegree[c] = 0;
            }
        }
        
        // Compare adjacent words
        for (int i = 0; i < words.size() - 1; i++) {
            string& w1 = words[i];
            string& w2 = words[i + 1];
            
            // Check invalid case: "abc" before "ab"
            if (w1.length() > w2.length() && 
                w1.substr(0, w2.length()) == w2) {
                return "";
            }
            
            // Find first different character
            for (int j = 0; j < min(w1.length(), w2.length()); j++) {
                if (w1[j] != w2[j]) {
                    if (graph[w1[j]].find(w2[j]) == graph[w1[j]].end()) {
                        graph[w1[j]].insert(w2[j]);
                        indegree[w2[j]]++;
                    }
                    break;
                }
            }
        }
        
        // Topological sort (Kahn's algorithm)
        queue<char> q;
        for (auto& [c, deg] : indegree) {
            if (deg == 0) q.push(c);
        }
        
        string result;
        while (!q.empty()) {
            char c = q.front();
            q.pop();
            result += c;
            
            for (char next : graph[c]) {
                if (--indegree[next] == 0) {
                    q.push(next);
                }
            }
        }
        
        return result.length() == indegree.size() ? result : "";
    }
};`
        },
        {
            title: "Longest Increasing Path in a Matrix",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
            intuition: "Each cell can move to neighbors with larger values - this forms a DAG. Find longest path in this DAG. Use DFS with memoization to avoid recomputation.",
            approach: "For each cell, DFS to find longest increasing path starting there. Memoize results. The DAG structure (strictly increasing) ensures no cycles, so simple memoization works without visited tracking.",
            visual: `matrix = [[9,9,4],
          [6,6,8],
          [2,1,1]]

From cell (2,0) value 2:
2 → 6 → 9 (length 3)

From cell (2,1) value 1:
1 → 2 → 6 → 9 (length 4)

Longest path: 1 → 2 → 6 → 9
Answer: 4`,
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m × n)",
            code: `class Solution {
public:
    vector<vector<int>> memo;
    vector<pair<int,int>> dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        memo.assign(m, vector<int>(n, 0));
        
        int maxLen = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxLen = max(maxLen, dfs(matrix, i, j));
            }
        }
        
        return maxLen;
    }
    
private:
    int dfs(vector<vector<int>>& matrix, int r, int c) {
        if (memo[r][c] != 0) return memo[r][c];
        
        int m = matrix.size(), n = matrix[0].size();
        int maxLen = 1;
        
        for (auto& [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
                matrix[nr][nc] > matrix[r][c]) {
                maxLen = max(maxLen, 1 + dfs(matrix, nr, nc));
            }
        }
        
        memo[r][c] = maxLen;
        return maxLen;
    }
};`
        },
        {
            title: "Course Schedule III",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/course-schedule-iii/",
            intuition: "Take maximum courses where each course has duration and deadline. Sort by deadline, greedily take courses. If a course can't fit, consider swapping with longest taken course.",
            approach: "Sort courses by deadline. Use max-heap for durations of taken courses. For each course: if fits, take it. If not, check if swapping with longest course helps (reduces total time).",
            visual: `courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]

Sort by deadline: [[100,200],[1000,1250],[200,1300],[2000,3200]]

Process:
[100,200]: time=100, take it. Heap: [100]
[1000,1250]: time=1100, take it. Heap: [1000,100]
[200,1300]: time=1300>1300, can't fit
  Swap with 1000? time=100+200=300, fits! Heap: [200,100]
[2000,3200]: time=2300, take it. Heap: [2000,200,100]

Max courses: 3`,
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int scheduleCourse(vector<vector<int>>& courses) {
        // Sort by deadline
        sort(courses.begin(), courses.end(),
             [](auto& a, auto& b) { return a[1] < b[1]; });
        
        priority_queue<int> maxHeap;  // Durations of taken courses
        int time = 0;
        
        for (auto& course : courses) {
            int duration = course[0], deadline = course[1];
            
            if (time + duration <= deadline) {
                // Can take this course
                time += duration;
                maxHeap.push(duration);
            } else if (!maxHeap.empty() && maxHeap.top() > duration) {
                // Swap with longest taken course if beneficial
                time -= maxHeap.top();
                maxHeap.pop();
                time += duration;
                maxHeap.push(duration);
            }
        }
        
        return maxHeap.size();
    }
};`
        },
        {
            title: "Sequence Reconstruction",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/sequence-reconstruction/",
            intuition: "Check if original sequence is the only shortest supersequence that can be reconstructed from given sequences. This means topological order must be unique.",
            approach: "Build graph from sequences. Use Kahn's algorithm - at each step, there must be exactly one node with indegree 0 (unique order). The resulting sequence must match original.",
            visual: `org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]

Graph from seqs:
1 → 2, 1 → 3, 2 → 3

Indegree: 1:0, 2:1, 3:2

Topological sort:
Queue: [1] → pick 1
Queue: [2] → pick 2 (only one choice!)
Queue: [3] → pick 3

Order: [1,2,3] = org ✓
Unique? Yes (always one choice)`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    bool sequenceReconstruction(vector<int>& org, vector<vector<int>>& seqs) {
        int n = org.size();
        vector<unordered_set<int>> graph(n + 1);
        vector<int> indegree(n + 1, 0);
        vector<bool> seen(n + 1, false);
        
        // Build graph
        for (auto& seq : seqs) {
            for (int i = 0; i < seq.size(); i++) {
                if (seq[i] < 1 || seq[i] > n) return false;
                seen[seq[i]] = true;
                
                if (i > 0 && graph[seq[i-1]].find(seq[i]) == graph[seq[i-1]].end()) {
                    graph[seq[i-1]].insert(seq[i]);
                    indegree[seq[i]]++;
                }
            }
        }
        
        // Check all numbers present
        for (int i = 1; i <= n; i++) {
            if (!seen[i]) return false;
        }
        
        // Topological sort - must have unique order
        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        
        int idx = 0;
        while (!q.empty()) {
            if (q.size() > 1) return false;  // Not unique
            
            int node = q.front();
            q.pop();
            
            if (idx >= n || org[idx] != node) return false;
            idx++;
            
            for (int next : graph[node]) {
                if (--indegree[next] == 0) {
                    q.push(next);
                }
            }
        }
        
        return idx == n;
    }
};`
        },
        {
            title: "All Paths from Source Lead to Destination",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/all-paths-from-source-lead-to-destination/",
            intuition: "Check if all paths from source end at destination. Need to verify: no cycles on any path from source, every path reaches destination, and destination is terminal.",
            approach: "Use DFS with 3 states (unvisited, visiting, visited). From source, all paths must end at destination. If we find a cycle or a terminal node that isn't destination, return false.",
            visual: `edges = [[0,1],[0,2],[1,3],[2,3]]
source = 0, destination = 3

    0
   / \\
  1   2
   \\ /
    3

All paths from 0:
0 → 1 → 3 ✓
0 → 2 → 3 ✓

Both end at 3, no cycles. True!`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    bool leadsToDestination(int n, vector<vector<int>>& edges, 
                            int source, int destination) {
        vector<vector<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
        }
        
        // Destination must be terminal
        if (!graph[destination].empty()) return false;
        
        vector<int> state(n, 0);  // 0: unvisited, 1: visiting, 2: visited
        return dfs(graph, source, destination, state);
    }
    
private:
    bool dfs(vector<vector<int>>& graph, int node, int dest, 
             vector<int>& state) {
        if (state[node] == 1) return false;  // Cycle
        if (state[node] == 2) return true;   // Already verified
        
        // Terminal node
        if (graph[node].empty()) {
            return node == dest;
        }
        
        state[node] = 1;  // Visiting
        
        for (int next : graph[node]) {
            if (!dfs(graph, next, dest, state)) {
                return false;
            }
        }
        
        state[node] = 2;  // Verified
        return true;
    }
};`
        }
    ]
};
