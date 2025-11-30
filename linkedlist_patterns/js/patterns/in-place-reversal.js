window.patterns['in-place-reversal'] = {
    icon: '🔃',
    title: 'In-Place Reversal Technique',
    description: 'Reverse the linked list in-place without using extra space, typically by modifying pointers iteratively',
    clue: 'Problems where you need to reverse the linked list or perform operations on segments without using additional data structures. The key is maintaining prev, curr, and next pointers while reversing.',
    problems: [
        {
            title: 'Reverse Linked List',
            link: 'https://leetcode.com/problems/reverse-linked-list/',
            difficulty: 'Easy',
            intuition: 'Use three pointers (prev, curr, next) to reverse links one by one. At each step, save next, point current to prev, then move prev and curr forward.',
            visual: createStepsVisual([
                {
                    title: 'Initial State',
                    content: `
                        <div class="ll-diagram">
                            ${createNodeWithPointer('1', 'curr', 'current', 'curr')}${createArrow()}
                            ${createNode(2)}${createArrow()}${createNode(3)}${createArrow()}${createNull()}
                            <span style="margin-left: 1rem; color: var(--text-muted);">prev = NULL</span>
                        </div>
                    `
                },
                {
                    title: 'After Reversal',
                    content: createReversalVisual([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])
                }
            ]),
            approach: [
                'Initialize prev = null, curr = head',
                'While curr is not null:',
                '  - Save next = curr.next',
                '  - Reverse link: curr.next = prev',
                '  - Move prev = curr',
                '  - Move curr = next',
                'Return prev (new head)'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr) {
        ListNode* next = curr->next;  // Save next
        curr->next = prev;            // Reverse link
        prev = curr;                  // Move prev
        curr = next;                  // Move curr
    }
    
    return prev;
}`
        },
        {
            title: 'Swap Nodes in Pairs',
            link: 'https://leetcode.com/problems/swap-nodes-in-pairs/',
            difficulty: 'Medium',
            intuition: 'Use a dummy node and swap adjacent pairs by rewiring pointers. For each pair (A, B), we need to make prev point to B, B point to A, and A point to the next pair.',
            visual: createStepsVisual([
                {
                    title: 'Before Swap',
                    content: `
                        <div class="ll-diagram">
                            ${createNode('D', 'dummy')}${createArrow()}
                            ${createNode(1, 'highlight')}${createArrow()}${createNode(2, 'highlight')}${createArrow()}
                            ${createNode(3)}${createArrow()}${createNode(4)}${createArrow()}${createNull()}
                        </div>
                    `
                },
                {
                    title: 'After Swapping Pair [1,2]',
                    content: `
                        <div class="ll-diagram">
                            ${createNode('D', 'dummy')}${createArrow()}
                            ${createNode(2, 'reversed')}${createArrow()}${createNode(1, 'reversed')}${createArrow()}
                            ${createNode(3)}${createArrow()}${createNode(4)}${createArrow()}${createNull()}
                        </div>
                    `
                },
                {
                    title: 'Final Result',
                    content: createLinkedList([2, 1, 4, 3], { nodeClasses: {0: 'reversed', 1: 'reversed', 2: 'reversed', 3: 'reversed'} })
                }
            ]),
            approach: [
                'Create dummy node, prev = dummy',
                'While we have at least 2 nodes to swap:',
                '  - first = prev.next, second = first.next',
                '  - Rewire: prev → second → first → rest',
                '  - Move prev to first (now second in pair)',
                'Return dummy.next'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* swapPairs(ListNode* head) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* prev = dummy;
    
    while (prev->next && prev->next->next) {
        ListNode* first = prev->next;
        ListNode* second = first->next;
        
        // Swap
        prev->next = second;
        first->next = second->next;
        second->next = first;
        
        // Move prev
        prev = first;
    }
    
    return dummy->next;
}`
        },
        {
            title: 'Rotate List',
            link: 'https://leetcode.com/problems/rotate-list/',
            difficulty: 'Medium',
            intuition: 'Rotation by k is equivalent to: make the list circular, then break it at the right position. Find the new tail at position (length - k % length - 1) and break the circle.',
            visual: createStepsVisual([
                {
                    title: 'Original: Rotate by k=2',
                    content: createLinkedList([1, 2, 3, 4, 5], {})
                },
                {
                    title: 'Step 1: Make circular, find break point',
                    content: `
                        <div class="ll-diagram">
                            ${createNode(1)}${createArrow()}${createNode(2)}${createArrow()}${createNode(3, 'highlight')}${createArrow()}
                            ${createNode(4, 'current')}${createArrow()}${createNode(5, 'current')}
                            <span class="ll-arrow cycle">↩</span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">New tail at index (5 - 2 - 1) = 2</p>
                    `
                },
                {
                    title: 'Result: After rotation',
                    content: createLinkedList([4, 5, 1, 2, 3], { nodeClasses: {0: 'current', 1: 'current'} })
                }
            ]),
            approach: [
                'Handle edge cases: empty list, k=0',
                'Find length and last node (make circular)',
                'Normalize k = k % length',
                'Find new tail at position (length - k - 1)',
                'New head = newTail.next',
                'Break circle: newTail.next = null',
                'Return new head'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* rotateRight(ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    
    // Find length and last node
    int length = 1;
    ListNode* tail = head;
    while (tail->next) {
        tail = tail->next;
        length++;
    }
    
    // Normalize k
    k = k % length;
    if (k == 0) return head;
    
    // Make circular
    tail->next = head;
    
    // Find new tail (length - k - 1 steps from head)
    ListNode* newTail = head;
    for (int i = 0; i < length - k - 1; i++) {
        newTail = newTail->next;
    }
    
    // Break circle
    ListNode* newHead = newTail->next;
    newTail->next = nullptr;
    
    return newHead;
}`
        },
        {
            title: 'Reorder List',
            link: 'https://leetcode.com/problems/reorder-list/',
            difficulty: 'Medium',
            intuition: 'Three steps: (1) Find middle using slow/fast pointers, (2) Reverse second half, (3) Merge two halves alternately. This transforms L0→L1→...→Ln into L0→Ln→L1→Ln-1→...',
            visual: createStepsVisual([
                {
                    title: 'Step 1: Find middle',
                    content: createFastSlowDiagram([1, 2, 3, 4, 5], 2, 4)
                },
                {
                    title: 'Step 2: Reverse second half',
                    content: `
                        <div class="ll-lists-container">
                            <div class="ll-list-row">
                                <span class="ll-list-label">First:</span>
                                ${createNode(1)}${createArrow()}${createNode(2)}${createArrow()}${createNode(3)}${createArrow()}${createNull()}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">Second:</span>
                                ${createNode(5, 'reversed')}${createArrow()}${createNode(4, 'reversed')}${createArrow()}${createNull()}
                            </div>
                        </div>
                    `
                },
                {
                    title: 'Step 3: Merge alternately',
                    content: createLinkedList([1, 5, 2, 4, 3], { nodeClasses: {1: 'reversed', 3: 'reversed'} })
                }
            ]),
            approach: [
                'Find middle using slow/fast pointers',
                'Split list into two halves',
                'Reverse the second half',
                'Merge two halves: take one from each alternately',
                'First half node → Second half node → First half node...'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `void reorderList(ListNode* head) {
    if (!head || !head->next) return;
    
    // Step 1: Find middle
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Step 2: Reverse second half
    ListNode* second = slow->next;
    slow->next = nullptr;
    ListNode* prev = nullptr;
    while (second) {
        ListNode* next = second->next;
        second->next = prev;
        prev = second;
        second = next;
    }
    second = prev;
    
    // Step 3: Merge two halves
    ListNode* first = head;
    while (second) {
        ListNode* tmp1 = first->next;
        ListNode* tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`
        },
        {
            title: 'Split Linked List in Parts',
            link: 'https://leetcode.com/problems/split-linked-list-in-parts/',
            difficulty: 'Medium',
            intuition: 'Calculate base size (n/k) and how many parts get an extra node (n%k). First (n%k) parts have (base+1) nodes, rest have base nodes. Cut the list accordingly.',
            visual: createStepsVisual([
                {
                    title: 'Split [1,2,3,4,5,6,7,8,9,10] into k=3 parts',
                    content: `
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                            n=10, k=3 → base=3, extra=1
                        </p>
                    `
                },
                {
                    title: 'Result: Parts of size [4, 3, 3]',
                    content: `
                        <div class="ll-lists-container">
                            <div class="ll-list-row">
                                <span class="ll-list-label">Part 1:</span>
                                ${createNode(1, 'highlight')}${createArrow()}${createNode(2, 'highlight')}${createArrow()}${createNode(3, 'highlight')}${createArrow()}${createNode(4, 'highlight')}${createArrow()}${createNull()}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">Part 2:</span>
                                ${createNode(5)}${createArrow()}${createNode(6)}${createArrow()}${createNode(7)}${createArrow()}${createNull()}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">Part 3:</span>
                                ${createNode(8)}${createArrow()}${createNode(9)}${createArrow()}${createNode(10)}${createArrow()}${createNull()}
                            </div>
                        </div>
                    `
                }
            ]),
            approach: [
                'Count total nodes n',
                'Calculate: base = n/k, extra = n%k',
                'First "extra" parts have (base+1) nodes',
                'Remaining parts have "base" nodes',
                'Cut list at each part boundary'
            ],
            timeComplexity: 'O(n + k)',
            spaceComplexity: 'O(k) for result array',
            code: `vector<ListNode*> splitListToParts(ListNode* head, int k) {
    // Count nodes
    int n = 0;
    ListNode* curr = head;
    while (curr) {
        n++;
        curr = curr->next;
    }
    
    int base = n / k;      // Minimum size of each part
    int extra = n % k;     // Parts that get +1 node
    
    vector<ListNode*> result(k, nullptr);
    curr = head;
    
    for (int i = 0; i < k && curr; i++) {
        result[i] = curr;
        int partSize = base + (i < extra ? 1 : 0);
        
        // Move to last node of this part
        for (int j = 0; j < partSize - 1; j++) {
            curr = curr->next;
        }
        
        // Cut the list
        ListNode* next = curr->next;
        curr->next = nullptr;
        curr = next;
    }
    
    return result;
}`
        },
        {
            title: 'Reverse Nodes in k-Group',
            link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
            difficulty: 'Hard',
            intuition: 'For each group of k nodes, reverse them in-place, then connect to the next reversed group. Use a dummy node to handle head changes. Key: check if k nodes exist before reversing.',
            visual: createStepsVisual([
                {
                    title: 'Original: Reverse in groups of k=3',
                    content: createLinkedList([1, 2, 3, 4, 5, 6, 7, 8], {})
                },
                {
                    title: 'Reverse each complete group',
                    content: `
                        <div class="ll-diagram">
                            ${createNode(3, 'reversed')}${createArrow()}${createNode(2, 'reversed')}${createArrow()}${createNode(1, 'reversed')}${createArrow()}
                            ${createNode(6, 'highlight')}${createArrow()}${createNode(5, 'highlight')}${createArrow()}${createNode(4, 'highlight')}${createArrow()}
                            ${createNode(7)}${createArrow()}${createNode(8)}${createArrow()}${createNull()}
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">
                            [7,8] not reversed (less than k nodes)
                        </p>
                    `
                }
            ]),
            approach: [
                'Use dummy node pointing to head',
                'For each group of k nodes:',
                '  - Check if k nodes exist',
                '  - If yes, reverse the k nodes',
                '  - Connect prev group\'s tail to new head',
                '  - Update prev to current group\'s tail',
                'Return dummy.next'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* prevGroupEnd = dummy;
    
    while (true) {
        // Check if k nodes exist
        ListNode* kth = prevGroupEnd;
        for (int i = 0; i < k; i++) {
            kth = kth->next;
            if (!kth) return dummy->next;
        }
        
        ListNode* groupStart = prevGroupEnd->next;
        ListNode* nextGroupStart = kth->next;
        
        // Reverse k nodes
        ListNode* prev = nextGroupStart;
        ListNode* curr = groupStart;
        while (curr != nextGroupStart) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        // Connect
        prevGroupEnd->next = kth;
        prevGroupEnd = groupStart;
    }
    
    return dummy->next;
}`
        }
    ]
};
