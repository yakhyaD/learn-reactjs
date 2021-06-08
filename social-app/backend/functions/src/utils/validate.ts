import { Errors, newUser, User, UserDetails } from './interfaces'

const isEmail = (email: string) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(emailRegEx)
}
const isEmpty = (string: string) => {
    return string.trim() === '' ? true : false
}
const isMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? true : false
}

exports.registerValidation = (data: newUser) => {
    let errors: Errors = {}
    if (isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    else if (!isEmail(data.email)) {
        console.log('invalid email')
        errors.email = 'Invalid email address'
    }
    if (isEmpty(data.password)) {
        errors.password = 'Password is required'
    }
    if (!isMatch(data.password, data.confirmPassword)) {
        errors.password = "Passwords does not match"
    }
    const valid: boolean = Object.keys(errors).length === 0 ? true : false

    return {valid, errors}
}

exports.loginValidation = (data: User) => {
    let errors: Errors = {}
    if (isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    else if (!isEmail(data.email)) {
        errors.email = 'Invalid email address'
    }
    if (isEmpty(data.password)) {
        errors.password = 'Password is required'
    }
    const valid: boolean = Object.keys(errors).length === 0 ? true : false

    return {valid, errors}
}
exports.reduceDetailsUser = (data: any) => {
    console.log(data)
    let userDetails: UserDetails = {}
    if (!isEmpty(data.bio)) userDetails.bio = data.bio
    if (!isEmpty(data.location)) userDetails.location = data.location
    if (!isEmpty(data.website)) {
        if (data.website.trim().substring(0, 4) !== "http") {
            userDetails.website = 'http://'+ data.website
        } else {
            userDetails.website = data.website
        }
    }
    return userDetails
}