window.bipartitePattern = {
    title: "Bipartite Graph Check",
    scenario: "You need to determine if a given undirected graph is bipartite, i.e., it's possible to split the vertices into two independent sets such that no edge connects vertices of the same set.",
    clue: "Look for problems where you need to color nodes alternatively while traversing the graph to detect any conflicts.",
    problems: [
        {
            title: "Is Graph Bipartite?",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/is-graph-bipartite/",
            intuition: "A graph is bipartite if we can 2-color it such that no adjacent nodes have the same color. Use BFS/DFS to color nodes. If we find a neighbor with the same color, it's not bipartite.",
            approach: "Start BFS/DFS from each unvisited node. Assign color 0 to start node. For each neighbor, assign opposite color. If neighbor already has same color as current, return false.",
            visual: `graph = [[1,3],[0,2],[1,3],[0,2]]

    0 --- 1
    |     |
    3 --- 2

Color 0: RED, Color 1: BLUE
Start: node 0 = RED
  Node 1 = BLUE (neighbor of 0)
  Node 3 = BLUE (neighbor of 0)
  Node 2 = RED (neighbor of 1,3 - both BLUE)

Check: 
0(R)-1(B) ✓, 0(R)-3(B) ✓
1(B)-2(R) ✓, 2(R)-3(B) ✓

Bipartite! Sets: {0,2} and {1,3}`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);  // -1: unvisited, 0/1: colors
        
        // Check all components
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!bfs(graph, color, i)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
private:
    bool bfs(vector<vector<int>>& graph, vector<int>& color, int start) {
        queue<int> q;
        q.push(start);
        color[start] = 0;
        
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            
            for (int neighbor : graph[node]) {
                if (color[neighbor] == -1) {
                    color[neighbor] = 1 - color[node];  // Opposite color
                    q.push(neighbor);
                } else if (color[neighbor] == color[node]) {
                    return false;  // Same color - not bipartite
                }
            }
        }
        
        return true;
    }
    
    // DFS approach
    bool dfs(vector<vector<int>>& graph, vector<int>& color, 
             int node, int c) {
        color[node] = c;
        
        for (int neighbor : graph[node]) {
            if (color[neighbor] == -1) {
                if (!dfs(graph, color, neighbor, 1 - c)) {
                    return false;
                }
            } else if (color[neighbor] == c) {
                return false;
            }
        }
        
        return true;
    }
};`
        },
        {
            title: "Possible Bipartition",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/possible-bipartition/",
            intuition: "Given n people and list of pairs who dislike each other, check if we can split into two groups where no two people in same group dislike each other. This is bipartite check on the 'dislike' graph.",
            approach: "Build graph from dislikes. Two people who dislike each other must be in different groups (different colors). Use BFS/DFS to 2-color the graph. If possible, bipartition exists.",
            visual: `n = 4, dislikes = [[1,2],[1,3],[2,4]]

Dislike graph:
    1 --- 2
    |     |
    3     4

Color 1: Group A, Color 2: Group B
1 → Group A
2,3 → Group B (dislike 1)
4 → Group A (dislikes 2 who is in B)

Groups: A={1,4}, B={2,3}
Check: No dislikes within groups ✓`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> graph(n + 1);
        vector<int> color(n + 1, -1);
        
        // Build graph
        for (auto& d : dislikes) {
            graph[d[0]].push_back(d[1]);
            graph[d[1]].push_back(d[0]);
        }
        
        // Check all components
        for (int i = 1; i <= n; i++) {
            if (color[i] == -1) {
                if (!bfs(graph, color, i)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
private:
    bool bfs(vector<vector<int>>& graph, vector<int>& color, int start) {
        queue<int> q;
        q.push(start);
        color[start] = 0;
        
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            
            for (int neighbor : graph[node]) {
                if (color[neighbor] == -1) {
                    color[neighbor] = 1 - color[node];
                    q.push(neighbor);
                } else if (color[neighbor] == color[node]) {
                    return false;
                }
            }
        }
        
        return true;
    }
};`
        },
        {
            title: "Bipartite Graph",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/bipartite-graph/",
            intuition: "Classic bipartite check using graph coloring. A graph is bipartite iff it contains no odd-length cycles. We verify by trying to 2-color the graph.",
            approach: "Use Union-Find alternative: for each node, all its neighbors should be in the same group (opposite to current node). Union all neighbors together. If a node ends up in same group as its neighbor, not bipartite.",
            visual: `Union-Find approach:
For node u with neighbors v1, v2, v3:
- u should be opposite to v1, v2, v3
- So v1, v2, v3 should all be same group

Union(v1, v2), Union(v2, v3)
If Find(u) == Find(v1), not bipartite!

Example: 0--1--2--0 (triangle)
Node 0: neighbors {1,2}, Union(1,2)
Node 1: neighbors {0,2}, Union(0,2)
Now Find(0)==Find(2), but 0--2 edge!
Not bipartite.`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    // Union-Find approach
    vector<int> parent;
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    void unite(int x, int y) {
        parent[find(x)] = find(y);
    }
    
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (int i = 0; i < n; i++) {
            if (graph[i].empty()) continue;
            
            int first = graph[i][0];
            for (int j = 1; j < graph[i].size(); j++) {
                // All neighbors should be in same group
                unite(first, graph[i][j]);
            }
            
            // Check if current node is in same group as any neighbor
            for (int neighbor : graph[i]) {
                if (find(i) == find(neighbor)) {
                    return false;
                }
            }
        }
        
        return true;
    }
};`
        },
        {
            title: "Graph Coloring",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/graph-coloring/",
            intuition: "Determine if graph can be colored with exactly 2 colors (bipartite check). This is fundamental to understanding many graph partitioning problems.",
            approach: "BFS/DFS coloring. Start from any uncolored node, assign color 0. All its neighbors get color 1. Continue until all nodes colored or conflict found.",
            visual: `Graph:      Can we 2-color?
