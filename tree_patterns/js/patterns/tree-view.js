window.treeViewPattern = {
    title: "Pattern 7: Tree View Problems",
    scenario: "View tree from different perspectives: top, bottom, left, right, or vertical order. Usually involves tracking positions and selecting representatives.",
    clue: "Look for problems asking for nodes visible from a direction. Use horizontal distance (HD) for vertical views, depth for left/right views. BFS often preferred for level ordering.",
    problems: [
        {
            title: "199. Binary Tree Right Side View",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
            intuition: "Rightmost node at each level. BFS: last node of each level. DFS: visit right first, first node at each depth is answer.",
            approach: "BFS: for each level, add last node to result. Or DFS: track depth, if result.size() == depth, this is first node seen at this depth from right.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h) or O(w)",
            visual: `<div class="visual-diagram">
        1       ←  see 1
       / \\
      2   3     ←  see 3
       \\   \\
        5   4   ←  see 4

Right side view: [1, 3, 4]

BFS level by level, take last of each level
</div>`,
            code: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> result;
        dfs(root, 0, result);
        return result;
    }
    
    void dfs(TreeNode* node, int depth, vector<int>& result) {
        if (!node) return;
        
        if (depth == result.size()) {
            result.push_back(node->val);
        }
        
        dfs(node->right, depth + 1, result);  // Right first
        dfs(node->left, depth + 1, result);
    }
};`
        },
        {
            title: "314. Binary Tree Vertical Order Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-vertical-order-traversal/",
            intuition: "Group nodes by horizontal distance (HD). Root HD=0, left child HD-1, right child HD+1. Within same HD, order by level (BFS).",
            approach: "BFS with (node, HD) pairs. Use map to group nodes by HD. Map keys sorted give left-to-right order. BFS ensures top-to-bottom within column.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
        3 (HD=0)
       / \\
      9   20 (HD=-1, +1)
         /  \\
        15   7 (HD=0, +2)

Columns by HD:
  HD=-1: [9]
  HD=0:  [3, 15]
  HD=1:  [20]
  HD=2:  [7]

Result: [[9], [3,15], [20], [7]]
</div>`,
            code: `class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        map<int, vector<int>> columns;  // HD -> nodes
        queue<pair<TreeNode*, int>> q;  // node, HD
        q.push({root, 0});
        
        while (!q.empty()) {
            auto [node, hd] = q.front();
            q.pop();
            
            columns[hd].push_back(node->val);
            
            if (node->left) q.push({node->left, hd - 1});
            if (node->right) q.push({node->right, hd + 1});
        }
        
        for (auto& [hd, nodes] : columns) {
            result.push_back(nodes);
        }
        return result;
    }
};`
        },
        {
            title: "987. Vertical Order Traversal of a Binary Tree",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            intuition: "Like vertical order but with tiebreaker: same row+col sorted by value. Use (col, row, val) for ordering.",
            approach: "Track (row, col) for each node. Group by col, then sort within column by (row, val). Can use map<col, map<row, multiset<val>>>.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        // col -> row -> sorted values
        map<int, map<int, multiset<int>>> grid;
        dfs(root, 0, 0, grid);
        
        vector<vector<int>> result;
        for (auto& [col, rows] : grid) {
            vector<int> column;
            for (auto& [row, values] : rows) {
                column.insert(column.end(), values.begin(), values.end());
            }
            result.push_back(column);
        }
        return result;
    }
    
    void dfs(TreeNode* node, int row, int col, 
             map<int, map<int, multiset<int>>>& grid) {
        if (!node) return;
        
        grid[col][row].insert(node->val);
        dfs(node->left, row + 1, col - 1, grid);
        dfs(node->right, row + 1, col + 1, grid);
    }
};`
        },
        {
            title: "Top View of Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/",
            intuition: "First node at each horizontal distance when viewed from top. BFS to ensure we see top-most node first at each HD.",
            approach: "BFS with HD tracking. For each HD, only record first node encountered (top-most). Use map to maintain HD order.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
        1
       / \\
      2   3
     / \\   \\
    4   5   6

HD: -2  -1   0   1   2
     4   2   1   3   6

Top view: [4, 2, 1, 3, 6]
(5 hidden by 1)
</div>`,
            code: `vector<int> topView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    map<int, int> topNodes;  // HD -> node value
    queue<pair<TreeNode*, int>> q;
    q.push({root, 0});
    
    while (!q.empty()) {
        auto [node, hd] = q.front();
        q.pop();
        
        // Only record first node at each HD
        if (topNodes.find(hd) == topNodes.end()) {
            topNodes[hd] = node->val;
        }
        
        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    
    for (auto& [hd, val] : topNodes) {
        result.push_back(val);
    }
    return result;
}`
        },
        {
            title: "Bottom View of Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://www.geeksforgeeks.org/bottom-view-binary-tree/",
            intuition: "Last node at each horizontal distance when viewed from bottom. BFS: keep overwriting to get bottom-most at each HD.",
            approach: "BFS with HD tracking. For each HD, always update with current node (last one wins = bottom-most). Use map for HD order.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(n)",
            code: `vector<int> bottomView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    map<int, int> bottomNodes;  // HD -> node value
    queue<pair<TreeNode*, int>> q;
    q.push({root, 0});
    
    while (!q.empty()) {
        auto [node, hd] = q.front();
        q.pop();
        
        // Always update - last node at each HD wins
        bottomNodes[hd] = node->val;
        
        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    
    for (auto& [hd, val] : bottomNodes) {
        result.push_back(val);
    }
    return result;
}`
        },
        {
            title: "545. Boundary of Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/boundary-of-binary-tree/",
            intuition: "Boundary = left boundary + leaves + right boundary (reversed). Handle each part separately, avoiding duplicates.",
            approach: "1) Add root. 2) DFS left boundary (not leaves). 3) DFS all leaves. 4) DFS right boundary in reverse (not leaves).",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        vector<int> result;
        if (!root) return result;
        
        if (!isLeaf(root)) result.push_back(root->val);
        
        addLeftBoundary(root->left, result);
        addLeaves(root, result);
        addRightBoundary(root->right, result);
        
        return result;
    }
    
    bool isLeaf(TreeNode* node) {
        return node && !node->left && !node->right;
    }
    
    void addLeftBoundary(TreeNode* node, vector<int>& result) {
        while (node) {
            if (!isLeaf(node)) result.push_back(node->val);
            node = node->left ? node->left : node->right;
        }
    }
    
    void addLeaves(TreeNode* node, vector<int>& result) {
        if (!node) return;
        if (isLeaf(node)) {
            result.push_back(node->val);
            return;
        }
        addLeaves(node->left, result);
        addLeaves(node->right, result);
    }
    
    void addRightBoundary(TreeNode* node, vector<int>& result) {
        vector<int> temp;
        while (node) {
            if (!isLeaf(node)) temp.push_back(node->val);
            node = node->right ? node->right : node->left;
        }
        for (int i = temp.size() - 1; i >= 0; i--) {
            result.push_back(temp[i]);
        }
    }
};`
        }
    ]
};
