# Super-Duper with default parameters
def LCG(m=2 ** 32, a=69069, b=0, R_0=0):
    return (a * R_0 + b) % m


# TODO: s>1 doesnt work correctly
# Miller Rabin method
# Returns False if this number for sure is not primer number
# Return True if this number probably is prime number. But this probably is still not 100%
def miller_rabin_method(p, s=1):
    if p <= 3 and p != 1 and p > 0:
        return True
    if p % 2 == 0:
        return False

    d, k = find_k_and_d(p)

    for j in range(1, s):
        a = random(2, p - 2)
        x = modular_exponentiation(a, d, p)

        if x == 1:
            continue

        for i in range(k - 1):
            if x == p - 1:
                break
            x = (x * x) % p

        if x != p - 1:
            return False
    return True


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

    for i in reversed(range(len(binary_b))):
        d = (d * d) % n
        if binary_b[i] == 1:
            d = (d * a) % n
    return d


def random(a, b):
    return (a + LCG()) % (b - a + 1)
