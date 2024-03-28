function Validate(values) {

    let error = {}

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    
    if (!mailformat.test(values.email)) {
        error.email = "Please enter a valid email address."
    }

    else error.email = ''


    if (!passwordFormat.test(values.password)) {
        error.password = "Please enter a valid password."
    }

    else error.password = ''


    return error
}

export default Validate

