window.basicRecursivePattern = {
    title: "Basic Recursive Functions",
    scenario: "Implement basic recursive functions that solve a problem by dividing it into smaller instances of the same problem until a base case is reached.",
    clue: "Problems where the solution can be naturally expressed in terms of smaller instances of the same problem, such as factorial calculation, Fibonacci sequence generation, or exponentiation.",
    problems: [
        {
            title: "Factorial",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/factorial/",
            intuition: "Factorial of n (n!) is n × (n-1) × (n-2) × ... × 1. This naturally breaks down into n × factorial(n-1). The base case is when n = 0 or n = 1, where factorial is 1.",
            approach: "Define the base case: factorial(0) = factorial(1) = 1. For the recursive case, return n * factorial(n-1). Each recursive call reduces the problem size by 1 until we hit the base case.",
            visual: `<div class="recursion-tree">
  <div class="tree-level"><div class="tree-node highlight">factorial(5)</div></div>
  <div class="tree-connector">↓</div>
  <div class="tree-level"><div class="tree-node">5 × factorial(4)</div></div>
  <div class="tree-connector">↓</div>
  <div class="tree-level"><div class="tree-node">4 × factorial(3)</div></div>
  <div class="tree-connector">↓</div>
  <div class="tree-level"><div class="tree-node">3 × factorial(2)</div></div>
  <div class="tree-connector">↓</div>
  <div class="tree-level"><div class="tree-node">2 × factorial(1)</div></div>
  <div class="tree-connector">↓</div>
  <div class="tree-level"><div class="tree-node base-case">1 (base case)</div></div>
</div>

<div class="call-stack">
  <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--primary);">📚 Unwinding Stack:</div>
  <div class="stack-frame returning">5 × 24 = 120 ✓</div>
  <div class="stack-frame returning">4 × 6 = 24</div>
  <div class="stack-frame returning">3 × 2 = 6</div>
  <div class="stack-frame returning">2 × 1 = 2</div>
  <div class="stack-frame">1 (base)</div>
</div>`,
            visualHtml: true,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n) - recursion stack",
            code: `class Solution {
public:
    // Recursive approach
    long long factorial(int n) {
        // Base case
        if (n <= 1) return 1;
        
        // Recursive case
        return (long long)n * factorial(n - 1);
    }
    
    // Tail-recursive approach (optimizable by compiler)
    long long factorialTail(int n, long long acc = 1) {
        if (n <= 1) return acc;
        return factorialTail(n - 1, acc * n);
    }
};`
        },
        {
            title: "Fibonacci Number",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/fibonacci-number/",
            intuition: "Fibonacci sequence is defined as F(n) = F(n-1) + F(n-2) with base cases F(0) = 0 and F(1) = 1. This is a classic example of a problem with overlapping subproblems.",
            approach: "Base cases: F(0) = 0, F(1) = 1. Recursive case: F(n) = F(n-1) + F(n-2). Note that naive recursion has exponential time complexity due to repeated calculations. Use memoization for optimization.",
            visual: `<div class="formula-box">
  <div class="label">📐 Recurrence Relation</div>
  <code>F(n) = F(n-1) + F(n-2), where F(0)=0, F(1)=1</code>
</div>

<div class="recursion-tree">
  <div class="tree-level"><div class="tree-node highlight">fib(5)</div></div>
  <div class="tree-connector">↙ ↘</div>
  <div class="tree-level">
    <div class="tree-node">fib(4)</div>
    <div class="tree-node">fib(3)</div>
  </div>
  <div class="tree-connector">↙ ↘ &nbsp;&nbsp;&nbsp; ↙ ↘</div>
  <div class="tree-level">
    <div class="tree-node">fib(3)</div>
    <div class="tree-node">fib(2)</div>
    <div class="tree-node">fib(2)</div>
    <div class="tree-node base-case">fib(1)</div>
  </div>
</div>

<div class="approach-comparison">
  <div class="approach-card recursive">
    <h5>⚠️ Naive Recursion</h5>
    <p>Same subproblems computed multiple times</p>
    <p>fib(3) calculated twice!</p>
    <span class="complexity-badge">O(2ⁿ) Time</span>
  </div>
  <div class="approach-card optimized">
    <h5>✅ With Memoization</h5>
    <p>Store results, lookup before computing</p>
    <p>Each subproblem solved once</p>
    <span class="complexity-badge">O(n) Time</span>
  </div>
</div>

<div class="state-flow">
  <div class="state-box">F(0)=0</div>
  <div class="state-arrow">→</div>
  <div class="state-box">F(1)=1</div>
  <div class="state-arrow">→</div>
  <div class="state-box">F(2)=1</div>
  <div class="state-arrow">→</div>
  <div class="state-box">F(3)=2</div>
  <div class="state-arrow">→</div>
  <div class="state-box">F(4)=3</div>
  <div class="state-arrow">→</div>
  <div class="state-box active">F(5)=5</div>
</div>`,
            visualHtml: true,
            timeComplexity: "O(2^n) naive, O(n) with memoization",
            spaceComplexity: "O(n)",
            code: `class Solution {
public:
    // Naive recursive approach - O(2^n)
    int fibNaive(int n) {
        if (n <= 1) return n;
        return fibNaive(n - 1) + fibNaive(n - 2);
    }
    
    // Optimized with memoization - O(n)
    int fib(int n) {
        vector<int> memo(n + 1, -1);
        return fibMemo(n, memo);
    }
    
    int fibMemo(int n, vector<int>& memo) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        return memo[n];
    }
    
    // Iterative approach - O(n) time, O(1) space
    int fibIterative(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`
        },
        {
            title: "Pow(x, n)",
            difficulty: "Medium",
            link: "https://leetcode.com/problems/powx-n/",
            intuition: "Computing x^n can be optimized using the property: x^n = (x^(n/2))² for even n, and x^n = x × x^(n-1) for odd n. This is called binary exponentiation or fast power.",
            approach: "Base case: n = 0 returns 1. For negative n, compute 1/x^(-n). Use binary exponentiation: if n is even, return power(x*x, n/2); if odd, return x * power(x, n-1). This reduces time complexity from O(n) to O(log n).",
            visual: `<div class="formula-box">
  <div class="label">⚡ Binary Exponentiation</div>
  <code>x^n = (x²)^(n/2) if n is even</code><br>
  <code>x^n = x × x^(n-1) if n is odd</code>
</div>

<div class="backtrack-visual">
  <div style="font-weight: 600; margin-bottom: 0.75rem; color: var(--primary);">Computing 2¹⁰ = 1024</div>
  <div class="backtrack-step">
    <span class="step-number">1</span>
    <span class="step-action">2¹⁰ = (2⁵)²</span>
    <span class="step-state">even → square</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">2</span>
    <span class="step-action">2⁵ = 2 × (2²)²</span>
    <span class="step-state">odd → multiply</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">3</span>
    <span class="step-action">2² = (2¹)²</span>
    <span class="step-state">even → square</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">4</span>
    <span class="step-action">2¹ = 2 × 2⁰</span>
    <span class="step-state">odd → multiply</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">5</span>
    <span class="step-action">2⁰ = 1</span>
    <span class="step-state success">base case</span>
  </div>
</div>

<div class="approach-comparison">
  <div class="approach-card recursive">
    <h5>🐌 Linear Approach</h5>
    <p>Multiply x, n times</p>
    <span class="complexity-badge">O(n) Time</span>
  </div>
  <div class="approach-card optimized">
    <h5>⚡ Binary Exponentiation</h5>
    <p>Halve n at each step</p>
    <span class="complexity-badge">O(log n) Time</span>
  </div>
</div>`,
            visualHtml: true,
            timeComplexity: "O(log n)",
            spaceComplexity: "O(log n) - recursion stack",
            code: `class Solution {
public:
    double myPow(double x, int n) {
        // Handle edge cases
        if (n == 0) return 1.0;
        if (x == 0) return 0.0;
        
        // Handle negative exponent
        // Use long to handle INT_MIN overflow
        long long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        
        return fastPow(x, N);
    }
    
private:
    double fastPow(double x, long long n) {
        // Base case
        if (n == 0) return 1.0;
        
        // Binary exponentiation
        if (n % 2 == 0) {
            // x^n = (x^2)^(n/2)
            return fastPow(x * x, n / 2);
        } else {
            // x^n = x * x^(n-1)
            return x * fastPow(x, n - 1);
        }
    }
    
    // Iterative version
    double myPowIterative(double x, int n) {
        if (n == 0) return 1.0;
        
        long long N = abs((long long)n);
        double result = 1.0;
        
        while (N > 0) {
            if (N % 2 == 1) {
                result *= x;
            }
            x *= x;
            N /= 2;
        }
        
        return n < 0 ? 1.0 / result : result;
    }
};`
        },
        {
            title: "Greatest Common Divisor of Strings",
            difficulty: "Easy",
            link: "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
            intuition: "If string t divides both str1 and str2, then str1 + str2 must equal str2 + str1. The GCD string length is GCD(len1, len2), similar to how we find GCD of numbers using Euclidean algorithm.",
            approach: "First check if str1 + str2 == str2 + str1. If not, no common divisor exists. If yes, find GCD of their lengths using Euclidean algorithm (recursively: gcd(a,b) = gcd(b, a%b)). Return the prefix of that length.",
            visual: `<div class="key-insight">
  <strong>🔑 Key Insight:</strong>
  <p>If a common divisor exists, then str1 + str2 == str2 + str1</p>
</div>

<div class="backtrack-visual">
  <div style="font-weight: 600; margin-bottom: 0.75rem;">Example: str1 = "ABCABC", str2 = "ABC"</div>
  <div class="backtrack-step">
    <span class="step-number">1</span>
    <span class="step-action">Check concatenation</span>
    <span class="step-state">"ABCABCABC" == "ABCABCABC" ✓</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">2</span>
    <span class="step-action">GCD(6, 3)</span>
    <span class="step-state">6 % 3 = 0</span>
  </div>
  <div class="backtrack-step">
    <span class="step-number">3</span>
    <span class="step-action">GCD(3, 0)</span>
    <span class="step-state success">Base: return 3</span>
  </div>
</div>

<div class="formula-box">
  <div class="label">📐 Euclidean Algorithm</div>
  <code>gcd(a, b) = gcd(b, a % b)</code><br>
  <code>gcd(a, 0) = a  ← base case</code>
</div>

<div class="state-flow">
  <div class="state-box">gcd(6, 3)</div>
  <div class="state-arrow">→</div>
  <div class="state-box">gcd(3, 0)</div>
  <div class="state-arrow">→</div>
  <div class="state-box active">3</div>
</div>`,
            visualHtml: true,
            timeComplexity: "O(n + m) for string comparison",
            spaceComplexity: "O(n + m)",
            code: `class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        // If concatenations aren't equal, no GCD exists
        if (str1 + str2 != str2 + str1) {
            return "";
        }
        
        // Find GCD of lengths using Euclidean algorithm
        int gcdLen = gcd(str1.length(), str2.length());
        
        return str1.substr(0, gcdLen);
    }
    
private:
    // Recursive GCD using Euclidean algorithm
    int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    // Alternative: Use built-in __gcd or std::gcd (C++17)
    string gcdOfStringsBuiltIn(string str1, string str2) {
        if (str1 + str2 != str2 + str1) return "";
        return str1.substr(0, __gcd(str1.size(), str2.size()));
    }
};`
        }
    ]
};
