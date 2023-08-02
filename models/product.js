const fs = require('fs');
const readFile = ()=>{
    let data = fs.readFileSync('./products.json',{
        encoding: 'utf8'
    });
    return JSON.parse(data);
}
class Product{
    constructor(id,body) {
        if(typeof id === 'undefined'){
            throw new Error('Product id cannot be undefined');
        }
        this.id = id;
        if(typeof body !== 'object'){
            throw new Error('Product body is not a valid object');
        }
        this.body = body;
    }
    static fetchOne(id){
        let products = readFile();
        let index = products.findIndex((product)=>{
            return product.id == id;
        })
        if(index < 0){
            throw new Error(`Product with id: ${id} could not be found`);
        }
        return products[index];
    }
    static fetchAll(){
       return readFile();
    }
    save(){
        let products = readFile();
        if(this.id != null){
            let index = products.findIndex((product)=>{
                return product.id == this.id;
            })
            if(index < 0){
                throw new Error(`Product with id: ${this.id} could not be found`);
            }
            products[index] = {
                ...this.body,
                id: this.id
            }
        }else{
            products.unshift({
                ...this.body,
                id: Date.now(),
            })
        }
        fs.writeFileSync('./products.json',JSON.stringify(products));
    }
    static deleteOne(id){
        let products = readFile();
        let index = products.findIndex((product)=>{
            return product.id == id;
        })
        if(index < 0){
            throw new Error(`Product with id: ${id} could not be found`);
        }
        products.splice(index,1);
        fs.writeFileSync('./products.json',JSON.stringify(products));
    }
}
module.exports = Product;