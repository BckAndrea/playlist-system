import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Example of associations and populate: https://mongoosejs.com/docs/populate.html
// Ganska bra förklaring https://vegibit.com/mongoose-relationships-tutorial/
// about lean https://mongoosejs.com/docs/tutorials/lean.html

// Remove the ObjectID and change to string
function changeIdType(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
}

const SongSchema = new Schema({
    name: {type: String, required: true},
    artist: {type: String, required: true},
    releaseYear: {type: Number},
    belongsTo: { type: Schema.ObjectId, ref: "Playlist", required: true },
}, 
{
    timestamps: true,
    // When converting mongoose to object change the id
    toObject: {
        transform: changeIdType
    },
    toJSON: {
        transform: changeIdType
    }
});

// Change _id to id on lean for findOneXxxx
SongSchema.post(['findOne', 'findOneAndUpdate'], function(ret) {
    if (!ret) 
      return;
    
    if(this.mongooseOptions().lean) 
        return changeIdType(null,ret);
  
});

// Define the schema class
const SongModel = mongoose.model("Song", SongSchema);

// we export the constructor
// module.exports = SongModel;
export default SongModel;
