import sys

filename = sys.argv[1]
option = sys.argv[2]

# Check for option and correcsponding argument length
if option not in ["f", "fr"]:
    print("Wrong option parameter")
    exit()
elif option == "f" and len(sys.argv) != 4:
    print("Wrong number of parameters")
    exit()
elif option == "fr" and len(sys.argv) != 5:
    print("Wrong number of parameters")
    exit()

with open(filename, "rb") as read_file:
    byte_value = read_file.read(1)
    print(byte_value)
    while byte_value != b"":
        byte_value = read_file.read(1)
        print(byte_value)
