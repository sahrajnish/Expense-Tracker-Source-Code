const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }
    }, {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    // Move to the next middleware
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    // Compare the input password with the stored hashed password
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("user", userSchema);

module.exports = User;