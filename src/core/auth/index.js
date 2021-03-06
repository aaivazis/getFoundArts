// third party imports
import jwt from 'jsonwebtoken'
// local imports
import {secretKey} from 'config/settings'
import User from './models/User' // TODO: bring this to global configuration
import endpoints from './endpoints'


/**
 * Authenticate the user against the database
 */
async function authenticate(email, password) {
    // deal with possible errors
    try {
        // grab the user with the matching email
        const user = await User.findOne({email})
        // if the user was not found
        if (!user) {
            throw new Error('Could not find user with that email')
        }
        // if the password matches
        if (user.password === password) {
            // return the user
            return user
        }
        // the passwords do not match
        throw new Error('Incorrect password')
    // if there was a problem retrieving the user
    } catch (error) {
        // throw the error
        throw new Error(`There was a problem retrieving the user: ${error.message}`)
    }
}


/**
 * Create a hash with the authentication information for the given user
 */
function profileForUser(user) {
    if (!user) {
        throw new Error('cannot ask for profile of falsey user')
    }

    return {
        userId: user.id,
        roles: user.roles || ['admin'],
    }
}


/**
 * Log the user into the current session store
 */
async function login(res, email, password) {
    // authenticate the credentials
    const user = await authenticate(email, password)

    // the json object to tokenize
    const jsonToken = {
        ...profileForUser(user),
        maxAge: '1d',
    }

    // generate a jwt for the
    var token = jwt.sign(jsonToken, secretKey)
    // add the token to the request cookies
    res.cookie('authToken', token, {
        // signed: true,
        HttpOnly: true,
    })

    // pass the user onto the next guy
    return user
}


/**
 * Return the user corresponding to the given auth token.
 */
function userByToken(token) {
    // if the supplied token is falsey
    if (!token) {
        throw new Error('asking for profile of falsey user')
    }
    // verify and decode the token
    const decoded = jwt.verify(token, secretKey)
    // return the user specified by the token
    return User.findById(decoded.userId)
}


/**
 * Check that the request has the necessary authentication credentials and
 * add the matching user to the request if they are valid.
 */
function requireAuthentication() {
    // return the express middleware
    return (req, res, next) => {
        try {
            // grab the auth token from the request cookies
            const {authToken} = req.cookies
            // check if the auth token was added to the request header
            if (authToken) {
                // verify and decode the token
                const decoded = jwt.verify(authToken, secretKey)
                // find the user with the matching id
                User.findById(decoded.userId, (err, user) => {
                    // if there was an error looking for the user
                    if (err) {
                        throw new Error(err)
                    }
                    // set the user of the request
                    req.user = user
                    // we're done here
                    next()
                })
            } else {
                throw new Error('AuthToken cannot be found')
            }
        // if the current session is not authenticated
        } catch (error) {
            // figure out the url we were supposed to go to
            const targetRoute = req.url
            // redirect the user to a login page that will pass them on
            res.redirect(`/login?redirectTo=${targetRoute}`)
        }
    }
}


// module exports
export default {
    authenticate,
    login,
    requireAuthentication,
    profileForUser,
    userByToken,
    endpoints,
}
