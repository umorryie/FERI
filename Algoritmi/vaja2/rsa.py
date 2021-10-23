import miller_rabin
import extended_euclid

PUBLIC_KEY = "pubkey.txt"
PRIVATE_KEY = "privkey.txt"


def get_two_prime_numbers(bit_length: int):
    p = miller_rabin.get_prime_number_miller_rabin(2 ** (bit_length - 1))
    q = miller_rabin.get_prime_number_miller_rabin(p + 1)
    return p, q


def get_e(fi_n: int) -> int:
    for i in range(3, fi_n, 2):
        # TODO test extended euclid is works fine
        extended_e = extended_euclid.ExtendedEuclid()
        if extended_e.extended_euclid(i, fi_n) == 1:
            return i


def modular_linear_equation_solver(a: int, b: int, n: int) -> int:
    extended_e = extended_euclid.ExtendedEuclid()
    d = extended_e.extended_euclid(a, n)

    if d % b == 0:
        return (extended_e.x * (b / d)) % n
    else:
        print("Modular linear equation is not solvable")


if __name__ == "__main__":
    p, q = get_two_prime_numbers(bit_length=32)
    n = q * p
    fi_n = (q - 1) * (p - 1)
    e = get_e(fi_n)
    d = modular_linear_equation_solver(e, 1, fi_n)
    with open(PUBLIC_KEY, "w") as f:
        f.write(f"{e} {n}\n")
    with open(PRIVATE_KEY, "w") as f:
        f.write(f"{d} {n}\n")
