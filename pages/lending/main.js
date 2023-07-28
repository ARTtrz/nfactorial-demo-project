import ImageSlider from "./slider/slider"
import MainImage from '../../public/main3.png'
import ManImage from '../../public/user.png'
import SuccessImage from '../../public/success.png'
import Image from "next/image"
import StarImage from '../../public/star.png'
import RunningLine from "./line/runningLine"
export default function Main(){
    return(
        <main className="mt-5" >
            <div className=" px-10 pt-16  pb-3 max-w-[1600px] m-auto bg-white rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-between gap-5" >
                        <h1 className="uppercase text-3xl font-medium">
                            Устал ездить без прав?
                        </h1>
                        <span className="text-lg ">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                        </span>
                        <button type="button" className="text-white   bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-2">Cyan to Blue</button>

                    </div>
                    <Image src={MainImage} alt="image" width={850} />
                </div>
            </div>
            <div className=" px-10 pt-3  pb-3 max-w-[1600px] justify-between m-auto gap-5 bg-white mt-5 flex items-center">
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