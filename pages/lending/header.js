import Link from "next/link";
import LogoImage from '../.././public/patrol.png'
import Image from "next/image";
export default function Header(){
    return (
        <>
            <div className="flex justify-between items-center px-10 pt-5 pb-3 max-w-[1600px] m-auto ">
                <div>
                    <Link href="#">
                        <Image
                            src={LogoImage}
                            alt="logo"
                            width={160}
                            height={160}
                        />
                    </Link>
                </div>
                <nav>
                    <ul className="flex items-center justify-between gap-10 uppercase font-medium text-lg">
                        <li className="relative inline-block group">
                            
                            <Link href="/test" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Тестирование
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="relative inline-block group">
                            
                            <Link href="#" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                О проекте
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="relative inline-block group">
                            
                            <Link href="/chatbot" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Чатбот
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="relative inline-block group">
                            
                            <Link href="/donation" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Донаты автору
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                    </ul>
                </nav>
        </div>
        </>
    )
}