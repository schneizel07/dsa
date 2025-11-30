window.designProblemsPattern = {
    title: "Pattern 1: Design Problems",
    scenario: "When you need to implement a data structure from scratch using stacks or queues as building blocks",
    clue: "Problem asks to 'Implement' or 'Design' a data structure with specific operations",
    problems: [
        {
            title: "232. Implement Queue using Stacks",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
            intuition: "A queue is FIFO (First In First Out) while a stack is LIFO (Last In First Out). We can use two stacks - one for push operations and one for pop/peek operations. When we need to pop and the output stack is empty, we transfer all elements from input stack to output stack, reversing their order.",
            approach: "Use two stacks: input stack for push, output stack for pop/peek. When output stack is empty and we need pop/peek, transfer all elements from input to output (this reverses order). Amortized O(1) for all operations.",
            timeComplexity: "O(1) amortized",
            spaceComplexity: "O(n)",
            code: `class MyQueue {
    stack<int> input, output;
    
    void transfer() {
        while (!input.empty()) {
            output.push(input.top());
            input.pop();
        }
    }
public:
    void push(int x) {
        input.push(x);
    }
    
    int pop() {
        if (output.empty()) transfer();
        int val = output.top();
        output.pop();
        return val;
    }
    
    int peek() {
        if (output.empty()) transfer();
        return output.top();
    }
    
    bool empty() {
        return input.empty() && output.empty();
    }
};`
        },
        {
            title: "225. Implement Stack using Queues",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/",
            intuition: "To simulate LIFO behavior with FIFO queues, we can make push expensive: after pushing to queue, rotate all previous elements to the back. This ensures the newest element is always at the front.",
            approach: "Use a single queue. On push: add new element, then rotate all other elements to the back (n-1 rotations). Pop and top become O(1) since newest is at front.",
            timeComplexity: "O(n) for push, O(1) for others",
            spaceComplexity: "O(n)",
            code: `class MyStack {
    queue<int> q;
public:
    void push(int x) {
        q.push(x);
        // Rotate to bring new element to front
        for (int i = 0; i < q.size() - 1; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    
    int pop() {
        int val = q.front();
        q.pop();
        return val;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return q.empty();
    }
};`
        },
        {
            title: "1472. Design Browser History",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-browser-history/",
            intuition: "Browser history is like navigating a doubly-linked path. We can use two stacks: one for backward history and one for forward history. Current page sits between them. Going back pushes current to forward stack and pops from backward stack.",
            approach: "Maintain current URL and two stacks (back, forward). Visit: push current to back stack, clear forward stack. Back: push current to forward, pop from back. Forward: push current to back, pop from forward.",
            timeComplexity: "O(1) for visit, O(min(steps, stack.size)) for back/forward",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
Visit: google → facebook → youtube → leetcode

State after visits:
┌─────────────────────────────────────────┐
│  Back Stack    Current    Forward Stack │
│  [google]                               │
│  [facebook]    leetcode   []            │
│  [youtube]                              │
└─────────────────────────────────────────┘

After back(2):
┌─────────────────────────────────────────┐
│  Back Stack    Current    Forward Stack │
│  [google]      facebook   [youtube]     │
│                           [leetcode]    │
└─────────────────────────────────────────┘

After forward(1):
┌─────────────────────────────────────────┐
│  Back Stack    Current    Forward Stack │
│  [google]                               │
│  [facebook]    youtube    [leetcode]    │
└─────────────────────────────────────────┘
</div>`,
            code: `class BrowserHistory {
    string current;
    stack<string> backStack, forwardStack;
public:
    BrowserHistory(string homepage) : current(homepage) {}
    
    void visit(string url) {
        backStack.push(current);
        current = url;
        // Clear forward history
        while (!forwardStack.empty()) forwardStack.pop();
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
            title: "362. Design Hit Counter",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-hit-counter/",
            intuition: "We need to count hits in the last 300 seconds. A queue naturally maintains chronological order - we can push timestamps and pop expired ones. For getHits, we clean up expired timestamps first.",
            approach: "Use a queue to store timestamps. On hit: push timestamp. On getHits: remove all timestamps older than (timestamp - 300) from front, return queue size. The queue maintains a 300-second sliding window.",
            timeComplexity: "O(n) worst case for getHits",
            spaceComplexity: "O(n) where n = hits in 300 sec window",
            code: `class HitCounter {
    queue<int> hits;
public:
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
};`
        },
        {
            title: "622. Design Circular Queue",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-circular-queue/",
            intuition: "A circular queue reuses space by wrapping around. We use an array with front and rear pointers. When rear reaches the end, it wraps to the beginning. The trick is using modulo arithmetic for circular indexing.",
            approach: "Use array of size k, front pointer, rear pointer, and count. Enqueue: place at rear, rear = (rear + 1) % k. Dequeue: front = (front + 1) % k. Check full/empty using count.",
            timeComplexity: "O(1) for all operations",
            spaceComplexity: "O(k)",
            visual: `<div class="visual-diagram">
Circular Queue of size 4:

Initial:        After enQueue(1,2,3):    After deQueue():
┌───┬───┬───┬───┐   ┌───┬───┬───┬───┐   ┌───┬───┬───┬───┐
│   │   │   │   │   │ 1 │ 2 │ 3 │   │   │   │ 2 │ 3 │   │
└───┴───┴───┴───┘   └───┴───┴───┴───┘   └───┴───┴───┴───┘
  ↑                   ↑           ↑           ↑       ↑
front=rear         front       rear        front   rear

After enQueue(4,5): (wraps around!)
┌───┬───┬───┬───┐
│ 5 │ 2 │ 3 │ 4 │
└───┴───┴───┴───┘
      ↑       ↑
    front   rear wraps to index 0, then 1
</div>`,
            code: `class MyCircularQueue {
    vector<int> data;
    int front, rear, count, capacity;
public:
    MyCircularQueue(int k) : data(k), front(0), rear(0), count(0), capacity(k) {}
    
    bool enQueue(int value) {
        if (isFull()) return false;
        data[rear] = value;
        rear = (rear + 1) % capacity;
        count++;
        return true;
    }
    
    bool deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        count--;
        return true;
    }
    
    int Front() {
        return isEmpty() ? -1 : data[front];
    }
    
    int Rear() {
        return isEmpty() ? -1 : data[(rear - 1 + capacity) % capacity];
    }
    
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == capacity; }
};`
        },
        {
            title: "355. Design Twitter",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
            intuition: "Twitter feed combines posts from followed users in reverse chronological order. This is a classic merge-k-sorted-lists problem! Each user has a sorted list of tweets (by time). Use a max-heap to merge the 10 most recent tweets efficiently.",
            approach: "Store tweets per user with global timestamp. Store follow relationships in a set per user. For getNewsFeed: collect all followed users (including self), use max-heap to get 10 most recent tweets across all feeds.",
            timeComplexity: "O(n log n) for getNewsFeed, O(1) for others",
            spaceComplexity: "O(users * tweets + follows)",
            code: `class Twitter {
    int timestamp = 0;
    unordered_map<int, vector<pair<int, int>>> tweets; // userId -> [(time, tweetId)]
    unordered_map<int, unordered_set<int>> following;  // userId -> set of followees
    
public:
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({timestamp++, tweetId});
    }
    
    vector<int> getNewsFeed(int userId) {
        // Max heap: (timestamp, tweetId)
        priority_queue<pair<int, int>> pq;
        
        // Add own tweets
        for (auto& [time, id] : tweets[userId]) {
            pq.push({time, id});
        }
        
        // Add tweets from followed users
        for (int followee : following[userId]) {
            for (auto& [time, id] : tweets[followee]) {
                pq.push({time, id});
            }
        }
        
        vector<int> feed;
        while (!pq.empty() && feed.size() < 10) {
            feed.push_back(pq.top().second);
            pq.pop();
        }
        return feed;
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
            title: "353. Design Snake Game",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-snake-game/",
            intuition: "The snake is essentially a queue - food extends from head, and tail shrinks (unless eating). Use a deque for the snake body. Use a set to quickly check self-collision. The head moves in the direction, and if no food, the tail is removed.",
            approach: "Maintain snake as deque of positions (head at front), set of body positions for O(1) collision check. On move: calculate new head, check wall collision, remove tail (unless eating food), check self-collision, add new head.",
            timeComplexity: "O(1) per move",
            spaceComplexity: "O(snake length)",
            visual: `<div class="visual-diagram">
5x5 Grid, Snake starts at (0,0), Food at (1,2), (0,1)

Initial:          After move("R"):   After move("D"):
┌─┬─┬─┬─┬─┐       ┌─┬─┬─┬─┬─┐       ┌─┬─┬─┬─┬─┐
│S│ │ │ │ │       │ │S│ │ │ │       │ │ │ │ │ │
├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤
│ │ │F│ │ │       │ │ │F│ │ │       │ │S│F│ │ │
├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤
│ │ │ │ │ │   →   │ │ │ │ │ │   →   │ │ │ │ │ │
├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤       ├─┼─┼─┼─┼─┤
│ │ │ │ │ │       │ │ │ │ │ │       │ │ │ │ │ │
└─┴─┴─┴─┴─┘       └─┴─┴─┴─┴─┘       └─┴─┴─┴─┴─┘

Snake Body (deque): head → [(0,0)] → [(0,1)] → [(1,1)]
</div>`,
            code: `class SnakeGame {
    int width, height, foodIdx, score;
    deque<pair<int,int>> snake;
    set<pair<int,int>> body;
    vector<vector<int>>& food;
    
public:
    SnakeGame(int w, int h, vector<vector<int>>& f) 
        : width(w), height(h), food(f), foodIdx(0), score(0) {
        snake.push_back({0, 0});
        body.insert({0, 0});
    }
    
    int move(string direction) {
        auto [r, c] = snake.front();
        
        if (direction == "U") r--;
        else if (direction == "D") r++;
        else if (direction == "L") c--;
        else if (direction == "R") c++;
        
        // Check wall collision
        if (r < 0 || r >= height || c < 0 || c >= width) return -1;
        
        // Check if eating food
        bool eating = foodIdx < food.size() && 
                      food[foodIdx][0] == r && food[foodIdx][1] == c;
        
        if (!eating) {
            // Remove tail
            body.erase(snake.back());
            snake.pop_back();
        } else {
            foodIdx++;
            score++;
        }
        
        // Check self collision (after removing tail!)
        if (body.count({r, c})) return -1;
        
        // Add new head
        snake.push_front({r, c});
        body.insert({r, c});
        
        return score;
    }
};`
        }
    ]
};
