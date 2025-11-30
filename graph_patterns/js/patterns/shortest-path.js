window.shortestPathPattern = {
    title: "Shortest Path Finding",
    scenario: "Given a graph with weighted edges, you're tasked with finding the shortest path between two nodes.",
    clue: "Look for problems where you need to optimize distance or traversal time between two points, typically using Dijkstra's or Floyd-Warshall algorithms.",
    problems: [
        {
            title: "Network Delay Time",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/network-delay-time/",
            intuition: "Find the time for a signal to reach all nodes from source. This is finding the maximum of shortest paths from source to all nodes. Use Dijkstra's algorithm for single-source shortest path.",
            approach: "Build adjacency list. Use Dijkstra with min-heap: start from source with time 0, always process the node with minimum time. Track visited nodes and update distances. Return max distance if all nodes reached.",
            visual: `times = [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2

Graph (source = node 2):
    1
   ↗ 
  2 → 3 → 4
  
Dijkstra:
Start: dist = [∞, ∞, 0, ∞, ∞]
Process 2: Update 1 (dist=1), 3 (dist=1)
Process 1: No outgoing edges
Process 3: Update 4 (dist=2)
Process 4: Done

dist = [∞, 1, 0, 1, 2]
Answer: max(1, 0, 1, 2) = 2`,
            timeComplexity: "O((V + E) log V)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        // Build adjacency list
        vector<vector<pair<int, int>>> graph(n + 1);
        for (auto& t : times) {
            graph[t[0]].push_back({t[1], t[2]});
        }
        
        // Dijkstra's algorithm
        vector<int> dist(n + 1, INT_MAX);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        
        dist[k] = 0;
        pq.push({0, k});  // {distance, node}
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            if (d > dist[u]) continue;  // Skip outdated entries
            
            for (auto& [v, w] : graph[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        int maxDist = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxDist = max(maxDist, dist[i]);
        }
        
        return maxDist;
    }
};`
        },
        {
            title: "Cheapest Flights Within K Stops",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            intuition: "Find cheapest path from src to dst with at most k stops. Standard Dijkstra won't work because we might need a longer but cheaper path. Use modified BFS/Dijkstra considering stop count.",
            approach: "Use BFS level by level (each level = one stop) or modified Dijkstra with state (cost, node, stops). Track minimum cost to reach each node with given stops. Bellman-Ford also works with k+1 iterations.",
            visual: `flights = [[0,1,100],[1,2,100],[0,2,500]]
src=0, dst=2, k=1

     100     100
  0 ───→ 1 ───→ 2
   \\           ↗
    └──────────┘
         500

Path 0→2 directly: cost=500, stops=0
Path 0→1→2: cost=200, stops=1

k=1 allows 1 stop, so answer = 200`,
            timeComplexity: "O(k × E)",
            spaceComplexity: "O(V)",
            code: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, 
                          int src, int dst, int k) {
        // Bellman-Ford variant with k+1 iterations
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        
        // k stops means k+1 edges
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;  // Use previous iteration values
            
            for (auto& flight : flights) {
                int u = flight[0], v = flight[1], w = flight[2];
                if (dist[u] != INT_MAX) {
                    temp[v] = min(temp[v], dist[u] + w);
                }
            }
            
            dist = temp;
        }
        
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
    
    // BFS approach (level = stops)
    int findCheapestPriceBFS(int n, vector<vector<int>>& flights,
                              int src, int dst, int k) {
        vector<vector<pair<int,int>>> graph(n);
        for (auto& f : flights) {
            graph[f[0]].push_back({f[1], f[2]});
        }
        
        vector<int> dist(n, INT_MAX);
        queue<pair<int,int>> q;  // {node, cost}
        q.push({src, 0});
        dist[src] = 0;
        int stops = 0;
        
        while (!q.empty() && stops <= k) {
            int size = q.size();
            while (size--) {
                auto [u, cost] = q.front();
                q.pop();
                
                for (auto& [v, w] : graph[u]) {
                    if (cost + w < dist[v]) {
                        dist[v] = cost + w;
                        q.push({v, dist[v]});
                    }
                }
            }
            stops++;
        }
        
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};`
        },
        {
            title: "Shortest Path in Binary Matrix",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            intuition: "Find shortest path from top-left to bottom-right in binary grid, moving in 8 directions. Since all edges have weight 1, BFS gives shortest path (level-order = distance).",
            approach: "Use BFS from (0,0). Each cell can connect to 8 neighbors. Track visited cells to avoid cycles. First time we reach (n-1, n-1), that's the shortest path length.",
            visual: `grid = [[0,0,0],
        [1,1,0],
        [1,1,0]]

BFS levels:
Level 1: (0,0)
Level 2: (0,1), (1,0)✗blocked
Level 3: (0,2), (1,2)
Level 4: (2,2) ✓

Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)
Length = 4? No wait...

Actually: (0,0)→(1,1)✗→...
Diagonal: (0,0)→(0,1)→(1,2)→(2,2)
Length = 4`,
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
        
        // 8 directions
        vector<pair<int,int>> dirs = {
            {-1,-1}, {-1,0}, {-1,1},
            {0,-1},          {0,1},
            {1,-1},  {1,0},  {1,1}
        };
        
        queue<pair<int,int>> q;
        q.push({0, 0});
        grid[0][0] = 1;  // Mark visited
        int path = 1;
        
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                auto [r, c] = q.front();
                q.pop();
                
                if (r == n-1 && c == n-1) return path;
                
                for (auto& [dr, dc] : dirs) {
                    int nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n 
                        && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        q.push({nr, nc});
                    }
                }
            }
            path++;
        }
        
        return -1;
    }
};`
        },
        {
            title: "Word Ladder",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/word-ladder/",
            intuition: "Transform beginWord to endWord, changing one letter at a time, where each intermediate word must be in wordList. This is shortest path in an implicit graph where words are nodes and edges connect words differing by one letter.",
            approach: "BFS from beginWord. For each word, generate all possible one-letter transformations. If transformation is in wordList and unvisited, add to queue. First time we reach endWord is shortest path.",
            visual: `beginWord = "hit", endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

