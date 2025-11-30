// ==========================================
// ALLOCATION PROBLEMS PATTERN
// Allocate Minimum Number of Pages, Minimize Maximum Pair Sum,
// Divide Chocolate, Maximum Distance to Gas Station
// ==========================================

window.patterns['allocation-problems'] = {
    title: "Allocation Problems",
    scenario: "Involves dividing resources or items among multiple entities with certain constraints, and the goal is to optimize a certain criterion, such as minimizing the maximum or maximizing the minimum.",
    clue: "Look for scenarios where resources need to be distributed among entities with certain constraints, and the goal is to optimize a certain criterion, such as minimizing the maximum or maximizing the minimum.",
    problems: [
        {
            title: "Allocate Minimum Number of Pages",
            difficulty: "Hard",
            link: "https://www.interviewbit.com/problems/allocate-books/",
            description: "Given an array of integers where arr[i] is the number of pages in book i, and k students, allocate books such that maximum pages allocated to a student is minimized. Books must be allocated contiguously.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">📚 Books: [12, 34, 67, 90], Students: 2</div>
                    
                    <div class="allocation-visual">
                        <div class="allocation-row">
                            <div class="allocation-label">Option 1:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">12</div>
                            </div>
                            <div class="allocation-items">
                                <div class="allocation-item">34, 67, 90</div>
                            </div>
                            <div class="allocation-sum">max = 191 ❌</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Option 2:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">12, 34</div>
                            </div>
                            <div class="allocation-items">
                                <div class="allocation-item">67, 90</div>
                            </div>
                            <div class="allocation-sum">max = 157 ❌</div>
                        </div>
                        <div class="allocation-row" style="background: rgba(34, 197, 94, 0.1); padding: 0.5rem; border-radius: 8px;">
                            <div class="allocation-label">Optimal:</div>
                            <div class="allocation-items">
                                <div class="allocation-item" style="border-color: #22c55e;">12, 34, 67</div>
                            </div>
                            <div class="allocation-items">
                                <div class="allocation-item" style="border-color: #22c55e;">90</div>
                            </div>
                            <div class="allocation-sum" style="color: #22c55e;">max = 113 ✓</div>
                        </div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low = 90 (max book)</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high = 203 (sum)</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on the answer (max pages per student)</p>
                            <p>• For each candidate, check if allocation is possible with k students</p>
                            <p>• Greedy allocation: assign books until limit reached, then next student</p>
                            <p>• If possible with ≤k students, try smaller limit</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimized Maximum Pages</div>
                        <div class="result-value">113</div>
                    </div>
                </div>
            `,
            approach: "Binary search on max pages. Range is [max(arr), sum(arr)]. For each mid, greedily check if we can allocate to ≤k students with each getting ≤mid pages.",
            timeComplexity: "O(n × log(sum))",
            spaceComplexity: "O(1)",
            code: `int allocateBooks(vector<int>& books, int k) {
    int n = books.size();
    if (k > n) return -1;  // More students than books
    
    int left = *max_element(books.begin(), books.end());
    int right = accumulate(books.begin(), books.end(), 0);
    
    int result = right;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (canAllocate(books, k, mid)) {
            result = mid;
            right = mid - 1;  // Try smaller max pages
        } else {
            left = mid + 1;  // Need more pages per student
        }
    }
    
    return result;
}

bool canAllocate(vector<int>& books, int k, int maxPages) {
    int students = 1;
    int currentPages = 0;
    
    for (int pages : books) {
        if (currentPages + pages > maxPages) {
            students++;
            currentPages = pages;
        } else {
            currentPages += pages;
        }
    }
    
    return students <= k;
}`
        },
        {
            title: "1877. Minimize Maximum Pair Sum in Array",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/",
            description: "Given an array of even length, pair up elements to minimize the maximum pair sum. Each element is in exactly one pair.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🔗 Array: [3, 5, 2, 3]</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">2</div>
                        <div class="array-cell">3</div>
                        <div class="array-cell">3</div>
                        <div class="array-cell">5</div>
                    </div>
                    <div class="pointer-row">
                        <div class="pointer left">↑</div>
                        <div class="pointer"></div>
                        <div class="pointer"></div>
                        <div class="pointer right">↑</div>
                    </div>
                    
                    <div class="allocation-visual">
                        <div class="allocation-row">
                            <div class="allocation-label">Pair 1:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">2 + 5</div>
                            </div>
                            <div class="allocation-sum">= 7</div>
                        </div>
                        <div class="allocation-row">
                            <div class="allocation-label">Pair 2:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">3 + 3</div>
                            </div>
                            <div class="allocation-sum">= 6</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Sort the array first</p>
                            <p>• Pair smallest with largest, second smallest with second largest, etc.</p>
                            <p>• This balances the pairs optimally</p>
                            <p>• Two-pointer approach after sorting</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimized Maximum Pair Sum</div>
                        <div class="result-value">7</div>
                    </div>
                </div>
            `,
            approach: "Sort array, then pair smallest with largest using two pointers. This greedy strategy minimizes the maximum pair sum.",
            timeComplexity: "O(n log n)",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        int maxPairSum = 0;
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int pairSum = nums[left] + nums[right];
            maxPairSum = max(maxPairSum, pairSum);
            left++;
            right--;
        }
        
        return maxPairSum;
    }
};`
        },
        {
            title: "1231. Divide Chocolate",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/divide-chocolate/",
            description: "Given a chocolate bar as an array of sweetness values, divide it into k+1 pieces (giving k pieces to friends). Maximize the minimum sweetness you can get.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">🍫 Sweetness: [1,2,3,4,5,6,7,8,9], k=5 (6 pieces)</div>
                    
                    <div class="allocation-visual">
                        <div class="allocation-row">
                            <div class="allocation-label">Cut 1:</div>
                            <div class="allocation-items">
                                <div class="allocation-item">1,2</div>
                                <div class="allocation-item">3,4</div>
                                <div class="allocation-item">5</div>
                                <div class="allocation-item">6</div>
                                <div class="allocation-item">7</div>
                                <div class="allocation-item">8,9</div>
                            </div>
                            <div class="allocation-sum">min=5</div>
                        </div>
                        <div class="allocation-row" style="background: rgba(34, 197, 94, 0.1); padding: 0.5rem; border-radius: 8px;">
                            <div class="allocation-label">Optimal:</div>
                            <div class="allocation-items">
                                <div class="allocation-item" style="border-color: #22c55e;">1,2,3</div>
                                <div class="allocation-item" style="border-color: #22c55e;">4,5</div>
                                <div class="allocation-item" style="border-color: #22c55e;">6</div>
                                <div class="allocation-item" style="border-color: #22c55e;">7</div>
                                <div class="allocation-item" style="border-color: #22c55e;">8</div>
                                <div class="allocation-item" style="border-color: #22c55e;">9</div>
                            </div>
                            <div class="allocation-sum" style="color: #22c55e;">min=6 ✓</div>
                        </div>
                    </div>
                    
                    <div class="search-range">
                        <div class="range-marker low">low = 1</div>
                        <div class="range-arrow">→</div>
                        <div class="range-marker high">high = sum/(k+1)</div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on the minimum sweetness you want</p>
                            <p>• For each candidate, check if you can make k+1 pieces</p>
                            <p>• You get the piece with minimum sweetness</p>
                            <p>• Maximize the minimum = binary search on answer</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Maximum Minimum Sweetness</div>
                        <div class="result-value">6</div>
                    </div>
                </div>
            `,
            approach: "Binary search on minimum sweetness. Check if we can divide into ≥k+1 pieces where each piece has sweetness ≥ mid. If yes, try larger minimum.",
            timeComplexity: "O(n × log(sum))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    int maximizeSweetness(vector<int>& sweetness, int k) {
        int left = 1;
        int right = accumulate(sweetness.begin(), sweetness.end(), 0) / (k + 1);
        
        while (left < right) {
            int mid = left + (right - left + 1) / 2;  // Upper mid
            
            if (canDivide(sweetness, k + 1, mid)) {
                left = mid;  // Try larger minimum sweetness
            } else {
                right = mid - 1;  // Need smaller minimum
            }
        }
        
        return left;
    }
    
    bool canDivide(vector<int>& sweetness, int pieces, int minSweet) {
        int count = 0;
        int currentSweet = 0;
        
        for (int s : sweetness) {
            currentSweet += s;
            if (currentSweet >= minSweet) {
                count++;
                currentSweet = 0;
            }
        }
        
        return count >= pieces;
    }
};`
        },
        {
            title: "774. Minimize Max Distance to Gas Station",
            difficulty: "Hard",
            link: "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
            description: "Given positions of gas stations on a highway, add k new stations to minimize the maximum distance between adjacent stations.",
            visualHtml: true,
            visual: `
                <div class="visual-container">
                    <div class="visual-title">⛽ Stations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k=9</div>
                    
                    <div class="array-visual">
                        <div class="array-cell">1</div>
                        <div class="array-cell">2</div>
                        <div class="array-cell">3</div>
                        <div class="array-cell">4</div>
                        <div class="array-cell">5</div>
                        <div class="array-cell">6</div>
                        <div class="array-cell">7</div>
                        <div class="array-cell">8</div>
                        <div class="array-cell">9</div>
                        <div class="array-cell">10</div>
                    </div>
                    
                    <div class="recurrence-box">
                        <div class="recurrence-title">Binary Search on Distance</div>
                        <div class="recurrence-formula">
                            For distance d, stations needed in gap g = ceil(g/d) - 1
                        </div>
                    </div>
                    
                    <div class="bs-steps">
                        <div class="bs-step">
                            <div class="step-num">1</div>
                            <div class="step-content">Try d=0.5: check if k=9 stations enough</div>
                        </div>
                        <div class="bs-step">
                            <div class="step-num">2</div>
                            <div class="step-content">For each gap, count stations needed to make max gap ≤ d</div>
                        </div>
                        <div class="bs-step found">
                            <div class="step-num">3</div>
                            <div class="step-content">Binary search converges to minimum possible max distance</div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-title">💡 Key Insight</div>
                        <div class="insight-content">
                            <p>• Binary search on max distance (floating point)</p>
                            <p>• For each candidate distance, count stations needed</p>
                            <p>• To reduce gap g to max d: need ceil(g/d)-1 stations</p>
                            <p>• Use epsilon for floating point comparison</p>
                        </div>
                    </div>
                    
                    <div class="result-box">
                        <div class="result-title">Minimized Max Distance</div>
                        <div class="result-value">0.5</div>
                    </div>
                </div>
            `,
            approach: "Binary search on max distance. For each distance d, calculate total stations needed to make all gaps ≤ d. Use floating point binary search with epsilon.",
            timeComplexity: "O(n × log(maxGap/ε))",
            spaceComplexity: "O(1)",
            code: `class Solution {
public:
    double minmaxGasDist(vector<int>& stations, int k) {
        double left = 0, right = 0;
        
        // Find maximum gap
        for (int i = 1; i < stations.size(); i++) {
            right = max(right, (double)(stations[i] - stations[i-1]));
        }
        
        // Binary search on distance
        while (right - left > 1e-6) {
            double mid = (left + right) / 2;
            
            if (canAchieve(stations, k, mid)) {
                right = mid;  // Try smaller max distance
            } else {
                left = mid;  // Need larger max distance
            }
        }
        
        return left;
    }
    
    bool canAchieve(vector<int>& stations, int k, double maxDist) {
        int stationsNeeded = 0;
        
        for (int i = 1; i < stations.size(); i++) {
            double gap = stations[i] - stations[i-1];
            // Stations needed to divide gap so each part <= maxDist
            stationsNeeded += (int)(gap / maxDist);
        }
        
        return stationsNeeded <= k;
    }
};`
        }
    ]
};
