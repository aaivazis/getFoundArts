// third party imports
import React from 'react'
import fetch from 'isomorphic-fetch'
import cookies from 'browser-cookies'
import Autoprefixer from 'inline-style-prefixer'
// import {UniversalFormComponent as MoonluxForm} from 'universal-forms'
import {UniversalFormComponent as MoonluxForm} from 'universal-forms'
// form test imports
import SignUpForm from 'apps/auth/forms/signupForm'


class FormComponent extends React.Component {

    constructor(...args) {
        // instantiate this
        super(...args)
        // bind various functions
        this.focus = this.focus.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }


    // focus on the contact menu
    focus() {
        this.refs.form.focus()
    }


    submitForm(formData) {
        // post to the correct url
        fetch('/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'csrf-token': cookies.get('csrfToken'),
            },
            body: formData,
        // if the request was made
        }).then((response) => {
            // use the response as text
            return response.text()
        // handle the response
        }).then((text) => {
            console.log(text)
        })
    }


    // render the component
    render() {
        // pull out the used properties
        const {style, ...unusedProps} = this.props
        // render the new component
        return (
            <MoonluxForm form={SignUpForm} ref='form' {...unusedProps}
                         onSubmit={this.submitForm}
                         fieldStyle={styles.inputContainer}
                         labelStyle={styles.label}
                         inputStyle={styles.input}
                         resultAsString={true}
                         style={{...styles.form, ...style}} />
        )
    }
}


const prefixer = new Autoprefixer('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36')
const styles = prefixer.prefix({
    form: {
        marginTop: 50,
        textAlign: 'right',
    },
    inputContainer: {
        marginBottom: 30,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    label: {
        display: 'inline-block',
        textAlign: 'left',
        width: '40%',
        textTransform: 'capitalize',
        boxSizing: 'border-box',
        paddingRight: 30,
        paddingTop: 5,
    },
    input: {
        display: 'inline-block',
        width: '60%',
        border: '1px solid #C1C1C1',
        boxSizing: 'border-box',
        padding: 10,
        resize: 'vertical',
        minHeight: 55,
    },
})


export default FormComponent

// end of file
