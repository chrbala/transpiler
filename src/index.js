const ExpectCounter = () => {
	var count = 1
	return num => {
		if (num !== count++)
			throw new Error(`${num} is not equal to the current count of ${count}`)
		console.log(num)
	}
}

const testAsync = async () => {
	const expectCounter = ExpectCounter()
	expectCounter(1)

	var p = new Promise(resolve => setTimeout(resolve), 1000)
	var q = p.then(() => expectCounter(3))

	expectCounter(2)
	await q
	expectCounter(4)
}

testAsync().catch(e => {
	console.error(e)
	process.exit(1)
})