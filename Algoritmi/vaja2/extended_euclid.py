class ExtendedEuclid:
    def __init__(self) -> None:
        self.x = None
        self.y = None
        self.d = None
        self.n_x = None
        self.n_y = None
        self.n_d = None

    def extended_euclid(self, a: int, b: int, d=None, x=None, y=None):
        if b == 0:
            self.d = a
            self.n_d = a
            self.x = 1
            self.n_x = 1
            self.y = 0
            self.n_y = 0
            return a
        else:
            self.extended_euclid(b, a % b, self.n_d, self.n_x, self.n_y)
            self.x = self.n_y
            self.y = self.n_x - (a / b) * self.n_y
            self.d = self.n_d
            return self.d