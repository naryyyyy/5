const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')

const convert = async (currency, targetInput1, targetInput2, isTrue, currencyType) => {
  currency.oninput = async () => {
    try {
      const response = await fetch("data.json")
      const data = await response.json()
      
      if (isTrue && currencyType === "usd") {
        targetInput1.value = (currency.value / data.usd).toFixed(2)
        targetInput2.value = (currency.value / data.eur).toFixed(2)
      } else if (isTrue && currencyType === "eur") {
        targetInput1.value = (currency.value * data.eur).toFixed(2)
        targetInput2.value = (currency.value * data.eur).toFixed(2)
      } else if (!isTrue && currencyType === "usd") {
        targetInput1.value = (currency.value * data.usd).toFixed(2)
        targetInput2.value = (currency.value * (data.usd / data.eur)).toFixed(2)
      } else if (!isTrue && currencyType === "eur") {
        targetInput1.value = (currency.value * (data.eur / data.usd)).toFixed(2)
        targetInput2.value = (currency.value * data.eur).toFixed(2)
      }
      
      if (currency.value === '') {
        targetInput1.value = ''
        targetInput2.value = ''
      }
    } catch (error) {
      console.log(error)
    }
  }
}

convert(som, usd, eur, true, "usd")
convert(usd, som, eur, false, "usd")
convert(eur, som, usd, false, "eur")