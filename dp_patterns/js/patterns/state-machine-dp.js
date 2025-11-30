window.stateMachineDpPattern = {
    id: "state-machine-dp",
    title: "State Machine DP",
    description: "Dynamic programming where states represent different situations with defined transitions",
    patterns: [
        {
            title: "Best Time to Buy and Sell Stock with Cooldown",
            description: "Maximize profit with cooldown after selling",
            intuition: `
                <h4>Core Insight</h4>
                <p>Model as a <strong>state machine</strong> with three states: holding stock, 
                just sold (cooldown), and ready to buy. Define transitions between states.</p>
                
                <div class="visualization-container">
                    <h4>State Machine Diagram</h4>
                    <div class="dp-table" style="justify-content: space-around;">
                        <div class="dp-cell highlight" style="border-radius: 50%; padding: 20px;">HOLD</div>
                        <div class="dp-cell" style="border-radius: 50%; padding: 20px;">SOLD</div>
                        <div class="dp-cell" style="border-radius: 50%; padding: 20px;">REST</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>HOLD (holding stock)</h5>
                        <p>From: HOLD (wait) or REST (buy)</p>
                        <p>To: HOLD or SOLD</p>
                    </div>
                    <div class="approach-card">
                        <h5>SOLD (just sold)</h5>
                        <p>From: HOLD (sell)</p>
                        <p>To: REST (mandatory)</p>
                    </div>
                    <div class="approach-card">
                        <h5>REST (can buy)</h5>
                        <p>From: REST (wait) or SOLD (cooldown)</p>
                        <p>To: REST or HOLD</p>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">hold[i] = max(hold[i-1], rest[i-1] - price)</div>
                    <div class="state-box">sold[i] = hold[i-1] + price</div>
                    <div class="state-box">rest[i] = max(rest[i-1], sold[i-1])</div>
                </div>
            `,
            approach: `
                <h4>State Transitions</h4>
                <ol>
                    <li><strong>hold:</strong> Either keep holding or buy (from rest state)</li>
                    <li><strong>sold:</strong> Must come from hold state (sell)</li>
                    <li><strong>rest:</strong> Either keep resting or cooldown after sold</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: prices = [1, 2, 3, 0, 2]</h4>
                    <table class="complexity-table">
                        <tr><th>Day</th><th>Price</th><th>hold</th><th>sold</th><th>rest</th></tr>
                        <tr><td>0</td><td>1</td><td>-1</td><td>-∞</td><td>0</td></tr>
                        <tr><td>1</td><td>2</td><td>-1</td><td>1</td><td>0</td></tr>
                        <tr><td>2</td><td>3</td><td>-1</td><td>2</td><td>1</td></tr>
                        <tr><td>3</td><td>0</td><td>1</td><td>-1</td><td>2</td></tr>
                        <tr><td>4</td><td>2</td><td>1</td><td class="highlight">3</td><td>2</td></tr>
                    </table>
                    <p><em>Max profit = 3 (buy@1, sell@2, cooldown, buy@0, sell@2)</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        
        // Three states
        int hold = INT_MIN;  // Holding stock
        int sold = 0;        // Just sold (cooldown next)
        int rest = 0;        // Can buy
        
        for (int price : prices) {
            int prevHold = hold;
            int prevSold = sold;
            
            // Transitions
            hold = max(hold, rest - price);   // Keep or buy
            sold = prevHold + price;          // Sell
            rest = max(rest, prevSold);       // Rest or end cooldown
        }
        
        // Max of not holding (sold or rest)
        return max(sold, rest);
    }
};`
        },
        {
            title: "Best Time to Buy and Sell Stock with Transaction Fee",
            description: "Maximize profit with transaction fee per trade",
            intuition: `
                <h4>Core Insight</h4>
                <p>Simpler state machine with two states: <strong>holding</strong> and <strong>not holding</strong>. 
                Pay fee when selling (or buying, doesn't matter which).</p>
                
                <div class="visualization-container">
                    <h4>Two-State Machine</h4>
                    <div class="dp-table" style="justify-content: center; gap: 50px;">
                        <div class="dp-cell highlight" style="border-radius: 50%; padding: 25px;">HOLD</div>
                        <div class="dp-cell" style="border-radius: 50%; padding: 25px;">CASH</div>
                    </div>
                    <div class="transition-flow">
                        <div class="state-box">HOLD ←(buy)← CASH</div>
                        <div class="state-box">HOLD →(sell-fee)→ CASH</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">hold[i] = max(hold[i-1], cash[i-1] - price)</div>
                    <div class="state-box">cash[i] = max(cash[i-1], hold[i-1] + price - fee)</div>
                </div>
            `,
            approach: `
                <h4>Simple Transitions</h4>
                <ol>
                    <li><strong>hold:</strong> Keep holding or buy from cash</li>
                    <li><strong>cash:</strong> Keep cash or sell (pay fee)</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: prices = [1, 3, 2, 8, 4, 9], fee = 2</h4>
                    <table class="complexity-table">
                        <tr><th>Day</th><th>Price</th><th>hold</th><th>cash</th></tr>
                        <tr><td>0</td><td>1</td><td>-1</td><td>0</td></tr>
                        <tr><td>1</td><td>3</td><td>-1</td><td>0</td></tr>
                        <tr><td>2</td><td>2</td><td>-1</td><td>0</td></tr>
                        <tr><td>3</td><td>8</td><td>-1</td><td>5</td></tr>
                        <tr><td>4</td><td>4</td><td>1</td><td>5</td></tr>
                        <tr><td>5</td><td>9</td><td>1</td><td class="highlight">8</td></tr>
                    </table>
                    <p><em>Max profit = 8 (buy@1, sell@8-2=5, buy@4, sell@9-2=3 more)</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int hold = INT_MIN;  // Max profit while holding
        int cash = 0;        // Max profit while not holding
        
        for (int price : prices) {
            int prevHold = hold;
            
            // Either keep holding or buy today
            hold = max(hold, cash - price);
            
            // Either keep cash or sell today (pay fee)
            cash = max(cash, prevHold + price - fee);
        }
        
        return cash;
    }
    
    // Alternative: Pay fee on buy
    int maxProfitBuyFee(vector<int>& prices, int fee) {
        int hold = INT_MIN;
        int cash = 0;
        
        for (int price : prices) {
            int prevHold = hold;
            hold = max(hold, cash - price - fee);  // Fee on buy
            cash = max(cash, prevHold + price);
        }
        
        return cash;
    }
};`
        },
        {
            title: "Best Time to Buy and Sell Stock III",
            description: "Maximize profit with at most 2 transactions",
            intuition: `
                <h4>Core Insight</h4>
                <p>Track state for <strong>each transaction</strong>. States: before 1st buy, 
                after 1st buy, after 1st sell, after 2nd buy, after 2nd sell.</p>
                
                <div class="visualization-container">
                    <h4>Five States</h4>
                    <div class="dp-table">
                        <div class="dp-cell">start</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell highlight">buy1</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell">sell1</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell highlight">buy2</div>
                        <div class="dp-cell">→</div>
                        <div class="dp-cell">sell2</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>buy1</h5>
                        <p>First purchase</p>
                        <p>buy1 = max(buy1, -price)</p>
                    </div>
                    <div class="approach-card">
                        <h5>sell1</h5>
                        <p>First sale</p>
                        <p>sell1 = max(sell1, buy1+price)</p>
                    </div>
                    <div class="approach-card">
                        <h5>buy2</h5>
                        <p>Second purchase</p>
                        <p>buy2 = max(buy2, sell1-price)</p>
                    </div>
                    <div class="approach-card">
                        <h5>sell2</h5>
                        <p>Second sale</p>
                        <p>sell2 = max(sell2, buy2+price)</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Sequential State Updates</h4>
                <ol>
                    <li><strong>Order matters:</strong> Update sell2, buy2, sell1, buy1 in sequence</li>
                    <li><strong>Or update in reverse:</strong> buy1, sell1, buy2, sell2 works too</li>
                    <li><strong>Initial values:</strong> buy states start at -∞ (or -price[0])</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: prices = [3,3,5,0,0,3,1,4]</h4>
                    <p>Optimal: Buy@0, Sell@3 (profit 3), Buy@1, Sell@4 (profit 3) = 6</p>
                    <div class="transition-flow">
                        <div class="state-box">Transaction 1: 0→3 = +3</div>
                        <div class="arrow">+</div>
                        <div class="state-box">Transaction 2: 1→4 = +3</div>
                        <div class="arrow">=</div>
                        <div class="state-box highlight">Total: 6</div>
                    </div>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // State variables
        int buy1 = INT_MIN, sell1 = 0;
        int buy2 = INT_MIN, sell2 = 0;
        
        for (int price : prices) {
            // First transaction
            buy1 = max(buy1, -price);           // Buy first stock
            sell1 = max(sell1, buy1 + price);   // Sell first stock
            
            // Second transaction
            buy2 = max(buy2, sell1 - price);    // Buy second stock
            sell2 = max(sell2, buy2 + price);   // Sell second stock
        }
        
        return sell2;  // Max profit (includes 0, 1, or 2 transactions)
    }
};`
        },
        {
            title: "Best Time to Buy and Sell Stock IV",
            description: "Maximize profit with at most k transactions",
            intuition: `
                <h4>Core Insight</h4>
                <p>Generalize the 2-transaction solution to k transactions. Track buy and sell 
                states for each transaction level.</p>
                
                <div class="visualization-container">
                    <h4>State Arrays</h4>
                    <div class="dp-table">
                        <div class="dp-cell">buy[0]</div>
                        <div class="dp-cell">sell[0]</div>
                        <div class="dp-cell">buy[1]</div>
                        <div class="dp-cell">sell[1]</div>
                        <div class="dp-cell">...</div>
                        <div class="dp-cell">buy[k-1]</div>
                        <div class="dp-cell highlight">sell[k-1]</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">buy[j] = max(buy[j], sell[j-1] - price)</div>
                    <div class="state-box">sell[j] = max(sell[j], buy[j] + price)</div>
                </div>
                
                <h4>Optimization</h4>
                <p>If k ≥ n/2, we can make unlimited transactions → use simple greedy!</p>
            `,
            approach: `
                <h4>DP with k States</h4>
                <ol>
                    <li><strong>Edge case:</strong> k >= n/2 → unlimited transactions</li>
                    <li><strong>State arrays:</strong> buy[k] and sell[k]</li>
                    <li><strong>Transitions:</strong> Each level depends on previous level</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Transitions for k=2</h4>
                    <table class="complexity-table">
                        <tr><th>State</th><th>Transition</th></tr>
                        <tr><td>buy[0]</td><td>max(buy[0], -price)</td></tr>
                        <tr><td>sell[0]</td><td>max(sell[0], buy[0]+price)</td></tr>
                        <tr><td>buy[1]</td><td>max(buy[1], sell[0]-price)</td></tr>
                        <tr><td class="highlight">sell[1]</td><td>max(sell[1], buy[1]+price)</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n × k)</li>
                    <li><strong>Space:</strong> O(k)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;
        
        // Optimization: if k >= n/2, unlimited transactions
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i-1]) {
                    profit += prices[i] - prices[i-1];
                }
            }
            return profit;
        }
        
        // DP with k transactions
        vector<int> buy(k, INT_MIN);
        vector<int> sell(k, 0);
        
        for (int price : prices) {
            for (int j = 0; j < k; j++) {
                // Buy: use profit from previous transaction (or 0 if j=0)
                int prevProfit = (j == 0) ? 0 : sell[j-1];
                buy[j] = max(buy[j], prevProfit - price);
                
                // Sell: use current buy state
                sell[j] = max(sell[j], buy[j] + price);
            }
        }
        
        return sell[k-1];
    }
};`
        },
        {
            title: "Paint House",
            description: "Minimum cost to paint houses where adjacent houses can't have same color",
            intuition: `
                <h4>Core Insight</h4>
                <p>Each house can be red, blue, or green. The color of house i depends on house i-1 
                NOT being the same color. Classic state machine!</p>
                
                <div class="visualization-container">
                    <h4>Color State Machine</h4>
                    <div class="dp-table" style="justify-content: space-around;">
                        <div class="dp-cell" style="background: #ffcccc; border-radius: 50%; padding: 20px;">RED</div>
                        <div class="dp-cell" style="background: #ccccff; border-radius: 50%; padding: 20px;">BLUE</div>
                        <div class="dp-cell" style="background: #ccffcc; border-radius: 50%; padding: 20px;">GREEN</div>
                    </div>
                    <p style="text-align: center;"><em>Can transition to any color EXCEPT same color</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">cost[i][red]</div>
                    <div class="arrow">=</div>
                    <div class="state-box highlight">costs[i][0] + min(cost[i-1][blue], cost[i-1][green])</div>
                </div>
            `,
            approach: `
                <h4>DP Transitions</h4>
                <ol>
                    <li><strong>State:</strong> dp[i][c] = min cost to paint houses 0..i with house i being color c</li>
                    <li><strong>Transition:</strong> Current color cost + min of other two colors from previous</li>
                    <li><strong>Space optimization:</strong> Only need previous row</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example</h4>
                    <table class="complexity-table">
                        <tr><th>House</th><th>Red</th><th>Blue</th><th>Green</th></tr>
                        <tr><td>Costs[0]</td><td>17</td><td>2</td><td>17</td></tr>
                        <tr><td>Costs[1]</td><td>16</td><td>16</td><td>5</td></tr>
                        <tr><td>Costs[2]</td><td>14</td><td>3</td><td>19</td></tr>
                    </table>
                    <p><em>Optimal: Blue(2) → Green(5) → Blue(3) = 10</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        
        int n = costs.size();
        int red = costs[0][0];
        int blue = costs[0][1];
        int green = costs[0][2];
        
        for (int i = 1; i < n; i++) {
            int newRed = costs[i][0] + min(blue, green);
            int newBlue = costs[i][1] + min(red, green);
            int newGreen = costs[i][2] + min(red, blue);
            
            red = newRed;
            blue = newBlue;
            green = newGreen;
        }
        
        return min({red, blue, green});
    }
};`
        },
        {
            title: "Paint House II",
            description: "Minimum cost with k colors (generalization)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Same as Paint House but with k colors. Naive O(n×k²) is too slow. 
                Use the <strong>two minimum</strong> trick to achieve O(n×k)!</p>
                
                <div class="visualization-container">
                    <h4>Key Optimization</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Naive O(n×k²)</h5>
                            <p>For each color, find min of other k-1 colors</p>
                            <p>Too slow for large k</p>
                        </div>
                        <div class="approach-card current">
                            <h5>Optimized O(n×k)</h5>
                            <p>Track min1 and min2 values</p>
                            <p>If prev color = min1, use min2</p>
                            <p>Otherwise, use min1</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][c] = costs[i][c] + (c == min1Idx ? min2 : min1)</div>
                </div>
            `,
            approach: `
                <h4>Two Minimum Technique</h4>
                <ol>
                    <li><strong>Track:</strong> min1 (smallest), min2 (second smallest), min1Idx</li>
                    <li><strong>For each color c:</strong>
                        <ul>
                            <li>If c ≠ min1Idx: add min1</li>
                            <li>If c = min1Idx: add min2 (can't use same color)</li>
                        </ul>
                    </li>
                    <li><strong>Update:</strong> Recalculate min1, min2 after each house</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example Flow</h4>
                    <table class="complexity-table">
                        <tr><th>Step</th><th>Action</th></tr>
                        <tr><td>1</td><td>Process house, track min1, min2, min1Idx</td></tr>
                        <tr><td>2</td><td>For color c: prev = (c == min1Idx) ? min2 : min1</td></tr>
                        <tr><td>3</td><td>Update dp[c] = costs[i][c] + prev</td></tr>
                        <tr><td>4</td><td>Recalculate min1, min2 for new dp values</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n × k)</li>
                    <li><strong>Space:</strong> O(k) or O(1) with in-place</li>
                </ul>
            `,
            code: `class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        
        int n = costs.size();
        int k = costs[0].size();
        
        // Track minimum and second minimum
        int min1 = 0, min2 = 0, min1Idx = -1;
        
        for (int i = 0; i < n; i++) {
            int newMin1 = INT_MAX, newMin2 = INT_MAX, newMin1Idx = -1;
            
            for (int j = 0; j < k; j++) {
                // Previous cost: use min2 if same color as min1
                int prevCost = (j == min1Idx) ? min2 : min1;
                int currCost = costs[i][j] + prevCost;
                
                // Update minimums
                if (currCost < newMin1) {
                    newMin2 = newMin1;
                    newMin1 = currCost;
                    newMin1Idx = j;
                } else if (currCost < newMin2) {
                    newMin2 = currCost;
                }
            }
            
            min1 = newMin1;
            min2 = newMin2;
            min1Idx = newMin1Idx;
        }
        
        return min1;
    }
};`
        }
    ]
};
