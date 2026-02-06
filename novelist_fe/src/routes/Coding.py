
# Tìm min bước để thực hiện sắp xếp mảng tăng dần.

# nums = [5, 1, 2, 3, 4, 6] 
# def findMin(self, nums): 
#     step=0
#     maxDefault=max(nums)
#     while len(nums)>0:   
#         min_value = min(nums)  
#         min_index = nums.index(min_value)
#         indexTemp = min_index+1
#         while indexTemp < len(nums): 
#             arrayStep=nums.copy()
#             del arrayStep[min_index:indexTemp+1]
#             current_value = nums[indexTemp]
#             minValueStep=maxDefault
#             if (len(arrayStep)>0):
#                 minValueStep=min(arrayStep) 
            
#             if(current_value>=min_value and current_value<=minValueStep): 
#                 indexTemp+=1
#             else: 
#                 break 
#         del nums[min_index:indexTemp]  
#         step+=1
#     step=step-1
#     return step
# segments = process_array(nums) 
# print(segments)

# def reverse( x: int) -> int:
#         isLess=False
#         s=str(x)
#         if(x<0):
#             isLess=True
#             s=s[1:len(s)]  
#         result=s[::-1]
#         if(isLess):
#             return int( result)*-1
#         else:
#             return int(result)

# print(reverse(-432))

# def minJump(nums):
#     jumps = 0
#     currentEnd = 0
#     farthest = 0

#     for i in range(len(nums) - 1):
#         farthest = max(farthest, i + nums[i]) 
#         if i == currentEnd:
#             jumps += 1
#             currentEnd = farthest 
#     return jumps

# x=[3,1,2,1,0,4]

# print(minJump(x))
x=[2,2]
maxIndex=1
def trac(newIndex, currentSum,express): 
    if(newIndex>maxIndex): 
        print("express",express)
        if(currentSum!=0):
            return None
        else:
            return express
      
    expresss =trac(newIndex+1, currentSum+x[newIndex],express+"+")
    if(expresss is not None):
        return expresss  
    expresss =trac(newIndex+1, currentSum-x[newIndex],express+"-")
    if(expresss!=None):
        print("Hello tru")
        return expresss

    return None


print(trac(1,x[0],""))
     
        

