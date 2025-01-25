/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    
    let p1 = 0;
    let p2 = 0;

    while(p2 < nums.length) {
        if(nums[p2] === val) {
            p2++;
            continue;
        } else if(nums[p2] !== val) {
            nums[p1] = nums[p2];
            p2++;
            p1++;
        }
    }

    return p1;
};
// @lc code=end

