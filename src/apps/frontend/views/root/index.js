// third party imports
import React from 'react'
import Radium from 'radium'
import cookies from 'browser-cookies'
// local imports
import Header from './header'
import Footer from './footer'
import loginAction from 'core/auth/actions/login'


@Radium
class RootComponent extends React.Component {

    static propTypes = {}


    static defaultProps = {}


    constructor(props) {
        // instantiate this
        super(props)
        // set the initial state
        this.state = {}
    }


    // called when the component is first mounted
    componentDidMount() {}


    // called before the component is removed from the dom
    componentWillUnmount() {}


    // render the component
    render() {
        // pull out the used properties
        const {...unused_props} = this.props

        // render the component
        return (
            <div style={styles.rootContainer} {...unused_props}>
                <Header />
                <main style={styles.mainContent}>
                    {this.props.children}
                </main>
                <Footer style={styles.footer} />
            </div>
        )
    }
}

// the height of the footer
const footer_height = 50

const styles = {
    rootContainer: {
        position: 'relative',
        minHeight: '90%',
        overflow: 'hidden',
    },
    mainContent: {
        width: '100%',
    },
    footer: {
        backgroundColor: '#212428',
        position: 'absolute',
        float: 'left',
        bottom: 0,
        left: 0,
        right: 0,
        height: footer_height,
        paddingTop: 30,
    },
}


export default RootComponent


// end of file
