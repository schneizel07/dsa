window.matchingDpPattern = {
    id: "matching-dp",
    title: "Matching DP",
    description: "Dynamic programming for string matching, pattern matching, and sequence alignment",
    patterns: [
        {
            title: "Edit Distance (Levenshtein)",
            description: "Minimum operations to transform one string to another",
            intuition: `
                <h4>Core Insight</h4>
                <p>At each position, we have three choices: <strong>insert</strong>, <strong>delete</strong>, 
                or <strong>replace</strong>. If characters match, no operation needed.</p>
                
                <div class="visualization-container">
                    <h4>Three Operations</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>Insert</h5>
                            <p>Add char to word1</p>
                            <p>dp[i][j-1] + 1</p>
                        </div>
                        <div class="approach-card">
                            <h5>Delete</h5>
                            <p>Remove char from word1</p>
                            <p>dp[i-1][j] + 1</p>
                        </div>
                        <div class="approach-card">
                            <h5>Replace</h5>
                            <p>Change char in word1</p>
                            <p>dp[i-1][j-1] + 1</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">If word1[i] == word2[j]</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = dp[i-1][j-1]</div>
                </div>
                <div class="transition-flow">
                    <div class="state-box">If word1[i] != word2[j]</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = 1 + min(insert, delete, replace)</div>
                </div>
            `,
            approach: `
                <h4>DP Table Construction</h4>
                <ol>
                    <li><strong>Base cases:</strong> dp[0][j] = j (insert j chars), dp[i][0] = i (delete i chars)</li>
                    <li><strong>Match:</strong> dp[i][j] = dp[i-1][j-1] (no cost)</li>
                    <li><strong>Mismatch:</strong> dp[i][j] = 1 + min of three operations</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: "horse" → "ros"</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>r</th><th>o</th><th>s</th></tr>
                        <tr><th>""</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
                        <tr><th>h</th><td>1</td><td>1</td><td>2</td><td>3</td></tr>
                        <tr><th>o</th><td>2</td><td>2</td><td class="highlight">1</td><td>2</td></tr>
                        <tr><th>r</th><td>3</td><td>2</td><td>2</td><td>2</td></tr>
                        <tr><th>s</th><td>4</td><td>3</td><td>3</td><td>2</td></tr>
                        <tr><th>e</th><td>5</td><td>4</td><td>4</td><td class="highlight">3</td></tr>
                    </table>
                    <p><em>Answer: 3 operations (replace h→r, delete r, delete e)</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    // Space-optimized solution
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<int> dp(n + 1);
        
        // Base case: transforming "" to word2[0..j]
        for (int j = 0; j <= n; j++) {
            dp[j] = j;
        }
        
        for (int i = 1; i <= m; i++) {
            int prev = dp[0];  // dp[i-1][j-1]
            dp[0] = i;  // transforming word1[0..i] to ""
            
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                
                if (word1[i-1] == word2[j-1]) {
                    dp[j] = prev;
                } else {
                    dp[j] = 1 + min({prev,      // replace
                                    dp[j],      // delete
                                    dp[j-1]});  // insert
                }
                
                prev = temp;
            }
        }
        
        return dp[n];
    }
    
    // 2D version for clarity
    int minDistance2D(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j-1],  // replace
                                        dp[i-1][j],    // delete
                                        dp[i][j-1]});  // insert
                }
            }
        }
        
        return dp[m][n];
    }
};`
        },
        {
            title: "Wildcard Matching",
            description: "Match pattern with * (any sequence) and ? (any single char)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Handle two special characters: <strong>?</strong> matches any single char, 
                <strong>*</strong> matches any sequence (including empty).</p>
                
                <div class="visualization-container">
                    <h4>Pattern Rules</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>? (Question Mark)</h5>
                            <p>Matches exactly one character</p>
                            <p>dp[i][j] = dp[i-1][j-1]</p>
                        </div>
                        <div class="approach-card">
                            <h5>* (Star)</h5>
                            <p>Matches zero or more characters</p>
                            <p>Empty: dp[i][j-1]</p>
                            <p>One+: dp[i-1][j]</p>
                        </div>
                        <div class="approach-card">
                            <h5>Regular Char</h5>
                            <p>Must match exactly</p>
                            <p>dp[i][j] = dp[i-1][j-1] if match</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">p[j] == '*'</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">dp[i][j] = dp[i][j-1] OR dp[i-1][j]</div>
                </div>
            `,
            approach: `
                <h4>DP State Transitions</h4>
                <ol>
                    <li><strong>Base:</strong> dp[0][0] = true, dp[0][j] = true if p[0..j-1] are all '*'</li>
                    <li><strong>Pattern ?:</strong> Matches any single char, inherit diagonal</li>
                    <li><strong>Pattern *:</strong> Match empty (left) OR consume char (top)</li>
                    <li><strong>Regular char:</strong> Must match, inherit diagonal if match</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: s = "adceb", p = "*a*b"</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>*</th><th>a</th><th>*</th><th>b</th></tr>
                        <tr><th>""</th><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr>
                        <tr><th>a</th><td>F</td><td>T</td><td class="highlight">T</td><td>T</td><td>F</td></tr>
                        <tr><th>d</th><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
                        <tr><th>c</th><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
                        <tr><th>e</th><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
                        <tr><th>b</th><td>F</td><td>T</td><td>F</td><td>T</td><td class="highlight">T</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        
        dp[0][0] = true;
        
        // Initialize: empty string matches pattern of only *'s
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == '*') {
                dp[0][j] = dp[0][j-1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '*') {
                    // * matches empty OR one more char
                    dp[i][j] = dp[i][j-1] || dp[i-1][j];
                } else if (p[j-1] == '?' || s[i-1] == p[j-1]) {
                    // ? matches any char, or exact match
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Space-optimized O(n) solution
    bool isMatchOptimized(string s, string p) {
        int m = s.length(), n = p.length();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        
        for (int j = 1; j <= n && p[j-1] == '*'; j++) {
            dp[j] = true;
        }
        
        for (int i = 1; i <= m; i++) {
            bool prev = dp[0];
            dp[0] = false;
            
            for (int j = 1; j <= n; j++) {
                bool temp = dp[j];
                
                if (p[j-1] == '*') {
                    dp[j] = dp[j-1] || dp[j];
                } else if (p[j-1] == '?' || s[i-1] == p[j-1]) {
                    dp[j] = prev;
                } else {
                    dp[j] = false;
                }
                
                prev = temp;
            }
        }
        
        return dp[n];
    }
};`
        },
        {
            title: "Regular Expression Matching",
            description: "Match pattern with . (any char) and * (zero or more of preceding)",
            intuition: `
                <h4>Core Insight</h4>
                <p>Key difference from wildcard: <strong>*</strong> means zero or more of the 
                <strong>preceding element</strong>, not any sequence!</p>
                
                <div class="visualization-container">
                    <h4>Pattern Rules</h4>
                    <div class="approach-comparison">
                        <div class="approach-card">
                            <h5>. (Dot)</h5>
                            <p>Matches any single character</p>
                            <p>Simple character match</p>
                        </div>
                        <div class="approach-card">
                            <h5>x* (Star)</h5>
                            <p>Zero: skip x* entirely</p>
                            <p>One+: if s[i] matches x, consume s[i]</p>
                        </div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">p[j] == '*'</div>
                    <div class="arrow">→</div>
                    <div class="state-box">Zero: dp[i][j-2]</div>
                    <div class="arrow">OR</div>
                    <div class="state-box highlight">One+: dp[i-1][j] if s[i] matches p[j-1]</div>
                </div>
                
                <h4>Matching Condition</h4>
                <p>s[i] matches p[j] if: p[j] == '.' OR s[i] == p[j]</p>
            `,
            approach: `
                <h4>DP Transitions</h4>
                <ol>
                    <li><strong>Base:</strong> dp[0][0] = true, dp[0][j] for patterns like a*b*c*</li>
                    <li><strong>If p[j] != '*':</strong> Match chars, dp[i][j] = dp[i-1][j-1] && match(i,j)</li>
                    <li><strong>If p[j] == '*':</strong>
                        <ul>
                            <li>Zero occurrences: dp[i][j-2]</li>
                            <li>One+ occurrences: dp[i-1][j] && match(s[i], p[j-1])</li>
                        </ul>
                    </li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: s = "aab", p = "c*a*b"</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>c</th><th>*</th><th>a</th><th>*</th><th>b</th></tr>
                        <tr><th>""</th><td>T</td><td>F</td><td class="highlight">T</td><td>F</td><td class="highlight">T</td><td>F</td></tr>
                        <tr><th>a</th><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
                        <tr><th>a</th><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
                        <tr><th>b</th><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td class="highlight">T</td></tr>
                    </table>
                    <p><em>c* matches empty, a* matches "aa", b matches "b"</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        
        dp[0][0] = true;
        
        // Handle patterns like a*, a*b*, a*b*c* for empty string
        for (int j = 2; j <= n; j += 2) {
            if (p[j-1] == '*') {
                dp[0][j] = dp[0][j-2];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '*') {
                    // Zero occurrences of preceding element
                    dp[i][j] = dp[i][j-2];
                    
                    // One or more occurrences
                    if (matches(s, p, i, j-1)) {
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                    }
                } else {
                    // Regular character or '.'
                    if (matches(s, p, i, j)) {
                        dp[i][j] = dp[i-1][j-1];
                    }
                }
            }
        }
        
        return dp[m][n];
    }
    
private:
    bool matches(const string& s, const string& p, int i, int j) {
        return p[j-1] == '.' || s[i-1] == p[j-1];
    }
};

