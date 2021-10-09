import sys

# Read bits from byte value
def read_bits(byte_value):
    bit_array = []
    return bit_array


# Write bits from bit array
def write_bits(bit_array, filepath):
    return


def find_bit_positions(bit_array, bit_to_find):
    return


def find_and_replace_bit(old_bit_value, new_bit_value):
    return


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
    # Write whole file byte by byte
    while byte_value != b"":
        byte_value = read_file.read(1)
        print(byte_value)
