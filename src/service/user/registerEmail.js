const { userRegisterEmail } = require("../../email");

const registerEmail = async (name, email) => {
    const mail = {
        to: email,
        subject: "Success Registration",
        html: await userRegisterEmail(name)
    };
    return mail;
};

module.exports = registerEmail;