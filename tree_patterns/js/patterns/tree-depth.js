window.treeDepthPattern = {
    title: "Pattern 6: Tree Depth/Height Problems",
    scenario: "Compute or use depth/height information about trees. Depth is distance from root, height is distance to deepest leaf.",
    clue: "Look for problems involving levels, distances from root, or tree balance. Depth passes top-down, height returns bottom-up.",
    problems: [
        {
            title: "104. Maximum Depth of Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            intuition: "Max depth = 1 + max(left_depth, right_depth). Recursive: depth of empty tree is 0, otherwise 1 plus max of children depths.",
            approach: "Bottom-up recursion: return 0 for null, otherwise return 1 + max of left and right subtree depths.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`
        },
        {
            title: "111. Minimum Depth of Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
            intuition: "Min depth is shortest root-to-leaf path. Careful: if one child is null, min depth is NOT 0, it's depth of other subtree + 1.",
            approach: "Handle single-child case: if one child null, use other child's depth. If both exist, use minimum. BFS is more efficient (stops at first leaf).",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h) DFS, O(w) BFS",
            visual: `<div class="visual-diagram">
      3
       \\
        9
       / \\
      4   5

Wrong: min(0, depth(9)) + 1 = 1
Right: Only 9's subtree matters, min depth = 3

3 → 9 → 4 (or 5) = depth 3
</div>`,
            code: `class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        
        // BFS - stops at first leaf
        queue<TreeNode*> q;
        q.push(root);
        int depth = 1;
        
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                if (!node->left && !node->right) {
                    return depth;
                }
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            depth++;
        }
        return depth;
    }
};`
        },
        {
            title: "110. Balanced Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
            intuition: "Balanced: for every node, height difference of left and right ≤ 1. Check this condition while computing heights bottom-up.",
            approach: "Return height if balanced, -1 if unbalanced. At each node: if either child returns -1, propagate -1. If height diff > 1, return -1.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
    
    int checkHeight(TreeNode* node) {
        if (!node) return 0;
        
        int left = checkHeight(node->left);
        if (left == -1) return -1;
        
        int right = checkHeight(node->right);
        if (right == -1) return -1;
        
        if (abs(left - right) > 1) return -1;
        
        return 1 + max(left, right);
    }
};`
        },
        {
            title: "662. Maximum Width of Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/",
            intuition: "Width = rightmost - leftmost + 1 at each level, including nulls. Assign indices: root=0, left=2*i, right=2*i+1. Track min/max at each level.",
            approach: "BFS with indices. For each level, width = max_index - min_index + 1. To prevent overflow, normalize indices relative to leftmost at each level.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(w)",
            visual: `<div class="visual-diagram">
        1           idx: 0
       / \\
      3   2         idx: 0, 1
     / \\   \\
    5   3   9       idx: 0, 1, 3

Level 0: width = 1
Level 1: width = 1-0+1 = 2
Level 2: width = 3-0+1 = 4 (includes null positions)
</div>`,
            code: `class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        
        int maxWidth = 0;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 0});
        
        while (!q.empty()) {
            int size = q.size();
            unsigned long long minIdx = q.front().second;
            unsigned long long first, last;
            
            for (int i = 0; i < size; i++) {
                auto [node, idx] = q.front();
                q.pop();
                idx -= minIdx;  // Normalize to prevent overflow
                
                if (i == 0) first = idx;
                if (i == size - 1) last = idx;
                
                if (node->left) q.push({node->left, 2 * idx});
                if (node->right) q.push({node->right, 2 * idx + 1});
            }
            maxWidth = max(maxWidth, (int)(last - first + 1));
        }
        return maxWidth;
    }
};`
        },
        {
            title: "559. Maximum Depth of N-ary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-n-ary-tree/",
            intuition: "Same as binary tree but with multiple children. Max depth = 1 + max of all children depths. Iterate through all children.",
            approach: "Recursive: return 0 for null, otherwise return 1 + maximum depth among all children.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    int maxDepth(Node* root) {
        if (!root) return 0;
        
        int maxChildDepth = 0;
        for (Node* child : root->children) {
            maxChildDepth = max(maxChildDepth, maxDepth(child));
        }
        return 1 + maxChildDepth;
    }
};`
        },
        {
            title: "965. Univalued Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/univalued-binary-tree/",
            intuition: "All nodes have same value. Simple DFS: compare each node with root value (or parent value). If any mismatch, return false.",
            approach: "Pass expected value down or compare with root. Return false if mismatch, recurse on children.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    bool isUnivalTree(TreeNode* root) {
        return dfs(root, root->val);
    }
    
    bool dfs(TreeNode* node, int val) {
        if (!node) return true;
        if (node->val != val) return false;
        return dfs(node->left, val) && dfs(node->right, val);
    }
};`
        }
    ]
};
