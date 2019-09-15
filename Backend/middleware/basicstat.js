function Sorted(dataset){
    return dataset.sort((a,b) => {
        return a-b
    })
}
function FindMean(dataset){
    let sum = dataset.reduce((sum, curr) => {
        return sum+curr
    }) 
    let mean = sum/(dataset.length)
    return mean
}
function FindMedian(dataset){
    let sortedData = Sorted(dataset)
    let medPosition = (dataset.length+1)/2
    if(Number.isInteger(medPosition)){
        return sortedData[medPosition-1]
    } else {
        let newPosition = Math.floor(medPosition)
        return (sortedData[newPosition-1]+sortedData[newPosition])/2
    }
}
function FindMode(dataset){
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

function FindCumulative(dataset){
    let cumulative  = []
    dataset.map((value, index) =>{
        let temp =value + (cumulative[cumulative.length-1]? cumulative[cumulative.length-1] : 0) 
        cumulative.push(Number(parseFloat(temp).toFixed(2)))
    })
    return cumulative
}
function FindVariance(dataset){
    let mean = FindMean(dataset)
    let n = dataset.length-1
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

module.exports = {
    Sorted, FindCumulative, FindMean,FindMaxMin, FindMedian, FindMode, FindSD, FindVariance
}