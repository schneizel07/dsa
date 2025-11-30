window.matrixDpPattern = {
    id: "matrix-dp",
    title: "Matrix/Grid DP",
    description: "Dynamic programming patterns on 2D grids and matrices",
    patterns: [
        {
            title: "Minimum Path Sum",
            description: "Find the path with minimum sum from top-left to bottom-right",
            intuition: `
                <h4>Core Insight</h4>
                <p>At each cell, we can only come from <strong>above</strong> or from the <strong>left</strong>. 
                The minimum path sum to reach any cell is the cell's value plus the minimum of 
                the path sums from those two directions.</p>
                
                <div class="visualization-container">
                    <h4>Grid Traversal Visualization</h4>
                    <div class="dp-table">
                        <div class="dp-cell header">1</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell header">3</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell header">1</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell"></div>
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell"></div>
                        <div class="dp-cell">↓</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell header">1</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell header">5</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell header">1</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell"></div>
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell"></div>
                        <div class="dp-cell">↓</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell header">4</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell header">2</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell highlight">1</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])</div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>In-Place Modification</h5>
                        <p>Modify grid directly</p>
                        <p><strong>Space:</strong> O(1) extra</p>
                        <p><strong>Pros:</strong> Most space efficient</p>
                    </div>
                    <div class="approach-card">
                        <h5>1D DP Array</h5>
                        <p>Use single row array</p>
                        <p><strong>Space:</strong> O(n)</p>
                        <p><strong>Pros:</strong> Preserves input</p>
                    </div>
                    <div class="approach-card">
                        <h5>2D DP Array</h5>
                        <p>Full dp table</p>
                        <p><strong>Space:</strong> O(m×n)</p>
                        <p><strong>Pros:</strong> Path reconstruction</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Algorithm Steps</h4>
                <ol>
                    <li><strong>Initialize first row:</strong> Cumulative sum (can only come from left)</li>
                    <li><strong>Initialize first column:</strong> Cumulative sum (can only come from above)</li>
                    <li><strong>Fill remaining cells:</strong> cell + min(top, left)</li>
                    <li><strong>Answer:</strong> dp[m-1][n-1]</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>DP Table Computation</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>Col 0</th><th>Col 1</th><th>Col 2</th></tr>
                        <tr><th>Row 0</th><td class="highlight">1</td><td>4</td><td>5</td></tr>
                        <tr><th>Row 1</th><td>2</td><td class="highlight">7</td><td>6</td></tr>
                        <tr><th>Row 2</th><td>6</td><td>8</td><td class="highlight">7</td></tr>
                    </table>
                    <p><em>Minimum path: 1→3→1→1→1 = 7</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(1) with in-place modification, O(n) with 1D array</li>
                </ul>
            `,
            code: `class Solution {
public:
    // Approach 1: In-place modification
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        
        // Initialize first row
        for (int j = 1; j < n; j++) {
            grid[0][j] += grid[0][j-1];
        }
        
        // Initialize first column
        for (int i = 1; i < m; i++) {
            grid[i][0] += grid[i-1][0];
        }
        
        // Fill remaining cells
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                grid[i][j] += min(grid[i-1][j], grid[i][j-1]);
            }
        }
        
        return grid[m-1][n-1];
    }
    
    // Approach 2: Space-optimized with 1D array
    int minPathSumOptimized(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n);
        
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) {
            dp[j] = dp[j-1] + grid[0][j];
        }
        
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++) {
                dp[j] = grid[i][j] + min(dp[j], dp[j-1]);
            }
        }
        
        return dp[n-1];
    }
};`
        },
        {
            title: "Triangle",
            description: "Find minimum path sum from top to bottom of triangle",
            intuition: `
                <h4>Core Insight</h4>
                <p>Process <strong>bottom-up</strong> for elegant solution! At each cell, choose 
                the minimum of two adjacent cells below and add current value.</p>
                
                <div class="visualization-container">
                    <h4>Triangle Structure</h4>
                    <div style="text-align: center;">
                        <div class="dp-table" style="justify-content: center;">
                            <div class="dp-cell highlight">2</div>
                        </div>
                        <div class="dp-table" style="justify-content: center;">
                            <div class="dp-cell">3</div>
                            <div class="dp-cell">4</div>
                        </div>
                        <div class="dp-table" style="justify-content: center;">
                            <div class="dp-cell">6</div>
                            <div class="dp-cell highlight">5</div>
                            <div class="dp-cell">7</div>
                        </div>
                        <div class="dp-table" style="justify-content: center;">
                            <div class="dp-cell">4</div>
                            <div class="dp-cell highlight">1</div>
                            <div class="dp-cell">8</div>
                            <div class="dp-cell">3</div>
                        </div>
                    </div>
                    <p style="text-align: center;"><em>Minimum path: 2→3→5→1 = 11</em></p>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Top-Down</h5>
                        <p>Start from apex, track min to each cell</p>
                        <p><strong>Issue:</strong> Need to handle boundaries</p>
                    </div>
                    <div class="approach-card current">
                        <h5>Bottom-Up ✓</h5>
                        <p>Start from base, propagate upward</p>
                        <p><strong>Benefit:</strong> No boundary checks needed</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Bottom-Up Strategy</h4>
                <ol>
                    <li><strong>Start from bottom row:</strong> Initialize dp with bottom row values</li>
                    <li><strong>Move upward:</strong> For each cell, add min of two children</li>
                    <li><strong>Final answer:</strong> dp[0] after processing all rows</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Bottom-Up Computation</h4>
                    <div class="transition-flow">
                        <div class="state-box">Row 3: [4, 1, 8, 3]</div>
                        <div class="arrow">↑ min adjacent</div>
                        <div class="state-box">Row 2: [7, 6, 10]</div>
                        <div class="arrow">↑ min adjacent</div>
                        <div class="state-box">Row 1: [9, 10]</div>
                        <div class="arrow">↑ min adjacent</div>
                        <div class="state-box highlight">Row 0: [11]</div>
                    </div>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n²) where n = number of rows</li>
                    <li><strong>Space:</strong> O(n) using 1D array</li>
                </ul>
            `,
            code: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        
        // Start with bottom row
        vector<int> dp = triangle[n-1];
        
        // Process from second-to-last row upward
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j+1]);
            }
        }
        
        return dp[0];
    }
    
    // Alternative: Top-down with memoization
    int minimumTotalTopDown(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> memo(n, vector<int>(n, INT_MAX));
        return dfs(triangle, 0, 0, memo);
    }
    
