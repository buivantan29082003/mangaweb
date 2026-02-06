from abc import ABC,abstractmethod
class Animal(ABC):
    userName="NGUYEN VAN A"
    def __init__(self, name, age):
        self._name=name
        self.age=age
        
    @abstractmethod
    def go(seft):
        pass
        
    def getName(hello):
        print(hello._name)

class Dog(Animal): 
    def __init__(self, name, age):
        Animal.__init__(name,age)

dog=Dog()
dog.go
 