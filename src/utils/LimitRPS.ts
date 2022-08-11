 export const limitRPS = () => {
    let count = 0
    const limit = 4

    const setCount = () => {
        setTimeout(() => {
            count = 0
        }, 1000)
    }

    return (fn:Function) => {
        if (count === limit) {
            setCount()
        }
        count++
        if (count <= limit) {
            return fn()
        }
    }
}
