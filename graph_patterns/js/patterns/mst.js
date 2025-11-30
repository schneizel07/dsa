window.mstPattern = {
    title: "Minimum Spanning Tree",
    scenario: "You're tasked with finding the minimum weight connected subtree that connects all vertices in a graph.",
    clue: "Look for problems involving weighted edges and the need to minimize the total weight to connect all nodes.",
    problems: [
        {
            title: "Minimum Spanning Tree (Graph Valid Tree)",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/graph-valid-tree/",
            intuition: "A valid tree with n nodes has exactly n-1 edges and is connected. Use Union-Find to check connectivity while ensuring no cycles are formed.",
            approach: "Check if edges count is n-1. Use Union-Find: for each edge, union the nodes. If nodes are already connected (same root), adding this edge creates a cycle - not a tree.",
            visual: `n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]

Add edges:
[0,1]: 0-1 connected
[0,2]: 0-1-2 connected  
[0,3]: 0-1-2-3 connected
[1,4]: all 5 nodes connected

Edges = 4 = n-1 ✓
All nodes connected ✓
No cycles ✓

Valid Tree!`,
            timeComplexity: "O(n × α(n))",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> parent, rank_;
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // Already connected
        
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }
    
    bool validTree(int n, vector<vector<int>>& edges) {
        // Tree must have exactly n-1 edges
        if (edges.size() != n - 1) return false;
        
        parent.resize(n);
        rank_.resize(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (auto& edge : edges) {
            if (!unite(edge[0], edge[1])) {
                return false;  // Cycle detected
            }
        }
        
        return true;
    }
};`
        },
        {
            title: "Connecting Cities With Minimum Cost",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
            intuition: "Classic MST problem. Connect all cities with minimum total cost. Use Kruskal's (sort edges, greedily add) or Prim's algorithm (grow tree from one node).",
            approach: "Kruskal's: Sort edges by weight. Use Union-Find to add edges that don't create cycles. Stop when n-1 edges added. Prim's: Use min-heap to always extend tree with minimum edge.",
            visual: `n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]

Edges sorted by weight: [2,3,1], [1,2,5], [1,3,6]

Kruskal's:
Add [2,3,1]: cost=1, components: {1}, {2,3}
Add [1,2,5]: cost=6, components: {1,2,3}
Skip [1,3,6]: would create cycle

MST edges: [2,3], [1,2]
Total cost: 1 + 5 = 6`,
            timeComplexity: "O(E log E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    vector<int> parent, rank_;
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }
    
    // Kruskal's Algorithm
    int minimumCost(int n, vector<vector<int>>& connections) {
        parent.resize(n + 1);
        rank_.resize(n + 1, 0);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        // Sort by weight
        sort(connections.begin(), connections.end(),
             [](auto& a, auto& b) { return a[2] < b[2]; });
        
        int cost = 0, edgesUsed = 0;
        
        for (auto& conn : connections) {
            if (unite(conn[0], conn[1])) {
                cost += conn[2];
                edgesUsed++;
                if (edgesUsed == n - 1) break;
            }
        }
        
        return edgesUsed == n - 1 ? cost : -1;
    }
    
    // Prim's Algorithm
    int minimumCostPrim(int n, vector<vector<int>>& connections) {
        vector<vector<pair<int,int>>> graph(n + 1);
        for (auto& c : connections) {
            graph[c[0]].push_back({c[1], c[2]});
            graph[c[1]].push_back({c[0], c[2]});
        }
        
        vector<bool> inMST(n + 1, false);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        
        pq.push({0, 1});  // {weight, node}
        int cost = 0, nodesInMST = 0;
        
        while (!pq.empty() && nodesInMST < n) {
            auto [w, u] = pq.top();
            pq.pop();
            
            if (inMST[u]) continue;
            
            inMST[u] = true;
            cost += w;
            nodesInMST++;
            
            for (auto& [v, weight] : graph[u]) {
                if (!inMST[v]) {
                    pq.push({weight, v});
                }
            }
        }
        
        return nodesInMST == n ? cost : -1;
    }
};`
        },
        {
            title: "Redundant Connection II",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/redundant-connection-ii/",
            intuition: "For directed graph forming a rooted tree with one extra edge, find the edge to remove. The extra edge either creates a cycle or gives a node two parents.",
            approach: "Check for node with 2 parents first. If found, one of those edges is removable. Use Union-Find to detect cycles. Handle the case where both conditions exist.",
            visual: `edges = [[2,1],[3,1],[4,2],[1,4]]

     3
      \\
  4 → 2 → 1 ← 3
  ↑       |
  └───────┘

Node 1 has 2 parents: 2 and 3
Also cycle: 1→4→2→1

Check removing [3,1]: still has cycle
Check removing [2,1]: valid tree!

Answer: [2,1]`,
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
        int cand1 = -1, cand2 = -1;
        
        // Find node with 2 parents
        for (int i = 0; i < n; i++) {
            int v = edges[i][1];
            if (nodeParent[v] != 0) {
                cand1 = nodeParent[v] - 1;
                cand2 = i;
                edges[i][1] = 0;  // Remove second edge temporarily
            } else {
                nodeParent[v] = i + 1;
            }
        }
        
        // Union-Find for cycle detection
        parent.resize(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        for (int i = 0; i < n; i++) {
            int u = edges[i][0], v = edges[i][1];
            if (v == 0) continue;
            
            if (find(u) == v) {
                // Cycle found
                return cand1 == -1 ? edges[i] : edges[cand1];
            }
            parent[v] = find(u);
        }
        
        return edges[cand2];
    }
};`
        },
        {
            title: "Campus Bikes II",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/campus-bikes-ii/",
            intuition: "Assign n bikes to n workers minimizing total Manhattan distance. This is minimum cost bipartite matching. Can use DP with bitmask or Hungarian algorithm.",
            approach: "Use bitmask DP: dp[mask] = minimum cost to assign bikes in mask. For each worker, try all unassigned bikes. Or use backtracking with pruning.",
            visual: `workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]

