window.treeTransformPattern = {
    title: "Pattern 8: Tree Transformation",
    scenario: "Modify tree structure: flatten, invert, merge, or convert to different representations. Often requires careful pointer manipulation.",
    clue: "Look for problems changing tree structure. Consider: in-place vs new tree, order of operations matters, and handle pointer reassignments carefully.",
    problems: [
        {
            title: "226. Invert Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
            intuition: "Mirror the tree: swap left and right children at every node. Recursively invert subtrees.",
            approach: "At each node: swap left and right pointers, then recursively invert both subtrees. Order doesn't matter.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
Before:        After:
    4             4
   / \\           / \\
  2   7   →    7   2
 / \\ / \\      / \\ / \\
1  3 6  9    9  6 3  1
</div>`,
            code: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        
        return root;
    }
};`
        },
        {
            title: "114. Flatten Binary Tree to Linked List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
            intuition: "Preorder traversal becomes linked list using right pointers. Key: before flattening left, save right. After flattening left, connect to right.",
            approach: "For each node: flatten left subtree, flatten right subtree, attach flattened left to right of node, find end of flattened left, attach original right.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
    1              1
   / \\              \\
  2   5      →      2
 / \\   \\             \\
3   4   6            3
                      \\
                       4
                        \\
                         5
                          \\
                           6
</div>`,
            code: `class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        
        while (curr) {
            if (curr->left) {
                // Find rightmost in left subtree
                TreeNode* rightmost = curr->left;
                while (rightmost->right) {
                    rightmost = rightmost->right;
                }
                
                // Rewire
                rightmost->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`
        },
        {
            title: "617. Merge Two Binary Trees",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/merge-two-binary-trees/",
            intuition: "Overlay trees: if both nodes exist, sum values. If only one exists, use that node. Recursively merge children.",
            approach: "If either null, return the other. Otherwise, create new node with sum, recursively merge left and right children.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1) return root2;
        if (!root2) return root1;
        
        TreeNode* merged = new TreeNode(root1->val + root2->val);
        merged->left = mergeTrees(root1->left, root2->left);
        merged->right = mergeTrees(root1->right, root2->right);
        
        return merged;
    }
};`
        },
        {
            title: "116. Populating Next Right Pointers",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
            intuition: "Perfect binary tree: connect each node to its right neighbor at same level. Use already-established next pointers to traverse levels.",
            approach: "Process level by level using next pointers. Connect: node.left.next = node.right. If node.next exists: node.right.next = node.next.left.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            visual: `<div class="visual-diagram">
        1 → NULL
       / \\
      2 → 3 → NULL
     / \\ / \\
    4→5→6→7 → NULL

Connect children:
  node.left.next = node.right
  node.right.next = node.next.left (if node.next exists)
</div>`,
            code: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        
        Node* leftmost = root;
        
        while (leftmost->left) {
            Node* curr = leftmost;
            
            while (curr) {
                // Connect left child to right child
                curr->left->next = curr->right;
                
                // Connect right child to next node's left child
                if (curr->next) {
                    curr->right->next = curr->next->left;
                }
                
                curr = curr->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};`
        },
        {
            title: "117. Populating Next Right Pointers II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/",
            intuition: "Non-perfect tree: not all children exist. Use dummy node to track next level's head. Traverse using next pointers.",
            approach: "For each level, use dummy head for next level. As we traverse, connect children to dummy's list. Move to next level via dummy.next.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    Node* connect(Node* root) {
        Node* curr = root;
        
        while (curr) {
            Node dummy(0);  // Dummy head for next level
            Node* tail = &dummy;
            
            while (curr) {
                if (curr->left) {
                    tail->next = curr->left;
                    tail = tail->next;
                }
                if (curr->right) {
                    tail->next = curr->right;
                    tail = tail->next;
                }
                curr = curr->next;
            }
            
            curr = dummy.next;  // Move to next level
        }
        return root;
    }
};`
        },
        {
            title: "101. Symmetric Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
            intuition: "Tree is mirror of itself. Compare left subtree with mirror of right subtree. Two nodes match if values equal and mirrored children match.",
            approach: "isMirror(left, right): both null = true, one null = false, values differ = false, else check isMirror(left.left, right.right) && isMirror(left.right, right.left).",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
Symmetric:          Not Symmetric:
    1                    1
   / \\                  / \\
  2   2                2   2
 / \\ / \\                \\   \\
3  4 4  3              3   3

Compare: left.left with right.right
         left.right with right.left
</div>`,
            code: `class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root->left, root->right);
    }
    
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        
        return t1->val == t2->val &&
               isMirror(t1->left, t2->right) &&
               isMirror(t1->right, t2->left);
    }
};`
        },
        {
            title: "572. Subtree of Another Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
            intuition: "Check if subRoot matches any subtree in root. At each node, check if trees are identical. If not, check left and right subtrees.",
            approach: "For each node in main tree: check if subtree rooted here is identical to subRoot. Use separate isSameTree function.",
            timeComplexity: "O(m × n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        
        if (isSameTree(root, subRoot)) return true;
        
        return isSubtree(root->left, subRoot) || 
               isSubtree(root->right, subRoot);
    }
    
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        
        return p->val == q->val &&
               isSameTree(p->left, q->left) &&
               isSameTree(p->right, q->right);
    }
};`
        }
    ]
};
