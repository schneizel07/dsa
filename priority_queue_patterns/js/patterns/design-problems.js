// Pattern 5: Design Problems
const designProblems = {
    title: "Design Problems",
    scenario: "You're tasked with designing a custom data structure using priority queues to solve specific problems efficiently.",
    clue: "Look for problems where you need to design a data structure using priority queues for various functionalities.",
    problems: [
        {
            number: 355,
            title: "Design Twitter",
            link: "https://leetcode.com/problems/design-twitter/",
            difficulty: "Medium",
            intuition: "Each user has a list of tweets with timestamps. To get news feed, merge tweets from followed users using a min-heap of size 10. Track follow relationships with hash sets.",
            approach: [
                "Store user tweets as vector of {timestamp, tweetId}",
                "Track follows using map<userId, set<followeeId>>",
                "For getNewsFeed: collect all tweets from user and followees",
                "Use max-heap to get 10 most recent tweets",
                "Maintain global timestamp counter for ordering"
            ],
            timeComplexity: "O(n log n) for getNewsFeed, O(1) for others",
            spaceComplexity: "O(users × tweets)",
            code: `class Twitter {
    int timestamp = 0;
    unordered_map<int, vector<pair<int, int>>> tweets;  // userId -> {time, tweetId}
    unordered_map<int, unordered_set<int>> following;   // userId -> set of followees
    
public:
    Twitter() {}
    
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({timestamp++, tweetId});
    }
    
    vector<int> getNewsFeed(int userId) {
        // Max-heap: {timestamp, tweetId}
        priority_queue<pair<int, int>> maxHeap;
        
        // Add own tweets
        for (auto& [time, id] : tweets[userId]) {
            maxHeap.push({time, id});
        }
        
        // Add followees' tweets
        for (int followee : following[userId]) {
            for (auto& [time, id] : tweets[followee]) {
                maxHeap.push({time, id});
            }
        }
        
        // Get top 10
        vector<int> result;
        while (!maxHeap.empty() && result.size() < 10) {
            result.push_back(maxHeap.top().second);
            maxHeap.pop();
        }
        
        return result;
    }
    
    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following[followerId].insert(followeeId);
        }
    }
    
    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};`
        },
        {
            number: 362,
            title: "Design Hit Counter",
            link: "https://leetcode.com/problems/design-hit-counter/",
            difficulty: "Medium",
            intuition: "Track hits within last 300 seconds. Use a queue to store timestamps. When getting hits, remove expired timestamps from front. Queue size gives current count.",
            approach: [
                "Use a queue to store hit timestamps",
                "On hit: add timestamp to queue",
                "On getHits: remove timestamps older than timestamp-300",
                "Return queue size as hit count",
                "Alternative: use circular array of size 300"
            ],
            timeComplexity: "O(1) amortized for both operations",
            spaceComplexity: "O(n) or O(300) with circular array",
            code: `class HitCounter {
    queue<int> hits;
    
public:
    HitCounter() {}
    
    void hit(int timestamp) {
        hits.push(timestamp);
    }
    
    int getHits(int timestamp) {
        // Remove expired hits
        while (!hits.empty() && hits.front() <= timestamp - 300) {
            hits.pop();
        }
        return hits.size();
    }
};

// Alternative: Circular array (more efficient for high traffic)
class HitCounterOptimized {
    vector<int> times;
    vector<int> counts;
    
public:
    HitCounterOptimized() : times(300, 0), counts(300, 0) {}
    
    void hit(int timestamp) {
        int idx = timestamp % 300;
        if (times[idx] != timestamp) {
            times[idx] = timestamp;
            counts[idx] = 1;
        } else {
            counts[idx]++;
        }
    }
    
    int getHits(int timestamp) {
        int total = 0;
        for (int i = 0; i < 300; i++) {
            if (timestamp - times[i] < 300) {
                total += counts[i];
            }
        }
        return total;
    }
};`
        },
        {
            number: 1472,
            title: "Design Browser History",
            link: "https://leetcode.com/problems/design-browser-history/",
            difficulty: "Medium",
            intuition: "Use a list/vector to store history with a current position pointer. Visit clears forward history. Back/forward adjust the pointer within valid bounds.",
            approach: [
                "Store history as vector of URLs",
                "Track current position index",
                "Visit: truncate forward history, add new URL",
                "Back: move pointer back (min 0)",
                "Forward: move pointer forward (max history.size()-1)",
                "Return URL at current position"
            ],
            timeComplexity: "O(1) for all operations (amortized)",
            spaceComplexity: "O(n)",
            code: `class BrowserHistory {
    vector<string> history;
    int curr;
    
public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        curr = 0;
    }
    
    void visit(string url) {
        // Clear forward history
        history.resize(curr + 1);
        history.push_back(url);
        curr++;
    }
    
    string back(int steps) {
        curr = max(0, curr - steps);
        return history[curr];
    }
    
    string forward(int steps) {
        curr = min((int)history.size() - 1, curr + steps);
        return history[curr];
    }
};

// Alternative: Using two stacks
class BrowserHistoryStacks {
    stack<string> backStack;
    stack<string> forwardStack;
    string current;
    
public:
    BrowserHistoryStacks(string homepage) {
        current = homepage;
    }
    
    void visit(string url) {
        backStack.push(current);
        current = url;
        // Clear forward history
        forwardStack = stack<string>();
    }
    
    string back(int steps) {
        while (steps-- > 0 && !backStack.empty()) {
            forwardStack.push(current);
            current = backStack.top();
            backStack.pop();
        }
        return current;
    }
    
    string forward(int steps) {
        while (steps-- > 0 && !forwardStack.empty()) {
            backStack.push(current);
            current = forwardStack.top();
            forwardStack.pop();
        }
        return current;
    }
};`
        },
        {
            number: 1146,
            title: "Design a Leaderboard",
            link: "https://leetcode.com/problems/design-a-leaderboard/",
            difficulty: "Medium",
            intuition: "Use a hash map to track player scores. For top K, use a min-heap of size K to efficiently find the K highest scores, then sum them.",
            approach: [
                "Map player ID to their score",
                "addScore: add to existing score (or create)",
                "top(K): use min-heap to find K largest scores",
                "reset: set player's score to 0 (or remove)",
                "Alternative: use ordered set for O(log n) top"
            ],
            timeComplexity: "O(1) add/reset, O(n log k) for top",
            spaceComplexity: "O(n)",
            code: `class Leaderboard {
    unordered_map<int, int> scores;  // playerId -> score
    
public:
    Leaderboard() {}
    
    void addScore(int playerId, int score) {
        scores[playerId] += score;
    }
    
    int top(int K) {
        // Min-heap to keep track of top K scores
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (auto& [id, score] : scores) {
            minHeap.push(score);
            if (minHeap.size() > K) {
                minHeap.pop();
            }
        }
        
        int sum = 0;
        while (!minHeap.empty()) {
            sum += minHeap.top();
            minHeap.pop();
        }
        
        return sum;
    }
    
    void reset(int playerId) {
        scores[playerId] = 0;
    }
};

// Alternative: Using multiset for O(log n) operations
class LeaderboardOptimized {
    unordered_map<int, int> scores;
    multiset<int, greater<int>> sortedScores;  // Descending order
    
public:
    LeaderboardOptimized() {}
    
    void addScore(int playerId, int score) {
        if (scores.count(playerId)) {
            sortedScores.erase(sortedScores.find(scores[playerId]));
        }
        scores[playerId] += score;
        sortedScores.insert(scores[playerId]);
    }
    
    int top(int K) {
        int sum = 0;
        auto it = sortedScores.begin();
        while (K-- > 0 && it != sortedScores.end()) {
            sum += *it++;
        }
        return sum;
    }
    
    void reset(int playerId) {
        sortedScores.erase(sortedScores.find(scores[playerId]));
        scores[playerId] = 0;
        sortedScores.insert(0);
    }
};`
        }
    ]
};

// Store for later rendering
window.designProblems = designProblems;