Distances:
Worker 0 to Bike 0: |0-1|+|0-2| = 3
Worker 0 to Bike 1: |0-3|+|0-3| = 6
Worker 1 to Bike 0: |2-1|+|1-2| = 2
Worker 1 to Bike 1: |2-3|+|1-3| = 3

Option 1: W0-B0, W1-B1 = 3 + 3 = 6
Option 2: W0-B1, W1-B0 = 6 + 2 = 8

Minimum = 6`,
            timeComplexity: "O(n × 2^m)",
            spaceComplexity: "O(2^m)",
            code: `class Solution {
public:
    int assignBikes(vector<vector<int>>& workers, vector<vector<int>>& bikes) {
        int n = workers.size(), m = bikes.size();
        vector<int> dp(1 << m, INT_MAX);
        dp[0] = 0;
        
        for (int i = 0; i < n; i++) {
            vector<int> newDp(1 << m, INT_MAX);
            
            for (int mask = 0; mask < (1 << m); mask++) {
                if (dp[mask] == INT_MAX) continue;
                if (__builtin_popcount(mask) != i) continue;
                
                for (int j = 0; j < m; j++) {
                    if (mask & (1 << j)) continue;
                    
                    int dist = abs(workers[i][0] - bikes[j][0]) + 
                               abs(workers[i][1] - bikes[j][1]);
                    int newMask = mask | (1 << j);
                    newDp[newMask] = min(newDp[newMask], dp[mask] + dist);
                }
            }
            
            dp = newDp;
        }
        
        int result = INT_MAX;
        for (int mask = 0; mask < (1 << m); mask++) {
            if (__builtin_popcount(mask) == n) {
                result = min(result, dp[mask]);
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "Optimal Division",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/optimal-division/",
            intuition: "To maximize a/b/c/d..., we want to maximize numerator and minimize denominator. Since a is always numerator and b always starts denominator, we want to minimize b/c/d/... which means maximizing c*d*...",
            approach: "The optimal solution is always a/(b/c/d/...) = a*c*d*.../b. Just put parentheses around everything after the first division.",
            visual: `nums = [1000, 100, 10, 2]

Without parens: 1000/100/10/2 = 0.5
With parens: 1000/(100/10/2) = 1000/(5) = 200

General: a/b/c/d = a/(b*c*d/c/d) 
Best: a/(b/c/d) = a*c*d/b

For [1000,100,10,2]:
1000/(100/10/2) = 1000*10*2/100 = 200`,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    string optimalDivision(vector<int>& nums) {
        int n = nums.size();
        
        if (n == 1) return to_string(nums[0]);
        if (n == 2) return to_string(nums[0]) + "/" + to_string(nums[1]);
        
        // a/(b/c/d/...) format
        string result = to_string(nums[0]) + "/(";
        
        for (int i = 1; i < n; i++) {
            result += to_string(nums[i]);
            if (i < n - 1) result += "/";
        }
        
        result += ")";
        return result;
    }
};`
        }
    ]
};
