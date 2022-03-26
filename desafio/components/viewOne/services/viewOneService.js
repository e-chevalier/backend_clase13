class ViewOne {

    async getViewOne() {
        try {
            return { status: "OK" }
        } catch (error) {
            console.log(error);
        }
    }

}

export let viewOneService = new ViewOne()