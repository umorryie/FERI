import re
from array import array


class Bit:
    def __init__(self):
        self.bits = []

    # Read bits from byte value
    def read_bits(self, byte_value):
        byte = byte_value[0]
        bit_array = [(byte >> i) & 1 for i in range(8)]
        self.bits.append(bit_array)

    # Write bits from bit array
    def write_bits(self, filepath, new_bits_to_write):
        bin_array = array("B")
        bits = self.get_bits_string(new_bits_to_write).ljust(
            32, "0"
        )  # pad it to length 32

        for octect in re.findall(r"\d{8}", bits):  # split it in 4 octects
            bin_array.append(int(octect[::-1], 2))  # reverse them and append it

        with open(filepath, "wb") as f:
            f.write(bytes(bin_array))

    def find_bit_positions(self, bit_to_find):
        # <input-podatek1> as an array e.g. we create [0, 0, 0, 0, 0, 0, 0, 0] from "00000000"
        bits_to_find_array = [int(bool_value) for bool_value in bit_to_find]
        # How many arrays we need to check one after another
        check_range = int(len(bits_to_find_array) / 8)
        my_bits = self.bits

        # We need to check check_range less than whole length because we check check_range of arrays in advance
        index = 0
        while index < len(my_bits):
            is_equal = True
            if index + check_range > len(my_bits):
                break
            for i in range(check_range):
                if my_bits[index + i] != [
                    bits_to_find_array[i * 8 + j] for j in range(8)
                ]:
                    is_equal = False
            if is_equal == True:
                print(f"Found index: {index}")
            index += 1

    def find_and_replace_bit(self, old_bit_value, new_bit_value):
        new_bits = []
        my_bits = self.bits

        # <input-podatek1> as an array e.g. we create [0, 0, 0, 0, 0, 0, 0, 0] from "00000000"
        old_bits_to_find_array = [int(bool_value) for bool_value in old_bit_value]
        # How many arrays we need to check one after another
        old_checked_range = int(len(old_bits_to_find_array) / 8)

        # <input-podatek2> as an array e.g. we create [0, 0, 0, 0, 0, 0, 0, 0] from "00000000"
        new_bits_to_find_array = [int(bool_value) for bool_value in new_bit_value]
        # How many arrays we need to check one after another
        new_checked_range = int(len(new_bits_to_find_array) / 8)

        index = 0
        while index < len(my_bits):
            if index + old_checked_range > len(my_bits):
                new_bits.append(my_bits[index])
                index += 1
            else:
                is_equal = True
                for i in range(old_checked_range):
                    if my_bits[index + i] != [
                        old_bits_to_find_array[i * 8 + j] for j in range(8)
                    ]:
                        is_equal = False
                if is_equal == True:
                    for k in range(new_checked_range):
                        new_bits.append(new_bits_to_find_array[k * 8 : (k + 1) * 8])
                    # We need to add old_checked_range to index because we replaced all the values
                    index += old_checked_range
                else:
                    new_bits.append(my_bits[index])
                    index += 1
        return new_bits

    def get_bits_string(self, bit_array):
        return "".join(["".join(["".join(str(y)) for y in x]) for x in bit_array])

    def get_bits(self):
        return self.bits
