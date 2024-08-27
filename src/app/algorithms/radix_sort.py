import math

lst = [170, 45, 75, 90, 802, 24, 2, 66]

sort_lst = [2, 24, 45, 66, 75, 90, 170, 802]

# Refer here for teminologies like index, radix, digit etc.:
# `link` => https://en.wikipedia.org/wiki/Positional_notation


# radix or base is the number of unique digits, including the
# digit zero, used to represent numbers.

def radix_sort(nums: list[int]):
    max_index = math.ceil(math.log10(max(nums)))

    for index in range(max_index):
        # sort nums by their index  i.e.
        # one's place, ten's place and so on.
        sort_by_index(nums, index)

# stable sorts the elments in nums based
# on the given index.
def sort_by_index(nums: list[int], index: int):
    buckets = [[] for _ in range(10)]
    # we have 10 buckets since we our radix is 10

    for num in nums:
        # try this out with 1125 as an example
        # from & refer to `link` as well.
        digit = num // (10 ** index) % 10
        buckets[digit].append(num)
    
    i = 0
    for bucket in buckets:
        while bucket:
            nums[i] = bucket.pop(0)
            i += 1

radix_sort(lst)
print(lst == sort_lst)