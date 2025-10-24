def first_non_repeating_char(s):
    char_count = {}
    for char in s:
        char_count[char] = char_cound.get(char, 0) + 1
    for i, char in enumerate(s):
        if char_count[char] == 1:
            return i
    return -1