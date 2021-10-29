import miller_rabin
import extended_euclid
import sys
import math

# TODO datoteko piši v bitih in preberi v bitih
# TODO spremeni ono za en bit več, en bit majn ko kodiraš, dekodiraš
PUBLIC_KEY = "pubkey.txt"
PRIVATE_KEY = "privkey.txt"
ENCRYPTION_FILE = "encrypted.txt"
DENCRYPTION_FILE = "decrypted.txt"
ENCRYPTION_DECRYPTION_BIT_LENGTH = "length.txt"


def get_two_prime_numbers(bit_length: int):
    p = miller_rabin.get_prime_number_miller_rabin(2 ** (bit_length - 1))
    q = miller_rabin.get_prime_number_miller_rabin(p + 1)
    return p, q


def get_e(fi_n: int) -> int:
    for i in range(3, fi_n, 2):
        # TODO test extended euclid is works fine
        gcd, x, y = extended_euclid.extended_euclid(i, fi_n)
        if gcd == 1:
            return i


# TODO This doest work
def modular_linear_equation_solver(a: int, b: int, n: int) -> int:
    gcd, x, y = extended_euclid.extended_euclid(a, n)

    if gcd % b == 0:
        return (x * (b / gcd)) % n
    else:
        print("Modular linear equation is not solvable")


def from_string_to_bits(string_value: str) -> list:
    bits_array = []
    for character in string_value:
        bits = bin(ord(character))[2:]
        bits = "00000000"[len(bits) :] + bits
        bits_array.extend([int(single_bit) for single_bit in bits])
    return bits_array


def from_bits_to_string(bits_value: list) -> str:
    chars_array = []
    for b in range(int(len(bits_value) / 8)):
        byte = bits_value[b * 8 : (b + 1) * 8]
        # TODO Do we need this?=??
        # TODO chars_array.append(chr(int("".join([str(bit) for bit in byte[::-1]]), 2)))
        chars_array.append(chr(int("".join([str(bit) for bit in byte]), 2)))
    return "".join(chars_array)


def from_bit_to_int(bits_array: list) -> int:
    return int("".join(str(x) for x in bits_array), 2)


def from_int_to_bit(bit_int: int) -> list:
    return [int(digit_number) for digit_number in bin(bit_int)[2:]]


def from_array_to_chunk_array(iterable_array, chunk_size):
    results = []
    chunk = []
    for i, el in enumerate(iterable_array, 1):
        chunk.append(el)
        if i % chunk_size == 0:
            results.append(chunk)
            chunk = []
    if len(chunk) != 0:
        results.append(chunk)

    return results


# TODO: Delete this helper function
def print_bits(bit_array: list):
    print_string = ""
    for i in range(len(bit_array)):
        print_string += str(bit_array[i])
        if i % 8 == 7:
            print_string += " "
    print(print_string)


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "encrypt" and ".txt" in sys.argv[2]:
        p, q = get_two_prime_numbers(bit_length=32)
        n = q * p
        fi_n = (q - 1) * (p - 1)
        e = get_e(fi_n)
        d = modular_linear_equation_solver(e, 1, fi_n)
        with open(PUBLIC_KEY, "w") as f:
            f.write(f"{e} {n}\n")
        with open(PRIVATE_KEY, "w") as f:
            f.write(f"{int(d)} {n}\n")
        print("Public and private key successfully generated")

        # For encoding we use down rounded int
        encode_length = int(math.log(n, 2))
        with open(ENCRYPTION_DECRYPTION_BIT_LENGTH, "w") as f:
            # For dencoding we use up rounded int
            f.write(str(encode_length + 1))

        filename = sys.argv[2]
        with open(filename, "r") as f:
            lines = f.readlines()
        bits_arrays = from_string_to_bits(lines[0])
        # WORKS UNTIL HERE

        for bit_chunk in from_array_to_chunk_array(bits_arrays, encode_length):
            M = from_bit_to_int(bit_chunk)
            C = miller_rabin.modular_exponentiation(M, e, n)
            # print_bits(from_int_to_bit(C))
            encrypted_value = from_bits_to_string(from_int_to_bit(C))
            encrypted_file = open(ENCRYPTION_FILE, "a")
            encrypted_file.write(encrypted_value)
            encrypted_file.close()
        print("Message encrypted")
    elif len(sys.argv) == 2 and sys.argv[1] == "decrypt":
        # To create new empty file
        with open(DENCRYPTION_FILE, "w") as fp:
            pass

        with open(ENCRYPTION_DECRYPTION_BIT_LENGTH, "r") as f:
            encode_length = int(f.readlines()[0])

        with open(ENCRYPTION_FILE, "r") as f:
            lines = f.readlines()
        bits_arrays = from_string_to_bits(lines[0])

        with open(PRIVATE_KEY, "r") as f:
            line = f.readline()
            line = line.split(" ")
            d = int(line[0])
            n = int(line[1])

        for bit_chunk in from_array_to_chunk_array(bits_arrays, encode_length):
            C = from_bit_to_int(bit_chunk)
            M = miller_rabin.modular_exponentiation(C, d, n)
            decrypted_value = from_bits_to_string(from_int_to_bit(M))
            # print_bits(from_int_to_bit(M))
            decrypted_file = open(DENCRYPTION_FILE, "a")
            decrypted_file.write(decrypted_value)
            decrypted_file.close()
        print("Message decrypted")
