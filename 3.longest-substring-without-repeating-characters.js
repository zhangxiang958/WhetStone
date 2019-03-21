/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (27.98%)
 * Total Accepted:    822.8K
 * Total Submissions: 2.9M
 * Testcase Example:  '"abcabcbb"'
 *
 * Given a string, find the length of the longest substring without repeating
 * characters.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: "abcabcbb"
 * Output: 3 
 * Explanation: The answer is "abc", with the length of 3. 
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * 
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3. 
 * ⁠            Note that the answer must be a substring, "pwke" is a
 * subsequence and not a substring.
 * 
 * 
 * 
 * 
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
    let strArr = str.split('');
    let substringArr = [];
    let maxSubStr = '';
    strArr.forEach(i => {
        if (!substringArr.length) {
            substringArr.push(i);
            return;
        }
        let substring = (substringArr[substringArr.length - 1]).split('');
        let substringIdx = substring.findIndex(c => c === i);
        if (substringIdx > -1) {
            substring = substring.slice(substringIdx + 1);
            substring.push(i);
            substring = substring.join('');
            if (!maxSubStr) maxSubStr = substring;
            else if (substring.length > maxSubStr.length) maxSubStr = substring;
            substringArr.push(substring);
        } else {
            substring.push(i);
            substring = substring.join('');
            if (!maxSubStr) maxSubStr = substring;
            else if (substring.length > maxSubStr.length) maxSubStr = substring;
            substringArr[substringArr.length - 1] = substring;
        }
        console.log(substringArr);
    });
    console.log(maxSubStr);
    return maxSubStr.length;
};

