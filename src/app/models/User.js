import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    // phone: {
    //   type: Number,
    // },
    // streetAddress: { type: String },
    // city: { type: String },
    // country: { type: String },
    // postalCode: { type: String },
    // admin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
