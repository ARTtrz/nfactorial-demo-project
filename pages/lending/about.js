import Image from "next/image";
import PddImage from '../.././public/2-1.jpg'
import FineImage from '../.././public/fine1.jpg'
import SignImage from '../.././public/ns.jpg'
import RunningLine from "./line/runningLine";
import Line from "./line/line";
export default function About(){
    return (
        <div className="xs:hidden">
        <div className="max-w-[1600px] m-auto mt-8 ">
            <h1 className="text-2xl uppercase font-medium">О проекте</h1>
            <div className="bg-white w-auto mt-5 p-10 rounded-xl ">
                <div className="text-2xl font-medium">
                    На что способен <span className="text-logo font-semibold">PatrolAI</span>:
                </div>
                <div className="mt-7 flex flex-col justify-between gap-10">
                <div className="flex items-center gap-10"> 
                    <Image src={PddImage} width={400} alt="pdd" />
                    <div className="text-xl">Он обладает глубоким знанием ПДД и способен предоставить точные и полезные ответы на любой вопрос, касающийся правил дорожного движения, включая правила приоритета, разметку дорог, скоростные ограничения и правила поведения на перекрестках. Он также может объяснить особенности вождения в различных ситуациях и дать рекомендации по безопасности на дороге.</div>
                    
                </div>
                <hr/>
                <div className="flex items-center gap-10">
                    <Image src={FineImage} width={400} alt="pdd" />
                    <div className="text-xl">Он может предоставить информацию о конкретных штрафах, которые предусмотрены законодательством за различные нарушения правил дорожного движения, такие как превышение скорости, проезд на красный свет, неправильная парковка, использование мобильного телефона за рулем и другие. Такие сведения помогут пользователям быть более ответственными и соблюдать правила на дороге.</div>
                </div>
                <hr/>
                <div className="flex items-center gap-10">
                    <Image src={SignImage} width={400} alt="pdd" />
                    <div className="text-xl ">Он обладает функцией распознавания знаков дорожного движения. Просто отправив ему фото знака, пользователи получат точную информацию о его назначении и соответствующих правилах, которые следует соблюдать на дороге. Это значительно облегчит понимание и применение правил дорожного движения, способствуя повышению безопасности на дорогах.</div>
                </div>
                
                </div>
            </div>  
           
        </div>
        <Line/>
        </div>
    )
}