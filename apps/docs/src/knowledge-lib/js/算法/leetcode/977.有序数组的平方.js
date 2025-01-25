/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    const result = [];
    while(left <= right) {
        const l = nums[left] ** 2;
        const r = nums[right] ** 2;

        if(l < r) {
            result.unshift(r);
            right--;
        } else {
            result.unshift(l);
            left++;
        }
    }

    return result;
};
// @lc code=end

