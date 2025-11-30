window.cycleDetectionPattern = {
    title: "Cycle Detection",
    scenario: "You're required to detect whether a graph contains cycles or not.",
    clue: "Look for problems where you need to ensure that no node is visited more than once during traversal, employing DFS or BFS to detect back edges.",
    problems: [
        {
            title: "Course Schedule",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/course-schedule/",
            intuition: "Courses with prerequisites form a directed graph. If there's a cycle, some courses can never be completed (circular dependency). We need to detect if this DAG has a cycle.",
            approach: "Use DFS with 3 states: unvisited (0), visiting (1), visited (2). If we encounter a 'visiting' node during DFS, there's a cycle. Alternatively, use Kahn's algorithm (topological sort) - if we can't process all nodes, there's a cycle.",
            visual: `numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph:
0 → 1 → 3
↓       ↑
2 ──────┘

No cycle - can complete all courses
Order: 0 → 1 → 2 → 3 or 0 → 2 → 1 → 3

With cycle: [[1,0],[0,1]]
0 ⇄ 1  (cycle!)
Cannot complete courses`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> state(numCourses, 0);  // 0: unvisited, 1: visiting, 2: visited
        
        // Build graph
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
        }
        
        // Check each course
        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(graph, state, i)) {
                return false;
            }
        }
        
        return true;
    }
    
private:
    bool hasCycle(vector<vector<int>>& graph, vector<int>& state, int node) {
        if (state[node] == 1) return true;   // Cycle detected
        if (state[node] == 2) return false;  // Already processed
        
        state[node] = 1;  // Mark as visiting
        
        for (int neighbor : graph[node]) {
            if (hasCycle(graph, state, neighbor)) {
                return true;
            }
        }
        
        state[node] = 2;  // Mark as visited
        return false;
    }
    
    // Kahn's Algorithm (BFS) approach
    bool canFinishKahn(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);
        
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        
        int processed = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            processed++;
            
            for (int neighbor : graph[node]) {
                if (--indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return processed == numCourses;
    }
};`
        },
        {
            title: "Course Schedule II",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/course-schedule-ii/",
            intuition: "Same as Course Schedule, but now we need to return the actual order. This is topological sorting - order nodes so all dependencies come before dependents.",
            approach: "Use DFS with post-order traversal: after visiting all neighbors, add current node to result. Reverse at the end for topological order. Or use Kahn's algorithm and collect nodes as we process them.",
            visual: `numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Topological Sort (Kahn's):
Initial indegree: [0,1,1,2]
Queue: [0]

Process 0: Queue [1,2], result [0]
Process 1: Queue [2], indegree[3]=1, result [0,1]
Process 2: Queue [3], indegree[3]=0, result [0,1,2]
Process 3: result [0,1,2,3]

Answer: [0,1,2,3] or [0,2,1,3]`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);
        
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int course = q.front();
            q.pop();
            order.push_back(course);
            
            for (int next : graph[course]) {
                if (--indegree[next] == 0) {
                    q.push(next);
                }
            }
        }
        
        if (order.size() != numCourses) return {};  // Cycle exists
        return order;
    }
    
    // DFS approach
    vector<int> findOrderDFS(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> state(numCourses, 0);
        vector<int> order;
        
        for (auto& p : prerequisites) {
            graph[p[1]].push_back(p[0]);
        }
        
        for (int i = 0; i < numCourses; i++) {
            if (!dfs(graph, state, i, order)) {
                return {};
            }
        }
        
        reverse(order.begin(), order.end());
        return order;
    }
    
private:
    bool dfs(vector<vector<int>>& graph, vector<int>& state, 
             int node, vector<int>& order) {
        if (state[node] == 1) return false;  // Cycle
        if (state[node] == 2) return true;   // Done
        
        state[node] = 1;
        for (int next : graph[node]) {
            if (!dfs(graph, state, next, order)) return false;
        }
        
        state[node] = 2;
        order.push_back(node);  // Post-order
        return true;
    }
};`
        },
        {
            title: "Find Eventual Safe States",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/find-eventual-safe-states/",
            intuition: "A node is safe if all paths from it lead to terminal nodes (nodes with no outgoing edges). Nodes in cycles or leading to cycles are unsafe. We need to find all safe nodes.",
            approach: "Use DFS with 3 states. A node is safe if all its neighbors are safe. Alternatively, reverse the graph and use topological sort from terminal nodes - nodes reachable from terminal nodes in reverse graph are safe.",
            visual: `graph = [[1,2],[2,3],[5],[0],[5],[],[]]

0 → 1 → 2 → 5 (terminal)
↓   ↓   ↓
2   3   5
    ↓
    0 (cycle: 0→1→3→0)

Safe nodes: those not in cycle
Node 5, 6: terminal (safe)
Node 2: leads to 5 (safe)
Node 4: leads to 5 (safe)
Node 0,1,3: in cycle (unsafe)

Answer: [2,4,5,6]`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0);  // 0: unvisited, 1: visiting, 2: safe
        vector<int> result;
        
        for (int i = 0; i < n; i++) {
            if (isSafe(graph, state, i)) {
                result.push_back(i);
            }
        }
        
        return result;
    }
    
