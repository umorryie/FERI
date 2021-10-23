import re
from array import array


class Bit:
    def __init__(self):
        self.bits = []

    # Read bits from byte value
    def read_bits(self, byte_value):
        byte = byte_value[0]
        for i in range(8):
            self.bits.append((byte >> i) & 1)

    # Write bits from bit array
    def write_bits(self, filepath, new_bits_to_write):
        bin_array = array("B")
        missing_bit_length = len(new_bits_to_write) % 8

        # Fill bit_array if needed
        if missing_bit_length > 0:
            for _ in range(8 - missing_bit_length):
                new_bits_to_write.append(0)

        bits = self.get_bits_string(new_bits_to_write).ljust(
            32, "0"
        )  # pad it to length 32

        for octect in re.findall(r"\d{8}", bits):  # split it in 4 octects
            bin_array.append(int(octect[::-1], 2))  # reverse them and append it

        with open(filepath, "wb") as f:
            f.write(bytes(bin_array))

    def get_bits_string(self, bit_array):
        return "".join(["".join(str(y)) for y in bit_array])

    def get_bits(self):
        return self.bits

    def from_bits_to_string(self) -> str:
        chars_array = []
        for b in range(int(len(self.bits) / 8)):
            byte = self.bits[b * 8 : (b + 1) * 8]
            # TODO this without reverse byte[::-1] does not work
            chars_array.append(chr(int("".join([str(bit) for bit in byte[::-1]]), 2)))
        return "".join(chars_array)
