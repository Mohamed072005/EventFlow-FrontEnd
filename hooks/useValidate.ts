const useValidate = () => {
    let error: { [key: string]: string } = {};

    const loginValidation = (email: string, password: string) => {
        error = {};

        if (!email || !email.includes('@') || email.length < 6) {
            error.email = 'Invalid email address';
        }

        if (!password || password.length <= 6) {
            error.password = 'Password must be at least 6 characters long';
        }

        return error;
    };

    const registerValidation = (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => {
        error = {};

        if (!firstName || firstName.trim() === '') {
            error.firstName = 'First name is required';
        }

        if (!lastName || lastName.trim() === '') {
            error.lastName = 'Last name is required';
        }

        if (!email || !email.includes('@') || email.length < 6) {
            error.email = 'Invalid email address';
        }

        if (!password || password.length <= 6) {
            error.password = 'Password must be at least 6 characters long';
        }

        if (password !== password_confirmation ) {
            error.password = 'Password does not match';
        }

        return error;
    };

    return { loginValidation, registerValidation };
};

export default useValidate;