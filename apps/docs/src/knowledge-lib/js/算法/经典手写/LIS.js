// LIS 最长递增子序列
function LIS(nums) {
    const result = [[nums[0]]];

    for(const n of nums) {
        _update(n);
    }

    function _update(n) {
        for(let i = result.length - 1; i >= 0; i--) {
            const line = result[i];
            const tail = line[line.length - 1];
            if(tail < n) {
                result[i + 1] = [...line, n];
                break;
            }
            if(tail > n && i === 0) {
                result[0] = [n];
                break;
            }
        }
    }

    return result[result.length - 1];
}

console.log(LIS([4,5,1,2,7,3,6,9])) // 1 2 3 6 9