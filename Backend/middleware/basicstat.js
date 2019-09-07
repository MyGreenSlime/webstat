let dataset = [1,47, 31, 1 ,1,1,2,2,2,2]
function Mean(dataset){
    let sum = dataset.reduce((sum, curr) => {
        return sum+curr
    })
    let mean = sum/(dataset.length)
    return mean
}
function Median(dataset){
    let sortedData = dataset.sort((a,b) => {
        return a-b
    })
    let medPosition = (dataset.length+1)/2
    if(Number.isInteger(medPosition)){
        return sortedData[medPosition-1]
    } else {
        let newPosition = Math.floor(medPosition)
        return (sortedData[newPosition-1]+sortedData[newPosition])/2
    }
}
function Mode(dataset){
    let count = {}
    dataset.map(num => {
        count[num] = (count[num] || 0) + 1 
    })
    let keys = Object.keys(count)
    let max = Number.MIN_VALUE
    let modes = []
    keys.map(key => {
        if(count[key] > max){
            modes = []
            modes.push(Number(key))
            max = count[key]
        } else if(count[key] == max){
            modes.push(Number(key))
        }
    })
    return modes
}

console.log(Mean(dataset))
console.log(Median(dataset))
console.log(Mode(dataset))