from tkinter import *
from matplotlib.pyplot import text
import naive_function
import miller_rabin

screen = Tk()
prime_number_input = IntVar()
optional_parameter_s_input = IntVar()
prime_number_length_input = IntVar()


def check_prime_number_with_miller():
    prime_number = prime_number_input.get()
    parameter_s = optional_parameter_s_input.get()

    if parameter_s < 1:
        parameter_s = 1

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


def generate_prime_number_naive():
    digit_length = prime_number_length_input.get()
    if digit_length < 2 or digit_length > 32:
        result = Label(
            text=f"Please insert a valid prime number in bit length from 2 fo 32",
            bg="red",
            width="50",
        )
    else:
        prime_number = naive_function.naive_method(2 ** (digit_length - 1))
        result = Label(
            text=f"Your {digit_length} digit bit prime number is: {prime_number}",
            bg="green",
            width="50",
        )
    result.place(x=60, y=510)


def generate_prime_number_miller():
    digit_length = prime_number_length_input.get()
    if digit_length < 2 or digit_length > 32:
        result = Label(
            text=f"Please insert a valid prime number in bit length from 2 fo 32",
            bg="red",
            width="50",
        )
    else:
        prime_number = miller_rabin.get_prime_number_miller_rabin(
            2 ** (digit_length - 1)
        )
        result = Label(
            text=f"Your {digit_length} digit bit prime number is: {prime_number}",
            bg="green",
            width="50",
        )
    result.place(x=60, y=510)


def create_graphics():
    screen.geometry("600x600")
    screen.title("Vaja 1")
    heading = Label(
        text="Prime number exercise", bg="grey", fg="black", width="500", height="3"
    )
    heading.pack()

    # Label for - Check prime number
    check_prime_number = Label(text="Check if number is prime number")
    check_prime_number.place(x=15, y=70)

    prime_number_checker_entry = Entry(textvariable=prime_number_input, width="30")

    prime_number_checker_entry.place(x=15, y=90)

    # Label for - Optional millers parameter s
    optional_parameter_s = Label(text="Optional parameter s for millers method")
    optional_parameter_s.place(x=15, y=110)

    optional_parameter_s_entry = Entry(
        textvariable=optional_parameter_s_input, width="30"
    )

    optional_parameter_s_entry.place(x=15, y=130)

    # Button for - Miller rabin method
    check_prime_number_miller_rabin = Button(
        screen,
        text="Check with Miller Rabin's method",
        width="27",
        height="1",
        command=check_prime_number_with_miller,
        bg="grey",
    )
    check_prime_number_miller_rabin.place(x=15, y=155)

    # Label for - naive method
    check_prime_number_naive = Button(
        screen,
        text="Check with Naive method",
        width="27",
        height="1",
        command=check_prime_number_function_with_naive,
        bg="grey",
    )
    check_prime_number_naive.place(x=15, y=185)

    # Label for - generating prime number
    prime_number_length = Label(
        text="How many digits do you want in your primary number (specify bit length 2 - 32)"
    )
    prime_number_length.place(x=15, y=400)

    prime_number_length_entry = Entry(
        textvariable=prime_number_length_input, width="30"
    )
    prime_number_length_entry.place(x=160, y=430)
    generate_prime_number_button = Button(
        screen,
        text="Generate prime number with miller",
        width="27",
        height="1",
        command=generate_prime_number_miller,
        bg="grey",
    )
    generate_prime_number_button.place(x=15, y=455)

    generate_prime_number_button_naive = Button(
        screen,
        text="Generate prime number with naive",
        width="27",
        height="1",
        command=generate_prime_number_naive,
        bg="grey",
    )
    generate_prime_number_button_naive.place(x=300, y=455)

    screen.mainloop()
