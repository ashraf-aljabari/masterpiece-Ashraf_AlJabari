import mongoose from 'mongoose';

// user schema model.
const playgroundSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    capacity: {
      type: Number,
      required: true,
    },
    playgroundImage: {
      type: String,
      default: 'noImage.png',
    },
    location: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Playground = mongoose.model('Playground', playgroundSchema);

export default Playground;
