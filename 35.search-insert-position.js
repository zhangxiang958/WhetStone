/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 *
 * https://leetcode.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (40.47%)
 * Total Accepted:    370.4K
 * Total Submissions: 914.1K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * Given a sorted array and a target value, return the index if the target is
 * found. If not, return the index where it would be if it were inserted in
 * order.
 * 
 * You may assume no duplicates in the array.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,3,5,6], 5
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [1,3,5,6], 2
 * Output: 1
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: [1,3,5,6], 7
 * Output: 4
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: [1,3,5,6], 0
 * Output: 0
 * 
 * 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    target = +target;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num >= target) {
            return i;
        }
    }
    return nums.length;
};

let ex1 = searchInsert([1,3,5,6], 5);
let ex2 = searchInsert([1,3,5,6], 2);
let ex3 = searchInsert([1,3,5,6], 7);
let ex4 = searchInsert([1,3,5,6], 0);
console.log(ex1, ex2, ex3, ex4);
