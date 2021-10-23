import sys
import bit

BIT_CODING_NUMBER=32

if __name__ == "__main__":
    if sys.argv[1] not in ["c", "d"] or len(sys.argv) != 4:
        print("Wrong arguments")
        exit()

    my_bit = bit.Bit()
    input_filename = sys.argv[2]
    output_file = sys.argv[3]

    if sys.argv[1] == "c":
        with open(input_filename, "rb") as read_file:
            # First byte
            string_byte_value = read_file.read(1)

            my_bit.read_bits(byte_value=string_byte_value)
            # Write whole file byte by byte
            while string_byte_value != b"":
                string_byte_value = read_file.read(1)

                # Last byte is b"". So this would break without this if
                if string_byte_value != b"":
                    my_bit.read_bits(byte_value=string_byte_value)

        read_string = my_bit.from_bits_to_string()
        all_freq = {}

        for index, char in enumerate(read_string):
            if char in all_freq:
                all_freq[char]["frequency"] += 1
                all_freq[char]["upper_endpoint"] = index + 1
            else:
                all_freq[char] = {
                    "lower_endpoint": index,
                    "frequency": 1,
                    "upper_endpoint": index + 1,
                }

        lower_endpoint = 0
        upper_endpoint = 2 ** (BIT_CODING_NUMBER - 1) - 1
        second_quarter = (upper_endpoint + 1) / 2
        first_quarter = second_quarter / 2
        third_quarter = first_quarter * 3
        cumulative_sum = len(read_string)

        e_3_counter = 0
        coding_result = ""

        for key in all_freq:
            step = (upper_endpoint - lower_endpoint + 1) / cumulative_sum
            upper_endpoint = lower_endpoint + step * all_freq[key]["upper_endpoint"] - 1
            lower_endpoint = lower_endpoint + step * all_freq[key]["lower_endpoint"]

            while upper_endpoint < second_quarter or lower_endpoint >= second_quarter:
                if upper_endpoint < second_quarter:
                    lower_endpoint *= 2
                    upper_endpoint = (upper_endpoint * 2) + 1
                    coding_result += "0"
                    for i in range(e_3_counter):
                        coding_result += "1"
                    e_3_counter = 0
                elif lower_endpoint >= second_quarter:
                    lower_endpoint = 2 * (lower_endpoint - second_quarter)
                    upper_endpoint = 2 * (upper_endpoint - second_quarter) + 1
                    coding_result += "1"
                    for i in range(e_3_counter):
                        coding_result += "0"
                    e_3_counter = 0

            while lower_endpoint >= first_quarter and upper_endpoint < third_quarter:
                lower_endpoint = 2 * (lower_endpoint - first_quarter)
                upper_endpoint = 2 * (upper_endpoint - first_quarter) + 1
                e_3_counter += 1
        if lower_endpoint < first_quarter:
            coding_result += "01"
            for i in range(e_3_counter):
                coding_result += "1"
        else:
            coding_result += "10"
            for i in range(e_3_counter):
                coding_result += "0"
        # I get:        0001000111
        # I should get: 00010000111
        print(coding_result)
    if sys.argv[1] == "d":
        print("ja")
