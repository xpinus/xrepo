/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let start = 0;
    let end = 0;
    let sum = 0;
    let len = nums.length;
    let result = Infinity;

    while(end < len) {
        sum += nums[end];

        while(sum >= target) {
            const subLen = end - start + 1;
            result =  Math.min(result, subLen);
            sum -= nums[start];
            start++;
        }
        
        end++;
    }
    

    return result === Infinity ? 0 : result

};
// @lc code=end

