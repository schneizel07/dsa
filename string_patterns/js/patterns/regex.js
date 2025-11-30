window.patterns['regex'] = {
    icon: '🔍',
    title: 'Regular Expressions',
    timeComplexity: 'O(n × m) typical',
    scenario: 'Apply regular expressions when the problem involves pattern matching or string validation based on specific rules, especially complex patterns or constraints. Regular expressions provide a powerful way to search, validate, and manipulate text efficiently.',
    clue: 'Look for phrases like "pattern," "validation," "matching," or specific patterns (e.g., email addresses, phone numbers) in problem descriptions. Problems requiring validation of input strings against specific patterns or constraints often suggest the application of regular expressions.',
    problems: [
        {
            title: 'Regular Expression Matching',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/regular-expression-matching/',
            intuition: 'Use dynamic programming. Handle three cases: exact character match, "." matches any character, and "*" matches zero or more of the preceding element.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "aab", p = "c*a*b"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Pattern breakdown:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char highlight">*</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char highlight">*</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                </div>
                                <p>"c*" → zero or more 'c's</p>
                                <p>"a*" → zero or more 'a's</p>
                                <p>"b" → exactly one 'b'</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Matching process:</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value" style="width: auto;">"c*" matches zero 'c's ✓</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value" style="width: auto;">"a*" matches "aa" ✓</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value" style="width: auto;">"b" matches "b" ✓</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>DP table visualization (T = True):</p>
                                <div style="overflow-x: auto;">
                                    <table style="border-collapse: collapse; margin: 1rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
                                        <tr>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);"></td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">""</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">c</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">*</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">a</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">*</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">b</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">""</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">a</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">a</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">b</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">F</td>
                                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); background: var(--char-match); color: white;">T</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="result-badge success">✓ dp[3][6] = True → Match!</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Create DP table dp[i][j] = s[0..i-1] matches p[0..j-1]<br>2. Handle "*": can match zero (dp[i][j-2]) or more (dp[i-1][j] if chars match)<br>3. Handle ".": matches any character<br>4. Handle exact match: s[i-1] == p[j-1]<br>5. Return dp[n][m]',
            timeComplexity: 'O(n × m)',
            spaceComplexity: 'O(n × m)',
            code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.length(), m = p.length();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
        
        dp[0][0] = true;
        
        // Handle patterns like a*, a*b*, etc. matching empty string
        for (int j = 2; j <= m; j += 2) {
            if (p[j-1] == '*') {
                dp[0][j] = dp[0][j-2];
            }
        }
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (p[j-1] == '*') {
                    // Zero occurrences of preceding char
                    dp[i][j] = dp[i][j-2];
                    // One or more occurrences (if chars match)
                    if (p[j-2] == '.' || p[j-2] == s[i-1]) {
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                    }
                } else if (p[j-1] == '.' || p[j-1] == s[i-1]) {
                    // Direct match or '.' wildcard
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        
        return dp[n][m];
    }
};`
        },
        {
            title: 'Regular Expression Matching (with . and *)',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/regular-expression-matching/',
            intuition: 'Similar approach with specific handling for "." and "*" operators. The key insight is that "*" always refers to the character before it.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "aa", p = "a*"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>"a*" means zero or more 'a's</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">a</div></div>
                                    <div class="char-box"><div class="char highlight">*</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>String "aa" has two 'a's:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                </div>
                                <p>"a*" matches both 'a's</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Match: True</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use recursive approach with memoization<br>2. If pattern has "*", try zero match or consume one char<br>3. If ".", match any single character<br>4. Otherwise, check exact character match<br>5. Base case: both strings exhausted → match',
            timeComplexity: 'O(n × m)',
            spaceComplexity: 'O(n × m)',
            code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.length(), m = p.length();
        vector<vector<int>> memo(n + 1, vector<int>(m + 1, -1));
        return dp(s, p, 0, 0, memo);
    }
    
private:
    bool dp(string& s, string& p, int i, int j, vector<vector<int>>& memo) {
        if (j == p.length()) return i == s.length();
        if (memo[i][j] != -1) return memo[i][j];
        
        bool firstMatch = (i < s.length() && 
                          (p[j] == s[i] || p[j] == '.'));
        
        bool result;
        if (j + 1 < p.length() && p[j + 1] == '*') {
            // Zero occurrence OR one+ occurrence
            result = dp(s, p, i, j + 2, memo) || 
                    (firstMatch && dp(s, p, i + 1, j, memo));
        } else {
            result = firstMatch && dp(s, p, i + 1, j + 1, memo);
        }
        
        memo[i][j] = result;
        return result;
    }
};`
        },
        {
            title: 'Wildcard Matching',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/wildcard-matching/',
            intuition: '"?" matches any single character. "*" matches any sequence (including empty). Use DP or greedy with backtracking.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "adceb", p = "*a*b"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Pattern breakdown:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">*</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char highlight">*</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                </div>
                                <p>"*" → matches any sequence</p>
                                <p>"a" → matches 'a'</p>
                                <p>"*" → matches any sequence</p>
                                <p>"b" → matches 'b'</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Matching:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char window">d</div></div>
                                    <div class="char-box"><div class="char window">c</div></div>
                                    <div class="char-box"><div class="char window">e</div></div>
                                    <div class="char-box"><div class="char match">b</div></div>
                                </div>
                                <p>"*" matches "" (empty) at start</p>
                                <p>"a" matches 'a'</p>
                                <p>"*" matches "dce"</p>
                                <p>"b" matches 'b'</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Match: True</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Create DP table or use greedy approach<br>2. "*" can match empty or any sequence<br>3. "?" matches exactly one character<br>4. Track last "*" position for backtracking<br>5. Return true if both strings fully matched',
            timeComplexity: 'O(n × m)',
            spaceComplexity: 'O(n × m) or O(1) greedy',
            code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.length(), m = p.length();
        int si = 0, pi = 0;
        int starIdx = -1, matchIdx = -1;
        
        while (si < n) {
            // Match or '?'
            if (pi < m && (p[pi] == '?' || p[pi] == s[si])) {
                si++;
                pi++;
            }
            // '*' - record position and move pattern pointer
            else if (pi < m && p[pi] == '*') {
                starIdx = pi;
                matchIdx = si;
                pi++;
            }
            // Backtrack to last '*'
            else if (starIdx != -1) {
                pi = starIdx + 1;
                matchIdx++;
                si = matchIdx;
            }
            // No match possible
            else {
                return false;
            }
        }
        
        // Check remaining pattern (only '*' allowed)
        while (pi < m && p[pi] == '*') {
            pi++;
        }
        
        return pi == m;
    }
};`
        },
        {
            title: 'Decode String',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/decode-string/',
            intuition: 'Use stack to handle nested patterns. Push current string and count when seeing "[", pop and repeat when seeing "]".',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "3[a2[c]]"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Parse "3[" → push (count=3, str="")</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">3</div></div>
                                    <div class="char-box"><div class="char highlight">[</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">2</div></div>
                                    <div class="char-box"><div class="char">[</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">]</div></div>
                                    <div class="char-box"><div class="char">]</div></div>
                                </div>
                                <p>Stack: [(3, "")]</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Parse "a2[" → current="a", push (count=2, str="a")</p>
                                <p>Stack: [(3, ""), (2, "a")]</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Parse "c]" → pop, current = "a" + "c"×2 = "acc"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                </div>
                                <p>Stack: [(3, "")]</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <p>Parse "]" → pop, current = "" + "acc"×3</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                </div>
                                <div class="result-badge success">✓ Result: "accaccacc"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use two stacks: one for counts, one for strings<br>2. On "[": push current count and string<br>3. On "]": pop, repeat current string count times<br>4. On digit: build multi-digit number<br>5. On letter: append to current string',
            timeComplexity: 'O(n × k) where k is max repetition',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    string decodeString(string s) {
        stack<int> countStack;
        stack<string> stringStack;
        string current = "";
        int count = 0;
        
        for (char c : s) {
            if (isdigit(c)) {
                count = count * 10 + (c - '0');
            } else if (c == '[') {
                countStack.push(count);
                stringStack.push(current);
                current = "";
                count = 0;
            } else if (c == ']') {
                int repeatCount = countStack.top();
                countStack.pop();
                string prev = stringStack.top();
                stringStack.pop();
                
                string repeated = "";
                for (int i = 0; i < repeatCount; i++) {
                    repeated += current;
                }
                current = prev + repeated;
            } else {
                current += c;
            }
        }
        
        return current;
    }
};`
        },
        {
            title: 'Validate IP Address',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/validate-ip-address/',
            intuition: 'Check if string is valid IPv4 or IPv6. IPv4: 4 decimal numbers 0-255. IPv6: 8 hexadecimal groups of 1-4 chars.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Validation Examples</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>IPv4: "172.16.254.1"</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value" style="background: rgba(34, 197, 94, 0.2); color: #22c55e;">172</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(34, 197, 94, 0.2); color: #22c55e;">16</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(34, 197, 94, 0.2); color: #22c55e;">254</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(34, 197, 94, 0.2); color: #22c55e;">1</div>
                                    </div>
                                </div>
                                <p>✓ 4 parts, all 0-255, no leading zeros</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>IPv6: "2001:0db8:85a3:0:0:8A2E:0370:7334"</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row" style="flex-wrap: wrap; gap: 0.5rem;">
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">2001</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">0db8</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">85a3</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">0</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">0</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">8A2E</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">0370</div>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">7334</div>
                                    </div>
                                </div>
                                <p>✓ 8 groups, all valid hex (1-4 chars)</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Invalid: "256.256.256.256"</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">256</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">256</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">256</div>
                                        <span>.</span>
                                        <div class="hashmap-value" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">256</div>
                                    </div>
                                </div>
                                <p>✗ Values > 255</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Check for "." or ":" to determine type<br>2. IPv4: split by ".", validate 4 parts, 0-255, no leading zeros<br>3. IPv6: split by ":", validate 8 parts, 1-4 hex chars<br>4. Return "IPv4", "IPv6", or "Neither"',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    string validIPAddress(string queryIP) {
        if (queryIP.find('.') != string::npos) {
            return validateIPv4(queryIP) ? "IPv4" : "Neither";
        } else if (queryIP.find(':') != string::npos) {
            return validateIPv6(queryIP) ? "IPv6" : "Neither";
        }
        return "Neither";
    }
    
private:
    bool validateIPv4(string ip) {
        vector<string> parts = split(ip, '.');
        if (parts.size() != 4) return false;
        
        for (const string& part : parts) {
            if (part.empty() || part.length() > 3) return false;
            if (part.length() > 1 && part[0] == '0') return false;  // Leading zero
            
            for (char c : part) {
                if (!isdigit(c)) return false;
            }
            
            int num = stoi(part);
            if (num < 0 || num > 255) return false;
        }
        
        return true;
    }
    
    bool validateIPv6(string ip) {
        vector<string> parts = split(ip, ':');
        if (parts.size() != 8) return false;
        
        for (const string& part : parts) {
            if (part.empty() || part.length() > 4) return false;
            
            for (char c : part) {
                if (!isxdigit(c)) return false;
            }
        }
        
        return true;
    }
    
    vector<string> split(string s, char delim) {
        vector<string> result;
        stringstream ss(s);
        string item;
        while (getline(ss, item, delim)) {
            result.push_back(item);
        }
        // Handle trailing delimiter
        if (!s.empty() && s.back() == delim) {
            result.push_back("");
        }
        return result;
    }
};`
        }
    ]
};
