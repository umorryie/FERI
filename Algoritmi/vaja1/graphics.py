from tkinter import *
from matplotlib.pyplot import text
import naive_function
import miller_rabin

screen = Tk()
prime_number_input = IntVar()
optional_parameter_s_input = IntVar()


def check_prime_number_with_miller():
    prime_number = prime_number_input.get()
    parameter_s = None
    parameter_s = optional_parameter_s_input.get()
    result = Label(text="This might be a prime number", bg="green", width="30")
    is_prime_number = miller_rabin.miller_rabin_method(prime_number, parameter_s)

    if is_prime_number == False:
        result = Label(text="This is NOT a prime number", bg="red", width="30")
    result.place(x=15, y=220)


def check_prime_number_function_with_naive():
    prime_number = prime_number_input.get()
    result = Label(text="This is a prime number", bg="green", width="30")
    naive_prime_number = naive_function.naive_method(prime_number)
    is_prime_number = naive_prime_number == prime_number

    if is_prime_number == False:
        result = Label(text="This is NOT a prime number", bg="red", width="30")
    result.place(x=15, y=220)


def create_graphics():
    screen.geometry("600x600")
    screen.title("Vaja 1")
    heading = Label(
        text="Prime number exercise", bg="grey", fg="black", width="500", height="3"
    )
    heading.pack()

    check_prime_number = Label(text="Check if number is primer number")
    check_prime_number.place(x=15, y=70)

    prime_number_checker_entry = Entry(textvariable=prime_number_input, width="30")

    prime_number_checker_entry.place(x=15, y=90)

    optional_parameter_s = Label(text="Optional parameter s for millers method")
    optional_parameter_s.place(x=15, y=110)

    optional_parameter_s_entry = Entry(
        textvariable=optional_parameter_s_input, width="30"
    )

    optional_parameter_s_entry.place(x=15, y=130)

    check_primer_number_miller_rabin = Button(
        screen,
        text="Check with Miller Rabin's method",
        width="27",
        height="1",
        command=check_prime_number_with_miller,
        bg="grey",
    )
    check_primer_number_naive = Button(
        screen,
        text="Check with Naive method",
        width="27",
        height="1",
        command=check_prime_number_function_with_naive,
        bg="grey",
    )
    check_primer_number_miller_rabin.place(x=15, y=155)
    check_primer_number_naive.place(x=15, y=185)

    screen.mainloop()
