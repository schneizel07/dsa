window.patterns['sliding-window'] = {
    icon: '🪟',
    title: 'Sliding Window',
    timeComplexity: 'O(n) typical',
    scenario: 'Apply sliding window technique when you need to find a contiguous substring within the string with specific properties (e.g., maximum sum, minimum size, longest length) and you can adjust the window size dynamically as you traverse the string.',
    clue: 'Problems involving contiguous substrings often hint at the use of sliding window technique. Look for phrases like "substring," "contiguous characters," "sliding window," or hints that a window needs to slide through the string.',
    problems: [
        {
            title: 'Minimum Window Substring',
            difficulty: 'hard',
            link: 'https://leetcode.com/problems/minimum-window-substring/',
            intuition: 'Use two pointers to maintain a window. Expand right to include characters, contract left to minimize window while still containing all target characters. Track character frequencies.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "ADOBECODEBANC", t = "ABC"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Need to find: frequency of t</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'A'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'B'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'C'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Expand window until all characters found:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char window">A</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">D</div></div>
                                    <div class="char-box"><div class="char window">O</div></div>
                                    <div class="char-box"><div class="char window">B</div></div>
                                    <div class="char-box"><div class="char window">E</div></div>
                                    <div class="char-box"><div class="char window">C</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">O</div></div>
                                    <div class="char-box"><div class="char">D</div></div>
                                    <div class="char-box"><div class="char">E</div></div>
                                    <div class="char-box"><div class="char">B</div></div>
                                    <div class="char-box"><div class="char">A</div></div>
                                    <div class="char-box"><div class="char">N</div></div>
                                    <div class="char-box"><div class="char">C</div></div>
                                </div>
                                <p>Window "ADOBEC" contains A, B, C ✓ (len=6)</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Continue searching... Found smaller window:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">A</div></div>
                                    <div class="char-box"><div class="char">D</div></div>
                                    <div class="char-box"><div class="char">O</div></div>
                                    <div class="char-box"><div class="char">B</div></div>
                                    <div class="char-box"><div class="char">E</div></div>
                                    <div class="char-box"><div class="char">C</div></div>
                                    <div class="char-box"><div class="char">O</div></div>
                                    <div class="char-box"><div class="char">D</div></div>
                                    <div class="char-box"><div class="char">E</div></div>
                                    <div class="char-box"><div class="char match">B</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char match">A</div></div>
                                    <div class="char-box"><div class="char match">N</div></div>
                                    <div class="char-box"><div class="char match">C</div><span class="char-index">R</span></div>
                                </div>
                                <div class="result-badge success">✓ "BANC" (len=4) - Minimum window!</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Count frequency of characters in t<br>2. Use two pointers (left, right) for window<br>3. Expand right until window contains all t chars<br>4. Contract left to find minimum valid window<br>5. Track and return minimum window found',
            timeComplexity: 'O(n + m)',
            spaceComplexity: 'O(1) - fixed 128 characters',
            code: `class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";
        
        vector<int> need(128, 0), have(128, 0);
        for (char c : t) need[c]++;
        
        int required = 0;
        for (int i = 0; i < 128; i++) {
            if (need[i] > 0) required++;
        }
        
        int left = 0, formed = 0;
        int minLen = INT_MAX, minStart = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            have[c]++;
            
            if (need[c] > 0 && have[c] == need[c]) {
                formed++;
            }
            
            // Contract window
            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                
                char leftChar = s[left];
                have[leftChar]--;
                if (need[leftChar] > 0 && have[leftChar] < need[leftChar]) {
                    formed--;
                }
                left++;
            }
        }
        
        return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
    }
};`
        },
        {
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
            intuition: 'Maintain a window with no duplicate characters. Use a hash set or map to track characters in current window. When duplicate found, shrink window from left.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "abcabcbb"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Expand window, tracking unique characters:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char window">a</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">b</div></div>
                                    <div class="char-box"><div class="char window">c</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                </div>
                                <p>Current window: "abc" (len=3, all unique)</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'a'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'b'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'c'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Next char 'a' is duplicate! Shrink from left:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char visited">a</div></div>
                                    <div class="char-box"><div class="char window">b</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">c</div></div>
                                    <div class="char-box"><div class="char window">a</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                </div>
                                <p>New window: "bca" (len=3, still max)</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Continue until end. Maximum found:</p>
                                <div class="result-badge success">✓ Maximum length = 3 ("abc")</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use hash map to store last index of each character<br>2. Maintain left pointer of current window<br>3. For each character, if seen and within window, move left<br>4. Update max length after each character<br>5. Return maximum length found',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(min(m, n)) where m is charset size',
            code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> lastIndex;
        int maxLen = 0, left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            
            // If char seen and within current window
            if (lastIndex.count(c) && lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            
            lastIndex[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`
        },
        {
            title: 'Longest Substring with At Most K Distinct Characters',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/',
            intuition: 'Maintain a window where the number of distinct characters is at most k. Use a hash map to count frequencies. When distinct count exceeds k, shrink from left.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "eceba", k = 2</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Build window with at most 2 distinct chars:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char window">e</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">c</div></div>
                                    <div class="char-box"><div class="char window">e</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                </div>
                                <p>Window "ece": 2 distinct chars (e, c) ✓</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'e'</span><span class="freq-count">: 2</span></div>
                                    <div class="freq-item"><span class="freq-char">'c'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Adding 'b' would make 3 distinct. Shrink first:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char visited">e</div></div>
                                    <div class="char-box"><div class="char visited">c</div></div>
                                    <div class="char-box"><div class="char window">e</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">b</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                </div>
                                <p>Window "eb": 2 distinct chars ✓</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Maximum window found was "ece" with length 3</p>
                                <div class="result-badge success">✓ Maximum length = 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use hash map to count character frequencies<br>2. Expand window by adding characters<br>3. When distinct count > k, shrink from left<br>4. Update max length when window is valid<br>5. Return maximum length',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(k)',
            code: `class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        if (k == 0) return 0;
        
        unordered_map<char, int> freq;
        int maxLen = 0, left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            freq[s[right]]++;
            
            // Shrink window if too many distinct chars
            while (freq.size() > k) {
                freq[s[left]]--;
                if (freq[s[left]] == 0) {
                    freq.erase(s[left]);
                }
                left++;
            }
            
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`
        },
        {
            title: 'Find All Anagrams in a String',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
            intuition: 'Use a fixed-size sliding window equal to pattern length. Compare character frequencies of window with pattern. Slide window one character at a time.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "cbaebabacd", p = "abc"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Pattern frequency:</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'a'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'b'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'c'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Window at index 0: "cba"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">c</div><span class="char-index">0</span></div>
                                    <div class="char-box"><div class="char match">b</div></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">d</div></div>
                                </div>
                                <p>"cba" is anagram of "abc" ✓</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Window at index 6: "bac"</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char">e</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">a</div></div>
                                    <div class="char-box"><div class="char match">b</div><span class="char-index">6</span></div>
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char">d</div></div>
                                </div>
                                <p>"bac" is anagram of "abc" ✓</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Answer: [0, 6]</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Create frequency map for pattern<br>2. Use sliding window of pattern length<br>3. Track how many characters match exactly<br>4. Slide window: remove left char, add right char<br>5. Add index to result when all chars match',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) - fixed 26 chars',
            code: `class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> result;
        if (s.length() < p.length()) return result;
        
        vector<int> pCount(26, 0), sCount(26, 0);
        
        // Count pattern characters
        for (char c : p) {
            pCount[c - 'a']++;
        }
        
        // Initial window
        for (int i = 0; i < p.length(); i++) {
            sCount[s[i] - 'a']++;
        }
        
        if (sCount == pCount) result.push_back(0);
        
        // Slide window
        for (int i = p.length(); i < s.length(); i++) {
            sCount[s[i] - 'a']++;                    // Add right
            sCount[s[i - p.length()] - 'a']--;       // Remove left
            
            if (sCount == pCount) {
                result.push_back(i - p.length() + 1);
            }
        }
        
        return result;
    }
};`
        },
        {
            title: 'Longest Repeating Character Replacement',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
            intuition: 'Keep a window where (window length - max frequency char) <= k. This means we can replace at most k characters to make all same. Track max frequency in window.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "AABABBA", k = 1</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Window "AABA" (len=4, maxFreq=3 for 'A'):</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char window">A</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">A</div></div>
                                    <div class="char-box"><div class="char window">B</div></div>
                                    <div class="char-box"><div class="char window">A</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">B</div></div>
                                    <div class="char-box"><div class="char">B</div></div>
                                    <div class="char-box"><div class="char">A</div></div>
                                </div>
                                <p>Replacements needed: 4 - 3 = 1 ≤ k ✓</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'A'</span><span class="freq-count">: 3 (max)</span></div>
                                    <div class="freq-item"><span class="freq-char">'B'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Try to expand more:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char window">A</div><span class="char-index">L</span></div>
                                    <div class="char-box"><div class="char window">A</div></div>
                                    <div class="char-box"><div class="char window">B</div></div>
                                    <div class="char-box"><div class="char window">A</div></div>
                                    <div class="char-box"><div class="char mismatch">B</div><span class="char-index">R</span></div>
                                    <div class="char-box"><div class="char">B</div></div>
                                    <div class="char-box"><div class="char">A</div></div>
                                </div>
                                <p>Replacements needed: 5 - 3 = 2 > k ✗</p>
                                <p>Need to shrink window from left</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Maximum valid window length found:</p>
                                <div class="result-badge success">✓ Maximum length = 4</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use sliding window with character frequency map<br>2. Track maximum frequency character in window<br>3. Valid window: (length - maxFreq) <= k<br>4. Expand right, shrink left when invalid<br>5. Return maximum valid window length',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) - fixed 26 chars',
            code: `class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int maxFreq = 0, maxLen = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            count[s[right] - 'A']++;
            maxFreq = max(maxFreq, count[s[right] - 'A']);
            
            // Window is invalid if we need more than k replacements
            while (right - left + 1 - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`
        }
    ]
};
