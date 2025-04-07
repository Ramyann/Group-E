import sys
import string
import os

# Helper function to find the position of a letter in the Playfair matrix
def find_position(matrix, char):
    for row in range(5):
        for col in range(5):
            if matrix[row][col] == char:
                return row, col
    return None

# Function to decrypt Playfair cipher
def decrypt_playfair(ciphertext, key):
    key = key.upper().replace('J', 'I')
    matrix = []
    seen = set()
    for char in key + "ABCDEFGHIKLMNOPQRSTUVWXYZ":
        if char not in seen:
            seen.add(char)
            matrix.append(char)
    table = [matrix[i * 5:(i + 1) * 5] for i in range(5)]

    ciphertext = ciphertext.upper().replace('J', 'I')
    if len(ciphertext) % 2 != 0:
        ciphertext += 'X'
    pairs = [ciphertext[i:i + 2] for i in range(0, len(ciphertext), 2)]

    decrypted = ""
    for a, b in pairs:
        r1, c1 = find_position(table, a)
        r2, c2 = find_position(table, b)

        if r1 == r2:
            decrypted += table[r1][(c1 - 1) % 5] + table[r2][(c2 - 1) % 5]
        elif c1 == c2:
            decrypted += table[(r1 - 1) % 5][c1] + table[(r2 - 1) % 5][c2]
        else:
            decrypted += table[r1][c2] + table[r2][c1]

    return decrypted, key

# Score decrypted text based on common English letter frequencies
def calculate_english_score(text):
    common_letters = 'ETAOINSHRDLCUMWFGYPBVKJXQZ'
    score = 0
    for char in text.upper():
        if char in common_letters:
            score += 26 - common_letters.index(char)  # Higher score for more common letters
    return score

# Load possible keys from file
def load_possible_keys_from_file(filename="keylist.txt"):
    filepath = os.path.join(os.path.dirname(__file__), filename)
    with open(filepath, "r") as file:
        keys = file.readlines()
    return [key.strip() for key in keys if key.strip().isalpha()]


# Try all keys and select the best-scoring decryption
def attempt_decryption_with_keys(ciphertext, possible_keys):
    best_score = -1
    best_result = (None, None)

    for key in possible_keys:
        decrypted, key_used = decrypt_playfair(ciphertext, key)
        score = calculate_english_score(decrypted)
        if score > best_score:
            best_score = score
            best_result = (decrypted, key_used)

    return best_result

# Main block
if __name__ == "__main__":
    ciphertext = sys.stdin.read().strip()
    possible_keys = load_possible_keys_from_file()
    decrypted, key_used = attempt_decryption_with_keys(ciphertext, possible_keys)

    if decrypted:
        sys.stdout.write(f"Key: {key_used}\nPlaintext: {decrypted}")
    else:
        sys.stdout.write("No valid decryption found.")
