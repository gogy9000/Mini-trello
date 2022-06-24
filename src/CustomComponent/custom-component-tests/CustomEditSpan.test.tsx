import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {CustomEditSpan} from "../CustomEditSpan";
import {createRoot} from "react-dom/client";

let container: Element = null as unknown as Element
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)

})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    // @ts-ignore
    container = null
})

it('CustomEditSpan renders with a AZAZA', () => {

    act(() => {
        render(<CustomEditSpan value={'AZAZA'}/>, container)
    })


    // @ts-ignore
    expect(container.querySelector("[data-testid='span']").textContent)
        .toEqual('AZAZA')
})
it('TextField should be active', () => {
    const onDoubleClick = jest.fn()

    act(() => {
        render(<CustomEditSpan data-testId='CustomEditSpan' value={'AZAZA'} onDoubleClick={onDoubleClick}/>, container)
    })
    const span = document.querySelector("[data-testid='span']")
    act(() => {
        // for (let i = 0; i < 5; i++) {
        // @ts-ignore
        span.dispatchEvent(new MouseEvent('dblclick', {bubbles: true}))
        // }
    })
    // @ts-ignore
    expect(document.querySelector("[data-testid='TextField']").getAttribute('data-testId'))
        .toBe("TextField")

});