
class Failure {

    async getFailure(req) {
        try {
            console.log(`getFailure`)
            // LOGIC HERE
            return { status: "OK" }
        } catch (error) {
            console.log(error)
        }
    }

}

export let failureService = new Failure()