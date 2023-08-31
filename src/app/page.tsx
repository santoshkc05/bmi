'use client'
import { useEffect, useState } from "react";
import NumberInput from "./numbernput";

export default function Home() {
  const [neutralFat, setNeutralFat] = useState<string>('');
  const [bmi, setBmi] = useState<string>('');
  const [gammaGTP, setGammaGTP] = useState<string>('');
  const [waistCircumference, setWaistCircumferenece] = useState<string>('');
  const [fattyLeverIndex, setFattyLeverIndex] = useState<string>("")

  const handleNetralFatChange = (value: string) => {
    setNeutralFat(value)
  };
  const handleBMIChange = (value: string) => {
    setBmi(value)
  };
  const handleGammaGTPChange = (value: string) => {
    setGammaGTP(value)
  };
  const handleWaistCircumferenceChange = (value: string) => {
    setWaistCircumferenece(value)
  };

  const calculateFattyLeverIndex = () => {
    console.log("neutralFat", neutralFat)
    console.log("bmi", bmi)
    console.log("gammaGTP", gammaGTP)
    console.log("waistCircumference", waistCircumference)
    const nTriglycerides = Number(neutralFat)
    const nbmi = Number(bmi)
    const ngGTP = Number(gammaGTP)
    const nwc = Number(waistCircumference)
    if (!nTriglycerides || !nbmi || !ngGTP || !nwc) {
      setFattyLeverIndex("")
    } else {
      const numerator =
        Math.exp(0.953 * Math.log(nTriglycerides) +
          0.139 * nbmi +
          0.718 * Math.log(ngGTP) +
          0.053 * nwc - 15.745);

      const denominator = 1 + numerator;

      const calculatedFLI = (numerator / denominator) * 100;
      setFattyLeverIndex(`${calculatedFLI.toFixed(3)}`)
    }
  }

  useEffect(() => {
    calculateFattyLeverIndex();
  }, [neutralFat, bmi, gammaGTP, waistCircumference]);

  return (
    <main>
      <section className="relative h-screen py-36 flex items-center bg-[url('../images/bg.jpg')] bg-center bg-cover">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-400 to-orange-900 opacity-90">
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-[400px] m-auto p-6 bg-white dark:bg-slate-900 dark:shadow-gray-800 rounded-md shadow-xl">
            <form action="">
              <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-black-900 md:text-2xl lg:text-3xl">あなたは脂肪肝？</h1>
              <p className="mb-6 text-sm font-normal text-orange-500 dark:text-orange-400">FLIは健康診断の結果からわかる脂肪肝の指数です</p>
              <NumberInput title={"中性脂肪: (mg/dl)"} id={"NeutralFat"} onNumberChange={handleNetralFatChange} />
              <NumberInput title={"BMI:  (kg/m2)"} id={"BMI"} onNumberChange={handleBMIChange} />
              <div className="mb-4">
                <label className="w-full text-black dark:text-white">
                  BMIを調べる→
                </label>
                <a className="text-blue-600" href="https://kanzo-kensa.com/examination/bmi/" target="_blank">
                  https://kanzo-kensa.com/examination/bmi/
                </a>
              </div>
              <NumberInput title={"γGTP: (U/L)（ガンマージーティーピー)"} id={"GammaGTP"} onNumberChange={handleGammaGTPChange} />
              <NumberInput title={"腹囲: (cm)"} id={"WaistCircumference"} onNumberChange={handleWaistCircumferenceChange} />

              <div className="mt-4  py-4 flex-wrap">
                <label htmlFor="LiverFattyIndex"
                  className="text-base font-normal text-black dark:text-white animate-slide"
                >
                  あなたの脂肪肝指数は
                </label>
                <input value={fattyLeverIndex} disabled
                  className={`text-center w-20 mx-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-orange-600 ${fattyLeverIndex ? 'animate-blink' : ''}`}
                  type="text"
                  name="LiverFattyIndex"
                  id="LiverFattyIndex" />
              </div>
              <div className="mb-4 flex justify-end">
                <label className="text-sm font-light text-black dark:text-white"
                >
                  小数点第3位で四捨五入
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
