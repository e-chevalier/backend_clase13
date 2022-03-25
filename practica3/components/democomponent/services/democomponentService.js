
class Democomponent {

    async test() {
        try {
            console.log(`test`)
            // LOGIC HERE

            return { status: "OK" }
        } catch (error) {
            console.log(error)
        }
    }

}

export let democomponentService = new Democomponent()