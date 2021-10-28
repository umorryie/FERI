from random import randint
import time
import matplotlib.pyplot as plt
import miller_rabin
import rsa_script
import math

KEY_GENERATION_SPEED = "key_gen_speed.pdf"
ENCODING_SPEED = "ecoding_speed.pdf"
DECODING_SPEED = "decoding_speed.pdf"
MESSAGE = "This is fake message. Lorem ipsum."


def get_random_number(bit_number: int) -> int:
    return randint(2 ** (bit_number - 1), 2 ** bit_number - 1)


def calculate_key_generating_speed():
    key_generation_time_array = []
    coding_time_array = []
    decoding_time_array = []
    encrypted_value = []
    for i in range(3, 16):
        # Generating keys
        old_time = time.perf_counter()
        for _ in range(1000):
            random_number_in_bit_range = get_random_number(i)
            p = miller_rabin.get_prime_number_miller_rabin(random_number_in_bit_range)
            q = miller_rabin.get_prime_number_miller_rabin(p + 1)
            n = q * p
            fi_n = (q - 1) * (p - 1)
            e = rsa_script.get_e(fi_n)
            d = rsa_script.modular_linear_equation_solver(e, 1, fi_n)
            # TODO: There should always be int. Not float!
            d=int(d)
        new_time = time.perf_counter()
        key_generation_time_array.append(new_time - old_time)
        encode_length = int(math.log(n, 2)) + 1

        # Coding the message
        old_time = time.perf_counter()
        bits_arrays = rsa_script.from_string_to_bits(MESSAGE)
        for bit_chunk in rsa_script.from_array_to_chunk_array(
            bits_arrays, encode_length
        ):
            M = rsa_script.from_bit_to_int(bit_chunk)
            C = miller_rabin.modular_exponentiation(M, e, n)
            encrypted_value = encrypted_value + rsa_script.from_int_to_bit(C)

        new_time = time.perf_counter()
        coding_time_array.append(new_time - old_time)

        # Decoding the encoded message
        old_time = time.perf_counter()
        for bit_chunk in rsa_script.from_array_to_chunk_array(
            encrypted_value, encode_length
        ):
            C = rsa_script.from_bit_to_int(bit_chunk)
            M = miller_rabin.modular_exponentiation(C, d, n)
            rsa_script.from_int_to_bit(M)
        new_time = time.perf_counter()
        decoding_time_array.append(new_time - old_time)

    plt.plot([i for i in range(3, 16)], key_generation_time_array)
    plt.ylabel("Time")
    plt.xlabel("Bit size n")
    plt.title("Key generating time based on n")
    plt.savefig(KEY_GENERATION_SPEED)
    plt.close()

    plt.plot([i for i in range(3, 16)], coding_time_array)
    plt.ylabel("Time")
    plt.xlabel("Bit size n")
    plt.title("Coding time based on n")
    plt.savefig(ENCODING_SPEED)
    plt.close()

    plt.plot([i for i in range(3, 16)], decoding_time_array)
    plt.ylabel("Time")
    plt.xlabel("Bit size n")
    plt.title("Decoding time based on n")
    plt.savefig(DECODING_SPEED)
    plt.close()


if __name__ == "__main__":
    calculate_key_generating_speed()
