import{t,ao as a,K as e,u as p,ab as i,q as r}from"./chunks/framework.tQiMsDJj.js";const l=`function bubbleSort(arr) {
    const N = arr.length;
    for (let r = N - 1; r > 0; r--) {
        for (let index = 0; index < r; index++) {
            if (arr[index] > arr[index + 1]) {
                swap(index, index + 1);
            }
        }
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
}

// 用例
console.log(bubbleSort([5, 2, 8, 32, 1, 9]));
`,o=`function selectionSort(arr) {
    const N = arr.length;
    for (let r = 0; r < N; r++) {
        let min = r;
        for (let index = r; index < N; index++) {
            if (arr[min] > arr[index]) {
                min = index;
            }
        }

        if (min === r) continue;
        swap(min, r);
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
}

// 用例
console.log(selectionSort([5, 2, 8, 32, 1, 9]));
`,c=`function insertionSort(arr) {
    const N = arr.length;

    for (let r = 0; r < N; r++) {
        for (let j = r + 1; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(j, j - 1);
            } else {
                break;
            }
        }
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
}

// 用例
console.log(insertionSort([5, 2, 8, 32, 1, 9]));
`,h=`function mergeSort(arr) {\r
    const len = arr.length;\r
    if (len <= 1) return arr;\r
\r
    const mid = Math.floor(len / 2);\r
    const left = mergeSort(arr.slice(0, mid));\r
    const right = mergeSort(arr.slice(mid, len));\r
\r
    const result = [];\r
\r
    while (left.length && right.length) {\r
        if (left[0] < right[0]) {\r
            result.push(left.shift());\r
        } else {\r
            result.push(right.shift());\r
        }\r
    }\r
\r
    if (left.length) {\r
        result.push(...left);\r
    }\r
    if (right.length) {\r
        result.push(...right);\r
    }\r
\r
    return result;\r
\r
}\r
\r
// 用例\r
console.log(mergeSort([5, 2, 8, 32, 1, 9]));\r
`,b=JSON.parse('{"title":"排序算法","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/排序/index.md","filePath":"knowledge-lib/js/算法/排序/index.md"}'),d={name:"knowledge-lib/js/算法/排序/index.md"},f=Object.assign(d,{setup(g){return(u,n)=>{const s=i("run-script");return r(),t("div",null,[n[0]||(n[0]=a(`<h1 id="排序算法" tabindex="-1">排序算法 <a class="header-anchor" href="#排序算法" aria-label="Permalink to &quot;排序算法&quot;">​</a></h1><p><a href="https://visualgo.net/zh/sorting?slide=7-1" target="_blank" rel="noreferrer">可视化演示</a></p><blockquote><p>排序算法和复杂度 <img src="https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220908153414998.png" alt="image-20220908153414998"></p></blockquote><h2 id="冒泡排序" tabindex="-1">冒泡排序 <a class="header-anchor" href="#冒泡排序" aria-label="Permalink to &quot;冒泡排序&quot;">​</a></h2><p>是相邻元素之间的比较和交换，两重循环O(n2)；所以，如果两个相邻元素相等，是不会交换的。所以它是一种<strong>稳定</strong>的排序方法。不需要额外空间，空间复杂度O(1)。</p><blockquote><p>伪代码</p></blockquote><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>method bubbleSort(array A, integer N) // 标准版本, N表示循环次数，通常为数组长度</span></span>
<span class="line"><span>    for each R from N-1 down to 1 // 重复 N-1 次迭代</span></span>
<span class="line"><span>        for each index i in [0..R-1] // &#39;未排序区域&#39;，O(N)</span></span>
<span class="line"><span>            if A[i] &gt; A[i+1] // 这两个不是非递减顺序</span></span>
<span class="line"><span>                swap(a[i], a[i+1]) // 在 O(1) 中交换它们</span></span>
<span class="line"><span></span></span>
<span class="line"><span>比较和交换需要的时间由一个常数限制，我们称之为 c。然后，在（标准）冒泡排序中有两个嵌套循环。外循环正好运行 N-1 次迭代。但是内循环的运行时间越来越短：</span></span>
<span class="line"><span>    当 R=N-1 时，(N−1) 次迭代（比较和交换），</span></span>
<span class="line"><span>    当 R=N-2 时，(N−2) 次迭代，</span></span>
<span class="line"><span>    ...，</span></span>
<span class="line"><span>    当 R=1 时，1 次迭代（然后完成）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>因此，总的迭代次数 = (N−1)+(N−2)+...+1 = N*(N−1)/2 (推导).</span></span>
<span class="line"><span>总时间 = c*N*(N−1)/2 = O(N^2).</span></span></code></pre></div>`,7)),e(s,{code:p(l)},null,8,["code"]),n[1]||(n[1]=a(`<h2 id="选择排序" tabindex="-1">选择排序 <a class="header-anchor" href="#选择排序" aria-label="Permalink to &quot;选择排序&quot;">​</a></h2><p>每一次循环都找出最小的元素，产生交换放在前面，两重循环O(n2)；举个栗子，5 8 5 2 9，第一遍之后，2会与5交换，那么原序列中两个5的顺序就被破坏了。所以<strong>不是稳定</strong>的排序算法。</p><p>不需要额外空间，空间复杂度O(1)。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>method selectionSort(array A[], integer N)</span></span>
<span class="line"><span>  for each L in [0..N-2] // O(N)</span></span>
<span class="line"><span>    let X be the index of the minimum element in A[L..N-1] // O(N)</span></span>
<span class="line"><span>    swap(A[X], A[L]) // O(1)，X 可能等于 L (没有实际交换)</span></span>
<span class="line"><span>总计: O(N2) — 准确地说，它类似于冒泡排序分析。</span></span></code></pre></div>`,4)),e(s,{code:p(o)},null,8,["code"]),n[2]||(n[2]=a(`<h2 id="插入排序" tabindex="-1">插入排序 <a class="header-anchor" href="#插入排序" aria-label="Permalink to &quot;插入排序&quot;">​</a></h2><p>插入排序是在一个已经有序的小序列的基础上，一次插入一个元素。刚开始这个小序列只包含第一个元素，事件复杂度O(n2)。 比较是从这个小序列的末尾开始的。想要插入的元素和小序列的最大者开始比起，如果比它大则直接插在其后面，否则一直往前找它该插入的位置。 如果遇见了一个和插入元素相等的，则把插入元素放在这个相等元素的后面。所以相等元素间的顺序没有改变，是<strong>稳定</strong>的。</p><p>不需要额外空间，空间复杂度O(1)。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>method insertionSort(array A[], integer N)</span></span>
<span class="line"><span>  for i in [1..N-1] // O(N)</span></span>
<span class="line"><span>    let X be A[i] // X is the next item to be inserted into A[0..i-1]</span></span>
<span class="line"><span>    for j from i-1 down to 0 // this loop can be fast or slow</span></span>
<span class="line"><span>      if A[j] &gt; X</span></span>
<span class="line"><span>        A[j+1] = A[j] // make a place for X</span></span>
<span class="line"><span>      else</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>    A[j+1] = X // insert X at index j+1</span></span></code></pre></div>`,4)),e(s,{code:p(c)},null,8,["code"]),n[3]||(n[3]=a(`<h2 id="归并排序" tabindex="-1">归并排序 <a class="header-anchor" href="#归并排序" aria-label="Permalink to &quot;归并排序&quot;">​</a></h2><p>归并排序是把序列递归地分成短序列，递归出口是短序列只有1个元素(认为直接有序)或者2个序列(1次比较和交换),然后把各个有序的段序列合并成一个有序的长序列，不断合并直到原序列全部排好序。</p><p>可以发现，在1个或2个元素时，1个元素不会交换，2个元素如果大小相等也没有人故意交换，这不会破坏稳定性。那么，在短的有序序列合并的过程中，稳定是是否受到破坏？没有，合并过程中我们可以保证如果两个当前元素相等时，我们把处在前面的序列的元素保存在结果序列的前面，这样就保证了稳定性。所以，归并排序也是<strong>稳定的排序算法</strong>。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>method mergeSort(array A, integer low, integer high)</span></span>
<span class="line"><span>  // 要排序的数组是 A[low..high]</span></span>
<span class="line"><span>  if (low &lt; high) // 基本情况：low &gt;= high (0 或 1 个项目)</span></span>
<span class="line"><span>    int mid = (low+high) / 2	</span></span>
<span class="line"><span>    mergeSort(a, low  , mid ) // 分成两半</span></span>
<span class="line"><span>    mergeSort(a, mid+1, high) // 然后递归排序它们</span></span>
<span class="line"><span>    merge(a, low, mid, high) // 征服：合并子程</span></span></code></pre></div>`,4)),e(s,{code:p(h)},null,8,["code"]),n[4]||(n[4]=a(`<h1 id="快速排序" tabindex="-1">快速排序 <a class="header-anchor" href="#快速排序" aria-label="Permalink to &quot;快速排序&quot;">​</a></h1><p>快速排序有两个方向</p><ul><li>左边的i下标一直往右走，当a[i] &lt;= a[center_index]，其中center_index是中枢元素的数组下标，一般取为数组第0个元素</li><li>而右边的j下标一直往左走，当a[j] &gt; a[center_index]。</li><li>如果i和j都走不动了，i &lt;= j, 交换a[i]和a[j],重复上面的过程，直到i&gt;j。</li><li>交换a[j]和a[center_index]，完成一趟快速排序。</li></ul><p>在中枢元素和a[j]交换的时候，很有可能把前面的元素的稳定性打乱，比如序列为 5 3 3 4 3 8 9 10 11， 现在中枢元素5和3(第5个元素，下标从1开始计)交换就会把元素3的稳定性打乱，所以快速排序是一个<strong>不稳定的排序算法</strong>，不稳定发生在中枢元素和a[j]交换的时刻。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int partition(array A, integer i, integer j)</span></span>
<span class="line"><span>  int p = a[i] // p 是枢轴</span></span>
<span class="line"><span>  int m = i // S1 和 S2 最初为空</span></span>
<span class="line"><span>  for (int k = i+1; k &lt;= j; ++k) // 探索未知区域</span></span>
<span class="line"><span>    if ((A[k] &lt; p) || ((A[k] == p) &amp;&amp; (rand()%2 == 0)))  { // 情况 2+3</span></span>
<span class="line"><span>      ++m</span></span>
<span class="line"><span>      swap(A[k], A[m]) // 交换这两个索引</span></span>
<span class="line"><span>    // 注意我们在情况 1: A[k] &gt; p 时不做任何事情</span></span>
<span class="line"><span>  swap(A[i], A[m]) // 最后一步，交换枢轴和 a[m]</span></span>
<span class="line"><span>  return m // 返回枢轴的索引</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>method quickSort(array A, integer low, integer high)</span></span>
<span class="line"><span>  if (low &lt; high)</span></span>
<span class="line"><span>    int m = partition(a, low, high) // O(N)</span></span>
<span class="line"><span>    // A[low..high] ~&gt; A[low..m–1], pivot, A[m+1..high]</span></span>
<span class="line"><span>    quickSort(A, low, m-1); // 递归排序左子数组</span></span>
<span class="line"><span>    // A[m] = pivot 在分区后已经排序</span></span>
<span class="line"><span>    quickSort(A, m+1, high); // 然后排序右子数组</span></span></code></pre></div><h2 id="堆排" tabindex="-1">堆排 <a class="header-anchor" href="#堆排" aria-label="Permalink to &quot;堆排&quot;">​</a></h2>`,6))])}}});export{b as __pageData,f as default};