A --- B
|     |
D --- C

BFS from A:
Level 0: A(0)
Level 1: B(1), D(1)
Level 2: C(0)

Check edges:
A(0)-B(1) ✓
A(0)-D(1) ✓
B(1)-C(0) ✓
D(1)-C(0) ✓

Yes! 2-colorable.
Color 0: {A, C}, Color 1: {B, D}`,
            timeComplexity: "O(V + E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    bool canTwoColor(int n, vector<vector<int>>& edges) {
        vector<vector<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }
        
        vector<int> color(n, -1);
        
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                // BFS coloring
                queue<int> q;
                q.push(i);
                color[i] = 0;
                
                while (!q.empty()) {
                    int node = q.front();
                    q.pop();
                    
                    for (int neighbor : graph[node]) {
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[node];
                            q.push(neighbor);
                        } else if (color[neighbor] == color[node]) {
                            return false;  // Conflict!
                        }
                    }
                }
            }
        }
        
        return true;
    }
    
    // Get the two partitions if bipartite
    pair<vector<int>, vector<int>> getPartitions(int n, vector<vector<int>>& edges) {
        vector<vector<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }
        
        vector<int> color(n, -1);
        vector<int> set0, set1;
        
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                queue<int> q;
                q.push(i);
                color[i] = 0;
                
                while (!q.empty()) {
                    int node = q.front();
                    q.pop();
                    
                    if (color[node] == 0) set0.push_back(node);
                    else set1.push_back(node);
                    
                    for (int neighbor : graph[node]) {
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[node];
                            q.push(neighbor);
                        }
                    }
                }
            }
        }
        
        return {set0, set1};
    }
};`
        },
        {
            title: "Matching Bipartite Graph",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/matching-bipartite-graph/",
            intuition: "Find maximum matching in a bipartite graph - maximum set of edges with no shared vertices. This is the Hungarian algorithm or Hopcroft-Karp for efficient matching.",
            approach: "Use augmenting paths: try to match each node in set A. If neighbor in B is unmatched or can find alternate path for its current match, we can extend the matching.",
            visual: `Bipartite Graph:
Set A: {1, 2, 3}
Set B: {4, 5, 6}
Edges: 1-4, 1-5, 2-5, 3-6

    1 --- 4
     \\
      5
     /
    2
    
    3 --- 6

Maximum Matching:
Match 1-4, 2-5, 3-6 (size = 3)`,
            timeComplexity: "O(V × E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    // Hungarian Algorithm for Maximum Bipartite Matching
    int maxMatching(int n, int m, vector<vector<int>>& edges) {
        // n = size of set A, m = size of set B
        vector<vector<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
        }
        
        vector<int> matchA(n, -1);  // matchA[i] = matched node in B
        vector<int> matchB(m, -1);  // matchB[j] = matched node in A
        
        int matching = 0;
        
        for (int u = 0; u < n; u++) {
            vector<bool> visited(m, false);
            if (augment(graph, u, matchA, matchB, visited)) {
                matching++;
            }
        }
        
        return matching;
    }
    
private:
    bool augment(vector<vector<int>>& graph, int u,
                 vector<int>& matchA, vector<int>& matchB,
                 vector<bool>& visited) {
        for (int v : graph[u]) {
            if (visited[v]) continue;
            visited[v] = true;
            
            // If v is unmatched OR we can find alternate for v's match
            if (matchB[v] == -1 || 
                augment(graph, matchB[v], matchA, matchB, visited)) {
                matchA[u] = v;
                matchB[v] = u;
                return true;
            }
        }
        return false;
    }
};`
        }
    ]
};
