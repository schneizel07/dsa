window.patterns['two-pointers'] = {
    icon: '👆👆',
    title: 'Two Pointers',
    timeComplexity: 'O(n) typical',
    scenario: 'Utilize two pointers when the problem involves searching for pairs or triplets of characters within a string that satisfy specific conditions, particularly in sorted strings or when the order matters.',
    clue: 'Look for problem descriptions mentioning the need to compare characters from both ends of the string or to traverse the string simultaneously with two pointers. Phrases like "pair of characters," "triplet of characters," or "sorted string" indicate the potential application of two pointers.',
    problems: [
        {
            title: 'Valid Palindrome',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/valid-palindrome/',
            intuition: 'A palindrome reads the same forwards and backwards. Use two pointers from both ends, skip non-alphanumeric characters, and compare characters (case-insensitive).',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Example: "A man, a plan, a canal: Panama"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Clean string: "amanaplanacanalpanama"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">a</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char">m</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">n</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">p</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">n</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">n</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">p</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">n</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">m</div></div>
                                    <div class="char-box"><div class="char highlight">a</div><span class="char-index">R</span></div>
                                </div>
                                <div class="comparison-box">
                                    <div class="compare-item"><span class="compare-label">Left</span><span class="compare-value">a</span></div>
                                    <span class="compare-equals">=</span>
                                    <div class="compare-item"><span class="compare-label">Right</span><span class="compare-value">a</span></div>
                                    <div class="result-badge success">✓ Match</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Continue until pointers meet - all characters match!</p>
                                <div class="result-badge success">✓ Valid Palindrome</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Initialize left pointer at start, right at end<br>2. Skip non-alphanumeric characters<br>3. Compare characters (case-insensitive)<br>4. If mismatch, return false<br>5. Move pointers inward and repeat',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric from left
            while (left < right && !isalnum(s[left])) {
                left++;
            }
            // Skip non-alphanumeric from right
            while (left < right && !isalnum(s[right])) {
                right--;
            }
            
            // Compare characters (case-insensitive)
            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
};`
        },
        {
            title: 'Reverse Words in a String',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/reverse-words-in-a-string/',
            intuition: 'Reverse the entire string first, then reverse each word individually. Use two pointers to identify word boundaries and perform in-place reversal.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Example: "the sky is blue"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Original string:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">t</div></div>
                                    <div class="char-box"><div class="char">h</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char">s</div></div>
                                    <div class="char-box"><div class="char">k</div></div>
                                    <div class="char-box"><div class="char">y</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char">i</div></div>
                                    <div class="char-box"><div class="char">s</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">l</div></div>
                                    <div class="char-box"><div class="char">u</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Reverse entire string:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">e</div></div>
                                    <div class="char-box"><div class="char highlight">u</div></div>
                                    <div class="char-box"><div class="char highlight">l</div></div>
                                    <div class="char-box"><div class="char highlight">b</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char highlight">s</div></div>
                                    <div class="char-box"><div class="char highlight">i</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char highlight">y</div></div>
                                    <div class="char-box"><div class="char highlight">k</div></div>
                                    <div class="char-box"><div class="char highlight">s</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char highlight">e</div></div>
                                    <div class="char-box"><div class="char highlight">h</div></div>
                                    <div class="char-box"><div class="char highlight">t</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Reverse each word individually:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">b</div></div>
                                    <div class="char-box"><div class="char match">l</div></div>
                                    <div class="char-box"><div class="char match">u</div></div>
                                    <div class="char-box"><div class="char match">e</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char match">i</div></div>
                                    <div class="char-box"><div class="char match">s</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char match">s</div></div>
                                    <div class="char-box"><div class="char match">k</div></div>
                                    <div class="char-box"><div class="char match">y</div></div>
                                    <div class="char-box"><div class="char"> </div></div>
                                    <div class="char-box"><div class="char match">t</div></div>
                                    <div class="char-box"><div class="char match">h</div></div>
                                    <div class="char-box"><div class="char match">e</div></div>
                                </div>
                                <div class="result-badge success">Result: "blue is sky the"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Trim leading/trailing spaces<br>2. Reverse the entire string<br>3. Use two pointers to find each word<br>4. Reverse each word in place<br>5. Handle multiple spaces between words',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) in-place',
            code: `class Solution {
public:
    string reverseWords(string s) {
        // Reverse entire string
        reverse(s.begin(), s.end());
        
        int n = s.length();
        int idx = 0;  // Position to write
        
        for (int start = 0; start < n; start++) {
            if (s[start] != ' ') {
                // Add space before word (except first word)
                if (idx != 0) s[idx++] = ' ';
                
                // Find end of word and copy
                int end = start;
                while (end < n && s[end] != ' ') {
                    s[idx++] = s[end++];
                }
                
                // Reverse the word we just wrote
                reverse(s.begin() + idx - (end - start), s.begin() + idx);
                
                start = end;
            }
        }
        
        s.resize(idx);
        return s;
    }
};`
        },
        {
            title: 'Longest Palindromic Substring',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-palindromic-substring/',
            intuition: 'Expand around each center. For each position, treat it as the center of a potential palindrome and expand outward while characters match. Handle both odd and even length palindromes.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Example: "babad"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Try center at index 1 ('a'), expand outward:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">b</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char highlight">a</div><span class="char-index">C</span></div>
                                    <div class="char-box"><div class="char match">b</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">d</div></div>
                                </div>
                                <div class="comparison-box">
                                    <div class="compare-item"><span class="compare-label">s[0]</span><span class="compare-value">b</span></div>
                                    <span class="compare-equals">=</span>
                                    <div class="compare-item"><span class="compare-label">s[2]</span><span class="compare-value">b</span></div>
                                    <div class="result-badge success">✓ "bab" is palindrome (len=3)</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Try center at index 2 ('b'), expand outward:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char match">a</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char highlight">b</div><span class="char-index">C</span></div>
                                    <div class="char-box"><div class="char match">a</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">d</div></div>
                                </div>
                                <div class="comparison-box">
                                    <div class="compare-item"><span class="compare-label">s[1]</span><span class="compare-value">a</span></div>
                                    <span class="compare-equals">=</span>
                                    <div class="compare-item"><span class="compare-label">s[3]</span><span class="compare-value">a</span></div>
                                    <div class="result-badge success">✓ "aba" is palindrome (len=3)</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Both "bab" and "aba" have length 3. Return either one.</p>
                                <div class="result-badge success">Answer: "bab" or "aba"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. For each index, treat it as center<br>2. Expand outward for odd-length palindrome<br>3. Expand outward for even-length palindrome<br>4. Track the longest palindrome found<br>5. Return the substring',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        
        int start = 0, maxLen = 1;
        
        for (int i = 0; i < s.length(); i++) {
            // Odd length palindrome (center at i)
            int len1 = expandAroundCenter(s, i, i);
            // Even length palindrome (center between i and i+1)
            int len2 = expandAroundCenter(s, i, i + 1);
            
            int len = max(len1, len2);
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }
        
        return s.substr(start, maxLen);
    }
    
private:
    int expandAroundCenter(const string& s, int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};`
        },
        {
            title: 'Implement strStr()',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/implement-strstr/',
            intuition: 'Find the first occurrence of needle in haystack. Use two pointers - one for haystack position, one for needle matching. Reset needle pointer on mismatch.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">haystack = "sadbutsad", needle = "sad"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Start matching from index 0:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">s</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">d</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">u</div></div>
                                    <div class="char-box"><div class="char">t</div></div>
                                    <div class="char-box"><div class="char">s</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">d</div></div>
                                </div>
                                <p style="margin-top: 0.5rem;">Needle to match:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">s</div></div>
                                    <div class="char-box"><div class="char highlight">a</div></div>
                                    <div class="char-box"><div class="char highlight">d</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>All characters match! Found at index 0.</p>
                                <div class="result-badge success">✓ Return index 0</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Iterate through haystack with window of needle length<br>2. For each position, compare with needle<br>3. If all characters match, return starting index<br>4. If no match found, return -1',
            timeComplexity: 'O(n × m)',
            spaceComplexity: 'O(1)',
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
            if (j == m) {
                return i;  // Found match
            }
        }
        
        return -1;  // No match found
    }
};`
        },
        {
            title: 'Remove Duplicates from Sorted Array',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
            intuition: 'Use slow pointer for writing unique elements, fast pointer for scanning. When fast finds a new unique element, write it at slow position.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">Example: s = "abbaca"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Process character by character, remove adjacent duplicates:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char mismatch">b</div></div>
                                    <div class="char-box"><div class="char mismatch">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                </div>
                                <p>Found duplicate 'bb' → remove</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>After removing 'bb': "aaca"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char mismatch">a</div></div>
                                    <div class="char-box"><div class="char mismatch">a</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                </div>
                                <p>Found duplicate 'aa' → remove</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Final result:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                </div>
                                <div class="result-badge success">Answer: "ca"</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use stack-like approach with result string<br>2. For each character, check if it matches last in result<br>3. If match, pop from result (remove duplicate)<br>4. Otherwise, add to result<br>5. Return final result',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            code: `class Solution {
public:
    string removeDuplicates(string s) {
        string result;
        
        for (char c : s) {
            if (!result.empty() && result.back() == c) {
                result.pop_back();  // Remove adjacent duplicate
            } else {
                result.push_back(c);
            }
        }
        
        return result;
    }
};`
        }
    ]
};
