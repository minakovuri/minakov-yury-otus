import {describe, expect, test} from '@jest/globals';
import {EventDispatcher} from './EventDispatcher'

describe('dispatcher test', () => {
    test('add event listener', () => {
        const dispatcher = new EventDispatcher()
        const event = 'inc'
        let i = 0

        dispatcher.addListener(event, () => {
            i++
        })

        dispatcher.dispatch(event)
        expect(i).toEqual(1)

        dispatcher.dispatch(event)
        expect(i).toEqual(2)
    })

    test('remove event listener ', () => {
        const dispatcher = new EventDispatcher()
        const event = 'inc'
        let i = 0

        const callback = () => {
            i++
        }

        dispatcher.addListener(event, callback)

        dispatcher.dispatch(event)
        expect(i).toEqual(1)

        dispatcher.removeListener(event, callback)
        expect(i).toEqual(1)
    })
})