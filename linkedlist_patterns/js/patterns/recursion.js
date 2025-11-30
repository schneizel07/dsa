window.patterns['recursion'] = {
    icon: '🔄',
    title: 'Recursion Technique',
    description: 'Solving problems that require traversal or manipulation of the linked list structure in a recursive manner',
    clue: 'Look for problems where a recursive approach provides an elegant solution, such as dividing the problem into subproblems. Common patterns include processing from the end of the list, or building results bottom-up.',
    problems: [
        {
            title: 'Swap Nodes in Pairs',
            link: 'https://leetcode.com/problems/swap-nodes-in-pairs/',
            difficulty: 'Medium',
            intuition: 'For each pair, swap them and recursively process the rest. The recursive call handles the remaining list, and we just need to rewire the current pair. Base case: 0 or 1 node left.',
            visual: createStepsVisual([
                {
                    title: 'Original List',
                    content: createLinkedList([1, 2, 3, 4], {})
                },
                {
                    title: 'Swap pairs recursively',
                    content: `
                        <div class="ll-diagram">
                            ${createNode(2, 'highlight')}${createArrow()}${createNode(1, 'highlight')}${createArrow()}
                            ${createNode(4, 'current')}${createArrow()}${createNode(3, 'current')}${createArrow()}${createNull()}
                        </div>
                    `
                }
            ]),
            approach: [
                'Base case: if head is null or only one node, return head',
                'Save the second node (newHead = head.next)',
                'Recursively swap remaining pairs starting from third node',
                'Rewire: first.next = recursive result, second.next = first',
                'Return newHead (the second node becomes first)'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n) - recursion stack',
            code: `ListNode* swapPairs(ListNode* head) {
    // Base case: empty or single node
    if (!head || !head->next) return head;
    
    // Nodes to swap
    ListNode* first = head;
    ListNode* second = head->next;
    
    // Recursively swap remaining list
    first->next = swapPairs(second->next);
    
    // Swap current pair
    second->next = first;
    
    // Return new head of this pair
    return second;
}`
        },
        {
            title: 'Palindrome Linked List',
            link: 'https://leetcode.com/problems/palindrome-linked-list/',
            difficulty: 'Easy',
            intuition: 'Use recursion to reach the end of the list, then compare values while unwinding the stack. Keep a front pointer that advances as we return from recursive calls.',
            visual: createStepsVisual([
                {
                    title: 'Check: 1 → 2 → 2 → 1',
                    content: createLinkedList([1, 2, 2, 1], { nodeClasses: {0: 'slow', 3: 'fast'} })
                },
                {
                    title: 'Compare front (→) with back (←) during recursion unwind',
                    content: `
                        <div class="clue-box">
                            <h5>🔄 Recursion Flow</h5>
                            <p>Recurse to end → Compare last with front → Move front → Return</p>
                        </div>
                    `
                }
            ]),
            approach: [
                'Keep a front pointer (member variable or passed by reference)',
                'Recurse to the end of the list',
                'At each return step, compare front.val with current.val',
                'Move front forward after each comparison',
                'If any comparison fails, propagate false'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n) - recursion stack',
            code: `class Solution {
    ListNode* front;
    
    bool check(ListNode* curr) {
        if (!curr) return true;
        
        // Recurse to end first
        if (!check(curr->next)) return false;
        
        // Compare front with current (from back)
        if (front->val != curr->val) return false;
        
        // Move front forward
        front = front->next;
        return true;
    }
    
public:
    bool isPalindrome(ListNode* head) {
        front = head;
        return check(head);
    }
};`
        },
        {
            title: 'Remove Duplicates from Sorted List II',
            link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/',
            difficulty: 'Medium',
            intuition: 'Recursively process the list. If current value is duplicated, skip ALL nodes with that value and recurse on the rest. Otherwise, keep the current node and recurse.',
            visual: createStepsVisual([
                {
                    title: 'Input: Skip all nodes with duplicate values',
                    content: createLinkedList([1, 2, 3, 3, 4, 4, 5], { nodeClasses: {2: 'highlight', 3: 'highlight', 4: 'highlight', 5: 'highlight'} })
                },
                {
                    title: 'Output: Only unique values remain',
                    content: createLinkedList([1, 2, 5], {})
                }
            ]),
            approach: [
                'Base case: null or single node, return as is',
                'If head.val == head.next.val (duplicate found):',
                '  - Skip all nodes with this value',
                '  - Recurse on the node after duplicates',
                'Else: head.next = recurse(head.next), return head'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n) - recursion stack',
            code: `ListNode* deleteDuplicates(ListNode* head) {
    // Base case
    if (!head || !head->next) return head;
    
    // If current value is duplicated
    if (head->val == head->next->val) {
        // Skip all nodes with this value
        while (head->next && head->val == head->next->val) {
            head = head->next;
        }
        // Recurse on node after all duplicates
        return deleteDuplicates(head->next);
    }
    
    // Current is unique, keep it
    head->next = deleteDuplicates(head->next);
    return head;
}`
        },
        {
            title: 'Flatten a Multilevel Doubly Linked List',
            link: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/',
            difficulty: 'Medium',
            intuition: 'When we encounter a node with a child, recursively flatten the child list first, then insert it between current and next. The recursion naturally handles nested children.',
            visual: createStepsVisual([
                {
                    title: 'Multilevel Structure',
                    content: `
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                            <div class="ll-diagram" style="padding: 0.5rem;">
                                ${createNode(1)}${createArrow()}${createNode(2, 'highlight')}${createArrow()}${createNode(3)}${createArrow()}${createNull()}
                            </div>
                            <div style="margin-left: 80px; color: var(--text-muted);">↓ child</div>
                            <div class="ll-diagram" style="padding: 0.5rem; margin-left: 60px;">
                                ${createNode(4)}${createArrow()}${createNode(5)}${createArrow()}${createNull()}
                            </div>
                        </div>
                    `
                },
                {
                    title: 'Flattened Result',
                    content: createLinkedList([1, 2, 4, 5, 3], {})
                }
            ]),
            approach: [
                'Traverse the list',
                'When node has child: recursively flatten child list',
                'Find tail of flattened child list',
                'Insert child list between current and next',
                'Update prev/next pointers accordingly',
                'Clear the child pointer'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(d) - d is depth of nesting',
            code: `Node* flatten(Node* head) {
    if (!head) return nullptr;
    
    Node* curr = head;
    
    while (curr) {
        if (curr->child) {
            Node* next = curr->next;
            
            // Recursively flatten child
            Node* child = flatten(curr->child);
            
            // Connect current to child
            curr->next = child;
            child->prev = curr;
            curr->child = nullptr;
            
            // Find tail of flattened child
            Node* tail = child;
            while (tail->next) {
                tail = tail->next;
            }
            
            // Connect tail to next
            if (next) {
                tail->next = next;
                next->prev = tail;
            }
        }
        curr = curr->next;
    }
    
    return head;
}`
        },
        {
            title: 'Reverse Linked List (Recursive)',
            link: 'https://leetcode.com/problems/reverse-linked-list/',
            difficulty: 'Easy',
            intuition: 'Recursively reverse the rest of the list, then fix the pointers. When we return from recursion, the rest is already reversed. We just need to make the next node point back to us.',
            visual: createStepsVisual([
                {
                    title: 'Original List',
                    content: createLinkedList([1, 2, 3, 4, 5], {})
                },
                {
                    title: 'Recursive approach: reverse rest, then fix current',
                    content: `
                        <div class="ll-reversal-visual">
                            <div class="ll-before-after">
                                <span class="ll-state-label before">Step</span>
                                <div style="color: var(--text-secondary); font-size: 0.9rem; padding: 0.5rem;">
                                    reverse([2,3,4,5]) returns 5→4→3→2<br>
                                    Then: 2→next = 1, 1→next = null
                                </div>
                            </div>
                            <div class="ll-before-after">
                                <span class="ll-state-label after">Result</span>
                                <div class="ll-diagram" style="padding: 0.5rem;">
                                    ${createNode(5, 'reversed')}${createArrow()}${createNode(4, 'reversed')}${createArrow()}${createNode(3, 'reversed')}${createArrow()}${createNode(2, 'reversed')}${createArrow()}${createNode(1, 'reversed')}${createArrow()}${createNull()}
                                </div>
                            </div>
                        </div>
                    `
                }
            ]),
            approach: [
                'Base case: empty or single node, return it',
                'Recursively reverse the rest of the list',
                'The recursive call returns new head (original tail)',
                'Fix pointer: head.next.next = head',
                'Set head.next = null (new tail)',
                'Return the new head'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n) - recursion stack',
            code: `ListNode* reverseList(ListNode* head) {
    // Base case
    if (!head || !head->next) return head;
    
    // Reverse the rest
    ListNode* newHead = reverseList(head->next);
    
    // Fix pointers
    head->next->next = head;
    head->next = nullptr;
    
    return newHead;
}`
        }
    ]
};
