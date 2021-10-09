import math
from termcolor import cprint

# Super-Duper with default parameters
def LCG(m=2 ** 32, a=69069, b=0, R_0=0):
    return (a * R_0 + b) % m


# Naive/Foolish method
def naive_method(potential_prime_number):
    # potential_prime_number can not be even number
    if potential_prime_number % 2 == 0:
        potential_prime_number += 1

    while True:
        j = 3

        # we are looking for potential_prime_number divider
        # we don't exceed math.sqrt(potential_prime_number) because then this for sure is not prime number
        while potential_prime_number % j != 0 and j <= math.sqrt(
            potential_prime_number
        ):
            j += 2

        # if true -> we did not find any integer deriver and this potential_prime_number might be a real primer number
        if j > math.sqrt(potential_prime_number):
            return potential_prime_number

        # Fact that 2 is prime number and that even number can not be primer number
        potential_prime_number += 2


# Miller Rabin method
# Returns False if this number for sure is not primer number
# Return True if this number probably is prime number. But this probably is still not 100%
def miller_rabin_method(p, s=3):
    if p <= 3 and p != 1 and p > 0:
        return True
    if p % 2 == 0:
        return False

    d, k = find_k_and_d(p)

    for j in range(1, s):
        a = random(2, p - 2)
        x = modular_exponentiation(a, d, p)

        if x == 1:
            return True

        for i in range(k - 1):
            if x == p - 1:
                break
            x = (x * x) % p

        if x != p - 1:
            return True
    return False


def find_k_and_d(p):
    d = p - 1
    k = 0

    while d % 2 == 0:
        d = int(d / 2)
        k += 1

    return d, k


def modular_exponentiation(a, b, n):
    d = 1
    binary_b = format(b, "b")

    for i in reversed(range(len(binary_b) - 1)):
        d = (d * d) % n
        if binary_b[len(binary_b) - 1 - i] == 1:
            d = (d * a) % n
    return d


def random(a, b):
    return (a + LCG()) % (b - a + 1)


if __name__ == "__main__":
    while True:
        print(
            """
            1. Check if number is prime number
            2. Get prime number
        """
        )
        answer = input("What would you like to do?")

        if answer == "1":
            print(
                """
            1. Naive method
            2. Miller Rabin test
        """
            )
            answer = input("Which method do you want to try out?")

            if answer == "1":
                answer = input("What number do you want to check?")
                if miller_rabin_method(int(answer)) == False:
                    cprint("Your number for sure is not prime number", "red")
                else:
                    cprint("Your number is prime number", "green")

            elif answer == "2":
                answer = input("Would you like to set your 's' parameter? (y/n)")

                if answer == "n":
                    answer = input("What number do you want to check?")
                    if miller_rabin_method(int(answer)) == False:
                        cprint("Your number for sure is not prime number", "red")
                    else:
                        cprint("Your number might be prime number", "green")
                    print("Your ")
                elif answer == "y":
                    answer = input("What would you like for 's' to be?")
                    miller_s_parameter = int(answer)
                    answer = input("What number do you want to check?")

                    if miller_rabin_method(int(answer), miller_s_parameter) == False:
                        cprint("Your number for sure is not prime number", "red")
                    else:
                        cprint("Your number might be prime number", "green")
        elif answer == "2":
            answer = input(
                "How many diggets do you want in your number? (Specify the length of bits for your number - Max = 32 bit)"
            )
            answer = int(answer)

            if answer < 2 or answer > 32:
                print(
                    "Specified number is out of valid range. Valid range is from 2 to 32"
                )
            else:
                cprint(
                    f"Your prime number is: {naive_method(2**(int(answer)-1))}", "green"
                )
