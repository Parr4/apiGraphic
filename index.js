const form = document.querySelector("#form")
const resultFinal = document.querySelector("#result")



const getData = async (currency) => {
    const res = await fetch(`https://mindicador.cl/api/${currency}`)
    const data = await res.json()
    console.log(data)
    return data
}


const createGraph = (e) => {
    document.getElementById('canvaContainer').innerHTML = ``
    document.getElementById('canvaContainer').innerHTML =`<canvas id="myChart"></canvas>`


    console.log(document.querySelector('#myChart'))

    const ctx = document.getElementById('myChart');


    console.log(ctx)

    let info = e.slice(0, 10)
    console.log(info)
    let pricesData = []
    let dateData = []
    info.forEach((e) => pricesData.unshift(e.valor), console.log(pricesData))
    info.forEach((e) => dateData.unshift(e.fecha.slice(0, 10)), console.log(dateData))
    let currency = document.querySelector("#currency").value
    // let datas = info.map()

    
    new Chart(ctx, {
        type: 'line',
        data: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'hi'],
            labels: dateData,
            datasets: [{
                label: `Valor historico de ${currency}`,
                //   data: [12, 19, 3, 5, 2, 3],
                data: pricesData,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    })


}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    let amount = document.querySelector("#amount").value
    let currency = document.querySelector("#currency").value
    let result = await getData(currency)
    console.log(result.serie[0].valor)
    console.log(result.serie)
    let converted = amount / result.serie[0].valor
    console.log('converted:', converted)
    resultFinal.innerHTML = `Resultado: $${converted.toFixed(2)}`
    createGraph(result.serie)

})