import ImageSlider from "./slider/slider"
import MainImage from '../../public/alibek.png'
import ManImage from '../../public/user.png'
import SuccessImage from '../../public/success.png'
import Image from "next/image"
import StarImage from '../../public/star.png'
import RunningLine from "./line/runningLine"
import { useRouter } from "next/router"
export default function Main(){
    const router = useRouter()
    return(
        <main className="mt-6" >
            <div className=" px-10 pt-16  pb-3 max-w-[1550px] m-auto bg-white rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-between gap-5" >
                        <h1 className="uppercase text-3xl font-medium ">
                            Устал ездить без прав?
                        </h1>

                        <span className="text-xl max-w-[600px] ">
                            Добро пожаловать в будущее ГИБДД! Наш чат-бот на искусственном интеллекте упростит взаимодействие с правоохранительными органами. Получайте быстрые ответы о правилах, штрафах и регистрации. Удобство и эффективность - в одном приложении!
                        </span>
                        <button type="button" onClick={() => router.push('/chatbot')} className="text-white   bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg  px-10 py-4  text-center mr-2 mb-2">Перейти</button>

                    </div>
                    <Image src={MainImage} alt="image" width={826} />
                </div>
            </div>
            <div className=" px-10 mt-10 py-4 max-w-[1600px] justify-between m-auto gap-5 bg-white flex items-center">
                <div className="flex items-center gap-5 ">
                    <Image src={ManImage} width={60} height={60} alt="man"/> 
                    <span className="uppercase text-xl font-medium ">
                            1000+ пользователей в РК
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <Image src={StarImage} width={60} height={60} alt="success"/>
                    <span className="uppercase text-xl font-medium ">
                        рекомендуют 0+ автошкол
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <Image src={SuccessImage} width={60} height={60} alt="success"/>
                    <span className="uppercase text-xl font-medium ">
                        100+ положительных отзывов
                    </span>
                </div>
               
            </div>
            
            <RunningLine/>  
        </main>
    )
}