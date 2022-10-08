const registerEmail = async ({name, email}) => {
    const mail = {
        to: email,
        subject: "Успішна реєстрація",
        html: `<p> Привіт, ${name}. Ви успішно зареєструвалися в додатку </p>`
    };
    return mail;
};

module.exports = registerEmail;