// Recursive with memoization (often clearer)
class SolutionRecursive {
public:
    bool isMatch(string s, string p) {
        memo.assign(s.length() + 1, vector<int>(p.length() + 1, -1));
        return dp(s, p, 0, 0);
    }
    
private:
    vector<vector<int>> memo;
    
    bool dp(const string& s, const string& p, int i, int j) {
        if (j == p.length()) return i == s.length();
        if (memo[i][j] != -1) return memo[i][j];
        
        bool firstMatch = (i < s.length() && 
                          (p[j] == s[i] || p[j] == '.'));
        
        bool result;
        if (j + 1 < p.length() && p[j+1] == '*') {
            // Zero or more of current char
            result = dp(s, p, i, j + 2) ||  // zero
                     (firstMatch && dp(s, p, i + 1, j));  // one+
        } else {
            result = firstMatch && dp(s, p, i + 1, j + 1);
        }
        
        return memo[i][j] = result;
    }
};`
        },
        {
            title: "Longest Common Subsequence",
            description: "Find the longest subsequence common to two strings",
            intuition: `
                <h4>Core Insight</h4>
                <p>Classic two-string DP! If characters match, extend the LCS. Otherwise, 
                take the best from excluding either character.</p>
                
                <div class="visualization-container">
                    <h4>Decision at Each Position</h4>
                    <div class="transition-flow">
                        <div class="state-box">s1[i] == s2[j]?</div>
                        <div class="arrow">Yes→</div>
                        <div class="state-box highlight">dp[i][j] = 1 + dp[i-1][j-1]</div>
                    </div>
                    <div class="transition-flow">
                        <div class="state-box">s1[i] != s2[j]</div>
                        <div class="arrow">→</div>
                        <div class="state-box highlight">dp[i][j] = max(dp[i-1][j], dp[i][j-1])</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Match</h5>
                        <p>Both chars part of LCS</p>
                        <p>Diagonal + 1</p>
                    </div>
                    <div class="approach-card">
                        <h5>Mismatch</h5>
                        <p>Skip char from s1 OR s2</p>
                        <p>Max(left, top)</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>DP Table</h4>
                <ol>
                    <li><strong>State:</strong> dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]</li>
                    <li><strong>Base:</strong> dp[0][j] = dp[i][0] = 0</li>
                    <li><strong>Transition:</strong> Match → diagonal+1, else max(left, top)</li>
                    <li><strong>Answer:</strong> dp[m][n]</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: "abcde" vs "ace"</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>a</th><th>c</th><th>e</th></tr>
                        <tr><th>""</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><th>a</th><td>0</td><td class="highlight">1</td><td>1</td><td>1</td></tr>
                        <tr><th>b</th><td>0</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><th>c</th><td>0</td><td>1</td><td class="highlight">2</td><td>2</td></tr>
                        <tr><th>d</th><td>0</td><td>1</td><td>2</td><td>2</td></tr>
                        <tr><th>e</th><td>0</td><td>1</td><td>2</td><td class="highlight">3</td></tr>
                    </table>
                    <p><em>LCS = "ace", length = 3</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        
        // Space-optimized: use 1D array
        vector<int> dp(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            int prev = 0;  // dp[i-1][j-1]
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                
                if (text1[i-1] == text2[j-1]) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = max(dp[j], dp[j-1]);
                }
                
                prev = temp;
            }
        }
        
        return dp[n];
    }
    
    // Print the actual LCS
    string getLCS(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        // Backtrack to find actual LCS
        string lcs;
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (text1[i-1] == text2[j-1]) {
                lcs = text1[i-1] + lcs;
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return lcs;
    }
};`
        },
        {
            title: "Distinct Subsequences",
            description: "Count distinct subsequences of s that equal t",
            intuition: `
                <h4>Core Insight</h4>
                <p>At each match, we have a choice: <strong>use this match</strong> or <strong>skip it</strong>. 
                The total count is the sum of both choices.</p>
                
                <div class="visualization-container">
                    <h4>Decision Tree</h4>
                    <div class="transition-flow">
                        <div class="state-box">s[i] == t[j]?</div>
                        <div class="arrow">Yes→</div>
                        <div class="state-box highlight">dp[i][j] = dp[i-1][j-1] + dp[i-1][j]</div>
                    </div>
                    <div class="transition-flow">
                        <div class="state-box">s[i] != t[j]</div>
                        <div class="arrow">→</div>
                        <div class="state-box">dp[i][j] = dp[i-1][j]</div>
                    </div>
                </div>
                
                <div class="approach-comparison">
                    <div class="approach-card">
                        <h5>Use the Match</h5>
                        <p>Match s[i] with t[j]</p>
                        <p>Count = dp[i-1][j-1]</p>
                    </div>
                    <div class="approach-card">
                        <h5>Skip s[i]</h5>
                        <p>Don't use s[i] in matching</p>
                        <p>Count = dp[i-1][j]</p>
                    </div>
                </div>
            `,
            approach: `
                <h4>DP Definition</h4>
                <ol>
                    <li><strong>State:</strong> dp[i][j] = ways to form t[0..j-1] from s[0..i-1]</li>
                    <li><strong>Base:</strong> dp[i][0] = 1 (empty t matches empty subsequence)</li>
                    <li><strong>Transition:</strong> Match adds use + skip, mismatch only skip</li>
                </ol>
                
                <div class="visualization-container">
                    <h4>Example: s = "rabbbit", t = "rabbit"</h4>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>r</th><th>a</th><th>b</th><th>b</th><th>i</th><th>t</th></tr>
                        <tr><th>""</th><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><th>r</th><td>1</td><td class="highlight">1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><th>a</th><td>1</td><td>1</td><td class="highlight">1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><th>b</th><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
                        <tr><th>b</th><td>1</td><td>1</td><td>1</td><td>2</td><td>1</td><td>0</td><td>0</td></tr>
                        <tr><th>b</th><td>1</td><td>1</td><td>1</td><td class="highlight">3</td><td class="highlight">3</td><td>0</td><td>0</td></tr>
                        <tr><th>i</th><td>1</td><td>1</td><td>1</td><td>3</td><td>3</td><td>3</td><td>0</td></tr>
                        <tr><th>t</th><td>1</td><td>1</td><td>1</td><td>3</td><td>3</td><td>3</td><td class="highlight">3</td></tr>
                    </table>
                    <p><em>Answer: 3 ways to form "rabbit" from "rabbbit"</em></p>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        
        // Use unsigned long long to handle overflow
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;  // Empty t can always be matched
        
        for (int i = 1; i <= m; i++) {
            // Process right to left to avoid overwriting
            for (int j = min(i, n); j >= 1; j--) {
                if (s[i-1] == t[j-1]) {
                    dp[j] += dp[j-1];  // use + skip
                }
                // If no match, dp[j] stays same (skip)
            }
        }
        
        return dp[n];
    }
    
    // 2D version for clarity
    int numDistinct2D(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<unsigned long long>> dp(m + 1, vector<unsigned long long>(n + 1, 0));
        
        // Empty t can be formed from any prefix of s
        for (int i = 0; i <= m; i++) {
            dp[i][0] = 1;
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                dp[i][j] = dp[i-1][j];  // skip s[i]
                if (s[i-1] == t[j-1]) {
                    dp[i][j] += dp[i-1][j-1];  // use s[i]
                }
            }
        }
        
        return dp[m][n];
    }
};`
        },
        {
            title: "Interleaving String",
            description: "Check if s3 is formed by interleaving s1 and s2",
            intuition: `
                <h4>Core Insight</h4>
                <p>s3 must be formed by taking characters from s1 and s2 in order. 
                Track positions in both strings as we "consume" s3.</p>
                
                <div class="visualization-container">
                    <h4>Interleaving Concept</h4>
                    <div class="dp-table">
                        <div class="dp-cell highlight">s1:</div>
                        <div class="dp-cell">a</div>
                        <div class="dp-cell">a</div>
                        <div class="dp-cell">b</div>
                        <div class="dp-cell">c</div>
                        <div class="dp-cell">c</div>
                    </div>
                    <div class="dp-table">
                        <div class="dp-cell highlight">s2:</div>
                        <div class="dp-cell">d</div>
                        <div class="dp-cell">b</div>
                        <div class="dp-cell">b</div>
                        <div class="dp-cell">c</div>
                        <div class="dp-cell">a</div>
                    </div>
                    <div class="dp-table" style="margin-top: 10px;">
                        <div class="dp-cell highlight">s3:</div>
                        <div class="dp-cell" style="background: var(--primary-light);">a</div>
                        <div class="dp-cell" style="background: var(--accent);">d</div>
                        <div class="dp-cell" style="background: var(--primary-light);">a</div>
                        <div class="dp-cell" style="background: var(--accent);">b</div>
                        <div class="dp-cell" style="background: var(--accent);">b</div>
                        <div class="dp-cell" style="background: var(--primary-light);">b</div>
                        <div class="dp-cell" style="background: var(--accent);">c</div>
                        <div class="dp-cell" style="background: var(--primary-light);">c</div>
                        <div class="dp-cell" style="background: var(--accent);">a</div>
                        <div class="dp-cell" style="background: var(--primary-light);">c</div>
                    </div>
                </div>
                
                <div class="transition-flow">
                    <div class="state-box">dp[i][j] = can form s3[0..i+j-1]?</div>
                    <div class="arrow">→</div>
                    <div class="state-box highlight">Take from s1 OR take from s2</div>
                </div>
            `,
            approach: `
                <h4>DP Approach</h4>
                <ol>
                    <li><strong>Constraint:</strong> len(s1) + len(s2) must equal len(s3)</li>
                    <li><strong>State:</strong> dp[i][j] = can interleave s1[0..i-1], s2[0..j-1] to form s3[0..i+j-1]</li>
                    <li><strong>Transition:</strong>
                        <ul>
                            <li>From s1: dp[i-1][j] && s1[i-1] == s3[i+j-1]</li>
                            <li>From s2: dp[i][j-1] && s2[j-1] == s3[i+j-1]</li>
                        </ul>
                    </li>
                </ol>
                
                <div class="visualization-container">
                    <h4>DP Table Example</h4>
                    <p>s1 = "aab", s2 = "axy", s3 = "aaxaby"</p>
                    <table class="complexity-table">
                        <tr><th></th><th>""</th><th>a</th><th>x</th><th>y</th></tr>
                        <tr><th>""</th><td>T</td><td>T</td><td>F</td><td>F</td></tr>
                        <tr><th>a</th><td>T</td><td class="highlight">T</td><td>T</td><td>F</td></tr>
                        <tr><th>a</th><td>F</td><td>T</td><td>T</td><td>F</td></tr>
                        <tr><th>b</th><td>F</td><td>F</td><td>T</td><td class="highlight">T</td></tr>
                    </table>
                </div>
                
                <h4>Complexity</h4>
                <ul>
                    <li><strong>Time:</strong> O(m × n)</li>
                    <li><strong>Space:</strong> O(n) with 1D optimization</li>
                </ul>
            `,
            code: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        
        vector<bool> dp(n + 1, false);
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 && j == 0) {
                    dp[j] = true;
                } else if (i == 0) {
                    dp[j] = dp[j-1] && s2[j-1] == s3[j-1];
                } else if (j == 0) {
                    dp[j] = dp[j] && s1[i-1] == s3[i-1];
                } else {
                    dp[j] = (dp[j] && s1[i-1] == s3[i+j-1]) ||
                            (dp[j-1] && s2[j-1] == s3[i+j-1]);
                }
            }
        }
        
        return dp[n];
    }
    
    // BFS approach (alternative)
    bool isInterleaveBFS(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        
        vector<vector<bool>> visited(m + 1, vector<bool>(n + 1, false));
        queue<pair<int, int>> q;
        q.push({0, 0});
        visited[0][0] = true;
        
        while (!q.empty()) {
            auto [i, j] = q.front();
            q.pop();
            
            if (i == m && j == n) return true;
            
            // Try taking from s1
            if (i < m && s1[i] == s3[i + j] && !visited[i+1][j]) {
                visited[i+1][j] = true;
                q.push({i + 1, j});
            }
            
            // Try taking from s2
            if (j < n && s2[j] == s3[i + j] && !visited[i][j+1]) {
                visited[i][j+1] = true;
                q.push({i, j + 1});
            }
        }
        
        return false;
    }
};`
        }
    ]
};
