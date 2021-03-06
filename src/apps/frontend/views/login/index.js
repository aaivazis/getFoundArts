// third party imports
import React from 'react'
import Helmet from 'react-helmet'
// local imports
import colors from 'colors'
import LoginForm from './loginForm'

class Login extends React.Component {

    static propTypes = {}


    static defaultProps = {}


    constructor() {
        // instantiate this
        super()
        // the initial state
        this.state = {}
    }


    // render the component
    render() {
        // pull out the used properties
        const {style, ...unusedProps} = this.props
        // render the root view
        return (
            <div style={{...styles.container, ...style}}>
                <Helmet title='Login | Get Found Arts' />
                <LoginForm style={styles.loginForm}/>
            </div>
        )
    }
}


const styles = {
    container: {
        width: '100%',
        height: '97%',
        backgroundColor: colors.lightBlue,
        display: 'flex',
        justifyContent: 'center',
        borderTop: `1px solid ${colors.grey}`,
    },
    loginForm: {
        width: '60%',
        height: 350,
        backgroundColor: colors.white,
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}


export default Login


// end of file
