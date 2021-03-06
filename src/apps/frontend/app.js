// third party imports
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import {Provider} from 'react-redux'
import Helmet from 'react-helmet'
// local imports
import {templatesDir} from 'config/projectPaths'
import routes from './routes'
import {createStore} from './store'


// create the express app
const app = express()


// use jade as the templating engine
app.set('view engine', 'jade')
app.set('views', templatesDir)


// any url that hits this app
app.all('*', (req, res) => {
    // figure out the appropriate route
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        // if there was an error
        if (error) {
            res.status(500).send(error.message)
        // if the location is a redirect
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        // if the location was found and is not a redirect
        } else if (renderProps) {
            const store = createStore()
            // initial application state
            const initialState = JSON.stringify(store.getState())
            // initial component to render
            const initialComponent = (
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            )
            // rewind the header to get the most up to date version
            const head = Helmet.rewind() || {
                title: 'Get Found Arts',
            }

            // render the jade template with the component mounted
            res.render('index.jade', {
                initialState,
                renderedComponent: renderToString(initialComponent),
                head,
            })
        // otherwise the location was not found
        } else {
            res.status(404).send('Not found')
        }
    })
})


// export the application
export default app


// end of file
