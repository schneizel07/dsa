window.patterns['dummy-node'] = {
    icon: '🎭',
    title: 'Dummy Node Technique',
    description: 'Use a sentinel/dummy node to simplify edge cases, especially when dealing with the head of the list',
    clue: 'Problems often involve scenarios where dealing with the head of the linked list is cumbersome or requires special treatment. The dummy node eliminates the need for special head handling - you can treat all nodes uniformly.',
    problems: [
        {
            title: 'Add Two Numbers',
            link: 'https://leetcode.com/problems/add-two-numbers/',
            difficulty: 'Medium',
            intuition: 'Numbers are stored in reverse order, so we can add digit by digit from head. Use a dummy node to build the result list without worrying about initializing the head separately.',
            visual: createStepsVisual([
                {
                    title: 'Input Lists (reversed numbers)',
                    content: `
                        <div class="ll-lists-container">
                            <div class="ll-list-row">
                                <span class="ll-list-label">342:</span>
                                ${createNode(2)}${createArrow()}${createNode(4)}${createArrow()}${createNode(3)}${createArrow()}${createNull()}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">465:</span>
                                ${createNode(5)}${createArrow()}${createNode(6)}${createArrow()}${createNode(4)}${createArrow()}${createNull()}
                            </div>
                        </div>
                    `
                },
                {
                    title: 'Result: 807 (stored as 7→0→8)',
                    content: createDummyNodeDiagram([7, 0, 8], 'D')
                }
            ]),
            approach: [
                'Create dummy node to simplify list construction',
                'Initialize carry = 0',
                'While either list has nodes or carry exists:',
                '  - Sum = val1 + val2 + carry',
                '  - Create new node with (sum % 10)',
                '  - Update carry = sum / 10',
                'Return dummy.next'
            ],
            timeComplexity: 'O(max(m, n))',
            spaceComplexity: 'O(max(m, n))',
            code: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    int carry = 0;
    
    while (l1 || l2 || carry) {
        int sum = carry;
        
        if (l1) {
            sum += l1->val;
            l1 = l1->next;
        }
        if (l2) {
            sum += l2->val;
            l2 = l2->next;
        }
        
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }
    
    return dummy->next;
}`
        },
        {
            title: 'Merge Two Sorted Lists',
            link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
            difficulty: 'Easy',
            intuition: 'Compare nodes from both lists and attach the smaller one to result. Dummy node lets us build the merged list without special handling for the first node.',
            visual: createStepsVisual([
                {
                    title: 'Two Sorted Lists',
                    content: `
                        <div class="ll-lists-container">
                            <div class="ll-list-row">
                                <span class="ll-list-label">L1:</span>
                                ${createNode(1)}${createArrow()}${createNode(2)}${createArrow()}${createNode(4)}${createArrow()}${createNull()}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">L2:</span>
                                ${createNode(1)}${createArrow()}${createNode(3)}${createArrow()}${createNode(4)}${createArrow()}${createNull()}
                            </div>
                        </div>
                    `
                },
                {
                    title: 'Merged Result',
                    content: createDummyNodeDiagram([1, 1, 2, 3, 4, 4], 'D')
                }
            ]),
            approach: [
                'Create dummy node as the start of merged list',
                'Compare current nodes of both lists',
                'Attach smaller node to result, advance that pointer',
                'When one list exhausted, attach remaining of other',
                'Return dummy.next'
            ],
            timeComplexity: 'O(m + n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            curr->next = l1;
            l1 = l1->next;
        } else {
            curr->next = l2;
            l2 = l2->next;
        }
        curr = curr->next;
    }
    
    curr->next = l1 ? l1 : l2;
    
    return dummy->next;
}`
        },
        {
            title: 'Partition List',
            link: 'https://leetcode.com/problems/partition-list/',
            difficulty: 'Medium',
            intuition: 'Create two separate lists: one for nodes less than x, one for nodes >= x. Using dummy nodes for both lists simplifies the construction, then connect them at the end.',
            visual: createStepsVisual([
                {
                    title: 'Original: partition around x=3',
                    content: createLinkedList([1, 4, 3, 2, 5, 2], {})
                },
                {
                    title: 'Build two lists with dummy nodes',
                    content: `
                        <div class="ll-lists-container">
                            <div class="ll-list-row">
                                <span class="ll-list-label">&lt; 3:</span>
                                ${createNode('D', 'dummy')}${createArrow()}${createNode(1, 'slow')}${createArrow()}${createNode(2, 'slow')}${createArrow()}${createNode(2, 'slow')}
                            </div>
                            <div class="ll-list-row">
                                <span class="ll-list-label">≥ 3:</span>
                                ${createNode('D', 'dummy')}${createArrow()}${createNode(4, 'fast')}${createArrow()}${createNode(3, 'fast')}${createArrow()}${createNode(5, 'fast')}
                            </div>
                        </div>
                    `
                },
                {
                    title: 'Connect: less-list → greater-list',
                    content: createLinkedList([1, 2, 2, 4, 3, 5], { nodeClasses: {0: 'slow', 1: 'slow', 2: 'slow', 3: 'fast', 4: 'fast', 5: 'fast'} })
                }
            ]),
            approach: [
                'Create two dummy nodes: beforeHead and afterHead',
                'Traverse original list',
                'If node.val < x, append to before list',
                'Else append to after list',
                'Connect before list to after list',
                'Set after list\'s tail to null',
                'Return beforeHead.next'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* partition(ListNode* head, int x) {
    ListNode* beforeDummy = new ListNode(0);
    ListNode* afterDummy = new ListNode(0);
    
    ListNode* before = beforeDummy;
    ListNode* after = afterDummy;
    
    while (head) {
        if (head->val < x) {
            before->next = head;
            before = before->next;
        } else {
            after->next = head;
            after = after->next;
        }
        head = head->next;
    }
    
    after->next = nullptr;  // Important: terminate the list
    before->next = afterDummy->next;
    
    return beforeDummy->next;
}`
        },
        {
            title: 'Remove Duplicates from Sorted List',
            link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/',
            difficulty: 'Easy',
            intuition: 'Since list is sorted, duplicates are adjacent. We can skip duplicate nodes by adjusting pointers. While this can be done without dummy, understanding the pattern helps with harder variants.',
            visual: createStepsVisual([
                {
                    title: 'Original (sorted with duplicates)',
                    content: createLinkedList([1, 1, 2, 3, 3], {})
                },
                {
                    title: 'After removing duplicates',
                    content: createLinkedList([1, 2, 3], { highlightIndex: -1 })
                }
            ]),
            approach: [
                'Start with current pointer at head',
                'While current and current.next exist:',
                '  - If current.val == current.next.val, skip next node',
                '  - Else move current forward',
                'Return head'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* deleteDuplicates(ListNode* head) {
    ListNode* curr = head;
    
    while (curr && curr->next) {
        if (curr->val == curr->next->val) {
            curr->next = curr->next->next;
        } else {
            curr = curr->next;
        }
    }
    
    return head;
}`
        },
        {
            title: 'Remove Duplicates from Sorted List II',
            link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/',
            difficulty: 'Medium',
            intuition: 'Unlike the easier version, we need to remove ALL nodes that have duplicates. Dummy node is essential here because even the head might be removed.',
            visual: createStepsVisual([
                {
                    title: 'Original: [1,2,3,3,4,4,5]',
                    content: createLinkedList([1, 2, 3, 3, 4, 4, 5], { nodeClasses: {2: 'highlight', 3: 'highlight', 4: 'highlight', 5: 'highlight'} })
                },
                {
                    title: 'After: Remove all duplicated values',
                    content: createDummyNodeDiagram([1, 2, 5], 'D')
                }
            ]),
            approach: [
                'Create dummy node pointing to head',
                'Use prev pointer starting at dummy',
                'While curr exists:',
                '  - If curr has duplicates, skip all nodes with that value',
                '  - Connect prev.next to the node after all duplicates',
                '  - Else move prev forward',
                'Return dummy.next'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            code: `ListNode* deleteDuplicates(ListNode* head) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    
    ListNode* prev = dummy;
    
    while (head) {
        // Skip all duplicates
        if (head->next && head->val == head->next->val) {
            while (head->next && head->val == head->next->val) {
                head = head->next;
            }
            prev->next = head->next;
        } else {
            prev = prev->next;
        }
        head = head->next;
    }
    
    return dummy->next;
}`
        }
    ]
};
