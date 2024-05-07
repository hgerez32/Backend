class ProductManager {
    constructor(){
        this.product = [];
    }

    addProduct(title, description, price, code, stock = new Date()){
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            code,
            stock
        };
        this.product.push(product);
    }

    #getMaxId() {
        let maxId = 0;
        this.product.map((product) => { 
        if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    getProduct() {
        return this.product;
    }

    addUser(idProduct, idUser){
        const event = this.#getEvent(idEvent);
        if(event){
            if(!event.participants.includes(idUser)) event.participants.push(idUser);
        } else return 'this event not exists';
    }

    #getProduct(idProduct){
        return this.product.find((event) => this.product.id === idProduct);
    }

    eventTour(idEvent, newSite, newDate) {
        const event = this.#getProduct(idProduct);
        if(event) {
            const newEvent = {
                ...event,
                id: this.#getMaxId() + 1,
                site: newSite,
                date: newDate,
                participants: []
            };
            this.events.push(newEvent);
        } else return 'Not found';
    }
}

