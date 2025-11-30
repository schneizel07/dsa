// Pattern 7: With Graphs
const graphProblems = {
    title: "With Graphs",
    scenario: "You need to solve graph-related problems efficiently using priority queues for operations like Dijkstra's algorithm or finding minimum spanning trees.",
    clue: "Look for problems where you process nodes or edges based on their weights or distances in graph-related scenarios.",
    problems: [
        {
            number: 743,
            title: "Network Delay Time",
            link: "https://leetcode.com/problems/network-delay-time/",
            difficulty: "Medium",
            intuition: "Classic Dijkstra's algorithm. Use a min-heap to always process the node with minimum distance. Track minimum time to reach each node. Answer is the maximum of all minimum times.",
            approach: [
                "Build adjacency list from edges",
                "Use min-heap storing {time, node}",
                "Start from source node with time 0",
                "Process nodes in order of minimum time",
                "Update distances to neighbors if shorter path found",
                "Return max distance if all reachable, else -1"
            ],
            timeComplexity: "O(E log V)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        // Build adjacency list
        vector<vector<pair<int, int>>> graph(n + 1);
        for (auto& t : times) {
            graph[t[0]].push_back({t[1], t[2]});
        }
        
        // Distance array
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        
        // Min-heap: {time, node}
        priority_queue<pair<int,int>, 
                      vector<pair<int,int>>,
                      greater<pair<int,int>>> minHeap;
        minHeap.push({0, k});
        
        while (!minHeap.empty()) {
            auto [time, node] = minHeap.top();
            minHeap.pop();
            
            // Skip if we've found a better path
            if (time > dist[node]) continue;
            
            // Process neighbors
            for (auto& [neighbor, weight] : graph[node]) {
                int newDist = time + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    minHeap.push({newDist, neighbor});
                }
            }
        }
        
        // Find max distance (time for all nodes to receive signal)
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        
        return maxTime;
    }
};`
        },
        {
            number: 787,
            title: "Cheapest Flights Within K Stops",
            link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            difficulty: "Medium",
            intuition: "Modified Dijkstra with stop constraint. Track both cost and stops. We might visit a node again with more stops if it leads to a cheaper path later.",
            approach: [
                "Build adjacency list from flights",
                "Use min-heap: {cost, stops, city}",
                "Track minimum stops to reach each city",
                "Process by minimum cost, but allow revisit with fewer stops",
                "Stop when destination reached or stops exceeded",
                "Return -1 if destination unreachable within K stops"
            ],
            timeComplexity: "O(E × K log(E × K))",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, 
                          int src, int dst, int k) {
        // Build adjacency list
        vector<vector<pair<int, int>>> graph(n);
        for (auto& f : flights) {
            graph[f[0]].push_back({f[1], f[2]});
        }
        
        // Track minimum stops to reach each node
        vector<int> minStops(n, INT_MAX);
        
        // Min-heap: {cost, stops, city}
        priority_queue<tuple<int,int,int>,
                      vector<tuple<int,int,int>>,
                      greater<tuple<int,int,int>>> minHeap;
        minHeap.push({0, 0, src});
        
        while (!minHeap.empty()) {
            auto [cost, stops, city] = minHeap.top();
            minHeap.pop();
            
            // Found destination
            if (city == dst) return cost;
            
            // Skip if too many stops or visited with fewer stops
            if (stops > k || stops >= minStops[city]) continue;
            minStops[city] = stops;
            
            // Explore neighbors
            for (auto& [next, price] : graph[city]) {
                minHeap.push({cost + price, stops + 1, next});
            }
        }
        
        return -1;
    }
};

// Alternative: Bellman-Ford (cleaner for this problem)
class SolutionBellmanFord {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights,
                          int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        
        // Relax edges k+1 times
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;
            for (auto& f : flights) {
                if (dist[f[0]] != INT_MAX) {
                    temp[f[1]] = min(temp[f[1]], dist[f[0]] + f[2]);
                }
            }
            dist = temp;
        }
        
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};`
        },
        {
            number: 1514,
            title: "Path with Maximum Probability",
            link: "https://leetcode.com/problems/path-with-maximum-probability/",
            difficulty: "Medium",
            intuition: "Modified Dijkstra for maximum probability. Use max-heap instead of min-heap. Multiply probabilities along path. Start with probability 1.0 at source.",
            approach: [
                "Build adjacency list with probabilities",
                "Use max-heap: {probability, node}",
                "Start from source with probability 1.0",
                "Process nodes by maximum probability",
                "Update neighbor probability if current path is better",
                "Return probability at destination (0 if unreachable)"
            ],
            timeComplexity: "O(E log V)",
            spaceComplexity: "O(V + E)",
            code: `class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, 
                          vector<double>& succProb, 
                          int start, int end) {
        // Build adjacency list
        vector<vector<pair<int, double>>> graph(n);
        for (int i = 0; i < edges.size(); i++) {
            int u = edges[i][0], v = edges[i][1];
            double prob = succProb[i];
            graph[u].push_back({v, prob});
            graph[v].push_back({u, prob});
        }
        
        // Probability array
        vector<double> maxProb(n, 0.0);
        maxProb[start] = 1.0;
        
        // Max-heap: {probability, node}
        priority_queue<pair<double, int>> maxHeap;
        maxHeap.push({1.0, start});
        
        while (!maxHeap.empty()) {
            auto [prob, node] = maxHeap.top();
            maxHeap.pop();
            
            // Found destination
            if (node == end) return prob;
            
            // Skip if we've found a better path
            if (prob < maxProb[node]) continue;
            
            // Process neighbors
            for (auto& [next, edgeProb] : graph[node]) {
                double newProb = prob * edgeProb;
                if (newProb > maxProb[next]) {
                    maxProb[next] = newProb;
                    maxHeap.push({newProb, next});
                }
            }
        }
        
        return 0.0;
    }
};`
        },
        {
            number: 505,
            title: "The Maze II",
            link: "https://leetcode.com/problems/the-maze-ii/",
            difficulty: "Medium",
            intuition: "Ball rolls until hitting a wall. Use Dijkstra where each state is a cell, and distance is the number of cells traveled. Ball can only stop at wall-adjacent cells.",
            approach: [
                "Use min-heap: {distance, row, col}",
                "From each position, roll in 4 directions until wall",
                "Calculate distance traveled in each roll",
                "Update if shorter path found to stopping position",
                "Return distance to destination, -1 if unreachable"
            ],
            timeComplexity: "O(m × n × max(m,n) × log(mn))",
            spaceComplexity: "O(m × n)",
            code: `class Solution {
public:
    int shortestDistance(vector<vector<int>>& maze, 
                         vector<int>& start, 
                         vector<int>& destination) {
        int m = maze.size(), n = maze[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        dist[start[0]][start[1]] = 0;
        
        // Directions: up, right, down, left
        vector<pair<int, int>> dirs = {{-1,0}, {0,1}, {1,0}, {0,-1}};
        
        // Min-heap: {distance, row, col}
        priority_queue<tuple<int,int,int>,
                      vector<tuple<int,int,int>>,
                      greater<tuple<int,int,int>>> minHeap;
        minHeap.push({0, start[0], start[1]});
        
        while (!minHeap.empty()) {
            auto [d, row, col] = minHeap.top();
            minHeap.pop();
            
            // Skip if we've found a better path
            if (d > dist[row][col]) continue;
            
            // Try all 4 directions
            for (auto& [dr, dc] : dirs) {
                int r = row, c = col, steps = 0;
                
                // Roll until hitting a wall
                while (r + dr >= 0 && r + dr < m && 
                       c + dc >= 0 && c + dc < n &&
                       maze[r + dr][c + dc] == 0) {
                    r += dr;
                    c += dc;
                    steps++;
                }
                
                // Update if shorter path
                if (d + steps < dist[r][c]) {
                    dist[r][c] = d + steps;
                    minHeap.push({d + steps, r, c});
                }
            }
        }
        
        int destDist = dist[destination[0]][destination[1]];
        return destDist == INT_MAX ? -1 : destDist;
    }
};`
        },
        {
            number: 778,
            title: "Swim in Rising Water",
            link: "https://leetcode.com/problems/swim-in-rising-water/",
            difficulty: "Hard",
            intuition: "Find path from top-left to bottom-right minimizing maximum cell value. Use modified Dijkstra where we track max value along path instead of sum.",
            approach: [
                "Use min-heap: {max_elevation_so_far, row, col}",
                "Start from (0,0) with grid[0][0] elevation",
                "Process cells by minimum max elevation",
                "For neighbors, max elevation = max(current, neighbor's height)",
                "Track visited cells to avoid revisiting",
                "Return elevation when reaching (n-1, n-1)"
            ],
            timeComplexity: "O(n² log n)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        
        // Min-heap: {max_elevation, row, col}
        priority_queue<tuple<int,int,int>,
                      vector<tuple<int,int,int>>,
                      greater<tuple<int,int,int>>> minHeap;
        
        minHeap.push({grid[0][0], 0, 0});
        
        vector<pair<int,int>> dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
        
        while (!minHeap.empty()) {
            auto [maxElev, row, col] = minHeap.top();
            minHeap.pop();
            
            // Skip if already visited
            if (visited[row][col]) continue;
            visited[row][col] = true;
            
            // Reached destination
            if (row == n - 1 && col == n - 1) {
                return maxElev;
            }
            
            // Process neighbors
            for (auto& [dr, dc] : dirs) {
                int nr = row + dr, nc = col + dc;
                
                if (nr >= 0 && nr < n && nc >= 0 && nc < n 
                    && !visited[nr][nc]) {
                    int newMaxElev = max(maxElev, grid[nr][nc]);
                    minHeap.push({newMaxElev, nr, nc});
                }
            }
        }
        
        return -1;  // Should never reach here
    }
};`
        }
    ]
};

// Store for later rendering
window.graphProblems = graphProblems;
