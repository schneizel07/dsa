// Pattern 6: Construction and Manipulation
const constructionProblems = {
    title: "Construction and Manipulation",
    scenario: "You need to construct, modify, or manipulate data structures using priority queues based on specific rules.",
    clue: "Look for problems where you construct or manipulate data structures based on specific rules using priority queues.",
    problems: [
        {
            number: 621,
            title: "Task Scheduler",
            link: "https://leetcode.com/problems/task-scheduler/",
            difficulty: "Medium",
            intuition: "Schedule tasks to minimize idle time. Always pick the most frequent available task. Use a max-heap for task counts and a queue for cooling tasks.",
            approach: [
                "Count frequency of each task",
                "Use max-heap to always pick most frequent task",
                "Use queue for tasks in cooldown: {count, available_time}",
                "Each cycle: pick from heap, decrement, add to cooldown",
                "Move tasks from cooldown back to heap when ready",
                "Count total time including idle slots"
            ],
            timeComplexity: "O(n × m) where m = cooling interval",
            spaceComplexity: "O(26) = O(1)",
            code: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        for (char task : tasks) {
            freq[task - 'A']++;
        }
        
        // Max-heap of task frequencies
        priority_queue<int> maxHeap;
        for (int f : freq) {
            if (f > 0) maxHeap.push(f);
        }
        
        int time = 0;
        queue<pair<int, int>> cooldown;  // {count, available_time}
        
        while (!maxHeap.empty() || !cooldown.empty()) {
            time++;
            
            if (!maxHeap.empty()) {
                int count = maxHeap.top() - 1;
                maxHeap.pop();
                
                if (count > 0) {
                    cooldown.push({count, time + n});
                }
            }
            
            // Check if any task is ready
            if (!cooldown.empty() && cooldown.front().second == time) {
                maxHeap.push(cooldown.front().first);
                cooldown.pop();
            }
        }
        
        return time;
    }
};

// Alternative: Mathematical approach (O(n))
class SolutionMath {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        for (char task : tasks) {
            freq[task - 'A']++;
        }
        
        int maxFreq = *max_element(freq.begin(), freq.end());
        int maxCount = count(freq.begin(), freq.end(), maxFreq);
        
        // Minimum time = (maxFreq - 1) * (n + 1) + maxCount
        // But can't be less than total tasks
        return max((int)tasks.size(), (maxFreq - 1) * (n + 1) + maxCount);
    }
};`
        },
        {
            number: 767,
            title: "Reorganize String",
            link: "https://leetcode.com/problems/reorganize-string/",
            difficulty: "Medium",
            intuition: "To avoid adjacent same characters, always place the most frequent character that wasn't just placed. Use a max-heap and alternate between the two most frequent.",
            approach: [
                "Count frequency of each character",
                "Check if reorganization is possible (max freq ≤ (n+1)/2)",
                "Use max-heap storing {frequency, character}",
                "Each step: pop two most frequent, add both to result",
                "Push back characters with remaining count",
                "Handle odd-length string (one char left in heap)"
            ],
            timeComplexity: "O(n log 26) = O(n)",
            spaceComplexity: "O(26) = O(1)",
            code: `class Solution {
public:
    string reorganizeString(string s) {
        vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }
        
        // Max-heap: {frequency, character}
        priority_queue<pair<int, char>> maxHeap;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                // Check if possible
                if (freq[i] > (s.size() + 1) / 2) {
                    return "";
                }
                maxHeap.push({freq[i], 'a' + i});
            }
        }
        
        string result;
        
        while (maxHeap.size() >= 2) {
            // Take two most frequent
            auto [cnt1, ch1] = maxHeap.top(); maxHeap.pop();
            auto [cnt2, ch2] = maxHeap.top(); maxHeap.pop();
            
            result += ch1;
            result += ch2;
            
            // Push back if count remaining
            if (cnt1 > 1) maxHeap.push({cnt1 - 1, ch1});
            if (cnt2 > 1) maxHeap.push({cnt2 - 1, ch2});
        }
        
        // Handle last character
        if (!maxHeap.empty()) {
            result += maxHeap.top().second;
        }
        
        return result;
    }
};`
        },
        {
            number: 1054,
            title: "Distant Barcodes",
            link: "https://leetcode.com/problems/distant-barcodes/",
            difficulty: "Medium",
            intuition: "Similar to reorganize string - no two adjacent elements should be same. Use max-heap to always pick most frequent available element, keeping track of the previously placed element.",
            approach: [
                "Count frequency of each barcode",
                "Use max-heap storing {frequency, barcode}",
                "Pop most frequent, add to result",
                "Keep previous element, push back after next placement",
                "This ensures same elements aren't adjacent",
                "Continue until heap is empty"
            ],
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> rearrangeBarcodes(vector<int>& barcodes) {
        unordered_map<int, int> freq;
        for (int code : barcodes) {
            freq[code]++;
        }
        
        // Max-heap: {frequency, barcode}
        priority_queue<pair<int, int>> maxHeap;
        for (auto& [code, count] : freq) {
            maxHeap.push({count, code});
        }
        
        vector<int> result;
        pair<int, int> prev = {0, 0};  // Previous element
        
        while (!maxHeap.empty()) {
            auto [cnt, code] = maxHeap.top();
            maxHeap.pop();
            
            result.push_back(code);
            
            // Push previous back (if count > 0)
            if (prev.first > 0) {
                maxHeap.push(prev);
            }
            
            // Current becomes previous
            prev = {cnt - 1, code};
        }
        
        return result;
    }
};`
        },
        {
            number: 1451,
            title: "Rearrange Words in a Sentence",
            link: "https://leetcode.com/problems/rearrange-words-in-a-sentence/",
            difficulty: "Medium",
            intuition: "Parse words, sort by length (preserving original order for ties). Use stable sort or priority queue with index for tie-breaking. Reconstruct sentence with proper capitalization.",
            approach: [
                "Split sentence into words",
                "Store {length, original_index, word} for each",
                "Sort by length, then by original index (stable)",
                "Reconstruct sentence from sorted words",
                "Capitalize first letter, lowercase rest",
                "Join with spaces"
            ],
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    string arrangeWords(string text) {
        // Convert first char to lowercase
        text[0] = tolower(text[0]);
        
        // Split into words
        vector<pair<int, string>> words;  // {original_index, word}
        stringstream ss(text);
        string word;
        int idx = 0;
        
        while (ss >> word) {
            words.push_back({idx++, word});
        }
        
        // Stable sort by length
        stable_sort(words.begin(), words.end(), 
            [](const auto& a, const auto& b) {
                return a.second.length() < b.second.length();
            });
        
        // Alternative: Using priority queue
        // priority_queue<tuple<int, int, string>, 
        //               vector<tuple<int, int, string>>,
        //               greater<>> pq;
        // for (int i = 0; i < words.size(); i++) {
        //     pq.push({words[i].second.length(), i, words[i].second});
        // }
        
        // Build result
        string result;
        for (int i = 0; i < words.size(); i++) {
            if (i > 0) result += " ";
            result += words[i].second;
        }
        
        // Capitalize first letter
        result[0] = toupper(result[0]);
        
        return result;
    }
};`
        }
    ]
};

// Store for later rendering
window.constructionProblems = constructionProblems;
