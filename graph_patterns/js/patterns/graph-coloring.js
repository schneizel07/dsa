window.graphColoringPattern = {
    title: "Graph Coloring",
    scenario: "You need to assign colors to the vertices of a graph such that no two adjacent vertices have the same color.",
    clue: "Look for problems where you need to color the graph with a minimum number of colors without violating the coloring rule.",
    problems: [
        {
            title: "Graph Coloring",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/graph-coloring/",
            intuition: "Assign colors to nodes so no adjacent nodes share a color. The minimum colors needed is the chromatic number. For 2 colors, it's bipartite check. For m colors, use backtracking.",
            approach: "Backtracking: try coloring each node with colors 1 to m. Check if current assignment is valid (no neighbor has same color). If valid, recurse to next node. If no color works, backtrack.",
            visual: `Graph:       m = 3 colors
A --- B
|\\   /|
| \\ / |
|  X  |
| / \\ |
C --- D

Coloring:
A: Color 1
B: Color 2 (adjacent to A)
C: Color 2 (adjacent to A)
D: Color 3 (adjacent to B,C with colors 2)

Wait, B-C not adjacent, so:
A:1, B:2, D:3, C:2 ✓

Or A:1, B:2, C:3, D:2 ✓`,
            timeComplexity: "O(m^V)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    bool graphColoring(vector<vector<int>>& graph, int m) {
        int n = graph.size();
        vector<int> color(n, 0);
        return backtrack(graph, color, m, 0);
    }
    
private:
    bool backtrack(vector<vector<int>>& graph, vector<int>& color, 
                   int m, int node) {
        if (node == graph.size()) {
            return true;  // All nodes colored
        }
        
        // Try each color
        for (int c = 1; c <= m; c++) {
            if (isSafe(graph, color, node, c)) {
                color[node] = c;
                
                if (backtrack(graph, color, m, node + 1)) {
                    return true;
                }
                
                color[node] = 0;  // Backtrack
            }
        }
        
        return false;
    }
    
    bool isSafe(vector<vector<int>>& graph, vector<int>& color, 
                int node, int c) {
        for (int neighbor : graph[node]) {
            if (color[neighbor] == c) {
                return false;
            }
        }
        return true;
    }
};`
        },
        {
            title: "Course Schedule IV",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/course-schedule-iv/",
            intuition: "Answer queries about prerequisite relationships. Build transitive closure - know if course A is prerequisite (direct or indirect) for course B. Use Floyd-Warshall or BFS/DFS.",
            approach: "Build prerequisite matrix using Floyd-Warshall: if A→B and B→C then A→C. Or for each node, BFS/DFS to find all reachable nodes. Answer queries in O(1).",
            visual: `n = 3, prerequisites = [[1,2],[1,0],[2,0]]
queries = [[1,0],[1,2]]

Build reachability:
1 → 2 → 0
1 → 0

Transitive closure:
1 can reach: {0, 2}
2 can reach: {0}
0 can reach: {}

Query [1,0]: Is 1 prereq of 0? Yes ✓
Query [1,2]: Is 1 prereq of 2? Yes ✓`,
            timeComplexity: "O(n³) preprocessing, O(1) per query",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    vector<bool> checkIfPrerequisite(int n, vector<vector<int>>& prerequisites,
                                      vector<vector<int>>& queries) {
        // Build reachability matrix
        vector<vector<bool>> reachable(n, vector<bool>(n, false));
        
        // Direct prerequisites
        for (auto& p : prerequisites) {
            reachable[p[0]][p[1]] = true;
        }
        
        // Floyd-Warshall for transitive closure
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (reachable[i][k] && reachable[k][j]) {
                        reachable[i][j] = true;
                    }
                }
            }
        }
        
        // Answer queries
        vector<bool> result;
        for (auto& q : queries) {
            result.push_back(reachable[q[0]][q[1]]);
        }
        
        return result;
    }
    
    // BFS approach
    vector<bool> checkIfPrerequisiteBFS(int n, vector<vector<int>>& prerequisites,
                                         vector<vector<int>>& queries) {
        vector<vector<int>> graph(n);
        for (auto& p : prerequisites) {
            graph[p[0]].push_back(p[1]);
        }
        
        // BFS from each node to find all reachable nodes
        vector<unordered_set<int>> reachable(n);
        for (int i = 0; i < n; i++) {
            queue<int> q;
            q.push(i);
            while (!q.empty()) {
                int node = q.front();
                q.pop();
                
                for (int next : graph[node]) {
                    if (reachable[i].find(next) == reachable[i].end()) {
                        reachable[i].insert(next);
                        q.push(next);
                    }
                }
            }
        }
        
        vector<bool> result;
        for (auto& q : queries) {
            result.push_back(reachable[q[0]].count(q[1]) > 0);
        }
        
        return result;
    }
};`
        },
        {
            title: "Minimum Number of Vertices to Reach All Nodes",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/",
            intuition: "Find minimum set of vertices from which all nodes are reachable. In a DAG, these are exactly the nodes with no incoming edges (indegree 0). They must be starting points.",
            approach: "Count indegree of each node. Nodes with indegree 0 have no incoming edges - they can't be reached from any other node. Return all nodes with indegree 0.",
            visual: `n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]

Indegree:
0: 0 (no incoming)
1: 1 (from 0)
2: 2 (from 0,4)
3: 0 (no incoming)
4: 1 (from 3)
5: 1 (from 2)

Nodes with indegree 0: {0, 3}

From 0: reach 0,1,2,5
From 3: reach 3,4,2,5

Together reach all nodes!
Answer: [0, 3]`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<bool> hasIncoming(n, false);
        
        for (auto& edge : edges) {
            hasIncoming[edge[1]] = true;
        }
        
        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (!hasIncoming[i]) {
                result.push_back(i);
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "Flower Planting With No Adjacent",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/flower-planting-with-no-adjacent/",
            intuition: "Each garden connected to at most 3 others. With 4 flower types, greedy works: for each garden, pick any flower not used by neighbors. Always possible due to degree constraint.",
            approach: "Build adjacency list. For each garden, check flowers used by neighbors. Pick first available flower (1-4). Since max degree is 3 and we have 4 colors, always have at least one option.",
            visual: `n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3]]

    1 --- 2
    |\\    |
    | \\   |
    |  \\  |
    4 --- 3

Garden 1: no neighbors colored → pick 1
Garden 2: neighbor 1 has 1 → pick 2
Garden 3: neighbors 1,2 have 1,2 → pick 3
Garden 4: neighbors 1,3 have 1,3 → pick 2

Answer: [1, 2, 3, 2]`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    vector<int> gardenNoAdj(int n, vector<vector<int>>& paths) {
        vector<vector<int>> graph(n + 1);
        for (auto& p : paths) {
            graph[p[0]].push_back(p[1]);
            graph[p[1]].push_back(p[0]);
        }
        
        vector<int> flowers(n + 1, 0);  // 0 = no flower yet
        
        for (int garden = 1; garden <= n; garden++) {
            set<int> usedByNeighbors;
            
            for (int neighbor : graph[garden]) {
                if (flowers[neighbor] != 0) {
                    usedByNeighbors.insert(flowers[neighbor]);
                }
            }
            
            // Pick first available flower (1-4)
            for (int flower = 1; flower <= 4; flower++) {
                if (usedByNeighbors.find(flower) == usedByNeighbors.end()) {
                    flowers[garden] = flower;
                    break;
                }
            }
        }
        
        return vector<int>(flowers.begin() + 1, flowers.end());
    }
};`
        },
        {
            title: "Minimum Height Trees",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/minimum-height-trees/",
            intuition: "MHTs rooted at centroids of tree. Repeatedly remove leaves (degree 1 nodes) until 1 or 2 nodes remain - these are centroids. Like peeling an onion from outside.",
            approach: "Start with all leaves. Remove them and their edges. New leaves appear. Repeat until ≤2 nodes remain. These are the MHT roots. Works because tree has at most 2 centroids.",
            visual: `n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]

    0
    |
