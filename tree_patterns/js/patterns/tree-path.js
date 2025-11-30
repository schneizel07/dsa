window.treePathPattern = {
    title: "Pattern 5: Tree Path Problems",
    scenario: "Find or compute something along paths in the tree. Paths can be root-to-leaf, any node to any node, or specific path sums.",
    clue: "Look for problems involving path sums, longest paths, or path enumeration. Key technique: pass accumulated value down (top-down) or return value up (bottom-up).",
    problems: [
        {
            title: "112. Path Sum",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/path-sum/",
            intuition: "Check if any root-to-leaf path sums to target. Subtract current value from target as you go down. At leaf, check if remaining target is 0.",
            approach: "DFS, subtract node value from target. At leaf node, return true if target == node value. Otherwise recurse to children.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        
        if (!root->left && !root->right) {
            return targetSum == root->val;
        }
        
        return hasPathSum(root->left, targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};`
        },
        {
            title: "113. Path Sum II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-sum-ii/",
            intuition: "Find ALL root-to-leaf paths with given sum. Track current path, backtrack after exploring each subtree. Add path to result when valid leaf found.",
            approach: "DFS with path tracking. Add node to path, check if leaf with correct sum, recurse to children, backtrack by removing node from path.",
            timeComplexity: "O(n²) - copying paths",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> result;
        vector<int> path;
        dfs(root, targetSum, path, result);
        return result;
    }
    
    void dfs(TreeNode* node, int target, vector<int>& path, vector<vector<int>>& result) {
        if (!node) return;
        
        path.push_back(node->val);
        
        if (!node->left && !node->right && target == node->val) {
            result.push_back(path);
        }
        
        dfs(node->left, target - node->val, path, result);
        dfs(node->right, target - node->val, path, result);
        
        path.pop_back();  // Backtrack
    }
};`
        },
        {
            title: "437. Path Sum III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-sum-iii/",
            intuition: "Path can start/end anywhere. Use prefix sum: if prefixSum - targetSum exists in earlier prefix sums, we found a valid path. Like subarray sum equals k.",
            approach: "Track prefix sums in hashmap. At each node: check if (currentSum - target) exists. Add current sum to map, recurse, then remove (backtrack).",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
      10
     /  \\
    5   -3
   / \\    \\
  3   2   11
 / \\   \\
3  -2   1

target = 8
Prefix sums from root: 10, 15, 18, 21, 19, 16, 17, 7, 18

Path 10→5→3 = 18, need prefix 18-8=10 ✓
Path 5→3 = 8 ✓
Path 5→2→1 = 8 ✓
Path -3→11 = 8 ✓
</div>`,
            code: `class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> prefixCount;
        prefixCount[0] = 1;  // Empty prefix
        return dfs(root, 0, targetSum, prefixCount);
    }
    
    int dfs(TreeNode* node, long long currSum, int target, 
            unordered_map<long long, int>& prefixCount) {
        if (!node) return 0;
        
        currSum += node->val;
        int count = prefixCount[currSum - target];
        
        prefixCount[currSum]++;
        count += dfs(node->left, currSum, target, prefixCount);
        count += dfs(node->right, currSum, target, prefixCount);
        prefixCount[currSum]--;  // Backtrack
        
        return count;
    }
};`
        },
        {
            title: "124. Binary Tree Maximum Path Sum",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            intuition: "Path goes through some highest node. At each node: path through it = left_gain + node + right_gain. Return single branch gain to parent.",
            approach: "Bottom-up: each node returns max single-path gain. Update global max with (left + node + right). Return max(left, right) + node for parent's use.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
      -10
      /  \\
     9   20
        /  \\
       15   7

At 20: left=15, right=7, through_path=42, return max(15,7)+20=35
At -10: left=9, right=35, through_path=44, return max(9,35)+(-10)=25

Max path: 15 → 20 → 7 = 42
But global max updated: 9 → -10 → 20 → 15 would be 34... wait
Actually path 15 → 20 → 7 = 42 is max (doesn't go through root)
</div>`,
            code: `class Solution {
public:
    int maxSum = INT_MIN;
    
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return maxSum;
    }
    
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        
        // Get max gain from left and right, ignore negative gains
        int leftGain = max(0, maxGain(node->left));
        int rightGain = max(0, maxGain(node->right));
        
        // Path through current node
        int pathSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, pathSum);
        
        // Return max single path for parent
        return node->val + max(leftGain, rightGain);
    }
};`
        },
        {
            title: "543. Diameter of Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
            intuition: "Diameter = longest path between any two nodes (not necessarily through root). At each node, path length = left_height + right_height.",
            approach: "Bottom-up height calculation. At each node, update diameter with left_height + right_height. Return height to parent.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            code: `class Solution {
public:
    int diameter = 0;
    
    int diameterOfBinaryTree(TreeNode* root) {
        height(root);
        return diameter;
    }
    
    int height(TreeNode* node) {
        if (!node) return 0;
        
        int left = height(node->left);
        int right = height(node->right);
        
        diameter = max(diameter, left + right);
        
        return 1 + max(left, right);
    }
};`
        },
        {
            title: "129. Sum Root to Leaf Numbers",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
            intuition: "Each root-to-leaf path forms a number. At each node, current number = parent_number * 10 + node_value. Sum all leaf numbers.",
            approach: "DFS passing current number. At leaf, add to total. Otherwise recurse with updated number (curr * 10 + val).",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h)",
            visual: `<div class="visual-diagram">
      1
     / \\
    2   3

Path 1→2 = 12
Path 1→3 = 13
Sum = 25

Number formation:
  At 1: num = 1
  At 2: num = 1*10 + 2 = 12 (leaf, add to sum)
  At 3: num = 1*10 + 3 = 13 (leaf, add to sum)
</div>`,
            code: `class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }
    
    int dfs(TreeNode* node, int currentNum) {
        if (!node) return 0;
        
        currentNum = currentNum * 10 + node->val;
        
        if (!node->left && !node->right) {
            return currentNum;
        }
        
        return dfs(node->left, currentNum) + dfs(node->right, currentNum);
    }
};`
        }
    ]
};
