/**
 * 
 * 给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。
 * 给定 "bbbbb" ，最长的子串就是 "b" ，长度是1。
 * 给定 "pwwkew" ，最长子串是 "wke" ，长度是3。
 * 请注意答案必须是一个子串，"pwke" 是 子序列 而不是子串。
 */

function shortestSubstring (str) {
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
    console.log(maxSubStr.length);
    return maxSubStr.length;
}

shortestSubstring('abcabcbb');
shortestSubstring('bbbbb');
shortestSubstring('pwwkew');