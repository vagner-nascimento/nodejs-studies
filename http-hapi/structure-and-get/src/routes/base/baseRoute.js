class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => {
                console.log(method)
                return method !== 'constructor' && !method.startsWith('_')
            })
            //NOTE: It get all methods and properties for this class,
    }       // which stats with '_', that means private method by convention
}

module.exports = BaseRoute