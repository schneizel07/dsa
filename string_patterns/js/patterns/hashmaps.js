window.patterns['hashmaps'] = {
    icon: '🗺️',
    title: 'Hashmaps',
    timeComplexity: 'O(n) typical',
    scenario: 'Employ hashmaps when the problem involves frequency counting, grouping characters based on some property, or checking for the existence of certain characters in the string. Hashmaps offer efficient storage and retrieval of characters by keys.',
    clue: 'Phrases like "count," "frequency," "group," or "exist" suggest the potential use of hashmaps in the problem. Problems requiring counting occurrences, grouping similar characters, or checking for specific characters often indicate the application of hashmaps.',
    problems: [
        {
            title: 'Group Anagrams',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/group-anagrams/',
            intuition: 'Anagrams have the same characters in different orders. Sort each word to get a canonical form, then group words with the same sorted form using a hashmap.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">strs = ["eat", "tea", "tan", "ate", "nat", "bat"]</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Sort each word to get key:</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">eat</div>
                                        <span class="hashmap-arrow">→ sort →</span>
                                        <div class="hashmap-value">aet</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">tea</div>
                                        <span class="hashmap-arrow">→ sort →</span>
                                        <div class="hashmap-value">aet</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">tan</div>
                                        <span class="hashmap-arrow">→ sort →</span>
                                        <div class="hashmap-value">ant</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Group by sorted key:</p>
                                <div class="hashmap-display">
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">aet</div>
                                        <span class="hashmap-arrow">→</span>
                                        <div class="hashmap-value" style="background: rgba(34, 197, 94, 0.2); color: #22c55e;">["eat", "tea", "ate"]</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">ant</div>
                                        <span class="hashmap-arrow">→</span>
                                        <div class="hashmap-value" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">["tan", "nat"]</div>
                                    </div>
                                    <div class="hashmap-row">
                                        <div class="hashmap-key" style="width: auto; padding: 0.5rem 1rem;">abt</div>
                                        <span class="hashmap-arrow">→</span>
                                        <div class="hashmap-value" style="background: rgba(249, 115, 22, 0.2); color: #f97316;">["bat"]</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Return grouped values</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Create hashmap with sorted string as key<br>2. For each word, sort it to get the key<br>3. Add original word to that key\'s group<br>4. Return all values from the hashmap',
            timeComplexity: 'O(n × k log k) where k is max word length',
            spaceComplexity: 'O(n × k)',
            code: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        
        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            groups[key].push_back(s);
        }
        
        vector<vector<string>> result;
        for (auto& [key, group] : groups) {
            result.push_back(group);
        }
        
        return result;
    }
};`
        },
        {
            title: 'First Unique Character in a String',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
            intuition: 'Count frequency of each character using a hashmap. Then scan the string again to find the first character with frequency 1.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "leetcode"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Count character frequencies:</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'l'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'e'</span><span class="freq-count">: 3</span></div>
                                    <div class="freq-item"><span class="freq-char">'t'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'c'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'o'</span><span class="freq-count">: 1</span></div>
                                    <div class="freq-item"><span class="freq-char">'d'</span><span class="freq-count">: 1</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Scan for first char with count = 1:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">l</div><span class="char-index">0</span></div>
                                    <div class="char-box"><div class="char mismatch">e</div><span class="char-index">1</span></div>
                                    <div class="char-box"><div class="char mismatch">e</div><span class="char-index">2</span></div>
                                    <div class="char-box"><div class="char">t</div><span class="char-index">3</span></div>
                                    <div class="char-box"><div class="char">c</div><span class="char-index">4</span></div>
                                    <div class="char-box"><div class="char">o</div><span class="char-index">5</span></div>
                                    <div class="char-box"><div class="char">d</div><span class="char-index">6</span></div>
                                    <div class="char-box"><div class="char mismatch">e</div><span class="char-index">7</span></div>
                                </div>
                                <p>'l' at index 0 has count 1 → First unique!</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Return index 0</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. First pass: count frequency of each character<br>2. Second pass: find first character with count = 1<br>3. Return its index, or -1 if none found',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) - fixed 26 chars',
            code: `class Solution {
public:
    int firstUniqChar(string s) {
        vector<int> count(26, 0);
        
        // Count frequencies
        for (char c : s) {
            count[c - 'a']++;
        }
        
        // Find first unique
        for (int i = 0; i < s.length(); i++) {
            if (count[s[i] - 'a'] == 1) {
                return i;
            }
        }
        
        return -1;
    }
};`
        },
        {
            title: 'Valid Anagram',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/valid-anagram/',
            intuition: 'Two strings are anagrams if they have the same character frequencies. Count characters in first string, then verify with second string.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "anagram", t = "nagaram"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Count chars in s, decrement for t:</p>
                                <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                                    <div>
                                        <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">String s:</p>
                                        <div class="string-display">
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">n</div></div>
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">g</div></div>
                                            <div class="char-box"><div class="char">r</div></div>
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">m</div></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">String t:</p>
                                        <div class="string-display">
                                            <div class="char-box"><div class="char">n</div></div>
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">g</div></div>
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">r</div></div>
                                            <div class="char-box"><div class="char">a</div></div>
                                            <div class="char-box"><div class="char">m</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>After processing both strings, all counts = 0:</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'a'</span><span class="freq-count">: 0 ✓</span></div>
                                    <div class="freq-item"><span class="freq-char">'n'</span><span class="freq-count">: 0 ✓</span></div>
                                    <div class="freq-item"><span class="freq-char">'g'</span><span class="freq-count">: 0 ✓</span></div>
                                    <div class="freq-item"><span class="freq-char">'r'</span><span class="freq-count">: 0 ✓</span></div>
                                    <div class="freq-item"><span class="freq-char">'m'</span><span class="freq-count">: 0 ✓</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Valid Anagram</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. If lengths differ, return false<br>2. Count characters in first string (+1)<br>3. Decrement counts for second string (-1)<br>4. If all counts are 0, they are anagrams',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) - fixed 26 chars',
            code: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        
        vector<int> count(26, 0);
        
        for (int i = 0; i < s.length(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        
        for (int c : count) {
            if (c != 0) return false;
        }
        
        return true;
    }
};`
        },
        {
            title: 'Longest Palindromic Substring',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-palindromic-substring/',
            intuition: 'For a string to form a palindrome, at most one character can have odd frequency (the middle character). Count frequencies and check this condition.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">s = "abccccdd"</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Count character frequencies:</p>
                                <div class="freq-counter">
                                    <div class="freq-item"><span class="freq-char">'a'</span><span class="freq-count">: 1 (odd)</span></div>
                                    <div class="freq-item"><span class="freq-char">'b'</span><span class="freq-count">: 1 (odd)</span></div>
                                    <div class="freq-item"><span class="freq-char">'c'</span><span class="freq-count">: 4 (even)</span></div>
                                    <div class="freq-item"><span class="freq-char">'d'</span><span class="freq-count">: 2 (even)</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Build longest palindrome:</p>
                                <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                                    <li>Use all 4 'c's → 4 chars</li>
                                    <li>Use all 2 'd's → 2 chars</li>
                                    <li>Use 1 'a' OR 'b' in middle → 1 char</li>
                                </ul>
                                <div class="string-display" style="margin-top: 1rem;">
                                    <div class="char-box"><div class="char match">d</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char highlight">a</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">d</div></div>
                                </div>
                                <p style="text-align: center; margin-top: 0.5rem;">Example: "dccaccd"</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <div class="result-badge success">✓ Longest palindrome length = 7</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Count frequency of each character<br>2. Add even frequencies fully to length<br>3. Add (odd frequency - 1) to length<br>4. If any odd frequency exists, add 1 for middle<br>5. Return total length',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1) - fixed charset',
            code: `class Solution {
public:
    int longestPalindrome(string s) {
        vector<int> count(128, 0);
        
        for (char c : s) {
            count[c]++;
        }
        
        int length = 0;
        bool hasOdd = false;
        
        for (int c : count) {
            if (c % 2 == 0) {
                length += c;
            } else {
                length += c - 1;  // Use even part
                hasOdd = true;
            }
        }
        
        // Add 1 for middle character if any odd exists
        return hasOdd ? length + 1 : length;
    }
};`
        },
        {
            title: 'String Compression',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/string-compression/',
            intuition: 'Count consecutive characters and write count after character. Use two pointers - one for reading, one for writing.',
            visual: `
                <div class="visual-container">
                    <div class="visual-title">chars = ["a","a","b","b","c","c","c"]</div>
                    
                    <div class="step-list">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Count consecutive 'a's: 2</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char highlight">a</div></div>
                                    <div class="char-box"><div class="char highlight">a</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">b</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                    <div class="char-box"><div class="char">c</div></div>
                                </div>
                                <p>Write: "a2"</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Count consecutive 'b's: 2, then 'c's: 3</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char visited">a</div></div>
                                    <div class="char-box"><div class="char visited">a</div></div>
                                    <div class="char-box"><div class="char highlight">b</div></div>
                                    <div class="char-box"><div class="char highlight">b</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Final compressed array:</p>
                                <div class="string-display">
                                    <div class="char-box"><div class="char match">a</div></div>
                                    <div class="char-box"><div class="char match">2</div></div>
                                    <div class="char-box"><div class="char match">b</div></div>
                                    <div class="char-box"><div class="char match">2</div></div>
                                    <div class="char-box"><div class="char match">c</div></div>
                                    <div class="char-box"><div class="char match">3</div></div>
                                </div>
                                <div class="result-badge success">✓ Return length 6</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            approach: '1. Use write pointer for output position<br>2. Count consecutive same characters<br>3. Write character, then count if > 1<br>4. Handle multi-digit counts<br>5. Return new length',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `class Solution {
public:
    int compress(vector<char>& chars) {
        int write = 0;  // Write position
        int i = 0;
        
        while (i < chars.size()) {
            char currentChar = chars[i];
            int count = 0;
            
            // Count consecutive characters
            while (i < chars.size() && chars[i] == currentChar) {
                i++;
                count++;
            }
            
            // Write character
            chars[write++] = currentChar;
            
            // Write count if > 1
            if (count > 1) {
                string countStr = to_string(count);
                for (char c : countStr) {
                    chars[write++] = c;
                }
            }
        }
        
        return write;
    }
};`
        }
    ]
};
