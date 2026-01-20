// Bonus (2 Grades)
// How to deliver the bonus?
// 1- Solve the problem Remove Element on LeetCode
// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.js”
// 3- Copy the code that you have submitted on the website inside ”bonus.js” file

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

    var removeElement = function(nums, val) {
    let k = 0; // index for next valid element

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};
