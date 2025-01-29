def process_test_case(integers, index, result):
    if index == len(integers):
        return result
    current = integers[index]
    if current >= 0:
        result += current ** 2
    return process_test_case(integers, index + 1, result)

def main():
    n = int(input())
    
    def read_test_case():
        x = int(input())  
        integers = list(map(int, input().split()))  
        total = process_test_case(integers, 0, 0)
        return total
    
    def read_all_test_cases(test_count, index=0, results=None):
        if results is None:
            results = []
        if index == test_count:
            return results
        results.append(read_test_case())
        return read_all_test_cases(test_count, index + 1, results)
    
    def print_results(results, index=0):
        if index == len(results):
            return
        print(results[index])
        print_results(results, index + 1)
    
    results = read_all_test_cases(n)
    print_results(results)

if __name__ == "__main__":
    main()