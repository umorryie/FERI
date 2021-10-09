import sys
from bit import Bit

TEST_OUT_CONVERTED_BMP = "test_out_converted_bmp.bmp"
TEST_BMP = "test_bmp.bmp"

if __name__ == "__main__":
    my_bit = Bit()

    # Get filename from arguments
    filename = sys.argv[1]
    option = sys.argv[2]
    bits_to_find = sys.argv[3]

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
        string_byte_value = read_file.read(1)

        my_bit.read_bits(byte_value=string_byte_value)
        # Write whole file byte by byte
        while string_byte_value != b"":
            string_byte_value = read_file.read(1)

            # Last byte is b"". So this would break without this if
            if string_byte_value != b"":
                my_bit.read_bits(byte_value=string_byte_value)

    if option == "f":
        my_bit.find_bit_positions(bits_to_find)
    else:
        bits_to_replace = sys.argv[4]
        new_bits_to_write = my_bit.find_and_replace_bit(
            old_bit_value=bits_to_find, new_bit_value=bits_to_replace
        )
        my_bit.write_bits(TEST_OUT_CONVERTED_BMP, new_bits_to_write)
        my_bit.write_bits(TEST_BMP, my_bit.get_bits())
