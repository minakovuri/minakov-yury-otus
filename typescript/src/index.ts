import {hyper} from 'hyperhtml'
import {App} from "./view/App"
import {AppController} from './controller/AppController'

window.onload = () => {
    const rootElement: HTMLElement = document.getElementById('root')

    const view = new App()

    hyper(rootElement)
        `${view}`

    new AppController(view)
}