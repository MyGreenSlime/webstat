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
    return Number(parseFloat(mean).toFixed(4))
}
function FindMedian(dataset){
    let sortedData = Sorted(dataset)
    let medPosition = (dataset.length+1)/2
    if(Number.isInteger(medPosition)){
        return Number(parseFloat(sortedData[medPosition-1]).toFixed(4))
    } else {
        let newPosition = Math.floor(medPosition)
        return Number(parseFloat((sortedData[newPosition-1]+sortedData[newPosition])/2).toFixed(4))
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
            modes.push(Number(parseFloat(key).toFixed(4)))
        }
    })
    if(modes.length > 3){
        return []
    }
    return modes
}


function FindCumulative(dataset){
    let cumulative  = []
    dataset.map((value, index) =>{
        let temp =value + (cumulative[cumulative.length-1]? cumulative[cumulative.length-1] : 0) 
        cumulative.push(Number(parseFloat(temp).toFixed(4)))
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
    return Number(parseFloat(variance).toFixed(4))
}
function FindSD(dataset){
    return Number(parseFloat(Math.sqrt(FindVariance(dataset))).toFixed(4))
}

module.exports = {
    Sorted, FindCumulative, FindMean, FindMedian, FindMode, FindSD, FindVariance
}