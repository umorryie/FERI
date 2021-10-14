import math

# Naive/Foolish method
def naive_method(potential_prime_number):
    if potential_prime_number <= 2:
        return 2

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
