window.counting = {
    id: "counting",
    title: "Counting DP Patterns",
    description: "DP problems focused on counting number of ways, combinations, and arrangements",
    patterns: [
        {
            title: "1. Climbing Stairs",
            description: "You can climb 1 or 2 steps at a time. In how many distinct ways can you climb to the top of n stairs?",
            visualization: `
<div class="visual-container">
    <h4>Counting Paths to Each Step</h4>
    <div class="dp-table">
        <div class="dp-cell">step</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">5</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">ways</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">3</div>
        <div class="dp-cell highlight">5</div>
        <div class="dp-cell highlight">8</div>
    </div>
</div>

<div class="visual-container">
    <h4>Recurrence: Fibonacci Pattern</h4>
    <div class="transition-flow">
        <div class="state-box">dp[i-1]</div>
        <div class="arrow">+</div>
        <div class="state-box">dp[i-2]</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">dp[i]</div>
    </div>
    <p style="margin-top: 10px;">Ways to reach step i = ways from (i-1) + ways from (i-2)</p>
</div>

<div class="visual-container">
    <h4>Decision Tree for n=4</h4>
    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node highlight">0</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">1 (+1)</div>
            <div class="tree-node">2 (+2)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">2</div>
            <div class="tree-node">3</div>
            <div class="tree-node">3</div>
            <div class="tree-node highlight">4 ✓</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">3</div>
            <div class="tree-node highlight">4 ✓</div>
            <div class="tree-node highlight">4 ✓</div>
            <div class="tree-node">5 ✗</div>
            <div class="tree-node highlight">4 ✓</div>
            <div class="tree-node">5 ✗</div>
        </div>
    </div>
    <p>5 ways: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2</p>
</div>

<div class="approach-comparison">
    <h4>Approach Comparison</h4>
    <div class="approach-card">
        <h5>Recursion</h5>
        <p><strong>Time:</strong> O(2ⁿ)</p>
        <p><strong>Space:</strong> O(n) stack</p>
    </div>
    <div class="approach-card">
        <h5>Memoization</h5>
        <p><strong>Time:</strong> O(n)</p>
        <p><strong>Space:</strong> O(n)</p>
    </div>
    <div class="approach-card">
        <h5>Space Optimized</h5>
        <p><strong>Time:</strong> O(n)</p>
        <p><strong>Space:</strong> O(1)</p>
    </div>
</div>`,
            code: `// Solution 1: Memoization (Top-Down)
class Solution {
public:
    unordered_map<int, int> memo;
    
    int climbStairs(int n) {
        if (n <= 1) return 1;
        if (memo.count(n)) return memo[n];
        
        memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
        return memo[n];
    }
};

// Solution 2: Tabulation (Bottom-Up)
int climbStairs(int n) {
    if (n <= 1) return 1;
    vector<int> dp(n + 1);
    dp[0] = dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// Solution 3: Space Optimized
int climbStairs(int n) {
    if (n <= 1) return 1;
    int prev2 = 1, prev1 = 1;
    
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Time: O(n), Space: O(1) for optimized version`
        },
        {
            title: "2. Unique Paths",
            description: "Count the number of unique paths from top-left to bottom-right of an m×n grid, moving only right or down.",
            visualization: `
<div class="visual-container">
    <h4>Grid Path Counting (3×4 grid)</h4>
    <div style="display: grid; grid-template-columns: repeat(4, 60px); gap: 2px; margin: 15px auto; width: fit-content;">
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">6</div>
        <div class="dp-cell highlight" style="color: var(--accent);">10</div>
    </div>
    <p>dp[i][j] = number of unique paths to reach cell (i, j)</p>
</div>

<div class="visual-container">
    <h4>Recurrence Relation</h4>
    <div class="transition-flow">
        <div class="state-box">dp[i-1][j]<br>(from top)</div>
        <div class="arrow">+</div>
        <div class="state-box">dp[i][j-1]<br>(from left)</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">dp[i][j]</div>
    </div>
</div>

<div class="visual-container">
    <h4>Mathematical Insight</h4>
    <p style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px;">
        Total moves: (m-1) down + (n-1) right = (m+n-2) moves<br><br>
        Choose positions for down moves: <strong>C(m+n-2, m-1)</strong><br><br>
        For 3×4 grid: C(5, 2) = 10 paths
    </p>
</div>

<div class="approach-comparison">
    <h4>Three Approaches</h4>
    <div class="approach-card">
        <h5>2D DP Array</h5>
        <p><strong>Time:</strong> O(m×n)</p>
        <p><strong>Space:</strong> O(m×n)</p>
    </div>
    <div class="approach-card">
        <h5>1D DP (Row by Row)</h5>
        <p><strong>Time:</strong> O(m×n)</p>
        <p><strong>Space:</strong> O(n)</p>
    </div>
    <div class="approach-card">
        <h5>Combinatorics</h5>
        <p><strong>Time:</strong> O(min(m,n))</p>
        <p><strong>Space:</strong> O(1)</p>
    </div>
</div>`,
            code: `// Solution 1: 2D DP
int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}

// Solution 2: Space Optimized 1D DP
int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}

// Solution 3: Combinatorics - C(m+n-2, m-1)
int uniquePaths(int m, int n) {
    // Calculate C(m+n-2, min(m-1, n-1))
    int N = m + n - 2;
    int k = min(m - 1, n - 1);
    
    long long result = 1;
    for (int i = 0; i < k; i++) {
        result = result * (N - i) / (i + 1);
    }
    return result;
}

// Time: O(min(m,n)) for combinatorics
// Space: O(1)`
        },
        {
            title: "3. Decode Ways",
            description: "Given a string of digits, count how many ways it can be decoded (A=1, B=2, ..., Z=26).",
            visualization: `
<div class="visual-container">
    <h4>Decoding "226"</h4>
    <div class="recursion-tree">
        <div class="tree-level">
            <div class="tree-node highlight">"226"</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">"26" (2→B)</div>
            <div class="tree-node">"6" (22→V)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node">"6" (2→B)</div>
            <div class="tree-node">"" (26→Z)</div>
            <div class="tree-node">"" (6→F)</div>
        </div>
        <div class="tree-level">
            <div class="tree-node highlight">"" (6→F) ✓</div>
            <div class="tree-node highlight">✓</div>
            <div class="tree-node highlight">✓</div>
        </div>
    </div>
    <p>3 decodings: "BZ", "VF", "BBF"</p>
</div>

<div class="visual-container">
    <h4>DP State Transition</h4>
    <div class="dp-table">
        <div class="dp-cell">idx</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">char</div>
        <div class="dp-cell">-</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">6</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">dp</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">3</div>
    </div>
</div>

<div class="visual-container">
    <h4>Decision at Each Position</h4>
    <div class="transition-flow">
        <div class="state-box">Single digit<br>(1-9)</div>
        <div class="arrow">dp[i-1]</div>
        <div class="state-box highlight">dp[i]</div>
    </div>
    <div class="transition-flow" style="margin-top: 10px;">
        <div class="state-box">Two digits<br>(10-26)</div>
        <div class="arrow">+ dp[i-2]</div>
        <div class="state-box highlight">dp[i]</div>
    </div>
</div>`,
            code: `int numDecodings(string s) {
    if (s.empty() || s[0] == '0') return 0;
    
    int n = s.size();
    vector<int> dp(n + 1);
    dp[0] = 1; // Empty string
    dp[1] = 1; // First char is valid (not '0')
    
    for (int i = 2; i <= n; i++) {
        // Single digit decode (1-9)
        if (s[i - 1] != '0') {
            dp[i] += dp[i - 1];
        }
        
        // Two digit decode (10-26)
        int twoDigit = stoi(s.substr(i - 2, 2));
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }
    
    return dp[n];
}

// Space Optimized
int numDecodings(string s) {
    if (s.empty() || s[0] == '0') return 0;
    
    int prev2 = 1, prev1 = 1;
    
    for (int i = 1; i < s.size(); i++) {
        int curr = 0;
        
        if (s[i] != '0') {
            curr += prev1;
        }
        
        int twoDigit = (s[i - 1] - '0') * 10 + (s[i] - '0');
        if (twoDigit >= 10 && twoDigit <= 26) {
            curr += prev2;
        }
        
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)`
        },
        {
            title: "4. Coin Change 2 (Number of Combinations)",
            description: "Given coins of different denominations and a total amount, find the number of combinations to make up that amount.",
            visualization: `
<div class="visual-container">
    <h4>Counting Combinations: coins = [1, 2, 5], amount = 5</h4>
    <div class="dp-table">
        <div class="dp-cell">coin\\amt</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">5</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">init</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">0</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">coin=1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">coin=2</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell highlight">3</div>
        <div class="dp-cell highlight">3</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">coin=5</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell" style="color: var(--accent);">4</div>
    </div>
</div>

<div class="visual-container">
    <h4>The 4 Combinations for Amount 5</h4>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
        <div class="state-box">5×1</div>
        <div class="state-box">3×1 + 1×2</div>
        <div class="state-box">1×1 + 2×2</div>
        <div class="state-box">1×5</div>
    </div>
</div>

<div class="visual-container">
    <h4>Key Insight: Combinations vs Permutations</h4>
    <div class="approach-comparison">
        <div class="approach-card">
            <h5>Combinations (This Problem)</h5>
            <p>Outer loop: coins</p>
            <p>Inner loop: amounts</p>
            <p>{1,2} and {2,1} counted once</p>
        </div>
        <div class="approach-card">
            <h5>Permutations</h5>
            <p>Outer loop: amounts</p>
            <p>Inner loop: coins</p>
            <p>{1,2} and {2,1} counted separately</p>
        </div>
    </div>
</div>`,
            code: `// Counting COMBINATIONS (order doesn't matter)
int change(int amount, vector<int>& coins) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1; // One way to make amount 0
    
    // Process each coin - ensures combinations (not permutations)
    for (int coin : coins) {
        for (int j = coin; j <= amount; j++) {
            dp[j] += dp[j - coin];
        }
    }
    
    return dp[amount];
}

// Counting PERMUTATIONS (order matters)
int combinationSum4(vector<int>& nums, int target) {
    vector<unsigned int> dp(target + 1, 0);
    dp[0] = 1;
    
    // Process each amount first - counts all orderings
    for (int i = 1; i <= target; i++) {
        for (int num : nums) {
            if (i >= num) {
                dp[i] += dp[i - num];
            }
        }
    }
    
    return dp[target];
}

// Time: O(n × amount)
// Space: O(amount)`
        },
        {
            title: "5. Count Sorted Vowel Strings",
            description: "Given an integer n, return the number of strings of length n that consist only of vowels (a, e, i, o, u) and are lexicographically sorted.",
            visualization: `
<div class="visual-container">
    <h4>State: dp[length][last_vowel]</h4>
    <p>dp[i][j] = count of sorted strings of length i ending with vowel j</p>
    
    <div class="dp-table">
        <div class="dp-cell">len\\vowel</div>
        <div class="dp-cell">a(0)</div>
        <div class="dp-cell">e(1)</div>
        <div class="dp-cell">i(2)</div>
        <div class="dp-cell">o(3)</div>
        <div class="dp-cell">u(4)</div>
        <div class="dp-cell">Total</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">n=1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">5</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">n=2</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell highlight">15</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">n=3</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">6</div>
        <div class="dp-cell">10</div>
        <div class="dp-cell">15</div>
        <div class="dp-cell highlight">35</div>
    </div>
</div>

<div class="visual-container">
    <h4>Transition: Can Only Use Same or Later Vowel</h4>
    <div class="transition-flow">
        <div class="state-box">End with 'a'</div>
        <div class="arrow">→</div>
        <div class="state-box">Add a,e,i,o,u</div>
    </div>
    <div class="transition-flow">
        <div class="state-box">End with 'e'</div>
        <div class="arrow">→</div>
        <div class="state-box">Add e,i,o,u</div>
    </div>
    <div class="transition-flow">
        <div class="state-box">End with 'u'</div>
        <div class="arrow">→</div>
        <div class="state-box">Add u only</div>
    </div>
</div>

<div class="visual-container">
    <h4>Mathematical Solution: Stars and Bars</h4>
    <p style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px;">
        Equivalent to choosing n items from 5 types with repetition<br><br>
        Formula: <strong>C(n + 4, 4)</strong> = (n+4)(n+3)(n+2)(n+1) / 24
    </p>
</div>`,
            code: `// Solution 1: DP with State
int countVowelStrings(int n) {
    // dp[j] = count of strings ending with vowel j
    vector<int> dp(5, 1);
    
    for (int i = 2; i <= n; i++) {
        // Accumulate from right to left
        for (int j = 3; j >= 0; j--) {
            dp[j] += dp[j + 1];
        }
    }
    
    int total = 0;
    for (int x : dp) total += x;
    return total;
}

// Solution 2: Mathematical (Stars and Bars)
int countVowelStrings(int n) {
    // C(n+4, 4) = (n+4)! / (4! * n!)
    // = (n+4)(n+3)(n+2)(n+1) / 24
    return (n + 4) * (n + 3) * (n + 2) * (n + 1) / 24;
}

// Time: O(1) for mathematical solution
// Space: O(1)`
        },
        {
            title: "6. Knight Dialer",
            description: "A chess knight can move in an 'L' shape on a phone dialer. Starting from any digit, count the number of distinct phone numbers of length n the knight can dial.",
            visualization: `
<div class="visual-container">
    <h4>Phone Dialer Layout</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; margin: 15px auto; width: fit-content;">
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
        <div class="dp-cell">4</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell">6</div>
        <div class="dp-cell">7</div>
        <div class="dp-cell">8</div>
        <div class="dp-cell">9</div>
        <div class="dp-cell" style="background: var(--bg-tertiary);">*</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell" style="background: var(--bg-tertiary);">#</div>
    </div>
</div>

<div class="visual-container">
    <h4>Knight Move Graph</h4>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <div class="state-box">1 → 6, 8</div>
        <div class="state-box">2 → 7, 9</div>
        <div class="state-box">3 → 4, 8</div>
        <div class="state-box">4 → 3, 9, 0</div>
        <div class="state-box">5 → (none)</div>
        <div class="state-box">6 → 1, 7, 0</div>
        <div class="state-box">7 → 2, 6</div>
        <div class="state-box">8 → 1, 3</div>
        <div class="state-box">9 → 2, 4</div>
        <div class="state-box">0 → 4, 6</div>
    </div>
</div>

<div class="visual-container">
    <h4>DP State Transition</h4>
    <div class="transition-flow">
        <div class="state-box">dp[n][digit]</div>
        <div class="arrow">=</div>
        <div class="state-box highlight">Σ dp[n-1][prev]</div>
    </div>
    <p>Sum over all digits that can reach current digit</p>
</div>`,
            code: `int knightDialer(int n) {
    const int MOD = 1e9 + 7;
    
    // moves[i] = list of digits that can reach digit i
    vector<vector<int>> moves = {
        {4, 6},    // 0 can be reached from 4, 6
        {6, 8},    // 1 can be reached from 6, 8
        {7, 9},    // 2
        {4, 8},    // 3
        {3, 9, 0}, // 4
        {},        // 5 (unreachable)
        {1, 7, 0}, // 6
        {2, 6},    // 7
        {1, 3},    // 8
        {2, 4}     // 9
    };
    
    vector<long long> dp(10, 1); // Length 1: one way to start at each digit
    
    for (int len = 2; len <= n; len++) {
        vector<long long> newDp(10, 0);
        
        for (int digit = 0; digit <= 9; digit++) {
            for (int prev : moves[digit]) {
                newDp[digit] = (newDp[digit] + dp[prev]) % MOD;
            }
        }
        
        dp = newDp;
    }
    
    long long total = 0;
    for (int i = 0; i <= 9; i++) {
        total = (total + dp[i]) % MOD;
    }
    
    return total;
}

// Time: O(n)
// Space: O(1) - only 10 states`
        },
        {
            title: "7. Number of Ways to Stay in Same Place",
            description: "You have an array of length arrLen and a pointer at index 0. In each step you can move left, right, or stay. Count the number of ways to be at index 0 after exactly steps steps.",
            visualization: `
<div class="visual-container">
    <h4>State: dp[step][position]</h4>
    <p>Count of ways to reach position after step moves</p>
    
    <div class="dp-table">
        <div class="dp-cell">step\\pos</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">0</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">0</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">0</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">2</div>
        <div class="dp-cell highlight">2</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">3</div>
        <div class="dp-cell" style="color: var(--accent);">4</div>
        <div class="dp-cell">5</div>
        <div class="dp-cell">3</div>
    </div>
    <p>steps=3, arrLen=3: Answer = 4 ways</p>
</div>

<div class="visual-container">
    <h4>Transition from Position i</h4>
    <div class="transition-flow">
        <div class="state-box">Stay<br>dp[s-1][i]</div>
        <div class="arrow">+</div>
        <div class="state-box">From Left<br>dp[s-1][i-1]</div>
        <div class="arrow">+</div>
        <div class="state-box">From Right<br>dp[s-1][i+1]</div>
    </div>
</div>

<div class="visual-container">
    <h4>Key Optimization</h4>
    <p style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px;">
        Maximum reachable position = min(arrLen-1, steps/2)<br><br>
        If steps = 500, arrLen = 1000000, we only need positions 0 to 250!
    </p>
</div>`,
            code: `int numWays(int steps, int arrLen) {
    const int MOD = 1e9 + 7;
    
    // Optimization: can't go beyond steps/2 and come back
    int maxPos = min(arrLen - 1, steps / 2 + 1);
    
    vector<long long> dp(maxPos + 1, 0);
    dp[0] = 1; // Start at position 0
    
    for (int s = 1; s <= steps; s++) {
        vector<long long> newDp(maxPos + 1, 0);
        
        for (int pos = 0; pos <= maxPos; pos++) {
            // Stay at pos
            newDp[pos] = dp[pos];
            
            // Come from left (pos - 1)
            if (pos > 0) {
                newDp[pos] = (newDp[pos] + dp[pos - 1]) % MOD;
            }
            
            // Come from right (pos + 1)
            if (pos < maxPos) {
                newDp[pos] = (newDp[pos] + dp[pos + 1]) % MOD;
            }
        }
        
        dp = newDp;
    }
    
    return dp[0];
}

// Time: O(steps × min(arrLen, steps/2))
// Space: O(min(arrLen, steps/2))`
        },
        {
            title: "8. Count All Possible Routes",
            description: "Given array of city locations, start, finish, and fuel. Count all possible routes from start to finish using at most fuel.",
            visualization: `
<div class="visual-container">
    <h4>State: dp[city][fuel_remaining]</h4>
    <p>Count of routes from city to finish with fuel left</p>
    
    <div class="dp-table">
        <div class="dp-cell">city\\fuel</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">1</div>
        <div class="dp-cell">2</div>
        <div class="dp-cell">3</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">finish</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
        <div class="dp-cell highlight">1</div>
    </div>
    <div class="dp-table">
        <div class="dp-cell">other</div>
        <div class="dp-cell">0</div>
        <div class="dp-cell">?</div>
        <div class="dp-cell">?</div>
        <div class="dp-cell">?</div>
    </div>
</div>

<div class="visual-container">
    <h4>Transition: Try All Next Cities</h4>
    <div class="transition-flow">
        <div class="state-box">Current City i<br>Fuel f</div>
        <div class="arrow">→</div>
        <div class="state-box">For each city j ≠ i<br>cost = |loc[i] - loc[j]|</div>
        <div class="arrow">→</div>
        <div class="state-box highlight">Add dp[j][f-cost]</div>
    </div>
</div>

<div class="visual-container">
    <h4>Important: Can Pass Through Finish</h4>
    <p style="background: var(--bg-tertiary); padding: 15px; border-radius: 8px;">
        You can visit the finish city multiple times!<br><br>
        Route: start → city1 → finish → city2 → finish<br>
        This counts as 2 valid routes (ending at finish twice)
    </p>
</div>`,
            code: `int countRoutes(vector<int>& locations, int start, int finish, int fuel) {
    const int MOD = 1e9 + 7;
    int n = locations.size();
    
    // dp[i][f] = routes from city i with f fuel
    vector<vector<int>> dp(n, vector<int>(fuel + 1, 0));
    
    // Base case: at finish city (counts as 1 route for any fuel)
    for (int f = 0; f <= fuel; f++) {
        dp[finish][f] = 1;
    }
    
    // Fill table - iterate by decreasing fuel
    for (int f = 0; f <= fuel; f++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                
                int cost = abs(locations[i] - locations[j]);
                if (f >= cost) {
                    dp[i][f] = (dp[i][f] + dp[j][f - cost]) % MOD;
                }
            }
        }
    }
    
    return dp[start][fuel];
}

// Alternative: Memoization
class Solution {
    const int MOD = 1e9 + 7;
    unordered_map<long long, int> memo;
    
    int solve(vector<int>& loc, int curr, int finish, int fuel) {
        if (fuel < 0) return 0;
        
        long long key = (long long)curr * 201 + fuel;
        if (memo.count(key)) return memo[key];
        
        int result = (curr == finish) ? 1 : 0;
        
        for (int next = 0; next < loc.size(); next++) {
            if (next != curr) {
                int cost = abs(loc[curr] - loc[next]);
                result = (result + solve(loc, next, finish, fuel - cost)) % MOD;
            }
        }
        
        return memo[key] = result;
    }
    
public:
    int countRoutes(vector<int>& loc, int start, int finish, int fuel) {
        return solve(loc, start, finish, fuel);
    }
};

// Time: O(n² × fuel)
// Space: O(n × fuel)`
        }
    ]
};
