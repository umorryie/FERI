import sys
from bit import Bit

if __name__ == "__main__":
    my_bit = Bit()

    # Get filename from arguments
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

    # Open filename
    with open(filename, "rb") as read_file:
        # First byte
        byte_value = read_file.read(1)
        my_bit.read_bits(byte_value=byte_value)
        # Write whole file byte by byte
        while byte_value != b"":
            byte_value = read_file.read(1)
            my_bit.read_bits(byte_value=byte_value)
    print(my_bit.get_bits())
