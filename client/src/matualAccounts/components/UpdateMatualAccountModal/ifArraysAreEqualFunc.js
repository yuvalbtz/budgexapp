export function areEqual(arr1, arr2)
	{
		let n = arr1.length;
		let m = arr2.length;

		// If lengths of arrays are not equal
		if (n !== m)
			return false;

		// Store arr1[] elements and their counts in
		// hash map
		let map	= new Map();
		let count = 0;
		
    for (let i = 0; i < n; i++) {
			if (map.get(arr1[i]) == null)
				map.set(arr1[i], 1);
			else {
				count = map.get(arr1[i]);
				count++;
				map.set(arr1[i], count);
			}
		}

		// Traverse arr2[] elements and check if all
		// elements of arr2[] are present same number
		// of times or not.
		for (let i = 0; i < n; i++) {
			// If there is an element in arr2[], but
			// not in arr1[]
			if (!map.has(arr2[i]))
				return false;

			// If an element of arr2[] appears more
			// times than it appears in arr1[]
			if (map.get(arr2[i]) === 0)
				return false;

			count = map.get(arr2[i]);
			--count;
			map.set(arr2[i], count);
		}

		return true;
	}