BFS:
Level 1: hit
Level 2: hot (h→o)
Level 3: dot, lot (h→d, h→l)
Level 4: dog, log
Level 5: cog ✓

Path: hit → hot → dot → dog → cog
Length = 5`,
            timeComplexity: "O(M² × N) M=word length, N=wordList size",
            spaceComplexity: "O(M² × N)",
            code: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, 
                     vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        
        if (wordSet.find(endWord) == wordSet.end()) return 0;
        
        queue<string> q;
        q.push(beginWord);
        int level = 1;
        
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                string word = q.front();
                q.pop();
                
                if (word == endWord) return level;
                
                // Try changing each character
                for (int i = 0; i < word.length(); i++) {
                    char original = word[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        word[i] = c;
                        
                        if (wordSet.count(word)) {
                            q.push(word);
                            wordSet.erase(word);  // Mark visited
                        }
                    }
                    word[i] = original;
                }
            }
            level++;
        }
        
        return 0;
    }
};`
        },
        {
            title: "Maze",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/the-maze/",
            intuition: "A ball rolls until hitting a wall. Find if there's a path from start to destination. Unlike regular grid, the ball keeps rolling in one direction until blocked.",
            approach: "Use BFS/DFS where each move is rolling until hitting a wall. From each position, try all 4 directions. Roll in that direction until wall, then that becomes a new node to explore.",
            visual: `maze = [[0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [1,1,0,1,1],
        [0,0,0,0,0]]
start = [0,4], dest = [4,4]

Ball at (0,4):
- Roll left: stops at (0,2) (wall at (0,2))
- Roll down: stops at (4,4) ✓

Path exists!`,
            timeComplexity: "O(m × n × max(m,n))",
            spaceComplexity: "O(m × n)",
            code: `class Solution {
public:
    bool hasPath(vector<vector<int>>& maze, vector<int>& start, 
                 vector<int>& destination) {
        int m = maze.size(), n = maze[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        
        return dfs(maze, start[0], start[1], destination, visited);
    }
    
private:
    vector<pair<int,int>> dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    
    bool dfs(vector<vector<int>>& maze, int r, int c,
             vector<int>& dest, vector<vector<bool>>& visited) {
        if (visited[r][c]) return false;
        if (r == dest[0] && c == dest[1]) return true;
        
        visited[r][c] = true;
        int m = maze.size(), n = maze[0].size();
        
        for (auto& [dr, dc] : dirs) {
            int nr = r, nc = c;
            
            // Roll until hitting wall
            while (nr + dr >= 0 && nr + dr < m && 
                   nc + dc >= 0 && nc + dc < n && 
                   maze[nr + dr][nc + dc] == 0) {
                nr += dr;
                nc += dc;
            }
            
            if (dfs(maze, nr, nc, dest, visited)) {
                return true;
            }
        }
        
        return false;
    }
};`
        }
    ]
};