1 - 3 - 4 - 5
    |
    2

Initial leaves: 0, 1, 2, 5
Remove leaves: remaining = {3, 4}
Remove leaves: remaining = {3} or {4}? 
Actually both 3,4 have degree 1 now...

Wait, let's redo:
Degree: 0:1, 1:1, 2:1, 3:4, 4:2, 5:1
Leaves: 0, 1, 2, 5

After removing: edges 3-0,3-1,3-2,4-5 gone
Remaining graph: 3 - 4
Both degree 1 → both are roots

Answer: [3, 4]`,
            timeComplexity: "O(V)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        
        vector<unordered_set<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0]].insert(e[1]);
            graph[e[1]].insert(e[0]);
        }
        
        // Find initial leaves
        queue<int> leaves;
        for (int i = 0; i < n; i++) {
            if (graph[i].size() == 1) {
                leaves.push(i);
            }
        }
        
        int remaining = n;
        
        // Peel leaves until 1 or 2 nodes remain
        while (remaining > 2) {
            int leafCount = leaves.size();
            remaining -= leafCount;
            
            while (leafCount--) {
                int leaf = leaves.front();
                leaves.pop();
                
                // Remove leaf from its neighbor
                int neighbor = *graph[leaf].begin();
                graph[neighbor].erase(leaf);
                
                // Check if neighbor becomes leaf
                if (graph[neighbor].size() == 1) {
                    leaves.push(neighbor);
                }
            }
        }
        
        // Remaining nodes are MHT roots
        vector<int> result;
        while (!leaves.empty()) {
            result.push_back(leaves.front());
            leaves.pop();
        }
        
        return result;
    }
};`
        }
    ]
};
