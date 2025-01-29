def main():
    def sum_of_squares(nums, total=0):
        # Base case: If the list is empty, return the accumulated total
        if not nums:
            return total
        # Take the first element from the list
        current = nums[0]
        # If it's positive, add its square to the total
        if current >= 0:
            total += current ** 2
        # Recur with the rest of the list
        return sum_of_squares(nums[1:], total)

    # Read the number of test cases
    N = int(input().strip())

    # Process each test case
    for _ in range(N):
        # Read the size of the array (we don't actually need to use this value)
        X = int(input().strip())
        # Read the array of numbers
        nums = list(map(int, input().strip().split()))
        
        # Calculate the sum of squares of non-negative numbers
        result = sum_of_squares(nums)
        
        # Print the result for this test case
        print(result)

if __name__ == "__main__":
    main()
