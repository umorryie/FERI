class ExtendedEuclid:
    def __init__(self) -> None:
        self.x = None
        self.y = None
        self.d = None

    def extended_euclid(self, a: int, b: int, d=None, x=None, y=None):
        if b == 0:
            self.d = a
            self.x = 1
            self.y = 0
            return a
        else:
            self.extended_euclid(b, a % b, self.d, self.x, self.y)
            old_x = self.x
            self.x = self.y
            self.y = old_x - (a / b) * self.y

            return self.d
