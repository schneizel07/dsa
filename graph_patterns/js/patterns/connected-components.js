window.connectedComponentsPattern = {
    title: "Finding Connected Components",
    scenario: "You're given a graph, and you need to identify distinct subgraphs where all vertices are connected to each other by paths.",
    clue: "Look for problems where you need to group nodes based on their connectivity, often involving DFS or BFS traversal.",
    problems: [
        {
            title: "Number of Islands",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/number-of-islands/",
            intuition: "Each island is a connected component of '1's. We need to count how many separate groups of connected land cells exist. Starting from any unvisited land cell, we can explore all connected land cells using DFS/BFS.",
            approach: "Iterate through the grid. When we find a '1', increment island count and use DFS to mark all connected '1's as visited (sink them to '0'). This ensures we don't count the same island twice.",
            visual: `Grid:
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1

Connected Components (Islands):
Component 1: {(0,0), (0,1), (1,0), (1,1)}
Component 2: {(2,2)}
Component 3: {(3,3), (3,4)}

Total Islands = 3`,
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(m × n) worst case",
            code: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    dfs(grid, i, j);
                }
            }
        }
        return islands;
    }
    
private:
    void dfs(vector<vector<char>>& grid, int i, int j) {
        if (i < 0 || i >= grid.size() || 
            j < 0 || j >= grid[0].size() || 
            grid[i][j] == '0') {
            return;
        }
        
        grid[i][j] = '0';  // Mark visited
        
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
};`
        },
        {
            title: "Number of Connected Components in an Undirected Graph",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
            intuition: "Count separate groups of nodes that are connected. Use Union-Find (Disjoint Set Union) or DFS. Initially each node is its own component. When we see an edge, we merge the components.",
            approach: "Use Union-Find: initialize each node as its own parent. For each edge, union the two nodes. Count unique parents (roots) at the end. Alternatively, use DFS from each unvisited node and count traversal initiations.",
            visual: `n = 5, edges = [[0,1], [1,2], [3,4]]

Initial: Each node is own component
  0   1   2   3   4

After edge [0,1]: Union(0,1)
  0-1   2   3   4

After edge [1,2]: Union(1,2)
  0-1-2   3   4

After edge [3,4]: Union(3,4)
  0-1-2   3-4

Components: {0,1,2}, {3,4}
Answer: 2`,
            timeComplexity: "O(n + e × α(n)) with Union-Find",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    // Union-Find approach
    vector<int> parent, rank_;
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        
        // Union by rank
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
    }
    
    int countComponents(int n, vector<vector<int>>& edges) {
        parent.resize(n);
        rank_.resize(n, 0);
        
        // Initialize: each node is its own parent
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        
        // Process edges
        for (auto& edge : edges) {
            unite(edge[0], edge[1]);
        }
        
        // Count unique roots
        int components = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) components++;
        }
        
        return components;
    }
};`
        },
        {
            title: "Friend Circles (Number of Provinces)",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/friend-circles/",
            intuition: "Given an adjacency matrix where M[i][j] = 1 means i and j are friends. Friends of friends are also in the same circle. Count the number of friend circles (connected components).",
            approach: "Use DFS or Union-Find. For DFS: start from each unvisited person, mark all reachable friends as visited. Count how many times we start a new DFS. For Union-Find: union friends and count unique roots.",
            visual: `isConnected = [[1,1,0],
                [1,1,0],
                [0,0,1]]

Person 0 and 1 are friends (isConnected[0][1] = 1)
Person 2 has no friends

Graph:
0 --- 1     2

Friend Circles: {0, 1}, {2}
Answer: 2`,
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<bool> visited(n, false);
        int circles = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                circles++;
                dfs(isConnected, visited, i);
            }
        }
        
        return circles;
    }
    
private:
    void dfs(vector<vector<int>>& isConnected, 
             vector<bool>& visited, int person) {
        visited[person] = true;
        
        for (int other = 0; other < isConnected.size(); other++) {
            if (isConnected[person][other] == 1 && !visited[other]) {
                dfs(isConnected, visited, other);
            }
        }
    }
};`
        },
        {
            title: "Accounts Merge",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/accounts-merge/",
            intuition: "Emails belonging to the same person should be merged. If two accounts share any email, they belong to the same person. This is a connected components problem where emails are nodes and we group connected emails.",
            approach: "Use Union-Find on emails. Map each email to the first account that owns it. When we see an email in multiple accounts, union them. Finally, group emails by their root account and sort.",
            visual: `accounts = [
  ["John", "john@mail.com", "john_work@mail.com"],
  ["John", "john@mail.com", "john_home@mail.com"],
  ["Mary", "mary@mail.com"]
]

"john@mail.com" appears in accounts 0 and 1
→ Union account 0 and 1

Result:
["John", "john@mail.com", "john_home@mail.com", "john_work@mail.com"]
["Mary", "mary@mail.com"]`,
            timeComplexity: "O(n × k × α(n×k)) where k = avg emails",
            spaceComplexity: "O(n × k)",
            code: `class Solution {
public:
    unordered_map<string, string> parent;
    
    string find(string x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    void unite(string x, string y) {
        parent[find(x)] = find(y);
    }
    
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, string> emailToName;
        
        // Initialize parent and map email to name
        for (auto& account : accounts) {
            string name = account[0];
            for (int i = 1; i < account.size(); i++) {
                parent[account[i]] = account[i];
                emailToName[account[i]] = name;
            }
        }
        
        // Union emails in same account
        for (auto& account : accounts) {
            string firstEmail = account[1];
            for (int i = 2; i < account.size(); i++) {
                unite(account[i], firstEmail);
            }
        }
        
        // Group emails by root
        unordered_map<string, set<string>> groups;
        for (auto& [email, name] : emailToName) {
            groups[find(email)].insert(email);
        }
        
        // Build result
        vector<vector<string>> result;
        for (auto& [root, emails] : groups) {
            vector<string> account = {emailToName[root]};
            account.insert(account.end(), emails.begin(), emails.end());
            result.push_back(account);
        }
        
        return result;
    }
};`
        },
        {
            title: "Redundant Connection",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/redundant-connection/",
            intuition: "A tree with n nodes has n-1 edges. Given n edges, one is redundant. The redundant edge creates a cycle. Find and return the edge that, when removed, results in a tree.",
            approach: "Use Union-Find. Process edges one by one. If both nodes of an edge already have the same root (already connected), this edge creates a cycle and is the answer. Return the last such edge found.",
            visual: `edges = [[1,2], [1,3], [2,3]]

Process [1,2]: Union(1,2) - OK
  1 - 2    3

Process [1,3]: Union(1,3) - OK
  1 - 2
  |
  3

Process [2,3]: Find(2)=1, Find(3)=1
  Already connected! This creates cycle.

Answer: [2,3]`,
            timeComplexity: "O(n × α(n))",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> parent, rank_;
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
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
    
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n + 1);
        rank_.resize(n + 1, 0);
        
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
        }
        
        for (auto& edge : edges) {
            if (!unite(edge[0], edge[1])) {
                return edge;  // This edge creates cycle
            }
        }
        
        return {};
    }
};`
        }
    ]
};
