window.probabilityDpPattern = {
    id: "probability-dp",
    title: "Probability DP",
    description: "Dynamic programming for probability and expected value calculations",
    patterns: [
        {
            title: "Knight Probability in Chessboard",
            description: "Calculate probability that knight stays on board after k moves",
            intuition: `
                <h4>Core Insight</h4>
                <p>Track the <strong>probability of being at each cell</strong> after each move. 
                A knight at any cell has 8 possible moves, each with probability 1/8.</p>
                
                <div class="visualization-container">
                    <h4>Knight's 8 Possible Moves</h4>
                    <div class="dp-table">
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↗</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↖</div>
                        <div class="dp-cell">·</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">↗</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↖</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell highlight">♞</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">↘</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↙</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↘</div>
                        <div class="dp-cell">·</div>
                        <div class="dp-cell">↙</div>
                        <div class="dp-cell">·</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">P(at cell after k moves)</div>
                    <div class="arrow">=</div>
                    <div class="state-box highlight">Σ (1/8 × P(at source after k-1 moves))</div>
                </div>
            `,
            approach: `
                <h4>Forward vs Backward Probability</h4>
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Forward</h5>
                        <p>From each cell, distribute 1/8 probability to each destination</p>
                        <p>Sum what arrives at each cell</p>
                    </div>
                    <div class="approach-card current">
                        <h5>Backward ✓</h5>
                        <p>For each cell, collect 1/8 from each valid source</p>
                        <p>Easier to implement</p>
                    </div>
                </div>
                
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Initialize:</strong> dp[row][col] = 1.0 (start position)</li>
                    <li><strong>For each move:</strong> Calculate new probabilities from old</li>
                    <li><strong>Only count valid moves:</strong> Moves off board contribute to "falling off"</li>
                    <li><strong>Answer:</strong> Sum all probabilities after k moves</li>
                </ol>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(k × n²)</li>
                    <li><strong>Space:</strong> O(n²) for probability grid</li>
                </ul>
            `,
            code: `class Solution {
public:
    double knightProbability(int n, int k, int row, int column) {
        // 8 knight moves
        vector<pair<int,int>> moves = {{-2,-1},{-2,1},{-1,-2},{-1,2},
                                        {1,-2},{1,2},{2,-1},{2,1}};
        
        vector<vector<double>> dp(n, vector<double>(n, 0.0));
        dp[row][column] = 1.0;
        
        for (int move = 0; move < k; move++) {
            vector<vector<double>> newDp(n, vector<double>(n, 0.0));
            
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    if (dp[r][c] > 0) {
                        for (auto& [dr, dc] : moves) {
                            int nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                                newDp[nr][nc] += dp[r][c] / 8.0;
                            }
                            // Off-board moves are "lost"
                        }
                    }
                }
            }
            
            dp = move(newDp);
        }
        
        // Sum all remaining probabilities
        double result = 0.0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                result += dp[r][c];
            }
        }
        
        return result;
    }
    
    // Alternative: Memoization approach
    double knightProbabilityMemo(int n, int k, int row, int column) {
        vector<vector<vector<double>>> memo(k + 1, 
            vector<vector<double>>(n, vector<double>(n, -1.0)));
        return dfs(n, k, row, column, memo);
    }
    
private:
    vector<pair<int,int>> dirs = {{-2,-1},{-2,1},{-1,-2},{-1,2},
                                   {1,-2},{1,2},{2,-1},{2,1}};
    
    double dfs(int n, int k, int r, int c, 
               vector<vector<vector<double>>>& memo) {
        if (r < 0 || r >= n || c < 0 || c >= n) return 0.0;
        if (k == 0) return 1.0;
        if (memo[k][r][c] >= 0) return memo[k][r][c];
        
        double prob = 0.0;
        for (auto& [dr, dc] : dirs) {
            prob += dfs(n, k - 1, r + dr, c + dc, memo) / 8.0;
        }
        
        return memo[k][r][c] = prob;
    }
};`
        },
        {
            title: "Soup Servings",
            description: "Calculate probability that soup A empties first",
            intuition: `
                <h4>Core Insight</h4>
                <p>Four operations with equal probability (25% each). Track remaining amounts 
                of both soups. For large n, probability approaches 1.0 quickly!</p>
                
                <div class="visualization-container">
                    <h4>Four Operations (25% each)</h4>
                    <table class="complexity-table">
                        <tr><th>Operation</th><th>Serve A</th><th>Serve B</th></tr>
                        <tr><td>1</td><td>100 ml</td><td>0 ml</td></tr>
                        <tr><td>2</td><td>75 ml</td><td>25 ml</td></tr>
                        <tr><td>3</td><td>50 ml</td><td>50 ml</td></tr>
                        <tr><td>4</td><td>25 ml</td><td>75 ml</td></tr>
                    </table>
                    <p><em>Average: A loses 62.5ml, B loses 37.5ml per operation</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">A empties faster on average!</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">For large n, P(A first) → 1.0</div>
                </div>
                
                <h4>Key Optimization</h4>
                <p>When n > ~5000, probability is > 0.999999. Return 1.0 directly!</p>
            `,
            approach: `
                <h4>State Reduction</h4>
                <ol>
                    <li><strong>Scale down:</strong> Work in units of 25ml (divide by 25, round up)</li>
                    <li><strong>Large n cutoff:</strong> Return 1.0 for n > 4800</li>
                    <li><strong>DP State:</strong> dp[a][b] = P(A empty first | a,b remaining)</li>
                    <li><strong>Base cases:</strong>
                        <ul>
                            <li>A empty, B not: return 1.0</li>
                            <li>Both empty: return 0.5</li>
                            <li>B empty, A not: return 0.0</li>
                        </ul>
                    </li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Transition</h4>
                    <div class="transition-flow">
                        <div class="state-box">dp[a][b] = 0.25 × (dp[a-4][b] + dp[a-3][b-1] + dp[a-2][b-2] + dp[a-1][b-3])</div>
                    </div>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n²) but effectively O(1) for large n</li>
                    <li><strong>Space:</strong> O(n²) for memoization</li>
                </ul>
            `,
            code: `class Solution {
public:
    double soupServings(int n) {
        // For large n, probability approaches 1
        if (n > 4800) return 1.0;
        
        // Scale down by 25 (ceiling division)
        n = (n + 24) / 25;
        
        // Memoization
        vector<vector<double>> memo(n + 1, vector<double>(n + 1, -1.0));
        return dfs(n, n, memo);
    }
    
private:
    double dfs(int a, int b, vector<vector<double>>& memo) {
        // Base cases
        if (a <= 0 && b <= 0) return 0.5;  // Both empty
        if (a <= 0) return 1.0;             // A empty first
        if (b <= 0) return 0.0;             // B empty first
        
        if (memo[a][b] >= 0) return memo[a][b];
        
        // Four operations with 25% probability each
        double prob = 0.25 * (
            dfs(a - 4, b, memo) +      // Serve 100, 0
            dfs(a - 3, b - 1, memo) +  // Serve 75, 25
            dfs(a - 2, b - 2, memo) +  // Serve 50, 50
            dfs(a - 1, b - 3, memo)    // Serve 25, 75
        );
        
        return memo[a][b] = prob;
    }
};`
        },
        {
            title: "New 21 Game",
            description: "Probability of getting score ≤ n when drawing until score ≥ k",
            intuition: `
                <h4>Core Insight</h4>
                <p>Draw random cards 1 to maxPts until score ≥ k. Calculate probability 
                that final score is ≤ n. Use <strong>sliding window</strong> for efficiency!</p>
                
                <div class="visualization-container">
                    <h4>Game Rules</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Drawing</h5>
                            <p>Random card: 1 to maxPts</p>
                            <p>Each with prob 1/maxPts</p>
                        </div>
                        <div class="approach-card">
                            <h5>Stopping</h5>
                            <p>Stop when score ≥ k</p>
                            <p>Win if final score ≤ n</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[x] = P(reaching score x)</div>
                    <div class="arrow">=</div>
                    <div class="state-box highlight">Σ dp[x-i] / maxPts for i in [1, maxPts]</div>
                </div>
                
                <h4>Key Insight</h4>
                <p>Only scores < k can transition (still drawing). Scores ≥ k are terminal.</p>
            `,
            approach: `
                <h4>Sliding Window DP</h4>
                <ol>
                    <li><strong>Edge case:</strong> If k == 0 or n >= k + maxPts - 1, return 1.0</li>
                    <li><strong>dp[0] = 1:</strong> Start with score 0</li>
                    <li><strong>Window sum:</strong> Track sum of last maxPts probabilities</li>
                    <li><strong>For x in [1, n]:</strong>
                        <ul>
                            <li>dp[x] = windowSum / maxPts</li>
                            <li>Update window: add dp[x] if x < k, remove dp[x-maxPts]</li>
                        </ul>
                    </li>
                    <li><strong>Answer:</strong> Sum dp[k] to dp[n]</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: n=21, k=17, maxPts=10</h4>
                    <div class="transition-flow">
                        <div class="state-box">Can reach 17-26 (k to k+maxPts-1)</div>
                        <div class="arrow">→</div>
                        <div class="state-box highlight">Win if reach 17-21</div>
                    </div>
                    <p><em>Probability ≈ 0.73278</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(n)</li>
                </ul>
            `,
            code: `class Solution {
public:
    double new21Game(int n, int k, int maxPts) {
        // Edge cases
        if (k == 0 || n >= k + maxPts) return 1.0;
        
        vector<double> dp(n + 1, 0.0);
        dp[0] = 1.0;
        
        double windowSum = 1.0;  // Sum of dp[i] for i in [x-maxPts, x-1]
        double result = 0.0;
        
        for (int x = 1; x <= n; x++) {
            // Probability of reaching score x
            dp[x] = windowSum / maxPts;
            
            if (x < k) {
                // Can still draw, add to window
                windowSum += dp[x];
            } else {
                // Terminal state, add to result
                result += dp[x];
            }
            
            // Remove element leaving the window
            if (x >= maxPts) {
                windowSum -= dp[x - maxPts];
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "Toss Strange Coins",
            description: "Probability of getting exactly target heads from n biased coins",
            intuition: `
                <h4>Core Insight</h4>
                <p>Each coin i has probability prob[i] of heads. Classic 0/1 choice DP: 
                for each coin, either heads (with prob[i]) or tails (with 1-prob[i]).</p>
                
                <div class="visualization-container">
                    <h4>Decision Tree</h4>
                    <div class="transition-flow">
                        <div class="state-box">Coin i</div>
                        <div class="arrow">Heads (p)</div>
                        <div class="state-box highlight">dp[i][j] uses dp[i-1][j-1]</div>
                    </div>
                    <div class="transition-flow">
                        <div class="state-box">Coin i</div>
                        <div class="arrow">Tails (1-p)</div>
                        <div class="state-box highlight">dp[i][j] uses dp[i-1][j]</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = P(j heads from first i coins)</div>
                    <div class="arrow">=</div>
                    <div class="state-box highlight">prob[i] × dp[i-1][j-1] + (1-prob[i]) × dp[i-1][j]</div>
                </div>
            `,
            approach: `
                <h4>DP Approach</h4>
                <ol>
                    <li><strong>State:</strong> dp[i][j] = P(exactly j heads from coins 0 to i-1)</li>
                    <li><strong>Base:</strong> dp[0][0] = 1.0 (0 coins, 0 heads)</li>
                    <li><strong>Transition:</strong> Heads × prev(j-1) + Tails × prev(j)</li>
                    <li><strong>Space optimization:</strong> Process j from high to low</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: prob = [0.5, 0.5, 0.5], target = 2</h4>
                    <table class="complexity-table">
                        <tr><th>Coins</th><th>0 heads</th><th>1 head</th><th>2 heads</th><th>3 heads</th></tr>
                        <tr><td>0 coins</td><td>1.0</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><td>1 coin</td><td>0.5</td><td>0.5</td><td>0</td><td>0</td></tr>
                        <tr><td>2 coins</td><td>0.25</td><td>0.5</td><td>0.25</td><td>0</td></tr>
                        <tr><td>3 coins</td><td>0.125</td><td>0.375</td><td class="highlight">0.375</td><td>0.125</td></tr>
                    </table>
                    <p><em>P(2 heads) = 0.375</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n × target)</li>
                    <li><strong>Space:</strong> O(target) with optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    double probabilityOfHeads(vector<double>& prob, int target) {
        int n = prob.size();
        
        // Space-optimized: 1D array
        vector<double> dp(target + 1, 0.0);
        dp[0] = 1.0;  // 0 heads with 0 coins
        
        for (int i = 0; i < n; i++) {
            // Process from high to low to avoid overwriting
            for (int j = min(i + 1, target); j >= 0; j--) {
                double heads = (j > 0) ? prob[i] * dp[j-1] : 0.0;
                double tails = (1 - prob[i]) * dp[j];
                dp[j] = heads + tails;
            }
        }
        
        return dp[target];
    }
    
    // 2D version for clarity
    double probabilityOfHeads2D(vector<double>& prob, int target) {
        int n = prob.size();
        vector<vector<double>> dp(n + 1, vector<double>(target + 1, 0.0));
        dp[0][0] = 1.0;
        
        for (int i = 1; i <= n; i++) {
            double p = prob[i-1];
            for (int j = 0; j <= min(i, target); j++) {
                // Tails: same number of heads
                dp[i][j] = (1 - p) * dp[i-1][j];
                // Heads: one more head
                if (j > 0) {
                    dp[i][j] += p * dp[i-1][j-1];
                }
            }
        }
        
        return dp[n][target];
    }
};`
        },
        {
            title: "Dice Roll Simulation",
            description: "Count sequences of n dice rolls with consecutive number constraints",
            intuition: `
                <h4>Core Insight</h4>
                <p>Track <strong>last number rolled</strong> and <strong>consecutive count</strong>. 
                Can't roll same number more than rollMax[i] times consecutively.</p>
                
                <div class="visualization-container">
                    <h4>State Definition</h4>
                    <div class="transition-flow">
                        <div class="state-box">dp[rolls][face][consecutive]</div>
                        <div class="arrow">=</div>
                        <div class="state-box highlight">Ways to make 'rolls' rolls ending with 'face' appearing 'consecutive' times</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Roll Different</h5>
                        <p>Reset consecutive to 1</p>
                        <p>Add to dp[i+1][newFace][1]</p>
                    </div>
                    <div class="approach-card">
                        <h5>Roll Same</h5>
                        <p>If consecutive < rollMax[face]</p>
                        <p>Add to dp[i+1][face][consecutive+1]</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Optimized Approach</h4>
                <ol>
                    <li><strong>Simplify state:</strong> dp[rolls][face] = total ways ending with face</li>
                    <li><strong>Track constraint violations:</strong> Subtract invalid sequences</li>
                    <li><strong>Key insight:</strong> Invalid = sequences where face appeared rollMax[face]+1 times in a row</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: n=2, rollMax=[1,1,2,2,2,3]</h4>
                    <p>Can't roll 1 or 2 twice in a row, but can roll 3-6 multiple times</p>
                    <div class="transition-flow">
                        <div class="state-box">Roll 1</div>
                        <div class="arrow">→</div>
                        <div class="state-box">6 options each</div>
                        <div class="arrow">→</div>
                        <div class="state-box highlight">36 - 2 = 34 valid</div>
                    </div>
                    <p><em>(Subtracting 11 and 22 which violate constraints)</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n × 6 × max(rollMax))</li>
                    <li><strong>Space:</strong> O(6 × max(rollMax))</li>
                </ul>
            `,
            code: `class Solution {
public:
    int dieSimulator(int n, vector<int>& rollMax) {
        const int MOD = 1e9 + 7;
        
        // dp[face][consecutive] = ways ending with face, consecutive times
        int maxConsec = *max_element(rollMax.begin(), rollMax.end());
        vector<vector<long long>> dp(6, vector<long long>(maxConsec + 1, 0));
        
        // Initialize: first roll
        for (int face = 0; face < 6; face++) {
            dp[face][1] = 1;
        }
        
        for (int roll = 1; roll < n; roll++) {
            vector<vector<long long>> newDp(6, vector<long long>(maxConsec + 1, 0));
            
            for (int prevFace = 0; prevFace < 6; prevFace++) {
                for (int consec = 1; consec <= rollMax[prevFace]; consec++) {
                    if (dp[prevFace][consec] == 0) continue;
                    
                    // Roll a different face
                    for (int newFace = 0; newFace < 6; newFace++) {
                        if (newFace != prevFace) {
                            newDp[newFace][1] = (newDp[newFace][1] + 
                                                 dp[prevFace][consec]) % MOD;
                        }
                    }
                    
                    // Roll same face (if allowed)
                    if (consec < rollMax[prevFace]) {
                        newDp[prevFace][consec + 1] = (newDp[prevFace][consec + 1] + 
                                                       dp[prevFace][consec]) % MOD;
                    }
                }
            }
            
            dp = move(newDp);
        }
        
        // Sum all states
        long long result = 0;
        for (int face = 0; face < 6; face++) {
            for (int consec = 1; consec <= rollMax[face]; consec++) {
                result = (result + dp[face][consec]) % MOD;
            }
        }
        
        return result;
    }
};`
        },
        {
            title: "Random Point in Non-overlapping Rectangles",
            description: "Pick random point weighted by rectangle area",
            intuition: `
                <h4>Core Insight</h4>
                <p>Use <strong>weighted random selection</strong> based on area. Larger rectangles 
                should be picked proportionally more often. Use prefix sums for efficient selection!</p>
                
                <div class="visualization-container">
                    <h4>Area-based Weighting</h4>
                    <div class="dp-table">
                        <div class="dp-cell">Rect 0</div>
                        <div class="dp-cell">Rect 1</div>
                        <div class="dp-cell">Rect 2</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">Area: 4</div>
                        <div class="dp-cell">Area: 9</div>
                        <div class="dp-cell highlight">Area: 6</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">Weight: 4/19</div>
                        <div class="dp-cell">Weight: 9/19</div>
                        <div class="dp-cell">Weight: 6/19</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">Prefix sums: [4, 13, 19]</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Binary search for random in [1, 19]</div>
                </div>
            `,
            approach: `
                <h4>Two-Step Process</h4>
                <ol>
                    <li><strong>Select rectangle:</strong> Binary search on prefix sum of areas</li>
                    <li><strong>Select point:</strong> Random (x, y) within selected rectangle</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Point Count per Rectangle</h4>
                    <p>For rect [x1, y1, x2, y2]:</p>
                    <div class="transition-flow">
                        <div class="state-box">Points = (x2 - x1 + 1) × (y2 - y1 + 1)</div>
                    </div>
                    <p><em>We count integer points, not continuous area!</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Constructor:</strong> O(n)</li>
                    <li><strong>pick():</strong> O(log n) for binary search</li>
                    <li><strong>Space:</strong> O(n) for prefix sums</li>
                </ul>
            `,
            code: `class Solution {
public:
    vector<vector<int>> rects;
    vector<int> prefixSum;
    int totalPoints;
    
    Solution(vector<vector<int>>& rects) : rects(rects) {
        totalPoints = 0;
        
        for (auto& rect : rects) {
            // Count integer points (not area!)
            int points = (rect[2] - rect[0] + 1) * (rect[3] - rect[1] + 1);
            totalPoints += points;
            prefixSum.push_back(totalPoints);
        }
    }
    
    vector<int> pick() {
        // Random point index in [1, totalPoints]
        int target = rand() % totalPoints;
        
        // Binary search for rectangle
        int rectIdx = upper_bound(prefixSum.begin(), prefixSum.end(), target) 
                      - prefixSum.begin();
        
        auto& rect = rects[rectIdx];
        
        // Random point within rectangle
        int width = rect[2] - rect[0] + 1;
        int height = rect[3] - rect[1] + 1;
        
        // Point within this rectangle
        int prevPoints = (rectIdx == 0) ? 0 : prefixSum[rectIdx - 1];
        int pointIdx = target - prevPoints;
        
        int x = rect[0] + pointIdx % width;
        int y = rect[1] + pointIdx / width;
        
        return {x, y};
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(rects);
 * vector<int> param_1 = obj->pick();
 */`
        }
    ]
};
