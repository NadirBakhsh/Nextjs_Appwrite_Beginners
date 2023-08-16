import mongoose from 'mongoose'

export async function connect() {
	try {
		mongoose.connect(process.env.MONGO_URI!)
		const connection = mongoose.connection

		connection.on('connected', () => {
			console.log('Mongo Db connected successfully')
		})

		connection.on('error', (err) => {
			console.log('Mongo Db not connected due to an error' + err)
			process.exit()
		})
	} catch (error) {
		console.log('Db not connected' + error)
	}
}
