/*
 * @lc app=leetcode id=61 lang=javascript
 *
 * [61] Rotate List
 *
 * https://leetcode.com/problems/rotate-list/description/
 *
 * algorithms
 * Medium (26.54%)
 * Total Accepted:    180.9K
 * Total Submissions: 679K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * Given a linked list, rotate the list to the right by k places, where k is
 * non-negative.
 * 
 * Example 1:
 * 
 * 
 * Input: 1->2->3->4->5->NULL, k = 2
 * Output: 4->5->1->2->3->NULL
 * Explanation:
 * rotate 1 steps to the right: 5->1->2->3->4->NULL
 * rotate 2 steps to the right: 4->5->1->2->3->NULL
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 0->1->2->NULL, k = 4
 * Output: 2->0->1->NULL
 * Explanation:
 * rotate 1 steps to the right: 2->0->1->NULL
 * rotate 2 steps to the right: 1->2->0->NULL
 * rotate 3 steps to the right: 0->1->2->NULL
 * rotate 4 steps to the right: 2->0->1->NULL
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

var rotateRight = function(head, k) {
    if (!head || !(head instanceof ListNode)) return null;
    let times = k;
    let list = [];
    let node = head;
    while (node) {
        list.push(node);
        node = node.next;
    }
    if (list.length === 1) return list[0];
    while (times) {
        let tail = list.pop();
        let nowTail = list[list.length - 1];
        nowTail.next = null;
        tail.next = list[0];
        list.unshift(tail);
        times --;
    }
    return list[0];
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let node;
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

node = rotateRight(head, 2);
console.log(node);

head = new ListNode(0);
head.next = new ListNode(1);
head.next.next = new ListNode(2);
node = rotateRight(head, 4);
console.log(node);

head = new ListNode(1);
node = rotateRight(head, 10);
console.log(node);
