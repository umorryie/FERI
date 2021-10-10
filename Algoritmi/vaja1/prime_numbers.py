from termcolor import cprint
import image_calculations
import naive_function
import miller_rabin

if __name__ == "__main__":
    image_calculations.calculate_miller_rabin_speed_based_on_parameter_s()
    image_calculations.miller_vs_naive_speed()
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
                if miller_rabin.miller_rabin_method(int(answer)) == False:
                    cprint("Your number for sure is not prime number", "red")
                else:
                    cprint("Your number is prime number", "green")

            elif answer == "2":
                answer = input("Would you like to set your 's' parameter? (y/n)")

                if answer == "n":
                    answer = input("What number do you want to check?")
                    if miller_rabin.miller_rabin_method(int(answer)) == False:
                        cprint("Your number for sure is not prime number", "red")
                    else:
                        cprint("Your number might be prime number", "green")
                    print("Your ")
                elif answer == "y":
                    answer = input("What would you like for 's' to be?")
                    miller_s_parameter = int(answer)
                    answer = input("What number do you want to check?")

                    if (
                        miller_rabin.miller_rabin_method(
                            int(answer), miller_s_parameter
                        )
                        == False
                    ):
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
                    f"Your prime number is: {naive_function.naive_method(2**(int(answer)-1))}",
                    "green",
                )
