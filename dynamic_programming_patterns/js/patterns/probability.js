// ==========================================
// PROBABILITY & EXPECTATIONS PATTERN
// Knight Probability, Dice Roll Simulation, Stone Game VII, Predict the Winner, Cherry Pickup
// ==========================================

window.patterns['probability'] = {
    title: "Probability & Expectations",
    scenario: "Problems involving probability calculations, expected values, or game theory with optimal play. These often require DP with floating-point values or minimax decision making.",
    clue: "Look for: probability of outcomes, expected values, game theory with two players, optimal play assumptions, or problems asking 'probability of X happening'.",
    problems: [
        {
            title: "688. Knight Probability in Chessboard",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/knight-probability-in-chessboard/",
            description: "On an n×n chessboard, a knight starts at (row, column). What's the probability it remains on the board after k moves?",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">♞ Knight Probability: n=3, k=2, start=(0,0)</div>
                    
                    <div class="probability-grid" style="grid-template-columns: repeat(3, 1fr);">
                        <div class="prob-cell knight">♞</div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                        <div class="prob-cell"></div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Knight's 8 Moves</div>
                        <div class="insight-content">
                            <p>• Each move has 8 possible destinations</p>
                            <p>• Each direction has probability 1/8</p>
                            <p>• From (0,0): only 2 valid moves → (2,1) and (1,2)</p>
                            <p>• Probability of staying after 1 move = 2/8 = 0.25</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">State Transition</div>
                        <div class="recurrence-formula">
                            dp[k][r][c] = Σ dp[k-1][nr][nc] / 8<br>
                            for all valid (nr, nc) that can reach (r, c)
                        </div>
                    </div>
                    
                    <div class="transition-diagram">
                        <div class="transition-row">
                            <div class="transition-node">k=0: P=1.0</div>
                            <span class="transition-arrow">→</span>
                            <div class="transition-node">k=1: P=0.25</div>
                            <span class="transition-arrow">→</span>
                            <div class="transition-node">k=2: P=0.0625</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Probability on Board after 2 Moves</div>
                        <div class="result-value">0.0625</div>
                    </div>
                </div>
            `,
            approach: "DP where dp[k][r][c] = probability of being at (r,c) after k moves. For each cell, sum probabilities from all 8 cells that could have moved here, each contributing 1/8.",
            timeComplexity: "O(k × n²)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    double knightProbability(int n, int k, int row, int column) {
        vector<pair<int,int>> moves = {{-2,-1},{-2,1},{-1,-2},{-1,2},
                                        {1,-2},{1,2},{2,-1},{2,1}};
        
        vector<vector<double>> dp(n, vector<double>(n, 0));
        dp[row][column] = 1.0;
        
        for (int step = 0; step < k; step++) {
            vector<vector<double>> newDp(n, vector<double>(n, 0));
            
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    if (dp[r][c] > 0) {
                        for (auto& [dr, dc] : moves) {
                            int nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                                newDp[nr][nc] += dp[r][c] / 8.0;
                            }
                        }
                    }
                }
            }
            dp = newDp;
        }
        
        double prob = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                prob += dp[r][c];
            }
        }
        return prob;
    }
};`
        },
        {
            title: "1223. Dice Roll Simulation",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/dice-roll-simulation/",
            description: "Roll a die n times. rollMax[i] limits consecutive occurrences of value i+1. Count valid sequences modulo 10^9+7.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎲 Dice Roll Simulation: n=2, rollMax=[1,1,2,2,2,3]</div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 State Definition</div>
                        <div class="insight-content">
                            <p>• State: (rolls remaining, last face, consecutive count of last face)</p>
                            <p>• dp[n][face][count] = ways to finish n rolls with specific state</p>
                            <p>• Transition: either roll same face (if count < max) or different face</p>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Face</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                            </tr>
                            <tr>
                                <td>rollMax</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell highlight">3</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box">Roll 1</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">Roll 2</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Can't roll same face twice if rollMax=1 for that face</p>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Transitions</div>
                        <div class="recurrence-formula">
                            Same face: dp[n][f][c+1] += dp[n-1][f][c] if c < rollMax[f]<br>
                            Different face: dp[n][f'][1] += dp[n-1][f][c] for all f' ≠ f
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Valid Sequences for n=2</div>
                        <div class="result-value">34 (some pairs like (1,1), (2,2) are invalid)</div>
                    </div>
                </div>
            `,
            approach: "3D DP: dp[rolls][lastFace][consecutiveCount]. For each state, try rolling same face (if under limit) or different face. Sum all valid final states.",
            timeComplexity: "O(n × 6 × max(rollMax))",
            spaceComplexity: "O(6 × max(rollMax))",
            code: `class Solution {
public:
    int dieSimulator(int n, vector<int>& rollMax) {
        const int MOD = 1e9 + 7;
        // dp[face][consecutive_count] = ways
        vector<vector<long>> dp(6, vector<long>(16, 0));
        
        // First roll
        for (int f = 0; f < 6; f++) dp[f][1] = 1;
        
        for (int roll = 2; roll <= n; roll++) {
            vector<vector<long>> newDp(6, vector<long>(16, 0));
            
            for (int prevFace = 0; prevFace < 6; prevFace++) {
                for (int count = 1; count <= rollMax[prevFace]; count++) {
                    if (dp[prevFace][count] == 0) continue;
                    
                    // Roll different face
                    for (int newFace = 0; newFace < 6; newFace++) {
                        if (newFace != prevFace) {
                            newDp[newFace][1] = (newDp[newFace][1] + dp[prevFace][count]) % MOD;
                        }
                    }
                    
                    // Roll same face (if under limit)
                    if (count < rollMax[prevFace]) {
                        newDp[prevFace][count + 1] = (newDp[prevFace][count + 1] + dp[prevFace][count]) % MOD;
                    }
                }
            }
            dp = newDp;
        }
        
        long result = 0;
        for (int f = 0; f < 6; f++) {
            for (int c = 1; c <= rollMax[f]; c++) {
                result = (result + dp[f][c]) % MOD;
            }
        }
        return result;
    }
};`
        },
        {
            title: "1690. Stone Game VII",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/stone-game-vii/",
            description: "Alice and Bob play with stones in a row. Each turn, remove leftmost or rightmost stone, score sum of remaining. Both play optimally. Return Alice score minus Bob score.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🪨 Stone Game VII: [5, 3, 1, 4, 2]</div>
                    
                    <div class="state-flow">
                        <div class="state-box">5</div>
                        <div class="state-box">3</div>
                        <div class="state-box">1</div>
                        <div class="state-box">4</div>
                        <div class="state-box">2</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">Total sum = 15</p>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Minimax Strategy</div>
                        <div class="insight-content">
                            <p>• Current player wants to maximize their advantage</p>
                            <p>• dp[i][j] = max score difference current player can achieve on stones[i..j]</p>
                            <p>• Remove left: gain sum(i+1, j), opponent plays on [i+1, j]</p>
                            <p>• Remove right: gain sum(i, j-1), opponent plays on [i, j-1]</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Recurrence (Minimax)</div>
                        <div class="recurrence-formula">
                            dp[i][j] = max(<br>
                            &nbsp;&nbsp;sum(i+1, j) - dp[i+1][j],<br>
                            &nbsp;&nbsp;sum(i, j-1) - dp[i][j-1]<br>
                            )
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <div class="approach-title">Remove Left (5)</div>
                            <div class="approach-detail">Score = 3+1+4+2 = 10</div>
                        </div>
                        <div class="approach-card">
                            <div class="approach-title">Remove Right (2)</div>
                            <div class="approach-detail">Score = 5+3+1+4 = 13</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Alice's Score Advantage</div>
                        <div class="result-value">6 (optimal play)</div>
                    </div>
                </div>
            `,
            approach: "Interval DP with minimax. dp[i][j] = score difference achievable by current player on range [i,j]. Use prefix sums for O(1) range sum. Player maximizes their score minus opponent's optimal play.",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    int stoneGameVII(vector<int>& stones) {
        int n = stones.size();
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + stones[i];
        }
        
        auto rangeSum = [&](int i, int j) {
            return prefix[j + 1] - prefix[i];
        };
        
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                // Remove left stone: score sum(i+1,j), opponent plays [i+1,j]
                int removeLeft = rangeSum(i + 1, j) - dp[i + 1][j];
                // Remove right stone: score sum(i,j-1), opponent plays [i,j-1]
                int removeRight = rangeSum(i, j - 1) - dp[i][j - 1];
                dp[i][j] = max(removeLeft, removeRight);
            }
        }
        return dp[0][n - 1];
    }
};`
        },
        {
            title: "486. Predict the Winner",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/predict-the-winner/",
            description: "Two players take turns picking from either end of array. Player 1 wins if they can get score ≥ Player 2. Determine if Player 1 can win.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🏆 Predict the Winner: [1, 5, 2]</div>
                    
                    <div class="state-flow">
                        <div class="state-box">1</div>
                        <div class="state-box">5</div>
                        <div class="state-box">2</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Game Tree Analysis</div>
                        <div class="insight-content">
                            <p>• P1 picks 1: P2 picks 5 (optimal), P1 picks 2 → P1=3, P2=5 ❌</p>
                            <p>• P1 picks 2: P2 picks 5 (optimal), P1 picks 1 → P1=3, P2=5 ❌</p>
                            <p>• P1 picks 1: P2 picks 2, P1 picks 5 → P1=6, P2=2 ✓</p>
                            <p>• But P2 plays optimally! So P1 loses.</p>
                        </div>
                    </div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>i\\j</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                            </tr>
                            <tr>
                                <th>0</th>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell current">-2</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">5</td>
                                <td class="dp-cell">3</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">-</td>
                                <td class="dp-cell">2</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Minimax Recurrence</div>
                        <div class="recurrence-formula">
                            dp[i][j] = max(<br>
                            &nbsp;&nbsp;nums[i] - dp[i+1][j],<br>
                            &nbsp;&nbsp;nums[j] - dp[i][j-1]<br>
                            )
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Can Player 1 Win?</div>
                        <div class="result-value">False (score diff = -2 < 0)</div>
                    </div>
                </div>
            `,
            approach: "Minimax DP. dp[i][j] = score advantage current player can achieve on range [i,j]. Pick left: gain nums[i], opponent gets dp[i+1][j]. Pick right: gain nums[j], opponent gets dp[i][j-1].",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(n²)",
            code: `class Solution {
public:
    bool predictTheWinner(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        // Base case: single element
        for (int i = 0; i < n; i++) dp[i][i] = nums[i];
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                // Current player chooses to maximize their advantage
                dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]);
            }
        }
        
        // Player 1 wins if their advantage >= 0
        return dp[0][n-1] >= 0;
    }
};`
        },
        {
            title: "741. Cherry Pickup",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/cherry-pickup/",
            description: "Pick up maximum cherries going from (0,0) to (n-1,n-1) and back. Grid has 1=cherry, 0=empty, -1=obstacle. Each cherry can only be picked once.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🍒 Cherry Pickup: Two Simultaneous Paths</div>
                    
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Grid:</div>
                            <div class="grid-visual" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell path">0</div>
                                <div class="grid-cell">0</div>
                                <div class="grid-cell">1</div>
                                <div class="grid-cell path">1</div>
                                <div class="grid-cell current">1</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight: Two Paths Simultaneously</div>
                        <div class="insight-content">
                            <p>• Instead of go + return, simulate TWO people going simultaneously</p>
                            <p>• Both start at (0,0), both end at (n-1,n-1)</p>
                            <p>• If both at same cell, cherry picked only once</p>
                            <p>• State: (r1, c1, r2, c2) → optimize to (r1, c1, r2) since c2 = r1+c1-r2</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">State Compression</div>
                        <div class="recurrence-formula">
                            Both move same number of steps: r1 + c1 = r2 + c2 = k<br>
                            So c2 = k - r2, only need dp[k][r1][r2]
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <div class="approach-title">Person 1</div>
                            <div class="approach-detail">Move Right or Down</div>
                        </div>
                        <div class="approach-card">
                            <div class="approach-title">Person 2</div>
                            <div class="approach-detail">Move Right or Down</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Cherries</div>
                        <div class="result-value">5 (collect from both paths optimally)</div>
                    </div>
                </div>
            `,
            approach: "Simulate two paths simultaneously. State: dp[r1][c1][r2] where c2 = r1+c1-r2. Both start at (0,0), move right/down. If same cell, count cherry once. Handle obstacles.",
            timeComplexity: "O(n³)",
            spaceComplexity: "O(n³)",
            code: `class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        // dp[r1][c1][r2] where c2 = r1 + c1 - r2
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(n, INT_MIN)));
        dp[0][0][0] = grid[0][0];
        
        for (int r1 = 0; r1 < n; r1++) {
            for (int c1 = 0; c1 < n; c1++) {
                for (int r2 = 0; r2 < n; r2++) {
                    int c2 = r1 + c1 - r2;
                    if (c2 < 0 || c2 >= n) continue;
                    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) continue;
                    
                    // Try all 4 combinations of previous moves
                    int best = INT_MIN;
                    for (auto& [dr1, dc1] : vector<pair<int,int>>{{0,0},{-1,0},{0,-1},{-1,-1}}) {
                        int pr1 = r1 + dr1, pc1 = c1 + dc1;
                        int pr2 = r2 + (dr1 == -1 || dc1 == -1 ? dr1 : 0);
                        int pc2 = c2 + (dr1 == -1 || dc1 == -1 ? dc1 : 0);
                        // ... complex state transitions
                    }
                }
            }
        }
        
        return max(0, dp[n-1][n-1][n-1]);
    }
};

// Cleaner implementation:
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(n, INT_MIN)));
        
        return max(0, solve(grid, dp, 0, 0, 0, n));
    }
    
    int solve(vector<vector<int>>& grid, vector<vector<vector<int>>>& dp, 
              int r1, int c1, int r2, int n) {
        int c2 = r1 + c1 - r2;
        
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n) return INT_MIN;
        if (grid[r1][c1] == -1 || grid[r2][c2] == -1) return INT_MIN;
        if (r1 == n-1 && c1 == n-1) return grid[r1][c1];
        
        if (dp[r1][c1][r2] != INT_MIN) return dp[r1][c1][r2];
        
        int cherries = grid[r1][c1];
        if (r1 != r2) cherries += grid[r2][c2];
        
        int best = max({
            solve(grid, dp, r1+1, c1, r2+1, n),  // both down
            solve(grid, dp, r1+1, c1, r2, n),    // p1 down, p2 right
            solve(grid, dp, r1, c1+1, r2+1, n),  // p1 right, p2 down
            solve(grid, dp, r1, c1+1, r2, n)     // both right
        });
        
        dp[r1][c1][r2] = (best == INT_MIN) ? INT_MIN : cherries + best;
        return dp[r1][c1][r2];
    }
};`
        }
    ]
};
