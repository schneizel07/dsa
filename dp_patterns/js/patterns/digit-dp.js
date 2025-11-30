window.digitDpPattern = {
    id: "digit-dp",
    title: "Digit DP",
    description: "Count numbers in a range satisfying certain digit-based properties",
    patterns: [
        {
            title: "Count Numbers with Unique Digits",
            description: "Count all numbers with unique digits in range [0, 10^n)",
            intuition: `
                <h4>Core Insight</h4>
                <p>This is a <strong>combinatorics problem</strong> in disguise! Count numbers where 
                no digit repeats. Think about how many choices we have for each position.</p>
                
                <div class="visualization-container">
                    <h4>Digit Position Choices</h4>
                    <div class="dp-table">
                        <div class="dp-cell highlight">First</div>
                        <div class="dp-cell">Second</div>
                        <div class="dp-cell">Third</div>
                        <div class="dp-cell">Fourth</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">9</div>
                        <div class="dp-cell">9</div>
                        <div class="dp-cell">8</div>
                        <div class="dp-cell">7</div>
                    </div>
                    <p><em>First digit: 1-9 (no leading zero), rest: remaining digits</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">n = 1: [0-9] = 10</div>
                    <div class="arrow">→</div>
                    <div class="state-box">n = 2: 10 + 9×9 = 91</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">n = 3: 91 + 9×9×8 = 739</div>
                </div>
                
                <h4>Pattern</h4>
                <p>For k-digit numbers: 9 × 9 × 8 × 7 × ... × (11-k)</p>
            `,
            approach: `
                <h4>Mathematical Approach</h4>
                <ol>
                    <li><strong>n = 0:</strong> Only 0, answer = 1</li>
                    <li><strong>n = 1:</strong> 0-9, answer = 10</li>
                    <li><strong>n ≥ 2:</strong> Add k-digit unique numbers for k = 2 to n</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Building Up the Count</h4>
                    <table class="complexity-table">
                        <tr><th>Digits</th><th>Formula</th><th>Count</th><th>Cumulative</th></tr>
                        <tr><td>1</td><td>10</td><td>10</td><td>10</td></tr>
                        <tr><td>2</td><td>9 × 9</td><td>81</td><td>91</td></tr>
                        <tr><td>3</td><td>9 × 9 × 8</td><td>648</td><td>739</td></tr>
                        <tr><td>4</td><td>9 × 9 × 8 × 7</td><td>4536</td><td>5275</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(n)</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        if (n == 1) return 10;
        
        int result = 10;  // Count for n=1
        int uniqueDigits = 9;  // First digit choices (1-9)
        int availableDigits = 9;  // Remaining digit choices
        
        for (int i = 2; i <= n && availableDigits > 0; i++) {
            uniqueDigits *= availableDigits;
            result += uniqueDigits;
            availableDigits--;
        }
        
        return result;
    }
    
    // Alternative: DP approach
    int countNumbersWithUniqueDigitsDP(int n) {
        if (n == 0) return 1;
        
        // dp[i] = count of i-digit numbers with unique digits
        vector<int> dp(n + 1);
        dp[0] = 1;
        dp[1] = 10;
        
        for (int i = 2; i <= n; i++) {
            int kDigitCount = 9;
            for (int j = 1; j < i; j++) {
                kDigitCount *= (10 - j);
            }
            dp[i] = dp[i-1] + kDigitCount;
        }
        
        return dp[n];
    }
};`
        },
        {
            title: "Numbers At Most N Given Digit Set",
            description: "Count positive integers ≤ n that can be formed using given digits",
            intuition: `
                <h4>Core Insight</h4>
                <p>Classic <strong>Digit DP</strong> problem! Count numbers of length < n's length (easy), 
                then handle numbers of same length (tight bound).</p>
                
                <div class="visualization-container">
                    <h4>Two Cases</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Case 1: Shorter Length</h5>
                            <p>Digits = {1, 3, 5, 7}</p>
                            <p>N = 1234</p>
                            <p>1-digit: 4 numbers</p>
                            <p>2-digit: 4² = 16 numbers</p>
                            <p>3-digit: 4³ = 64 numbers</p>
                        </div>
                        <div class="approach-card current">
                            <h5>Case 2: Same Length</h5>
                            <p>Need digit-by-digit analysis</p>
                            <p>Track if still "tight" to N</p>
                            <p>If current digit < N's digit: free choices below</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">Shorter numbers</div>
                    <div class="arrow">+</div>
                    <div class="state-box">Same-length numbers ≤ N</div>
                    <div class="arrow">=</div>
                    <div class="state-box highlight">Total count</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Count shorter:</strong> Sum of d^k for k = 1 to len(N)-1</li>
                    <li><strong>Count same length:</strong> Process digit by digit
                        <ul>
                            <li>For each digit in N, count digits in set that are smaller</li>
                            <li>These contribute: smaller_count × d^(remaining positions)</li>
                            <li>If digit in N is in set, continue to next position</li>
                            <li>Otherwise, stop (can't match N's prefix)</li>
                        </ul>
                    </li>
                    <li><strong>Add 1 if N itself is formable</strong></li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: digits = {1,3,5,7}, N = 356</h4>
                    <table class="complexity-table">
                        <tr><th>Position</th><th>N digit</th><th>Smaller in set</th><th>Contribution</th></tr>
                        <tr><td>1st</td><td>3</td><td>{1} → 1</td><td>1 × 4² = 16</td></tr>
                        <tr><td>2nd</td><td>5</td><td>{1,3} → 2</td><td>2 × 4¹ = 8</td></tr>
                        <tr><td>3rd</td><td>6</td><td>{1,3,5} → 3</td><td>3 × 4⁰ = 3</td></tr>
                    </table>
                    <p><em>Shorter: 4 + 16 = 20, Same length: 16+8+3 = 27, Total = 47</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(log N × |D|)</li>
                    <li><strong>Space:</strong> O(log N)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int atMostNGivenDigitSet(vector<string>& digits, int n) {
        string s = to_string(n);
        int len = s.length();
        int d = digits.size();
        int result = 0;
        
        // Count numbers with fewer digits
        // 1-digit: d, 2-digit: d², ..., (len-1)-digit: d^(len-1)
        for (int i = 1; i < len; i++) {
            result += pow(d, i);
        }
        
        // Count numbers with same number of digits
        for (int i = 0; i < len; i++) {
            bool hasSameDigit = false;
            
            for (const string& digit : digits) {
                if (digit[0] < s[i]) {
                    // Can use this digit and anything below
                    result += pow(d, len - i - 1);
                } else if (digit[0] == s[i]) {
                    hasSameDigit = true;
                }
            }
            
            // If we can't match current digit of n, stop
            if (!hasSameDigit) return result;
        }
        
        // If we reach here, n itself is formable
        return result + 1;
    }
};`
        },
        {
            title: "Count Numbers with Even Number of Digits",
            description: "Count integers in [1, n] with an even number of digits",
            intuition: `
                <h4>Core Insight</h4>
                <p>Simple digit counting! Numbers with even digits: 10-99 (2 digits), 1000-9999 (4 digits), etc.</p>
                
                <div class="visualization-container">
                    <h4>Even Digit Ranges</h4>
                    <div class="dp-table">
                        <div class="dp-cell">2 digits</div>
                        <div class="dp-cell">4 digits</div>
                        <div class="dp-cell">6 digits</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">[10, 99]</div>
                        <div class="dp-cell highlight">[1000, 9999]</div>
                        <div class="dp-cell highlight">[100000, 999999]</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">90 numbers</div>
                        <div class="dp-cell">9000 numbers</div>
                        <div class="dp-cell">900000 numbers</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">k even digits</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Count = 9 × 10^(k-1)</div>
                </div>
            `,
            approach: `
                <h4>Two Approaches</h4>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Approach 1: Direct Count</h5>
                        <p>Count digits of n</p>
                        <p>Sum all complete even-digit ranges below</p>
                        <p>Handle partial range if n has even digits</p>
                    </div>
                    <div class="approach-card">
                        <h5>Approach 2: Simple Loop</h5>
                        <p>For small n, just count digit lengths</p>
                        <p>O(n) but simple</p>
                    </div>
                </div>
                
                <div class="visualization-container">
                    <h4>Example: n = 12345</h4>
                    <table class="complexity-table">
                        <tr><th>Range</th><th>Digits</th><th>Count</th></tr>
                        <tr><td>[10, 99]</td><td>2</td><td>90</td></tr>
                        <tr><td>[1000, 9999]</td><td>4</td><td>9000</td></tr>
                        <tr><td colspan="2"><strong>Total</strong></td><td><strong>9090</strong></td></tr>
                    </table>
                    <p><em>12345 has 5 (odd) digits, so no partial range</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(log n) for digit counting</li>
                    <li><strong>Space:</strong> O(1)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int findNumbers(vector<int>& nums) {
        int count = 0;
        for (int num : nums) {
            // Count digits
            int digits = 0;
            while (num > 0) {
                digits++;
                num /= 10;
            }
            if (digits % 2 == 0) count++;
        }
        return count;
    }
    
    // Alternative: Using log10
    int findNumbersLog(vector<int>& nums) {
        int count = 0;
        for (int num : nums) {
            int digits = (int)log10(num) + 1;
            if (digits % 2 == 0) count++;
        }
        return count;
    }
    
    // Count in range [1, n] with even digits
    int countEvenDigitNumbers(int n) {
        if (n < 10) return 0;
        
        int digits = to_string(n).length();
        int count = 0;
        
        // Count complete even-digit ranges
        for (int d = 2; d < digits; d += 2) {
            count += 9 * pow(10, d - 1);
        }
        
        // Handle partial range if n has even digits
        if (digits % 2 == 0) {
            int lowerBound = pow(10, digits - 1);
            count += n - lowerBound + 1;
        }
        
        return count;
    }
};`
        },
        {
            title: "Count Special Integers",
            description: "Count positive integers ≤ n with all distinct digits",
            intuition: `
                <h4>Core Insight</h4>
                <p>Full <strong>Digit DP with tight bound and mask</strong>! Track which digits 
                have been used with a bitmask while respecting the upper bound n.</p>
                
                <div class="visualization-container">
                    <h4>Digit DP State</h4>
                    <div class="transition-flow">
                        <div class="state-box">pos: current digit position</div>
                        <div class="state-box">tight: still bounded by n?</div>
                        <div class="state-box">mask: used digits bitmask</div>
                        <div class="state-box">started: have we placed non-zero digit?</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Tight = true</h5>
                        <p>Must not exceed n's digit at this position</p>
                        <p>Choices: 0 to n[pos]</p>
                    </div>
                    <div class="approach-card">
                        <h5>Tight = false</h5>
                        <p>Already smaller than n in prefix</p>
                        <p>Choices: 0 to 9 (that aren't used)</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Digit DP Framework</h4>
                <ol>
                    <li><strong>Convert n to string:</strong> Process digit by digit</li>
                    <li><strong>DFS with memoization:</strong> (pos, tight, mask, started)</li>
                    <li><strong>Handle leading zeros:</strong> started flag tracks this</li>
                    <li><strong>Count valid placements:</strong> Digit not in mask and respects tight bound</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>State Transitions</h4>
                    <table class="complexity-table">
                        <tr><th>Current</th><th>Place digit d</th><th>Next State</th></tr>
                        <tr><td>(pos, true, mask, true)</td><td>d < n[pos]</td><td>(pos+1, false, mask|d, true)</td></tr>
                        <tr><td>(pos, true, mask, true)</td><td>d = n[pos]</td><td>(pos+1, true, mask|d, true)</td></tr>
                        <tr><td>(pos, false, mask, true)</td><td>any valid d</td><td>(pos+1, false, mask|d, true)</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(10 × 2 × 2^10 × log n) ≈ O(log n)</li>
                    <li><strong>Space:</strong> O(2^10 × log n) for memoization</li>
                </ul>
            `,
            code: `class Solution {
public:
    int countSpecialNumbers(int n) {
        string s = to_string(n);
        int len = s.length();
        
        // memo[pos][tight][mask][started]
        map<tuple<int,bool,int,bool>, int> memo;
        
        function<int(int, bool, int, bool)> dp = [&](int pos, bool tight, int mask, bool started) -> int {
            if (pos == len) return started ? 1 : 0;
            
            auto key = make_tuple(pos, tight, mask, started);
            if (memo.count(key)) return memo[key];
            
            int limit = tight ? s[pos] - '0' : 9;
            int result = 0;
            
            // Option 1: Place nothing (leading zero)
            if (!started) {
                result += dp(pos + 1, false, mask, false);
            }
            
            // Option 2: Place a digit
            int start = started ? 0 : 1;  // No leading zeros
            for (int d = start; d <= limit; d++) {
                if (mask & (1 << d)) continue;  // Digit already used
                
                result += dp(pos + 1, tight && (d == limit), 
                            mask | (1 << d), true);
            }
            
            return memo[key] = result;
        };
        
        return dp(0, true, 0, false);
    }
    
    // Alternative: Iterative counting
    int countSpecialNumbersIterative(int n) {
        string s = to_string(n);
        int len = s.length();
        int result = 0;
        
        // Count numbers with fewer digits
        // k digits: 9 * P(9, k-1) = 9 * 9 * 8 * ... * (11-k)
        for (int k = 1; k < len; k++) {
            int count = 9;
            for (int i = 1; i < k; i++) {
                count *= (10 - i);
            }
            result += count;
        }
        
        // Count numbers with same digits, <= n
        set<int> used;
        for (int i = 0; i < len; i++) {
            int digit = s[i] - '0';
            
            // Count numbers with smaller digit at position i
            for (int d = (i == 0 ? 1 : 0); d < digit; d++) {
                if (used.count(d)) continue;
                
                // Remaining positions can use any unused digits
                int available = 10 - i - 1;  // Exclude used + current
                int perms = 1;
                for (int j = 0; j < len - i - 1; j++) {
                    perms *= (available - j);
                }
                result += perms;
            }
            
            if (used.count(digit)) break;  // Can't continue with this digit
            used.insert(digit);
            
            if (i == len - 1) result++;  // n itself is special
        }
        
        return result;
    }
};`
        },
        {
            title: "Non-negative Integers without Consecutive Ones",
            description: "Count non-negative integers ≤ n without consecutive 1s in binary",
            intuition: `
                <h4>Core Insight</h4>
                <p>Work with <strong>binary representation</strong>! This is Fibonacci-like: 
                valid sequences follow the pattern where we can't have two consecutive 1s.</p>
                
                <div class="visualization-container">
                    <h4>Valid Binary Patterns</h4>
                    <div class="dp-table">
                        <div class="dp-cell">Length</div>
                        <div class="dp-cell">Valid patterns</div>
                        <div class="dp-cell">Count</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">1</div>
                        <div class="dp-cell">0, 1</div>
                        <div class="dp-cell highlight">2</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">2</div>
                        <div class="dp-cell">00, 01, 10</div>
                        <div class="dp-cell highlight">3</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell">3</div>
                        <div class="dp-cell">000, 001, 010, 100, 101</div>
                        <div class="dp-cell highlight">5</div>
                    </div>
                    <p><em>Pattern: Fibonacci! F(n+2) valid n-bit patterns</em></p>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">f[n] = f[n-1] + f[n-2]</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">End with 0: f[n-1] ways<br>End with 1: f[n-2] ways (must end with 01)</div>
                </div>
            `,
            approach: `
                <h4>Algorithm</h4>
                <ol>
                    <li><strong>Precompute Fibonacci:</strong> f[i] = count of valid i-bit numbers</li>
                    <li><strong>Process n bit by bit from MSB:</strong></li>
                    <li><strong>At each 1 bit:</strong> Count all valid numbers that place 0 here</li>
                    <li><strong>Check consecutive 1s:</strong> If found in n, stop and include n</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: n = 10 (binary: 1010)</h4>
                    <table class="complexity-table">
                        <tr><th>Bit</th><th>Position</th><th>Action</th><th>Add to count</th></tr>
                        <tr><td>1</td><td>3</td><td>If 0xxx: f[3]=5 ways</td><td>5</td></tr>
                        <tr><td>0</td><td>2</td><td>Skip (bit is 0)</td><td>0</td></tr>
                        <tr><td>1</td><td>1</td><td>If 100x: f[1]=2 ways</td><td>2</td></tr>
                        <tr><td>0</td><td>0</td><td>Reach end, add 1 for n</td><td>1</td></tr>
                    </table>
                    <p><em>Total = 5 + 2 + 1 = 8</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(log n)</li>
                    <li><strong>Space:</strong> O(log n) for Fibonacci array</li>
                </ul>
            `,
            code: `class Solution {
public:
    int findIntegers(int n) {
        // Fibonacci: f[i] = valid i-bit numbers (with possible leading zeros)
        vector<int> fib(32);
        fib[0] = 1;
        fib[1] = 2;
        for (int i = 2; i < 32; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        
        int result = 0;
        int prevBit = 0;
        
        // Process from most significant bit
        for (int i = 30; i >= 0; i--) {
            if (n & (1 << i)) {  // Current bit is 1
                // Count all numbers with 0 at this position
                result += fib[i];
                
                // If previous bit was also 1, we can't continue
                // (consecutive 1s in n means we've counted all valid numbers)
                if (prevBit == 1) {
                    return result;
                }
                prevBit = 1;
            } else {
                prevBit = 0;
            }
        }
        
        // If we reach here, n itself is valid
        return result + 1;
    }
};`
        },
        {
            title: "Numbers With Repeated Digits",
            description: "Count positive integers ≤ n with at least one repeated digit",
            intuition: `
                <h4>Core Insight</h4>
                <p>Use <strong>complement counting</strong>! Count numbers with ALL unique digits 
                and subtract from n. This reduces to the "Count Special Integers" problem.</p>
                
                <div class="visualization-container">
                    <h4>Complement Strategy</h4>
                    <div class="transition-flow">
                        <div class="state-box">Numbers with repeated digits</div>
                        <div class="arrow">=</div>
                        <div class="state-box">n</div>
                        <div class="arrow">−</div>
                        <div class="state-box highlight">Numbers with all unique digits</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Direct Counting</h5>
                        <p>Complex: need to track which digits repeat</p>
                        <p>Multiple states in DP</p>
                    </div>
                    <div class="approach-card current">
                        <h5>Complement Counting ✓</h5>
                        <p>Count unique-digit numbers (simpler)</p>
                        <p>Subtract from total</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>Count Unique Digit Numbers</h4>
                <ol>
                    <li><strong>Shorter numbers:</strong> k digits = 9 × P(9, k-1)</li>
                    <li><strong>Same-length numbers:</strong> Digit DP with used mask</li>
                    <li><strong>Subtract:</strong> n - unique_count</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: n = 100</h4>
                    <table class="complexity-table">
                        <tr><th>Category</th><th>Count</th></tr>
                        <tr><td>1-digit unique</td><td>9</td></tr>
                        <tr><td>2-digit unique</td><td>81</td></tr>
                        <tr><td>3-digit unique ≤ 100</td><td>1 (just 100)</td></tr>
                        <tr><td><strong>Total unique</strong></td><td><strong>91</strong></td></tr>
                        <tr><td><strong>With repeats = 100 - 91</strong></td><td class="highlight"><strong>10</strong></td></tr>
                    </table>
                    <p><em>Numbers with repeats: 11, 22, 33, 44, 55, 66, 77, 88, 99, 100</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(log n × 10)</li>
                    <li><strong>Space:</strong> O(log n)</li>
                </ul>
            `,
            code: `class Solution {
public:
    int numDupDigitsAtMostN(int n) {
        return n - countSpecialNumbers(n);
    }
    
private:
    int countSpecialNumbers(int n) {
        string s = to_string(n);
        int len = s.length();
        int result = 0;
        
        // Count numbers with fewer digits
        for (int k = 1; k < len; k++) {
            result += countUniqueDigits(k);
        }
        
        // Count numbers with same number of digits
        vector<bool> used(10, false);
        for (int i = 0; i < len; i++) {
            int digit = s[i] - '0';
            
            // Try smaller digits at position i
            for (int d = (i == 0 ? 1 : 0); d < digit; d++) {
                if (used[d]) continue;
                result += permutation(10 - i - 1, len - i - 1);
            }
            
            // Check if current digit already used
            if (used[digit]) break;
            used[digit] = true;
            
            // If we've placed all digits and reached the end
            if (i == len - 1) result++;
        }
        
        return result;
    }
    
    int countUniqueDigits(int k) {
        // k-digit numbers with unique digits
        // First digit: 9 choices (1-9)
        // Rest: permutation of remaining 9 digits
        if (k == 1) return 9;
        return 9 * permutation(9, k - 1);
    }
    
    int permutation(int n, int r) {
        // P(n, r) = n! / (n-r)!
        int result = 1;
        for (int i = 0; i < r; i++) {
            result *= (n - i);
        }
        return result;
    }
};`
        }
    ]
};
