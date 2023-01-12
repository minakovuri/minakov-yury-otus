const sum = (x) => {
	if (typeof x === 'undefined') {
		return 0
	}

	return function summator(y) {
		if (typeof y === 'undefined') {
			return x
		}

		x += y
		return summator
	}
}