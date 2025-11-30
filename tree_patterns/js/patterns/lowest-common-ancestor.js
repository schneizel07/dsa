window.lcaPattern = {
    title: "Pattern 4: Lowest Common Ancestor (LCA)",
    scenario: "Find the deepest node that is an ancestor of both given nodes. The LCA is where the paths from root to both nodes diverge.",
    clue: "Look for problems finding shared ancestors, distances between nodes, or path-related queries. LCA is the meeting point when tracing paths upward from both nodes.",
    problems: [
        {
            title: "236. Lowest Common Ancestor of a Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            intuition: "If both p and q are in different subtrees, current node is LCA. If both in same subtree, LCA is in that subtree. If current is p or q, it could be LCA.",
            approach: "Recursive: if node is null/p/q, return it. Recurse left and right. If both return non-null, current is LCA. Otherwise return the non-null one.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
        3
       / \\
      5   1
     / \\ / \\
    6  2 0  8
      / \\
     7   4

LCA(5, 1) = 3 (p and q in different subtrees)
LCA(5, 4) = 5 (p is ancestor of q)
LCA(6, 4) = 5 (both in left subtree)
</div>`,
            code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        if (left && right) return root;  // p and q in different subtrees
        return left ? left : right;       // Both in same subtree
    }
};`
        },
        {
            title: "235. Lowest Common Ancestor of a Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            intuition: "Use BST property: if both p and q are smaller, LCA is in left subtree. If both larger, LCA is in right subtree. Otherwise, current node is LCA (split point).",
            approach: "Start at root. If both p,q < root, go left. If both > root, go right. Otherwise (one on each side or equal to root), current is LCA.",
            timeComplexity: "O(h)",
            spaceComplexity: "O(1) iterative",
            code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } else {
                return root;
            }
        }
        return nullptr;
    }
};`
        },
        {
            title: "1644. Lowest Common Ancestor of a Binary Tree II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/",
            intuition: "Same as LCA but nodes might not exist in tree. Need to verify both nodes are found before returning LCA.",
            approach: "Track if p and q are found. Do full traversal (don't short-circuit). Only return LCA if both nodes exist.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    bool foundP = false, foundQ = false;
    
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* lca = findLCA(root, p, q);
        return (foundP && foundQ) ? lca : nullptr;
    }
    
    TreeNode* findLCA(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root) return nullptr;
        
        TreeNode* left = findLCA(root->left, p, q);
        TreeNode* right = findLCA(root->right, p, q);
        
        if (root == p) {
            foundP = true;
            return root;
        }
        if (root == q) {
            foundQ = true;
            return root;
        }
        
        if (left && right) return root;
        return left ? left : right;
    }
};`
        },
        {
            title: "1650. Lowest Common Ancestor of a Binary Tree III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/",
            intuition: "Nodes have parent pointers. Like finding intersection of two linked lists! Trace both paths to root, they'll meet at LCA.",
            approach: "Two pointers starting at p and q. Move up to parent. When reaching root, jump to the other starting node. They'll meet at LCA.",
            timeComplexity: "O(h)",
            spaceComplexity: "O(1)",
            visual: `<div class="visual-diagram">
Like intersection of linked lists:

p: 5 → 3 → null → 1 → 3 ✓
q: 1 → 3 → null → 5 → 3 ✓

Both reach 3 at same time (LCA)

Or use set: store p's ancestors, find first q ancestor in set
</div>`,
            code: `class Solution {
public:
    Node* lowestCommonAncestor(Node* p, Node* q) {
        Node* a = p;
        Node* b = q;
        
        while (a != b) {
            a = a->parent ? a->parent : q;
            b = b->parent ? b->parent : p;
        }
        return a;
    }
};`
        },
        {
            title: "1676. Lowest Common Ancestor of a Binary Tree IV",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/",
            intuition: "Find LCA of multiple nodes. LCA is the deepest node that is ancestor of ALL given nodes. Similar logic: count how many target nodes in subtrees.",
            approach: "Put all target nodes in a set. Recursively check: if node is in set, return it. If left and right both return non-null, current is LCA.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    unordered_set<TreeNode*> nodeSet;
    
    TreeNode* lowestCommonAncestor(TreeNode* root, vector<TreeNode*>& nodes) {
        for (auto node : nodes) {
            nodeSet.insert(node);
        }
        return findLCA(root);
    }
    
    TreeNode* findLCA(TreeNode* root) {
        if (!root || nodeSet.count(root)) return root;
        
        TreeNode* left = findLCA(root->left);
        TreeNode* right = findLCA(root->right);
        
        if (left && right) return root;
        return left ? left : right;
    }
};`
        },
        {
            title: "1123. Lowest Common Ancestor of Deepest Leaves",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/",
            intuition: "Find LCA of all deepest leaves. If both subtrees have same max depth, current node is LCA. Otherwise, LCA is in deeper subtree.",
            approach: "Return both depth and LCA candidate. If left depth == right depth, current is LCA. Otherwise, return result from deeper subtree.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
        3
       / \\
      5   1
     / \\
    6   2
       / \\
      7   4

Deepest leaves: 7, 4 (depth 3)
Their LCA: 2

At node 5: left depth 1, right depth 2
          → go right, return (2, depth 3)
At node 3: left depth 3, right depth 1
          → return left result (2)
</div>`,
            code: `class Solution {
public:
    TreeNode* lcaDeepestLeaves(TreeNode* root) {
        return dfs(root).second;
    }
    
    pair<int, TreeNode*> dfs(TreeNode* node) {
        if (!node) return {0, nullptr};
        
        auto [leftDepth, leftLCA] = dfs(node->left);
        auto [rightDepth, rightLCA] = dfs(node->right);
        
        if (leftDepth == rightDepth) {
            return {leftDepth + 1, node};
        } else if (leftDepth > rightDepth) {
            return {leftDepth + 1, leftLCA};
        } else {
            return {rightDepth + 1, rightLCA};
        }
    }
};`
        }
    ]
};
