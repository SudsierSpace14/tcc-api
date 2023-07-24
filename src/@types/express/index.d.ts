declare namespace Express{
    export interface Request{
        model: Model<any>,
        func?: () => void
    }
}