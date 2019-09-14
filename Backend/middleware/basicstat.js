let dataset = [1,47, 31, 1 ,1,1,2,2,2,2]
function Sorted(dataset){
    return dataset.sort((a,b) => {
        return a-b
    })
}
function Mean(dataset){
    let sum = dataset.reduce((sum, curr) => {
        return sum+curr
    }) 
    let mean = sum/(dataset.length)
    return mean
}
function Median(dataset){
    let sortedData = Sorted(dataset)
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
function FindMaxMin(dataset){
    let max = Math.max(dataset)
    let min = Math.min(dataset)
    return {max, min}
}

function Cumulative(dataset){
    let cumulative  = []
    dataset.map((value, index) =>{
        let temp =value + (cumulative[cumulative.length-1]? cumulative[cumulative.length-1] : 0) 
        cumulative.push(Number(parseFloat(temp).toFixed(2)))
    })
    return cumulative
}
function FindVariance(dataset){
    let mean = Mean(dataset)
    let n = dataset.length
    let sum = 0
    dataset.map((value) => {
        sum += ((value-mean)*(value-mean))
    })
    let variance = (sum/n)
    return variance
}
function FindSD(dataset){
    return Math.sqrt(FindVariance(dataset))
}
let dataset2 = [0.1,0.2,0.3,0.4]
console.log(Mean(dataset))
console.log(Median(dataset))
console.log(Mode(dataset))
console.log(Cumulative(dataset2))
console.log(FindVariance(dataset))
console.log(FindSD(dataset))