private:
    int dfs(vector<vector<int>>& tri, int row, int col, 
            vector<vector<int>>& memo) {
        if (row == tri.size()) return 0;
        if (memo[row][col] != INT_MAX) return memo[row][col];
        
        int left = dfs(tri, row + 1, col, memo);
        int right = dfs(tri, row + 1, col + 1, memo);
        
        return memo[row][col] = tri[row][col] + min(left, right);
    }
};`
        },
        {
            title: "Maximal Square",
            description: "Find the largest square containing only 1's in a binary matrix",
            intuition: `
                <h4>Core Insight</h4>
                <p>A square of side k at position (i,j) exists only if squares of side k-1 exist at 
                (i-1,j), (i,j-1), and (i-1,j-1). The side length is limited by the minimum of these three.</p>
                
                <div class="visualization-container">
                    <h4>Square Formation Rule</h4>
                    <div class="dp-table">
                        <div class="dp-cell">dp[i-1][j-1]</div>
                        <div class="dp-cell">dp[i-1][j]</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">dp[i][j-1]</div>
                        <div class="dp-cell highlight">dp[i][j]</div>
                    </div>
                    <p><em>dp[i][j] = 1 + min(top, left, diagonal)</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">If matrix[i][j] == '1'</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])</div>
                </div>
                
                <h4>Why Minimum?</h4>
                <p>The square is limited by the <strong>weakest link</strong>. If any of the three 
                neighboring squares is smaller, we can't form a larger square at current position.</p>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Base case:</strong> First row and column directly from matrix</li>
                    <li><strong>For each '1' cell:</strong> dp[i][j] = 1 + min of three neighbors</li>
                    <li><strong>Track maximum:</strong> Keep track of largest side found</li>
                    <li><strong>Answer:</strong> maxSide²</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example DP Table</h4>
                    <p>Matrix:</p>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">0</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell">1</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell">1</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                    </div>
                    <p><em>Maximal square side = 2, area = 4</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    // Space-optimized O(n) solution
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> dp(n + 1, 0);
        int maxSide = 0, prev = 0;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (matrix[i-1][j-1] == '1') {
                    dp[j] = 1 + min({dp[j-1], dp[j], prev});
                    maxSide = max(maxSide, dp[j]);
                } else {
                    dp[j] = 0;
                }
                prev = temp;
            }
        }
        
        return maxSide * maxSide;
    }
    
    // 2D DP for clarity
    int maximalSquare2D(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        int maxSide = 0;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (matrix[i-1][j-1] == '1') {
                    dp[i][j] = 1 + min({dp[i-1][j-1], 
                                        dp[i-1][j], 
                                        dp[i][j-1]});
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        }
        
        return maxSide * maxSide;
    }
};`
        },
        {
            title: "Dungeon Game",
            description: "Find minimum initial health to reach princess (bottom-right to top-left DP)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Process <strong>backward from destination</strong>! We need to know the minimum health 
                required to <em>reach the end</em>, not to <em>start the journey</em>.</p>
                
                <div class="visualization-container">
                    <h4>Why Backward?</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Forward DP ✗</h5>
                            <p>Can't determine minimum initial health</p>
                            <p>Health can increase along the way</p>
                            <p>Maximum accumulated health ≠ answer</p>
                        </div>
                        <div class="approach-card current">
                            <h5>Backward DP ✓</h5>
                            <p>Know exactly what's needed at each cell</p>
                            <p>Minimum health to survive from here</p>
                            <p>Propagate requirements backward</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = min health needed at (i,j) to reach end</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])</div>
                </div>
            `,
            approach: `
                <h4>Backward DP Strategy</h4>
                <ol>
                    <li><strong>Base case:</strong> dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1])</li>
                    <li><strong>Last row/column:</strong> Can only go right/down respectively</li>
                    <li><strong>General case:</strong> min(right, down) - current cell value</li>
                    <li><strong>Health floor:</strong> Always at least 1 (can't be dead)</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example Grid</h4>
                    <table class="complexity-table">
                        <tr><th>Dungeon</th><th>Col 0</th><th>Col 1</th><th>Col 2</th></tr>
                        <tr><th>Row 0</th><td>-2</td><td>-3</td><td>3</td></tr>
                        <tr><th>Row 1</th><td>-5</td><td>-10</td><td>1</td></tr>
                        <tr><th>Row 2</th><td>10</td><td>30</td><td>-5 (P)</td></tr>
                    </table>
                    
                    <h4>DP Table (Backward)</h4>
                    <table class="complexity-table">
                        <tr><th>Min HP</th><th>Col 0</th><th>Col 1</th><th>Col 2</th></tr>
                        <tr><th>Row 0</th><td class="highlight">7</td><td>5</td><td>2</td></tr>
                        <tr><th>Row 1</th><td>6</td><td>11</td><td>5</td></tr>
                        <tr><th>Row 2</th><td>1</td><td>1</td><td>6</td></tr>
                    </table>
                    <p><em>Answer: 7 (start with 7 health)</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size(), n = dungeon[0].size();
        vector<int> dp(n + 1, INT_MAX);
        dp[n-1] = 1;  // Need at least 1 HP at destination
        
        // Process backward from bottom-right
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                // Minimum HP needed to move to next cell
                int minNext = min(dp[j], dp[j+1]);
                
                // HP needed at current cell
                dp[j] = max(1, minNext - dungeon[i][j]);
            }
            dp[n] = INT_MAX;  // Reset boundary for next row
        }
        
        return dp[0];
    }
    
    // 2D version for clarity
    int calculateMinimumHP2D(vector<vector<int>>& dungeon) {
        int m = dungeon.size(), n = dungeon[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, INT_MAX));
        dp[m][n-1] = dp[m-1][n] = 1;
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int minHP = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j];
                dp[i][j] = max(1, minHP);
            }
        }
        
        return dp[0][0];
    }
};`
        },
        {
            title: "Maximal Rectangle",
            description: "Find the largest rectangle containing only 1's",
            intuition: `
                <h4>Core Insight</h4>
                <p>Transform 2D problem into multiple 1D <strong>Largest Rectangle in Histogram</strong> problems!
                Build height histograms row by row and apply the stack-based algorithm.</p>
                
                <div class="visualization-container">
                    <h4>Height Array Construction</h4>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell">0</div>
                    </div>
                    <div style="text-align: right; font-size: 0.8em;">heights: [1,0,1,0,0]</div>
                    
                    <div class="dp-table">
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell">0</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                    </div>
                    <div style="text-align: right; font-size: 0.8em;">heights: [2,0,2,1,1]</div>
                    
                    <div class="dp-table">
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                        <div class="dp-cell highlight">1</div>
                    </div>
                    <div style="text-align: right; font-size: 0.8em;">heights: [3,1,3,2,2]</div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">For each row</div>
                    <div class="arrow">→</div>
                    <div class="state-box">Build histogram heights</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Apply Largest Rectangle in Histogram</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Build heights:</strong> For each column, count consecutive 1's above</li>
                    <li><strong>For each row:</strong> Treat heights as histogram bars</li>
                    <li><strong>Apply stack algorithm:</strong> Find largest rectangle in histogram</li>
                    <li><strong>Track maximum:</strong> Update max area across all rows</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Largest Rectangle in Histogram</h4>
                    <p>Use monotonic stack to find left and right boundaries for each bar:</p>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Stack Approach</h5>
                            <p>Push indices when height increases</p>
                            <p>Pop and calculate area when height decreases</p>
                            <p>O(n) per row</p>
                        </div>
                        <div class="approach-card">
                            <h5>DP Approach</h5>
                            <p>Precompute left/right boundaries</p>
                            <p>Two passes per row</p>
                            <p>O(n) per row</p>
                        </div>
                    </div>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n) - each cell processed once</li>
                    <li><strong>Space:</strong> O(n) for heights and stack</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            // Update heights for current row
            for (int j = 0; j < n; j++) {
                heights[j] = matrix[i][j] == '1' ? heights[j] + 1 : 0;
            }
            // Find largest rectangle in histogram
            maxArea = max(maxArea, largestRectangleInHistogram(heights));
        }
        
        return maxArea;
    }
    
private:
    int largestRectangleInHistogram(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0;
        int n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            
            while (!st.empty() && heights[st.top()] > h) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        
        return maxArea;
    }
};

// Alternative: DP approach for heights, left, right boundaries
class SolutionDP {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        
        vector<int> height(n, 0), left(n, 0), right(n, n);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            int curLeft = 0, curRight = n;
            
            // Update heights
            for (int j = 0; j < n; j++) {
                height[j] = matrix[i][j] == '1' ? height[j] + 1 : 0;
            }
            
            // Update left boundaries
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') {
                    left[j] = max(left[j], curLeft);
                } else {
                    left[j] = 0;
                    curLeft = j + 1;
                }
            }
            
            // Update right boundaries
            for (int j = n - 1; j >= 0; j--) {
                if (matrix[i][j] == '1') {
                    right[j] = min(right[j], curRight);
                } else {
                    right[j] = n;
                    curRight = j;
                }
            }
            
            // Calculate area
            for (int j = 0; j < n; j++) {
                maxArea = max(maxArea, (right[j] - left[j]) * height[j]);
            }
        }
        
        return maxArea;
    }
};`
        },
        {
            title: "Cherry Pickup II",
            description: "Two robots collecting cherries simultaneously (3D DP)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Both robots move <strong>simultaneously</strong> row by row. Track both positions 
                together: dp[row][col1][col2] = max cherries when robot1 is at col1 and robot2 at col2.</p>
                
                <div class="visualization-container">
                    <h4>Simultaneous Movement</h4>
                    <div class="dp-table">
                        <div class="dp-cell highlight">R1</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell highlight">R2</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">↙</div>
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell">↓</div>
                        <div class="dp-cell">↘</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">?</div>
                        <div class="dp-cell">?</div>
                        <div class="dp-cell">?</div>
                        <div class="dp-cell">?</div>
                    </div>
                    <p><em>Each robot can move: down-left, down, down-right</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">State: (row, col1, col2)</div>
                    <div class="arrow">→</div>
                    <div class="state-box">3 × 3 = 9 transitions per state</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Cherries: grid[row][col1] + grid[row][col2]<br>(or just one if col1 == col2)</div>
                </div>
            `,
            approach: `
                <h4>DP State Transition</h4>
                <ol>
                    <li><strong>State:</strong> dp[r][c1][c2] = max cherries from row r to bottom</li>
                    <li><strong>Transition:</strong> Try all 9 combinations of moves for both robots</li>
                    <li><strong>Cherry count:</strong> grid[r][c1] + grid[r][c2] (avoid double count)</li>
                    <li><strong>Space optimization:</strong> Only need current and next row</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Transition Diagram</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Robot 1 Moves</h5>
                            <p>↙ col1-1</p>
                            <p>↓ col1</p>
                            <p>↘ col1+1</p>
                        </div>
                        <div class="approach-card">
                            <h5>Robot 2 Moves</h5>
                            <p>↙ col2-1</p>
                            <p>↓ col2</p>
                            <p>↘ col2+1</p>
                        </div>
                        <div class="approach-card">
                            <h5>Combined</h5>
                            <p>9 possible next states</p>
                            <p>Take maximum</p>
                        </div>
                    </div>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n² × 9) = O(m × n²)</li>
                    <li><strong>Space:</strong> O(n²) with space optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        
        // dp[c1][c2] = max cherries when robot1 at col c1, robot2 at col c2
        vector<vector<int>> dp(n, vector<int>(n, 0));
        vector<vector<int>> newDp(n, vector<int>(n, 0));
        
        // Initialize last row
        for (int c1 = 0; c1 < n; c1++) {
            for (int c2 = 0; c2 < n; c2++) {
                dp[c1][c2] = grid[m-1][c1];
                if (c1 != c2) dp[c1][c2] += grid[m-1][c2];
            }
        }
        
        // Process rows from bottom to top
        for (int r = m - 2; r >= 0; r--) {
            for (int c1 = 0; c1 < n; c1++) {
                for (int c2 = 0; c2 < n; c2++) {
                    int cherries = grid[r][c1];
                    if (c1 != c2) cherries += grid[r][c2];
                    
                    int maxNext = 0;
                    // Try all 9 combinations of moves
                    for (int nc1 = c1-1; nc1 <= c1+1; nc1++) {
                        for (int nc2 = c2-1; nc2 <= c2+1; nc2++) {
                            if (nc1 >= 0 && nc1 < n && nc2 >= 0 && nc2 < n) {
                                maxNext = max(maxNext, dp[nc1][nc2]);
                            }
                        }
                    }
                    
                    newDp[c1][c2] = cherries + maxNext;
                }
            }
            swap(dp, newDp);
        }
        
        return dp[0][n-1];  // Start positions
    }
};`
        }
    ]
};
