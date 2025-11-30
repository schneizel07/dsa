// Pattern 2: Top K Frequent Elements
const topKFrequentProblems = {
    title: "Top K Frequent Elements",
    scenario: "You're analyzing data and need to identify the most frequently occurring elements based on occurrence count.",
    clue: "Look for problems where you need to track element frequencies and select the top K elements based on occurrence count.",
    problems: [
        {
            number: 347,
            title: "Top K Frequent Elements",
            link: "https://leetcode.com/problems/top-k-frequent-elements/",
            difficulty: "Medium",
            intuition: "First count frequencies using a hash map, then use a min-heap of size K to track the K most frequent elements. Elements with higher frequency stay in the heap.",
            approach: [
                "Count frequency of each element using unordered_map",
                "Use a min-heap storing {frequency, element}",
                "Iterate through frequency map and add to heap",
                "Keep heap size ≤ K by removing lowest frequency",
                "Extract elements from heap as the result"
            ],
            timeComplexity: "O(n log k)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Count frequencies
        unordered_map<int, int> freq;
        for (int num : nums) {
            freq[num]++;
        }
        
        // Min-heap: {frequency, element}
        priority_queue<pair<int,int>, 
                      vector<pair<int,int>>,
                      greater<pair<int,int>>> minHeap;
        
        for (auto& [num, count] : freq) {
            minHeap.push({count, num});
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        // Extract result
        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }
        
        return result;
    }
};`
        },
        {
            number: 451,
            title: "Sort Characters By Frequency",
            link: "https://leetcode.com/problems/sort-characters-by-frequency/",
            difficulty: "Medium",
            intuition: "Count character frequencies, then use a max-heap to process characters from most to least frequent. Build the result string by repeating each character by its frequency.",
            approach: [
                "Count frequency of each character",
                "Push all {frequency, character} pairs to max-heap",
                "Pop from heap and append character 'frequency' times",
                "Continue until heap is empty",
                "Return the constructed string"
            ],
            timeComplexity: "O(n log k) where k = unique chars",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    string frequencySort(string s) {
        // Count frequencies
        unordered_map<char, int> freq;
        for (char c : s) {
            freq[c]++;
        }
        
        // Max-heap: {frequency, character}
        priority_queue<pair<int, char>> maxHeap;
        for (auto& [ch, count] : freq) {
            maxHeap.push({count, ch});
        }
        
        // Build result
        string result;
        while (!maxHeap.empty()) {
            auto [count, ch] = maxHeap.top();
            maxHeap.pop();
            result.append(count, ch);  // Append ch, count times
        }
        
        return result;
    }
};`
        },
        {
            number: 692,
            title: "Top K Frequent Words",
            link: "https://leetcode.com/problems/top-k-frequent-words/",
            difficulty: "Medium",
            intuition: "Similar to top K frequent elements, but with a twist - we need lexicographical ordering for ties. Custom comparator in the heap handles both frequency (descending) and alphabetical order (ascending).",
            approach: [
                "Count frequency of each word using hash map",
                "Use min-heap with custom comparator for K elements",
                "Comparator: higher freq first, then lexicographically smaller",
                "Keep heap size at K, removing least qualifying words",
                "Reverse the extracted result for correct order"
            ],
            timeComplexity: "O(n log k)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        // Count frequencies
        unordered_map<string, int> freq;
        for (const string& word : words) {
            freq[word]++;
        }
        
        // Custom comparator for min-heap
        // We want to remove: lower frequency OR (same freq, lexically larger)
        auto cmp = [](const pair<int, string>& a, 
                      const pair<int, string>& b) {
            if (a.first != b.first) return a.first > b.first;
            return a.second < b.second;
        };
        
        priority_queue<pair<int, string>, 
                      vector<pair<int, string>>,
                      decltype(cmp)> minHeap(cmp);
        
        for (auto& [word, count] : freq) {
            minHeap.push({count, word});
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        // Extract and reverse
        vector<string> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }
        reverse(result.begin(), result.end());
        
        return result;
    }
};`
        },
        {
            number: 895,
            title: "Maximum Frequency Stack",
            link: "https://leetcode.com/problems/maximum-frequency-stack/",
            difficulty: "Hard",
            intuition: "We need to pop the most frequent element, with ties broken by most recent. Use a frequency map and a map of stacks - each stack holds elements at that frequency level, maintaining insertion order.",
            approach: [
                "Track frequency of each element in a map",
                "Use map<frequency, stack> to group elements by frequency",
                "Track maximum frequency seen so far",
                "Push: increment freq, add to appropriate stack, update maxFreq",
                "Pop: get from maxFreq stack, decrement freq, update maxFreq if needed"
            ],
            timeComplexity: "O(1) for both push and pop",
            spaceComplexity: "O(n)",
            code: `class FreqStack {
    unordered_map<int, int> freq;           // element -> frequency
    unordered_map<int, stack<int>> group;   // frequency -> stack of elements
    int maxFreq = 0;
    
public:
    FreqStack() {}
    
    void push(int val) {
        // Increment frequency
        int f = ++freq[val];
        
        // Update max frequency
        maxFreq = max(maxFreq, f);
        
        // Add to frequency group
        group[f].push(val);
    }
    
    int pop() {
        // Get element from max frequency group
        int val = group[maxFreq].top();
        group[maxFreq].pop();
        
        // Decrement frequency
        freq[val]--;
        
        // Update maxFreq if current group is empty
        if (group[maxFreq].empty()) {
            maxFreq--;
        }
        
        return val;
    }
};`
        }
    ]
};

// Store for later rendering
window.topKFrequentProblems = topKFrequentProblems;
