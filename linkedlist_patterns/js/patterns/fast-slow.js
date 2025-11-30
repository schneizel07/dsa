window.patterns['fast-slow'] = {
    icon: '🐢🐇',
    title: 'Fast and Slow Pointers',
    description: 'Use two pointers moving at different speeds to find midpoints, detect cycles, or locate specific elements',
    clue: 'Look for problems that involve traversing the linked list efficiently using two pointers simultaneously, often requiring pointer manipulation or comparison. Common scenarios include finding the midpoint, detecting cycles, or removing specific elements.',
    problems: [
        {
            title: 'Middle of the Linked List',
            link: 'https://leetcode.com/problems/middle-of-the-linked-list/',
            difficulty: 'Easy',
            intuition: 'When slow pointer moves 1 step and fast pointer moves 2 steps, by the time fast reaches the end, slow will be at the middle. This is because fast travels twice the distance of slow.',
            visual: createFastSlowDiagram([1, 2, 3, 4, 5], 2, 4) + `
                <div class="clue-box" style="margin-top: 1rem;">
                    <h5>🎯 Key Insight</h5>
                    <p>When fast reaches end (or NULL), slow is exactly at the middle!</p>
                </div>
            `,
            approach: [
                'Initialize slow and fast pointers at head',
                'Move slow by 1 step, fast by 2 steps in each iteration',
                'When fast reaches end (fast == null or fast.next == null), slow is at middle',
                'Return slow pointer'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow;
}`
        },
        {
            title: 'Linked List Cycle',
            link: 'https://leetcode.com/problems/linked-list-cycle/',
            difficulty: 'Easy',
            intuition: 'If there\'s a cycle, fast and slow pointers will eventually meet inside the cycle. Think of it like two runners on a circular track - the faster one will lap the slower one.',
            visual: createCycleList([3, 2, 0, -4], 1) + `
                <div class="clue-box" style="margin-top: 1rem;">
                    <h5>🔄 Cycle Detection</h5>
                    <p>If fast ever equals slow (and both are not null), a cycle exists!</p>
                </div>
            `,
            approach: [
                'Initialize slow and fast pointers at head',
                'Move slow by 1, fast by 2 in each iteration',
                'If they meet (slow == fast), cycle exists',
                'If fast reaches null, no cycle exists'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `bool hasCycle(ListNode *head) {
    if (!head || !head->next) return false;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) return true;
    }
    
    return false;
}`
        },
        {
            title: 'Linked List Cycle II',
            link: 'https://leetcode.com/problems/linked-list-cycle-ii/',
            difficulty: 'Medium',
            intuition: 'After detecting cycle, reset one pointer to head. Move both at same speed - they\'ll meet at cycle start. This works due to the mathematical relationship: distance from head to cycle start equals distance from meeting point to cycle start.',
            visual: createStepsVisual([
                {
                    title: 'Detect cycle with fast/slow',
                    content: createCycleList([1, 2, 3, 4, 5], 1)
                },
                {
                    title: 'Reset slow to head, move both at same speed',
                    content: `<p style="color: var(--text-secondary); font-size: 0.9rem;">They will meet at the cycle start node!</p>`
                }
            ]),
            approach: [
                'First, detect if cycle exists using fast/slow pointers',
                'If no cycle, return null',
                'Reset slow pointer to head',
                'Move both slow and fast one step at a time',
                'Where they meet is the cycle start'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode *detectCycle(ListNode *head) {
    if (!head || !head->next) return nullptr;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    // Detect cycle
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) break;
    }
    
    // No cycle
    if (!fast || !fast->next) return nullptr;
    
    // Find cycle start
    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    
    return slow;
}`
        },
        {
            title: 'Remove Nth Node From End',
            link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
            difficulty: 'Medium',
            intuition: 'Use two pointers with a gap of n nodes. When fast reaches the end, slow will be just before the node to remove. The gap ensures we find the right position in one pass.',
            visual: createStepsVisual([
                {
                    title: 'Move fast n steps ahead',
                    content: createFastSlowDiagram([1, 2, 3, 4, 5], 0, 2)
                },
                {
                    title: 'Move both until fast reaches end',
                    content: createFastSlowDiagram([1, 2, 3, 4, 5], 2, 4)
                },
                {
                    title: 'Remove node after slow',
                    content: `<p style="color: var(--text-secondary); font-size: 0.9rem;">slow.next = slow.next.next</p>`
                }
            ]),
            approach: [
                'Use dummy node to handle edge case of removing head',
                'Move fast pointer n steps ahead',
                'Move both pointers until fast reaches the last node',
                'slow.next is the node to remove',
                'Skip the node: slow.next = slow.next.next'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    
    ListNode* slow = dummy;
    ListNode* fast = dummy;
    
    // Move fast n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }
    
    // Move both until fast is null
    while (fast != nullptr) {
        slow = slow->next;
        fast = fast->next;
    }
    
    // Remove the nth node
    slow->next = slow->next->next;
    
    return dummy->next;
}`
        },
        {
            title: 'Intersection of Two Linked Lists',
            link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
            difficulty: 'Easy',
            intuition: 'If we traverse both lists and switch to the other list\'s head when we reach the end, both pointers will travel the same total distance and meet at the intersection (or both reach null if no intersection).',
            visual: createIntersectionDiagram([4, 1], [5, 6, 1], [8, 4, 5]),
            approach: [
                'Initialize two pointers at heads of both lists',
                'Traverse both lists simultaneously',
                'When a pointer reaches end, redirect to other list\'s head',
                'They will meet at intersection or both become null',
                'Return the meeting point'
            ],
            timeComplexity: 'O(m + n)',
            spaceComplexity: 'O(1)',
            code: `ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    if (!headA || !headB) return nullptr;
    
    ListNode* ptrA = headA;
    ListNode* ptrB = headB;
    
    while (ptrA != ptrB) {
        ptrA = ptrA ? ptrA->next : headB;
        ptrB = ptrB ? ptrB->next : headA;
    }
    
    return ptrA;
}`
        },
        {
            title: 'Odd Even Linked List',
            link: 'https://leetcode.com/problems/odd-even-linked-list/',
            difficulty: 'Medium',
            intuition: 'Separate odd and even indexed nodes into two lists, then connect them. Use two pointers to build the odd and even lists simultaneously in one pass.',
            visual: createStepsVisual([
                {
                    title: 'Original List',
                    content: createLinkedList([1, 2, 3, 4, 5], {})
                },
                {
                    title: 'After Rearrangement (odd indices → even indices)',
                    content: createLinkedList([1, 3, 5, 2, 4], { nodeClasses: {0: 'slow', 1: 'slow', 2: 'slow', 3: 'fast', 4: 'fast'} })
                }
            ]),
            approach: [
                'Initialize odd pointer at head, even at head.next',
                'Save evenHead to connect later',
                'Link odd nodes together: odd.next = odd.next.next',
                'Link even nodes together: even.next = even.next.next',
                'Connect odd list end to evenHead'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* oddEvenList(ListNode* head) {
    if (!head || !head->next) return head;
    
    ListNode* odd = head;
    ListNode* even = head->next;
    ListNode* evenHead = even;
    
    while (even && even->next) {
        odd->next = even->next;
        odd = odd->next;
        even->next = odd->next;
        even = even->next;
    }
    
    odd->next = evenHead;
    return head;
}`
        }
    ]
};
