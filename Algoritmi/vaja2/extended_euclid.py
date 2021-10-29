def extended_euclid(a: int, b: int):
    if a == 0:
        gcd, x, y = b, 0, 1
        return gcd, x, y
    else:
        gcd, x1, y1 = extended_euclid(b % a, a)
        x = y1 - (b // a) * x1
        y = x1

        return gcd, x, y