private:
    bool isSafe(vector<vector<int>>& graph, vector<int>& state, int node) {
        if (state[node] > 0) {
            return state[node] == 2;  // Return true if safe, false if visiting
        }
        
        state[node] = 1;  // Visiting
        
        for (int next : graph[node]) {
            if (!isSafe(graph, state, next)) {
                return false;  // Found cycle or unsafe path
            }
        }
        
        state[node] = 2;  // Safe
        return true;
    }
};`
        },
        {
            title: "Detect Cycle in Directed Graph",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/find-eventual-safe-states/",
            intuition: "In a directed graph, a cycle exists if during DFS we encounter a node that is currently in the recursion stack (being visited). This is a back edge.",
            approach: "Use DFS with a recursion stack tracker. Mark nodes as 'in-stack' when entering, 'done' when leaving. If we visit a node that's 'in-stack', we found a cycle.",
            visual: `Directed Graph:
0 → 1 → 2
    ↓   ↓
    3 ← 4

DFS from 0:
Stack: [0] → [0,1] → [0,1,2] → [0,1,2,4]
4 → 3: Stack [0,1,2,4,3]
3 → 1: Node 1 is in stack! CYCLE found

Cycle: 1 → 2 → 4 → 3 → 1`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    bool hasCycle(int V, vector<vector<int>>& adj) {
        vector<bool> visited(V, false);
        vector<bool> inStack(V, false);
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (dfs(adj, i, visited, inStack)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
private:
    bool dfs(vector<vector<int>>& adj, int node,
             vector<bool>& visited, vector<bool>& inStack) {
        visited[node] = true;
        inStack[node] = true;
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(adj, neighbor, visited, inStack)) {
                    return true;
                }
            } else if (inStack[neighbor]) {
                return true;  // Back edge found - cycle!
            }
        }
        
        inStack[node] = false;  // Remove from stack when done
        return false;
    }
};`
        },
        {
            title: "Redundant Connection II",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/redundant-connection-ii/",
            intuition: "In a rooted tree, each node except root has exactly one parent. Given edges that form an invalid tree, find the edge to remove. Issues: node with 2 parents, or a cycle.",
            approach: "First check if any node has 2 parents. If yes, one of those edges is the answer. Then check for cycle using Union-Find. Handle edge cases where both problems exist.",
            visual: `edges = [[1,2],[1,3],[2,3]]

     1
    / \\
   2   3
    \\ /
     ? (3 has 2 parents: 1 and 2)

Node 3 has parents: 1 and 2
Check edges [1,3] and [2,3]

Remove [2,3] → valid tree
Answer: [2,3]`,
            timeComplexity: "O(n × α(n))",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> parent;
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> nodeParent(n + 1, 0);
        int candidate1 = -1, candidate2 = -1;
        
        // Step 1: Check for node with 2 parents
        for (int i = 0; i < n; i++) {
            int u = edges[i][0], v = edges[i][1];
            if (nodeParent[v] != 0) {
                candidate1 = nodeParent[v] - 1;  // First edge to v
                candidate2 = i;                   // Second edge to v
                edges[i][1] = 0;  // Temporarily remove this edge
            } else {
                nodeParent[v] = i + 1;
            }
        }
        
        // Step 2: Union-Find to detect cycle
        parent.resize(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        for (int i = 0; i < n; i++) {
            int u = edges[i][0], v = edges[i][1];
            if (v == 0) continue;  // Skip removed edge
            
            int pu = find(u);
            if (pu == v) {
                // Cycle found
                if (candidate1 == -1) {
                    return edges[i];  // No double parent, this is the answer
                }
                return edges[candidate1];  // candidate2 was removed, candidate1 is answer
            }
            parent[v] = pu;
        }
        
        return edges[candidate2];  // No cycle found, candidate2 is answer
    }
};`
        }
    ]
};
