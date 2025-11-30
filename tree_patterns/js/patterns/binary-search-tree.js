window.bstPattern = {
    title: "Pattern 3: Binary Search Tree Operations",
    scenario: "When working with BST properties: left subtree has smaller values, right subtree has larger values. Inorder traversal gives sorted order.",
    clue: "Look for problems involving searching, insertion, deletion, or validation in BST. Key insight: BST property allows O(log n) operations and inorder gives sorted sequence.",
    problems: [
        {
            title: "98. Validate Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
            intuition: "Each node must be within a valid range. Root can be anything, but left child must be less than root, right child must be greater. Pass bounds down.",
            approach: "DFS with min/max bounds. Initially (-∞, +∞). For left child: upper bound becomes parent. For right child: lower bound becomes parent.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
Valid BST:
        5
       / \\
      3   7
     / \\
    2   4

Check: 5 in (-∞,+∞) ✓
       3 in (-∞,5) ✓
       7 in (5,+∞) ✓
       2 in (-∞,3) ✓
       4 in (3,5) ✓
</div>`,
            code: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
    
    bool validate(TreeNode* node, long minVal, long maxVal) {
        if (!node) return true;
        
        if (node->val <= minVal || node->val >= maxVal) {
            return false;
        }
        
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
};`
        },
        {
            title: "700. Search in a Binary Search Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            intuition: "BST property: if target < current, go left; if target > current, go right. Binary search in tree form.",
            approach: "Start at root. Compare with target. Go left or right based on comparison. Return node when found or null.",
            timeComplexity: "O(h)",
            spaceComplexity: "O(1) iterative, O(h) recursive",
            code: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root && root->val != val) {
            root = val < root->val ? root->left : root->right;
        }
        return root;
    }
};`
        },
        {
            title: "701. Insert into a Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
            intuition: "Find the correct leaf position using BST property. New node always becomes a leaf (for simplicity). Navigate to null position and insert.",
            approach: "Navigate tree: go left if val < current, right otherwise. When reaching null, insert new node there.",
            timeComplexity: "O(h)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (!root) return new TreeNode(val);
        
        if (val < root->val) {
            root->left = insertIntoBST(root->left, val);
        } else {
            root->right = insertIntoBST(root->right, val);
        }
        return root;
    }
};`
        },
        {
            title: "450. Delete Node in a BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
            intuition: "Three cases: leaf (just delete), one child (replace with child), two children (replace with inorder successor/predecessor).",
            approach: "Find node. If leaf, return null. If one child, return that child. If two children, find min in right subtree (successor), copy value, delete successor.",
            timeComplexity: "O(h)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
Delete 3 from:
        5               5
       / \\             / \\
      3   6    →      4   6
     / \\             /
    2   4           2

Case: two children
Replace 3 with inorder successor (4)
Delete 4 from right subtree
</div>`,
            code: `class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        
        if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else {
            // Found node to delete
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            
            // Two children: find inorder successor
            TreeNode* successor = root->right;
            while (successor->left) {
                successor = successor->left;
            }
            root->val = successor->val;
            root->right = deleteNode(root->right, successor->val);
        }
        return root;
    }
};`
        },
        {
            title: "230. Kth Smallest Element in a BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            intuition: "Inorder traversal of BST gives sorted order. K-th element in inorder is k-th smallest. Stop early when count reaches k.",
            approach: "Iterative inorder: push all left nodes, pop one (increment count), if count == k return. Otherwise go right.",
            timeComplexity: "O(h + k)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        int count = 0;
        
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top();
            st.pop();
            
            if (++count == k) return curr->val;
            
            curr = curr->right;
        }
        return -1;
    }
};`
        },
        {
            title: "99. Recover Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/recover-binary-search-tree/",
            intuition: "Two nodes are swapped. In inorder, find where order is violated. First violation: larger node is first swapped. Second violation (or same): smaller node is second swapped.",
            approach: "Inorder traversal, track prev node. When prev > curr, found violation. First time: first = prev, second = curr. Later violations update second.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
Swapped BST:          Correct BST:
      3                    2
     / \\                  / \\
    1   4                 1   4
       /                     /
      2                     3

Inorder: 1,3,2,4 (wrong)
         1,2,3,4 (correct)

Violations: 3 > 2
first = 3, second = 2
Swap them!
</div>`,
            code: `class Solution {
public:
    TreeNode* first = nullptr;
    TreeNode* second = nullptr;
    TreeNode* prev = nullptr;
    
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
    
    void inorder(TreeNode* node) {
        if (!node) return;
        
        inorder(node->left);
        
        if (prev && prev->val > node->val) {
            if (!first) {
                first = prev;
            }
            second = node;
        }
        prev = node;
        
        inorder(node->right);
    }
};`
        }
    ]
};
