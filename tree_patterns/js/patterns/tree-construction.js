window.treeConstructionPattern = {
    title: "Pattern 2: Tree Construction",
    scenario: "You need to build a tree from given traversal sequences or other representations. Different traversal combinations uniquely identify a tree.",
    clue: "Look for problems where you're given preorder/inorder/postorder arrays and need to reconstruct the tree. Key insight: preorder/postorder gives root, inorder gives left/right split.",
    problems: [
        {
            title: "105. Construct Binary Tree from Preorder and Inorder Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            intuition: "Preorder's first element is root. Find root in inorder to split into left and right subtrees. Recursively build subtrees.",
            approach: "Use hashmap for O(1) inorder index lookup. First preorder element is root, find its position in inorder. Elements left of it form left subtree, right form right subtree.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]

Root = 3 (first in preorder)
In inorder: [9] | 3 | [15,20,7]
           left     right

Left subtree:  preorder[1:2], inorder[0:1] → node 9
Right subtree: preorder[2:5], inorder[2:5] → build recursively

        3
       / \\
      9  20
        /  \\
       15   7
</div>`,
            code: `class Solution {
public:
    unordered_map<int, int> inorderIdx;
    int preIdx = 0;
    
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) {
            inorderIdx[inorder[i]] = i;
        }
        return build(preorder, 0, inorder.size() - 1);
    }
    
    TreeNode* build(vector<int>& preorder, int left, int right) {
        if (left > right) return nullptr;
        
        int rootVal = preorder[preIdx++];
        TreeNode* root = new TreeNode(rootVal);
        int mid = inorderIdx[rootVal];
        
        root->left = build(preorder, left, mid - 1);
        root->right = build(preorder, mid + 1, right);
        
        return root;
    }
};`
        },
        {
            title: "106. Construct Binary Tree from Inorder and Postorder Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
            intuition: "Postorder's last element is root. Find root in inorder to split. Build right subtree first (postorder processes right before left when reversed).",
            approach: "Similar to preorder+inorder, but start from end of postorder. Build right subtree before left because postorder is left-right-root.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    unordered_map<int, int> inorderIdx;
    int postIdx;
    
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        postIdx = postorder.size() - 1;
        for (int i = 0; i < inorder.size(); i++) {
            inorderIdx[inorder[i]] = i;
        }
        return build(postorder, 0, inorder.size() - 1);
    }
    
    TreeNode* build(vector<int>& postorder, int left, int right) {
        if (left > right) return nullptr;
        
        int rootVal = postorder[postIdx--];
        TreeNode* root = new TreeNode(rootVal);
        int mid = inorderIdx[rootVal];
        
        // Build right first for postorder
        root->right = build(postorder, mid + 1, right);
        root->left = build(postorder, left, mid - 1);
        
        return root;
    }
};`
        },
        {
            title: "889. Construct Binary Tree from Preorder and Postorder Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/",
            intuition: "Without inorder, tree isn't unique. Preorder[1] is left child's root (if exists). Find it in postorder to determine left subtree size.",
            approach: "First element of preorder is root. Second element is root of left subtree. Find its position in postorder to get left subtree size.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            visual: `<div class="visual-diagram">
preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]

Root = 1
Left child root = 2 (preorder[1])
Find 2 in postorder at index 2 → left subtree has 3 nodes [4,5,2]

        1
       / \\
      2   3
     / \\ / \\
    4  5 6  7
</div>`,
            code: `class Solution {
public:
    unordered_map<int, int> postIdx;
    int preIdx = 0;
    
    TreeNode* constructFromPrePost(vector<int>& preorder, vector<int>& postorder) {
        for (int i = 0; i < postorder.size(); i++) {
            postIdx[postorder[i]] = i;
        }
        return build(preorder, postorder, 0, postorder.size() - 1);
    }
    
    TreeNode* build(vector<int>& preorder, vector<int>& postorder, int left, int right) {
        if (left > right || preIdx >= preorder.size()) return nullptr;
        
        TreeNode* root = new TreeNode(preorder[preIdx++]);
        
        if (left == right) return root;
        
        // Find left child's root in postorder
        int leftRootIdx = postIdx[preorder[preIdx]];
        int leftSize = leftRootIdx - left + 1;
        
        root->left = build(preorder, postorder, left, leftRootIdx);
        root->right = build(preorder, postorder, leftRootIdx + 1, right - 1);
        
        return root;
    }
};`
        },
        {
            title: "1008. Construct Binary Search Tree from Preorder Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
            intuition: "For BST, preorder alone is enough. First element is root. All smaller elements go left, larger go right. Use bounds to validate placement.",
            approach: "Maintain upper bound. Process preorder left to right. If value within bound, create node, recurse with updated bounds.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    int idx = 0;
    
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        return build(preorder, INT_MAX);
    }
    
    TreeNode* build(vector<int>& preorder, int bound) {
        if (idx >= preorder.size() || preorder[idx] > bound) {
            return nullptr;
        }
        
        TreeNode* root = new TreeNode(preorder[idx++]);
        root->left = build(preorder, root->val);
        root->right = build(preorder, bound);
        
        return root;
    }
};`
        },
        {
            title: "108. Convert Sorted Array to Binary Search Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
            intuition: "Height-balanced BST: pick middle element as root. Left half becomes left subtree, right half becomes right subtree. Recursively build.",
            approach: "Binary search style: mid element is root, recurse on left half and right half. This ensures minimum height.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(log n)",
            visual: `<div class="visual-diagram">
nums = [-10,-3,0,5,9]

Mid = 0 (index 2) → root
Left: [-10,-3] → mid = -3 → left child
Right: [5,9] → mid = 5 → right child

        0
       / \\
     -3   9
     /   /
   -10  5
</div>`,
            code: `class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
    
    TreeNode* build(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        
        root->left = build(nums, left, mid - 1);
        root->right = build(nums, mid + 1, right);
        
        return root;
    }
};`
        },
        {
            title: "297. Serialize and Deserialize Binary Tree",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            intuition: "Convert tree to string and back. Use preorder with null markers. Null nodes are important to uniquely identify structure.",
            approach: "Serialize: preorder traversal, use 'null' for nullptr, comma-separate. Deserialize: parse values, recursively build using same preorder logic.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            code: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "null";
        return to_string(root->val) + "," + 
               serialize(root->left) + "," + 
               serialize(root->right);
    }

    TreeNode* deserialize(string data) {
        queue<string> nodes;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) {
            nodes.push(token);
        }
        return build(nodes);
    }
    
private:
    TreeNode* build(queue<string>& nodes) {
        string val = nodes.front();
        nodes.pop();
        
        if (val == "null") return nullptr;
        
        TreeNode* root = new TreeNode(stoi(val));
        root->left = build(nodes);
        root->right = build(nodes);
        
        return root;
    }
};`
        }
    ]
};
