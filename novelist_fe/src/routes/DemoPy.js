

// let l1=[1,2,5]
// let l2=[-1,3,5,7]
// let index1=0
// let index2=0
// let sum=[]
// while(index1<l1.length||index2<l2.length){
//     if(index2>=l2.length||(index1<l1.length&&l1[index1]<=l2[index2])){
//         sum.push(l1[index1])
//         index1++
//     }else if(index1>=l1.length||(index2<l2.length&&l2[index2]<=l1[index1])){
//         sum.push(l2[index2])
//         index2++
//     }
// }
// console.log(sum)

// let nums = [1, 1, 1]

// let l=0;
// let r=0;
// let sum=nums[0];
// while(l<nums.length){
    
// }

let a=[1,2,4,5,6]
// a.push(-1)
// let index=a.length-1
// let value=999
let indexInsert=2
// while(index>indexInsert){
//     a[index]=a[index-1]
//     index--
// }
// a[indexInsert]=value

while(indexInsert<a.length-1){
    a[indexInsert]=a[indexInsert+1]
    indexInsert++;
}
a.pop()

console.log(a)