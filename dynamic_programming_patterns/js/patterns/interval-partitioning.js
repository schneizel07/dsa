// ==========================================
// INTERVAL PARTITIONING PATTERN
// Non-overlapping Intervals, Partition Labels, Max Non-Overlapping Subarrays, Split Array Consecutive, Longest Continuous Increasing
// ==========================================

window.patterns['interval-partitioning'] = {
    title: "Interval Partitioning",
    scenario: "Problems involving scheduling, selecting non-overlapping intervals, or partitioning arrays/intervals into valid groups. Often requires greedy approaches combined with sorting or DP.",
    clue: "Look for: interval scheduling, removing minimum to make non-overlapping, partitioning into groups with constraints, or finding maximum independent intervals.",
    problems: [
        {
            title: "435. Non-overlapping Intervals",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/non-overlapping-intervals/",
            description: "Given intervals, find minimum number of intervals to remove to make the rest non-overlapping.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📅 Non-overlapping Intervals: [[1,2],[2,3],[3,4],[1,3]]</div>
                    
                    <div class="interval-visual">
                        <div class="interval-bar">
                            <div class="interval-segment selected" style="margin-left: 10%; width: 10%;">[1,2]</div>
                        </div>
                        <div class="interval-bar">
                            <div class="interval-segment selected" style="margin-left: 20%; width: 10%;">[2,3]</div>
                        </div>
                        <div class="interval-bar">
                            <div class="interval-segment selected" style="margin-left: 30%; width: 10%;">[3,4]</div>
                        </div>
                        <div class="interval-bar">
                            <div class="interval-segment overlap" style="margin-left: 10%; width: 20%;">[1,3] ❌</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Greedy Strategy</div>
                        <div class="insight-content">
                            <p>• Sort by end time (earliest ending first)</p>
                            <p>• Greedily select intervals that don't overlap with previous</p>
                            <p>• Max non-overlapping = n - removals needed</p>
                            <p>• Equivalent to: find maximum number of non-overlapping intervals</p>
                        </div>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box success">[1,2]</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box success">[2,3]</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box success">[3,4]</div>
                    </div>
                    <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">[1,3] overlaps with [1,2] → remove it</p>
                    
                    <div class="result-box">
                        <div class="result-title">Minimum Intervals to Remove</div>
                        <div class="result-value">1 (remove [1,3])</div>
                    </div>
                </div>
            `,
            approach: "Sort by end time. Greedily pick intervals that don't overlap with the last picked. Count non-overlapping intervals, answer = total - count. This is the classic interval scheduling problem.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        
        // Sort by end time
        sort(intervals.begin(), intervals.end(), 
             [](auto& a, auto& b) { return a[1] < b[1]; });
        
        int count = 1; // Count of non-overlapping intervals
        int end = intervals[0][1];
        
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= end) {
                count++;
                end = intervals[i][1];
            }
        }
        
        return intervals.size() - count;
    }
};`
        },
        {
            title: "763. Partition Labels",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/partition-labels/",
            description: "Partition string s so that each letter appears in at most one part. Return sizes of these parts.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🏷️ Partition Labels: "ababcbacadefegdehijhklij"</div>
                    
                    <div class="subsequence-visual">
                        <div class="seq-char match">a</div>
                        <div class="seq-char match">b</div>
                        <div class="seq-char match">a</div>
                        <div class="seq-char match">b</div>
                        <div class="seq-char match">c</div>
                        <div class="seq-char match">b</div>
                        <div class="seq-char match">a</div>
                        <div class="seq-char match">c</div>
                        <div class="seq-char match">a</div>
                        <div class="seq-char current">d</div>
                        <div class="seq-char current">e</div>
                        <div class="seq-char current">f</div>
                        <div class="seq-char current">e</div>
                        <div class="seq-char current">g</div>
                        <div class="seq-char current">d</div>
                        <div class="seq-char current">e</div>
                        <div class="seq-char">h</div>
                        <div class="seq-char">i</div>
                        <div class="seq-char">j</div>
                        <div class="seq-char">h</div>
                        <div class="seq-char">k</div>
                        <div class="seq-char">l</div>
                        <div class="seq-char">i</div>
                        <div class="seq-char">j</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Two-Pass Strategy</div>
                        <div class="insight-content">
                            <p>• First pass: record last occurrence of each character</p>
                            <p>• Second pass: expand partition to include all chars' last occurrences</p>
                            <p>• When current position equals partition end, cut partition</p>
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card optimized">
                            <div class="approach-title">Partition 1</div>
                            <div class="approach-detail">"ababcbaca"</div>
                            <div class="approach-detail">Size = 9</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Partition 2</div>
                            <div class="approach-detail">"defegde"</div>
                            <div class="approach-detail">Size = 7</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Partition 3</div>
                            <div class="approach-detail">"hijhklij"</div>
                            <div class="approach-detail">Size = 8</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Partition Sizes</div>
                        <div class="result-value">[9, 7, 8]</div>
                    </div>
                </div>
            `,
            approach: "First, find last occurrence of each character. Then iterate: for each char, extend partition end to max(end, lastOccurrence[char]). When i == end, partition is complete.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(26) = O(1)",
            code: `class Solution {
public:
    vector<int> partitionLabels(string s) {
        // Find last occurrence of each character
        vector<int> last(26, 0);
        for (int i = 0; i < s.size(); i++) {
            last[s[i] - 'a'] = i;
        }
        
        vector<int> result;
        int start = 0, end = 0;
        
        for (int i = 0; i < s.size(); i++) {
            end = max(end, last[s[i] - 'a']);
            if (i == end) {
                result.push_back(end - start + 1);
                start = end + 1;
            }
        }
        return result;
    }
};`
        },
        {
            title: "1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target/",
            description: "Return the maximum number of non-overlapping subarrays with sum equal to target.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🎯 Non-Overlapping Subarrays: nums=[1,1,1,1,1], target=2</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td class="dp-cell match">1</td>
                                <td class="dp-cell match">1</td>
                                <td class="dp-cell current">1</td>
                                <td class="dp-cell current">1</td>
                                <td class="dp-cell">1</td>
                            </tr>
                            <tr>
                                <td>Prefix</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell highlight">2</td>
                                <td class="dp-cell">3</td>
                                <td class="dp-cell highlight">4</td>
                                <td class="dp-cell">5</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Greedy + Prefix Sum</div>
                        <div class="insight-content">
                            <p>• Use prefix sum with hashmap to find subarrays with sum = target</p>
                            <p>• Greedy: when valid subarray found, take it immediately</p>
                            <p>• Reset hashmap after taking to ensure non-overlapping</p>
                            <p>• Only need to track if prefix seen, not how many times</p>
                        </div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card optimized">
                            <div class="approach-title">Subarray 1</div>
                            <div class="approach-detail">[1, 1] indices 0-1</div>
                            <div class="approach-detail">Sum = 2 ✓</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subarray 2</div>
                            <div class="approach-detail">[1, 1] indices 2-3</div>
                            <div class="approach-detail">Sum = 2 ✓</div>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Non-Overlapping Subarrays</div>
                        <div class="result-value">2</div>
                    </div>
                </div>
            `,
            approach: "Use prefix sum with set. When valid subarray found (prefix - target exists in set), increment count and reset set with only current prefix. This ensures non-overlapping greedily.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    int maxNonOverlapping(vector<int>& nums, int target) {
        unordered_set<int> prefixSet;
        prefixSet.insert(0);
        
        int count = 0, prefix = 0;
        for (int num : nums) {
            prefix += num;
            
            if (prefixSet.count(prefix - target)) {
                count++;
                prefixSet.clear();
            }
            prefixSet.insert(prefix);
        }
        return count;
    }
};`
        },
        {
            title: "659. Split Array into Consecutive Subsequences",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/split-array-into-consecutive-subsequences/",
            description: "Given sorted array, check if it can be split into subsequences of length ≥ 3, where each subsequence consists of consecutive integers.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔗 Split into Consecutive: [1,2,3,3,4,5]</div>
                    
                    <div class="state-flow">
                        <div class="state-box success">1</div>
                        <div class="state-box success">2</div>
                        <div class="state-box success">3</div>
                        <div class="state-box current">3</div>
                        <div class="state-box current">4</div>
                        <div class="state-box current">5</div>
                    </div>
                    
                    <div class="approach-comparison">
                        <div class="approach-card optimized">
                            <div class="approach-title">Subsequence 1</div>
                            <div class="approach-detail">[1, 2, 3]</div>
                            <div class="approach-detail">Length = 3 ✓</div>
                        </div>
                        <div class="approach-card optimized">
                            <div class="approach-title">Subsequence 2</div>
                            <div class="approach-detail">[3, 4, 5]</div>
                            <div class="approach-detail">Length = 3 ✓</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Greedy Strategy</div>
                        <div class="insight-content">
                            <p>• For each number, prefer extending existing subsequence over starting new</p>
                            <p>• Track: count of each number, subsequences ending at each number</p>
                            <p>• If can't extend and can't start new valid sequence → false</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Decision Priority</div>
                        <div class="recurrence-formula">
                            1. Extend existing subsequence ending at num-1<br>
                            2. Start new subsequence num, num+1, num+2 if all available
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Can Split?</div>
                        <div class="result-value">True ✓</div>
                    </div>
                </div>
            `,
            approach: "Use two hashmaps: count of each number, and count of subsequences needing each number next. For each number: try to extend existing subsequence, else try to start new one with next 2 numbers.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> count, need;
        
        for (int num : nums) count[num]++;
        
        for (int num : nums) {
            if (count[num] == 0) continue;
            
            if (need[num] > 0) {
                // Extend existing subsequence
                need[num]--;
                need[num + 1]++;
            } else if (count[num + 1] > 0 && count[num + 2] > 0) {
                // Start new subsequence
                count[num + 1]--;
                count[num + 2]--;
                need[num + 3]++;
            } else {
                return false;
            }
            count[num]--;
        }
        return true;
    }
};`
        },
        {
            title: "674. Longest Continuous Increasing Subsequence",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/longest-continuous-increasing-subsequence/",
            description: "Find the length of the longest continuous strictly increasing subsequence (subarray).",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📈 Longest Continuous Increasing: [1,3,5,4,7]</div>
                    
                    <div class="dp-table-container">
                        <table class="dp-table">
                            <tr>
                                <th>Index</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td class="dp-cell highlight">1</td>
                                <td class="dp-cell highlight">3</td>
                                <td class="dp-cell highlight">5</td>
                                <td class="dp-cell">4</td>
                                <td class="dp-cell">7</td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                                <td class="dp-cell current">3</td>
                                <td class="dp-cell">1</td>
                                <td class="dp-cell">2</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="state-flow">
                        <div class="state-box success">1</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box success">3</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box success">5</div>
                        <span class="state-arrow">✗</span>
                        <div class="state-box">4</div>
                        <span class="state-arrow">→</span>
                        <div class="state-box">7</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Simple Sliding Window</div>
                        <div class="insight-content">
                            <p>• Track current streak length</p>
                            <p>• If nums[i] > nums[i-1], extend streak</p>
                            <p>• Otherwise, reset streak to 1</p>
                            <p>• Track maximum streak seen</p>
                        </div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Logic</div>
                        <div class="recurrence-formula">
                            if nums[i] > nums[i-1]: length++<br>
                            else: length = 1
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Longest Continuous Increasing</div>
                        <div class="result-value">3 (subarray [1, 3, 5])</div>
                    </div>
                </div>
            `,
            approach: "Simple linear scan. Maintain current increasing streak length. When sequence breaks (current ≤ previous), reset length to 1. Track and return maximum length seen.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int findLengthOfLCIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        int maxLen = 1, currLen = 1;
        
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] > nums[i-1]) {
                currLen++;
                maxLen = max(maxLen, currLen);
            } else {
                currLen = 1;
            }
        }
        return maxLen;
    }
};`
        }
    ]
};
