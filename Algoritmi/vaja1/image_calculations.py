from random import randint
import time
import matplotlib.pyplot as plt
import naive_function
import miller_rabin

MILLER_RABIN_PARAMETER_S_PATH = "miller-rabin-parameter-s-test.pdf"
NATIVE_VS_MILLER_RABIN_SPEED_TEST = "miller-rabin-vs-native-speed-test.pdf"


def get_random_number(bit_number: int) -> int:
    return randint(2 ** (bit_number - 1), 2 ** bit_number - 1)


def calculate_miller_rabin_speed_based_on_parameter_s():
    time_array = []
    for s in range(1, 21):
        old_time = time.perf_counter()
        for _ in range(1000):
            random_number_in_bit_range = get_random_number(32)
            miller_rabin.miller_rabin_method(random_number_in_bit_range, s)
        new_time = time.perf_counter()
        time_array.append(new_time - old_time)
    plt.plot([i for i in range(1, 21)], time_array)
    plt.ylabel("Time")
    plt.xlabel("Parameter s")
    plt.title("Prime number checker base on parameter s")
    plt.savefig(MILLER_RABIN_PARAMETER_S_PATH)


# TODO - this is too slow
def miller_vs_naive_speed():
    miller_time_array = []
    naive_time_array = []
    for n in range(4, 33):
        old_time = time.perf_counter()
        naive_function.naive_method(2 ** (n - 1))
        new_time = time.perf_counter()
        naive_time_array.append(new_time - old_time)
    for n in range(4, 33):
        old_time = time.perf_counter()
        miller_rabin.get_prime_number_miller_rabin(2 ** (n - 1))
        new_time = time.perf_counter()
        miller_time_array.append(new_time - old_time)
    plt.plot([i for i in range(4, 33)], naive_time_array, label="naive method")
    plt.plot([i for i in range(4, 33)], miller_time_array, label="miller_rabin method")
    plt.ylabel("Time")
    plt.legend()
    plt.xlabel("n-bit prime number")
    plt.title("Native vs miller speed test")
    plt.savefig(NATIVE_VS_MILLER_RABIN_SPEED_TEST)


