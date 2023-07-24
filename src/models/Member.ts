import Mongoose from 'mongoose'

interface IMember {
    name: string, 
    role: string
}

const MemberSchema = new Mongoose.Schema<IMember>({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const MemberModel = Mongoose.model<IMember>('Member', MemberSchema)

export default MemberModel