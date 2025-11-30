window.basicTraversalPattern = {
    title: "Pattern 1: Basic Tree Traversal",
    scenario: "You need to visit all nodes of a tree in a specific order. Traversal order affects how you process nodes and what information you can accumulate.",
    clue: "Look for problems requiring visiting nodes in preorder (root-left-right), inorder (left-root-right), postorder (left-right-root), or level order (BFS). The traversal order determines what information is available when processing each node.",
    problems: [
        {
            title: "94. Binary Tree Inorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            intuition: "Inorder: left subtree → root → right subtree. For BST, this gives sorted order. Use recursion or iterative with stack.",
            approach: "Recursive: visit left, add root, visit right. Iterative: push all left nodes, pop and process, then go right.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
        1
       / \\
      2   3
     / \\
    4   5

Inorder: 4 → 2 → 5 → 1 → 3

Stack simulation:
  Push 1,2,4 | Pop 4 | Pop 2 | Push 5 | Pop 5 | Pop 1 | Push 3 | Pop 3
</div>`,
            code: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode*> st;
        TreeNode* curr = root;
        
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top();
            st.pop();
            result.push_back(curr->val);
            curr = curr->right;
        }
        return result;
    }
};`
        },
        {
            title: "144. Binary Tree Preorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            intuition: "Preorder: root → left subtree → right subtree. Process node first, then children. Use recursion or stack.",
            approach: "Iterative: push root, pop and process, push right then left (so left is processed first). Or recursive: process, recurse left, recurse right.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        if (!root) return result;
        
        stack<TreeNode*> st;
        st.push(root);
        
        while (!st.empty()) {
            TreeNode* node = st.top();
            st.pop();
            result.push_back(node->val);
            
            if (node->right) st.push(node->right);
            if (node->left) st.push(node->left);
        }
        return result;
    }
};`
        },
        {
            title: "145. Binary Tree Postorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            intuition: "Postorder: left subtree → right subtree → root. Children processed before parent. Useful for delete operations, calculating subtree properties.",
            approach: "Modified preorder (root-right-left) then reverse, or use two stacks, or track last visited node.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        if (!root) return result;
        
        stack<TreeNode*> st;
        st.push(root);
        
        while (!st.empty()) {
            TreeNode* node = st.top();
            st.pop();
            result.push_back(node->val);
            
            if (node->left) st.push(node->left);
            if (node->right) st.push(node->right);
        }
        reverse(result.begin(), result.end());
        return result;
    }
};`
        },
        {
            title: "102. Binary Tree Level Order Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            intuition: "BFS level by level. Use queue, process all nodes at current level before moving to next. Track level size to separate levels.",
            approach: "Queue-based BFS. For each level: note queue size, process that many nodes, add their children. Collect each level separately.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(w) where w is max width",
            visual: `<div class="visual-diagram">
        3
       / \\
      9  20
        /  \\
       15   7

Level 0: [3]
Level 1: [9, 20]
Level 2: [15, 7]

Result: [[3], [9,20], [15,7]]
</div>`,
            code: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`
        },
        {
            title: "103. Binary Tree Zigzag Level Order Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
            intuition: "Level order but alternate direction each level. Even levels left-to-right, odd levels right-to-left. Use deque or reverse alternate levels.",
            approach: "Standard BFS with level tracking. For odd levels, insert at front of level vector (or reverse after). Toggle direction flag each level.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(w)",
            code: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level(levelSize);
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                int index = leftToRight ? i : levelSize - 1 - i;
                level[index] = node->val;
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
            leftToRight = !leftToRight;
        }
        return result;
    }
};`
        },
        {
            title: "107. Binary Tree Level Order Traversal II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/",
            intuition: "Bottom-up level order. Same as regular level order, but return levels from bottom to top. Simply reverse the result at the end.",
            approach: "Standard level order BFS, then reverse the result vector. Or insert each level at the beginning.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(w)",
            code: `class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        reverse(result.begin(), result.end());
        return result;
    }
};`
        }
    ]
};
