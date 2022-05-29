def reverse(str):
    resule = ""
    for x in range(0, len(str)):
        resule = resule + str[len(str) - 1 - x]
    return (resule)
print("Give me the word:")
x = input()
print(reverse(x))

