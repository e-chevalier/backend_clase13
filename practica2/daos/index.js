async function dynamicImport() {

    try {
        // DAO MEMORY DEFAULT
        const { default: UsersDaoMemory } = await import('./users/UsersDaoMemory.js')

        // console.log("Initializing container for File")
        // const { default: UsersDaoFile } = await import('./users/UsersDaoFile.js')
        // // USERS DAO FILE
        // const usersContainer = new UsersDaoFile()

        console.log("Initializing container for MongoDB Atlas")
        const { default: UsersDaoMongoDB } = await import('./users/UsersDaoMongoDB.js')
        // MONOGODB ATLAS CONNECTION
        const { connectMongodbAtlas } = await import('../utils/mongodbAtlas/mongodbAtlas.js')
        // Connnect to dabase
        await connectMongodbAtlas()
        // USERS DAO MONGODB
        const usersContainer = new UsersDaoMongoDB()
        // Users DAO MEMORY
        const usersMemory = new UsersDaoMemory(await usersContainer.getAll())


        return { usersContainer, usersMemory }

    } catch (error) {
        console.log(error)
    }
}

const { usersContainer, usersMemory } = await dynamicImport()

export { usersContainer, usersMemory }
