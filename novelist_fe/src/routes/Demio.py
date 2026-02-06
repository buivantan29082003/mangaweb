from abc import ABC,abstractmethod
class Person(ABC):
    def __init__(self):
        pass
    
    @abstractmethod
    def skin():
        print("Hello workd")
    
    def hello():
        pass

class VietNamese(Person):
    def hello(sefl):
        print("Xin chào")
    def skin():
        print("Hello workd")
class English(Person):
    def hello(sefl):
        print("Hello")
    def skin():
        print("Hello workd")
        

v=VietNamese()
e=English()
v.hello()
e.hello()

# list = [1,2,3,4,5,6,7]
# target=10
# value=[]
# for i in range(0,len(list),1):
#     for k in range (i+1,len(list)):
#         if((list[i]+list[k])==target and len(value)!=2):
#             value.extend([i,k])
#             break
# print(value)



# Tìm target
# l=0
# r=len(list)-1
# while(l<r):
#     list[l],list[r]=list[r],list[l]
#     l+=1
#     r-=1 
# print(list)

# Tổng tất cả các phần tử

# x=0.0
# for num in list:
#     x+=num
# print(x)

# Tìm max, min 
# max=list[0]
# min=list[0] 
# for num in list:
#     if(num>max):
#         max=num
#     elif(num<min):
#         min=num
# print(min)
# print(max)

list =[2,3,4,7,6,11,2,33,37,8]
# Tìm max1, max2,...... 
# max=list[0]
# max2=list[0]
# min=list[0] 
# for num in list:
#     if(num>max): 
#         min=max2
#         max2=max
#         max=num 
#     elif(num>max2): 
#         min=max2
#         max2=num
#     elif(num>min):
#         min=num
    
# print(min)
# print(max)
# print(max2)

# Đếm phần tử theo điêu kiện
# count =0
# for num in list:
#     if(num>=2):
#         count+=1
# print(count)   

# Xóa trùng phần tử danh sách đã sort -  nhớ đang duyệt mà xóa mảng thì nên duyệt từ sau về nha bạn.

list =[1,2,2,3,4,5] 
# Cách 1 
# for index in range(len(list)-1, 0, -1):
#     if(list[index]==list[index-1]):
#         list.pop(index)
# print(list)
# Cách 2 
# set={} 
# for index in range(len(list)-1, 0, -1):
#     if set.get(list[index])!=None:
#         list.pop(index)
#     else:
#         set.update({list[index]:0})
# print(list)

# l1=[1,2,5]
# l2=[-1,3,4,6,7]
# index1=len(l1)-1
# index2=len(l2)-1  
# indexRightNow=len(l2)+len(l1)-1
# sum = [0]*(len(l1)+len(l2))      
# while(indexRightNow>-1): 
#     if( index2==-1 or(index1>-1 and l1[index1]>=l2[index2]) ): 
#         sum[indexRightNow] = l1[index1]
#         index1 -=1
#     elif( index1==-1 or (index2>-1 and l1[index1]<=l2[index2]) ): 
#         sum[indexRightNow]=l2[index2]
#         index2 -=1 
#     indexRightNow-=1
# print(sum)
x=[3,4]
y=[3,4]
print(x ==y)
