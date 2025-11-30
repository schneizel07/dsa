window.patterns['string-manipulation'] = {
    icon: '🔧',
    title: 'String Manipulation',
    timeComplexity: 'O(n) typical',
    scenario: 'Utilize string manipulation techniques when tasked with operations such as reversing, splitting, joining, or converting strings into different formats. These techniques are useful for parsing input, formatting output, or transforming strings according to specific rules.',
    clue: 'Problem descriptions mentioning operations like "manipulate," "convert," "parse," or specific string operations (e.g., reversing, splitting) indicate the need for string manipulation techniques.',
    problems: [
        {
            title: 'Reverse String',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/reverse-string/',
            intuition: 'Use two pointers from both ends, swap characters and move pointers inward until they meet.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = ["h","e","l","l","o"]</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Swap s[0] and s[4]:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">h</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char highlight">o</div><span class="char-index">R</span></div>
                                </div>
                                <p style="text-align: center; margin: 0.5rem 0;">↓ swap ↓</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">o</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char match">h</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Swap s[1] and s[3]:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">o</div></div>
                                    <div class="char-box"><div class="char highlight">e</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char highlight">l</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">h</div></div>
                                </div>
                                <p style="text-align: center; margin: 0.5rem 0;">↓ swap ↓</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">o</div></div>
                                    <div class="char-box"><div class="char match">l</div></div>
                                    <div class="char-box"><div class="char match">l</div></div>
                                    <div class="char-box"><div class="char match">e</div></div>
                                    <div class="char-box"><div class="char match">h</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Result: "olleh"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Initialize left = 0, right = n-1<br>2. While left < right, swap characters<br>3. Move pointers inward<br>4. Done when pointers meet',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};`
        },
        {
            title: 'Reverse Integer',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/reverse-integer/',
            intuition: 'Extract digits from the end using modulo, build reversed number. Check for overflow before multiplying by 10.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">x = 123</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Extract last digit: 123 % 10 = 3</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">result = 0 × 10 + 3 = 3</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">x = 123 / 10 = 12</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Extract next digit: 12 % 10 = 2</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">result = 3 × 10 + 2 = 32</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">x = 12 / 10 = 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Extract last digit: 1 % 10 = 1</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">result = 32 × 10 + 1 = 321</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">x = 1 / 10 = 0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Result: 321</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Extract digits using x % 10<br>2. Build result: result = result * 10 + digit<br>3. Check overflow before each multiplication<br>4. Handle negative numbers',
            timeComplexity: 'O(log x)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int reverse(int x) {
        int result = 0;
        
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            
            // Check for overflow
            if (result > INT_MAX / 10 || 
                (result == INT_MAX / 10 && digit > 7)) {
                return 0;
            }
            if (result < INT_MIN / 10 || 
                (result == INT_MIN / 10 && digit < -8)) {
                return 0;
            }
            
            result = result * 10 + digit;
        }
        
        return result;
    }
};`
        },
        {
            title: 'String to Integer (atoi)',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/string-to-integer-atoi/',
            intuition: 'Parse step by step: skip whitespace, handle sign, convert digits, check overflow. Stop at first non-digit character.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "   -42"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Skip leading whitespace:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char highlight">-</div></div>
                                    <div class="char-box"><div class="char">4</div></div>
                                    <div class="char-box"><div class="char">2</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Handle sign: '-' → negative</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char visited"> </div></div>
                                    <div class="char-box"><div class="char match">-</div></div>
                                    <div class="char-box"><div class="char highlight">4</div></div>
                                    <div class="char-box"><div class="char highlight">2</div></div>
                                </div>
                                <p>sign = -1</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Convert digits:</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">result = 0 × 10 + 4 = 4</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-value">result = 4 × 10 + 2 = 42</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <p>Apply sign: 42 × (-1) = -42</p>
                                <div class="result-badge success">✓ Result: -42</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Skip leading whitespace<br>2. Check for +/- sign<br>3. Convert consecutive digits<br>4. Check overflow at each step<br>5. Apply sign and return',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.length();
        
        // Skip whitespace
        while (i < n && s[i] == ' ') i++;
        
        if (i == n) return 0;
        
        // Handle sign
        int sign = 1;
        if (s[i] == '-' || s[i] == '+') {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }
        
        // Convert digits
        long long result = 0;
        while (i < n && isdigit(s[i])) {
            result = result * 10 + (s[i] - '0');
            
            // Check overflow
            if (sign == 1 && result > INT_MAX) return INT_MAX;
            if (sign == -1 && -result < INT_MIN) return INT_MIN;
            
            i++;
        }
        
        return sign * result;
    }
};`
        },
        {
            title: 'Count and Say',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/count-and-say/',
            intuition: 'Build sequence iteratively. For each term, scan previous term and describe consecutive runs of digits.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Generate countAndSay(4)</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>n = 1:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">1</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>n = 2: Describe "1" → "one 1"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">1</div></div>
                                    <div class="char-box"><div class="char highlight">1</div></div>
                                </div>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">= "11" (one 1)</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>n = 3: Describe "11" → "two 1s"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">2</div></div>
                                    <div class="char-box"><div class="char highlight">1</div></div>
                                </div>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">= "21" (two 1s)</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <p>n = 4: Describe "21" → "one 2, one 1"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">1</div></div>
                                    <div class="char-box"><div class="char match">2</div></div>
                                    <div class="char-box"><div class="char match">1</div></div>
                                    <div class="char-box"><div class="char match">1</div></div>
                                </div>
                                <div class="result-badge success">✓ Result: "1211"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Start with "1"<br>2. For each iteration, scan current string<br>3. Count consecutive same digits<br>4. Append count + digit to new string<br>5. Repeat n-1 times',
            timeComplexity: 'O(2^n) - each term can double',
            spaceComplexity: 'O(2^n)',
            code: `class Solution {
public:
    string countAndSay(int n) {
        string result = "1";
        
        for (int i = 1; i < n; i++) {
            string next = "";
            int j = 0;
            
            while (j < result.length()) {
                char digit = result[j];
                int count = 0;
                
                // Count consecutive same digits
                while (j < result.length() && result[j] == digit) {
                    count++;
                    j++;
                }
                
                next += to_string(count) + digit;
            }
            
            result = next;
        }
        
        return result;
    }
};`
        },
        {
            title: 'Implement strStr()',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/implement-strstr/',
            intuition: 'Slide needle over haystack, checking for match at each position. Can use KMP algorithm for optimal performance.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">haystack = "hello", needle = "ll"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Try position 0: "he" vs "ll"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char mismatch">h</div></div>
                                    <div class="char-box"><div class="char mismatch">e</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">o</div></div>
                                </div>
                                <p>'h' ≠ 'l' → no match</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Try position 1: "el" vs "ll"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">h</div></div>
                                    <div class="char-box"><div class="char mismatch">e</div></div>
                                    <div class="char-box"><div class="char mismatch">l</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">o</div></div>
                                </div>
                                <p>'e' ≠ 'l' → no match</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Try position 2: "ll" vs "ll"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">h</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char match">l</div><span class="char-index">2</span></div>
                                    <div class="char-box"><div class="char match">l</div></div>
                                    <div class="char-box"><div class="char">o</div></div>
                                </div>
                                <div class="result-badge success">✓ Match found at index 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. For each position i in haystack<br>2. Check if needle matches starting at i<br>3. Compare character by character<br>4. Return i if full match found<br>5. Return -1 if no match',
            timeComplexity: 'O(n × m) naive, O(n + m) with KMP',
            spaceComplexity: 'O(1) naive, O(m) with KMP',
            code: `class Solution {
public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;
        
        int n = haystack.length();
        int m = needle.length();
        
        for (int i = 0; i <= n - m; i++) {
            int j = 0;
            while (j < m && haystack[i + j] == needle[j]) {
                j++;
            }
            if (j == m) return i;
        }
        
        return -1;
    }
};`
        }
    ]
};
